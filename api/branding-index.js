// --- MANTENIMIENTO: BACKFILL DE EMBEDDINGS DE LA BIBLIOTECA DE CASOS ---
// Genera el embedding de cada fila de brand_cases que aún no lo tenga.
// Se corre a mano tras sembrar casos nuevos. Protegido con INDEX_SECRET.
// Uso: GET /api/branding-index?secret=XXXX
// Robustez: lee TODAS las filas y filtra en JS (evita quirks de is.null sobre
// vector) y devuelve diagnóstico (total leído) para detectar problemas de clave.

import { embed } from './_embeddings.js';

const SB_URL = process.env.SUPABASE_URL;
const SB_KEY = process.env.SUPABASE_SERVICE_KEY;

async function sbGet(path) {
  const res = await fetch(`${SB_URL}/rest/v1/${path}`, {
    headers: { apikey: SB_KEY, Authorization: `Bearer ${SB_KEY}` },
  });
  if (!res.ok) {
    const detalle = await res.text().catch(() => '');
    return { error: `${res.status}: ${detalle.slice(0, 200)}` };
  }
  return { data: await res.json() };
}

async function sbPatch(id, body) {
  const res = await fetch(`${SB_URL}/rest/v1/brand_cases?id=eq.${id}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      apikey: SB_KEY,
      Authorization: `Bearer ${SB_KEY}`,
    },
    body: JSON.stringify(body),
  });
  return res.ok;
}

function textoParaEmbedding(caso) {
  return [caso.consumidor_tension, caso.justificacion, caso.que_evito]
    .filter(Boolean)
    .join('\n');
}

export default async function handler(req, res) {
  if ((req.query?.secret || '') !== process.env.INDEX_SECRET) {
    return res.status(401).json({ error: 'No autorizado' });
  }
  if (!SB_URL || !SB_KEY) return res.status(503).json({ error: 'Supabase no configurado' });

  const got = await sbGet('brand_cases?select=id,consumidor_tension,justificacion,que_evito,embedding');
  if (got.error) return res.status(502).json({ error: 'Lectura Supabase falló', detalle: got.error });

  const todos = got.data || [];
  const pendientes = todos.filter((c) => !c.embedding);

  let ok = 0;
  const errores = [];
  for (const caso of pendientes) {
    try {
      const vec = await embed(textoParaEmbedding(caso));
      // pgvector por REST espera el vector como literal de texto "[v1,v2,...]",
      // no como arreglo JSON — de lo contrario el PATCH falla silenciosamente.
      const vecLiteral = `[${vec.join(',')}]`;
      if (await sbPatch(caso.id, { embedding: vecLiteral })) ok++;
      else errores.push(`patch ${caso.id} falló`);
    } catch (e) {
      errores.push(`${caso.id}: ${e.message}`);
    }
  }
  return res.status(200).json({
    total_en_tabla: todos.length,
    pendientes: pendientes.length,
    indexados: ok,
    errores,
  });
}

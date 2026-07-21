// --- MANTENIMIENTO: BACKFILL DE EMBEDDINGS DE LA BIBLIOTECA DE CASOS ---
// Genera el embedding de cada fila de brand_cases que aún no lo tenga.
// Se corre a mano tras sembrar casos nuevos. Protegido con INDEX_SECRET para
// que no lo dispare cualquiera.
// Uso: GET /api/branding-index?secret=XXXX

import { embed } from './_embeddings.js';

const SB_URL = process.env.SUPABASE_URL;
const SB_KEY = process.env.SUPABASE_SERVICE_KEY;

async function sbGet(path) {
  const res = await fetch(`${SB_URL}/rest/v1/${path}`, {
    headers: { apikey: SB_KEY, Authorization: `Bearer ${SB_KEY}` },
  });
  return res.ok ? res.json() : [];
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

// Texto que se vectoriza: la tensión del consumidor es la clave de recuperación
// (regla anti-genérico: se busca por emoción, no por industria).
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

  const pendientes = await sbGet('brand_cases?embedding=is.null&select=id,consumidor_tension,justificacion,que_evito');
  let ok = 0;
  for (const caso of pendientes) {
    try {
      const vec = await embed(textoParaEmbedding(caso));
      if (await sbPatch(caso.id, { embedding: vec })) ok++;
    } catch (e) {
      console.error('[branding-index]', caso.id, e.message);
    }
  }
  return res.status(200).json({ procesados: pendientes.length, indexados: ok });
}

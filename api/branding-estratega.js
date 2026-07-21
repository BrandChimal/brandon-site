// --- AGENTE ESTRATEGA (F1 · dirección creativa) ---
// El primer agente del pipeline de Branding Builder. NO genera imágenes:
// razona. Del Pulso + brief visual → 2-3 TERRITORIOS visuales, cada uno con
// justificación anclada a la emoción del consumidor.
// RAG agéntico: embebe la tensión del consumidor → recupera casos análogos
// (brand_cases, incluso de otras industrias) → los usa como referencia de
// criterio, no de forma. Criterio de Brandon va inline (siempre aplica).
// Dos pases: generación → edición de calidad. Guarda en brand_projects.

import { KB_CRITERIO_VISUAL, PALABRAS_PROHIBIDAS } from './_kb_branding.js';
import { embed } from './_embeddings.js';
import { sbInsert } from './_supabase.js';

const SB_URL = process.env.SUPABASE_URL;
const SB_KEY = process.env.SUPABASE_SERVICE_KEY;

async function matchCases(queryEmbedding, matchCount = 4) {
  if (!SB_URL || !SB_KEY) return [];
  try {
    const res = await fetch(`${SB_URL}/rest/v1/rpc/match_brand_cases`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        apikey: SB_KEY,
        Authorization: `Bearer ${SB_KEY}`,
      },
      // vector como literal de texto "[...]" (pgvector por REST/RPC).
      body: JSON.stringify({ query_embedding: `[${queryEmbedding.join(',')}]`, match_count: matchCount }),
    });
    return res.ok ? res.json() : [];
  } catch (e) {
    console.error('[estratega] matchCases', e.message);
    return [];
  }
}

const FORMATO = `{
  "territorios": [
    {
      "nombre": "nombre corto y evocador del territorio",
      "tension_visual": "la tensión (ej: 'humano pero no informal')",
      "percepcion": "qué debe sentir el consumidor en 1 segundo",
      "paleta": [{"rol": "base|texto|acento|alerta", "descripcion": "carbón cálido, crema, etc.", "hex": "#RRGGBB"}],
      "tipografia": {"titulares": "", "cuerpo": "", "datos": ""},
      "forma": "principios de forma, composición, movimiento",
      "que_evita": "los clichés de la categoría que este territorio rechaza",
      "por_que": "por qué ESTE territorio para ESTE consumidor (cita su emoción)"
    }
  ]
}`;

const PROMPT_GEN = `Eres el Estratega de dirección creativa del método "Ese Momento" de Brandon Chimal. Recibes el Pulso de una marca (su consumidor, su Big Ideal, su análisis) y un brief visual. Propones 2-3 TERRITORIOS visuales distintos entre sí, cada uno una ruta coherente y NO genérica.

CRITERIO DE BRANDON (aplica SIEMPRE, es tu forma de pensar):
${KB_CRITERIO_VISUAL}

REGLAS:
1. Cada territorio nace de la percepción a provocar en el CONSUMIDOR, no del gusto del dueño ni de la industria. Cita la emoción/tensión del consumidor en "por_que".
2. Los 2-3 territorios deben ser genuinamente distintos (distintas tensiones visuales), no variaciones del mismo.
3. Prueba anti-genérico: si un territorio serviría igual para cualquier marca de la misma categoría, recházalo y reescríbelo. Nombra explícitamente en "que_evita" los clichés de esa categoría.
4. Respeta las reglas duras de Brandon (vino solo sobre claro, familias tipográficas, etc.). Usa las tipografías del sistema (Outfit/DM Sans/Azeret Mono) salvo que el territorio pida otra cosa con razón.
5. Los CASOS ANÁLOGOS que recibas son referencia de CRITERIO (cómo se resolvió una tensión parecida), no de forma. No copies sus colores; aprende su razonamiento.
6. Palabras prohibidas: ${PALABRAS_PROHIBIDAS.join(', ')}. Cero tono infomercial.
7. Español, voz de consultor directo.

Responde ÚNICAMENTE con JSON válido, sin markdown, con esta forma:
${FORMATO}`;

const PROMPT_EDIT = `Eres el crítico de dirección creativa del método "Ese Momento". Recibes el Pulso, el brief y un borrador de territorios. Devuelve la VERSIÓN FINAL corregida (mismo JSON).

${KB_CRITERIO_VISUAL}

CHECKLIST — corrige lo que falle:
1. ¿Cada territorio pasa la prueba del intercambio (no sirve para cualquier marca de la categoría)? Si no, reescríbelo con la especificidad del consumidor.
2. ¿"por_que" cita la emoción/tensión real del consumidor? Si es genérico, arréglalo.
3. ¿Los territorios son distintos entre sí de verdad?
4. ¿Respeta TODAS las reglas duras de Brandon (vino sobre claro, familias tipográficas, cada color con función, jerarquía en segundos)?
5. ¿"que_evita" nombra clichés reales de la categoría?
6. Cero palabras prohibidas: ${PALABRAS_PROHIBIDAS.join(', ')}. Cero relleno.

Responde ÚNICAMENTE con el JSON final corregido, mismo formato.`;

function contieneProhibidas(t) {
  const s = (t || '').toLowerCase();
  return PALABRAS_PROHIBIDAS.some((p) => s.includes(p));
}

function validar(data) {
  if (!data || !Array.isArray(data.territorios) || data.territorios.length < 2) return false;
  for (const t of data.territorios) {
    if (!t.nombre || !t.percepcion || !t.por_que) return false;
    if (!Array.isArray(t.paleta) || !t.paleta.length) return false;
  }
  if (contieneProhibidas(JSON.stringify(data))) return false;
  return true;
}

async function gemini(systemPrompt, userText) {
  const apiKey = process.env.GEMINI_API_KEY;
  const model = process.env.GEMINI_MODEL || 'gemini-flash-latest';
  const res = await fetch(
    `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent`,
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'x-goog-api-key': apiKey },
      body: JSON.stringify({
        systemInstruction: { parts: [{ text: systemPrompt }] },
        contents: [{ role: 'user', parts: [{ text: userText }] }],
        generationConfig: { maxOutputTokens: 8192, responseMimeType: 'application/json' },
      }),
    }
  );
  if (!res.ok) {
    const detalle = await res.text().catch(() => '');
    throw new Error(`Gemini ${res.status}: ${detalle.slice(0, 200)}`);
  }
  const body = await res.json();
  const partes = body?.candidates?.[0]?.content?.parts || [];
  const texto = partes.map((p) => p?.text || '').join('');
  return JSON.parse(primerObjetoJson(texto));
}

// Extrae SOLO el primer objeto JSON balanceado (ignora texto o un segundo
// objeto que el modelo a veces agrega después). Respeta llaves dentro de
// strings y escapes.
function primerObjetoJson(texto) {
  const ini = texto.indexOf('{');
  if (ini === -1) return texto;
  let profundidad = 0, enString = false, escape = false;
  for (let i = ini; i < texto.length; i++) {
    const c = texto[i];
    if (escape) { escape = false; continue; }
    if (c === '\\') { escape = true; continue; }
    if (c === '"') { enString = !enString; continue; }
    if (enString) continue;
    if (c === '{') profundidad++;
    else if (c === '}') {
      profundidad--;
      if (profundidad === 0) return texto.slice(ini, i + 1);
    }
  }
  return texto.slice(ini);
}

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Método no permitido' });
  if (!process.env.GEMINI_API_KEY) return res.status(503).json({ error: 'Motor no configurado' });

  const { pulso, brief, pulsoRunId, nombre } = req.body || {};
  if (!pulso && !brief) return res.status(400).json({ error: 'Faltan pulso y brief' });

  // 1) La tensión del consumidor es la clave de recuperación del RAG.
  // Los campos del brief pueden ser texto o arreglo (chips) — se normalizan.
  const str = (v) => (Array.isArray(v) ? v.join(', ') : (v || ''));
  const tensionConsumidor = [
    pulso?.diagnosticoMomento?.explicacion,
    pulso?.empathyMap?.piensaSiente,
    (pulso?.empathyMap?.pains || []).join('. '),
    str(brief?.percepcionDeseada),
    str(brief?.dejarDeSentir),
    str(brief?.tensionCategoria),
  ].filter(Boolean).join('\n');

  let casos = [];
  try {
    if (tensionConsumidor.trim()) {
      const q = await embed(tensionConsumidor);
      casos = await matchCases(q, 4);
    }
  } catch (e) {
    console.error('[estratega] embed/retrieve', e.message);
  }

  const contexto = `## PULSO DE LA MARCA
${JSON.stringify(pulso || {}, null, 2)}

## BRIEF VISUAL
${JSON.stringify(brief || {}, null, 2)}

## CASOS ANÁLOGOS (referencia de criterio, NO de forma)
${casos.length ? JSON.stringify(casos, null, 2) : 'Sin casos análogos aún — apóyate en el criterio de Brandon.'}`;

  try {
    const borrador = await gemini(PROMPT_GEN, contexto);
    let final = borrador;
    try {
      const editado = await gemini(PROMPT_EDIT, `${contexto}\n\nBORRADOR:\n${JSON.stringify(borrador)}`);
      if (validar(editado)) final = editado;
    } catch (e) {
      console.error('[estratega] pase 2', e.message);
    }
    if (validar(final)) {
      const saved = await sbInsert('brand_projects', {
        pulso_run_id: pulsoRunId || null,
        nombre: nombre || pulso?.nombre || null,
        brief: brief || null,
        territorios: final.territorios,
        estado: 'direccion',
      });
      return res.status(200).json({ ...final, projectId: saved?.id || null, casosUsados: casos.length });
    }
    console.error('[estratega] output no válido');
  } catch (e) {
    console.error('[estratega] pase 1', e.message);
  }
  return res.status(502).json({ error: 'No se pudo generar la dirección creativa' });
}

// --- FUNCIÓN SERVERLESS: MOTOR DE SÍNTESIS v2 (Vercel) ---
// Arquitectura: capa de conocimiento (api/_kb.js) + DOS pases del modelo:
//   Pase 1 (generación): respuestas → entregables canónicos + diagnóstico de
//   momento + análisis, con la metodología completa como contexto.
//   Pase 2 (edición): el borrador se revisa contra el checklist de calidad y
//   se devuelve corregido. Es la diferencia entre borrador y versión editada.
// Proveedor: Gemini. Env: GEMINI_API_KEY (requerida), GEMINI_MODEL (opcional).
// Sin clave → 503 y el frontend usa el fallback de plantillas.

import { KB_METODOLOGIA, KB_FRAMEWORKS, KB_HEURISTICAS } from './_kb.js';

const PALABRAS_PROHIBIDAS = [
  'ecosistema', 'arquitecto de', 'orquestador', 'resonó', 'sin compromiso',
  'no dejes pasar', 'descubre cómo', 'experiencias digitales',
  'conocimiento técnico', 'persona del otro lado',
];

const FORMATO_JSON = `{
  "pulsoEnUnaFrase": "quién es, para quién y por qué importa — con las palabras del usuario",
  "buyerPersona": { "perfil": "", "jobs": [""], "barreras": [""], "triggers": [""] },
  "empathyMap": { "piensaSiente": "", "ve": "", "oye": "", "diceHace": "", "pains": [""], "gains": [""] },
  "vpc": { "productosServicios": [""], "painRelievers": [""], "gainCreators": [""], "jobs": [""], "pains": [""], "gains": [""] },
  "bigIdeal": { "tension": "", "loMejor": "", "statement": "[Marca] cree que el mundo sería mejor si …" },
  "diagnosticoMomento": { "momento": "LLEGAS|SIENTES|ATERRIZAS|CONFÍAS|ACTÚAS", "explicacion": "dónde y por qué se rompe la conexión para ESTE negocio, con su evidencia" },
  "fortaleza": "una fortaleza que el usuario probablemente no ve",
  "desconexion": "una tensión entre sus respuestas",
  "siguientePaso": "acción concreta ejecutable esta semana, derivada del momento diagnosticado",
  "preguntasAbiertas": ["vacíos honestos formulados como preguntas"]
}`;

const PROMPT_GENERACION = `Eres el motor de análisis del Pulso de Identidad Express, construido sobre el método "Ese Momento" de Brandon Chimal. Tu trabajo: transformar las respuestas crudas de una persona sobre su negocio en (a) sus 4 entregables estratégicos con la estructura canónica del método y (b) un análisis breve y certero.

${KB_METODOLOGIA}
${KB_FRAMEWORKS}
${KB_HEURISTICAS}

REGLAS INQUEBRANTABLES:
1. Usa SOLO lo que la persona escribió. Redacta y REESTRUCTURA (separa barreras de triggers, distribuye evidencia en cuadrantes, conecta relievers con pains) pero NUNCA inventes hechos, datos ni características que no estén en sus respuestas.
2. Campo sin evidencia = déjalo vacío ("" o []) y conviértelo en pregunta abierta. Prohibido rellenar con genéricos.
3. En el análisis (fortaleza, desconexion, siguientePaso) cita palabras textuales del usuario entre comillas al menos una vez por campo.
4. Prueba del intercambio en todo: si algo serviría igual para otro negocio del mismo giro, reescríbelo.
5. Sé directo y afirmativo donde hay evidencia; nunca condicionales blandos.
6. Palabras prohibidas (no usarlas jamás): ${PALABRAS_PROHIBIDAS.join(', ')}.
7. Máximo 60 palabras por campo de texto; máximo 4 elementos por lista.
8. Todo en español, en segunda persona ("tu cliente", "tu negocio").

Responde ÚNICAMENTE con un objeto JSON válido, sin markdown, con esta forma exacta:
${FORMATO_JSON}`;

const PROMPT_EDICION = `Eres el editor de calidad del método "Ese Momento". Recibes las respuestas originales de un usuario y un borrador de análisis en JSON. Tu trabajo: devolver la VERSIÓN FINAL corregida del mismo JSON.

${KB_HEURISTICAS}

CHECKLIST — corrige todo lo que falle:
1. ¿Cada afirmación es rastreable a las respuestas originales? Lo inventado se elimina o se convierte en pregunta abierta.
2. ¿Cada campo pasa la prueba del intercambio? Lo genérico se reescribe con la especificidad de las respuestas o se vacía.
3. ¿Barreras y triggers están realmente separados? ¿Cada painReliever conecta con un pain del cliente?
4. ¿El statement del Big Ideal es específico y creíble, no un eslogan hueco?
5. ¿El diagnóstico de momento es UNO solo, el más crítico, con evidencia?
6. ¿El siguientePaso es ejecutable esta semana y deriva del diagnóstico?
7. ¿Hay al menos una cita textual del usuario en fortaleza, desconexion y siguientePaso?
8. Cero palabras prohibidas: ${PALABRAS_PROHIBIDAS.join(', ')}. Cero tono infomercial.
9. Máximo 60 palabras por campo de texto, 4 elementos por lista.

Responde ÚNICAMENTE con el objeto JSON final corregido, sin markdown, mismo formato que el borrador.`;

function contieneProhibidas(texto) {
  const t = (texto || '').toLowerCase();
  return PALABRAS_PROHIBIDAS.some((p) => t.includes(p));
}

function validar(data) {
  if (!data || typeof data !== 'object') return false;
  const requeridos = ['pulsoEnUnaFrase', 'buyerPersona', 'empathyMap', 'vpc', 'bigIdeal', 'diagnosticoMomento', 'fortaleza', 'desconexion', 'siguientePaso', 'preguntasAbiertas'];
  if (requeridos.some((k) => data[k] === undefined || data[k] === null)) return false;
  if (typeof data.pulsoEnUnaFrase !== 'string' || !data.pulsoEnUnaFrase.trim()) return false;
  if (!Array.isArray(data.preguntasAbiertas)) return false;
  const momentos = ['LLEGAS', 'SIENTES', 'ATERRIZAS', 'CONFÍAS', 'ACTÚAS'];
  if (!momentos.includes((data.diagnosticoMomento?.momento || '').toUpperCase())) return false;
  // Filtro de marca sobre todo el contenido generado.
  if (contieneProhibidas(JSON.stringify(data))) return false;
  return true;
}

async function llamarModelo(apiKey, systemPrompt, userText) {
  const model = process.env.GEMINI_MODEL || 'gemini-flash-latest';
  const res = await fetch(
    `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent`,
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'x-goog-api-key': apiKey },
      body: JSON.stringify({
        systemInstruction: { parts: [{ text: systemPrompt }] },
        contents: [{ role: 'user', parts: [{ text: userText }] }],
        generationConfig: {
          maxOutputTokens: 8192,
          responseMimeType: 'application/json',
        },
      }),
    }
  );
  if (!res.ok) {
    const detalle = await res.text().catch(() => '');
    throw new Error(`Gemini ${res.status}: ${detalle.slice(0, 300)}`);
  }
  const body = await res.json();
  const partes = body?.candidates?.[0]?.content?.parts || [];
  let texto = partes.map((p) => p?.text || '').join('');
  const ini = texto.indexOf('{');
  const fin = texto.lastIndexOf('}');
  if (ini !== -1 && fin > ini) texto = texto.slice(ini, fin + 1);
  return JSON.parse(texto);
}

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Método no permitido' });

  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) return res.status(503).json({ error: 'Motor no configurado' });

  const { answers } = req.body || {};
  if (!answers || typeof answers !== 'object') return res.status(400).json({ error: 'Faltan respuestas' });

  const respuestasTexto = `Respuestas del ejercicio (los campos vacíos son vacíos reales, no los rellenes):\n${JSON.stringify(answers, null, 2)}`;

  try {
    // PASE 1 · Generación con la capa de conocimiento completa.
    const borrador = await llamarModelo(apiKey, PROMPT_GENERACION, respuestasTexto);

    // PASE 2 · Edición de calidad contra el checklist.
    let final = borrador;
    try {
      const editado = await llamarModelo(
        apiKey,
        PROMPT_EDICION,
        `${respuestasTexto}\n\nBORRADOR A CORREGIR:\n${JSON.stringify(borrador)}`
      );
      if (validar(editado)) final = editado;
      else console.error('[pulso-sintesis] pase 2 no pasó validación; se usa el borrador');
    } catch (e) {
      console.error('[pulso-sintesis] pase 2 falló, se usa el borrador:', e.message);
    }

    if (validar(final)) return res.status(200).json(final);
    console.error('[pulso-sintesis] output final no pasó validación');
  } catch (e) {
    console.error('[pulso-sintesis] pase 1 falló:', e.message);
  }

  // Reintento simple del pase 1 antes de rendirse.
  try {
    const data = await llamarModelo(apiKey, PROMPT_GENERACION, respuestasTexto);
    if (validar(data)) return res.status(200).json(data);
    console.error('[pulso-sintesis] reintento no pasó validación');
  } catch (e) {
    console.error('[pulso-sintesis] reintento falló:', e.message);
  }

  return res.status(502).json({ error: 'Síntesis no disponible' });
}

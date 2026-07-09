// --- FUNCIÓN SERVERLESS: MOTOR DE SÍNTESIS (Vercel) ---
// Prompt v0.1 validado con 3 casos (motor-sintesis-pruebas.md).
// Proveedor actual: Gemini (decisión de Brandon 2026-07-08, mientras no haya
// clave de Anthropic). Requiere env var GEMINI_API_KEY en Vercel; opcional
// GEMINI_MODEL (default gemini-2.5-flash). Sin clave responde 503 y el
// frontend usa el fallback honesto (canvas de plantilla + síntesis pendiente).

const PALABRAS_PROHIBIDAS = [
  'ecosistema', 'arquitecto de', 'orquestador', 'resonó', 'sin compromiso',
  'no dejes pasar', 'descubre cómo', 'experiencias digitales',
  'conocimiento técnico', 'persona del otro lado',
];

const PROMPT_SISTEMA = `Eres el motor de análisis del Pulso de Identidad Express de Brandon Chimal.
Recibes las respuestas de una persona sobre su negocio y produces un análisis breve en español.

REGLAS INQUEBRANTABLES:
1. Usa SOLO lo que la persona escribió. Cada afirmación tuya debe poder rastrearse a una respuesta concreta. Cita sus palabras textuales entre comillas al menos una vez por observación.
2. Si no hay evidencia suficiente para una observación, NO la inventes: formúlala como pregunta abierta.
3. Prueba del intercambio: si una observación serviría igual para otro negocio del mismo giro, está mal; reescríbela con la especificidad de las respuestas.
4. Sé directo y afirmativo donde hay evidencia. Nunca uses condicionales blandos ("podrías considerar"). Donde no hay evidencia, pregunta.
5. Al menos una observación debe conectar respuestas de secciones distintas (una conexión que la persona probablemente no hizo).
6. Palabras prohibidas (no usarlas nunca): ${PALABRAS_PROHIBIDAS.join(', ')}. Nada de tono infomercial ni de gurú.
7. Máximo 60 palabras por campo.

CALIBRACIÓN POR TIPO DE CLIENTE (campo "tipoCliente"):
- "A empresas": lenguaje de negocio (clientes, ventas, resultados) sin jerga corporativa.
- "A personas": lenguaje cotidiano de consumo; nada de vocabulario de marketing.
- "A ambos" o vacío: lenguaje llano que funcione para los dos.

CALIBRACIÓN POR MOMENTO DEL NEGOCIO:
- Arrancando: prioriza claridad de a quién hablarle primero.
- Estancado: prioriza la desconexión detectada.
- Creciendo/Escalando: prioriza consistencia y lo que puede probar.

Responde ÚNICAMENTE con un objeto JSON válido, sin markdown, con esta forma exacta:
{"pulsoEnUnaFrase": "...", "fortaleza": "...", "desconexion": "...", "siguientePaso": "...", "preguntasAbiertas": ["..."]}`;

function contieneProhibidas(texto) {
  const t = (texto || '').toLowerCase();
  return PALABRAS_PROHIBIDAS.some((p) => t.includes(p));
}

function validar(data) {
  const campos = [data.pulsoEnUnaFrase, data.fortaleza, data.desconexion, data.siguientePaso];
  if (campos.some((c) => typeof c !== 'string' || !c.trim())) return false;
  if (campos.some(contieneProhibidas)) return false;
  if (!Array.isArray(data.preguntasAbiertas)) return false;
  return true;
}

async function llamarModelo(apiKey, answers) {
  const model = process.env.GEMINI_MODEL || 'gemini-2.5-flash';
  const res = await fetch(
    `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-goog-api-key': apiKey,
      },
      body: JSON.stringify({
        systemInstruction: { parts: [{ text: PROMPT_SISTEMA }] },
        contents: [
          {
            role: 'user',
            parts: [
              {
                text: `Respuestas del ejercicio (los campos vacíos son vacíos reales, no los rellenes):\n${JSON.stringify(answers, null, 2)}`,
              },
            ],
          },
        ],
        generationConfig: {
          maxOutputTokens: 1024,
          responseMimeType: 'application/json',
        },
      }),
    }
  );
  if (!res.ok) throw new Error(`API ${res.status}`);
  const body = await res.json();
  const texto = body?.candidates?.[0]?.content?.parts?.[0]?.text || '';
  return JSON.parse(texto);
}

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Método no permitido' });

  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) return res.status(503).json({ error: 'Motor no configurado' });

  const { answers } = req.body || {};
  if (!answers || typeof answers !== 'object') return res.status(400).json({ error: 'Faltan respuestas' });

  // Hasta 2 intentos si el output no pasa validación (regla 7 de la spec).
  for (let intento = 0; intento < 2; intento++) {
    try {
      const data = await llamarModelo(apiKey, answers);
      if (validar(data)) return res.status(200).json(data);
    } catch {
      // sigue al siguiente intento
    }
  }
  return res.status(502).json({ error: 'Síntesis no disponible' });
}

// --- CLIENTE DEL MOTOR DE SÍNTESIS ---
// Llama a la función serverless /api/pulso-sintesis. Si falla o el output
// no pasa validación, cae al fallback honesto definido en la spec:
// los canvas de plantilla se muestran igual y la síntesis se marca pendiente.

import { PALABRAS_PROHIBIDAS } from './questions';

export function pasaFiltroDeMarca(texto) {
  if (!texto) return false;
  const t = texto.toLowerCase();
  return !PALABRAS_PROHIBIDAS.some((p) => t.includes(p));
}

export async function pedirSintesis(answers) {
  try {
    const res = await fetch('/api/pulso-sintesis', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ answers }),
    });
    if (!res.ok) return { ok: false };

    const data = await res.json();
    // Validación mínima de estructura v2 + filtro de marca sobre todo el JSON.
    const campos = [data.pulsoEnUnaFrase, data.fortaleza, data.desconexion, data.siguientePaso];
    if (campos.some((c) => typeof c !== 'string' || !c.trim())) return { ok: false };
    if (!data.buyerPersona || !data.empathyMap || !data.vpc || !data.bigIdeal) return { ok: false };
    if (!data.diagnosticoMomento?.momento) return { ok: false };
    if (!pasaFiltroDeMarca(JSON.stringify(data))) return { ok: false };

    return { ok: true, data };
  } catch {
    return { ok: false };
  }
}

export async function guardarLead({ nombre, email, answers, runId }) {
  try {
    const res = await fetch('/api/pulso-lead', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ nombre, email, answers, runId, ts: new Date().toISOString() }),
    });
    return res.ok;
  } catch {
    return false;
  }
}

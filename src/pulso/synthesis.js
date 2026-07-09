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
    // Validación mínima de estructura + filtro de marca sobre todo el texto.
    const campos = [data.pulsoEnUnaFrase, data.fortaleza, data.desconexion, data.siguientePaso];
    if (campos.some((c) => typeof c !== 'string' || !c.trim())) return { ok: false };
    if (!campos.every(pasaFiltroDeMarca)) return { ok: false };

    return { ok: true, data };
  } catch {
    return { ok: false };
  }
}

export async function guardarLead({ nombre, email, answers }) {
  try {
    const res = await fetch('/api/pulso-lead', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ nombre, email, answers, ts: new Date().toISOString() }),
    });
    return res.ok;
  } catch {
    return false;
  }
}

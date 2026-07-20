// --- FUNCIÓN SERVERLESS: CAPTURA DE LEAD ---
// Guarda el lead en Supabase (tabla pulso_leads), ligado a su corrida de
// análisis vía run_id cuando existe. Si Supabase no está configurado, el
// registro queda al menos en los logs de Vercel.
// [PENDIENTE Fase 3.2/3.3: generar PDF y enviarlo por email al capturar.]

import { sbInsert } from './_supabase.js';

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Método no permitido' });

  const { nombre, email, answers, runId, ts } = req.body || {};
  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return res.status(400).json({ error: 'Email inválido' });
  }

  const saved = await sbInsert('pulso_leads', {
    nombre: nombre || null,
    email,
    run_id: runId || null,
    answers: answers || null,
  });

  if (!saved) console.log('[pulso-lead]', JSON.stringify({ nombre, email, runId, ts }));

  return res.status(200).json({ ok: true });
}

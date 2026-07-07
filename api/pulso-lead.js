// --- FUNCIÓN SERVERLESS: CAPTURA DE LEAD (MVP) ---
// Decisión de spec: almacenamiento simple ahora, CRM después.
// [PENDIENTE: conectar almacenamiento (Vercel KV / Google Sheets) y envío de
// PDF por email (proveedor transaccional por definir). Por ahora registra en
// logs de Vercel y responde ok para no romper el flujo.]

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Método no permitido' });

  const { nombre, email, ts } = req.body || {};
  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return res.status(400).json({ error: 'Email inválido' });
  }

  // Visible en los logs de funciones de Vercel mientras no haya almacenamiento.
  console.log('[pulso-lead]', JSON.stringify({ nombre, email, ts }));

  return res.status(200).json({ ok: true });
}

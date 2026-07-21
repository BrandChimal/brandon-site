// --- GUARDA EL TERRITORIO ELEGIDO ---
// Marca el territorio seleccionado en brand_projects y avanza el estado.
// (F2/F3 tomarán este territorio para generar logo, paleta, etc.)

const SB_URL = process.env.SUPABASE_URL;
const SB_KEY = process.env.SUPABASE_SERVICE_KEY;

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Método no permitido' });
  const { projectId, indice } = req.body || {};
  if (!projectId || indice === undefined) return res.status(400).json({ error: 'Faltan datos' });
  if (!SB_URL || !SB_KEY) return res.status(503).json({ error: 'Supabase no configurado' });

  try {
    const r = await fetch(`${SB_URL}/rest/v1/brand_projects?id=eq.${projectId}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        apikey: SB_KEY,
        Authorization: `Bearer ${SB_KEY}`,
      },
      body: JSON.stringify({ territorio_elegido: indice, estado: 'generacion' }),
    });
    if (!r.ok) return res.status(502).json({ error: 'No se pudo guardar' });
    return res.status(200).json({ ok: true });
  } catch (e) {
    console.error('[branding-elegir]', e.message);
    return res.status(502).json({ error: 'Error' });
  }
}

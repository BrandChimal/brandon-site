// --- HELPER SUPABASE (REST, sin SDK) ---
// Escribe vía la API REST de Supabase con la service key. Sin dependencias
// nuevas. Si las variables no están configuradas o la escritura falla, se
// registra y se sigue: guardar NUNCA debe romper la experiencia del usuario.
// Env: SUPABASE_URL (https://xxxx.supabase.co) + SUPABASE_SERVICE_KEY.
// El prefijo "_" evita que Vercel lo exponga como endpoint.

export async function sbInsert(table, row) {
  const url = process.env.SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_KEY;
  if (!url || !key) return null;

  try {
    const res = await fetch(`${url}/rest/v1/${table}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        apikey: key,
        Authorization: `Bearer ${key}`,
        Prefer: 'return=representation',
      },
      body: JSON.stringify(row),
    });
    if (!res.ok) {
      const detalle = await res.text().catch(() => '');
      console.error(`[supabase] ${table} ${res.status}: ${detalle.slice(0, 200)}`);
      return null;
    }
    const data = await res.json();
    return Array.isArray(data) ? data[0] : data;
  } catch (e) {
    console.error('[supabase]', e.message);
    return null;
  }
}

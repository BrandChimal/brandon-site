// --- CLIENTE DEL AGENTE ESTRATEGA ---
// Llama a /api/branding-estratega con el brief. Devuelve 2-3 territorios.

export async function pedirTerritorios({ brief, pulso, pulsoRunId, nombre }) {
  try {
    const res = await fetch('/api/branding-estratega', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ brief, pulso, pulsoRunId, nombre }),
    });
    if (!res.ok) return { ok: false };
    const data = await res.json();
    if (!Array.isArray(data.territorios) || data.territorios.length < 2) return { ok: false };
    return { ok: true, data };
  } catch {
    return { ok: false };
  }
}

export async function elegirTerritorio({ projectId, indice }) {
  try {
    const res = await fetch('/api/branding-elegir', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ projectId, indice }),
    });
    return res.ok;
  } catch {
    return false;
  }
}

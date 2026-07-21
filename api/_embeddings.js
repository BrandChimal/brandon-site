// --- HELPER DE EMBEDDINGS (Gemini) ---
// Vectoriza texto para el RAG. Modelo: text-embedding-004 (768 dims), que
// coincide con la columna vector(768) de brand_cases. Configurable por env.
// Requiere GEMINI_API_KEY (la misma del motor del Pulso).

export async function embed(texto) {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) throw new Error('GEMINI_API_KEY no configurada');

  const model = process.env.GEMINI_EMBED_MODEL || 'text-embedding-004';
  const res = await fetch(
    `https://generativelanguage.googleapis.com/v1beta/models/${model}:embedContent`,
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'x-goog-api-key': apiKey },
      body: JSON.stringify({
        model: `models/${model}`,
        content: { parts: [{ text: texto }] },
      }),
    }
  );
  if (!res.ok) {
    const detalle = await res.text().catch(() => '');
    throw new Error(`Embed ${res.status}: ${detalle.slice(0, 200)}`);
  }
  const body = await res.json();
  const vec = body?.embedding?.values;
  if (!Array.isArray(vec)) throw new Error('Embedding vacío');
  return vec;
}

// --- HELPER DE EMBEDDINGS (Gemini) ---
// Vectoriza texto para el RAG. Modelo vigente: gemini-embedding-001.
// Por defecto genera 3072 dims; pedimos 768 (outputDimensionality) para
// coincidir con la columna vector(768) de brand_cases. Para búsqueda por
// coseno (pgvector vector_cosine_ops) no hace falta normalizar.
// Requiere GEMINI_API_KEY (la misma del motor del Pulso).

export async function embed(texto) {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) throw new Error('GEMINI_API_KEY no configurada');

  const model = process.env.GEMINI_EMBED_MODEL || 'gemini-embedding-001';
  const dims = Number(process.env.GEMINI_EMBED_DIM || 768);

  const res = await fetch(
    `https://generativelanguage.googleapis.com/v1beta/models/${model}:embedContent`,
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'x-goog-api-key': apiKey },
      body: JSON.stringify({
        model: `models/${model}`,
        content: { parts: [{ text: texto }] },
        outputDimensionality: dims,
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

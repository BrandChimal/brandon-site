// --- MOTOR DE PLANTILLAS ---
// Arma los 4 canvas con las respuestas de la persona (determinístico, sin IA)
// y detecta vacíos. Regla de la spec: vacío = pregunta abierta, nunca relleno.

const LABELS = {
  mejorCliente: 'Tu mejor cliente real',
  trigger: 'Qué lo empujó a buscarte',
  barrera: 'Qué casi lo detiene',
  verbatim: 'En sus palabras',
  creeNecesita: 'Cree que necesita vs. necesita',
  competencia: 'Qué oye de otras opciones',
  antesDespues: 'El dolor que desaparece (antes → después)',
  distinto: 'Lo difícil de encontrar en otro lado',
  prueba: 'Lo que puedes probar',
  enoja: 'La tensión: qué está mal en tu industria',
  perderian: 'Lo mejor de tu negocio: qué perderían sin ti',
  mundoMejor: 'El mundo sería un poco mejor si…',
};

const PREGUNTAS_ABIERTAS = {
  mejorCliente: '¿Quién es tu mejor cliente real — el que volvió o volvería? Sin él, el resto del análisis habla de un cliente imaginario.',
  trigger: '¿Qué pasa en la vida de tu cliente justo antes de buscarte? Ese momento define dónde debe aparecer tu comunicación.',
  barrera: '¿Qué casi detiene a tu cliente de comprarte? Tu comunicación debería responderlo antes de que lo pregunte.',
  verbatim: '¿Qué frase textual te ha dicho un cliente? Vale más que cualquier eslogan.',
  creeNecesita: '¿Qué cree tu cliente que necesita y qué necesita en realidad? La diferencia entre ambas es tu ángulo de comunicación.',
  competencia: '¿Qué promesas oye tu cliente de otras opciones? Sin esto no sabes contra qué te comparan.',
  antesDespues: '¿Qué cambia concretamente para tu cliente (antes → después)? Es la base de tu propuesta de valor.',
  distinto: '¿Qué haces que cuesta encontrar en otro lado? Sin esto, compites por precio.',
  prueba: '¿Qué resultado puedes probar con un dato o un caso? Prometer sin prueba es lo que hace todo el mundo.',
  enoja: '¿Qué te enoja de tu industria? Sin tensión no hay propósito, solo producto.',
  perderian: '¿Qué perderían tus clientes si desaparecieras? Si la respuesta es "nada", ese es el hallazgo.',
  mundoMejor: 'Completa: "el mundo sería un poco mejor si…" — el cierre de tu Big Ideal.',
};

const clean = (v) => (typeof v === 'string' ? v.trim() : '');

export function buildCanvases(answers) {
  const item = (id) => ({
    id,
    label: LABELS[id],
    value: clean(answers[id]) || null,
  });

  return [
    {
      framework: 'Buyer Persona',
      subtitle: 'A quién le hablas',
      items: [item('mejorCliente'), item('trigger'), item('barrera')],
    },
    {
      framework: 'Empathy Map',
      subtitle: 'Qué siente',
      items: [item('verbatim'), item('creeNecesita'), item('competencia')],
    },
    {
      framework: 'Value Proposition Canvas',
      subtitle: 'Qué resuelves',
      items: [item('antesDespues'), item('distinto'), item('prueba')],
    },
    {
      framework: 'Big Ideal',
      subtitle: 'Por qué importas',
      items: [item('enoja'), item('perderian'), item('mundoMejor')],
    },
  ];
}

export function detectGaps(answers) {
  return Object.keys(PREGUNTAS_ABIERTAS)
    .filter((id) => !clean(answers[id]))
    .map((id) => PREGUNTAS_ABIERTAS[id]);
}

export function countAnswered(answers) {
  return Object.keys(PREGUNTAS_ABIERTAS).filter((id) => clean(answers[id])).length;
}

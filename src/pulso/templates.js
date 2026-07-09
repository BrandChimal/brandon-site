// --- MOTOR DE PLANTILLAS ---
// Arma los 4 canvas con las respuestas de la persona (determinístico, sin IA)
// y detecta vacíos. Regla de la spec: vacío = pregunta abierta, nunca relleno.
// Estructura fiel al Brandbook v2.0 §07–§10 y Modelo de Negocio 2026 §03.1.

const LABELS = {
  quienEs: 'Quién es',
  queResuelve: 'Qué necesita resolver (jobs to be done)',
  frenaEmpuja: 'Barreras y triggers de compra',
  piensaSiente: 'Qué piensa y siente',
  veOye: 'Qué ve y oye',
  doloresGanancias: 'Pains y gains',
  queOfreces: 'Productos y servicios',
  aliviaDolores: 'Cómo alivia dolores (pain relievers)',
  generaGanancias: 'Qué ganancias genera (gain creators)',
  tension: 'Tensión cultural',
  loMejor: 'Lo mejor de la marca',
  mundoMejor: 'El mundo sería mejor si…',
};

const PREGUNTAS_ABIERTAS = {
  quienEs: '¿Quién es tu cliente ideal? Sin perfil definido, el resto no tiene punto de referencia.',
  queResuelve: '¿Qué necesita resolver tu cliente? Sus jobs to be done definen qué le tienes que decir.',
  frenaEmpuja: '¿Qué lo frena antes de comprarte y qué lo empuja a decidirse? Barreras y triggers mueven la decisión.',
  piensaSiente: '¿Qué piensa y siente tu cliente? La capa emocional detrás de sus decisiones.',
  veOye: '¿Qué ve y oye a su alrededor? Su entorno define contra qué te comparan.',
  doloresGanancias: '¿Qué le duele hoy y qué quiere ganar? Pains y gains son la materia prima de tu propuesta.',
  queOfreces: '¿Qué productos o servicios ofreces, dicho en simple? Si cuesta explicarlo, cuesta comprarlo.',
  aliviaDolores: '¿Cómo alivias los dolores de tu cliente? El encaje empieza aquí.',
  generaGanancias: '¿Qué ganancias le generas? El resultado que se lleva, no la lista de servicios.',
  tension: '¿Qué está mal en tu industria y ya cansó a tus clientes? Sin tensión cultural no hay Big Ideal.',
  loMejor: '¿Qué es lo mejor que tu marca hace por sus clientes? La otra mitad de tu Big Ideal.',
  mundoMejor: 'Completa: "mi marca cree que el mundo sería mejor si…" — tu propósito en una frase.',
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
      items: [item('quienEs'), item('queResuelve'), item('frenaEmpuja')],
    },
    {
      framework: 'Empathy Map',
      subtitle: 'Qué siente',
      items: [item('piensaSiente'), item('veOye'), item('doloresGanancias')],
    },
    {
      framework: 'Value Proposition Canvas',
      subtitle: 'Qué resuelves',
      items: [item('queOfreces'), item('aliviaDolores'), item('generaGanancias')],
    },
    {
      framework: 'The Big Ideal',
      subtitle: 'Por qué importas',
      items: [item('tension'), item('loMejor'), item('mundoMejor')],
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

// --- BRIEF VISUAL · Branding Builder ---
// Complementa al Pulso. Centrado en el CONSUMIDOR, no en el gusto del dueño
// (eso da genérico). Deriva lo visual del mundo emocional del consumidor.
// Cada respuesta alimenta al agente Estratega.

export const BRIEF_SECTIONS = [
  {
    id: 'percepcion',
    label: 'Percepción',
    intro: 'Lo que tu consumidor debe sentir — no lo que debe pensar.',
    questions: [
      {
        id: 'percepcionDeseada',
        type: 'textarea',
        q: 'Cuando tu consumidor ve tu marca por primera vez, ¿qué debe sentir en un segundo?',
        hint: 'Una emoción, no una lista de features. Ej. "que por fin encontró a alguien serio que no lo va a estafar".',
      },
      {
        id: 'dejarDeSentir',
        type: 'textarea',
        q: '¿Qué debe dejar de sentir?',
        hint: 'La emoción negativa que hoy carga y tu marca disuelve. Ej. "miedo a equivocarse", "que lo tratan como número".',
      },
      {
        id: 'papelMarca',
        type: 'select',
        q: '¿Qué papel debe ocupar tu marca en su vida?',
        options: ['Guía', 'Respaldo', 'Aliado', 'Experto', 'Refugio', 'Impulso'],
      },
    ],
  },
  {
    id: 'territorio',
    label: 'Territorio',
    intro: 'Hacia dónde jala tu consumidor — sin vocabulario de diseño.',
    questions: [
      {
        id: 'ejeCalidez',
        type: 'scale',
        q: '¿Tu consumidor conecta más con lo cálido y humano, o con lo preciso y estructurado?',
        left: 'Cálido y humano',
        right: 'Preciso y estructurado',
      },
      {
        id: 'ejeForma',
        type: 'scale',
        q: '¿Con lo orgánico y natural, o con lo geométrico y tecnológico?',
        left: 'Orgánico y natural',
        right: 'Geométrico y tecnológico',
      },
      {
        id: 'ejeTono',
        type: 'scale',
        q: '¿Con lo cercano y accesible, o con lo premium y aspiracional?',
        left: 'Cercano y accesible',
        right: 'Premium y aspiracional',
      },
    ],
  },
  {
    id: 'categoria',
    label: 'Categoría',
    intro: 'Para NO parecernos a los demás, primero hay que verlos.',
    questions: [
      {
        id: 'tensionCategoria',
        type: 'textarea',
        q: '¿Cómo se ve "todo el mundo" en tu industria? Descríbelo.',
        hint: 'Los colores, símbolos y estilos que todos usan. Justo lo que vamos a evitar.',
      },
      {
        id: 'referenciaAmada',
        type: 'textarea',
        q: '¿Hay alguna marca (de cualquier industria) cuyo estilo te encante? ¿Por qué?',
        hint: 'El porqué importa más que la marca. Opcional.',
      },
    ],
  },
  {
    id: 'restricciones',
    label: 'Restricciones',
    intro: 'Qué NO puede ser.',
    questions: [
      {
        id: 'prohibido',
        type: 'textarea',
        q: '¿Qué colores, estilos o connotaciones NO quieres bajo ninguna circunstancia?',
        hint: 'Ej. "nada de rosa", "que no parezca infantil", "evitar el rojo por la competencia".',
      },
      {
        id: 'obligatorio',
        type: 'textarea',
        q: '¿Hay algo que SÍ o SÍ deba estar? (un color de marca ya existente, un símbolo, etc.)',
        hint: 'Opcional. Si empiezas de cero, déjalo vacío.',
      },
    ],
  },
];

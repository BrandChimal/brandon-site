// --- BRIEF VISUAL · Branding Builder ---
// Complementa al Pulso. Centrado en el CONSUMIDOR, no en el gusto del dueño.
// Las opciones de emoción se ADAPTAN al papel que la marca ocupa (como los
// placeholders del Pulso se adaptaban al tipo de cliente).

export const BRIEF_SECTIONS = [
  {
    id: 'contexto',
    label: 'Contexto',
    intro: 'Lo mínimo para que el análisis hable de tu marca y no de una genérica.',
    questions: [
      {
        id: 'nombre',
        type: 'text',
        q: '¿Cómo se llama tu marca? (o el proyecto, si aún no tiene nombre)',
        hint: 'Si todavía no tienes nombre, déjalo vacío — el naming es un paso aparte.',
      },
      {
        id: 'queVende',
        type: 'text',
        q: '¿Qué vendes y a quién? En una línea.',
        hint: 'Ej. "Manzanas y frutas con chamoy para jóvenes que buscan antojo".',
      },
      {
        id: 'papelMarca',
        type: 'select',
        q: '¿Qué papel debe ocupar tu marca en la vida de tu consumidor?',
        hint: 'Esto ajusta las siguientes preguntas a tu caso.',
        options: ['Guía', 'Respaldo', 'Aliado', 'Experto', 'Refugio', 'Impulso'],
      },
    ],
  },
  {
    id: 'percepcion',
    label: 'Percepción',
    intro: 'Lo que tu consumidor debe sentir — elige las que apliquen o agrega la tuya.',
    questions: [
      {
        id: 'percepcionDeseada',
        type: 'chips',
        q: 'Cuando tu consumidor ve tu marca por primera vez, ¿qué debe sentir?',
        hint: 'Elige las emociones clave (una o varias). Si falta la tuya, agrégala.',
        getOptions: (a) => emocionesPositivas(a.papelMarca),
      },
      {
        id: 'dejarDeSentir',
        type: 'chips',
        q: '¿Qué debe dejar de sentir?',
        hint: 'La carga emocional que hoy tiene y tu marca disuelve.',
        getOptions: (a) => emocionesNegativas(a.papelMarca),
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
        type: 'chips',
        q: '¿Cómo se ve "todo el mundo" en tu industria?',
        hint: 'Los códigos saturados que vamos a evitar. Elige los que reconozcas o agrega el tuyo.',
        getOptions: () => [
          'Fotos de producto sobre fondo blanco', 'Colores muy saturados', 'Mucho rojo/amarillo de "oferta"',
          'Mascotas o personajes caricatura', 'Tipografías redondas infantiles', 'Estilo minimalista frío',
          'Degradados llamativos', 'Símbolos obvios de la categoría', 'Estética "artesanal" genérica',
          'Todo se ve igual / intercambiable',
        ],
      },
      {
        id: 'referenciaAmada',
        type: 'textarea',
        q: '¿Hay alguna marca (de cualquier industria) cuyo estilo te encante?',
        hint: 'Dime cuál Y por qué te gusta: ¿su color, su tono, cómo te hace sentir, su tipografía, su empaque? El porqué vale más que el nombre. Puede ser de otra industria totalmente distinta. Opcional.',
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
        hint: 'Ej. "nada de rosa", "que no parezca infantil", "evitar el verde por la competencia".',
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

// --- Bancos de emoción adaptados al papel de la marca (adaptividad) ---
const BASE_POS = ['Confianza', 'Claridad', 'Cercanía', 'Alivio', 'Pertenencia', 'Seguridad', 'Entusiasmo', 'Curiosidad', 'Cuidado', 'Antojo'];
const BASE_NEG = ['Miedo a equivocarse', 'Desconfianza', 'Confusión', 'Frustración', 'Que lo tratan como número', 'Estar solo en la decisión', 'Sentirse abrumado', 'Dudas', 'Aburrimiento', 'Distancia'];

const PRIORIDAD_POS = {
  Guía: ['Claridad', 'Confianza', 'Seguridad'],
  Respaldo: ['Seguridad', 'Alivio', 'Cuidado'],
  Aliado: ['Cercanía', 'Pertenencia', 'Confianza'],
  Experto: ['Confianza', 'Seguridad', 'Claridad'],
  Refugio: ['Alivio', 'Cuidado', 'Pertenencia'],
  Impulso: ['Entusiasmo', 'Antojo', 'Curiosidad'],
};

const PRIORIDAD_NEG = {
  Guía: ['Confusión', 'Estar solo en la decisión', 'Dudas'],
  Respaldo: ['Miedo a equivocarse', 'Sentirse abrumado', 'Estar solo en la decisión'],
  Aliado: ['Distancia', 'Que lo tratan como número', 'Desconfianza'],
  Experto: ['Desconfianza', 'Dudas', 'Confusión'],
  Refugio: ['Sentirse abrumado', 'Miedo a equivocarse', 'Distancia'],
  Impulso: ['Aburrimiento', 'Distancia', 'Dudas'],
};

function reordenar(base, prioridad) {
  if (!prioridad) return base;
  const front = prioridad.filter((x) => base.includes(x));
  const rest = base.filter((x) => !front.includes(x));
  return [...front, ...rest];
}

function emocionesPositivas(papel) {
  return reordenar(BASE_POS, PRIORIDAD_POS[papel]);
}
function emocionesNegativas(papel) {
  return reordenar(BASE_NEG, PRIORIDAD_NEG[papel]);
}

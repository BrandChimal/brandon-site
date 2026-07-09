// --- PULSO DE IDENTIDAD EXPRESS · DEFINICIÓN DEL EJERCICIO ---
// Preguntas fieles a los frameworks tal como están documentados en el
// Brandbook Ese Momento v2.0 (§07–§10) y el Modelo de Negocio 2026 (§03.1):
// · Buyer Persona = perfil + jobs to be done + barreras y triggers
// · Empathy Map = ve / oye / piensa y siente / pains y gains
// · Value Proposition Canvas = productos y servicios + pain relievers + gain creators
// · The Big Ideal = tensión cultural (lo que cansa a los CLIENTES, no a la
//   industria) + lo mejor de la marca → "el mundo sería mejor si…"
//
// Los placeholders se adaptan al tipo de cliente (empresas / personas) elegido
// en el contexto: pueden ser string o { empresas, personas }.

export const MOMENTOS_NEGOCIO = ['Arrancando', 'Creciendo', 'Estancado', 'Escalando'];
export const TIPOS_CLIENTE = ['A empresas', 'A personas', 'A ambos'];

export const SECTIONS = [
  {
    id: 'contexto',
    label: 'Contexto',
    intro: 'Primero, lo básico. Cuatro datos para que el resultado hable de tu negocio y no de uno genérico.',
    questions: [
      {
        id: 'nombre',
        type: 'text',
        q: '¿Cómo se llama tu negocio o proyecto?',
        placeholder: 'El nombre con el que te conocen',
        required: false,
      },
      {
        id: 'queVendes',
        type: 'text',
        q: '¿Qué vendes? En una línea.',
        placeholder: 'Ej. "Skincare natural" o "Software de recursos humanos"',
        required: true,
      },
      {
        id: 'tipoCliente',
        type: 'select',
        q: '¿A quién le vendes?',
        options: TIPOS_CLIENTE,
        required: false,
      },
      {
        id: 'momento',
        type: 'select',
        q: '¿En qué momento está tu negocio?',
        options: MOMENTOS_NEGOCIO,
        required: false,
      },
    ],
  },
  {
    id: 'persona',
    label: 'A quién le hablas',
    framework: 'Buyer Persona',
    intro: 'El perfil real de tu cliente ideal: quién es, qué necesita resolver y qué mueve su decisión.',
    questions: [
      {
        id: 'quienEs',
        type: 'textarea',
        short: 'Quién es',
        q: '¿Quién es tu cliente ideal?',
        placeholder: {
          empresas: 'Ej. "Founder o responsable de marketing, empresa de 5 a 30 personas, en México"',
          personas: 'Ej. "Mujer de 28 a 40 años, en CDMX, que cuida su piel y ya no cree en milagros"',
        },
        required: false,
      },
      {
        id: 'queResuelve',
        type: 'textarea',
        short: 'Qué necesita resolver',
        q: '¿Qué necesita resolver tu cliente?',
        placeholder: {
          empresas: 'Ej. "Conseguir clientes que lleguen listos para comprar y que los que ya tiene regresen"',
          personas: 'Ej. "Encontrar una rutina que sí funcione sin gastar de más"',
        },
        required: false,
      },
      {
        id: 'frenaEmpuja',
        type: 'textarea',
        short: 'Qué lo frena y qué lo empuja',
        q: '¿Qué lo frena antes de comprarte y qué lo empuja a decidirse?',
        placeholder: {
          empresas: 'Ej. "Lo frena: ya le quedaron mal antes. Lo empuja: necesita resultados este trimestre"',
          personas: 'Ej. "La frena: ya probó de todo. La empuja: la recomendación de alguien en quien confía"',
        },
        required: false,
      },
    ],
  },
  {
    id: 'empatia',
    label: 'Qué siente',
    framework: 'Empathy Map',
    intro: 'La capa emocional detrás de sus decisiones: lo que ve, oye, piensa y siente.',
    questions: [
      {
        id: 'piensaSiente',
        type: 'textarea',
        short: 'Piensa y siente',
        q: '¿Qué piensa y siente tu cliente?',
        placeholder: {
          empresas: 'Ej. "Dice: necesito vender más. Siente: necesito que mi negocio importe"',
          personas: 'Ej. "Dice: quiero algo que sí funcione. Siente: miedo de volver a equivocarse"',
        },
        required: false,
      },
      {
        id: 'veOye',
        type: 'textarea',
        short: 'Ve y oye',
        q: '¿Qué ve y oye a su alrededor?',
        placeholder: {
          empresas: 'Ej. "Ve competidores creciendo. Oye consejos de \'invierte más en anuncios\'"',
          personas: 'Ej. "Ve marcas que prometen milagros. Oye recomendaciones que no le cuadran"',
        },
        required: false,
      },
      {
        id: 'doloresGanancias',
        type: 'textarea',
        short: 'Dolores y ganancias',
        q: '¿Qué le duele hoy y qué quiere ganar?',
        placeholder: {
          empresas: 'Ej. "Le duele invertir sin ver resultados. Quiere clientes que recomienden su negocio"',
          personas: 'Ej. "Le duele sentirse engañada por promesas. Quiere confiar en lo que compra"',
        },
        required: false,
      },
    ],
  },
  {
    id: 'valor',
    label: 'Qué resuelves',
    framework: 'Value Proposition Canvas',
    intro: 'Tu mapa de valor: lo que ofreces, los dolores que alivias y las ganancias que generas.',
    questions: [
      {
        id: 'queOfreces',
        type: 'textarea',
        short: 'Productos y servicios',
        q: '¿Qué productos o servicios ofreces?',
        placeholder: 'Dicho en simple, como se lo dirías a tu cliente',
        required: false,
      },
      {
        id: 'aliviaDolores',
        type: 'textarea',
        short: 'Cómo alivias sus dolores',
        q: '¿Cómo alivias los dolores de tu cliente?',
        placeholder: {
          empresas: 'Ej. "Le muestro exactamente dónde pierde clientes, en lugar de darle otro reporte"',
          personas: 'Ej. "Fórmulas cortas y explicadas: sabe qué se pone y por qué"',
        },
        required: false,
      },
      {
        id: 'generaGanancias',
        type: 'textarea',
        short: 'Qué ganancias le generas',
        q: '¿Qué ganancias le generas?',
        placeholder: {
          empresas: 'Ej. "Clientes que regresan y números que por fin entiende"',
          personas: 'Ej. "Piel tranquila y cero dudas al volver a comprar"',
        },
        required: false,
      },
    ],
  },
  {
    id: 'bigIdeal',
    label: 'Por qué importas',
    framework: 'The Big Ideal',
    intro: 'Tu propósito profundo: lo que ya cansó a tus clientes + lo mejor de tu marca.',
    questions: [
      {
        id: 'tension',
        type: 'textarea',
        short: 'La tensión cultural',
        q: '¿Qué es eso que ya cansó a tus clientes de cómo funcionan las cosas?',
        placeholder: {
          empresas: 'Ej. "Que los traten como números: promesas grandes, atención de máquina"',
          personas: 'Ej. "Que las marcas prometan milagros y entreguen lo mismo de siempre"',
        },
        required: false,
      },
      {
        id: 'loMejor',
        type: 'textarea',
        short: 'Lo mejor de tu marca',
        q: '¿Qué es lo mejor que tu marca hace por sus clientes?',
        placeholder: 'Eso que haces con más orgullo y que ellos más agradecen',
        required: false,
      },
      {
        id: 'mundoMejor',
        type: 'textarea',
        short: 'El mundo sería mejor si…',
        q: 'Completa la frase: "Mi marca cree que el mundo sería mejor si…"',
        placeholder: 'Ej. "…comprar skincare no requiriera fe ciega" o "…lo digital se sintiera personal"',
        required: false,
      },
    ],
  },
];

// Palabras prohibidas (reglas de marca del proyecto). Se validan también
// en el backend antes de mostrar cualquier síntesis generada.
export const PALABRAS_PROHIBIDAS = [
  'ecosistema',
  'arquitecto de',
  'orquestador',
  'resonó',
  'sin compromiso',
  'no dejes pasar',
  'descubre cómo',
  'experiencias digitales',
  'conocimiento técnico',
  'persona del otro lado',
];

// Resuelve un placeholder que puede variar según a quién le vende el negocio.
export function resolvePlaceholder(placeholder, tipoCliente) {
  if (typeof placeholder === 'string' || !placeholder) return placeholder || '';
  if (tipoCliente === 'A empresas') return placeholder.empresas;
  if (tipoCliente === 'A personas') return placeholder.personas;
  return placeholder.personas; // "A ambos" o sin definir: el ejemplo más llano
}

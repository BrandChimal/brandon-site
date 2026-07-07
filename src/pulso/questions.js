// --- PULSO DE IDENTIDAD EXPRESS · DEFINICIÓN DEL EJERCICIO ---
// Fuente: spec-pulso-express.md (aprobada 2026-07-06).
// Principio: cada pregunta pide EVIDENCIA (hechos, frases textuales, situaciones
// reales), no definiciones abstractas. El análisis solo puede ser tan bueno
// como la materia prima que recogen estas preguntas.

export const MOMENTOS_NEGOCIO = ['Arrancando', 'Creciendo', 'Estancado', 'Escalando'];

export const SECTIONS = [
  {
    id: 'contexto',
    label: 'Contexto',
    intro: 'Primero, lo básico. Tres datos para que el análisis hable de tu negocio y no de uno genérico.',
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
        q: '¿Qué vendes y a quién? En una línea.',
        placeholder: 'Ej. "Software de RH para empresas medianas en México"',
        required: true,
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
    intro: 'Olvida al cliente ideal que imaginas. Vamos a trabajar con el real.',
    questions: [
      {
        id: 'mejorCliente',
        type: 'textarea',
        q: 'Piensa en tu mejor cliente real. ¿Quién es, qué te compró y por qué volvió (o volvería)?',
        placeholder: 'Ej. "Un despacho contable de 12 personas; contrató la cobranza automática y volvió porque recuperó 40% de su cartera vencida"',
        required: false,
      },
      {
        id: 'trigger',
        type: 'textarea',
        q: '¿Qué estaba pasando en su negocio o su vida justo antes de buscarte?',
        placeholder: 'El momento exacto que lo empujó a buscar una solución',
        required: false,
      },
      {
        id: 'barrera',
        type: 'textarea',
        q: '¿Qué casi lo detiene de comprarte?',
        placeholder: 'La duda, el miedo o la objeción real que tuvo antes de decidirse',
        required: false,
      },
    ],
  },
  {
    id: 'empatia',
    label: 'Qué siente',
    framework: 'Empathy Map',
    intro: 'Aquí vale más una frase textual que diez suposiciones.',
    questions: [
      {
        id: 'verbatim',
        type: 'textarea',
        q: 'Escribe una frase que un cliente te haya dicho tal cual y que se te quedó grabada.',
        placeholder: 'Ej. "yo no estudié contabilidad para andar rogando que me paguen"',
        required: false,
      },
      {
        id: 'creeNecesita',
        type: 'textarea',
        q: '¿Qué cree tu cliente que necesita — y qué necesita en realidad, según tú?',
        placeholder: 'Ej. "Cree que necesita más clientes; necesita cobrarle a los que ya tiene"',
        required: false,
      },
      {
        id: 'competencia',
        type: 'textarea',
        q: 'Cuando compara opciones, ¿qué promesas oye de tus competidores y qué opina de ellas?',
        placeholder: 'Lo que le prometen otros y por qué no le convence (o sí)',
        required: false,
      },
    ],
  },
  {
    id: 'valor',
    label: 'Qué resuelves',
    framework: 'Value Proposition Canvas',
    intro: 'Tu valor no es lo que haces: es lo que cambia para tu cliente.',
    questions: [
      {
        id: 'antesDespues',
        type: 'textarea',
        q: '¿Qué dolor concreto desaparece cuando alguien trabaja contigo? Descríbelo como antes → después.',
        placeholder: 'Ej. "Antes: perseguir pagos por WhatsApp. Después: la cobranza corre sola"',
        required: false,
      },
      {
        id: 'distinto',
        type: 'textarea',
        q: '¿Qué haces distinto que a tus clientes más les costaría encontrar en otro lado?',
        placeholder: 'Lo que un competidor no puede copiar fácil',
        required: false,
      },
      {
        id: 'prueba',
        type: 'textarea',
        q: '¿Qué puedes prometer que sí puedes probar? Un resultado, un dato, un caso.',
        placeholder: 'Ej. "45% de mis clientas recompran en menos de 90 días"',
        required: false,
      },
    ],
  },
  {
    id: 'bigIdeal',
    label: 'Por qué importas',
    framework: 'Big Ideal',
    intro: 'Más allá de vender: la razón por la que tu negocio merece existir.',
    questions: [
      {
        id: 'enoja',
        type: 'textarea',
        q: '¿Qué te enoja de cómo funciona tu industria hoy?',
        placeholder: 'Lo que ves que todos hacen mal y tú te niegas a repetir',
        required: false,
      },
      {
        id: 'perderian',
        type: 'textarea',
        q: 'Si tu negocio desapareciera mañana, ¿qué perderían tus clientes que nadie más les daría?',
        placeholder: 'Lo insustituible',
        required: false,
      },
      {
        id: 'mundoMejor',
        type: 'textarea',
        q: 'Completa la frase: "El mundo sería un poco mejor si…"',
        placeholder: '…',
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

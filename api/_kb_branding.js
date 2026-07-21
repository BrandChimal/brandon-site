// --- CAPA DE CONOCIMIENTO · BRANDING (criterio de Brandon, F0) ---
// Las REGLAS van inline en cada llamada (siempre aplican, no se "recuperan").
// La biblioteca de CASOS sí se recupera por similitud (brand_cases + pgvector).
// Fuente: outputs/kb-branding-criterio.md (sesión F0 2026-07-20).

export const KB_CRITERIO_VISUAL = `
## Regla madre
El moodboard nace de la estrategia, NUNCA al revés. Primero la percepción a
provocar, luego la tensión visual, al final las referencias (solo para validar
o ampliar, jamás para definir).

## Cómo se elige un territorio (proceso de Brandon)
Lo primero NO es color ni referencia: es la percepción a provocar. Preguntas:
¿qué siente hoy el consumidor?, ¿qué debe dejar de sentir?, ¿qué debe sentir
después?, ¿qué papel ocupa la marca en su vida (guía, respaldo, aliado, experto,
refugio, impulso)?, ¿qué debe entender o hacer gracias a esa emoción?
De ahí sale una TENSIÓN VISUAL (ej: humano pero no informal, tecnológico pero
no frío, premium pero no distante, claro pero no básico). Esa tensión se
traduce a color, composición, forma, tipografía, movimiento e imagen.

## Traducción emoción → visual (una emoción NO es un color automático)
CONFIANZA: bases neutras estables (carbón, crema, blanco), acentos controlados
(azul, turquesa, vino); NO el cliché "azul=confianza". Retículas claras,
alineación precisa, ritmo predecible, esquinas suaves sin verse infantiles,
pocos elementos bien organizados. DM Sans/Outfit en pesos legibles, jerarquías
firmes, nada de tipografías delgadas en info importante.
CERCANÍA/CALIDEZ: crema, taupe, piedra, vino sobre claro, acentos cálidos
moderados (calidez contenida, no saturación). Formas orgánicas, capas,
profundidad suave, espacios que respiren, fotografía natural, composiciones
menos rígidas (irregularidad humana, no descuidada). Tipografías abiertas,
pesos regulares, interlineado generoso, menos mayúsculas sostenidas.
CLARIDAD ("por fin alguien me entiende"): paleta limitada, alto contraste, un
color principal que guía acciones, cada color con función semántica. Espacio
útil, contenido en bloques, jerarquías obvias, etiquetas directas, divulgación
progresiva. DM Sans lectura, Outfit encabezados, Azeret Mono solo datos/técnico.
Recordatorio: cercanía ≠ todo redondo/naranja; confianza ≠ todo azul;
claridad ≠ diseño vacío. La emoción se percibe en el sistema completo.

## Reglas duras — NUNCA
Diseñar desde el efecto antes del propósito. Degradados/glassmorphism/sombras/
brillos/animaciones por moda. Identidad sobre plantilla genérica. La fórmula
"foto plana + texto encima + logo en esquina". Clichés de la categoría.
Sacrificar legibilidad por aparentar original. Mezclar estilos de iconografía/
radios/sombras/ilustración sin lógica común. Llenar espacios "porque se ven
vacíos". Muchos acentos compitiendo. Tipografías decorativas en textos que
necesitan comprensión. "Premium" solo con negro+dorado+serif. Representar IA con
el degradado azul-morado/destello/cerebro/órbita/circuito de siempre. Confundir
minimalismo con falta de intención, o complejidad visual con profundidad.
Prueba: si quito el efecto y nada cambia, sobraba.

## Reglas duras — INNEGOCIABLES
Jerarquía entendible en segundos. Cada color con un papel. Vino solo sobre
fondos claros. Outfit titulares / DM Sans lectura-UI / Azeret Mono datos-código.
Máx. dos familias tipográficas por bloque. Pesos ligeros nunca en tamaños
pequeños ni info crítica. Contraste y accesibilidad no opcionales. Mobile-first.
Iconografía con grosor/construcción/relleno/personalidad compartidos. La marca
debe reconocerse aun sin el logo. El sistema soporta múltiples canales sin
volverse piezas desconectadas. La estética refuerza el mensaje y la acción.

## Qué hace bueno un logo
Correcto = bien trazado, legible, funciona. Excelente = además contiene una idea
propia: condensa una tensión estratégica, tiene silueta/detalle reconocible, no
se intercambia con un competidor, funciona en una tinta y a tamaño pequeño, vive
en movimiento, no necesita explicación, es simple como resultado (no de partida),
gana significado con el tiempo. Lo olvidable no está mal hecho: no tiene nada que
le pertenezca a esa marca.
Isotipo/wordmark/combinación: depende del poder del nombre, madurez y puntos de
contacto. Default para marca nueva = combinación. Wordmark si el nombre es corto,
distintivo y con fuerza fonética. Isotipo independiente si aparece mucho en
avatares/apps o ya hay reconocimiento. No forzar isotipo solo si nadie sabe aún
qué significa.

## Anclas (patrones que Brandon admira — NO copiar marcas)
1. Marcas que hacen la tecnología compleja simple y personal.
2. Sistemas editoriales donde la tipografía construye la identidad.
3. Marcas reconocibles sin depender del logo (códigos propios de color,
   composición, lenguaje, movimiento).
Territorios GENÉRICOS a evitar: reclutamiento con azul+personas+lupas+manos+
rompecabezas; IA con degradados azul-morado+destellos+cerebros+órbitas;
"premium" con negro+dorado+serif sin idea. El recurso no es el problema; usarlo
como sustituto de estrategia sí.
`;

// Palabras prohibidas heredadas del proyecto (marca Ese Momento).
export const PALABRAS_PROHIBIDAS = [
  'ecosistema', 'arquitecto de', 'orquestador', 'resonó', 'sin compromiso',
  'no dejes pasar', 'descubre cómo', 'experiencias digitales',
  'conocimiento técnico', 'persona del otro lado',
];

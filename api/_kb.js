// --- CAPA DE CONOCIMIENTO · ESE MOMENTO ---
// El diferenciador del motor: metodología, definiciones canónicas y
// heurísticas de análisis de Brandon Chimal. Se inyecta al modelo en cada
// llamada. Fuentes: docs/kb-metodologia.md, Brandbook v2.0 (§07–§10),
// Modelo de Negocio 2026 (§03). El prefijo "_" evita que Vercel lo exponga
// como endpoint. Versionar aquí = la "skill" evoluciona con commits.

export const KB_METODOLOGIA = `
## El método "Ese Momento"
Método de Brandon Chimal para diseñar la experiencia digital de una marca de
modo que cada punto de contacto genere conexión emocional real: la certeza de
llegar a un lugar diseñado para ti. Propósito: hacer que lo digital se sienta
personal. Frase central: "Llegar a un lugar diseñado para ti."

## Los cinco momentos del journey emocional
1. LLEGAS — La persona viene de redes, búsqueda o recomendación, con
   curiosidad y una expectativa. Debe sentir pertenencia y lugar correcto en
   segundos. Se cumple cuando lo que ve le hace sentido e interactúa.
   SE ROMPE cuando: nadie la encuentra, llega a un lugar que no le habla a ella.
2. SIENTES — Se queda por claridad, confianza, valor real y solución. El
   cambio: llegó esperando encontrar algo y descubre que lo encontró (paz).
   SE ROMPE con: tecnicismos, texto vacío, confusión, tono cliché, aburrimiento,
   incongruencia entre lo que la página dice y lo que el negocio es.
3. ATERRIZAS — Todo cobra sentido: sabe qué hacer y cómo; emoción y razón
   conectan. Obtiene certeza, ilusión y un plan paso a paso.
   SE ROMPE cuando: entiende la promesa pero no ve el camino ni el siguiente paso.
4. CONFÍAS — Se construye con consistencia, congruencia, acercamiento y
   resultados. Siente seguridad, entusiasmo, pertenencia.
   SE ROMPE cuando: no hay prueba, los canales se contradicen, promesas sin caso.
5. ACTÚAS — Comprar es la parte media: cuenta dejar datos, interactuar,
   compartir, referir, recomprar. Funcionó = fideliza y refiere; forzado =
   compra única. El journey no termina: nurturing continuo.
   SE ROMPE cuando: la relación muere tras la primera compra, no hay razón para volver.

## Diccionario de Impacto (lo que la persona debe llevarse)
SIENTE: pertenencia, confianza, alivio y claridad.
OBTIENE: respuestas, contenido útil, procesos sin fricción y espacio mental.
GANA: relación duradera, preferencia, autoridad humana y crecimiento orgánico.

## Flujo de servicio (para orientar el siguiente paso del lead)
identidad (Pulso de Identidad) → diagnóstico (Radiografía Digital) →
acción (campaña o rediseño omnicanal) → evolución (acompañamiento mensual).
El Express es la puerta de entrada de la capa de identidad.
`;

export const KB_FRAMEWORKS = `
## Estructura canónica de los entregables (Brandbook Ese Momento v2.0)

BUYER PERSONA — el perfil real del cliente ideal:
- perfil: quién es, en concreto (rol o tipo de persona, contexto, dónde está).
- jobs (jobs to be done): qué necesita resolver o lograr — accionables, no vagos.
- barreras: objeciones y miedos reales antes de comprar.
- triggers: eventos o presiones que lo empujan a decidirse.
Calidad: si el perfil aplica a cualquiera, está mal. Barreras y triggers son
cosas distintas — sepáralos aunque el usuario los haya escrito juntos.

EMPATHY MAP — la capa emocional detrás de las decisiones, 6 cuadrantes:
- piensaSiente: lo que dice en voz alta vs. lo que siente de fondo.
- ve: lo que observa en su entorno y su mercado.
- oye: lo que le dicen (consejos, promesas de competidores, su círculo).
- diceHace: comportamientos observables y frases típicas.
- pains: dolores, miedos, frustraciones.
- gains: lo que desea ganar, éxito como él/ella lo define.
Calidad: emocional, no demográfico. Deriva cuadrantes de la evidencia dada;
si no hay evidencia para un cuadrante, déjalo vacío.

VALUE PROPOSITION CANVAS — el encaje entre dos lados:
Lado marca (value map): productosServicios / painRelievers (cómo alivia cada
dolor) / gainCreators (cómo genera cada ganancia).
Lado cliente (customer profile): jobs / pains / gains.
Calidad: cada reliever debe conectar con un pain concreto del cliente, y cada
creator con un gain. Si algo del lado marca no conecta con nada del lado
cliente, es señal de desencaje — dilo en el análisis.

THE BIG IDEAL — el propósito profundo, fórmula de dos ingredientes:
- tension (tensión cultural): lo que ya cansó a los CLIENTES de cómo funcionan
  las cosas — enunciado cultural, no queja de industria.
- loMejor (lo mejor de la marca): el aporte genuino, lo que hace con orgullo.
- statement: "[Marca] cree que el mundo sería mejor si …" — redactado, específico,
  creíble. Ejemplo de referencia: "Brandon Chimal cree que el mundo sería mejor
  si cada interacción digital se sintiera como un encuentro humano real."
`;

export const KB_HEURISTICAS = `
## Heurísticas de análisis (lo que hace valioso el resultado)

1. Patrón de observación valiosa: palabras textuales del usuario + dato
   comprobable + tensión entre dos respuestas de secciones distintas.
   Una observación sin al menos dos de esos tres elementos es débil.
2. Prueba del intercambio: si la frase sirve igual para otro negocio del mismo
   giro, es genérica — reescríbela con la especificidad de las respuestas.
3. La desconexión más común: lo que el negocio promete no es lo que su cliente
   compra, o lo que le enoja del mercado es exactamente por lo que le compran.
   Busca esa clase de cruces.
4. Diagnóstico de momento: elige UN momento (el más crítico) donde la conexión
   se rompe para este negocio, con la evidencia de sus respuestas:
   - No lo encuentran / no llega la audiencia correcta → LLEGAS
   - Llegan pero no entienden o no se quedan (confusión, genérico) → SIENTES
   - Entienden pero no ven plan ni camino claro → ATERRIZAS
   - Interesa pero no hay prueba/consistencia para creerle → CONFÍAS
   - Compran una vez y no vuelven ni refieren → ACTÚAS
5. Siguiente paso: una acción concreta ejecutable esta semana, derivada del
   momento diagnosticado. Nunca "mejora tu marketing"; siempre algo específico.
6. Calibración por tipoCliente: "A empresas" = lenguaje de negocio sin jerga
   corporativa; "A personas" = lenguaje cotidiano de consumo; ambos/vacío = llano.
7. Calibración por momento del negocio: Arrancando = claridad de a quién
   hablarle; Estancado = la desconexión al centro; Creciendo/Escalando =
   consistencia y lo comprobable.
8. Voz: directa, cercana, sin tono infomercial ni de gurú. Afirmaciones con
   respaldo; donde no hay evidencia, pregunta honesta.
`;

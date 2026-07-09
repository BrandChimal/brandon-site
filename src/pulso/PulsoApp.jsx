import { useMemo, useState } from 'react';
import { motion, AnimatePresence, LayoutGroup } from 'framer-motion';
import { Check, ChevronUp, Sparkles } from 'lucide-react';
import GlobalStyles from '../styles/GlobalStyles';
import { SECTIONS } from './questions';
import { buildCanvases, detectGaps, countAnswered } from './templates';
import { pedirSintesis, guardarLead } from './synthesis';
import { EASE, fadeUp, staggerContainer, useReducedMotion } from './animations';
import LivingCanvas, { FRAMEWORKS } from './LivingCanvas';
import QuestionCard from './QuestionCard';

// --- PULSO DE IDENTIDAD · EXPRESS · CANVAS VIVO ---
// Concepto: tu Pulso se construye mientras respondes. Izquierda: una pregunta
// a la vez. Derecha: el tablero glass llenándose en tiempo real. El resultado
// es el mismo tablero creciendo a pantalla completa (morph por layoutId).

// Estilos propios de /pulso (no tocan GlobalStyles, que comparte el home):
// gradiente cálido del brandbook, glass del brandbook, formas neumórficas
// de fondo y kill-switch de reduced-motion a nivel página.
const PulsoStyles = () => (
  <style>{`
    body { background: linear-gradient(135deg, #FFF3C2 0%, #F5F1EB 55%, #EBE6DE 100%); }
    .glass-warm {
      background: rgba(255, 255, 255, 0.25);
      backdrop-filter: blur(30px) saturate(140%);
      -webkit-backdrop-filter: blur(30px) saturate(140%);
      border: 1.5px solid rgba(255, 255, 255, 0.45);
    }
    .neu-shape {
      position: fixed; border-radius: 9999px; pointer-events: none; z-index: 0;
      background: #F5F1EB;
      box-shadow: 18px 18px 40px rgba(140, 131, 120, 0.25), -18px -18px 40px rgba(255, 255, 255, 0.9);
    }
    @keyframes float-slow {
      0%, 100% { transform: translateY(0) scale(1); }
      50% { transform: translateY(-14px) scale(1.015); }
    }
    .float-slow { animation: float-slow 9s ease-in-out infinite; }
    .float-slower { animation: float-slow 13s ease-in-out infinite reverse; }
    @media (prefers-reduced-motion: reduce) {
      *, *::before, *::after {
        animation-duration: 0.001ms !important;
        animation-iteration-count: 1 !important;
        transition-duration: 0.001ms !important;
      }
    }
  `}</style>
);

// Aplana las secciones en pasos individuales (una pregunta por pantalla).
const STEPS = SECTIONS.flatMap((s) =>
  s.questions.map((q, qi) => ({
    ...q,
    sectionId: s.id,
    sectionLabel: s.label,
    framework: s.framework || null,
    intro: qi === 0 ? s.intro : null,
  }))
);

const TOTAL_CANVAS = 12; // preguntas de los 4 frameworks

export default function PulsoApp() {
  const [screen, setScreen] = useState('intro'); // 'intro' | índice de paso | 'resultado'
  const [dir, setDir] = useState(1);
  const [answers, setAnswers] = useState({});
  const [canvasOpen, setCanvasOpen] = useState(false); // sheet móvil
  const [sintesis, setSintesis] = useState({ estado: 'idle', data: null });
  const [lead, setLead] = useState({ nombre: '', email: '', estado: 'idle' });
  const reduced = useReducedMotion();

  const canvases = useMemo(() => buildCanvases(answers), [answers]);
  const gaps = useMemo(() => detectGaps(answers), [answers]);
  const completadas = useMemo(() => countAnswered(answers), [answers]);

  const paso = typeof screen === 'number' ? STEPS[screen] : null;
  const setAnswer = (id, value) => setAnswers((a) => ({ ...a, [id]: value }));

  const avanzar = () => {
    if (paso?.required && !(answers[paso.id] || '').trim()) return;
    setDir(1);
    if (screen < STEPS.length - 1) setScreen(screen + 1);
    else irAResultado();
  };

  const retroceder = () => {
    setDir(-1);
    setScreen(screen === 0 ? 'intro' : screen - 1);
  };

  const irAResultado = async () => {
    setScreen('resultado');
    setCanvasOpen(false);
    window.scrollTo({ top: 0 });
    if (countAnswered(answers) >= 4) {
      setSintesis({ estado: 'cargando', data: null });
      const r = await pedirSintesis(answers);
      setSintesis(r.ok ? { estado: 'ok', data: r.data } : { estado: 'pendiente', data: null });
    } else {
      setSintesis({ estado: 'pendiente', data: null });
    }
  };

  const enviarLead = async (e) => {
    e.preventDefault();
    setLead((l) => ({ ...l, estado: 'enviando' }));
    const ok = await guardarLead({ nombre: lead.nombre, email: lead.email, answers });
    setLead((l) => ({ ...l, estado: ok ? 'ok' : 'error' }));
  };

  return (
    <div className="min-h-screen text-[#2D2926] relative" style={{ fontFamily: "'DM Sans', sans-serif" }}>
      <GlobalStyles />
      <PulsoStyles />

      {/* Formas neumórficas decorativas (brandbook §05) */}
      <div className="neu-shape float-slow w-[280px] h-[280px] -top-20 -right-24 opacity-70" />
      <div className="neu-shape float-slower w-[180px] h-[180px] bottom-24 -left-16 opacity-60" />

      {/* Hairline de progreso */}
      {paso && (
        <div className="fixed top-0 left-0 right-0 h-[2px] bg-[#8C8378]/15 z-50">
          <motion.div
            className="h-full bg-[#6B2D3C]"
            animate={{ width: `${((screen + 1) / STEPS.length) * 100}%` }}
            transition={{ duration: 0.6, ease: EASE }}
          />
        </div>
      )}

      <header className="relative z-10 max-w-6xl mx-auto px-6 pt-8 flex items-center justify-between">
        <a href="/" className="font-outfit text-sm text-[#2D2926]/70 hover:text-[#6B2D3C] transition-colors duration-[600ms]">
          ← Brandon Chimal
        </a>
        <span className="font-azeret text-[9px] uppercase tracking-widest text-[#8C8378]">Ese Momento</span>
      </header>

      <LayoutGroup>
        <main className="relative z-10 max-w-6xl mx-auto px-6 py-10 md:py-14 overflow-x-clip">
          <AnimatePresence mode="wait">
            {/* P0 · ENTRADA */}
            {screen === 'intro' && (
              <motion.section
                key="intro"
                variants={staggerContainer(0.15, 0.1)}
                initial="hidden"
                animate="show"
                exit={{ opacity: 0, y: -24, transition: { duration: 0.45, ease: EASE } }}
                className="text-center max-w-2xl mx-auto pt-8 md:pt-16"
              >
                <motion.span variants={fadeUp} className="font-azeret text-[10px] md:text-[11px] uppercase text-[#6B2D3C] font-medium block mb-5 tracking-widest">
                  Pulso de Identidad · Express
                </motion.span>
                <motion.h1 variants={fadeUp} className="font-outfit text-4xl md:text-[54px] leading-[1.1] mb-6">
                  Vas a ver tu negocio construirse frente a ti.
                </motion.h1>
                <motion.p variants={fadeUp} className="text-[15px] md:text-[17px] text-[#2D2926]/70 max-w-xl mx-auto mb-3">
                  Doce preguntas sobre tu negocio real. Cada respuesta se coloca en tu Pulso — el tablero
                  con tu base estratégica — y al final recibes un análisis directo: una fortaleza que quizá
                  no ves, una desconexión y tu siguiente paso.
                </motion.p>
                <motion.p variants={fadeUp} className="font-azeret text-[10px] uppercase tracking-widest text-[#8C8378] mb-10">
                  ~8 minutos · Sin registro para empezar
                </motion.p>
                <motion.div variants={fadeUp}>
                  <motion.button
                    type="button"
                    whileTap={{ scale: 0.97 }}
                    onClick={() => setScreen(0)}
                    className="font-outfit inline-flex items-center gap-2 bg-[#6B2D3C] text-[#F5F1EB] rounded-full px-10 py-4 shadow-[0_4px_15px_rgba(107,45,60,0.3)] hover:shadow-[0_8px_30px_rgba(107,45,60,0.5)] hover:scale-105 hover:-translate-y-1 hover:bg-[#8A3F52] transition-all duration-[600ms]"
                  >
                    <Sparkles size={18} /> Construir mi Pulso
                  </motion.button>
                </motion.div>
              </motion.section>
            )}

            {/* PREGUNTAS + CANVAS VIVO */}
            {paso && (
              <motion.section
                key="flujo"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1, transition: { duration: 0.6, ease: EASE } }}
                exit={{ opacity: 0, transition: { duration: 0.4, ease: EASE } }}
                className="lg:grid lg:grid-cols-[1fr_340px] lg:gap-12 lg:h-[calc(100vh-190px)] lg:items-stretch"
              >
                <div className="min-h-[420px] flex items-center pb-24 lg:pb-0 lg:h-full lg:overflow-visible lg:pr-6">
                  <AnimatePresence mode="wait" custom={reduced ? 0 : dir}>
                    <QuestionCard
                      key={paso.id}
                      step={paso}
                      value={answers[paso.id]}
                      onChange={(v) => setAnswer(paso.id, v)}
                      onConfirm={avanzar}
                      onBack={retroceder}
                      index={screen}
                      total={STEPS.length}
                      isFirst={screen === 0}
                      tipoCliente={answers.tipoCliente}
                    />
                  </AnimatePresence>
                </div>

                {/* Canvas vivo — desktop: la única columna con scroll */}
                <div className="hidden lg:flex lg:flex-col lg:h-full lg:min-h-0">
                  <div className="flex items-baseline justify-between mb-3 px-1 shrink-0">
                    <span className="font-azeret text-[9px] uppercase tracking-widest text-[#8C8378]">Tu Pulso</span>
                    <motion.span
                      key={completadas}
                      initial={{ scale: 1.4, color: '#6B2D3C' }}
                      animate={{ scale: 1, color: '#8C8378' }}
                      transition={{ duration: 0.6, ease: EASE }}
                      className="font-azeret text-[11px]"
                    >
                      {completadas} / {TOTAL_CANVAS}
                    </motion.span>
                  </div>
                  <div className="flex-1 min-h-0 overflow-y-auto hide-scrollbar pr-1 pb-2">
                    <LivingCanvas answers={answers} activeId={paso.framework ? paso.id : null} />
                  </div>
                </div>
              </motion.section>
            )}

            {/* RESULTADO */}
            {screen === 'resultado' && (
              <motion.section
                key="resultado"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1, transition: { duration: 0.6, ease: EASE } }}
                className="max-w-4xl mx-auto"
              >
                <motion.div
                  variants={staggerContainer(0.15, 0.1)}
                  initial="hidden"
                  animate="show"
                  className="text-center mb-10"
                >
                  <motion.span variants={fadeUp} className="font-azeret text-[10px] uppercase text-[#6B2D3C] font-medium block mb-4 tracking-widest">
                    {answers.nombre ? `El Pulso de ${answers.nombre}` : 'Tu Pulso'}
                  </motion.span>
                  <motion.h2 variants={fadeUp} className="font-outfit text-2xl md:text-4xl leading-tight">
                    {sintesis.estado === 'ok' ? sintesis.data.pulsoEnUnaFrase : 'Tu base estratégica, armada con tus palabras.'}
                  </motion.h2>
                  {sintesis.estado === 'cargando' && (
                    <motion.p variants={fadeUp} className="font-azeret text-[10px] uppercase tracking-widest text-[#8C8378] mt-4 animate-pulse">
                      Analizando tus respuestas…
                    </motion.p>
                  )}
                </motion.div>

                {sintesis.estado === 'ok' && (
                  <motion.div
                    variants={staggerContainer(0.15, 0.2)}
                    initial="hidden"
                    animate="show"
                    className="grid md:grid-cols-3 gap-4 mb-10"
                  >
                    {[
                      ['Una fortaleza que quizá no ves', sintesis.data.fortaleza],
                      ['Una desconexión', sintesis.data.desconexion],
                      ['Tu siguiente paso esta semana', sintesis.data.siguientePaso],
                    ].map(([titulo, texto]) => (
                      <motion.div key={titulo} variants={fadeUp} className="glass-warm rounded-[24px] p-6 neumorphism-light">
                        <span className="font-azeret text-[9px] uppercase tracking-widest text-[#6B2D3C] block mb-3">{titulo}</span>
                        <p className="text-[14px] leading-relaxed text-[#2D2926]/85">{texto}</p>
                      </motion.div>
                    ))}
                  </motion.div>
                )}

                {sintesis.estado === 'pendiente' && (
                  <div className="glass-warm rounded-[24px] p-6 mb-10 text-center">
                    <p className="text-[14px] text-[#2D2926]/70">
                      El análisis a profundidad llega junto con tu PDF por correo. Abajo tienes tu base armada
                      y las preguntas que quedaron abiertas.
                    </p>
                  </div>
                )}

                {/* El tablero que construiste, ahora en grande (morph por layoutId) */}
                <div className="grid md:grid-cols-2 gap-4 mb-10">
                  {FRAMEWORKS.map((s, i) => {
                    const c = canvases[i];
                    return (
                      <motion.div key={s.id} layoutId={`canvas-${s.id}`} className="glass-warm rounded-[24px] p-6 neumorphism-light">
                        <span className="font-azeret text-[9px] uppercase tracking-widest text-[#8C8378] block">{c.subtitle}</span>
                        <h3 className="font-outfit text-lg mb-4">{c.framework}</h3>
                        <div className="space-y-3">
                          {c.items.map((it) => (
                            <div key={it.id}>
                              <span className="text-[11px] font-medium text-[#6B2D3C] block">{it.label}</span>
                              {it.value ? (
                                <p className="text-[13px] text-[#2D2926]/80 leading-relaxed">{it.value}</p>
                              ) : (
                                <p className="text-[13px] text-[#8C8378] italic">Sin respuesta — quedó como pregunta abierta.</p>
                              )}
                            </div>
                          ))}
                        </div>
                      </motion.div>
                    );
                  })}
                </div>

                {(sintesis.estado === 'ok' ? sintesis.data.preguntasAbiertas : gaps).length > 0 && (
                  <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: '-15% 0px -15% 0px' }}
                    transition={{ duration: 0.7, ease: EASE }}
                    className="bg-[#2D2926] text-[#F5F1EB] rounded-[24px] p-6 md:p-8 mb-10"
                  >
                    <span className="font-azeret text-[9px] uppercase tracking-widest text-[#E8DDB0] block mb-4">Preguntas abiertas</span>
                    <ul className="space-y-3">
                      {(sintesis.estado === 'ok' ? sintesis.data.preguntasAbiertas : gaps).map((g, i) => (
                        <motion.li
                          key={i}
                          initial={{ opacity: 0, x: -20 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          viewport={{ once: true }}
                          transition={{ duration: 0.5, delay: i * 0.08 }}
                          className="text-[14px] text-[#F5F1EB]/85 leading-relaxed"
                        >
                          — {g}
                        </motion.li>
                      ))}
                    </ul>
                  </motion.div>
                )}

                {/* Captura */}
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.7, ease: EASE }}
                  className="glass-warm rounded-[24px] p-6 md:p-10 neumorphism-light text-center"
                >
                  {lead.estado === 'ok' ? (
                    <div className="flex flex-col items-center gap-3">
                      <Check className="text-[#6B2D3C]" size={28} />
                      <p className="font-outfit text-lg">Listo. Tu Pulso completo va en camino a {lead.email}.</p>
                    </div>
                  ) : (
                    <>
                      <h3 className="font-outfit text-xl md:text-2xl mb-2">Tu Pulso completo en PDF, a tu correo.</h3>
                      <p className="text-[14px] text-[#2D2926]/60 mb-6">Los cuatro documentos armados + el análisis, listos para usar.</p>
                      <form onSubmit={enviarLead} className="flex flex-col sm:flex-row gap-3 max-w-xl mx-auto">
                        <input
                          type="text"
                          value={lead.nombre}
                          onChange={(e) => setLead((l) => ({ ...l, nombre: e.target.value }))}
                          placeholder="Tu nombre"
                          className="flex-1 bg-white/50 border border-white/60 rounded-full px-5 py-3.5 text-sm focus:outline-none focus:border-[#6B2D3C]/50 transition-all duration-[600ms] placeholder-[#8C8378]"
                        />
                        <input
                          type="email"
                          required
                          value={lead.email}
                          onChange={(e) => setLead((l) => ({ ...l, email: e.target.value }))}
                          placeholder="Tu correo"
                          className="flex-1 bg-white/50 border border-white/60 rounded-full px-5 py-3.5 text-sm focus:outline-none focus:border-[#6B2D3C]/50 transition-all duration-[600ms] placeholder-[#8C8378]"
                        />
                        <motion.button
                          type="submit"
                          whileTap={{ scale: 0.97 }}
                          className="font-outfit bg-[#6B2D3C] text-[#F5F1EB] rounded-full px-8 py-3.5 text-sm shadow-[0_4px_15px_rgba(107,45,60,0.3)] hover:shadow-[0_8px_30px_rgba(107,45,60,0.5)] hover:scale-105 hover:-translate-y-1 hover:bg-[#8A3F52] transition-all duration-[600ms]"
                        >
                          {lead.estado === 'enviando' ? 'Enviando…' : 'Enviármelo'}
                        </motion.button>
                      </form>
                      {lead.estado === 'error' && (
                        <p className="text-[12px] text-[#6B2D3C] mt-3">No se pudo enviar. Intenta de nuevo.</p>
                      )}
                      <p className="font-azeret text-[9px] uppercase tracking-widest text-[#8C8378] mt-5">
                        Tu correo se usa solo para enviarte tu Pulso y contenido útil. Nada más.
                      </p>
                    </>
                  )}
                </motion.div>
              </motion.section>
            )}
          </AnimatePresence>
        </main>

        {/* Canvas vivo — móvil: barra fija + sheet expandible */}
        {paso && (
          <div className="lg:hidden fixed bottom-0 left-0 right-0 z-40">
            <AnimatePresence>
              {canvasOpen && (
                <motion.div
                  initial={{ y: '100%' }}
                  animate={{ y: 0, transition: { duration: 0.6, ease: EASE } }}
                  exit={{ y: '100%', transition: { duration: 0.45, ease: EASE } }}
                  className="glass-warm rounded-t-[24px] max-h-[60vh] overflow-y-auto hide-scrollbar p-4 border-b-0"
                >
                  <LivingCanvas answers={answers} activeId={paso.framework ? paso.id : null} entrance={false} />
                </motion.div>
              )}
            </AnimatePresence>
            <button
              type="button"
              onClick={() => setCanvasOpen((o) => !o)}
              className="w-full glass-warm border-b-0 rounded-t-none flex items-center justify-between px-6 py-4 transition-all duration-[600ms]"
            >
              <span className="font-azeret text-[10px] uppercase tracking-widest text-[#6B2D3C]">Tu Pulso · {completadas} / {TOTAL_CANVAS}</span>
              <ChevronUp size={16} className={`text-[#8C8378] transition-transform duration-[600ms] ${canvasOpen ? 'rotate-180' : ''}`} />
            </button>
          </div>
        )}
      </LayoutGroup>

      <footer className="relative z-10 max-w-6xl mx-auto px-6 pb-10 pt-4 text-center">
        <span className="font-azeret text-[9px] uppercase tracking-widest text-[#8C8378]">
          Llegar a un lugar diseñado para ti · brandonchimal.com
        </span>
      </footer>
    </div>
  );
}

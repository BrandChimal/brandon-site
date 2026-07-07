import { useMemo, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, ArrowRight, Check } from 'lucide-react';
import GlobalStyles from '../styles/GlobalStyles';
import Button from '../components/Button';
import { SECTIONS } from './questions';
import { buildCanvases, detectGaps, countAnswered } from './templates';
import { pedirSintesis, guardarLead } from './synthesis';

// --- PULSO DE IDENTIDAD · EXPRESS ---
// Flujo P0–P7 según spec-pulso-express.md. Página independiente (/pulso):
// no toca ni comparte estado con el home.

const fade = {
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -24 },
  transition: { duration: 0.45, ease: [0.19, 1, 0.22, 1] },
};

const Etiqueta = ({ children }) => (
  <span className="font-azeret text-[10px] md:text-[11px] uppercase text-[#6B2D3C] font-medium block mb-4 tracking-widest">
    {children}
  </span>
);

const Progreso = ({ actual }) => (
  <div className="flex flex-wrap gap-x-4 gap-y-1 justify-center mb-10">
    {SECTIONS.map((s, i) => (
      <span
        key={s.id}
        className={`font-azeret text-[9px] md:text-[10px] uppercase tracking-widest transition-colors duration-[600ms] ${
          i === actual ? 'text-[#6B2D3C]' : i < actual ? 'text-[#2D2926]/60' : 'text-[#B8AFA6]'
        }`}
      >
        {i < actual ? '✓ ' : ''}{s.label}
      </span>
    ))}
  </div>
);

export default function PulsoApp() {
  // screen: 'intro' | número de sección (0..4) | 'resultado'
  const [screen, setScreen] = useState('intro');
  const [answers, setAnswers] = useState({});
  const [sintesis, setSintesis] = useState({ estado: 'idle', data: null }); // idle | cargando | ok | pendiente
  const [lead, setLead] = useState({ nombre: '', email: '', estado: 'idle' }); // idle | enviando | ok | error

  const canvases = useMemo(() => buildCanvases(answers), [answers]);
  const gaps = useMemo(() => detectGaps(answers), [answers]);

  const setAnswer = (id, value) => setAnswers((a) => ({ ...a, [id]: value }));

  const irAResultado = async () => {
    setScreen('resultado');
    window.scrollTo({ top: 0 });
    if (countAnswered(answers) >= 4) {
      setSintesis({ estado: 'cargando', data: null });
      const r = await pedirSintesis(answers);
      setSintesis(r.ok ? { estado: 'ok', data: r.data } : { estado: 'pendiente', data: null });
    } else {
      // Muy pocas respuestas: los canvas y las preguntas abiertas ya cuentan la historia.
      setSintesis({ estado: 'pendiente', data: null });
    }
  };

  const enviarLead = async (e) => {
    e.preventDefault();
    setLead((l) => ({ ...l, estado: 'enviando' }));
    const ok = await guardarLead({ nombre: lead.nombre, email: lead.email, answers });
    setLead((l) => ({ ...l, estado: ok ? 'ok' : 'error' }));
  };

  const seccionActual = typeof screen === 'number' ? SECTIONS[screen] : null;

  return (
    <div className="min-h-screen bg-[#F5F1EB] text-[#2D2926]" style={{ fontFamily: "'DM Sans', sans-serif" }}>
      <GlobalStyles />
      {/* Fondo cálido sutil, mismo recurso visual que la sección del home */}
      <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] md:w-[700px] h-[400px] md:h-[700px] bg-[#6B2D3C]/5 blur-[120px] pointer-events-none rounded-full" />

      <header className="relative z-10 max-w-3xl mx-auto px-6 pt-8 flex items-center justify-between">
        <a href="/" className="font-outfit text-sm text-[#2D2926]/70 hover:text-[#6B2D3C] transition-colors duration-[600ms]">
          ← Brandon Chimal
        </a>
        <span className="font-azeret text-[9px] uppercase tracking-widest text-[#8C8378]">Ese Momento</span>
      </header>

      <main className="relative z-10 max-w-3xl mx-auto px-6 py-12 md:py-16">
        <AnimatePresence mode="wait">
          {/* P0 · ENTRADA */}
          {screen === 'intro' && (
            <motion.section key="intro" {...fade} className="text-center">
              <Etiqueta>Pulso de Identidad · Express</Etiqueta>
              <h1 className="font-outfit text-3xl md:text-[44px] leading-tight mb-6">
                Construye la base que hace posible cada momento.
              </h1>
              <p className="text-[15px] md:text-[17px] text-[#2D2926]/70 max-w-xl mx-auto mb-4">
                Doce preguntas sobre tu negocio — no sobre teoría. Al terminar recibes tu base estratégica armada
                y un análisis directo: una fortaleza que quizá no ves, una desconexión y tu siguiente paso.
              </p>
              <p className="font-azeret text-[10px] uppercase tracking-widest text-[#8C8378] mb-10">
                ~8 minutos · Sin registro para empezar
              </p>
              <Button onClick={() => setScreen(0)} className="!px-10">
                Empezar mi Pulso
              </Button>
            </motion.section>
          )}

          {/* P1–P5 · SECCIONES */}
          {seccionActual && (
            <motion.section key={seccionActual.id} {...fade}>
              <Progreso actual={screen} />
              <div className="text-center mb-8">
                {seccionActual.framework && <Etiqueta>{seccionActual.framework}</Etiqueta>}
                <h2 className="font-outfit text-2xl md:text-3xl mb-3">{seccionActual.label}</h2>
                <p className="text-[14px] md:text-[15px] text-[#2D2926]/60">{seccionActual.intro}</p>
              </div>

              <div className="bg-white border border-[#EBE6DE] rounded-[24px] p-5 sm:p-6 md:p-10 neumorphism-light space-y-6">
                {seccionActual.questions.map((q) => (
                  <div key={q.id}>
                    <label className="block text-[15px] md:text-[16px] font-medium mb-2">
                      {q.q}
                      {q.required && <span className="text-[#6B2D3C]"> *</span>}
                    </label>
                    {q.type === 'select' ? (
                      <div className="flex flex-wrap gap-2">
                        {q.options.map((op) => (
                          <button
                            key={op}
                            type="button"
                            onClick={() => setAnswer(q.id, op)}
                            className={`font-azeret text-[11px] uppercase tracking-widest px-4 py-2.5 rounded-full border transition-all duration-[600ms] ${
                              answers[q.id] === op
                                ? 'bg-[#6B2D3C] text-[#F5F1EB] border-[#6B2D3C]'
                                : 'bg-[#F5F1EB] text-[#2D2926]/70 border-[#EBE6DE] hover:border-[#6B2D3C]/40'
                            }`}
                          >
                            {op}
                          </button>
                        ))}
                      </div>
                    ) : q.type === 'text' ? (
                      <input
                        type="text"
                        value={answers[q.id] || ''}
                        onChange={(e) => setAnswer(q.id, e.target.value)}
                        placeholder={q.placeholder}
                        className="w-full bg-[#F5F1EB] border border-[#EBE6DE] rounded-xl p-4 text-[14px] focus:outline-none focus:border-[#6B2D3C]/30 focus:ring-1 focus:ring-[#6B2D3C]/30 transition-all duration-[600ms] input-neumorphism placeholder-[#8C8378]"
                      />
                    ) : (
                      <textarea
                        rows="3"
                        value={answers[q.id] || ''}
                        onChange={(e) => setAnswer(q.id, e.target.value)}
                        placeholder={q.placeholder}
                        className="w-full bg-[#F5F1EB] border border-[#EBE6DE] rounded-xl p-4 text-[14px] focus:outline-none focus:border-[#6B2D3C]/30 focus:ring-1 focus:ring-[#6B2D3C]/30 transition-all duration-[600ms] input-neumorphism placeholder-[#8C8378]"
                      />
                    )}
                  </div>
                ))}
              </div>

              <div className="flex justify-between items-center mt-8">
                <button
                  onClick={() => { setScreen(screen === 0 ? 'intro' : screen - 1); window.scrollTo({ top: 0 }); }}
                  className="inline-flex items-center gap-2 font-outfit text-sm text-[#2D2926]/60 hover:text-[#6B2D3C] transition-colors duration-[600ms]"
                >
                  <ArrowLeft size={16} /> Atrás
                </button>
                {screen < SECTIONS.length - 1 ? (
                  <Button
                    onClick={() => {
                      // Única obligatoria del ejercicio: qué vendes y a quién (P1.2)
                      if (screen === 0 && !(answers.queVendes || '').trim()) return;
                      setScreen(screen + 1);
                      window.scrollTo({ top: 0 });
                    }}
                    className={`!px-8 ${screen === 0 && !(answers.queVendes || '').trim() ? 'opacity-40 pointer-events-none' : ''}`}
                  >
                    Siguiente <ArrowRight size={16} className="ml-2" />
                  </Button>
                ) : (
                  <Button onClick={irAResultado} className="!px-8">
                    Ver mi Pulso <ArrowRight size={16} className="ml-2" />
                  </Button>
                )}
              </div>
            </motion.section>
          )}

          {/* P6–P7 · RESULTADO + CAPTURA */}
          {screen === 'resultado' && (
            <motion.section key="resultado" {...fade}>
              <div className="text-center mb-10">
                <Etiqueta>{answers.nombre ? `El Pulso de ${answers.nombre}` : 'Tu Pulso'}</Etiqueta>
                <h2 className="font-outfit text-2xl md:text-4xl leading-tight">
                  {sintesis.estado === 'ok'
                    ? sintesis.data.pulsoEnUnaFrase
                    : 'Tu base estratégica, armada con tus palabras.'}
                </h2>
                {sintesis.estado === 'cargando' && (
                  <p className="font-azeret text-[10px] uppercase tracking-widest text-[#8C8378] mt-4 animate-pulse">
                    Analizando tus respuestas…
                  </p>
                )}
              </div>

              {/* Lo que tu Pulso revela (síntesis IA) */}
              {sintesis.estado === 'ok' && (
                <div className="grid md:grid-cols-3 gap-4 mb-10">
                  {[
                    ['Una fortaleza que quizá no ves', sintesis.data.fortaleza],
                    ['Una desconexión', sintesis.data.desconexion],
                    ['Tu siguiente paso esta semana', sintesis.data.siguientePaso],
                  ].map(([titulo, texto]) => (
                    <div key={titulo} className="bg-white border border-[#EBE6DE] rounded-[24px] p-6 neumorphism-light">
                      <span className="font-azeret text-[9px] uppercase tracking-widest text-[#6B2D3C] block mb-3">{titulo}</span>
                      <p className="text-[14px] leading-relaxed text-[#2D2926]/85">{texto}</p>
                    </div>
                  ))}
                </div>
              )}

              {sintesis.estado === 'pendiente' && (
                <div className="bg-white border border-[#EBE6DE] rounded-[24px] p-6 mb-10 text-center">
                  <p className="text-[14px] text-[#2D2926]/70">
                    El análisis a profundidad de tus respuestas llega junto con tu PDF por correo.
                    Abajo ya tienes tu base armada y las preguntas que quedaron abiertas.
                  </p>
                </div>
              )}

              {/* Los 4 canvas (plantilla) */}
              <div className="grid md:grid-cols-2 gap-4 mb-10">
                {canvases.map((c) => (
                  <div key={c.framework} className="bg-white border border-[#EBE6DE] rounded-[24px] p-6 neumorphism-light">
                    <span className="font-azeret text-[9px] uppercase tracking-widest text-[#8C8378] block">{c.subtitle}</span>
                    <h3 className="font-outfit text-lg mb-4">{c.framework}</h3>
                    <div className="space-y-3">
                      {c.items.map((it) => (
                        <div key={it.id}>
                          <span className="text-[11px] font-medium text-[#6B2D3C] block">{it.label}</span>
                          {it.value ? (
                            <p className="text-[13px] text-[#2D2926]/80 leading-relaxed">{it.value}</p>
                          ) : (
                            <p className="text-[13px] text-[#B8AFA6] italic">Sin respuesta — quedó como pregunta abierta.</p>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>

              {/* Preguntas abiertas (síntesis IA si existe; si no, detección local) */}
              {(sintesis.estado === 'ok' ? sintesis.data.preguntasAbiertas : gaps).length > 0 && (
                <div className="bg-[#2D2926] text-[#F5F1EB] rounded-[24px] p-6 md:p-8 mb-10">
                  <span className="font-azeret text-[9px] uppercase tracking-widest text-[#E8DDB0] block mb-4">
                    Preguntas abiertas
                  </span>
                  <ul className="space-y-3">
                    {(sintesis.estado === 'ok' ? sintesis.data.preguntasAbiertas : gaps).map((g, i) => (
                      <li key={i} className="text-[14px] text-[#F5F1EB]/85 leading-relaxed">— {g}</li>
                    ))}
                  </ul>
                </div>
              )}

              {/* P7 · Captura */}
              <div className="bg-white border border-[#EBE6DE] rounded-[24px] p-6 md:p-10 neumorphism-light text-center">
                {lead.estado === 'ok' ? (
                  <div className="flex flex-col items-center gap-3">
                    <Check className="text-[#6B2D3C]" size={28} />
                    <p className="font-outfit text-lg">Listo. Tu Pulso completo va en camino a {lead.email}.</p>
                  </div>
                ) : (
                  <>
                    <h3 className="font-outfit text-xl md:text-2xl mb-2">Tu Pulso completo en PDF, a tu correo.</h3>
                    <p className="text-[14px] text-[#2D2926]/60 mb-6">
                      Los cuatro documentos armados + el análisis, listos para usar.
                    </p>
                    <form onSubmit={enviarLead} className="flex flex-col sm:flex-row gap-3 max-w-xl mx-auto">
                      <input
                        type="text"
                        value={lead.nombre}
                        onChange={(e) => setLead((l) => ({ ...l, nombre: e.target.value }))}
                        placeholder="Tu nombre"
                        className="flex-1 bg-[#F5F1EB] border border-[#EBE6DE] rounded-full px-5 py-3.5 text-sm focus:outline-none focus:border-[#6B2D3C]/50 transition-all duration-[600ms] input-neumorphism placeholder-[#8C8378]"
                      />
                      <input
                        type="email"
                        required
                        value={lead.email}
                        onChange={(e) => setLead((l) => ({ ...l, email: e.target.value }))}
                        placeholder="Tu correo"
                        className="flex-1 bg-[#F5F1EB] border border-[#EBE6DE] rounded-full px-5 py-3.5 text-sm focus:outline-none focus:border-[#6B2D3C]/50 transition-all duration-[600ms] input-neumorphism placeholder-[#8C8378]"
                      />
                      <Button className="!px-8 text-sm" onClick={() => {}}>
                        {lead.estado === 'enviando' ? 'Enviando…' : 'Enviármelo'}
                      </Button>
                    </form>
                    {lead.estado === 'error' && (
                      <p className="text-[12px] text-[#6B2D3C] mt-3">No se pudo enviar. Intenta de nuevo.</p>
                    )}
                    <p className="font-azeret text-[9px] uppercase tracking-widest text-[#B8AFA6] mt-5">
                      Tu correo se usa solo para enviarte tu Pulso y contenido útil. Nada más.
                    </p>
                  </>
                )}
              </div>
            </motion.section>
          )}
        </AnimatePresence>
      </main>

      <footer className="relative z-10 max-w-3xl mx-auto px-6 pb-10 text-center">
        <span className="font-azeret text-[9px] uppercase tracking-widest text-[#B8AFA6]">
          Llegar a un lugar diseñado para ti · brandonchimal.com
        </span>
      </footer>
    </div>
  );
}

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, ArrowRight, Sparkles, Check, Plus } from 'lucide-react';
import GlobalStyles from '../styles/GlobalStyles';
import { EASE, fadeUp, staggerContainer, useReducedMotion } from '../pulso/animations';
import { BRIEF_SECTIONS } from './brief';
import { pedirTerritorios, elegirTerritorio } from './synthesis';

// --- BRANDING BUILDER · F1 (dirección creativa) ---
// Brief visual centrado en el consumidor → agente Estratega → 2-3 territorios.
// Elegir uno guarda el proyecto; generar los visuales es F2/F3 (Recraft).

const BrandingStyles = () => (
  <style>{`
    body { background: linear-gradient(135deg, #FFF3C2 0%, #F5F1EB 55%, #EBE6DE 100%); }
    .glass-warm {
      background: rgba(255,255,255,0.25);
      backdrop-filter: blur(30px) saturate(140%);
      -webkit-backdrop-filter: blur(30px) saturate(140%);
      border: 1.5px solid rgba(255,255,255,0.45);
    }
    /* Barra neumórfica + glass, más ancha */
    .brand-slider {
      -webkit-appearance: none; appearance: none;
      width: 100%; height: 14px; border-radius: 9999px; outline: none; cursor: pointer;
      background: linear-gradient(#EBE6DE, #F5F1EB);
      box-shadow: inset 3px 3px 7px rgba(140,131,120,0.35), inset -3px -3px 7px rgba(255,255,255,0.9);
      transition: all .6s cubic-bezier(0.34,1.56,0.64,1);
    }
    .brand-slider::-webkit-slider-thumb {
      -webkit-appearance: none; appearance: none;
      width: 30px; height: 30px; border-radius: 9999px;
      background: linear-gradient(145deg, #7d3648, #6B2D3C);
      border: 2px solid rgba(255,243,194,0.5);
      box-shadow: 4px 4px 10px rgba(107,45,60,0.35), -2px -2px 6px rgba(255,255,255,0.6);
      transition: all .6s cubic-bezier(0.34,1.56,0.64,1);
    }
    .brand-slider::-webkit-slider-thumb:hover { transform: scale(1.12); }
    .brand-slider::-moz-range-thumb {
      width: 30px; height: 30px; border-radius: 9999px; border: 2px solid rgba(255,243,194,0.5);
      background: #6B2D3C; box-shadow: 4px 4px 10px rgba(107,45,60,0.35);
    }
    @media (prefers-reduced-motion: reduce) {
      *, *::before, *::after { animation-duration:.001ms!important; transition-duration:.001ms!important; }
    }
  `}</style>
);

// Chips multi-selección + "Agregar" para meter una emoción propia.
const ChipsField = ({ options, value, onChange }) => {
  const [adding, setAdding] = useState(false);
  const [draft, setDraft] = useState('');
  const selected = Array.isArray(value) ? value : [];
  const all = [...options, ...selected.filter((s) => !options.includes(s))];

  const toggle = (op) => onChange(selected.includes(op) ? selected.filter((x) => x !== op) : [...selected, op]);
  const addCustom = () => {
    const v = draft.trim();
    if (v && !selected.includes(v)) onChange([...selected, v]);
    setDraft(''); setAdding(false);
  };

  return (
    <div className="flex flex-wrap gap-2 items-center">
      {all.map((op) => (
        <motion.button key={op} type="button" whileTap={{ scale: 0.95 }} onClick={() => toggle(op)}
          className={`text-[13px] px-4 py-2 rounded-full border transition-all duration-[600ms] ${
            selected.includes(op)
              ? 'bg-[#6B2D3C] text-[#F5F1EB] border-[#6B2D3C] shadow-[0_4px_15px_rgba(107,45,60,0.25)]'
              : 'glass-warm text-[#2D2926]/75 hover:border-[#6B2D3C]/40 hover:-translate-y-0.5'
          }`}>
          {op}
        </motion.button>
      ))}
      {adding ? (
        <input autoFocus value={draft} onChange={(e) => setDraft(e.target.value)}
          onKeyDown={(e) => { if (e.key === 'Enter') { e.preventDefault(); addCustom(); } if (e.key === 'Escape') { setAdding(false); setDraft(''); } }}
          onBlur={addCustom} placeholder="Escribe y Enter"
          className="text-[13px] px-4 py-2 rounded-full glass-warm text-[#2D2926] focus:outline-none focus:ring-1 focus:ring-[#6B2D3C]/40 w-40" />
      ) : (
        <button type="button" onClick={() => setAdding(true)}
          className="inline-flex items-center gap-1 text-[13px] px-4 py-2 rounded-full border border-dashed border-[#8C8378]/40 text-[#8C8378] hover:border-[#6B2D3C]/50 hover:text-[#6B2D3C] transition-all duration-[600ms]">
          <Plus size={14} /> Agregar
        </button>
      )}
    </div>
  );
};

const Field = ({ q, value, onChange, answers }) => {
  if (q.type === 'chips') {
    const options = q.getOptions ? q.getOptions(answers) : (q.options || []);
    return <ChipsField options={options} value={value} onChange={onChange} />;
  }
  if (q.type === 'select') {
    const options = q.getOptions ? q.getOptions(answers) : q.options;
    return (
      <div className="flex flex-wrap gap-2">
        {options.map((op) => (
          <motion.button
            key={op}
            type="button"
            whileTap={{ scale: 0.95 }}
            onClick={() => onChange(op)}
            className={`font-azeret text-[11px] uppercase tracking-widest px-4 py-2.5 rounded-full border transition-all duration-[600ms] ${
              value === op
                ? 'bg-[#6B2D3C] text-[#F5F1EB] border-[#6B2D3C]'
                : 'glass-warm text-[#2D2926]/70 hover:border-[#6B2D3C]/40 hover:-translate-y-0.5'
            }`}
          >
            {op}
          </motion.button>
        ))}
      </div>
    );
  }
  if (q.type === 'scale') {
    const v = value === undefined ? 50 : value;
    return (
      <div>
        <input
          type="range" min="0" max="100" value={v}
          onChange={(e) => onChange(Number(e.target.value))}
          className="brand-slider"
        />
        <div className="flex justify-between mt-3 font-azeret text-[10px] uppercase tracking-widest text-[#8C8378]">
          <span className={v < 45 ? 'text-[#6B2D3C]' : ''}>{q.left}</span>
          <span className={v > 55 ? 'text-[#6B2D3C]' : ''}>{q.right}</span>
        </div>
      </div>
    );
  }
  if (q.type === 'text') {
    return (
      <input
        type="text" value={value || ''} onChange={(e) => onChange(e.target.value)}
        placeholder={q.placeholder || ''}
        className="w-full glass-warm rounded-2xl p-4 text-[15px] text-[#2D2926] focus:outline-none focus:ring-1 focus:ring-[#6B2D3C]/40 transition-all duration-[600ms] placeholder-[#8C8378]"
      />
    );
  }
  return (
    <textarea
      rows="3" value={value || ''} onChange={(e) => onChange(e.target.value)}
      placeholder={q.placeholder || ''}
      className="w-full glass-warm rounded-2xl p-4 text-[15px] text-[#2D2926] leading-relaxed focus:outline-none focus:ring-1 focus:ring-[#6B2D3C]/40 transition-all duration-[600ms] placeholder-[#8C8378] resize-none"
    />
  );
};

const TerritorioCard = ({ t, index, elegido, onElegir }) => (
  <motion.div variants={fadeUp} className={`glass-warm rounded-[24px] p-6 md:p-8 transition-all duration-[600ms] ${elegido ? 'ring-2 ring-[#6B2D3C]' : ''}`}>
    <div className="flex items-baseline justify-between mb-1">
      <span className="font-azeret text-[9px] uppercase tracking-widest text-[#8C8378]">Territorio {index + 1}</span>
      {t.tension_visual && <span className="font-azeret text-[9px] uppercase tracking-widest text-[#6B2D3C]">{t.tension_visual}</span>}
    </div>
    <h3 className="font-outfit text-2xl md:text-3xl text-[#2D2926] mb-3">{t.nombre}</h3>
    {t.percepcion && <p className="text-[14px] text-[#2D2926]/75 mb-5 leading-relaxed">{t.percepcion}</p>}

    {Array.isArray(t.paleta) && t.paleta.length > 0 && (
      <div className="mb-5">
        <span className="font-azeret text-[8px] uppercase tracking-widest text-[#8C8378] block mb-2">Paleta</span>
        <div className="flex flex-wrap gap-2">
          {t.paleta.map((c, i) => (
            <div key={i} className="flex items-center gap-2 bg-white/40 rounded-full pl-1.5 pr-3 py-1">
              <span className="w-6 h-6 rounded-full border border-black/10 shrink-0" style={{ background: c.hex || '#ccc' }} />
              <span className="text-[11px] text-[#2D2926]/80">{c.rol}{c.hex ? ` · ${c.hex}` : ''}</span>
            </div>
          ))}
        </div>
      </div>
    )}

    {t.tipografia && (
      <div className="mb-5 grid grid-cols-3 gap-2">
        {['titulares', 'cuerpo', 'datos'].map((k) => t.tipografia[k] && (
          <div key={k}>
            <span className="font-azeret text-[8px] uppercase tracking-widest text-[#8C8378] block">{k}</span>
            <span className="text-[13px] text-[#2D2926]">{t.tipografia[k]}</span>
          </div>
        ))}
      </div>
    )}

    {t.forma && (
      <div className="mb-4">
        <span className="font-azeret text-[8px] uppercase tracking-widest text-[#8C8378] block mb-1">Forma y composición</span>
        <p className="text-[13px] text-[#2D2926]/80 leading-relaxed">{t.forma}</p>
      </div>
    )}
    {t.que_evita && (
      <div className="mb-4">
        <span className="font-azeret text-[8px] uppercase tracking-widest text-[#6B2D3C] block mb-1">Qué evita</span>
        <p className="text-[13px] text-[#2D2926]/80 leading-relaxed">{t.que_evita}</p>
      </div>
    )}
    {t.por_que && (
      <div className="bg-[#2D2926] rounded-xl p-4 mb-5">
        <span className="font-azeret text-[8px] uppercase tracking-widest text-[#E8DDB0] block mb-1">Por qué para tu consumidor</span>
        <p className="text-[13px] text-[#F5F1EB]/90 leading-relaxed">{t.por_que}</p>
      </div>
    )}

    <motion.button
      type="button" whileTap={{ scale: 0.97 }} onClick={onElegir}
      className={`w-full font-outfit rounded-full py-3 text-sm transition-all duration-[600ms] ${
        elegido
          ? 'bg-[#6B2D3C]/10 text-[#6B2D3C] border border-[#6B2D3C]/30'
          : 'bg-[#6B2D3C] text-[#F5F1EB] hover:shadow-[0_8px_30px_rgba(107,45,60,0.5)] hover:-translate-y-0.5'
      }`}
    >
      {elegido ? '✓ Elegiste este territorio' : 'Elegir este territorio'}
    </motion.button>
  </motion.div>
);

export default function BrandingApp() {
  const [screen, setScreen] = useState('intro'); // 'intro' | índice de sección | 'result'
  const [answers, setAnswers] = useState({});
  const [estado, setEstado] = useState({ fase: 'idle', data: null }); // idle|cargando|ok|error
  const [elegido, setElegido] = useState(null);
  useReducedMotion();

  const seccion = typeof screen === 'number' ? BRIEF_SECTIONS[screen] : null;
  const set = (id, v) => setAnswers((a) => ({ ...a, [id]: v }));

  const generar = async () => {
    setScreen('result');
    setEstado({ fase: 'cargando', data: null });
    window.scrollTo({ top: 0 });
    const brief = { ...answers };
    const r = await pedirTerritorios({
      brief,
      nombre: answers.nombre || null,
      pulso: { nombre: answers.nombre, queVende: answers.queVende },
    });
    setEstado(r.ok ? { fase: 'ok', data: r.data } : { fase: 'error', data: null });
  };

  const onElegir = async (i) => {
    setElegido(i);
    if (estado.data?.projectId) await elegirTerritorio({ projectId: estado.data.projectId, indice: i });
  };

  return (
    <div className="min-h-screen text-[#2D2926] relative" style={{ fontFamily: "'DM Sans', sans-serif" }}>
      <GlobalStyles />
      <BrandingStyles />

      <header className="relative z-10 max-w-5xl mx-auto px-6 pt-8 flex items-center justify-between">
        <a href="/" className="font-outfit text-sm text-[#2D2926]/70 hover:text-[#6B2D3C] transition-colors duration-[600ms]">← Brandon Chimal</a>
        <span className="font-azeret text-[9px] uppercase tracking-widest text-[#8C8378]">Ese Momento · Branding</span>
      </header>

      <main className="relative z-10 max-w-5xl mx-auto px-6 py-10 md:py-14">
        <AnimatePresence mode="wait">
          {screen === 'intro' && (
            <motion.section key="intro" variants={staggerContainer(0.15, 0.1)} initial="hidden" animate="show"
              exit={{ opacity: 0, y: -24, transition: { duration: 0.4, ease: EASE } }}
              className="text-center max-w-2xl mx-auto pt-8 md:pt-16">
              <motion.span variants={fadeUp} className="font-azeret text-[10px] uppercase text-[#6B2D3C] font-medium block mb-5 tracking-widest">Branding Builder</motion.span>
              <motion.h1 variants={fadeUp} className="font-outfit text-4xl md:text-[52px] leading-[1.1] mb-6">La identidad de tu marca empieza por lo que siente tu consumidor.</motion.h1>
              <motion.p variants={fadeUp} className="text-[15px] md:text-[17px] text-[#2D2926]/70 mb-10">Unas preguntas sobre tu consumidor — no sobre tu gusto — y te propongo direcciones visuales distintas, cada una con su razón de ser. Sin plantillas, sin clichés de tu industria.</motion.p>
              <motion.div variants={fadeUp}>
                <motion.button type="button" whileTap={{ scale: 0.97 }} onClick={() => setScreen(0)}
                  className="font-outfit inline-flex items-center gap-2 bg-[#6B2D3C] text-[#F5F1EB] rounded-full px-10 py-4 shadow-[0_4px_15px_rgba(107,45,60,0.3)] hover:shadow-[0_8px_30px_rgba(107,45,60,0.5)] hover:scale-105 hover:-translate-y-1 hover:bg-[#8A3F52] transition-all duration-[600ms]">
                  <Sparkles size={18} /> Empezar
                </motion.button>
              </motion.div>
            </motion.section>
          )}

          {seccion && (
            <motion.section key={seccion.id} variants={staggerContainer(0.08, 0.05)} initial="hidden" animate="show"
              exit={{ opacity: 0, x: -60, transition: { duration: 0.4, ease: EASE } }} className="max-w-2xl mx-auto">
              <motion.div variants={fadeUp} className="flex flex-wrap gap-x-3 gap-y-1 justify-center mb-8">
                {BRIEF_SECTIONS.map((s, i) => (
                  <span key={s.id} className={`font-azeret text-[9px] uppercase tracking-widest ${i === screen ? 'text-[#6B2D3C]' : i < screen ? 'text-[#2D2926]/50' : 'text-[#B8AFA6]'}`}>
                    {i < screen ? '✓ ' : ''}{s.label}
                  </span>
                ))}
              </motion.div>
              <motion.h2 variants={fadeUp} className="font-outfit text-2xl md:text-3xl text-center mb-2">{seccion.label}</motion.h2>
              {seccion.intro && <motion.p variants={fadeUp} className="text-[14px] text-[#2D2926]/60 text-center mb-8">{seccion.intro}</motion.p>}

              <div className="glass-warm rounded-[24px] p-5 sm:p-6 md:p-8 space-y-6">
                {seccion.questions.map((q) => (
                  <motion.div key={q.id} variants={fadeUp}>
                    <label className="block text-[15px] md:text-[16px] font-medium mb-2">{q.q}</label>
                    {q.hint && <p className="text-[13px] text-[#8C8378] mb-3">{q.hint}</p>}
                    <Field q={q} value={answers[q.id]} onChange={(v) => set(q.id, v)} answers={answers} />
                  </motion.div>
                ))}
              </div>

              <div className="flex justify-between items-center mt-8">
                <button type="button" onClick={() => { setScreen(screen === 0 ? 'intro' : screen - 1); window.scrollTo({ top: 0 }); }}
                  className="inline-flex items-center gap-2 font-outfit text-sm text-[#2D2926]/50 hover:text-[#6B2D3C] transition-colors duration-[600ms]">
                  <ArrowLeft size={16} /> Atrás
                </button>
                <motion.button type="button" whileTap={{ scale: 0.97 }}
                  onClick={() => { if (screen < BRIEF_SECTIONS.length - 1) { setScreen(screen + 1); window.scrollTo({ top: 0 }); } else generar(); }}
                  className="inline-flex items-center gap-2 font-outfit bg-[#6B2D3C] text-[#F5F1EB] rounded-full px-8 py-3.5 text-sm shadow-[0_4px_15px_rgba(107,45,60,0.3)] hover:shadow-[0_8px_30px_rgba(107,45,60,0.5)] hover:scale-105 hover:-translate-y-1 hover:bg-[#8A3F52] transition-all duration-[600ms]">
                  {screen < BRIEF_SECTIONS.length - 1 ? 'Siguiente' : 'Ver mis territorios'} <ArrowRight size={16} />
                </motion.button>
              </div>
            </motion.section>
          )}

          {screen === 'result' && (
            <motion.section key="result" initial={{ opacity: 0 }} animate={{ opacity: 1, transition: { duration: 0.6, ease: EASE } }}>
              <div className="text-center mb-10">
                <span className="font-azeret text-[10px] uppercase text-[#6B2D3C] font-medium block mb-4 tracking-widest">
                  {answers.nombre ? `Direcciones para ${answers.nombre}` : 'Tus direcciones visuales'}
                </span>
                <h2 className="font-outfit text-2xl md:text-4xl leading-tight">
                  {estado.fase === 'ok' ? 'Elige la dirección que se siente tuya.' : estado.fase === 'error' ? 'No se pudo generar en este momento.' : 'Diseñando tus territorios…'}
                </h2>
                {estado.fase === 'cargando' && <p className="font-azeret text-[10px] uppercase tracking-widest text-[#8C8378] mt-4 animate-pulse">El Estratega está pensando…</p>}
                {estado.fase === 'error' && <p className="text-[14px] text-[#2D2926]/70 mt-4">Vuelve a intentarlo en un momento. Tus respuestas siguen aquí.</p>}
              </div>

              {estado.fase === 'ok' && (
                <>
                  <motion.div variants={staggerContainer(0.15, 0.1)} initial="hidden" animate="show" className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 items-start">
                    {estado.data.territorios.map((t, i) => (
                      <TerritorioCard key={i} t={t} index={i} elegido={elegido === i} onElegir={() => onElegir(i)} />
                    ))}
                  </motion.div>

                  {elegido !== null && (
                    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, ease: EASE }}
                      className="glass-warm rounded-[24px] p-6 md:p-8 mt-6 text-center max-w-2xl mx-auto">
                      <Check className="text-[#6B2D3C] mx-auto mb-3" size={28} />
                      <h3 className="font-outfit text-xl mb-2">Territorio guardado.</h3>
                      <p className="text-[14px] text-[#2D2926]/70">El siguiente paso — tu nombre (si lo necesitas), logo, sistema visual y Brandbook — se genera sobre esta dirección. Lo estamos construyendo.</p>
                    </motion.div>
                  )}
                </>
              )}
            </motion.section>
          )}
        </AnimatePresence>
      </main>

      <footer className="relative z-10 max-w-5xl mx-auto px-6 pb-10 pt-4 text-center">
        <span className="font-azeret text-[9px] uppercase tracking-widest text-[#8C8378]">Llegar a un lugar diseñado para ti · brandonchimal.com</span>
      </footer>
    </div>
  );
}

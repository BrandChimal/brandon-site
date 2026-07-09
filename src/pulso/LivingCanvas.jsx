import { motion } from 'framer-motion';
import { fadeUp, staggerContainer, EASE } from './animations';
import { SECTIONS } from './questions';

// --- CANVAS VIVO ---
// El Pulso construyéndose en tiempo real: 4 cards glass (una por framework),
// cada una con sus slots. El slot activo pulsa; al confirmar una respuesta,
// su slot se llena con un pop. En el resultado, estas mismas cards crecen
// a pantalla completa vía layoutId (morph).

const FRAMEWORKS = SECTIONS.filter((s) => s.framework);

const Slot = ({ q, value, active }) => (
  <motion.div
    layout
    className={`rounded-xl px-3 py-2 border transition-all duration-[600ms] ${
      active
        ? 'border-[#6B2D3C]/50 bg-white/40'
        : value
        ? 'border-white/50 bg-white/30'
        : 'border-dashed border-[#8C8378]/30 bg-transparent'
    }`}
  >
    <div className="flex items-center gap-2">
      {active && (
        <motion.span
          className="h-2 w-2 rounded-full bg-[#6B2D3C] shrink-0"
          animate={{ opacity: [1, 0.4, 1], scale: [1, 1.5, 1] }}
          transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
        />
      )}
      <span className={`font-azeret text-[8px] uppercase tracking-widest ${active ? 'text-[#6B2D3C]' : 'text-[#8C8378]'}`}>
        {q.short}
      </span>
    </div>
    {value ? (
      <motion.p
        key={value}
        initial={{ opacity: 0, y: 8, scale: 0.96 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.6, ease: EASE }}
        className="text-[11px] leading-snug text-[#2D2926]/85 mt-1 line-clamp-2"
      >
        {value}
      </motion.p>
    ) : (
      <p className="text-[11px] text-[#8C8378]/60 italic mt-1">{active ? 'Escribiendo…' : 'Por responder'}</p>
    )}
  </motion.div>
);

export default function LivingCanvas({ answers, activeId, entrance = true }) {
  return (
    <motion.div
      variants={staggerContainer(0.15, entrance ? 0.3 : 0)}
      initial={entrance ? 'hidden' : false}
      animate="show"
      className="grid grid-cols-1 gap-3"
    >
      {FRAMEWORKS.map((s) => {
        const activa = s.questions.some((q) => q.id === activeId);
        return (
          <motion.div
            key={s.id}
            variants={fadeUp}
            layoutId={`canvas-${s.id}`}
            className={`glass-warm rounded-[24px] p-4 transition-all duration-[600ms] ${
              activa ? 'ring-1 ring-[#6B2D3C]/30' : ''
            }`}
          >
            <span className="font-azeret text-[8px] uppercase tracking-widest text-[#8C8378] block">{s.label}</span>
            <h3 className="font-outfit text-[15px] text-[#2D2926] mb-2">{s.framework}</h3>
            <div className="space-y-2">
              {s.questions.map((q) => (
                <Slot key={q.id} q={q} value={(answers[q.id] || '').trim()} active={q.id === activeId} />
              ))}
            </div>
          </motion.div>
        );
      })}
    </motion.div>
  );
}

export { FRAMEWORKS };

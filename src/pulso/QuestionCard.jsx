import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, ArrowRight, CornerDownLeft } from 'lucide-react';
import { EASE } from './animations';
import { resolvePlaceholder } from './questions';

// --- PREGUNTA CONVERSACIONAL ---
// Una pregunta a la vez. Entrada escalonada elemento por elemento
// (etiqueta → pregunta → campo → acciones). Enter confirma; Shift+Enter
// hace salto de línea. Al confirmar, la card sale hacia el canvas.

const child = {
  hidden: { opacity: 0, y: 24, scale: 0.97 },
  show: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.8, ease: EASE } },
};

// El contenedor recibe la dirección fresca vía `custom` de AnimatePresence
// (un prop normal se congela al desmontar y la salida usaría el valor viejo).
const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08, delayChildren: 0.05 } },
  exit: (dir) => ({
    opacity: 0,
    x: 140 * (dir ?? 1),
    scale: 0.92,
    transition: { duration: 0.45, ease: EASE },
  }),
};

export default function QuestionCard({
  step, value, onChange, onConfirm, onBack,
  index, total, isFirst, tipoCliente,
}) {
  const inputRef = useRef(null);
  const placeholder = resolvePlaceholder(step.placeholder, tipoCliente);

  useEffect(() => {
    const t = setTimeout(() => inputRef.current?.focus(), 450);
    return () => clearTimeout(t);
  }, [step.id]);

  const handleKey = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      onConfirm();
    }
  };

  return (
    <motion.div
      key={step.id}
      variants={container}
      initial="hidden"
      animate="show"
      exit="exit"
      className="w-full"
    >
      <motion.div variants={child} className="flex items-center gap-3 mb-4">
        <span className="font-azeret text-[10px] uppercase tracking-widest text-[#6B2D3C]">
          {step.framework || step.sectionLabel}
        </span>
        <span className="font-azeret text-[10px] text-[#8C8378]">{index + 1} / {total}</span>
      </motion.div>

      <motion.h2 variants={child} className="font-outfit text-2xl md:text-[34px] leading-tight text-[#2D2926] mb-3">
        {step.q}
      </motion.h2>

      {step.intro && (
        <motion.p variants={child} className="text-[14px] text-[#2D2926]/60 mb-6">
          {step.intro}
        </motion.p>
      )}

      <motion.div variants={child} className="mb-6">
        {step.type === 'select' ? (
          <div className="flex flex-wrap gap-2">
            {step.options.map((op) => (
              <motion.button
                key={op}
                type="button"
                whileTap={{ scale: 0.95 }}
                onClick={() => { onChange(op); setTimeout(onConfirm, 350); }}
                className={`font-azeret text-[11px] uppercase tracking-widest px-5 py-3 rounded-full border transition-all duration-[600ms] ${
                  value === op
                    ? 'bg-[#6B2D3C] text-[#F5F1EB] border-[#6B2D3C] shadow-[0_4px_15px_rgba(107,45,60,0.3)]'
                    : 'glass-warm text-[#2D2926]/70 hover:border-[#6B2D3C]/40 hover:-translate-y-0.5'
                }`}
              >
                {op}
              </motion.button>
            ))}
          </div>
        ) : step.type === 'text' ? (
          <input
            ref={inputRef}
            type="text"
            value={value || ''}
            onChange={(e) => onChange(e.target.value)}
            onKeyDown={handleKey}
            placeholder={placeholder}
            className="w-full glass-warm rounded-2xl p-5 text-[16px] text-[#2D2926] focus:outline-none placeholder-[#8C8378]/70 transition-all duration-[600ms] focus:ring-1 focus:ring-[#6B2D3C]/40 focus:-translate-y-0.5"
          />
        ) : (
          <textarea
            ref={inputRef}
            rows="4"
            value={value || ''}
            onChange={(e) => onChange(e.target.value)}
            onKeyDown={handleKey}
            placeholder={placeholder}
            className="w-full glass-warm rounded-2xl p-5 text-[16px] text-[#2D2926] leading-relaxed focus:outline-none placeholder-[#8C8378]/70 transition-all duration-[600ms] focus:ring-1 focus:ring-[#6B2D3C]/40 focus:-translate-y-0.5 resize-none"
          />
        )}
      </motion.div>

      <motion.div variants={child} className="flex items-center justify-between">
        <button
          type="button"
          onClick={onBack}
          className={`inline-flex items-center gap-2 font-outfit text-sm text-[#2D2926]/50 hover:text-[#6B2D3C] transition-colors duration-[600ms] ${isFirst ? 'invisible' : ''}`}
        >
          <ArrowLeft size={16} /> Atrás
        </button>

        <div className="flex items-center gap-4">
          {step.type !== 'select' && (
            <span className="hidden md:inline-flex items-center gap-1.5 font-azeret text-[9px] uppercase tracking-widest text-[#8C8378]">
              <CornerDownLeft size={11} /> Enter para seguir
            </span>
          )}
          <motion.button
            type="button"
            whileTap={{ scale: 0.97 }}
            onClick={onConfirm}
            disabled={step.required && !(value || '').trim()}
            className={`inline-flex items-center gap-2 font-outfit rounded-full px-8 py-3.5 transition-all duration-[600ms] ${
              step.required && !(value || '').trim()
                ? 'bg-[#8C8378]/20 text-[#8C8378] cursor-not-allowed'
                : 'bg-[#6B2D3C] text-[#F5F1EB] shadow-[0_4px_15px_rgba(107,45,60,0.3)] hover:shadow-[0_8px_30px_rgba(107,45,60,0.5)] hover:scale-105 hover:-translate-y-1 hover:bg-[#8A3F52]'
            }`}
          >
            {(value || '').trim() ? 'Al canvas' : 'Saltar'} <ArrowRight size={16} />
          </motion.button>
        </div>
      </motion.div>
    </motion.div>
  );
}

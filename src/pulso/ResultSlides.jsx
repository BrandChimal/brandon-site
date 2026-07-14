import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { EASE, fadeUp, staggerContainer } from './animations';
import { BuyerPersonaCard, EmpathyMapCard, VpcCard, BigIdealCard, DiagnosticoCard } from './Entregables';

// --- RESULTADO COMO SESIÓN GUIADA ---
// Una idea por pantalla, como un consultor presentando tu Pulso slide por
// slide. El objetivo: que la persona reflexione sobre lo que ve, no que
// descifre un reporte. Navegación: botones, teclado (←/→) y swipe.

const VOZ = {
  frase: { intro: 'Si tuviera que decirte quién eres en una línea, es esta.', reflexion: null },
  diagnostico: { intro: 'Lo primero que te diría en una sesión:', reflexion: null },
  persona: { intro: 'Así queda tu cliente ideal. Léelo como si te lo presentaran.', reflexion: '¿Esta persona existe, o la estás imaginando?' },
  empatia: { intro: 'Esto es lo que pasa dentro de tu cliente.', reflexion: '¿Tu comunicación de hoy le habla a esto?' },
  valor: { intro: 'Tu oferta frente a lo que tu cliente vive.', reflexion: 'Lo que no conecta con el lado del cliente, sobra.' },
  bigideal: { intro: 'Tu porqué, en su fórmula.', reflexion: 'Si esta frase te da orgullo, es la correcta.' },
  revela: { intro: 'Tres cosas que veo y que necesitas ver.', reflexion: null },
  cierre: { intro: 'Esto es tuyo. Úsalo.', reflexion: null },
};

const slideVariants = {
  enter: (dir) => ({ opacity: 0, x: 90 * dir, scale: 0.98 }),
  center: { opacity: 1, x: 0, scale: 1, transition: { duration: 0.7, ease: EASE } },
  exit: (dir) => ({ opacity: 0, x: -90 * dir, scale: 0.98, transition: { duration: 0.4, ease: EASE } }),
};

export default function ResultSlides({ data, nombre, leadSlot }) {
  const [idx, setIdx] = useState(0);
  const [dir, setDir] = useState(1);
  const touchX = useRef(null);

  const slides = [
    { id: 'frase', label: 'Tu Pulso' },
    { id: 'diagnostico', label: 'Diagnóstico' },
    { id: 'persona', label: 'Buyer Persona' },
    { id: 'empatia', label: 'Empathy Map' },
    { id: 'valor', label: 'Propuesta de valor' },
    { id: 'bigideal', label: 'Big Ideal' },
    { id: 'revela', label: 'Lo que revela' },
    { id: 'cierre', label: 'Llévatelo' },
  ];

  const ir = (n) => {
    if (n === idx || n < 0 || n > slides.length - 1) return;
    setDir(n > idx ? 1 : -1);
    setIdx(n);
    window.scrollTo({ top: 0 });
  };

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'ArrowRight') ir(idx + 1);
      if (e.key === 'ArrowLeft') ir(idx - 1);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  });

  const slide = slides[idx];
  const voz = VOZ[slide.id];

  return (
    <div
      onTouchStart={(e) => { touchX.current = e.touches[0].clientX; }}
      onTouchEnd={(e) => {
        if (touchX.current === null) return;
        const delta = e.changedTouches[0].clientX - touchX.current;
        if (Math.abs(delta) > 60) ir(idx + (delta < 0 ? 1 : -1));
        touchX.current = null;
      }}
    >
      {/* Progreso: los pasos de la sesión */}
      <div className="flex flex-wrap gap-x-4 gap-y-1 justify-center mb-8">
        {slides.map((s, i) => (
          <button
            key={s.id}
            type="button"
            onClick={() => ir(i)}
            className={`font-azeret text-[9px] uppercase tracking-widest transition-colors duration-[600ms] ${
              i === idx ? 'text-[#6B2D3C]' : i < idx ? 'text-[#2D2926]/50' : 'text-[#B8AFA6] hover:text-[#8C8378]'
            }`}
          >
            {s.label}
          </button>
        ))}
      </div>

      <div className="min-h-[55vh]">
        <AnimatePresence mode="wait" custom={dir}>
          <motion.section
            key={slide.id}
            custom={dir}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            className="max-w-3xl mx-auto"
          >
            {/* Voz de consultor: directa, sin preámbulo */}
            <p className="font-azeret text-[10px] md:text-[11px] uppercase tracking-widest text-[#6B2D3C] text-center mb-6">
              {voz.intro}
            </p>

            {slide.id === 'frase' && (
              <div className="text-center py-10 md:py-16">
                <span className="font-azeret text-[10px] uppercase tracking-widest text-[#8C8378] block mb-5">
                  {nombre ? `El Pulso de ${nombre}` : 'Tu Pulso'}
                </span>
                <h2 className="font-outfit text-3xl md:text-[46px] leading-[1.15] text-[#2D2926]">
                  {data.pulsoEnUnaFrase}
                </h2>
              </div>
            )}

            {slide.id === 'diagnostico' && <DiagnosticoCard data={data.diagnosticoMomento || {}} />}
            {slide.id === 'persona' && <BuyerPersonaCard data={data.buyerPersona || {}} />}
            {slide.id === 'empatia' && <EmpathyMapCard data={data.empathyMap || {}} />}
            {slide.id === 'valor' && <VpcCard data={data.vpc || {}} />}
            {slide.id === 'bigideal' && <BigIdealCard data={data.bigIdeal || {}} nombre={nombre} />}

            {slide.id === 'revela' && (
              <motion.div variants={staggerContainer(0.15, 0.1)} initial="hidden" animate="show" className="grid gap-4">
                {[
                  ['Una fortaleza que quizá no ves', data.fortaleza],
                  ['Una desconexión', data.desconexion],
                  ['Tu siguiente paso esta semana', data.siguientePaso],
                ].map(([titulo, texto]) => (
                  <motion.div key={titulo} variants={fadeUp} className="glass-warm rounded-[24px] p-6 neumorphism-light">
                    <span className="font-azeret text-[9px] uppercase tracking-widest text-[#6B2D3C] block mb-2">{titulo}</span>
                    <p className="text-[15px] leading-relaxed text-[#2D2926]/85">{texto}</p>
                  </motion.div>
                ))}
              </motion.div>
            )}

            {slide.id === 'cierre' && (
              <div className="space-y-6">
                {Array.isArray(data.preguntasAbiertas) && data.preguntasAbiertas.length > 0 && (
                  <div className="bg-[#2D2926] text-[#F5F1EB] rounded-[24px] p-6 md:p-8">
                    <span className="font-azeret text-[9px] uppercase tracking-widest text-[#E8DDB0] block mb-4">
                      Lo que aún no me puedes responder
                    </span>
                    <ul className="space-y-2.5">
                      {data.preguntasAbiertas.map((g, i) => (
                        <li key={i} className="text-[14px] text-[#F5F1EB]/85 leading-relaxed">— {g}</li>
                      ))}
                    </ul>
                  </div>
                )}
                {leadSlot}
              </div>
            )}

            {/* Remate reflexivo */}
            {voz.reflexion && (
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1, transition: { delay: 0.9, duration: 0.8, ease: EASE } }}
                className="font-outfit text-[15px] md:text-[17px] text-[#2D2926]/60 italic text-center mt-8"
              >
                {voz.reflexion}
              </motion.p>
            )}
          </motion.section>
        </AnimatePresence>
      </div>

      {/* Navegación */}
      <div className="flex items-center justify-between max-w-3xl mx-auto mt-8">
        <button
          type="button"
          onClick={() => ir(idx - 1)}
          className={`inline-flex items-center gap-2 font-outfit text-sm text-[#2D2926]/50 hover:text-[#6B2D3C] transition-colors duration-[600ms] ${idx === 0 ? 'invisible' : ''}`}
        >
          <ArrowLeft size={16} /> Anterior
        </button>
        <span className="font-azeret text-[9px] text-[#8C8378]">{idx + 1} / {slides.length}</span>
        {idx < slides.length - 1 ? (
          <motion.button
            type="button"
            whileTap={{ scale: 0.97 }}
            onClick={() => ir(idx + 1)}
            className="inline-flex items-center gap-2 font-outfit bg-[#6B2D3C] text-[#F5F1EB] rounded-full px-7 py-3 text-sm shadow-[0_4px_15px_rgba(107,45,60,0.3)] hover:shadow-[0_8px_30px_rgba(107,45,60,0.5)] hover:scale-105 hover:-translate-y-1 hover:bg-[#8A3F52] transition-all duration-[600ms]"
          >
            Siguiente <ArrowRight size={16} />
          </motion.button>
        ) : (
          <span className="invisible" />
        )}
      </div>
    </div>
  );
}

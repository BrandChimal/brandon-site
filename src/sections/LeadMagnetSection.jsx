import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import Button from '../components/Button';

const LeadMagnetSection = () => {
  const [openQ, setOpenQ] = useState(null);

  const questions = [
    { id: 1, q: "¿A quién le habla tu marca?", desc: "Define el Buyer Persona." },
    { id: 2, q: "¿Qué piensa, siente y necesita esa persona?", desc: "Define el Empathy Map." },
    { id: 3, q: "¿Qué de lo que ofreces resuelve lo que necesita?", desc: "Define el Value Proposition Canvas." },
    { id: 4, q: "¿Por qué existe tu marca más allá de vender?", desc: "Define el Big Ideal." },
  ];

  return (
    <section id="pulso" className="py-20 md:py-32 bg-[#F5F1EB] relative z-20 shadow-[0_-20px_50px_rgba(0,0,0,0.15)] overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] md:w-[700px] h-[400px] md:h-[700px] bg-[#6B2D3C]/5 blur-[120px] pointer-events-none rounded-full" />

      <div className="max-w-3xl mx-auto px-6 relative z-10">
        <div className="text-center mb-12 md:mb-16">
          <span className="font-azeret text-[10px] md:text-[12px] uppercase text-[#6B2D3C] font-medium block mb-4 tracking-widest">Pulso de Identidad · Express</span>
          <h2 className="font-outfit text-3xl md:text-[44px] text-[#2D2926] mb-4 md:mb-6 leading-tight">
            Construye la base que hace posible cada momento.
          </h2>
          <p className="text-[15px] md:text-[16px] text-[#2D2926]/70">
            Este es el primer paso para que cada mensaje y cada canal tenga una dirección clara.
          </p>
        </div>

        <motion.div
          initial={{ opacity: 0.3, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.2 }}
          transition={{ duration: 0.6 }}
          className="bg-white border border-[#EBE6DE] rounded-[24px] p-5 sm:p-6 md:p-10 neumorphism-light"
        >
          <div className="space-y-2 mb-8 md:mb-10">
            {questions.map((item) => (
              <div key={item.id} className="border-b border-[#EBE6DE] last:border-0">
                <button
                  onClick={() => setOpenQ(openQ === item.id ? null : item.id)}
                  className="w-full text-left py-4 flex justify-between items-center text-[15px] md:text-[16px] text-[#2D2926] font-medium hover:text-[#6B2D3C] transition-all duration-[600ms]"
                >
                  <div className="flex flex-col pr-4">
                    <span>{item.q}</span>
                    <span className="font-azeret text-[9px] md:text-[10px] text-[#8C8378] font-normal mt-1">{item.desc}</span>
                  </div>
                  <ChevronDown className={`shrink-0 transform transition-transform duration-[600ms] text-[#8C8378] ${openQ === item.id ? 'rotate-180' : ''}`} size={18} />
                </button>
                <AnimatePresence>
                  {openQ === item.id && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="overflow-hidden"
                    >
                      <textarea
                        className="w-full bg-[#F5F1EB] border border-[#EBE6DE] rounded-xl p-4 text-[#2D2926] text-[14px] focus:outline-none focus:border-[#6B2D3C]/30 focus:ring-1 focus:ring-[#6B2D3C]/30 mb-4 transition-all duration-[600ms] input-neumorphism"
                        rows="3"
                        placeholder="Escribe tu respuesta aquí..."
                      ></textarea>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>

          <div className="flex flex-col sm:flex-row gap-4 items-center w-full">
            <input
              type="email"
              placeholder="¿Dónde te enviamos tu Pulso Express?"
              className="flex-1 w-full bg-white border border-[#EBE6DE] rounded-full px-5 md:px-6 py-4 text-[#2D2926] text-sm focus:outline-none focus:border-[#6B2D3C]/50 focus:ring-1 focus:ring-[#6B2D3C]/50 transition-all duration-[600ms] placeholder-[#8C8378] input-neumorphism"
            />
            <Button className="w-full sm:w-auto !px-8 shadow-none text-sm md:text-base">Hacer mi Pulso Express</Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default LeadMagnetSection;

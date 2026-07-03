import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { User, Mail, Phone, MessageSquare } from 'lucide-react';
import Button from '../components/Button';

const FAQContactoSection = () => {
  const [openFaq, setOpenFaq] = useState(0);

  const faqs = [
    { q: "¿Por qué un enfoque integrado en vez de especialistas separados?", a: "El problema más frecuente no es la falta de talento, es la desconexión. Cuando estrategia, diseño y tecnología se piensan juntos, nada se pierde en la traducción." },
    { q: "¿Cuánto dura un proyecto típico?", a: "Un Pulso de Identidad toma 2-3 semanas. Una Radiografía Digital 4-6 semanas. Un Mapa de Conexión completo 3-5 meses." },
    { q: "¿Qué pasa si ya tengo herramientas configuradas?", a: "No se trata de cambiar herramientas. Se trata de que las que ya tienes estén configuradas pensando en tu usuario, no en los defaults de fábrica." },
    { q: "¿Puedo contratar solo el diagnóstico?", a: "Sí. La Radiografía Digital es un servicio independiente. Incluye diagnóstico + roadmap." }
  ];

  return (
    <section id="contacto" className="py-20 md:py-32 bg-[#2D2926]">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-16">

        {/* Columna Izquierda: FAQ + Canales */}
        <div className="lg:col-span-6">
          <div className="mb-12 md:mb-16">
            <span className="font-azeret text-[10px] md:text-[12px] uppercase text-[#E8DDB0] block mb-4 tracking-widest">Ese Momento</span>
            <h2 className="font-outfit text-3xl md:text-[44px] text-[#FFF3C2] mb-4 leading-tight">
              Preguntas frecuentes
            </h2>
            <p className="text-[15px] md:text-[16px] text-[#B8AFA6] mb-8">Lo que necesitas saber antes de dar el siguiente paso.</p>

            <div className="space-y-3 md:space-y-4">
              {faqs.map((faq, i) => (
                <div key={i} className="border-b border-[#B8AFA6]/10 pb-3 md:pb-4">
                  <button
                    onClick={() => setOpenFaq(openFaq === i ? null : i)}
                    className="w-full text-left py-2 flex justify-between items-center text-[15px] md:text-[16px] font-medium text-[#F5F1EB] hover:text-[#FFF3C2] transition-colors duration-[600ms] group"
                  >
                    <span className="pr-6 md:pr-8">{faq.q}</span>
                    <span className={`font-azeret text-[#E8DDB0] shrink-0 transform transition-transform duration-[600ms] ${openFaq === i ? 'rotate-45' : ''}`}>+</span>
                  </button>
                  <AnimatePresence>
                    {openFaq === i && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="overflow-hidden"
                      >
                        <p className="text-[14px] md:text-[15px] text-[#B8AFA6] pt-2 pb-4 pl-4 border-l border-[#FFF3C2]/10 mt-2 leading-relaxed">
                          {faq.a}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h3 className="font-outfit text-[18px] md:text-[20px] text-[#FFF3C2] mb-4 md:mb-6">Otras formas de conectar</h3>
            <div className="flex flex-col gap-3 md:gap-4">
              {[
                { icon: "https://i.ibb.co/83Z4gL7/icon-calendly.jpg", text: "Calendly (sesión de 20 min)", tag: "CALENDLY" },
                { icon: "https://i.ibb.co/rfzxGSTm/icon-whatsapp.jpg", text: "WhatsApp (mensaje directo)", tag: "WHATSAPP" },
                { icon: "https://i.ibb.co/mVX2dcv3/icon-email.jpg", text: "Email (directo)", tag: "EMAIL" }
              ].map((link, i) => (
                <a key={i} href="#" className="flex items-center gap-4 group p-2 hover:bg-[#1A1714]/40 rounded-xl transition-all duration-[600ms] border border-transparent hover:border-[#FFF3C2]/5 w-fit">
                  <img src={link.icon} alt={link.tag} className="w-8 h-8 rounded-[8px] border border-[#FFF3C2]/10 group-hover:border-[#FFF3C2]/30 transition-colors duration-[600ms]" />
                  <span className="text-[13px] md:text-[14px] text-[#F5F1EB] group-hover:text-[#FFF3C2] transition-colors duration-[600ms]">{link.text}</span>
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Columna Derecha: Formulario */}
        <div className="lg:col-span-6 relative mt-12 lg:mt-0">
          <div className="lg:sticky lg:top-32">

            <div className="mb-8 md:mb-12 border-l-[3px] md:border-l-[4px] border-[#6B2D3C] pl-5 md:pl-6">
              <h3 className="font-outfit text-3xl sm:text-[40px] md:text-[56px] font-medium text-[#F5F1EB] leading-[1.05] tracking-tight">
                El siguiente paso es simple:<br/>
                <span className="text-[#FFF3C2]">cuéntame qué necesitas.</span>
              </h3>
            </div>

            <form className="space-y-4 md:space-y-5 w-full" onSubmit={(e) => e.preventDefault()}>
              <div className="relative group w-full">
                <label className="absolute -top-2 left-4 bg-[#2D2926] px-1 text-[9px] md:text-[10px] text-[#B8AFA6] z-10 font-azeret uppercase">Nombre Completo</label>
                <input
                  type="text"
                  placeholder="Tu nombre completo"
                  className="w-full bg-[#1A1714]/40 border border-[#B8AFA6]/20 rounded-xl px-5 py-4 text-[#F5F1EB] text-[14px] focus:outline-none focus:border-[#FFF3C2]/50 placeholder-[#8C8378] input-neumorphism"
                />
                <User size={18} className="absolute right-4 top-1/2 -translate-y-1/2 text-[#8C8378] group-focus-within:text-[#FFF3C2] transition-colors duration-[600ms]" />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-5 w-full">
                <div className="relative group w-full">
                  <label className="absolute -top-2 left-4 bg-[#2D2926] px-1 text-[9px] md:text-[10px] text-[#B8AFA6] z-10 font-azeret uppercase">Email</label>
                  <input
                    type="email"
                    placeholder="tucorreo@empresa.com"
                    className="w-full bg-[#1A1714]/40 border border-[#B8AFA6]/20 rounded-xl px-5 py-4 text-[#F5F1EB] text-[14px] focus:outline-none focus:border-[#FFF3C2]/50 placeholder-[#8C8378] input-neumorphism"
                  />
                  <Mail size={18} className="absolute right-4 top-1/2 -translate-y-1/2 text-[#8C8378] group-focus-within:text-[#FFF3C2] transition-colors duration-[600ms]" />
                </div>
                <div className="relative group w-full">
                  <label className="absolute -top-2 left-4 bg-[#2D2926] px-1 text-[9px] md:text-[10px] text-[#B8AFA6] z-10 font-azeret uppercase">Teléfono</label>
                  <input
                    type="tel"
                    placeholder="Tu teléfono (opcional)"
                    className="w-full bg-[#1A1714]/40 border border-[#B8AFA6]/20 rounded-xl px-5 py-4 text-[#F5F1EB] text-[14px] focus:outline-none focus:border-[#FFF3C2]/50 placeholder-[#8C8378] input-neumorphism"
                  />
                  <Phone size={18} className="absolute right-4 top-1/2 -translate-y-1/2 text-[#8C8378] group-focus-within:text-[#FFF3C2] transition-colors duration-[600ms]" />
                </div>
              </div>

              <div className="relative group w-full">
                <label className="absolute -top-2 left-4 bg-[#2D2926] px-1 text-[9px] md:text-[10px] text-[#B8AFA6] z-10 font-azeret uppercase">¿Qué necesitas?</label>
                <textarea
                  placeholder="Cuéntame sobre tu proyecto..."
                  rows="4"
                  className="w-full bg-[#1A1714]/40 border border-[#B8AFA6]/20 rounded-xl px-5 py-4 text-[#F5F1EB] text-[14px] focus:outline-none focus:border-[#FFF3C2]/50 placeholder-[#8C8378] resize-none input-neumorphism"
                ></textarea>
                <MessageSquare size={18} className="absolute right-4 top-5 text-[#8C8378] group-focus-within:text-[#FFF3C2] transition-colors duration-[600ms]" />
              </div>

              <div className="pt-4 md:pt-6 flex flex-col items-center gap-4 w-full">
                <Button className="w-full rounded-xl !py-4 font-medium text-[16px] tracking-wide" variant="primary">
                  Conversemos
                </Button>
              </div>
            </form>
          </div>
        </div>

      </div>
    </section>
  );
};

export default FAQContactoSection;

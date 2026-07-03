import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

const ServiciosSection = () => {
  const targetRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: targetRef });
  const x = useTransform(scrollYProgress, [0, 1], ["0%", "-65%"]);

  const services = [
    { id: "01", title: "Pulso de Identidad", desc: "Define quién es tu marca, a quién le habla y por qué importa. Sin esta base, nada de lo demás tiene punto de referencia." },
    { id: "02", title: "Radiografía Digital", desc: "Muestra exactamente dónde se rompe la conexión con tu audiencia — y qué te está costando." },
    { id: "03", title: "Vínculo Estratégico", desc: "Una campaña con objetivo claro, diseñada y ejecutada de punta a punta en los canales que apliquen." },
    { id: "04", title: "Mapa de Conexión", desc: "Toda tu comunicación alineada. Todos tus canales hablando el mismo idioma. Toda la tecnología funcionando como una." },
    { id: "05", title: "Acompañamiento", desc: "Lo que funciona se escala. Lo que no, se ajusta. Mes a mes, con contexto completo." },
  ];

  return (
    <section id="servicios" className="relative z-10 bg-[#2D2926]">
      {/* DESKTOP VIEW */}
      <div ref={targetRef} className="hidden md:block h-[300vh]">
        <div className="sticky top-0 h-screen flex flex-col justify-center overflow-hidden">
          <div className="absolute inset-0 bg-[url('https://i.ibb.co/Hf0scrwM/og-image.webp')] bg-fixed bg-cover bg-center pointer-events-none" />
          <div className="absolute inset-0 bg-[#2D2926] opacity-[0.69] z-0 pointer-events-none" />

          <div className="max-w-7xl mx-auto px-6 w-full mb-16 relative z-10">
            <span className="font-azeret text-[12px] uppercase text-[#E8DDB0] block mb-4 tracking-widest">Servicios</span>
            <h2 className="font-outfit text-[44px] text-[#FFF3C2] max-w-2xl leading-[1.1] mb-6">
              Lo que se construye en cada etapa depende de lo que tu marca necesita.
            </h2>
          </div>

          <div className="pl-[max(1.5rem,calc((100vw-80rem)/2))] relative z-10">
            <motion.div style={{ x }} className="flex gap-6 w-max">
              {services.map((svc) => (
                <motion.div
                  key={svc.id}
                  initial={{ opacity: 0.3 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: false, amount: 0.2 }}
                  transition={{ duration: 0.6 }}
                  className="w-[420px] h-[380px] glass-panel neumorphism-dark rounded-[24px] p-10 flex flex-col group"
                >
                  <span className="font-azeret text-[40px] text-[#FFF3C2]/10 mb-auto block group-hover:text-[#FFF3C2]/30 transition-all duration-[600ms]">{svc.id}</span>
                  <h3 className="font-outfit text-[24px] font-medium text-[#F5F1EB] mb-4">{svc.title}</h3>
                  <p className="text-[15px] text-[#B8AFA6] leading-relaxed mb-8">{svc.desc}</p>
                  <a href="#contacto" className="mt-auto font-dm text-[14px] text-[#FFF3C2] flex items-center gap-2 group/link w-fit transition-all duration-[600ms]">
                    Preguntar por este servicio <ArrowRight size={14} className="group-hover/link:translate-x-1 transition-transform duration-[600ms]" />
                  </a>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </div>

      {/* MOBILE VIEW */}
      <div className="md:hidden py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://i.ibb.co/Hf0scrwM/og-image.webp')] bg-cover bg-center pointer-events-none" />
        <div className="absolute inset-0 bg-[#2D2926] opacity-[0.69] z-0 pointer-events-none" />

        <div className="px-6 relative z-10 mb-8">
          <span className="font-azeret text-[10px] uppercase text-[#E8DDB0] block mb-3 tracking-widest">Servicios</span>
          <h2 className="font-outfit text-3xl font-medium text-[#FFF3C2] leading-[1.1]">
            Lo que se construye depende de lo que tu marca necesita.
          </h2>
        </div>

        <div className="flex overflow-x-auto snap-x snap-mandatory gap-4 px-6 pb-12 pt-4 hide-scrollbar relative z-10">
          {services.map((svc) => (
            <div
              key={svc.id}
              className="snap-center shrink-0 w-[85vw] min-h-[340px] glass-panel neumorphism-dark rounded-[20px] p-6 sm:p-8 flex flex-col group"
            >
              <span className="font-azeret text-[32px] text-[#FFF3C2]/10 mb-auto block">{svc.id}</span>
              <h3 className="font-outfit text-xl font-medium text-[#F5F1EB] mb-3">{svc.title}</h3>
              <p className="text-[14px] text-[#B8AFA6] leading-relaxed mb-6">{svc.desc}</p>
              <a href="#contacto" className="mt-auto font-dm text-[13px] text-[#FFF3C2] flex items-center gap-2 group/link w-fit">
                Preguntar por este servicio <ArrowRight size={14} className="group-hover/link:translate-x-1 transition-transform" />
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServiciosSection;

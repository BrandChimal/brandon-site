import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import useWindowSize from '../hooks/useWindowSize';

const CostoSection = () => {
  const cards = [
    {
      title: "Leads que no maduran",
      desc: "Llegan por ads o contenido. Pero tu seguimiento no los conoce. Reciben correos genéricos. Se van.",
      stat: "El 35% de las solicitudes de demo en B2B no reciben respuesta. Se pierden antes de la primera conversación.",
      source: "Fuente: Chili Piper, B2B Buyer Best Practices Report, 2023",
      icon: "https://i.ibb.co/C3STcS1Q/icon-leads.jpg"
    },
    {
      title: "Canales que no se parecen",
      desc: "Tu web dice una cosa. Tus redes otra. Tu email suena a otro negocio. El cliente no sabe con quién está hablando.",
      stat: "Las empresas que personalizan su comunicación generan entre 10% y 15% más de ingresos.",
      source: "Fuente: McKinsey, Next in Personalization, 2021",
      icon: "https://i.ibb.co/b51DTntH/icon-channels.jpg"
    },
    {
      title: "Herramientas sin estrategia",
      desc: "Tienes CRM, email marketing, analytics. Pero nadie las configuró pensando en tu usuario. Son infraestructura vacía.",
      stat: "Las empresas utilizan solo el 33% de las capacidades de su stack de marketing.",
      source: "Fuente: Gartner Marketing Technology Survey, 2023",
      icon: "https://i.ibb.co/7t14jfX7/icon-tools.jpg"
    },
    {
      title: "Proveedores que no se coordinan",
      desc: "Agencia de branding. Freelancer de web. Otro de automatización. Cada uno trabaja con su propio brief.",
      stat: "El 67.9% del tiempo de liderazgo de marketing se consume gestionando el presente, no construyendo.",
      source: "Fuentes: CMO Survey, Duke/Deloitte, Fall 2024",
      icon: "https://i.ibb.co/CKggddKr/icon-providers.jpg"
    }
  ];

  const sectionRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start end", "end start"] });
  const yParallax = useTransform(scrollYProgress, [0, 1], [50, -50]);
  const { width } = useWindowSize();
  const isDesktop = width >= 1024;

  return (
    <section id="costo" ref={sectionRef} className="py-20 md:py-32 bg-[#1A1714] relative">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-10 md:gap-16">

        <div className="lg:col-span-5 relative">
          <motion.div style={{ y: isDesktop ? yParallax : 0 }} className="relative lg:sticky lg:top-32">
            <span className="font-azeret text-[10px] md:text-[12px] uppercase text-[#E8DDB0] block mb-4 tracking-widest">El costo</span>
            <h2 className="font-outfit text-[32px] md:text-[44px] font-medium leading-[1.1] text-[#FFF3C2] mb-6 md:mb-8">
              Lo que una comunicación desconectada le está costando a tu marca.
            </h2>
            <p className="text-[15px] md:text-[16px] text-[#B8AFA6] leading-relaxed max-w-sm">
              Estos problemas no se resuelven contratando otra herramienta. Se resuelven con una sola visión que los conecte.
            </p>
          </motion.div>
        </div>

        <div className="lg:col-span-7 flex flex-col gap-6">
          {cards.map((card, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0.3, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, amount: 0.2 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="glass-panel neumorphism-dark rounded-2xl p-6 md:p-8"
            >
              <div className="flex flex-col sm:flex-row items-start gap-4 md:gap-6">
                <img src={card.icon} alt={card.title} className="w-12 h-12 rounded-xl object-cover border border-[#FFF3C2]/10 shrink-0" />
                <div>
                  <h3 className="font-outfit text-lg md:text-xl font-medium text-[#F5F1EB] mb-2 md:mb-3">{card.title}</h3>
                  <p className="text-[14px] md:text-[15px] text-[#B8AFA6] leading-relaxed mb-4 md:mb-6">{card.desc}</p>
                  <div className="bg-[#1A1714]/40 rounded-lg p-4 border border-[#FFF3C2]/5 transition-colors duration-[600ms] hover:border-[#FFF3C2]/30">
                    <p className="font-azeret text-[12px] md:text-[13px] text-[#FFF3C2] mb-2 leading-relaxed font-medium">→ {card.stat}</p>
                    <p className="font-azeret text-[10px] md:text-[11px] text-[#8C8378]">{card.source}</p>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default CostoSection;

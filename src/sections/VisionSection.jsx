import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import useWindowSize from '../hooks/useWindowSize';

const VisionSection = () => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const subSectionY = useTransform(scrollYProgress, [0, 1], [60, -60]); // Reducido para evitar gaps enormes
  const subSectionOpacity = useTransform(scrollYProgress, [0.3, 0.6, 0.9], [0, 1, 0.5]);
  const subSectionScale = useTransform(scrollYProgress, [0.4, 0.6], [0.95, 1]);
  const { width } = useWindowSize();
  const isTablet = width >= 768;

  return (
    <section ref={ref} className="relative py-20 md:py-32 bg-[#F5F1EB] overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-10 md:gap-20 relative">

        {/* Left Column */}
        <div className="lg:col-span-6 flex flex-col justify-between">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mb-10 md:mb-16"
          >
            <div className="inline-flex items-center gap-2 border border-[#6B2D3C]/20 rounded-full px-4 py-1.5 mb-6 md:mb-8">
              <span className="font-azeret text-[9px] md:text-[10px] uppercase tracking-[2px] text-[#6B2D3C] font-medium">&gt; NUESTRA_VISIÓN</span>
            </div>

            <h2 className="font-outfit text-3xl md:text-[56px] font-medium text-[#2D2926] leading-[1.1] mb-6 md:mb-8 max-w-lg">
              Una sola visión que<br/>
              <span className="text-[#6B2D3C]">conecta lo que otros</span><br/>
              mantienen separado.
            </h2>

            {/* Mobile Image */}
            <div className="lg:hidden w-full h-[300px] sm:h-[400px] rounded-[24px] overflow-hidden shadow-lg mb-8 relative">
               <img src="https://i.ibb.co/fYBFmtK4/vision-portrait.webp" alt="Visión Estratégica" className="w-full h-full object-cover" />
               <div className="absolute bottom-0 w-full p-6 bg-gradient-to-t from-black/60 to-transparent">
                  <p className="font-azeret text-[9px] text-[#FFF3C2] uppercase tracking-widest mb-1">CONEXIÓN GENUINA</p>
                  <p className="font-outfit text-white text-base">Ver todo con la misma intención.</p>
               </div>
            </div>

            <p className="text-[15px] md:text-[16px] text-[#2D2926]/70 mb-6 md:mb-8 leading-relaxed max-w-lg">
              Cuando la estrategia, el diseño y la tecnología se trabajan por separado, el contexto se pierde. Nadie ve el panorama completo.
            </p>

            <div className="border-l-[3px] border-[#6B2D3C] pl-5 md:pl-6 py-1 mb-6 md:mb-8 max-w-lg">
              <p className="text-[15px] md:text-[16px] text-[#2D2926] leading-relaxed font-medium">
                El enfoque es distinto: entender primero a quién le habla la marca, poner a su usuario en el centro, y desde ahí decidir qué se construye.
              </p>
            </div>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-auto">
            <motion.div
              initial={{ opacity: 0.3, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: false, amount: 0.2 }} transition={{ duration: 0.6 }}
              className="bg-[#EBE6DE]/80 p-5 md:p-6 rounded-[16px] border border-[#EBE6DE] neumorphism-light"
            >
              <p className="text-[12px] md:text-[13px] italic text-[#2D2926]/80 mb-4 md:mb-6 leading-relaxed">"Si algo podemos destacar de él, es su empatía, su disponibilidad y su lealtad."</p>
              <p className="font-outfit text-[12px] md:text-[13px] font-bold text-[#2D2926]">Rafael Gómez Albarrán</p>
              <p className="font-azeret text-[9px] md:text-[10px] uppercase text-[#6B2D3C] mt-1">CMCO</p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0.3, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: false, amount: 0.2 }} transition={{ duration: 0.6, delay: 0.1 }}
              className="bg-[#EBE6DE]/80 p-5 md:p-6 rounded-[16px] border border-[#EBE6DE] neumorphism-light"
            >
              <p className="text-[12px] md:text-[13px] italic text-[#2D2926]/80 mb-4 md:mb-6 leading-relaxed">"Su trabajo va más allá de crear una página web, sino de grandes ideas y estrategias."</p>
              <p className="font-outfit text-[12px] md:text-[13px] font-bold text-[#2D2926]">Erick Toledo</p>
              <p className="font-azeret text-[9px] md:text-[10px] uppercase text-[#6B2D3C] mt-1">Community Manager</p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0.3, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: false, amount: 0.2 }} transition={{ duration: 0.6, delay: 0.2 }}
              className="bg-[#EBE6DE]/80 p-5 md:p-6 rounded-[16px] border border-[#EBE6DE] sm:col-span-2 neumorphism-light"
            >
              <p className="text-[12px] md:text-[13px] italic text-[#2D2926]/80 mb-4 md:mb-6 leading-relaxed">"Una persona con un aprendizaje continuo, propositivo, muy inteligente, siempre emprendiendo nuevas ideas."</p>
              <p className="font-outfit text-[12px] md:text-[13px] font-bold text-[#2D2926]">Carlos Castro Paniagua</p>
              <p className="font-azeret text-[9px] md:text-[10px] uppercase text-[#6B2D3C] mt-1">Desarrollo de líderes y equipos</p>
            </motion.div>
          </div>
        </div>

        {/* Right Column: Desktop Giant Image */}
        <div className="lg:col-span-6 relative hidden lg:block h-full">
           <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="sticky top-32 h-[80vh] w-full rounded-[32px] overflow-hidden shadow-[0_24px_64px_rgba(45,41,38,0.15)] relative"
          >
            <img src="https://i.ibb.co/fYBFmtK4/vision-portrait.webp" alt="Visión Estratégica" className="w-full h-full object-cover" />
            <div className="absolute bottom-0 w-full p-8 bg-gradient-to-t from-black/60 to-transparent">
              <p className="font-azeret text-[10px] text-[#FFF3C2] uppercase tracking-widest mb-1">CONEXIÓN GENUINA</p>
              <p className="font-outfit text-white text-lg">Ver todo con la misma intención.</p>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Parallax Sub-section (Ajustado márgenes para evitar huecos enormes) */}
      <motion.div
        style={{ y: isTablet ? subSectionY : 0, opacity: subSectionOpacity, scale: subSectionScale }}
        className="mt-16 md:mt-24 mb-10 text-center max-w-5xl mx-auto px-6 relative z-20 py-8 md:py-16"
      >
        <h3 className="font-outfit text-3xl md:text-[40px] lg:text-[56px] font-medium text-[#2D2926] mb-6 md:mb-8 leading-[1.1] tracking-tight">
          No se trata de hacerlo todo.<br className="hidden md:block"/>
          <span className="text-[#6B2D3C]">Se trata de verlo todo con la misma intención.</span>
        </h3>
        <p className="text-[16px] md:text-[24px] text-[#2D2926]/70 leading-relaxed font-medium max-w-3xl mx-auto">
          Empatía con el usuario final. Estrategia que parte de lo que él necesita. Tecnología que se adapta al plan, no al revés.
        </p>
      </motion.div>
    </section>
  );
};

export default VisionSection;

import { motion, useScroll, useTransform } from 'framer-motion';
import Button from '../components/Button';

const Hero = () => {
  const { scrollY } = useScroll();
  const yParallax = useTransform(scrollY, [0, 1000], [0, -150]);
  const opacityFade = useTransform(scrollY, [0, 400], [1, 0]);

  return (
    <section className="relative min-h-[100svh] flex items-center justify-center overflow-hidden bg-[#1A1714]">
      <motion.div
        style={{ y: yParallax }}
        initial={{ scale: 1.15, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 2, ease: "easeOut" }}
        className="absolute inset-0 z-0"
      >
        <img src="https://i.ibb.co/bgT2Yz1Q/evidence-metrics.webp" alt="Cinematic background" className="w-full h-full object-cover object-top opacity-40 md:opacity-50 grayscale-[30%]" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#1A1714] via-[#1A1714]/80 to-transparent" />
      </motion.div>

      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 pt-24 md:pt-32">
        <motion.div
          initial={{ opacity: 0, y: 60, scale: 0.9, filter: 'blur(10px)' }}
          animate={{ opacity: 1, y: 0, scale: 1, filter: 'blur(0px)' }}
          transition={{ duration: 1.2, delay: 0.2, type: "spring", bounce: 0.3 }}
          className="glass-panel neumorphism-dark rounded-3xl p-6 md:p-12 max-w-2xl w-full"
        >
          <motion.span
            initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8, delay: 0.6 }}
            className="font-azeret text-[10px] md:text-[11px] uppercase tracking-[4px] md:tracking-[5px] text-[#E8DDB0] block mb-4 md:mb-6"
          >
            Ese Momento
          </motion.span>
          <motion.h1
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.7 }}
            className="font-outfit text-[32px] sm:text-4xl md:text-5xl lg:text-[48px] font-normal leading-[1.1] text-[#F5F1EB] mb-4 md:mb-6"
          >
            Que cada momento<br/>
            se sienta especialmente diseñado<br/>
            para cada lead, cada cliente<br/>
            y cada usuario.
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.8, delay: 0.9 }}
            className="text-[14px] md:text-[15px] text-[#B8AFA6] max-w-[420px] mb-8 leading-relaxed"
          >
            El post que ve en redes, la página donde se registra, el mail que lo acompaña y la experiencia que lo hace volver.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 1 }}
            className="flex flex-col sm:flex-row items-center gap-3 md:gap-4 w-full"
          >
            <Button href="#costo" className="w-full sm:w-auto !px-6 !py-3 text-[13px] md:text-sm">Ese momento empieza aquí ↓</Button>
            <Button variant="secondary" href="#contacto" className="w-full sm:w-auto !text-[12px]">Hablar directo →</Button>
          </motion.div>
        </motion.div>
      </div>

      <motion.div style={{ opacity: opacityFade }} className="absolute bottom-0 w-full bg-[#1A1714]/95 border-t border-[#FFF3C2]/10 backdrop-blur-md py-4 z-20 hidden md:block">
        <div className="max-w-7xl mx-auto px-6 flex justify-between items-center font-azeret text-[11px] uppercase tracking-[2px]">
          <span className="text-[#E8DDB0]">+30% CONVERSIÓN</span>
          <span className="text-[#8C8378]">|</span>
          <span className="text-[#B8AFA6]">LATAM · EUROPA</span>
          <span className="text-[#8C8378]">|</span>
          <span className="text-[#E8DDB0]">+25% REGIONAL</span>
          <span className="text-[#8C8378]">|</span>
          <span className="text-[#B8AFA6]">B2B · FINTECH · ECOMM</span>
        </div>
      </motion.div>
    </section>
  );
};

export default Hero;

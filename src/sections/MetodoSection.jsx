import { motion } from 'framer-motion';
import Button from '../components/Button';

const MetodoSection = () => {
  const steps = [
    { num: "01", title: "ENTENDER ANTES DE TOCAR", desc: "Antes de cambiar una sola pieza, se mapea cómo llega tu usuario, qué recibe en cada canal, dónde deja de avanzar y por qué.", tools: "Herramientas: auditoría de touchpoints, mapas de calor, flujos actuales." },
    { num: "02", title: "RECONSTRUIR CON DIRECCIÓN", desc: "Lo que está roto se rediseña. Lo que falta se construye. Estrategia, diseño, automatización y tecnología — integrados.", tools: "Entregables: journey rediseñado, flujos automatizados." },
    { num: "03", title: "MEDIR Y AJUSTAR", desc: "Todo lo implementado se mide. Lo que funciona se escala. Lo que no, se ajusta. No hay entrega sin seguimiento.", tools: "Indicadores: conversión, engagement, retención." }
  ];

  return (
    <section id="metodo" className="bg-[#1A1714] relative">
      <div className="flex flex-col md:flex-row">

        <div className="w-full md:w-1/2 relative overflow-hidden py-20 md:py-32 px-6 md:px-12 lg:px-24">
          <div className="absolute inset-0 opacity-[0.15] bg-[url('https://i.ibb.co/pv9dQ2dV/method-system.webp')] bg-cover bg-center blur-xl" style={{ backgroundAttachment: 'fixed' }} />
          <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-[#1A1714] to-transparent z-10 hidden md:block" />

          <div className="absolute top-20 md:top-1/4 -left-4 text-[25vw] md:text-[12vw] font-outfit font-bold text-[#FFF3C2] opacity-[0.03] pointer-events-none select-none tracking-tight leading-none z-0">
            MÉTODO
          </div>

          <div className="relative z-20">
            <h2 className="font-outfit text-3xl md:text-[44px] font-medium text-[#FFF3C2] mb-4">
              Esto no es casualidad. Es la Anatomía del Momento.
            </h2>
            <p className="text-[16px] md:text-[18px] text-[#E8DDB0] mb-6 md:mb-8">Diagnosticar, reconstruir, medir. Así funciona.</p>
            <p className="text-[15px] md:text-[16px] text-[#B8AFA6] leading-relaxed mb-12 md:mb-20 max-w-md">
              Detrás de cada interacción que se siente natural, hay una visión integral que interconecta estrategia, tecnología, automatización y diseño de experiencia.
            </p>

            <div className="space-y-12 md:space-y-16">
              {steps.map((step, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0.2, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: false, amount: 0.4 }}
                  transition={{ duration: 0.6, ease: "easeOut" }}
                  className="flex flex-col justify-center neumorphism-dark p-6 rounded-2xl border border-transparent bg-[#1A1714]/40 md:bg-transparent"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 mb-4">
                    <span className="font-azeret text-[28px] md:text-[32px] text-[#FFF3C2]">{step.num}</span>
                    <h3 className="font-outfit text-lg md:text-2xl font-medium text-[#F5F1EB] tracking-wide">{step.title}</h3>
                  </div>
                  <p className="text-[14px] md:text-[16px] text-[#B8AFA6] leading-relaxed sm:ml-12 mb-4 max-w-md">
                    {step.desc}
                  </p>
                  <p className="font-azeret text-[10px] text-[#8C8378] sm:ml-12 max-w-sm uppercase leading-relaxed border-l border-[#6B2D3C] pl-4">
                    {step.tools}
                  </p>
                </motion.div>
              ))}
            </div>

            <div className="pt-16 md:pt-20 border-t border-[#FFF3C2]/10 mt-12 md:mt-16">
              <h3 className="font-outfit text-[20px] md:text-[22px] text-[#FFF3C2] mb-6">No es magia. Es un enfoque distinto.</h3>
              <Button href="#pulso" className="w-full sm:w-auto !px-6 !py-3 text-sm">Quiero un diagnóstico →</Button>
            </div>
          </div>
        </div>

        <div className="hidden md:block md:w-1/2 relative">
          <div className="sticky top-0 h-screen overflow-hidden">
            <img
              src="https://i.ibb.co/pv9dQ2dV/method-system.webp"
              alt="System Workflow"
              className="w-full h-full object-cover grayscale-[20%]"
            />
            <div className="absolute inset-0 bg-[#1A1714]/20" />
            <div className="absolute inset-0 bg-gradient-to-r from-[#1A1714] via-transparent to-transparent w-full" />
          </div>
        </div>

      </div>
    </section>
  );
};

export default MetodoSection;

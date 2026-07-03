import { motion } from 'framer-motion';
import TileScrollBackground from '../components/TileScrollBackground';

const EvidenciaSection = () => {
  return (
    <section id="resultados" className="relative py-20 md:py-32 bg-[#1A1714] overflow-hidden">
      <TileScrollBackground />
      <div className="relative z-10 max-w-[1100px] mx-auto px-6">
        <h2 className="font-outfit text-3xl md:text-[44px] font-medium text-[#FFF3C2] text-center mb-12 md:mb-16 drop-shadow-lg">
          Lo que pasa cuando la conexión funciona.
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-5 auto-rows-auto">

          <motion.div
            initial={{ opacity: 0.3, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.2 }}
            transition={{ duration: 0.6 }}
            className="glass-panel neumorphism-dark p-6 md:p-8 rounded-[20px] md:col-span-7 flex flex-col justify-between"
          >
            <div>
              <h3 className="font-azeret text-[48px] md:text-[72px] font-medium text-[#FFF3C2] mb-2 leading-none">+30%</h3>
              <p className="font-azeret text-[10px] md:text-[11px] uppercase tracking-[2px] md:tracking-[3px] text-[#8C8378] mb-4">CONVERSIÓN LEAD → CLIENTE</p>
              <p className="text-[14px] md:text-[15px] text-[#B8AFA6] leading-relaxed max-w-md">Flujos automatizados en la industria de reclutamiento y desarrollo organizacional. Leads que llegaban fríos empezaron a llegar listos.</p>
            </div>
            <div className="mt-8 pt-6 border-t border-[#FFF3C2]/10">
              <p className="text-[13px] md:text-[14px] italic text-[#E8DDB0] mb-4">"Enfocado en resultados y en mejorar la experiencia de los usuarios y clientes... impactando de manera positiva cada punto en el journey."</p>
              <p className="font-outfit text-[12px] md:text-[13px] font-medium text-[#F5F1EB]">Cecilia Caballero</p>
              <p className="font-azeret text-[9px] md:text-[10px] text-[#8C8378] mt-1 uppercase">Comunicación Corporativa B2B</p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0.3, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.2 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="glass-panel neumorphism-dark p-6 md:p-8 rounded-[20px] md:col-span-5 flex flex-col justify-between"
          >
            <div>
              <h3 className="font-azeret text-[48px] md:text-[72px] font-medium text-[#FFF3C2] mb-2 leading-none">+25%</h3>
              <p className="font-azeret text-[10px] md:text-[11px] uppercase tracking-[2px] md:tracking-[3px] text-[#8C8378] mb-4">CONVERSIONES REGIONALES</p>
              <p className="text-[14px] md:text-[15px] text-[#B8AFA6] leading-relaxed">Estrategia inbound para LATAM y Europa. Comunicación adaptada a cada mercado — no traducida, reescrita.</p>
            </div>
            <div className="mt-8 pt-6 border-t border-[#FFF3C2]/10">
              <p className="text-[13px] md:text-[14px] italic text-[#E8DDB0] mb-4">"Se percibió perfectamente el dominio de las herramientas más importantes para CRM y un vasto conocimiento de estrategias."</p>
              <p className="font-outfit text-[12px] md:text-[13px] font-medium text-[#F5F1EB]">Heidy Esquinca</p>
              <p className="font-azeret text-[9px] md:text-[10px] text-[#8C8378] mt-1 uppercase">Head of Ecommerce</p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0.3, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.2 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="md:col-span-7 h-56 md:h-full md:min-h-[300px] rounded-[20px] overflow-hidden relative group neumorphism-dark border border-transparent"
          >
            <img src="https://i.ibb.co/bgT2Yz1Q/evidence-metrics.webp" alt="Metrics Data" className="absolute inset-0 w-full h-full object-cover transition-transform duration-[600ms] group-hover:scale-[1.05]" />
            <div className="absolute inset-0 border border-[#FFF3C2]/10 rounded-[20px] pointer-events-none" />
          </motion.div>

          <motion.div
            initial={{ opacity: 0.3, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.2 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="glass-panel neumorphism-dark p-6 md:p-8 rounded-[20px] md:col-span-5 flex flex-col justify-between"
          >
            <div>
              <h3 className="font-azeret text-[48px] md:text-[72px] font-medium text-[#FFF3C2] mb-2 leading-none">+20%</h3>
              <p className="font-azeret text-[10px] md:text-[11px] uppercase tracking-[2px] md:tracking-[3px] text-[#8C8378] mb-4">COMPRA Y RECOMPRA</p>
              <p className="text-[14px] md:text-[15px] text-[#B8AFA6] leading-relaxed">Optimización UX basada en comportamiento. Cross-selling y upselling integrados en el journey como parte natural.</p>
            </div>
            <div className="mt-8 pt-6 border-t border-[#FFF3C2]/10">
              <p className="text-[13px] md:text-[14px] italic text-[#E8DDB0] mb-4">"Su destreza en la resolución de problemas y análisis de situaciones se destacaron como sus principales fortalezas."</p>
              <p className="font-outfit text-[12px] md:text-[13px] font-medium text-[#F5F1EB]">Ximena Leyva</p>
              <p className="font-azeret text-[9px] md:text-[10px] text-[#8C8378] mt-1 uppercase">Sr. Content Specialist</p>
            </div>
          </motion.div>

          {/* Testimoniales Extra */}
          <motion.div
            initial={{ opacity: 0.3, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: false }} transition={{ duration: 0.6 }}
            className="glass-panel neumorphism-dark p-6 rounded-[16px] md:col-span-4 border-[#FFF3C2]/5"
          >
            <p className="text-[12px] md:text-[13px] italic text-[#E8DDB0] mb-4 leading-relaxed">"Brandon es un sólido profesional con alto sentido de compromiso; siempre plantea soluciones con visión estratégica."</p>
            <p className="font-outfit text-[11px] md:text-[12px] font-medium text-[#F5F1EB]">Karla Azucena</p>
            <p className="font-azeret text-[8px] md:text-[9px] text-[#8C8378] mt-1 uppercase">Diseñadora Digital</p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0.3, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: false }} transition={{ duration: 0.6, delay: 0.1 }}
            className="glass-panel neumorphism-dark p-6 rounded-[16px] md:col-span-4 border-[#FFF3C2]/5"
          >
            <p className="text-[12px] md:text-[13px] italic text-[#E8DDB0] mb-4 leading-relaxed">"Profesional altamente capacitado en marketing cloud, experto en automatizaciones. Es un gusto trabajar día a día con él."</p>
            <p className="font-outfit text-[11px] md:text-[12px] font-medium text-[#F5F1EB]">Estefanía Fajardo</p>
            <p className="font-azeret text-[8px] md:text-[9px] text-[#8C8378] mt-1 uppercase">Segment Marketing</p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0.3, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: false }} transition={{ duration: 0.6, delay: 0.2 }}
            className="glass-panel neumorphism-dark p-6 rounded-[16px] md:col-span-4 border-[#FFF3C2]/5"
          >
            <p className="text-[12px] md:text-[13px] italic text-[#E8DDB0] mb-4 leading-relaxed">"Excelente compañero y profesional con un alto compromiso hacia su trabajo, siempre con la mejor actitud para apoyar al equipo."</p>
            <p className="font-outfit text-[11px] md:text-[12px] font-medium text-[#F5F1EB]">Sergio Ángel</p>
            <p className="font-azeret text-[8px] md:text-[9px] text-[#8C8378] mt-1 uppercase">Comunicador Visual</p>
          </motion.div>

        </div>

        <p className="font-azeret text-[10px] md:text-[11px] text-[#8C8378] text-center mt-10 md:mt-12">
          Resultados en industrias de reclutamiento y desarrollo organizacional, fintech y e-commerce.
        </p>
      </div>
    </section>
  );
};

export default EvidenciaSection;

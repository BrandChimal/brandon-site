import { motion } from 'framer-motion';
import { fadeUp, staggerContainer } from './animations';

// --- ENTREGABLES CANÓNICOS ---
// Render visual de los 4 frameworks con la estructura de los documentos de la
// metodología: Buyer Persona (ficha), Empathy Map (cuadrantes), VPC (dos
// lados encajando), The Big Ideal (fórmula → statement). El lead debe sentir
// que recibe un documento real, no texto concatenado.

const Etiq = ({ children, tone = 'vino' }) => (
  <span className={`font-azeret text-[8px] uppercase tracking-widest block mb-1.5 ${tone === 'vino' ? 'text-[#6B2D3C]' : 'text-[#8C8378]'}`}>
    {children}
  </span>
);

const Vacio = () => <p className="text-[12px] text-[#8C8378]/70 italic">Quedó como pregunta abierta.</p>;

const Lista = ({ items }) =>
  items && items.length ? (
    <ul className="space-y-1">
      {items.map((it, i) => (
        <li key={i} className="text-[12.5px] text-[#2D2926]/85 leading-snug flex gap-1.5">
          <span className="text-[#6B2D3C] shrink-0">·</span>
          <span>{it}</span>
        </li>
      ))}
    </ul>
  ) : (
    <Vacio />
  );

const Texto = ({ children }) =>
  children ? <p className="text-[12.5px] text-[#2D2926]/85 leading-snug">{children}</p> : <Vacio />;

const CardShell = ({ layoutId, subtitle, title, children, className = '' }) => (
  <motion.div variants={fadeUp} layoutId={layoutId} className={`glass-warm rounded-[24px] p-6 neumorphism-light ${className}`}>
    <span className="font-azeret text-[9px] uppercase tracking-widest text-[#8C8378] block">{subtitle}</span>
    <h3 className="font-outfit text-lg mb-4 text-[#2D2926]">{title}</h3>
    {children}
  </motion.div>
);

// FICHA · Buyer Persona: perfil arriba, tres columnas de método debajo.
export const BuyerPersonaCard = ({ data }) => (
  <CardShell layoutId="canvas-persona" subtitle="A quién le hablas" title="Buyer Persona">
    <div className="bg-white/40 border border-white/50 rounded-xl px-4 py-3 mb-3">
      <Etiq>Perfil</Etiq>
      <Texto>{data.perfil}</Texto>
    </div>
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
      <div><Etiq>Jobs to be done</Etiq><Lista items={data.jobs} /></div>
      <div><Etiq>Barreras</Etiq><Lista items={data.barreras} /></div>
      <div><Etiq>Triggers</Etiq><Lista items={data.triggers} /></div>
    </div>
  </CardShell>
);

// CUADRANTES · Empathy Map: 4 cuadrantes + franja de pains/gains, como el documento.
export const EmpathyMapCard = ({ data }) => (
  <CardShell layoutId="canvas-empatia" subtitle="Qué siente" title="Empathy Map">
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-px bg-[#8C8378]/20 rounded-xl overflow-hidden mb-3">
      {[
        ['Piensa y siente', data.piensaSiente],
        ['Ve', data.ve],
        ['Oye', data.oye],
        ['Dice y hace', data.diceHace],
      ].map(([t, v]) => (
        <div key={t} className="bg-[#F5F1EB]/80 p-3.5">
          <Etiq>{t}</Etiq>
          <Texto>{v}</Texto>
        </div>
      ))}
    </div>
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
      <div className="bg-[#6B2D3C]/5 border border-[#6B2D3C]/15 rounded-xl p-3.5">
        <Etiq>Pains</Etiq><Lista items={data.pains} />
      </div>
      <div className="bg-white/40 border border-white/50 rounded-xl p-3.5">
        <Etiq>Gains</Etiq><Lista items={data.gains} />
      </div>
    </div>
  </CardShell>
);

// DOS LADOS · VPC: mapa de valor frente a perfil del cliente, con el encaje al centro.
export const VpcCard = ({ data }) => (
  <CardShell layoutId="canvas-valor" subtitle="Qué resuelves" title="Value Proposition Canvas" className="md:col-span-2">
    <div className="grid grid-cols-1 md:grid-cols-[1fr_auto_1fr] gap-3 items-stretch">
      <div className="bg-white/40 border border-white/50 rounded-xl p-4 space-y-3">
        <span className="font-outfit text-[13px] text-[#2D2926] block">Lo que tu negocio ofrece</span>
        <div><Etiq>Productos y servicios</Etiq><Lista items={data.productosServicios} /></div>
        <div><Etiq>Cómo alivia dolores</Etiq><Lista items={data.painRelievers} /></div>
        <div><Etiq>Cómo genera ganancias</Etiq><Lista items={data.gainCreators} /></div>
      </div>
      <div className="hidden md:flex items-center">
        <span className="font-azeret text-[10px] text-[#6B2D3C] tracking-widest rotate-90 md:rotate-0">⇄</span>
      </div>
      <div className="bg-[#6B2D3C]/5 border border-[#6B2D3C]/15 rounded-xl p-4 space-y-3">
        <span className="font-outfit text-[13px] text-[#2D2926] block">Lo que tu cliente vive</span>
        <div><Etiq>Jobs</Etiq><Lista items={data.jobs} /></div>
        <div><Etiq>Pains</Etiq><Lista items={data.pains} /></div>
        <div><Etiq>Gains</Etiq><Lista items={data.gains} /></div>
      </div>
    </div>
  </CardShell>
);

// FÓRMULA · The Big Ideal: tensión + lo mejor → statement grande.
export const BigIdealCard = ({ data, nombre }) => (
  <CardShell layoutId="canvas-bigIdeal" subtitle="Por qué importas" title="The Big Ideal" className="md:col-span-2">
    <div className="grid grid-cols-1 md:grid-cols-[1fr_auto_1fr] gap-3 items-stretch mb-4">
      <div className="bg-white/40 border border-white/50 rounded-xl p-4">
        <Etiq>Tensión cultural</Etiq>
        <Texto>{data.tension}</Texto>
      </div>
      <div className="hidden md:flex items-center font-outfit text-[#6B2D3C] text-xl">+</div>
      <div className="bg-white/40 border border-white/50 rounded-xl p-4">
        <Etiq>Lo mejor de {nombre || 'tu marca'}</Etiq>
        <Texto>{data.loMejor}</Texto>
      </div>
    </div>
    {data.statement ? (
      <div className="bg-[#2D2926] rounded-xl px-6 py-5 text-center">
        <span className="font-azeret text-[8px] uppercase tracking-widest text-[#E8DDB0] block mb-2">Tu Big Ideal</span>
        <p className="font-outfit text-[17px] md:text-[20px] leading-snug text-[#F5F1EB]">{data.statement}</p>
      </div>
    ) : (
      <Vacio />
    )}
  </CardShell>
);

// DIAGNÓSTICO · el momento del método donde se rompe la conexión.
export const DiagnosticoCard = ({ data }) => {
  const MOMENTOS = ['LLEGAS', 'SIENTES', 'ATERRIZAS', 'CONFÍAS', 'ACTÚAS'];
  const activo = (data.momento || '').toUpperCase();
  return (
    <motion.div variants={fadeUp} className="bg-[#2D2926] text-[#F5F1EB] rounded-[24px] p-6 md:p-8">
      <span className="font-azeret text-[9px] uppercase tracking-widest text-[#E8DDB0] block mb-4">
        Diagnóstico · método Ese Momento
      </span>
      <div className="flex flex-wrap gap-2 mb-4">
        {MOMENTOS.map((m) => (
          <span
            key={m}
            className={`font-azeret text-[9px] uppercase tracking-widest px-3 py-1.5 rounded-full border transition-all duration-[600ms] ${
              m === activo
                ? 'bg-[#FFF3C2] text-[#2D2926] border-[#FFF3C2]'
                : 'border-[#F5F1EB]/20 text-[#F5F1EB]/40'
            }`}
          >
            {m}
          </span>
        ))}
      </div>
      <p className="font-outfit text-lg md:text-xl mb-2">Tu conexión se rompe en {activo.toLowerCase()}.</p>
      <p className="text-[14px] text-[#F5F1EB]/80 leading-relaxed">{data.explicacion}</p>
    </motion.div>
  );
};

export const EntregablesGrid = ({ data, nombre }) => (
  <motion.div variants={staggerContainer(0.15, 0.1)} initial="hidden" animate="show" className="grid md:grid-cols-2 gap-4">
    <BuyerPersonaCard data={data.buyerPersona || {}} />
    <EmpathyMapCard data={data.empathyMap || {}} />
    <VpcCard data={data.vpc || {}} />
    <BigIdealCard data={data.bigIdeal || {}} nombre={nombre} />
  </motion.div>
);

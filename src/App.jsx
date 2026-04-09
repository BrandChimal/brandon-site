import React, { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { ChevronDown, ArrowRight, User, Mail, Building2, Phone, MessageSquare } from 'lucide-react';

/* ═══ SSR-safe window width hook ═══ */
function useWindowWidth() {
  const [w, setW] = useState(1024);
  useEffect(() => {
    const h = () => setW(window.innerWidth);
    h();
    window.addEventListener('resize', h);
    return () => window.removeEventListener('resize', h);
  }, []);
  return w;
}

const GlobalStyles = () => (
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Azeret+Mono:wght@400;500&family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;1,9..40,300;1,9..40,400&family=Outfit:wght@300;400;500;600&display=swap');
    :root {
      --carbon:#2D2926;--carbon-deep:#1A1714;--vino:#6B2D3C;
      --dorado:#FFF3C2;--dorado-dim:#E8DDB0;--crema:#F5F1EB;
      --arena:#EBE6DE;--taupe:#B8AFA6;--piedra:#8C8378;
      --current-calc-size-value:50px;
    }
    body{background-color:var(--carbon-deep);color:var(--crema);font-family:'DM Sans',sans-serif;overflow-x:hidden}
    .font-outfit{font-family:'Outfit',sans-serif}
    .font-azeret{font-family:'Azeret Mono',monospace}
    .glass-panel{background:rgba(45,41,38,0.4);backdrop-filter:blur(24px) saturate(150%);-webkit-backdrop-filter:blur(24px) saturate(150%);border:1px solid rgba(255,243,194,0.06)}
    .neumorphism-dark{transition:all 600ms cubic-bezier(0.34,1.56,0.64,1)}
    @media(hover:hover){.neumorphism-dark:hover{transform:scale(1.04) translateY(-6px);box-shadow:12px 16px 32px rgba(0,0,0,0.8),-6px -6px 20px rgba(255,243,194,0.05);border-color:rgba(255,243,194,0.2);z-index:10}}
    .neumorphism-light{transition:all 600ms cubic-bezier(0.34,1.56,0.64,1)}
    @media(hover:hover){.neumorphism-light:hover{transform:scale(1.04) translateY(-6px);box-shadow:12px 16px 32px rgba(0,0,0,0.1),-8px -8px 24px rgba(255,255,255,0.9);border-color:rgba(45,41,38,0.15);z-index:10}}
    .input-neumorphism{transition:all 600ms cubic-bezier(0.34,1.56,0.64,1);position:relative}
    .input-neumorphism:hover,.input-neumorphism:focus-within{transform:scale(1.03);box-shadow:6px 8px 20px rgba(0,0,0,0.7),-4px -4px 14px rgba(255,243,194,0.08);border-color:rgba(255,243,194,0.4);z-index:20}
    ::-webkit-scrollbar{width:8px}::-webkit-scrollbar-track{background:var(--carbon-deep)}::-webkit-scrollbar-thumb{background:var(--piedra);border-radius:4px}
    .hide-scrollbar{-ms-overflow-style:none;scrollbar-width:none}.hide-scrollbar::-webkit-scrollbar{display:none}
    .shape-overlays{width:100vw;height:100vh;pointer-events:none;position:fixed;top:0;left:0;z-index:9999}
    .shape-overlays__layer{position:absolute;top:0;left:0;width:100%;height:100%;transform:translateY(100%);border-radius:50% 50% 0 0/20vh 20vh 0 0;transition:transform .8s cubic-bezier(.7,0,.3,1),border-radius .8s cubic-bezier(.7,0,.3,1)}
    .uc-menu-opened .shape-overlays__layer{transform:translateY(0);border-radius:0}
    .shape-overlays__layer:nth-child(1){background:var(--vino);transition-delay:0s}
    .shape-overlays__layer:nth-child(2){background:var(--carbon-deep);transition-delay:.1s}
    .shape-overlays__layer:nth-child(3){background:var(--dorado-dim);transition-delay:.2s}
    .shape-overlays__layer:nth-child(4){background:var(--carbon);transition-delay:.3s}
    .global-menu{width:100vw;height:100vh;display:flex;justify-content:center;align-items:center;position:fixed;top:0;left:0;z-index:10000;visibility:hidden;opacity:0;transition:opacity .4s ease 0s,visibility 0s .8s;pointer-events:none}
    .uc-menu-opened .global-menu{visibility:visible;opacity:1;transition:opacity .4s ease .6s,visibility 0s 0s;pointer-events:auto}
    .global-menu__wrap{display:flex;flex-direction:column;gap:30px;padding:0;list-style:none;text-align:center}
    .menu-item{opacity:0;transform:translateY(40px);transition:all .4s cubic-bezier(.19,1,.22,1)}
    .uc-menu-opened .menu-item{opacity:1;transform:translateY(0)}
    .uc-menu-opened .menu-item:nth-child(1){transition-delay:.6s}
    .uc-menu-opened .menu-item:nth-child(2){transition-delay:.7s}
    .uc-menu-opened .menu-item:nth-child(3){transition-delay:.8s}
    .uc-menu-opened .menu-item:nth-child(4){transition-delay:.9s}
    .menu-item a{color:var(--crema);font-size:32px;font-weight:500;font-family:'Outfit',sans-serif;transition:color .3s}
    .menu-item a:hover{color:var(--dorado)}
    .uc_liquid_hamburger{display:block;cursor:pointer;position:relative;z-index:10002;background:transparent;border-radius:80px;pointer-events:auto;width:var(--current-calc-size-value);height:var(--current-calc-size-value)}
    .uc_liquid_hamburger::after{width:100%;height:100%;box-sizing:border-box;content:'';display:block;position:absolute;top:0;left:0;pointer-events:none;border-radius:80px;border:2px solid var(--dorado-dim);opacity:.5}
    .hamburger__line{width:calc(var(--current-calc-size-value) - 56.9%);height:2px;overflow:hidden;position:absolute;z-index:10;transition-duration:.6s;transition-timing-function:cubic-bezier(.19,1,.22,1)}
    .hamburger__line-in{width:calc(var(--current-calc-size-value) + 71.45%);height:2px;position:absolute;top:0;left:0;transition-duration:.6s;transition-timing-function:cubic-bezier(.19,1,.22,1)}
    .hamburger__line-in::before,.hamburger__line-in::after{width:calc(var(--current-calc-size-value) - 43.52%);height:2px;content:'';display:block;position:absolute;top:0;background:var(--dorado);transition-timing-function:cubic-bezier(.19,1,.22,1);transition-property:transform}
    .hamburger__line-in::before{left:calc(-1*var(--current-calc-size-value) - -10%)}
    .hamburger__line-in::after{left:0}
    .hamburger__line--01,.hamburger__line--02,.hamburger__line--03,.hamburger__line--cross01,.hamburger__line--cross02{left:calc(var(--current-calc-size-value) - 72.3%)}
    .hamburger__line--01{top:calc(var(--current-calc-size-value) - 62.05%)}
    .hamburger__line--02,.hamburger__line--cross01,.hamburger__line--cross02{top:calc(var(--current-calc-size-value) - 52.3%)}
    .hamburger__line--03{top:calc(var(--current-calc-size-value) - 41.56%)}
    .hamburger__line--cross01{transform:rotate(45deg)}.hamburger__line--cross02{transform:rotate(-45deg)}
    .hamburger__line-in--cross01,.hamburger__line-in--cross02{transform:translateX(-33.3%)}
    .hamburger__line-in--01{transition-delay:.2s}.hamburger__line-in--02{transition-delay:.25s}
    .hamburger__line-in--02::before,.hamburger__line-in--02::after{transition-delay:.05s}
    .hamburger__line-in--03{transition-delay:.3s}.hamburger__line-in--03::before,.hamburger__line-in--03::after{transition-delay:.1s}
    .hamburger__line-in--cross01{transition-delay:0s}.hamburger__line-in--cross02{transition-delay:.05s}
    .hamburger__line-in--cross02::before,.hamburger__line-in--cross02::after{transition-delay:.1s}
    .is-opened-navi .hamburger__line--01,.is-opened-navi .hamburger__line--02,.is-opened-navi .hamburger__line--03{opacity:0}
    .is-opened-navi .hamburger__line-in--01,.is-opened-navi .hamburger__line-in--02,.is-opened-navi .hamburger__line-in--03{transform:translateX(33.3%)}
    .is-opened-navi .hamburger__line-in--cross01,.is-opened-navi .hamburger__line-in--cross02{transform:translateX(0)}
    .is-opened-navi .hamburger__line-in--01{transition-delay:0s}.is-opened-navi .hamburger__line-in--02{transition-delay:.05s}
    .is-opened-navi .hamburger__line-in--03{transition-delay:.1s}.is-opened-navi .hamburger__line-in--cross01{transition-delay:.25s}
    .is-opened-navi .hamburger__line-in--cross02{transition-delay:.3s}
    .tile-grid-container{position:absolute;top:50%;left:50%;width:120vw;height:120vh;transform:translate(-50%,-50%) rotate(-10deg);display:flex;flex-direction:column;gap:15px;z-index:0;opacity:.06;pointer-events:none}
    .tile-row{display:flex;gap:15px;width:200vw;will-change:transform}
    .tile-img{width:250px;height:150px;object-fit:cover;border-radius:8px;flex-shrink:0}
  `}</style>
);

const Button = ({ children, onClick, href, className = '', variant = 'primary' }) => {
  const base = "inline-flex items-center justify-center font-outfit rounded-full transition-all duration-[600ms] cursor-pointer text-center";
  const v = {
    primary: "bg-[#6B2D3C] border border-[#6B2D3C]/50 text-[#F5F1EB] px-8 py-3.5 shadow-[0_4px_15px_rgba(107,45,60,0.3)] hover:shadow-[0_8px_30px_rgba(107,45,60,0.5)] hover:scale-105 hover:-translate-y-1 hover:bg-[#8A3F52]",
    secondary: "bg-[#2D2926]/60 backdrop-blur-md border border-[#FFF3C2]/10 text-[#E8DDB0] px-6 py-3 hover:bg-[#2D2926]/80 hover:text-[#FFF3C2] hover:scale-105 hover:-translate-y-0.5",
  };
  const Tag = href ? 'a' : 'button';
  return <Tag href={href} onClick={onClick} className={`${base} ${v[variant]} ${className}`}>{children}</Tag>;
};

const TileScrollBackground = () => {
  const { scrollYProgress } = useScroll();
  const x1 = useTransform(scrollYProgress, [0,1], [-150,150]);
  const x2 = useTransform(scrollYProgress, [0,1], [150,-150]);
  const x3 = useTransform(scrollYProgress, [0,1], [-100,200]);
  const x4 = useTransform(scrollYProgress, [0,1], [200,-100]);
  const imgs = Array.from({length:9},(_,i)=>`https://www.elementpack.pro/demo/wp-content/uploads/2021/11/0${i+1}.jpg`);
  return (
    <div className="tile-grid-container">
      {[x1,x2,x3,x4].map((x,r)=>(
        <motion.div key={r} style={{x}} className="tile-row">
          {(r%2===0?imgs:[...imgs].reverse()).map((src,i)=><img key={i} src={src} className="tile-img" alt="" loading="lazy"/>)}
        </motion.div>
      ))}
    </div>
  );
};

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [anim, setAnim] = useState(false);
  useEffect(() => { const h = () => setScrolled(window.scrollY > 80); window.addEventListener('scroll', h); return () => window.removeEventListener('scroll', h); }, []);
  const toggle = () => {
    if (anim) return; setAnim(true);
    document.body.style.overflow = !menuOpen ? 'hidden' : 'auto';
    setMenuOpen(!menuOpen); setTimeout(() => setAnim(false), 1000);
  };
  return (
    <>
      <nav className={`fixed top-0 w-full z-[10002] transition-all duration-[600ms] ${scrolled ? 'bg-[#1A1714]/90 backdrop-blur-xl border-b border-[#FFF3C2]/5 py-3 shadow-lg' : 'bg-transparent py-4 md:py-6'}`}>
        <div className="max-w-7xl mx-auto px-6 flex justify-between items-center relative z-[10003]">
          <img src="https://i.ibb.co/vxcmPB6y/logo-bc-dorado.png" alt="Brandon Chimal" className="h-6 md:h-8 object-contain" />
          <div className="flex items-center gap-6">
            <div className="hidden md:flex space-x-8 items-center font-outfit text-[14px]">
              {['Método','Resultados','Servicios'].map(i=><a key={i} href={`#${i.toLowerCase()}`} className="text-[#F5F1EB] hover:text-[#FFF3C2] transition-colors duration-[600ms]">{i}</a>)}
              <Button href="#contacto" className="!px-6 !py-2 text-sm">Hablar directo →</Button>
            </div>
            <div className={`uc_liquid_hamburger md:hidden ${menuOpen?'is-opened-navi':''}`} onClick={toggle}>
              <div className="hamburger__line hamburger__line--01"><div className="hamburger__line-in hamburger__line-in--01"></div></div>
              <div className="hamburger__line hamburger__line--02"><div className="hamburger__line-in hamburger__line-in--02"></div></div>
              <div className="hamburger__line hamburger__line--03"><div className="hamburger__line-in hamburger__line-in--03"></div></div>
              <div className="hamburger__line hamburger__line--cross01"><div className="hamburger__line-in hamburger__line-in--cross01"></div></div>
              <div className="hamburger__line hamburger__line--cross02"><div className="hamburger__line-in hamburger__line-in--cross02"></div></div>
            </div>
          </div>
        </div>
      </nav>
      <div className={menuOpen?'uc-menu-opened':''}>
        <div className="shape-overlays"><div className="shape-overlays__layer"/><div className="shape-overlays__layer"/><div className="shape-overlays__layer"/><div className="shape-overlays__layer"/></div>
        <div className="global-menu"><ul className="global-menu__wrap">
          {['Método','Resultados','Servicios','Contacto'].map(i=><li key={i} className="menu-item"><a href={`#${i.toLowerCase()}`} onClick={toggle}>{i}</a></li>)}
        </ul></div>
      </div>
    </>
  );
};

const Hero = () => {
  const { scrollY } = useScroll();
  const yP = useTransform(scrollY, [0,1000], [0,-150]);
  const oF = useTransform(scrollY, [0,400], [1,0]);
  return (
    <section className="relative min-h-[100svh] flex items-center justify-center overflow-hidden bg-[#1A1714]">
      <motion.div style={{y:yP}} initial={{scale:1.15,opacity:0}} animate={{scale:1,opacity:1}} transition={{duration:2,ease:"easeOut"}} className="absolute inset-0 z-0">
        <img src="https://i.ibb.co/bgT2Yz1Q/evidence-metrics.webp" alt="" className="w-full h-full object-cover object-top opacity-40 md:opacity-50 grayscale-[30%]"/>
        <div className="absolute inset-0 bg-gradient-to-t from-[#1A1714] via-[#1A1714]/80 to-transparent"/>
      </motion.div>
      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 pt-24 md:pt-32">
        <motion.div initial={{opacity:0,y:60,scale:0.9,filter:'blur(10px)'}} animate={{opacity:1,y:0,scale:1,filter:'blur(0px)'}} transition={{duration:1.2,delay:0.2,type:"spring",bounce:0.3}} className="glass-panel neumorphism-dark rounded-3xl p-6 md:p-12 max-w-2xl w-full">
          <motion.span initial={{opacity:0,x:-20}} animate={{opacity:1,x:0}} transition={{duration:0.8,delay:0.6}} className="font-azeret text-[10px] md:text-[11px] uppercase tracking-[4px] md:tracking-[5px] text-[#E8DDB0] block mb-4 md:mb-6">Ese Momento</motion.span>
          <motion.h1 initial={{opacity:0,y:20}} animate={{opacity:1,y:0}} transition={{duration:0.8,delay:0.7}} className="font-outfit text-[32px] sm:text-4xl md:text-5xl lg:text-[48px] font-normal leading-[1.1] text-[#F5F1EB] mb-4 md:mb-6">Que cada momento<br/>se sienta especialmente diseñado<br/>para cada lead, cada cliente<br/>y cada usuario.</motion.h1>
          <motion.p initial={{opacity:0}} animate={{opacity:1}} transition={{duration:0.8,delay:0.9}} className="text-[14px] md:text-[15px] text-[#B8AFA6] max-w-[420px] mb-8 leading-relaxed">El post que ve en redes, la página donde se registra, el mail que lo acompaña y la experiencia que lo hace volver.</motion.p>
          <motion.div initial={{opacity:0,y:20}} animate={{opacity:1,y:0}} transition={{duration:0.8,delay:1}} className="flex flex-col sm:flex-row items-center gap-3 md:gap-4 w-full">
            <Button href="#costo" className="w-full sm:w-auto !px-6 !py-3 text-[13px] md:text-sm">Ese momento empieza aquí ↓</Button>
            <Button variant="secondary" href="#contacto" className="w-full sm:w-auto !text-[12px]">Hablar directo →</Button>
          </motion.div>
        </motion.div>
      </div>
      <motion.div style={{opacity:oF}} className="absolute bottom-0 w-full bg-[#1A1714]/95 border-t border-[#FFF3C2]/10 backdrop-blur-md py-4 z-20 hidden md:block">
        <div className="max-w-7xl mx-auto px-6 flex justify-between items-center font-azeret text-[11px] uppercase tracking-[2px]">
          <span className="text-[#E8DDB0]">+30% CONVERSIÓN</span><span className="text-[#8C8378]">|</span><span className="text-[#B8AFA6]">LATAM · EUROPA</span><span className="text-[#8C8378]">|</span><span className="text-[#E8DDB0]">+25% REGIONAL</span><span className="text-[#8C8378]">|</span><span className="text-[#B8AFA6]">B2B · FINTECH · ECOMM</span>
        </div>
      </motion.div>
    </section>
  );
};

const CostoSection = () => {
  const width = useWindowWidth();
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end","end start"] });
  const yP = useTransform(scrollYProgress, [0,1], [50,-50]);
  const cards = [
    { title:"Leads que no maduran", desc:"Llegan por ads o contenido. Pero tu seguimiento no los conoce. Reciben correos genéricos. Se van.", stat:"El 35% de las solicitudes de demo en B2B no reciben respuesta. Se pierden antes de la primera conversación.", source:"Fuente: Chili Piper, B2B Buyer Best Practices Report, 2023 — mystery shopper en Top 100 SaaS", icon:"https://i.ibb.co/C3STcS1Q/icon-leads.jpg" },
    { title:"Canales que no se parecen", desc:"Tu web dice una cosa. Tus redes otra. Tu email suena a otro negocio. El cliente no sabe con quién está hablando.", stat:"El 76% de los prospectos se frustra cuando la comunicación los trata igual que a todos los demás. Las empresas que personalizan su comunicación generan entre 10% y 15% más de ingresos.", source:"Fuente: McKinsey, Next in Personalization, 2021 — encuesta a 1,013 consumidores + benchmarking de 100 empresas", icon:"https://i.ibb.co/b51DTntH/icon-channels.jpg" },
    { title:"Herramientas sin estrategia", desc:"Tienes CRM, email marketing, analytics. Pero nadie las configuró pensando en tu usuario. Son infraestructura vacía.", stat:"Las empresas utilizan solo el 33% de las capacidades de su stack de marketing — el punto más bajo registrado — mientras le dedican el 22% de su presupuesto total.", source:"Fuente: Gartner Marketing Technology Survey, 2023 — encuesta a 405 líderes de marketing", icon:"https://i.ibb.co/7t14jfX7/icon-tools.jpg" },
    { title:"Proveedores que no se coordinan", desc:"Agencia de branding. Freelancer de web. Otro de automatización. Cada uno trabaja con su propio brief. Tú eres el traductor en medio.", stat:"El 67.9% del tiempo de liderazgo de marketing se consume gestionando el presente — no construyendo estrategia. El 39% de los CMOs planea recortar agencias este año para consolidar proveedores.", source:"Fuentes: CMO Survey, Duke/Deloitte, Fall 2024, n=162 · Gartner CMO Spend Survey, 2025, n=402", icon:"https://i.ibb.co/CKggddKr/icon-providers.jpg" },
  ];
  return (
    <section id="costo" ref={ref} className="py-20 md:py-32 bg-[#1A1714]">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-10 md:gap-16">
        <div className="lg:col-span-5">
          <motion.div style={{y:width>1024?yP:0}} className="lg:sticky lg:top-32">
            <span className="font-azeret text-[10px] md:text-[12px] uppercase text-[#E8DDB0] block mb-4 tracking-widest">El costo</span>
            <h2 className="font-outfit text-[32px] md:text-[44px] font-medium leading-[1.1] text-[#FFF3C2] mb-6 md:mb-8">Lo que una comunicación desconectada le está costando a tu marca.</h2>
            <p className="text-[15px] md:text-[16px] text-[#B8AFA6] leading-relaxed max-w-sm">Estos problemas no se resuelven contratando otra herramienta. Se resuelven con una sola visión que los conecte.</p>
          </motion.div>
        </div>
        <div className="lg:col-span-7 flex flex-col gap-6">
          {cards.map((c,i) => (
            <motion.div key={i} initial={{opacity:0,y:30}} whileInView={{opacity:1,y:0}} viewport={{once:true,margin:"-80px"}} transition={{duration:0.6,delay:i*0.08}} className="glass-panel neumorphism-dark rounded-2xl p-6 md:p-8">
              <div className="flex flex-col sm:flex-row items-start gap-4 md:gap-6">
                <img src={c.icon} alt={c.title} className="w-12 h-12 rounded-xl object-cover border border-[#FFF3C2]/10 shrink-0"/>
                <div>
                  <h3 className="font-outfit text-lg md:text-xl font-medium text-[#F5F1EB] mb-2 md:mb-3">{c.title}</h3>
                  <p className="text-[14px] md:text-[15px] text-[#B8AFA6] leading-relaxed mb-4 md:mb-6">{c.desc}</p>
                  <div className="bg-[#1A1714]/40 rounded-lg p-4 border border-[#FFF3C2]/5 transition-colors duration-[600ms] hover:border-[#FFF3C2]/30">
                    <p className="font-azeret text-[12px] md:text-[13px] text-[#FFF3C2] mb-2 leading-relaxed font-medium">→ {c.stat}</p>
                    <p className="font-azeret text-[10px] md:text-[11px] text-[#8C8378]">{c.source}</p>
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

const MetodoSection = () => {
  const steps = [
    { num:"01", title:"ENTENDER ANTES DE TOCAR", desc:"Antes de cambiar una sola pieza, se mapea cómo llega tu usuario, qué recibe en cada canal, dónde deja de avanzar y por qué.", tools:"Herramientas: auditoría de touchpoints, mapas de calor, análisis de flujos actuales." },
    { num:"02", title:"RECONSTRUIR CON DIRECCIÓN", desc:"Lo que está roto se rediseña. Lo que falta se construye. Estrategia, diseño, automatización y tecnología — integrados, no subcontratados por separado.", tools:"Entregables: journey rediseñado, flujos automatizados, comunicación coherente por canal." },
    { num:"03", title:"MEDIR Y AJUSTAR", desc:"Todo lo implementado se mide. Lo que funciona se escala. Lo que no, se ajusta. No hay entrega sin seguimiento.", tools:"Indicadores: conversión por etapa, engagement por canal, costo de adquisición, retención." },
  ];
  return (
    <section id="metodo" className="bg-[#1A1714]">
      <div className="flex flex-col md:flex-row">
        <div className="w-full md:w-1/2 relative overflow-hidden py-20 md:py-32 px-6 md:px-12 lg:px-24">
          <div className="absolute inset-0 opacity-[0.15] bg-cover bg-center blur-xl" style={{backgroundImage:"url('https://i.ibb.co/pv9dQ2dV/method-system.webp')"}}/>
          <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-[#1A1714] to-transparent z-10 hidden md:block"/>
          <div className="absolute top-20 md:top-1/4 -left-4 text-[25vw] md:text-[12vw] font-outfit font-bold text-[#FFF3C2] opacity-[0.03] pointer-events-none select-none tracking-tight leading-none z-0">MÉTODO</div>
          <div className="relative z-20">
            <h2 className="font-outfit text-3xl md:text-[44px] font-medium text-[#FFF3C2] mb-4">Esto no es casualidad. Es la Anatomía del Momento.</h2>
            <p className="text-[16px] md:text-[18px] text-[#E8DDB0] mb-6 md:mb-8">Diagnosticar, reconstruir, medir. Así funciona.</p>
            <p className="text-[15px] md:text-[16px] text-[#B8AFA6] leading-relaxed mb-12 md:mb-20 max-w-md">Detrás de cada interacción que se siente natural, hay una visión integral que interconecta estrategia, tecnología, automatización y diseño de experiencia en cada punto de contacto.</p>
            <div className="space-y-12 md:space-y-16">
              {steps.map((s,i) => (
                <motion.div key={i} initial={{opacity:0,x:-20}} whileInView={{opacity:1,x:0}} viewport={{once:true,margin:"-60px"}} transition={{duration:0.6,delay:i*0.15}} className="neumorphism-dark p-6 rounded-2xl border border-transparent bg-[#1A1714]/40 md:bg-transparent">
                  <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 mb-4">
                    <span className="font-azeret text-[28px] md:text-[32px] text-[#FFF3C2]">{s.num}</span>
                    <h3 className="font-outfit text-lg md:text-2xl font-medium text-[#F5F1EB] tracking-wide">{s.title}</h3>
                  </div>
                  <p className="text-[14px] md:text-[16px] text-[#B8AFA6] leading-relaxed sm:ml-12 mb-4 max-w-md">{s.desc}</p>
                  <p className="font-azeret text-[10px] text-[#8C8378] sm:ml-12 max-w-sm uppercase leading-relaxed border-l border-[#6B2D3C] pl-4">{s.tools}</p>
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
            <img src="https://i.ibb.co/pv9dQ2dV/method-system.webp" alt="" className="w-full h-full object-cover grayscale-[20%]"/>
            <div className="absolute inset-0 bg-[#1A1714]/20"/><div className="absolute inset-0 bg-gradient-to-r from-[#1A1714] via-transparent to-transparent"/>
          </div>
        </div>
      </div>
    </section>
  );
};

const EvidenciaSection = () => (
  <section id="resultados" className="relative py-20 md:py-32 bg-[#1A1714] overflow-hidden">
    <TileScrollBackground/>
    <div className="relative z-10 max-w-[1100px] mx-auto px-6">
      <h2 className="font-outfit text-3xl md:text-[44px] font-medium text-[#FFF3C2] text-center mb-12 md:mb-16">Lo que pasa cuando la conexión funciona.</h2>
      <div className="grid grid-cols-1 md:grid-cols-12 gap-5">
        {[
          {span:"md:col-span-7",m:"+30%",l:"CONVERSIÓN LEAD → CLIENTE",d:"Flujos automatizados en la industria de reclutamiento y desarrollo organizacional. Leads que llegaban fríos empezaron a llegar listos.",q:'"Enfocado en resultados y en mejorar la experiencia de los usuarios y clientes... impactando de manera positiva cada punto en el journey."',n:"Cecilia Caballero",r:"Comunicación Corporativa y Marketing Digital B2B"},
          {span:"md:col-span-5",m:"+25%",l:"CONVERSIONES REGIONALES",d:"Estrategia inbound para LATAM y Europa. Comunicación adaptada a cada mercado — no traducida, reescrita.",q:'"Se percibió perfectamente el dominio de las herramientas más importantes para CRM y un vasto conocimiento de estrategias."',n:"Heidy Esquinca",r:"Head of Ecommerce"},
        ].map((c,i)=>(
          <motion.div key={i} initial={{opacity:0,y:30}} whileInView={{opacity:1,y:0}} viewport={{once:true}} transition={{duration:0.6}} className={`glass-panel neumorphism-dark p-6 md:p-8 rounded-[20px] ${c.span} flex flex-col justify-between`}>
            <div><h3 className="font-azeret text-[48px] md:text-[72px] font-medium text-[#FFF3C2] mb-2 leading-none">{c.m}</h3><p className="font-azeret text-[10px] md:text-[11px] uppercase tracking-[2px] md:tracking-[3px] text-[#8C8378] mb-4">{c.l}</p><p className="text-[14px] md:text-[15px] text-[#B8AFA6] leading-relaxed max-w-md">{c.d}</p></div>
            <div className="mt-8 pt-6 border-t border-[#FFF3C2]/10"><p className="text-[13px] md:text-[14px] italic text-[#E8DDB0] mb-4">{c.q}</p><p className="font-outfit text-[12px] md:text-[13px] font-medium text-[#F5F1EB]">{c.n}</p><p className="font-azeret text-[9px] md:text-[10px] text-[#8C8378] mt-1 uppercase">{c.r}</p></div>
          </motion.div>
        ))}
        <motion.div initial={{opacity:0,y:30}} whileInView={{opacity:1,y:0}} viewport={{once:true}} transition={{duration:0.6}} className="md:col-span-7 h-56 md:h-full md:min-h-[300px] rounded-[20px] overflow-hidden relative group neumorphism-dark border border-transparent">
          <img src="https://i.ibb.co/bgT2Yz1Q/evidence-metrics.webp" alt="" className="absolute inset-0 w-full h-full object-cover transition-transform duration-[600ms] group-hover:scale-[1.05]"/>
          <div className="absolute inset-0 border border-[#FFF3C2]/10 rounded-[20px] pointer-events-none"/>
        </motion.div>
        <motion.div initial={{opacity:0,y:30}} whileInView={{opacity:1,y:0}} viewport={{once:true}} transition={{duration:0.6}} className="glass-panel neumorphism-dark p-6 md:p-8 rounded-[20px] md:col-span-5 flex flex-col justify-between">
          <div><h3 className="font-azeret text-[48px] md:text-[72px] font-medium text-[#FFF3C2] mb-2 leading-none">+20%</h3><p className="font-azeret text-[10px] md:text-[11px] uppercase tracking-[2px] md:tracking-[3px] text-[#8C8378] mb-4">COMPRA Y RECOMPRA</p><p className="text-[14px] md:text-[15px] text-[#B8AFA6] leading-relaxed">Optimización UX basada en mapas de calor y comportamiento real. Cross-selling y upselling integrados en el journey como parte natural.</p></div>
          <div className="mt-8 pt-6 border-t border-[#FFF3C2]/10"><p className="text-[13px] md:text-[14px] italic text-[#E8DDB0] mb-4">"Su destreza en la resolución de problemas y análisis de situaciones se destacaron como sus principales fortalezas."</p><p className="font-outfit text-[12px] md:text-[13px] font-medium text-[#F5F1EB]">Ximena Leyva</p><p className="font-azeret text-[9px] md:text-[10px] text-[#8C8378] mt-1 uppercase">Sr. Content Specialist</p></div>
        </motion.div>
        {[
          {q:'"Brandon es un sólido profesional con alto sentido de compromiso; siempre plantea soluciones con visión estratégica."',n:"Karla Azucena",r:"Diseñadora Digital"},
          {q:'"Profesional altamente capacitado en marketing cloud, experto en automatizaciones. Es un gusto trabajar día a día con él."',n:"Estefanía Fajardo",r:"Segment Marketing"},
          {q:'"Excelente compañero y profesional con un alto compromiso hacia su trabajo, siempre con la mejor actitud para apoyar al equipo."',n:"Sergio Ángel",r:"Comunicador Visual"},
        ].map((t,i)=>(
          <motion.div key={i} initial={{opacity:0,y:20}} whileInView={{opacity:1,y:0}} viewport={{once:true}} transition={{duration:0.6,delay:i*0.1}} className="glass-panel neumorphism-dark p-6 rounded-[16px] md:col-span-4 border-[#FFF3C2]/5">
            <p className="text-[12px] md:text-[13px] italic text-[#E8DDB0] mb-4 leading-relaxed">{t.q}</p>
            <p className="font-outfit text-[11px] md:text-[12px] font-medium text-[#F5F1EB]">{t.n}</p>
            <p className="font-azeret text-[8px] md:text-[9px] text-[#8C8378] mt-1 uppercase">{t.r}</p>
          </motion.div>
        ))}
      </div>
      <p className="font-azeret text-[10px] md:text-[11px] text-[#8C8378] text-center mt-10 md:mt-12">Resultados en industrias de reclutamiento y desarrollo organizacional, fintech y e-commerce.</p>
    </div>
  </section>
);

const VisionSection = () => {
  const width = useWindowWidth();
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end","end start"] });
  const subY = useTransform(scrollYProgress, [0,1], [100,-100]);
  const subO = useTransform(scrollYProgress, [0.3,0.6,0.9], [0,1,0.5]);
  const subS = useTransform(scrollYProgress, [0.4,0.6], [0.9,1]);
  return (
    <section ref={ref} className="py-20 md:py-32 bg-[#F5F1EB] overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-10 md:gap-20">
        <div className="lg:col-span-6 flex flex-col justify-between">
          <motion.div initial={{opacity:0,y:40}} whileInView={{opacity:1,y:0}} viewport={{once:true}} transition={{duration:0.6}} className="mb-10 md:mb-16">
            <div className="inline-flex border border-[#6B2D3C]/20 rounded-full px-4 py-1.5 mb-6 md:mb-8"><span className="font-azeret text-[9px] md:text-[10px] uppercase tracking-[2px] text-[#6B2D3C] font-medium">&gt; NUESTRA_VISIÓN</span></div>
            <h2 className="font-outfit text-3xl md:text-[56px] font-medium text-[#2D2926] leading-[1.1] mb-6 md:mb-8 max-w-lg">Una sola visión que<br/><span className="text-[#6B2D3C]">conecta lo que otros</span><br/>mantienen separado.</h2>
            <div className="lg:hidden w-full h-[300px] sm:h-[400px] rounded-[24px] overflow-hidden shadow-lg mb-8 relative">
              <img src="https://i.ibb.co/fYBFmtK4/vision-portrait.webp" alt="" className="w-full h-full object-cover"/>
              <div className="absolute bottom-0 w-full p-6 bg-gradient-to-t from-black/60 to-transparent"><p className="font-azeret text-[9px] text-[#FFF3C2] uppercase tracking-widest mb-1">CONEXIÓN GENUINA</p><p className="font-outfit text-white text-base">Ver todo con la misma intención.</p></div>
            </div>
            <p className="text-[15px] md:text-[16px] text-[#2D2926]/70 mb-6 md:mb-8 leading-relaxed max-w-lg">Cuando la estrategia, el diseño y la tecnología se trabajan por separado, el contexto se pierde en el camino. Cada proveedor responde a su propio brief. Nadie ve el panorama completo.</p>
            <div className="border-l-[3px] border-[#6B2D3C] pl-5 md:pl-6 py-1 mb-6 md:mb-8 max-w-lg"><p className="text-[15px] md:text-[16px] text-[#2D2926] leading-relaxed font-medium">El enfoque es distinto: entender primero a quién le habla la marca, poner a su usuario en el centro, y desde ahí decidir qué se construye, qué herramientas se adaptan y cómo se conecta cada canal.</p></div>
          </motion.div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-auto">
            {[
              {q:'"Si algo podemos destacar de él, es su empatía, su disponibilidad y su lealtad."',n:"Rafael Gómez Albarrán",r:"CMCO"},
              {q:'"Su trabajo va más allá de crear una página web, sino de grandes ideas y estrategias."',n:"Erick Toledo",r:"Community Manager"},
            ].map((t,i)=>(
              <motion.div key={i} initial={{opacity:0,y:30}} whileInView={{opacity:1,y:0}} viewport={{once:true}} transition={{duration:0.6,delay:i*0.1}} className="bg-[#EBE6DE]/80 p-5 md:p-6 rounded-[16px] border border-[#EBE6DE] neumorphism-light">
                <p className="text-[12px] md:text-[13px] italic text-[#2D2926]/80 mb-4 md:mb-6 leading-relaxed">{t.q}</p>
                <p className="font-outfit text-[12px] md:text-[13px] font-bold text-[#2D2926]">{t.n}</p>
                <p className="font-azeret text-[9px] md:text-[10px] uppercase text-[#6B2D3C] mt-1">{t.r}</p>
              </motion.div>
            ))}
            <motion.div initial={{opacity:0,y:30}} whileInView={{opacity:1,y:0}} viewport={{once:true}} transition={{duration:0.6,delay:0.2}} className="bg-[#EBE6DE]/80 p-5 md:p-6 rounded-[16px] border border-[#EBE6DE] sm:col-span-2 neumorphism-light">
              <p className="text-[12px] md:text-[13px] italic text-[#2D2926]/80 mb-4 md:mb-6 leading-relaxed">"Una persona con un aprendizaje continuo, propositivo, muy inteligente, siempre emprendiendo nuevas ideas."</p>
              <p className="font-outfit text-[12px] md:text-[13px] font-bold text-[#2D2926]">Carlos Castro Paniagua</p>
              <p className="font-azeret text-[9px] md:text-[10px] uppercase text-[#6B2D3C] mt-1">Desarrollo de líderes y equipos</p>
            </motion.div>
          </div>
        </div>
        <div className="lg:col-span-6 hidden lg:block">
          <motion.div initial={{opacity:0,scale:0.95}} whileInView={{opacity:1,scale:1}} viewport={{once:true}} transition={{duration:0.8}} className="sticky top-32 h-[80vh] rounded-[32px] overflow-hidden shadow-[0_24px_64px_rgba(45,41,38,0.15)] relative">
            <img src="https://i.ibb.co/fYBFmtK4/vision-portrait.webp" alt="" className="w-full h-full object-cover"/>
            <div className="absolute bottom-0 w-full p-8 bg-gradient-to-t from-black/60 to-transparent"><p className="font-azeret text-[10px] text-[#FFF3C2] uppercase tracking-widest mb-1">CONEXIÓN GENUINA</p><p className="font-outfit text-white text-lg">Ver todo con la misma intención.</p></div>
          </motion.div>
        </div>
      </div>
      <motion.div style={{y:width>768?subY:0,opacity:subO,scale:subS}} className="mt-20 md:mt-40 mb-10 md:mb-20 text-center max-w-5xl mx-auto px-6 py-12 md:py-24">
        <h3 className="font-outfit text-3xl md:text-[40px] lg:text-[56px] font-medium text-[#2D2926] mb-6 md:mb-8 leading-[1.1] tracking-tight">No se trata de hacerlo todo.<br className="hidden md:block"/><span className="text-[#6B2D3C]">Se trata de verlo todo con la misma intención.</span></h3>
        <p className="text-[16px] md:text-[24px] text-[#2D2926]/70 leading-relaxed font-medium max-w-3xl mx-auto">Empatía con el usuario final. Estrategia que parte de lo que él necesita. Tecnología que se adapta al plan, no al revés.</p>
      </motion.div>
    </section>
  );
};

const ServiciosSection = () => {
  const targetRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: targetRef });
  const x = useTransform(scrollYProgress, [0,1], ["0%","-65%"]);
  const services = [
    {id:"01",title:"Pulso de Identidad",desc:"Define quién es tu marca, a quién le habla y por qué importa. Sin esta base, nada de lo demás tiene punto de referencia."},
    {id:"02",title:"Radiografía Digital",desc:"Muestra exactamente dónde se rompe la conexión con tu audiencia — y qué te está costando."},
    {id:"03",title:"Vínculo Estratégico",desc:"Una campaña con objetivo claro, diseñada y ejecutada de punta a punta en los canales que apliquen."},
    {id:"04",title:"Mapa de Conexión y Experiencia",desc:"Toda tu comunicación alineada. Todos tus canales hablando el mismo idioma. Toda la tecnología funcionando como una sola cosa."},
    {id:"05",title:"Acompañamiento Continuo",desc:"Lo que funciona se escala. Lo que no, se ajusta. Mes a mes, con contexto completo."},
  ];
  const SvcCard = ({s,mobile}) => (
    <div className={`${mobile?'snap-center shrink-0 w-[85vw] min-h-[340px] rounded-[20px] p-6 sm:p-8':'w-[420px] h-[380px] rounded-[24px] p-10'} glass-panel neumorphism-dark flex flex-col group`}>
      <span className={`font-azeret ${mobile?'text-[32px]':'text-[40px]'} text-[#FFF3C2]/10 mb-auto block group-hover:text-[#FFF3C2]/30 transition-all duration-[600ms]`}>{s.id}</span>
      <h3 className={`font-outfit ${mobile?'text-xl mb-3':'text-[24px] mb-4'} font-medium text-[#F5F1EB]`}>{s.title}</h3>
      <p className={`${mobile?'text-[14px] mb-6':'text-[15px] mb-8'} text-[#B8AFA6] leading-relaxed`}>{s.desc}</p>
      <a href="#contacto" className={`mt-auto ${mobile?'text-[13px]':'text-[14px]'} text-[#FFF3C2] flex items-center gap-2 w-fit hover:gap-3 transition-all duration-[600ms]`}>Preguntar por este servicio <ArrowRight size={14}/></a>
    </div>
  );
  return (
    <section id="servicios" className="relative z-10 bg-[#2D2926]">
      <div ref={targetRef} className="hidden md:block h-[300vh]">
        <div className="sticky top-0 h-screen flex flex-col justify-center overflow-hidden">
          <div className="absolute inset-0 bg-cover bg-center pointer-events-none" style={{backgroundImage:"url('https://i.ibb.co/Hf0scrwM/og-image.webp')"}}/>
          <div className="absolute inset-0 bg-[#2D2926] opacity-[0.69] pointer-events-none"/>
          <div className="max-w-7xl mx-auto px-6 w-full mb-16 relative z-10">
            <span className="font-azeret text-[12px] uppercase text-[#E8DDB0] block mb-4 tracking-widest">Servicios</span>
            <h2 className="font-outfit text-[44px] text-[#FFF3C2] max-w-2xl leading-[1.1] mb-6">Lo que se construye en cada etapa depende de lo que tu marca necesita.</h2>
          </div>
          <div className="pl-6 relative z-10"><motion.div style={{x}} className="flex gap-6 w-max">{services.map(s=><SvcCard key={s.id} s={s}/>)}</motion.div></div>
        </div>
      </div>
      <div className="md:hidden py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-cover bg-center pointer-events-none" style={{backgroundImage:"url('https://i.ibb.co/Hf0scrwM/og-image.webp')"}}/>
        <div className="absolute inset-0 bg-[#2D2926] opacity-[0.69] pointer-events-none"/>
        <div className="px-6 relative z-10 mb-8"><span className="font-azeret text-[10px] uppercase text-[#E8DDB0] block mb-3 tracking-widest">Servicios</span><h2 className="font-outfit text-3xl font-medium text-[#FFF3C2] leading-[1.1]">Lo que se construye en cada etapa depende de lo que tu marca necesita.</h2></div>
        <div className="flex overflow-x-auto snap-x snap-mandatory gap-4 px-6 pb-12 pt-4 hide-scrollbar relative z-10">{services.map(s=><SvcCard key={s.id} s={s} mobile/>)}</div>
      </div>
    </section>
  );
};

const LeadMagnetSection = () => {
  const [openQ, setOpenQ] = useState(null);
  const qs = [
    {id:1,q:"¿A quién le habla tu marca?",desc:"Define el Buyer Persona."},
    {id:2,q:"¿Qué piensa, siente y necesita esa persona?",desc:"Define el Empathy Map."},
    {id:3,q:"¿Qué de lo que ofreces resuelve lo que necesita?",desc:"Define el Value Proposition Canvas."},
    {id:4,q:"¿Por qué existe tu marca más allá de vender?",desc:"Define el Big Ideal."},
  ];
  return (
    <section id="pulso" className="py-20 md:py-32 bg-[#F5F1EB] relative z-20 shadow-[0_-20px_50px_rgba(0,0,0,0.15)] overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] md:w-[700px] h-[400px] md:h-[700px] bg-[#6B2D3C]/5 blur-[120px] pointer-events-none rounded-full"/>
      <div className="max-w-3xl mx-auto px-6 relative z-10">
        <div className="text-center mb-12 md:mb-16">
          <span className="font-azeret text-[10px] md:text-[12px] uppercase text-[#6B2D3C] font-medium block mb-4 tracking-widest">Pulso de Identidad · Express</span>
          <h2 className="font-outfit text-3xl md:text-[44px] text-[#2D2926] mb-4 md:mb-6 leading-tight">Construye la base que hace posible cada momento.</h2>
          <p className="text-[15px] md:text-[16px] text-[#2D2926]/70">Este es el primer paso para que cada mensaje, cada canal y cada acción tenga una dirección clara.</p>
        </div>
        <div className="bg-white border border-[#EBE6DE] rounded-[24px] p-5 sm:p-6 md:p-10 neumorphism-light">
          <div className="space-y-2 mb-8 md:mb-10">
            {qs.map(item=>(
              <div key={item.id} className="border-b border-[#EBE6DE] last:border-0">
                <button onClick={()=>setOpenQ(openQ===item.id?null:item.id)} className="w-full text-left py-4 flex justify-between items-center text-[15px] md:text-[16px] text-[#2D2926] font-medium hover:text-[#6B2D3C] transition-all duration-[600ms]">
                  <div className="flex flex-col pr-4"><span>{item.q}</span><span className="font-azeret text-[9px] md:text-[10px] text-[#8C8378] font-normal mt-1">{item.desc}</span></div>
                  <ChevronDown className={`shrink-0 transition-transform duration-[600ms] text-[#8C8378] ${openQ===item.id?'rotate-180':''}`} size={18}/>
                </button>
                <AnimatePresence>{openQ===item.id&&(<motion.div initial={{height:0,opacity:0}} animate={{height:'auto',opacity:1}} exit={{height:0,opacity:0}} className="overflow-hidden"><textarea className="w-full bg-[#F5F1EB] border border-[#EBE6DE] rounded-xl p-4 text-[#2D2926] text-[14px] focus:outline-none focus:border-[#6B2D3C]/30 focus:ring-1 focus:ring-[#6B2D3C]/30 mb-4 input-neumorphism" rows="3" placeholder="Escribe tu respuesta aquí..."/></motion.div>)}</AnimatePresence>
              </div>
            ))}
          </div>
          <div className="flex flex-col sm:flex-row gap-4 items-center w-full">
            <input type="email" placeholder="¿Dónde te enviamos tu Pulso Express?" className="flex-1 w-full bg-white border border-[#EBE6DE] rounded-full px-5 md:px-6 py-4 text-[#2D2926] text-sm focus:outline-none focus:border-[#6B2D3C]/50 focus:ring-1 focus:ring-[#6B2D3C]/50 placeholder-[#8C8378] input-neumorphism"/>
            <Button className="w-full sm:w-auto !px-8 shadow-none text-sm md:text-base">Hacer mi Pulso Express</Button>
          </div>
        </div>
        <p className="text-center text-[13px] md:text-[14px] text-[#8C8378] mt-8">Los números cuentan una parte. La conversación cuenta el resto.</p>
      </div>
    </section>
  );
};

const FAQContactoSection = () => {
  const [openFaq, setOpenFaq] = useState(0);
  const faqs = [
    {q:"¿Por qué un enfoque integrado en vez de contratar especialistas separados?",a:"Porque el problema más frecuente no es la falta de talento en cada área. Es la desconexión entre ellas. Cuando la estrategia, el diseño y la tecnología se piensan juntos desde el inicio, nada se pierde en la traducción entre equipos, briefs o proveedores."},
    {q:"¿Hay un equipo detrás o es un enfoque individual?",a:"Depende del proyecto. La visión estratégica y la integración siempre parten del mismo punto de vista. Para proyectos que requieren especialistas adicionales (fotografía, video, desarrollo backend), se trabaja con colaboradores de confianza que operan bajo el mismo estándar."},
    {q:"¿En qué industrias se ha aplicado este enfoque?",a:"Reclutamiento y desarrollo organizacional, fintech, e-commerce, y tecnología B2B. Los principios de comunicación coherente aplican a cualquier industria. Las tácticas se adaptan."},
    {q:"¿Cuánto dura un proyecto típico?",a:"Depende del servicio. Un Pulso de Identidad toma 2-3 semanas. Una Radiografía Digital, 4-6 semanas. Un Mapa de Conexión completo puede tomar 3-5 meses. Los tiempos se definen antes de arrancar."},
    {q:"¿Qué pasa si ya tengo herramientas configuradas (HubSpot, Mailchimp, etc.)?",a:"No se trata de cambiar herramientas. Se trata de que las que ya tienes estén configuradas pensando en tu usuario, no en los defaults de fábrica."},
    {q:"¿Puedo contratar solo el diagnóstico?",a:"Sí. La Radiografía Digital es un servicio independiente. Incluye diagnóstico + roadmap. Si después decides ejecutar, el roadmap ya existe."},
    {q:"¿Cómo sé que esto va a funcionar para mi caso?",a:"No lo sabes. Por eso el primer paso siempre es un diagnóstico, no una propuesta. Si después del diagnóstico la recomendación es que no necesitas este enfoque, se dice."},
  ];
  return (
    <section id="contacto" className="py-20 md:py-32 bg-[#2D2926]">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-16">
        <div className="lg:col-span-6">
          <div className="mb-12 md:mb-16">
            <span className="font-azeret text-[10px] md:text-[12px] uppercase text-[#E8DDB0] block mb-4 tracking-widest">Ese Momento</span>
            <h2 className="font-outfit text-3xl md:text-[44px] text-[#FFF3C2] mb-4 leading-tight">Preguntas frecuentes</h2>
            <p className="text-[15px] md:text-[16px] text-[#B8AFA6] mb-8">Lo que necesitas saber antes de dar el siguiente paso.</p>
            <div className="space-y-3 md:space-y-4">
              {faqs.map((f,i)=>(
                <div key={i} className="border-b border-[#B8AFA6]/10 pb-3 md:pb-4">
                  <button onClick={()=>setOpenFaq(openFaq===i?null:i)} className="w-full text-left py-2 flex justify-between items-center text-[15px] md:text-[16px] font-medium text-[#F5F1EB] hover:text-[#FFF3C2] transition-colors duration-[600ms]">
                    <span className="pr-6 md:pr-8">{f.q}</span>
                    <span className={`font-azeret text-[#E8DDB0] shrink-0 transition-transform duration-[600ms] ${openFaq===i?'rotate-45':''}`}>+</span>
                  </button>
                  <AnimatePresence>{openFaq===i&&(<motion.div initial={{height:0,opacity:0}} animate={{height:'auto',opacity:1}} exit={{height:0,opacity:0}} className="overflow-hidden"><p className="text-[14px] md:text-[15px] text-[#B8AFA6] pt-2 pb-4 pl-4 border-l border-[#FFF3C2]/10 mt-2 leading-relaxed">{f.a}</p></motion.div>)}</AnimatePresence>
                </div>
              ))}
            </div>
          </div>
          <div>
            <h3 className="font-outfit text-[18px] md:text-[20px] text-[#FFF3C2] mb-4 md:mb-6">Otras formas de conectar</h3>
            <div className="flex flex-col gap-3 md:gap-4">
              {[{icon:"https://i.ibb.co/83Z4gL7/icon-calendly.jpg",text:"Calendly (sesión de 20 min)"},{icon:"https://i.ibb.co/rfzxGSTm/icon-whatsapp.jpg",text:"WhatsApp (mensaje directo)"},{icon:"https://i.ibb.co/mVX2dcv3/icon-email.jpg",text:"Email (directo)"}].map((l,i)=>(
                <a key={i} href="#" className="flex items-center gap-4 group p-2 hover:bg-[#1A1714]/40 rounded-xl transition-all duration-[600ms] border border-transparent hover:border-[#FFF3C2]/5 w-fit">
                  <img src={l.icon} alt="" className="w-8 h-8 rounded-[8px] border border-[#FFF3C2]/10 group-hover:border-[#FFF3C2]/30 transition-colors duration-[600ms]"/>
                  <span className="text-[13px] md:text-[14px] text-[#F5F1EB] group-hover:text-[#FFF3C2] transition-colors duration-[600ms]">{l.text}</span>
                </a>
              ))}
            </div>
          </div>
        </div>
        <div className="lg:col-span-6 mt-12 lg:mt-0">
          <div className="lg:sticky lg:top-32">
            <div className="mb-8 md:mb-12 border-l-[3px] md:border-l-[4px] border-[#6B2D3C] pl-5 md:pl-6">
              <h3 className="font-outfit text-3xl sm:text-[40px] md:text-[56px] font-medium text-[#F5F1EB] leading-[1.05] tracking-tight">El siguiente paso es simple:<br/><span className="text-[#FFF3C2]">cuéntame qué necesitas.</span></h3>
            </div>
            <form className="space-y-4 md:space-y-5 w-full" onSubmit={e=>e.preventDefault()}>
              <div className="relative group w-full"><label className="absolute -top-2 left-4 bg-[#2D2926] px-1 text-[9px] md:text-[10px] text-[#B8AFA6] z-10 font-azeret uppercase">Nombre Completo</label><input type="text" placeholder="Tu nombre completo" className="w-full bg-[#1A1714]/40 border border-[#B8AFA6]/20 rounded-xl px-5 py-4 text-[#F5F1EB] text-[14px] focus:outline-none focus:border-[#FFF3C2]/50 placeholder-[#8C8378] input-neumorphism"/><User size={18} className="absolute right-4 top-1/2 -translate-y-1/2 text-[#8C8378] group-focus-within:text-[#FFF3C2] transition-colors duration-[600ms]"/></div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-5 w-full">
                <div className="relative group w-full"><label className="absolute -top-2 left-4 bg-[#2D2926] px-1 text-[9px] md:text-[10px] text-[#B8AFA6] z-10 font-azeret uppercase">Email</label><input type="email" placeholder="tucorreo@empresa.com" className="w-full bg-[#1A1714]/40 border border-[#B8AFA6]/20 rounded-xl px-5 py-4 text-[#F5F1EB] text-[14px] focus:outline-none focus:border-[#FFF3C2]/50 placeholder-[#8C8378] input-neumorphism"/><Mail size={18} className="absolute right-4 top-1/2 -translate-y-1/2 text-[#8C8378] group-focus-within:text-[#FFF3C2] transition-colors duration-[600ms]"/></div>
                <div className="relative group w-full"><label className="absolute -top-2 left-4 bg-[#2D2926] px-1 text-[9px] md:text-[10px] text-[#B8AFA6] z-10 font-azeret uppercase">Teléfono</label><input type="tel" placeholder="Tu teléfono (opcional)" className="w-full bg-[#1A1714]/40 border border-[#B8AFA6]/20 rounded-xl px-5 py-4 text-[#F5F1EB] text-[14px] focus:outline-none focus:border-[#FFF3C2]/50 placeholder-[#8C8378] input-neumorphism"/><Phone size={18} className="absolute right-4 top-1/2 -translate-y-1/2 text-[#8C8378] group-focus-within:text-[#FFF3C2] transition-colors duration-[600ms]"/></div>
              </div>
              <div className="relative group w-full"><label className="absolute -top-2 left-4 bg-[#2D2926] px-1 text-[9px] md:text-[10px] text-[#B8AFA6] z-10 font-azeret uppercase">Empresa</label><input type="text" placeholder="Nombre de tu empresa" className="w-full bg-[#1A1714]/40 border border-[#B8AFA6]/20 rounded-xl px-5 py-4 text-[#F5F1EB] text-[14px] focus:outline-none focus:border-[#FFF3C2]/50 placeholder-[#8C8378] input-neumorphism"/><Building2 size={18} className="absolute right-4 top-1/2 -translate-y-1/2 text-[#8C8378] group-focus-within:text-[#FFF3C2] transition-colors duration-[600ms]"/></div>
              <div className="relative group w-full"><label className="absolute -top-2 left-4 bg-[#2D2926] px-1 text-[9px] md:text-[10px] text-[#B8AFA6] z-10 font-azeret uppercase">¿Qué necesitas?</label><textarea placeholder="Cuéntame sobre tu proyecto..." rows="4" className="w-full bg-[#1A1714]/40 border border-[#B8AFA6]/20 rounded-xl px-5 py-4 text-[#F5F1EB] text-[14px] focus:outline-none focus:border-[#FFF3C2]/50 placeholder-[#8C8378] resize-none input-neumorphism"/><MessageSquare size={18} className="absolute right-4 top-5 text-[#8C8378] group-focus-within:text-[#FFF3C2] transition-colors duration-[600ms]"/></div>
              <div className="pt-4 md:pt-6 w-full"><Button className="w-full rounded-xl !py-4 font-medium text-[16px] tracking-wide">Conversemos</Button></div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

const Footer = () => (
  <footer className="bg-[#1A1714] py-12 border-t border-[#FFF3C2]/5">
    <div className="max-w-7xl mx-auto px-6 flex flex-col items-center gap-6">
      <img src="https://i.ibb.co/F4GqsGf2/logo-bc-vino.png" alt="Brandon Chimal" className="h-6 md:h-7 opacity-80"/>
      <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-4 text-[12px] md:text-[13px] text-[#8C8378]">
        <span>Brandon Chimal © 2026</span><span className="hidden sm:inline">|</span>
        <div className="flex gap-4"><a href="#" className="hover:text-[#FFF3C2] transition-colors duration-[600ms]">LinkedIn</a><span className="text-[#8C8378]/30">·</span><a href="#" className="hover:text-[#FFF3C2] transition-colors duration-[600ms]">Aviso de privacidad</a></div>
      </div>
    </div>
  </footer>
);

export default function App() {
  return (
    <>
      <GlobalStyles />
      <Navbar />
      <main className="w-full max-w-[100vw] overflow-x-hidden">
        <Hero />
        <CostoSection />
        <MetodoSection />
        <EvidenciaSection />
        <VisionSection />
        <ServiciosSection />
        <LeadMagnetSection />
        <FAQContactoSection />
      </main>
      <Footer />
    </>
  );
}

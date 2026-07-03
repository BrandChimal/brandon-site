// --- CONFIGURACIÓN DE ESTILOS GLOBALES Y FUENTES ---
const GlobalStyles = () => (
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Azeret+Mono:wght@400;500&family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;1,9..40,300;1,9..40,400&family=Outfit:wght@300;400;500;600&display=swap');

    :root {
      --carbon: #2D2926;
      --carbon-deep: #1A1714;
      --vino: #6B2D3C;
      --dorado: #FFF3C2;
      --dorado-dim: #E8DDB0;
      --crema: #F5F1EB;
      --arena: #EBE6DE;
      --taupe: #B8AFA6;
      --piedra: #8C8378;
      --current-calc-size-value: 50px;
    }

    body {
      background-color: var(--carbon-deep);
      color: var(--crema);
      font-family: 'DM Sans', sans-serif;
      /* Eliminado overflow-x: hidden global porque rompe los "position: sticky" */
    }

    .font-outfit { font-family: 'Outfit', sans-serif; }
    .font-azeret { font-family: 'Azeret Mono', monospace; }

    /* --- UTILIDADES DE NEUMORFISMO Y GLASSMORPHISM --- */
    .glass-panel {
      background: rgba(45, 41, 38, 0.4);
      backdrop-filter: blur(24px) saturate(150%);
      -webkit-backdrop-filter: blur(24px) saturate(150%);
      border: 1px solid rgba(255, 243, 194, 0.06);
    }

    .neumorphism-dark { transition: all 600ms cubic-bezier(0.34, 1.56, 0.64, 1); }
    @media (hover: hover) {
      .neumorphism-dark:hover {
        transform: scale(1.04) translateY(-6px);
        box-shadow: 12px 16px 32px rgba(0, 0, 0, 0.8), -6px -6px 20px rgba(255, 243, 194, 0.05);
        border-color: rgba(255, 243, 194, 0.2);
        z-index: 10;
      }
    }

    .neumorphism-light { transition: all 600ms cubic-bezier(0.34, 1.56, 0.64, 1); }
    @media (hover: hover) {
      .neumorphism-light:hover {
        transform: scale(1.04) translateY(-6px);
        box-shadow: 12px 16px 32px rgba(0, 0, 0, 0.1), -8px -8px 24px rgba(255, 255, 255, 0.9);
        border-color: rgba(45, 41, 38, 0.15);
        z-index: 10;
      }
    }

    .input-neumorphism { transition: all 600ms cubic-bezier(0.34, 1.56, 0.64, 1); position: relative; }
    .input-neumorphism:hover, .input-neumorphism:focus-within {
      transform: scale(1.03);
      box-shadow: 6px 8px 20px rgba(0, 0, 0, 0.7), -4px -4px 14px rgba(255, 243, 194, 0.08);
      border-color: rgba(255, 243, 194, 0.4);
      z-index: 20;
    }

    ::-webkit-scrollbar { width: 8px; }
    ::-webkit-scrollbar-track { background: var(--carbon-deep); }
    ::-webkit-scrollbar-thumb { background: var(--piedra); border-radius: 4px; }
    ::-webkit-scrollbar-thumb:hover { background: var(--taupe); }
    .hide-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
    .hide-scrollbar::-webkit-scrollbar { display: none; }

    /* --- LIQUID FULL SCREEN MENU CSS --- */
    .shape-overlays {
      width: 100vw; height: 100vh; pointer-events: none;
      position: fixed; top: 0; left: 0; z-index: 9999;
      display: flex; flex-direction: column;
    }
    .shape-overlays__layer {
      position: absolute; top: 0; left: 0; width: 100%; height: 100%;
      transform: translateY(100%);
      border-radius: 50% 50% 0 0 / 20vh 20vh 0 0;
      transition: transform 0.8s cubic-bezier(0.7, 0, 0.3, 1), border-radius 0.8s cubic-bezier(0.7, 0, 0.3, 1);
    }
    .uc-menu-opened .shape-overlays__layer { transform: translateY(0); border-radius: 0; }

    .shape-overlays__layer:nth-child(1) { background-color: var(--vino); transition-delay: 0.0s; }
    .shape-overlays__layer:nth-child(2) { background-color: var(--carbon-deep); transition-delay: 0.1s; }
    .shape-overlays__layer:nth-child(3) { background-color: var(--dorado-dim); transition-delay: 0.2s; }
    .shape-overlays__layer:nth-child(4) { background-color: var(--carbon); transition-delay: 0.3s; }

    .global-menu {
      width: 100vw; height: 100vh; display: flex; justify-content: center; align-items: center;
      position: fixed; top: 0; left: 0; z-index: 10000; visibility: hidden; opacity: 0;
      transition: opacity 0.4s ease 0s, visibility 0s 0.8s; pointer-events: none;
    }
    .uc-menu-opened .global-menu {
      visibility: visible; opacity: 1; transition: opacity 0.4s ease 0.6s, visibility 0s 0s; pointer-events: auto;
    }
    .global-menu__wrap { display: flex; flex-direction: column; gap: 30px; padding: 0; list-style: none; text-align: center; }
    .menu-item { opacity: 0; transform: translateY(40px); transition: all 0.4s cubic-bezier(0.19, 1, 0.22, 1); }
    .uc-menu-opened .menu-item { opacity: 1; transform: translateY(0); }
    .uc-menu-opened .menu-item:nth-child(1) { transition-delay: 0.6s; }
    .uc-menu-opened .menu-item:nth-child(2) { transition-delay: 0.7s; }
    .uc-menu-opened .menu-item:nth-child(3) { transition-delay: 0.8s; }
    .uc-menu-opened .menu-item:nth-child(4) { transition-delay: 0.9s; }
    .uc-menu-opened .menu-item:nth-child(5) { transition-delay: 1.0s; }

    .menu-item a {
      color: var(--crema); font-size: 32px; font-weight: 500; position: relative; transition: color 0.3s ease;
      font-family: 'Outfit', sans-serif;
    }
    .menu-item a:hover { color: var(--dorado); }

    /* HAMBURGER CSS EXACTO */
    .uc_liquid_hamburger {
      display: block; cursor: pointer; position: relative; z-index: 10002;
      background-color: transparent; border-radius: 80px; pointer-events: auto;
      width: var(--current-calc-size-value); height: var(--current-calc-size-value);
    }
    .uc_liquid_hamburger::after {
      width: 100%; height: 100%; box-sizing: border-box; content: ''; display: block;
      position: absolute; top: 0; left: 0; pointer-events: none; border-radius: 80px;
      border: 2px solid var(--dorado-dim); opacity: 0.5;
    }
    .hamburger__line {
      width: calc( var(--current-calc-size-value) - 56.9%); height: 2px; overflow: hidden; position: absolute;
      z-index: 10; transition-duration: 0.6s; transition-timing-function: cubic-bezier(0.19, 1, 0.22, 1);
    }
    .hamburger__line-in {
      width: calc( var(--current-calc-size-value) + 71.45%); height: 2px; position: absolute; top: 0; left: 0;
      transition-duration: 0.6s; transition-timing-function: cubic-bezier(0.19, 1, 0.22, 1);
    }
    .hamburger__line-in::before, .hamburger__line-in::after {
      width: calc( var(--current-calc-size-value) - 43.52%); height: 2px; content: ''; display: block;
      position: absolute; top: 0; background-color: var(--dorado);
      transition-timing-function: cubic-bezier(0.19, 1, 0.22, 1); transition-property: transform;
    }
    .hamburger__line-in::before { left: calc( -1 * var(--current-calc-size-value) - -10%); }
    .hamburger__line-in::after { left: 0; }
    .hamburger__line--01, .hamburger__line--02, .hamburger__line--03, .hamburger__line--cross01, .hamburger__line--cross02 {
      left: calc( var(--current-calc-size-value) - 72.3%);
    }
    .hamburger__line--01 { top: calc( var(--current-calc-size-value) - 62.05%); }
    .hamburger__line--02, .hamburger__line--cross01, .hamburger__line--cross02 { top: calc( var(--current-calc-size-value) - 52.3%); }
    .hamburger__line--03 { top: calc( var(--current-calc-size-value) - 41.56%); }
    .hamburger__line--cross01 { transform: rotate(45deg); }
    .hamburger__line--cross02 { transform: rotate(-45deg); }
    .hamburger__line-in--cross01, .hamburger__line-in--cross02 { transform: translateX(-33.3%); }

    .hamburger__line-in--01 { transition-delay: 0.2s; } .hamburger__line-in--02 { transition-delay: 0.25s; }
    .hamburger__line-in--02::before, .hamburger__line-in--02::after { transition-delay: 0.05s; }
    .hamburger__line-in--03 { transition-delay: 0.3s; }
    .hamburger__line-in--03::before, .hamburger__line-in--03::after { transition-delay: 0.1s; }
    .hamburger__line-in--cross01 { transition-delay: 0.0s; } .hamburger__line-in--cross02 { transition-delay: 0.05s; }
    .hamburger__line-in--cross02::before, .hamburger__line-in--cross02::after { transition-delay: 0.1s; }

    .is-opened-navi .hamburger__line--01, .is-opened-navi .hamburger__line--02, .is-opened-navi .hamburger__line--03 { opacity: 0; }
    .is-opened-navi .hamburger__line-in--01, .is-opened-navi .hamburger__line-in--02, .is-opened-navi .hamburger__line-in--03 { transform: translateX(33.3%); }
    .is-opened-navi .hamburger__line-in--cross01, .is-opened-navi .hamburger__line-in--cross02 { transform: translateX(0); }
    .is-opened-navi .hamburger__line-in--01 { transition-delay: 0s; } .is-opened-navi .hamburger__line-in--02 { transition-delay: 0.05s; }
    .is-opened-navi .hamburger__line-in--03 { transition-delay: 0.1s; } .is-opened-navi .hamburger__line-in--cross01 { transition-delay: 0.25s; }
    .is-opened-navi .hamburger__line-in--cross02 { transition-delay: 0.3s; }

    /* --- TILE GRID ANIMATION BACKGROUND --- */
    .tile-grid-container {
      position: absolute; top: 50%; left: 50%; width: 120vw; height: 120vh;
      transform: translate(-50%, -50%) rotate(-10deg);
      display: flex; flex-direction: column; gap: 15px; z-index: 0;
      opacity: 0.06; pointer-events: none;
    }
    .tile-row { display: flex; gap: 15px; width: 200vw; will-change: transform; }
    .tile-img { width: 250px; height: 150px; object-fit: cover; border-radius: 8px; flex-shrink: 0; }
  `}</style>
);

export default GlobalStyles;

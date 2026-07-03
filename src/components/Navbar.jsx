import { useState, useEffect } from 'react';
import Button from './Button';

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 80);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMenu = () => {
    if (isAnimating) return;
    setIsAnimating(true);

    if (!menuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }

    setMenuOpen(!menuOpen);
    setTimeout(() => setIsAnimating(false), 1000);
  };

  return (
    <>
      <nav className={`fixed top-0 w-full z-[10002] transition-all duration-[600ms] ${scrolled ? 'bg-[#1A1714]/90 backdrop-blur-xl border-b border-[#FFF3C2]/5 py-3 shadow-lg' : 'bg-transparent py-4 md:py-6'}`}>
        <div className="max-w-7xl mx-auto px-6 flex justify-between items-center relative z-[10003]">
          <img src="https://i.ibb.co/vxcmPB6y/logo-bc-dorado.png" alt="Brandon Chimal" className="h-6 md:h-8 object-contain" />

          <div className="flex items-center gap-6">
            <div className="hidden md:flex space-x-8 items-center font-outfit text-[14px]">
              {['Método', 'Resultados', 'Servicios'].map((item) => (
                <a key={item} href={`#${item.toLowerCase()}`} className="text-[#F5F1EB] hover:text-[#FFF3C2] transition-colors duration-[600ms]">
                  {item}
                </a>
              ))}
              <Button href="#contacto" className="!px-6 !py-2 text-sm">Hablar directo →</Button>
            </div>

            <div className={`uc_liquid_hamburger md:hidden ${menuOpen ? 'is-opened-navi' : ''}`} onClick={toggleMenu}>
              <div className="hamburger__line hamburger__line--01"><div className="hamburger__line-in hamburger__line-in--01"></div></div>
              <div className="hamburger__line hamburger__line--02"><div className="hamburger__line-in hamburger__line-in--02"></div></div>
              <div className="hamburger__line hamburger__line--03"><div className="hamburger__line-in hamburger__line-in--03"></div></div>
              <div className="hamburger__line hamburger__line--cross01"><div className="hamburger__line-in hamburger__line-in--cross01"></div></div>
              <div className="hamburger__line hamburger__line--cross02"><div className="hamburger__line-in hamburger__line-in--cross02"></div></div>
            </div>
          </div>
        </div>
      </nav>

      {/* LIQUID OVERLAYS & GLOBAL MENU */}
      <div className={menuOpen ? 'uc-menu-opened' : ''}>
        <div className="shape-overlays">
          <div className="shape-overlays__layer"></div>
          <div className="shape-overlays__layer"></div>
          <div className="shape-overlays__layer"></div>
          <div className="shape-overlays__layer"></div>
        </div>
        <div className="global-menu">
          <ul className="global-menu__wrap">
            <li className="menu-item"><a href="#metodo" onClick={toggleMenu}>Método</a></li>
            <li className="menu-item"><a href="#resultados" onClick={toggleMenu}>Resultados</a></li>
            <li className="menu-item"><a href="#servicios" onClick={toggleMenu}>Servicios</a></li>
            <li className="menu-item"><a href="#contacto" onClick={toggleMenu}>Contacto</a></li>
          </ul>
        </div>
      </div>
    </>
  );
};

export default Navbar;

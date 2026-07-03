const Footer = () => (
  <footer className="bg-[#1A1714] py-12 border-t border-[#FFF3C2]/5">
    <div className="max-w-7xl mx-auto px-6 flex flex-col items-center gap-6">
      <img src="https://i.ibb.co/F4GqsGf2/logo-bc-vino.png" alt="Brandon Chimal" className="h-6 md:h-7 opacity-80" />
      <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-4 text-[12px] md:text-[13px] text-[#8C8378] font-dm">
        <span>Brandon Chimal © 2026</span>
        <span className="hidden sm:inline">|</span>
        <div className="flex gap-4">
          <a href="#" className="hover:text-[#FFF3C2] transition-colors duration-[600ms]">LinkedIn</a>
          <span className="text-[#8C8378]/30">·</span>
          <a href="#" className="hover:text-[#FFF3C2] transition-colors duration-[600ms]">Aviso de privacidad</a>
        </div>
      </div>
    </div>
  </footer>
);

export default Footer;

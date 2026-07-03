// --- COMPONENTES UI REUTILIZABLES ---
const Button = ({ children, onClick, href, className = '', variant = 'primary' }) => {
  const baseStyle = "inline-flex items-center justify-center font-outfit rounded-full transition-all duration-[600ms] cursor-pointer text-center";

  const variants = {
    primary: "bg-[#6B2D3C] border border-[#6B2D3C]/50 text-[#F5F1EB] px-8 py-3.5 shadow-[0_4px_15px_rgba(107,45,60,0.3)] hover:shadow-[0_8px_30px_rgba(107,45,60,0.5)] hover:scale-105 hover:-translate-y-1 hover:bg-[#8A3F52]",
    secondary: "bg-[#2D2926]/60 backdrop-blur-md border border-[#FFF3C2]/10 text-[#E8DDB0] px-6 py-3 hover:bg-[#2D2926]/80 hover:text-[#FFF3C2] hover:scale-105 hover:-translate-y-0.5",
  };

  const Tag = href ? 'a' : 'button';
  return (
    <Tag href={href} onClick={onClick} className={`${baseStyle} ${variants[variant]} ${className}`}>
      {children}
    </Tag>
  );
};

export default Button;

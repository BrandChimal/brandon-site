import { useState, useEffect } from 'react';

// --- CUSTOM HOOK PARA VERCEL (SSR SAFE) ---
// Esto evita el error de "window is not defined" al hacer deploy
const useWindowSize = () => {
  const [windowSize, setWindowSize] = useState({
    width: typeof window !== 'undefined' ? window.innerWidth : 1200,
  });

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const handleResize = () => setWindowSize({ width: window.innerWidth });
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return windowSize;
};

export default useWindowSize;

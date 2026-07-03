import GlobalStyles from './styles/GlobalStyles';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Hero from './sections/Hero';
import CostoSection from './sections/CostoSection';
import MetodoSection from './sections/MetodoSection';
import EvidenciaSection from './sections/EvidenciaSection';
import VisionSection from './sections/VisionSection';
import ServiciosSection from './sections/ServiciosSection';
import LeadMagnetSection from './sections/LeadMagnetSection';
import FAQContactoSection from './sections/FAQContactoSection';

export default function App() {
  return (
    <>
      <GlobalStyles />
      <Navbar />
      {/* Eliminamos el overflow-x-hidden de la etiqueta main para que position: sticky funcione correctamente */}
      <main className="w-full max-w-[100vw]">
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

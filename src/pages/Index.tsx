import Header from '../components/Header';
import Hero from '../components/Hero';
import Services from '../components/Services';
import Properties from '../components/Properties';
import Calculator from '../components/Calculator';
import About from '../components/About';
import Footer from '../components/Footer';
import ProjectsShowcase from '../components/ProjectsShowcase';
import OrderForm from '../components/OrderForm';
import PWAInstaller from '../components/PWAInstaller';
import PWAUpdatePrompt from '../components/PWAUpdatePrompt';
import PageTransition from '../components/PageTransition';
import PerformanceOptimizer from '../components/PerformanceOptimizer';
import WhatsAppFloat from '../components/WhatsAppFloat';
import { useSEO, seoConfigs } from '../hooks/useSEO';

const Index = () => {
  // Применяем SEO-оптимизацию для главной страницы
  useSEO(seoConfigs.home);

  return (
    <PageTransition className="min-h-screen">
      <PerformanceOptimizer 
        preloadImages={[
          '/Forest Residence.jpeg',
          '/LOGOLOGO.png',
          '/Hero-mobile.jpg'
        ]}
        preloadVideos={[]}
      />
      <Header />
      <main>
        <Hero />
        <Services />
        <Properties />
        <ProjectsShowcase />
        <Calculator />
        <About />
      </main>
      <Footer />
      <PWAInstaller />
      <PWAUpdatePrompt />
      <WhatsAppFloat />
    </PageTransition>
  );
};

export default Index;

import Header from '../components/Header';
import Hero from '../components/Hero';
<<<<<<< HEAD
import Stats from '../components/Stats';
=======
>>>>>>> 39d3f718b0d8f7b0390d11e523d856b03bc5bd8d
import Services from '../components/Services';
import Properties from '../components/Properties';
import Calculator from '../components/Calculator';
import About from '../components/About';
import Footer from '../components/Footer';
<<<<<<< HEAD
import ProjectsShowcase from '../components/ProjectsShowcase';
import PWAInstaller from '../components/PWAInstaller';
import PageTransition from '../components/PageTransition';
import PerformanceOptimizer from '../components/PerformanceOptimizer';
import { useSEO, seoConfigs } from '../hooks/useSEO';

const Index = () => {
  // Применяем SEO-оптимизацию для главной страницы
  useSEO(seoConfigs.home);

  return (
    <PageTransition className="min-h-screen">
      <PerformanceOptimizer 
        preloadImages={[
          '/Forest Residence.jpeg',
          '/LOGO fullhouse.png',
          '/Hero-mobile.jpg'
        ]}
        preloadVideos={[
          '/Forest/Forest VID.mp4'
        ]}
      />
      <Header />
      <main>
        <Hero />
        <Stats />
        <Services />
        <Properties />
        <ProjectsShowcase />
=======

const Index = () => {
  return (
    <div className="min-h-screen">
      <Header />
      <main>
        <Hero />
        <Services />
        <Properties />
>>>>>>> 39d3f718b0d8f7b0390d11e523d856b03bc5bd8d
        <Calculator />
        <About />
      </main>
      <Footer />
<<<<<<< HEAD
      <PWAInstaller />
    </PageTransition>
=======
    </div>
>>>>>>> 39d3f718b0d8f7b0390d11e523d856b03bc5bd8d
  );
};

export default Index;

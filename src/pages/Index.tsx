import Header from '../components/Header';
import Hero from '../components/Hero';
import Services from '../components/Services';
import Properties from '../components/Properties';
import Calculator from '../components/Calculator';
import About from '../components/About';
import Footer from '../components/Footer';

const Index = () => {
  return (
    <div className="min-h-screen">
      <Header />
      <main>
        <Hero />
        <Services />
        <Properties />
        <Calculator />
        <About />
      </main>
      <Footer />
    </div>
  );
};

export default Index;

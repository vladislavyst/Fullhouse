import Header from '../components/Header';
import Footer from '../components/Footer';

const Services = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-20">
        <div className="container mx-auto px-4 py-20">
          <h1 className="text-4xl font-bold text-center">Наши услуги</h1>
          <p className="text-center mt-4">Здесь будут услуги</p>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Services;

import Footer from "@/components/Footer";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import HowWork from "@/components/HowWork";
import ClientsSection from "@/components/OurClients";
import Pricing from "@/components/Pricing";

const Home = () => {
  return (
    <div>
      <Header />
      <Hero />
      <HowWork />
      <ClientsSection />
      <Pricing />
      <Footer />
    </div>
  );
};

export default Home;

import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import HostsDesignOptions from "@/components/HostsDesignOptions";
import SpeakersSection from "@/components/SpeakersSection";
import PodcastSection from "@/components/PodcastSection";
import EventsSection from "@/components/EventsSection";
import AboutSection from "@/components/AboutSection";
import CTASection from "@/components/CTASection";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main>
        <HeroSection />
        <HostsDesignOptions />
        <SpeakersSection />
        <PodcastSection />
        <EventsSection />
        <AboutSection />
        <CTASection />
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;

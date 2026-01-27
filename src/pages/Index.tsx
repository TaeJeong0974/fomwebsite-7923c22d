import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import IntroSection from "@/components/IntroSection";
import SpeakersSection from "@/components/SpeakersSection";
import PodcastSection from "@/components/PodcastSection";
import EventsSection from "@/components/EventsSection";
import CTASection from "@/components/CTASection";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main>
        <HeroSection />
        <IntroSection />
        <SpeakersSection />
        <PodcastSection />
        <EventsSection />
        <CTASection />
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;

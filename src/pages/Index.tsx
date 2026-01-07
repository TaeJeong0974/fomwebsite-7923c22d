import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import LargeTextSection from "@/components/LargeTextSection";
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
      
      {/* Vertical rhythm handled globally with consistent spacing */}
      <main className="space-y-16 sm:space-y-20 lg:space-y-24 py-12 sm:py-16 lg:py-20">
        <HeroSection />
        <LargeTextSection />
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

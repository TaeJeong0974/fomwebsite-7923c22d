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
      
      {/* Vertical rhythm handled by individual sections with py-24 lg:py-32 */}
      <main>
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

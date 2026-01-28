import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import PodcastSection from "@/components/PodcastSection";
import EventsSection from "@/components/EventsSection";
import CTASection from "@/components/CTASection";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main>
        <HeroSection />
        <PodcastSection />
        <EventsSection />
        <CTASection />
      </main>
    </div>
  );
};

export default Index;

import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import PodcastSection from "@/components/PodcastSection";
import EventsSection from "@/components/EventsSection";
import CTASection from "@/components/CTASection";
import siteBg from "@/assets/site-bg.png";

const Index = () => {
  return (
    <div className="min-h-screen relative">
      {/* Fixed gradient background */}
      <div className="fixed inset-0 -z-10">
        {/* Base gradient image */}
        <div 
          className="absolute inset-0"
          style={{
            backgroundImage: `url(${siteBg})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
        {/* Overlay that reveals only bottom-right corner */}
        <div 
          className="absolute inset-0"
          style={{
            background: 'linear-gradient(135deg, #ddd9d4 0%, #ddd9d4 50%, transparent 80%)',
          }}
        />
      </div>
      
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

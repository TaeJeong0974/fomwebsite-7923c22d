import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import PodcastSection from "@/components/PodcastSection";
import EventsSection from "@/components/EventsSection";
import CTASection from "@/components/CTASection";

const Index = () => {
  return (
    <div className="min-h-screen relative">
      {/* Fixed gradient background - pure CSS recreation */}
      <div className="fixed inset-0 -z-10">
        {/* Base gradient layer */}
        <div 
          className="absolute inset-0"
          style={{
            background: `
              radial-gradient(ellipse 80% 100% at 100% 100%, rgba(200, 120, 100, 0.4) 0%, transparent 50%),
              radial-gradient(ellipse 60% 80% at 90% 80%, rgba(180, 100, 120, 0.3) 0%, transparent 40%),
              radial-gradient(ellipse 50% 60% at 100% 70%, rgba(120, 140, 170, 0.35) 0%, transparent 45%),
              radial-gradient(ellipse 40% 50% at 85% 90%, rgba(200, 140, 130, 0.25) 0%, transparent 40%),
              linear-gradient(135deg, #e8e4df 0%, #e5e1dc 40%, #ddd5d0 70%, #d5cec8 100%)
            `,
          }}
        />
        {/* Grain texture overlay */}
        <div 
          className="absolute inset-0 opacity-40 mix-blend-overlay pointer-events-none"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
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

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
      <div 
        className="fixed inset-0 -z-10"
        style={{
          backgroundImage: `url(${siteBg})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundAttachment: 'fixed',
        }}
      />
      
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

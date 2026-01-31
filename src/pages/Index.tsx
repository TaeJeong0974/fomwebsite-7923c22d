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
        className="fixed inset-0 -z-10 bg-[#e8e4df]"
        style={{
          backgroundImage: `url(${siteBg})`,
          backgroundSize: '70% auto',
          backgroundPosition: 'bottom right',
          backgroundRepeat: 'no-repeat',
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

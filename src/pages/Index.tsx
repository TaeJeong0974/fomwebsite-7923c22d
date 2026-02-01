import HeroSection from "@/components/HeroSection";
import PodcastSection from "@/components/PodcastSection";
import EventsSection from "@/components/EventsSection";
import CTASection from "@/components/CTASection";
import StickyVerticalText from "@/components/StickyVerticalText";

const Index = () => {
  return (
    <div className="min-h-screen relative">
      {/* Fixed background */}
      <div className="fixed inset-0 -z-10 bg-[#f4f2ef]" />
      
      <StickyVerticalText />
      
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

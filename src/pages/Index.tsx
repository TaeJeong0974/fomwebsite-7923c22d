import { lazy, Suspense } from "react";
import HeroSection from "@/components/HeroSection";
import StickyVerticalText from "@/components/StickyVerticalText";

// Lazy load below-the-fold sections
const PodcastSection = lazy(() => import("@/components/PodcastSection"));
const EventsSection = lazy(() => import("@/components/EventsSection"));
const CTASection = lazy(() => import("@/components/CTASection"));

const Index = () => {
  return (
    <div className="min-h-screen relative overflow-x-hidden">
      
      <StickyVerticalText />
      
      <main>
        <HeroSection />
        <Suspense fallback={<div className="min-h-[50vh]" />}>
          <PodcastSection />
          <EventsSection />
          <CTASection />
        </Suspense>
      </main>
    </div>
  );
};

export default Index;

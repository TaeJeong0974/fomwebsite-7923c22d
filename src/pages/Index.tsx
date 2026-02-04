import { lazy, Suspense, useEffect } from "react";
import HeroSection from "@/components/HeroSection";
import PodcastSection from "@/components/PodcastSection";
import StickyVerticalText from "@/components/StickyVerticalText";

// Lazy load below-the-fold sections
const EventsSection = lazy(() => import("@/components/EventsSection"));
const CTASection = lazy(() => import("@/components/CTASection"));

const Index = () => {
  // Handle scroll-to-section navigation from detail pages
  useEffect(() => {
    const scrollTarget = sessionStorage.getItem('scrollToSection');
    if (scrollTarget) {
      sessionStorage.removeItem('scrollToSection');
      // Wait for page to fully render before scrolling
      requestAnimationFrame(() => {
        setTimeout(() => {
          const element = document.querySelector(scrollTarget);
          element?.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }, 150);
      });
    }
  }, []);
  return (
    <div className="min-h-screen relative overflow-x-hidden">
      
      <StickyVerticalText />
      
      <main>
        <HeroSection />
        <PodcastSection />
        <Suspense fallback={<div className="min-h-[50vh]" />}>
          <EventsSection />
          <CTASection />
        </Suspense>
      </main>
    </div>
  );
};

export default Index;

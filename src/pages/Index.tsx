import { lazy, Suspense } from "react";
import HeroSection from "@/components/HeroSection";
import StickyVerticalText from "@/components/StickyVerticalText";
import Footer from "@/components/Footer";
import SectionsFallback from "@/components/skeletons/SectionSkeletons";
import { lazyRetry } from "@/lib/lazyRetry";

// Lazy load below-the-fold sections with retry for stale chunks
const PodcastSection = lazy(() => lazyRetry(() => import("@/components/PodcastSection")));
const EventsSection = lazy(() => lazyRetry(() => import("@/components/EventsSection")));
const CTASection = lazy(() => lazyRetry(() => import("@/components/CTASection")));

const Index = () => {
  return (
    <div className="min-h-screen relative overflow-x-hidden">
      
      <StickyVerticalText />
      
      <main>
        <HeroSection />
        <Suspense fallback={<SectionsFallback />}>
          <PodcastSection />
          <EventsSection />
          <CTASection />
        </Suspense>
      </main>
      <Footer />
    </div>
  );
};

export default Index;

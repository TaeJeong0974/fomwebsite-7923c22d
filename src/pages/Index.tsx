import { lazy, Suspense } from "react";
import { Helmet } from "react-helmet-async";
import HeroSection from "@/components/HeroSection";
import StickyVerticalText from "@/components/StickyVerticalText";
import Footer from "@/components/Footer";
import SectionsFallback from "@/components/skeletons/SectionSkeletons";
import { lazyRetry } from "@/lib/lazyRetry";
import { SITE_URL, DEFAULT_OG_IMAGE, SITE_TITLE, SITE_DESCRIPTION } from "@/lib/seoConstants";

// Lazy load below-the-fold sections with retry for stale chunks
const PodcastSection = lazy(() => lazyRetry(() => import("@/components/PodcastSection")));
const EventsSection = lazy(() => lazyRetry(() => import("@/components/EventsSection")));
const CTASection = lazy(() => lazyRetry(() => import("@/components/CTASection")));

const Index = () => {
  return (
    <div className="min-h-screen relative overflow-x-hidden">
      <Helmet>
        <title>{SITE_TITLE}</title>
        <meta name="description" content={SITE_DESCRIPTION} />
        <link rel="canonical" href={SITE_URL} />
        <meta property="og:title" content={SITE_TITLE} />
        <meta property="og:description" content={SITE_DESCRIPTION} />
        <meta property="og:image" content={DEFAULT_OG_IMAGE} />
        <meta property="og:url" content={SITE_URL} />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={SITE_TITLE} />
        <meta name="twitter:description" content={SITE_DESCRIPTION} />
        <meta name="twitter:image" content={DEFAULT_OG_IMAGE} />
      </Helmet>

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
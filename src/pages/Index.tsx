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

const homepageJsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebSite",
      name: "Future of Marketing",
      url: SITE_URL,
      description: SITE_DESCRIPTION,
      publisher: { "@type": "Organization", name: "Future of Marketing" },
    },
    {
      "@type": "PodcastSeries",
      name: "Future of Marketing Podcast",
      url: SITE_URL,
      description: SITE_DESCRIPTION,
      webFeed: `${SITE_URL}/rss.xml`,
      image: `${SITE_URL}/images/og-homepage.png`,
      author: [
        { "@type": "Organization", name: "Graphite Growth" },
        { "@type": "Organization", name: "XYZ Venture Capital" },
        { "@type": "Organization", name: "Upside" },
      ],
    },
  ],
};

const Index = () => {
  return (
    <div className="min-h-screen relative overflow-x-hidden">
      <Helmet>
        <title>{SITE_TITLE}</title>
        <meta name="description" content={SITE_DESCRIPTION} />
        <link rel="canonical" href={SITE_URL} />
        <meta property="og:title" content={SITE_TITLE} />
        <meta property="og:description" content={SITE_DESCRIPTION} />
        <meta property="og:image" content={`${SITE_URL}/images/og-homepage.png`} />
        <meta property="og:url" content={SITE_URL} />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={SITE_TITLE} />
        <meta name="twitter:description" content={SITE_DESCRIPTION} />
        <meta name="twitter:image" content={`${SITE_URL}/images/og-homepage.png`} />
      </Helmet>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(homepageJsonLd) }}
      />

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
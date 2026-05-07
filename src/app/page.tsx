import HeroSection from "@/components/HeroSection";
import StickyVerticalText from "@/components/StickyVerticalText";
import Footer from "@/components/Footer";
import PodcastSection from "@/components/PodcastSection";
import EventsSection from "@/components/EventsSection";
import CTASection from "@/components/CTASection";
import { SITE_URL, SITE_DESCRIPTION } from "@/lib/seoConstants";

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
      image: `${SITE_URL}/images/og-homepage.jpg`,
      author: [
        { "@type": "Organization", name: "Graphite Growth" },
        { "@type": "Organization", name: "XYZ Venture Capital" },
        { "@type": "Organization", name: "Upside" },
      ],
    },
  ],
};

export default function Home() {
  return (
    <div className="min-h-screen relative overflow-x-hidden">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(homepageJsonLd) }}
      />

      <StickyVerticalText />

      <main>
        <HeroSection />
        <PodcastSection />
        <EventsSection />
        <CTASection />
      </main>
      <Footer />
    </div>
  );
}

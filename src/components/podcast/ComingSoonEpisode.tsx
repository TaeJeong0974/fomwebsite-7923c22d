import { useParams } from "react-router-dom";
import { motion } from "framer-motion";
import { Bell } from "lucide-react";
import { useSubscribe } from "@/contexts/SubscribeContext";
import EpisodeOverlayLayout from "@/components/podcast/EpisodeOverlayLayout";
import Footer from "@/components/Footer";
import EpisodeGuestCard from "@/components/podcast/EpisodeGuestCard";
import EpisodeHostsCard from "@/components/podcast/EpisodeHostsCard";
import EpisodeTopics from "@/components/podcast/EpisodeTopics";
import EpisodePullQuote from "@/components/podcast/EpisodePullQuote";
import ComingSoonHeroCard from "@/components/podcast/ComingSoonHeroCard";
import RelatedEpisodes from "@/components/podcast/RelatedEpisodes";
import DetailVerticalText from "@/components/podcast/DetailVerticalText";
import ListenSubscribeCards from "@/components/ListenSubscribeCards";
import FadeInSection from "@/components/podcast/FadeInSection";
import { LiquidButton } from "@/components/ui/LiquidButton";
import { getEpisodeBySlug, getPublishedEpisodes, getComingSoonEpisodes, PodcastEpisode } from "@/lib/podcastData";

interface ComingSoonEpisodeProps {
  episode?: PodcastEpisode;
}

const ComingSoonEpisode = ({ episode: propEpisode }: ComingSoonEpisodeProps) => {
  const { slug } = useParams();
  const episode = propEpisode || (slug ? getEpisodeBySlug(slug) : undefined);
  const { openSubscribe } = useSubscribe();

  const otherEpisodes = [
    ...getPublishedEpisodes().filter(ep => ep.slug !== episode?.slug),
    ...getComingSoonEpisodes().filter(ep => ep.slug !== episode?.slug),
  ].slice(0, 3);

  // Generic coming soon — no episode data
  if (!episode) {
    return (
      <div className="min-h-screen">
        <main className="section-spacing">
          <div className="container mx-auto container-padding">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="max-w-2xl mx-auto text-center"
            >
              <div className="relative w-20 h-20 mb-6 mx-auto flex items-center justify-center">
                <span className="absolute inset-0 rounded-full bg-foreground/5 animate-[ring-ping_2.5s_cubic-bezier(0.22,1,0.36,1)_infinite]" />
                <span className="absolute inset-0 rounded-full bg-foreground/5 animate-[ring-ping_2.5s_cubic-bezier(0.22,1,0.36,1)_0.8s_infinite]" />
                <div className="relative w-20 h-20 rounded-full glass flex items-center justify-center">
                  <Bell className="w-8 h-8 text-foreground animate-[bell-swing_2.5s_ease-in-out_infinite]" />
                </div>
              </div>
              <h1 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-4">
                New Episode<br />Coming Soon
              </h1>
              <p className="text-foreground text-lg max-w-md mx-auto mb-8">
                We're preparing something special. Subscribe to get notified when this episode drops.
              </p>
              <LiquidButton onClick={openSubscribe} variant="glass" size="lg" className="gap-2.5">
                <Bell className="w-5 h-5" />
                Notify Me
              </LiquidButton>
            </motion.div>
          </div>
        </main>
      </div>
    );
  }

  const guestFirstName = episode.name.split(" ")[0];

  return (
    <>
      <DetailVerticalText guestName={episode.name} isUpcoming />

      <EpisodeOverlayLayout>
        {/* Title */}
        <FadeInSection className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8 mb-4 sm:mb-6">
          <div className="lg:col-span-2 space-y-1 sm:space-y-2">
            <span className="badge-status font-semibold text-foreground mb-4 inline-block">
              Upcoming
            </span>
            <h1 className="text-2xl sm:text-3xl lg:text-[2.3rem] font-display font-medium text-foreground leading-[1.1]">
              {episode.overview || `A Conversation with ${episode.name}`}
            </h1>
          </div>
          <div className="hidden lg:block" />
        </FadeInSection>

        {/* Hero Card + Sidebar Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8 items-start">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-10 sm:space-y-14 lg:space-y-20">
            <FadeInSection className="space-y-4 sm:space-y-6">
              <ComingSoonHeroCard guestFirstName={guestFirstName} />
            </FadeInSection>

            <FadeInSection delay={0.15}>
              <h3 className="text-section-header font-medium text-foreground mb-5 sm:mb-6">
                About This Episode
              </h3>
              <div className="text-foreground/80 whitespace-pre-line leading-relaxed text-base lg:text-lg max-w-prose">
                {episode.fullDescription || `Join us for an insightful conversation with ${episode.name}, ${episode.title} at ${episode.company}. In this episode, we dive deep into their journey, exploring the strategies and insights that have shaped their career and the industry.\n\nDiscover the lessons learned, challenges overcome, and the vision for the future that drives their work every day.`}
              </div>
            </FadeInSection>

            {episode.pullQuote && (
              <FadeInSection delay={0.3}>
                <EpisodePullQuote quote={episode.pullQuote} attribution={episode.name} />
              </FadeInSection>
            )}

            <FadeInSection delay={0.45}>
              <EpisodeTopics topics={episode.topics} title="Topics We'll Cover" />
            </FadeInSection>

            {episode.bio && (
              <FadeInSection delay={0.5}>
                <h3 className="text-section-header font-medium text-foreground mb-5 sm:mb-6">
                  About the Guest
                </h3>
                <p className="text-foreground/80 leading-relaxed text-base lg:text-lg max-w-prose">
                  <span className="font-medium text-foreground">{episode.name}</span> {episode.bio}
                </p>
              </FadeInSection>
            )}

            {/* Guest & Hosts - Mobile only */}
            <div className="lg:hidden space-y-4">
              <EpisodeGuestCard
                name={episode.name}
                title={episode.title}
                company={episode.company}
                linkedInUrl={episode.linkedInUrl}
                bio={episode.bio}
              />
              <EpisodeHostsCard />
            </div>
          </div>

          {/* Sidebar */}
          <FadeInSection delay={0.1} className="hidden lg:flex lg:flex-col space-y-6">
            <EpisodeGuestCard
              name={episode.name}
              title={episode.title}
              company={episode.company}
              linkedInUrl={episode.linkedInUrl}
              bio={episode.bio}
            />
            <EpisodeHostsCard />
          </FadeInSection>
        </div>

        <RelatedEpisodes episodes={otherEpisodes} />

        <FadeInSection id="stay-connected" className="mt-8 sm:mt-10 lg:mt-12 pt-8 sm:pt-10 lg:pt-12">
          <ListenSubscribeCards guestName={guestFirstName} />
        </FadeInSection>
      </EpisodeOverlayLayout>
      <Footer />
    </>
  );
};

export default ComingSoonEpisode;

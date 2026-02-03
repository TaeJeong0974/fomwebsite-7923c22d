import { useParams } from "react-router-dom";
import { motion } from "framer-motion";
import { Bell } from "lucide-react";
import { useSubscribe } from "@/contexts/SubscribeContext";
import EpisodeOverlayLayout from "@/components/podcast/EpisodeOverlayLayout";
import EpisodeGuestCard from "@/components/podcast/EpisodeGuestCard";
import EpisodeHostsCard from "@/components/podcast/EpisodeHostsCard";
import EpisodeTopics from "@/components/podcast/EpisodeTopics";
import EpisodePullQuote from "@/components/podcast/EpisodePullQuote";
import ComingSoonHeroCard from "@/components/podcast/ComingSoonHeroCard";
import RelatedEpisodes from "@/components/podcast/RelatedEpisodes";
import DetailVerticalText from "@/components/podcast/DetailVerticalText";
import ListenSubscribeCards from "@/components/ListenSubscribeCards";
import { LiquidButton } from "@/components/ui/LiquidButton";
import { getEpisodeBySlug, getPublishedEpisodes, getComingSoonEpisodes, PodcastEpisode } from "@/lib/podcastData";
import { liquidEase } from "@/components/animations/PageLoadAnimation";

const fadeUpVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0 }
};

interface ComingSoonEpisodeProps {
  episode?: PodcastEpisode;
}

const ComingSoonEpisode = ({ episode: propEpisode }: ComingSoonEpisodeProps) => {
  const { slug } = useParams();
  
  // Use prop episode or fetch by slug
  const episode = propEpisode || (slug ? getEpisodeBySlug(slug) : undefined);
  
  // Get other episodes - always show exactly 3, mixing published and coming soon, excluding current
  const allOtherEpisodes = [
    ...getPublishedEpisodes().filter(ep => ep.slug !== episode?.slug),
    ...getComingSoonEpisodes().filter(ep => ep.slug !== episode?.slug)
  ];
  const otherEpisodes = allOtherEpisodes.slice(0, 3);
  
  const { openSubscribe } = useSubscribe();
  
  // Generic coming soon if no episode found
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
              <div className="w-20 h-20 rounded-full glass mb-6 flex items-center justify-center mx-auto">
                <Bell className="w-8 h-8 text-foreground" />
              </div>
              <h1 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-4">
                New Episode<br />Coming Soon
              </h1>
              <p className="text-foreground text-lg max-w-md mx-auto mb-8">
                We're preparing something special. Subscribe to get notified when this episode drops.
              </p>
              <LiquidButton 
                onClick={openSubscribe}
                variant="glass"
                size="lg"
                className="gap-2.5"
              >
                <Bell className="w-5 h-5" />
                Notify Me
              </LiquidButton>
            </motion.div>
          </div>
        </main>
      </div>
    );
  }

  const guestFirstName = episode.name.split(' ')[0];

  return (
    <>
      <DetailVerticalText guestName={episode.name} isUpcoming />
      <EpisodeOverlayLayout>
        {/* Episode Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8 items-start">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-10 sm:space-y-14 lg:space-y-20">
          {/* Hero Card with Get Notified CTA */}
          <motion.div
            className="space-y-4 sm:space-y-6"
            variants={fadeUpVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.15 }}
            transition={{ duration: 1.0, ease: liquidEase }}
          >
            <ComingSoonHeroCard guestFirstName={guestFirstName} />
          </motion.div>

          {/* About This Episode */}
          <motion.div
            variants={fadeUpVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.15 }}
            transition={{ duration: 1.0, delay: 0.15, ease: liquidEase }}
          >
            <h3 className="text-section-header mb-4">
              About This Episode
            </h3>
            <div className="text-foreground/80 whitespace-pre-line leading-relaxed text-base lg:text-lg max-w-prose">
              {episode.fullDescription || `Join us for an insightful conversation with ${episode.name}, ${episode.title} at ${episode.company}. In this episode, we dive deep into their journey, exploring the strategies and insights that have shaped their career and the industry.\n\nDiscover the lessons learned, challenges overcome, and the vision for the future that drives their work every day.`}
            </div>
          </motion.div>

          {/* Topics */}
          <motion.div
            variants={fadeUpVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.15 }}
            transition={{ duration: 1.0, delay: 0.3, ease: liquidEase }}
          >
            <EpisodeTopics topics={episode.topics} title="Topics We'll Cover" />
          </motion.div>

          {/* Pull Quote */}
          <motion.div
            variants={fadeUpVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.15 }}
            transition={{ duration: 1.0, delay: 0.45, ease: liquidEase }}
          >
            <EpisodePullQuote
              quote={episode.overview || ""}
              attribution={episode.name}
            />
          </motion.div>

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
        <motion.div 
          className="space-y-6"
          variants={fadeUpVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
          transition={{ duration: 1.0, delay: 0.2, ease: liquidEase }}
        >
          {/* Featured Guest - Desktop only in sidebar */}
          <div className="hidden lg:block">
            <EpisodeGuestCard
              name={episode.name}
              title={episode.title}
              company={episode.company}
              linkedInUrl={episode.linkedInUrl}
              bio={episode.bio}
            />
          </div>

          {/* Hosts - Desktop only */}
          <div className="hidden lg:block">
            <EpisodeHostsCard />
          </div>
        </motion.div>
      </div>

      {/* Related Episodes */}
      <RelatedEpisodes episodes={otherEpisodes} />

      {/* Listen & Subscribe Section */}
      <motion.div 
        id="stay-connected" 
        className="mt-8 sm:mt-10 lg:mt-12 pt-8 sm:pt-10 lg:pt-12"
        variants={fadeUpVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.15 }}
        transition={{ duration: 1.0, ease: liquidEase }}
      >
        <ListenSubscribeCards />
      </motion.div>
    </EpisodeOverlayLayout>
    </>
  );
};

export default ComingSoonEpisode;

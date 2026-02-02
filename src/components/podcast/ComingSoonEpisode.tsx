import { useParams } from "react-router-dom";
import { motion } from "framer-motion";
import { Bell } from "lucide-react";
import { useSubscribe } from "@/contexts/SubscribeContext";
import EpisodeOverlayLayout from "@/components/podcast/EpisodeOverlayLayout";
import EpisodeGuestCard from "@/components/podcast/EpisodeGuestCard";
import EpisodeTopics from "@/components/podcast/EpisodeTopics";
import EpisodePullQuote from "@/components/podcast/EpisodePullQuote";
import ComingSoonHeroCard from "@/components/podcast/ComingSoonHeroCard";
import RelatedEpisodes from "@/components/podcast/RelatedEpisodes";
import DetailVerticalText from "@/components/podcast/DetailVerticalText";
import ListenSubscribeCards from "@/components/ListenSubscribeCards";
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
              <button 
                onClick={openSubscribe}
                className="btn-base btn-glass btn-lg inline-flex items-center gap-2.5"
              >
                <Bell className="w-5 h-5" />
                Notify Me
              </button>
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
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8 lg:gap-12 items-start">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-8 sm:space-y-10 lg:space-y-12">
          {/* Hero Card with Get Notified CTA */}
          <motion.div
            variants={fadeUpVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.15 }}
            transition={{ duration: 1.0, ease: liquidEase }}
          >
            <ComingSoonHeroCard guestFirstName={guestFirstName} />
          </motion.div>

          {/* Pull Quote */}
          <motion.div
            variants={fadeUpVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.15 }}
            transition={{ duration: 1.0, delay: 0.15, ease: liquidEase }}
          >
            <EpisodePullQuote
              quote={episode.overview || ""}
              attribution={episode.name}
            />
          </motion.div>

          {/* About This Episode */}
          <motion.div
            variants={fadeUpVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.15 }}
            transition={{ duration: 1.0, delay: 0.3, ease: liquidEase }}
          >
            <h2 className="font-display text-xl font-semibold text-foreground mb-4">
              About This Episode
            </h2>
            <div className="text-foreground whitespace-pre-line leading-relaxed">
              {episode.fullDescription || `Join us for an insightful conversation with ${episode.name}, ${episode.title} at ${episode.company}. In this episode, we dive deep into their journey, exploring the strategies and insights that have shaped their career and the industry.\n\nDiscover the lessons learned, challenges overcome, and the vision for the future that drives their work every day.`}
            </div>
          </motion.div>

          {/* Topics */}
          <motion.div
            variants={fadeUpVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.15 }}
            transition={{ duration: 1.0, delay: 0.45, ease: liquidEase }}
          >
            <EpisodeTopics topics={episode.topics} title="Topics We'll Cover" />
          </motion.div>
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
          <EpisodeGuestCard
            name={episode.name}
            title={episode.title}
            company={episode.company}
            linkedInUrl={episode.linkedInUrl}
            bio={episode.bio}
            isUpcoming
          />
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

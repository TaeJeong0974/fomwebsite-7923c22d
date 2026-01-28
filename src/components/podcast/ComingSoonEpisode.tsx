import { useParams } from "react-router-dom";
import { motion } from "framer-motion";
import EpisodeOverlayLayout from "@/components/podcast/EpisodeOverlayLayout";
import EpisodeGuestCard from "@/components/podcast/EpisodeGuestCard";
import EpisodeTopics from "@/components/podcast/EpisodeTopics";
import EpisodePullQuote from "@/components/podcast/EpisodePullQuote";
import ComingSoonHeroCard from "@/components/podcast/ComingSoonHeroCard";
import GenericComingSoon from "@/components/podcast/GenericComingSoon";
import RelatedEpisodes from "@/components/podcast/RelatedEpisodes";
import { getEpisodeBySlug, getPublishedEpisodes, PodcastEpisode } from "@/lib/podcastData";

interface ComingSoonEpisodeProps {
  episode?: PodcastEpisode;
}

const ComingSoonEpisode = ({ episode: propEpisode }: ComingSoonEpisodeProps) => {
  const { slug } = useParams();
  
  // Use prop episode or fetch by slug
  const episode = propEpisode || (slug ? getEpisodeBySlug(slug) : undefined);
  
  // Get other published episodes for "Other Great Speakers"
  const otherEpisodes = getPublishedEpisodes().slice(0, 3);
  
  // Generic coming soon if no episode found
  if (!episode) {
    return <GenericComingSoon />;
  }

  const guestFirstName = episode.name.split(' ')[0];

  return (
    <EpisodeOverlayLayout>
      {/* Episode Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8 lg:gap-12 items-start">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-8 sm:space-y-10 lg:space-y-12">
          {/* Hero Card with Get Notified CTA */}
          <ComingSoonHeroCard guestFirstName={guestFirstName} />

          {/* Pull Quote */}
          <EpisodePullQuote
            quote={episode.overview || ""}
            attribution={episode.name}
          />

          {/* About This Episode */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <h2 className="font-display text-xl font-semibold text-foreground mb-4">
              About This Episode
            </h2>
            <div className="text-foreground whitespace-pre-line leading-relaxed">
              {episode.bio || `Join us for an insightful conversation with ${episode.name}, ${episode.title} at ${episode.company}. In this episode, we dive deep into their journey, exploring the strategies and insights that have shaped their career and the industry.\n\nDiscover the lessons learned, challenges overcome, and the vision for the future that drives their work every day.`}
            </div>
          </motion.div>

          {/* Topics */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <EpisodeTopics topics={episode.topics} title="Topics We'll Cover" />
          </motion.div>
        </div>

        {/* Sidebar */}
        <motion.div 
          className="space-y-6"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
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
    </EpisodeOverlayLayout>
  );
};

export default ComingSoonEpisode;

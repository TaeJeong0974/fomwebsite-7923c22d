import { useParams } from "react-router-dom";
import { motion } from "framer-motion";
import EpisodeOverlayLayout from "@/components/podcast/EpisodeOverlayLayout";
import EpisodeVideoPlayer from "@/components/podcast/EpisodeVideoPlayer";
import EpisodeActionButtons from "@/components/podcast/EpisodeActionButtons";
import EpisodeTopics from "@/components/podcast/EpisodeTopics";
import EpisodeGuestCard from "@/components/podcast/EpisodeGuestCard";
import EpisodePullQuote from "@/components/podcast/EpisodePullQuote";
import ComingSoonEpisode from "@/components/podcast/ComingSoonEpisode";
import RelatedEpisodes from "@/components/podcast/RelatedEpisodes";
import { getEpisodeBySlug, getPublishedEpisodes, getComingSoonEpisodes } from "@/lib/podcastData";

const PodcastDetail = () => {
  const { slug } = useParams();
  const episode = getEpisodeBySlug(slug || "");
  
  // Get other episodes - mix of published and coming soon
  const publishedEpisodes = getPublishedEpisodes().filter(ep => ep.slug !== slug).slice(0, 2);
  const comingSoonEpisodes = getComingSoonEpisodes().slice(0, 1);
  const otherEpisodes = [...publishedEpisodes, ...comingSoonEpisodes];

  // Show coming soon page if episode not found or is coming soon
  if (!episode) {
    return <ComingSoonEpisode />;
  }
  
  if (episode.comingSoon) {
    return <ComingSoonEpisode episode={episode} />;
  }

  return (
    <EpisodeOverlayLayout>
      {/* Episode Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12 items-start">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-12">
          {/* Video Player */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <EpisodeVideoPlayer />
          </motion.div>

          {/* Pull Quote */}
          <EpisodePullQuote
            quote="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris."
            attribution={episode.name}
            metaLabel={episode.duration || ""}
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
              {episode.fullDescription || `Join us for an insightful conversation with ${episode.name}, ${episode.title} at ${episode.company}. In this episode, we dive deep into their journey, exploring the strategies and insights that have shaped their career and the industry.\n\nDiscover the lessons learned, challenges overcome, and the vision for the future that drives their work every day.`}
            </div>
          </motion.div>

          {/* Topics */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <EpisodeTopics topics={episode.topics} />
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
          />

          {/* Action Buttons - Sticky */}
          <div className="lg:sticky lg:top-8">
            <EpisodeActionButtons 
              youtubeUrl={episode.youtubeUrl}
              spotifyUrl={episode.spotifyUrl}
            />
          </div>
        </motion.div>
      </div>

      {/* Related Episodes */}
      <RelatedEpisodes episodes={otherEpisodes} delay={0.4} />
    </EpisodeOverlayLayout>
  );
};

export default PodcastDetail;

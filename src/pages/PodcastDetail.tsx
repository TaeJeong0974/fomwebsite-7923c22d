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
import { getEpisodeBySlug, getPublishedEpisodes, getComingSoonEpisodes, podcastHosts } from "@/lib/podcastData";

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
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8 lg:gap-12 items-start">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-8 sm:space-y-10 lg:space-y-12">
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
          {/* Featured Guest - only for guest episodes */}
          {episode.slug !== 'intro-to-fom' && (
            <EpisodeGuestCard
              name={episode.name}
              title={episode.title}
              company={episode.company}
              linkedInUrl={episode.linkedInUrl}
              bio={episode.bio}
            />
          )}

          {/* Action Buttons */}
          <EpisodeActionButtons 
            youtubeUrl={episode.youtubeUrl}
            spotifyUrl={episode.spotifyUrl}
          />

          {/* Your Hosts - always shown */}
          <div className="glass rounded-xl p-5 sm:p-6 space-y-4 sm:space-y-6">
            <p className="text-label">Your Hosts</p>
            <div className="space-y-4">
              {podcastHosts.map((host, index) => (
                <div key={index} className={index > 0 ? "pt-4 border-t border-border/50" : ""}>
                  <h3 className="font-display text-xl sm:text-2xl font-semibold text-foreground">
                    {host.name}
                  </h3>
                  <p className="text-sm text-foreground mt-1">
                    {host.title}, <span className="font-medium">{host.company}</span>
                  </p>
                  {host.linkedInUrl && (
                    <a
                      href={host.linkedInUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm text-foreground hover:text-foreground/70 hover-transition inline-block mt-1"
                    >
                      LinkedIn →
                    </a>
                  )}
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>

      {/* Related Episodes */}
      <RelatedEpisodes episodes={otherEpisodes} delay={0.4} />
    </EpisodeOverlayLayout>
  );
};

export default PodcastDetail;

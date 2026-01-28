import { useParams } from "react-router-dom";
import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import EpisodeVideoPlayer from "@/components/podcast/EpisodeVideoPlayer";
import EpisodeActionButtons from "@/components/podcast/EpisodeActionButtons";
import EpisodeTopics from "@/components/podcast/EpisodeTopics";
import EpisodeGuestCard from "@/components/podcast/EpisodeGuestCard";
import EpisodePullQuote from "@/components/podcast/EpisodePullQuote";
import ComingSoonEpisode from "@/components/podcast/ComingSoonEpisode";
import RelatedEpisodes from "@/components/podcast/RelatedEpisodes";
import ListenSubscribeCards from "@/components/ListenSubscribeCards";
import { getEpisodeBySlug, getPublishedEpisodes, getComingSoonEpisodes, podcastHosts } from "@/lib/podcastData";

const PodcastDetail = () => {
  const { slug } = useParams();
  const episode = getEpisodeBySlug(slug || "");
  
  // Get other episodes - always show exactly 3, mixing published and coming soon
  const allOtherEpisodes = [
    ...getPublishedEpisodes().filter(ep => ep.slug !== slug),
    ...getComingSoonEpisodes().filter(ep => ep.slug !== slug)
  ];
  const otherEpisodes = allOtherEpisodes.slice(0, 3);

  // Show coming soon page if episode not found or is coming soon
  if (!episode) {
    return <ComingSoonEpisode />;
  }
  
  if (episode.comingSoon) {
    return <ComingSoonEpisode episode={episode} />;
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="container mx-auto container-padding py-8 sm:py-12">
        {/* Episode Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8 items-start">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-5 sm:space-y-6 lg:space-y-8">
            {/* Video Player */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="space-y-4"
            >
              <EpisodeVideoPlayer />
              
              {/* Compact Action Buttons */}
              <EpisodeActionButtons 
                youtubeUrl={episode.youtubeUrl}
                spotifyUrl={episode.spotifyUrl}
              />
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

        {/* Listen & Subscribe Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="mt-8 sm:mt-12 pt-8 sm:pt-12 border-t border-border"
        >
          <ListenSubscribeCards />
        </motion.div>
      </main>
    </div>
  );
};

export default PodcastDetail;

import { useParams } from "react-router-dom";
import { motion } from "framer-motion";
import { Bell } from "lucide-react";
import EpisodeOverlayLayout from "@/components/podcast/EpisodeOverlayLayout";
import EpisodeVideoPlayer from "@/components/podcast/EpisodeVideoPlayer";
import EpisodeActionButtons from "@/components/podcast/EpisodeActionButtons";
import EpisodeTopics from "@/components/podcast/EpisodeTopics";
import EpisodeGuestCard from "@/components/podcast/EpisodeGuestCard";
import EpisodePullQuote from "@/components/podcast/EpisodePullQuote";
import ComingSoonEpisode from "@/components/podcast/ComingSoonEpisode";
import RelatedEpisodes from "@/components/podcast/RelatedEpisodes";
import { useSubscribe } from "@/contexts/SubscribeContext";
import { getEpisodeBySlug, getPublishedEpisodes, getComingSoonEpisodes, podcastHosts } from "@/lib/podcastData";

const PodcastDetail = () => {
  const { slug } = useParams();
  const { openSubscribe } = useSubscribe();
  const episode = getEpisodeBySlug(slug || "");
  
  // Get other episodes - mix of published and coming soon
  const publishedEpisodes = getPublishedEpisodes().filter(ep => ep.slug !== slug).slice(0, 2);
  const comingSoonEpisodes = getComingSoonEpisodes().slice(0, 1);
  const otherEpisodes = [...publishedEpisodes, ...comingSoonEpisodes];

  const cardBase = "flex flex-col items-center justify-center gap-4 bg-black/5 backdrop-blur-xl border border-black/10 rounded-2xl p-6 sm:p-8 text-center hover:bg-black/10 hover-transition shadow-sm cursor-pointer";

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
        <h3 className="font-display text-xl sm:text-2xl font-semibold text-foreground mb-6 sm:mb-8">
          Listen & Subscribe
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6">
          {/* Subscribe Card */}
          <motion.button
            onClick={openSubscribe}
            className={cardBase}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <div className="w-12 h-12 rounded-full bg-foreground/10 flex items-center justify-center">
              <Bell className="w-6 h-6 text-foreground" />
            </div>
            <div>
              <h4 className="font-display text-lg font-semibold text-foreground">Subscribe</h4>
              <p className="text-sm text-foreground/70 mt-1">Get notified of new episodes</p>
            </div>
          </motion.button>

          {/* YouTube Card */}
          <motion.a
            href="https://youtube.com/@futureofmarketing"
            target="_blank"
            rel="noopener noreferrer"
            className={cardBase}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <div className="w-12 h-12 rounded-full bg-[#FF0000]/10 flex items-center justify-center">
              <svg className="w-6 h-6 text-[#FF0000]" viewBox="0 0 24 24" fill="currentColor">
                <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
              </svg>
            </div>
            <div>
              <h4 className="font-display text-lg font-semibold text-foreground">YouTube</h4>
              <p className="text-sm text-foreground/70 mt-1">Watch full episodes</p>
            </div>
          </motion.a>

          {/* Spotify Card */}
          <motion.a
            href="https://open.spotify.com/show/futureofmarketing"
            target="_blank"
            rel="noopener noreferrer"
            className={cardBase}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <div className="w-12 h-12 rounded-full bg-[#1DB954]/10 flex items-center justify-center">
              <svg className="w-6 h-6 text-[#1DB954]" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z"/>
              </svg>
            </div>
            <div>
              <h4 className="font-display text-lg font-semibold text-foreground">Spotify</h4>
              <p className="text-sm text-foreground/70 mt-1">Listen on the go</p>
            </div>
          </motion.a>
        </div>
      </motion.div>
    </EpisodeOverlayLayout>
  );
};

export default PodcastDetail;

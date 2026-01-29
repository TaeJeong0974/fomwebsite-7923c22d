import { useState } from "react";
import { useParams } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";
import EpisodeOverlayLayout from "@/components/podcast/EpisodeOverlayLayout";
import EpisodeVideoPlayer from "@/components/podcast/EpisodeVideoPlayer";
import EpisodeActionButtons from "@/components/podcast/EpisodeActionButtons";
import EpisodeTopics from "@/components/podcast/EpisodeTopics";
import EpisodeGuestCard from "@/components/podcast/EpisodeGuestCard";
import EpisodePullQuote from "@/components/podcast/EpisodePullQuote";
import ComingSoonEpisode from "@/components/podcast/ComingSoonEpisode";
import RelatedEpisodes from "@/components/podcast/RelatedEpisodes";
import ListenSubscribeCards from "@/components/ListenSubscribeCards";
import { getEpisodeBySlug, getPublishedEpisodes, getComingSoonEpisodes, podcastHosts } from "@/lib/podcastData";
import hostMada from "@/assets/host-mada.png";
import hostEthan from "@/assets/host-ethan.png";
import hostCamille from "@/assets/host-camille.png";

const hostImages = [hostMada, hostEthan, hostCamille];

const PodcastDetail = () => {
  const { slug } = useParams();
  const episode = getEpisodeBySlug(slug || "");
  const [expandedHostIndex, setExpandedHostIndex] = useState<number | null>(null);
  
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

  const hostsToShow = episode.slug === 'intro-to-fom' ? podcastHosts : podcastHosts.slice(0, 2);

  return (
    <EpisodeOverlayLayout>
      {/* Episode Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8 items-start">
      {/* Main Content */}
        <div className="lg:col-span-2 space-y-12 sm:space-y-14 lg:space-y-16">
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
          />

          {/* About This Episode */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <h3 className="text-section-header mb-4">
              About This Episode
            </h3>
            <div className="text-foreground/80 whitespace-pre-line leading-relaxed text-lg max-w-prose">
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

          {/* Your Hosts */}
          <div className="space-y-3">
            <p className="text-label">Your Hosts</p>
            <div className="space-y-4">
              {hostsToShow.map((host, index) => {
                const nameParts = host.name.split(' ');
                const firstName = nameParts[0];
                const lastName = nameParts.slice(1).join(' ');
                const isExpanded = expandedHostIndex === index;
                
                return (
                  <div 
                    key={index}
                    className="card-base card-image cursor-pointer"
                    onClick={() => setExpandedHostIndex(isExpanded ? null : index)}
                  >
                    {/* Background Image */}
                    <div className="absolute inset-0">
                      <img 
                        src={hostImages[index]} 
                        alt={host.name}
                        className="w-full h-full object-cover"
                      />
                      <div className="card-overlay" />
                    </div>

                    {/* Content */}
                    <div className="card-content-bottom card-padding">
                      <div className="flex items-end justify-between">
                        <div>
                          <h3 className="font-display text-white leading-[0.95] tracking-normal">
                            <span className="block text-xl sm:text-2xl font-medium">{firstName}</span>
                            <span className="block text-xl sm:text-2xl font-normal">{lastName}</span>
                          </h3>
                          <p className="text-body-sm text-white mt-1">
                            {host.title}, <span className="font-normal text-white/80">{host.company}</span>
                          </p>
                          {host.linkedInUrl && (
                            <a
                              href={host.linkedInUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              onClick={(e) => e.stopPropagation()}
                              className="text-sm text-white/80 hover:text-white hover-transition inline-block mt-2"
                            >
                              LinkedIn →
                            </a>
                          )}
                        </div>
                        {host.bio && (
                          <motion.div
                            animate={{ rotate: isExpanded ? 180 : 0 }}
                            whileHover={{ scale: isExpanded ? 1 : [1, 1.15, 1] }}
                            transition={{ 
                              rotate: { duration: 0.3 },
                              scale: { duration: 0.6, ease: "easeInOut" }
                            }}
                            className="rounded-full p-1.5 bg-white/10 backdrop-blur-xl border border-white/20"
                          >
                            <ChevronDown className="h-4 w-4 text-white" />
                          </motion.div>
                        )}
                      </div>
                      
                      {/* Expandable Bio */}
                      <AnimatePresence>
                        {isExpanded && host.bio && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.3 }}
                            className="overflow-hidden"
                          >
                            <p className="text-sm leading-relaxed text-white/90 mt-4" style={{ textShadow: '0 1px 2px rgba(0,0,0,0.3)' }}>
                              {host.bio}
                            </p>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  </div>
                );
              })}
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
    </EpisodeOverlayLayout>
  );
};

export default PodcastDetail;

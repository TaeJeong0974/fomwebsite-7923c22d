import { useState } from "react";
import { useParams } from "react-router-dom";
import { motion } from "framer-motion";
import EpisodeOverlayLayout from "@/components/podcast/EpisodeOverlayLayout";
import FloatingMiniPlayer from "@/components/podcast/FloatingMiniPlayer";
import EpisodeActionButtons from "@/components/podcast/EpisodeActionButtons";
import EpisodeTopics from "@/components/podcast/EpisodeTopics";
import EpisodeGuestCard from "@/components/podcast/EpisodeGuestCard";
import EpisodePullQuote from "@/components/podcast/EpisodePullQuote";
import ComingSoonEpisode from "@/components/podcast/ComingSoonEpisode";
import RelatedEpisodes from "@/components/podcast/RelatedEpisodes";
import ListenSubscribeCards from "@/components/ListenSubscribeCards";
import DetailVerticalText from "@/components/podcast/DetailVerticalText";
import MouseFollowImage from "@/components/podcast/MouseFollowImage";
import { getEpisodeBySlug, getPublishedEpisodes, getComingSoonEpisodes, podcastHosts } from "@/lib/podcastData";
import { liquidEase } from "@/components/animations/PageLoadAnimation";
import guestBg from "@/assets/guest-bg.png";

const fadeUpVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0 }
};

const PodcastDetail = () => {
  const [isHovered, setIsHovered] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const { slug } = useParams();

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setMousePosition({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top
    });
  };
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

  // Determine the right-side label content
  const guestName = episode.slug === 'intro-to-fom' ? 'INTRO' : episode.name;
  const guestTitle = episode.slug === 'intro-to-fom' ? 'THE FUTURE OF MARKETING' : `${episode.title}, ${episode.company}`;

  return (
    <>
      {/* Vertical Text Labels */}
      <DetailVerticalText guestName={guestName} />
      
      <EpisodeOverlayLayout>
        {/* Mouse Follow Image Popup */}
        <div 
          className="relative"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          onMouseMove={handleMouseMove}
        >
          <MouseFollowImage 
            isHovered={isHovered} 
            mouseX={mousePosition.x} 
            mouseY={mousePosition.y} 
            imageSrc={guestBg}
            name={episode.name} 
          />
          
        {/* Episode Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8 items-start relative z-10">
      {/* Main Content */}
        <div className="lg:col-span-2 space-y-12 sm:space-y-14 lg:space-y-16">
          {/* Video Player */}
          <motion.div 
            className="space-y-6"
            variants={fadeUpVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.15 }}
            transition={{ duration: 1.0, ease: liquidEase }}
          >
            <FloatingMiniPlayer 
              youtubeUrl={episode.youtubeUrl}
              spotifyUrl={episode.spotifyUrl}
            />
            
            {/* Compact Action Buttons */}
            <EpisodeActionButtons 
              youtubeUrl={episode.youtubeUrl}
              spotifyUrl={episode.spotifyUrl}
            />
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
              quote="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris."
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
            <h3 className="text-section-header mb-4">
              About This Episode
            </h3>
            <div className="text-foreground/80 whitespace-pre-line leading-relaxed text-lg max-w-prose">
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
            <EpisodeTopics topics={episode.topics} />
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
          <div className="glass rounded-xl p-6 sm:p-8 space-y-6">
            <h3 className="text-section-header">Hosts</h3>
            <div className="space-y-5">
              {(episode.slug === 'intro-to-fom' ? podcastHosts : podcastHosts.slice(0, 2)).map((host, index) => (
                <div key={index} className={index > 0 ? "pt-5 border-t border-border/20" : ""}>
                  <h3 className="font-display text-xl sm:text-2xl font-medium text-foreground tracking-normal">
                    {host.name}
                  </h3>
                  <p className="text-sm text-muted-foreground mt-1">
                    {host.title}, {host.company}
                  </p>
                  {host.linkedInUrl && (
                    <a
                      href={host.linkedInUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm text-muted-foreground hover:text-foreground hover-transition inline-block mt-2"
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
        </div>

      {/* Related Episodes */}
      <RelatedEpisodes episodes={otherEpisodes} delay={0.4} />

      {/* Listen & Subscribe Section */}
      <motion.div 
        id="stay-connected" 
        className="mt-8 sm:mt-12 pt-8 sm:pt-12"
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

export default PodcastDetail;

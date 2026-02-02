import { useParams } from "react-router-dom";
import { motion } from "framer-motion";
import EpisodeOverlayLayout from "@/components/podcast/EpisodeOverlayLayout";
import FloatingMiniPlayer from "@/components/podcast/FloatingMiniPlayer";
import EpisodeActionButtons from "@/components/podcast/EpisodeActionButtons";
import EpisodeTopics from "@/components/podcast/EpisodeTopics";
import EpisodeGuestCard from "@/components/podcast/EpisodeGuestCard";
import EpisodeHostsCard from "@/components/podcast/EpisodeHostsCard";
import EpisodePullQuote from "@/components/podcast/EpisodePullQuote";
import ComingSoonEpisode from "@/components/podcast/ComingSoonEpisode";
import RelatedEpisodes from "@/components/podcast/RelatedEpisodes";
import ListenSubscribeCards from "@/components/ListenSubscribeCards";
import DetailVerticalText from "@/components/podcast/DetailVerticalText";
import { getEpisodeBySlug, getPublishedEpisodes, getComingSoonEpisodes } from "@/lib/podcastData";
import { liquidEase } from "@/components/animations/PageLoadAnimation";

const fadeInVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 }
};

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

  // Determine the right-side label content
  const guestName = episode.slug === 'intro-to-fom' ? 'INTRO' : episode.name;
  const guestTitle = episode.slug === 'intro-to-fom' ? 'THE FUTURE OF MARKETING' : `${episode.title}, ${episode.company}`;

  return (
    <>
      {/* Vertical Text Labels */}
      <DetailVerticalText guestName={guestName} />
      
      <EpisodeOverlayLayout>
        {/* Episode Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8 items-start">
      {/* Main Content */}
        <div className="lg:col-span-2 space-y-8 sm:space-y-12 lg:space-y-16">
          {/* Video Player */}
          <motion.div 
            className="space-y-6"
            variants={fadeInVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.15 }}
            transition={{ duration: 1.0, ease: liquidEase }}
          >
            <FloatingMiniPlayer 
              youtubeUrl={episode.youtubeUrl}
              spotifyUrl={episode.spotifyUrl}
            />
            
            {/* Episode Overview + Action Buttons */}
            <div className="space-y-4">
              {episode.overview && (
                <p className="text-foreground/70 text-base sm:text-lg leading-relaxed max-w-prose">
                  {episode.overview}
                </p>
              )}
              <EpisodeActionButtons 
                youtubeUrl={episode.youtubeUrl}
                spotifyUrl={episode.spotifyUrl}
              />
            </div>

            {/* Hosts - Mobile only, below video */}
            <div className="lg:hidden">
              <EpisodeHostsCard showAllHosts={episode.slug === 'intro-to-fom'} />
            </div>
          </motion.div>

          {/* Pull Quote */}
          <motion.div
            variants={fadeInVariants}
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

          {/* Topics */}
          <motion.div
            variants={fadeInVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.15 }}
            transition={{ duration: 1.0, delay: 0.3, ease: liquidEase }}
          >
            <EpisodeTopics topics={episode.topics} />
          </motion.div>

          {/* About This Episode */}
          <motion.div
            className="-mt-4 sm:-mt-6 lg:-mt-8"
            variants={fadeInVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.15 }}
            transition={{ duration: 1.0, delay: 0.45, ease: liquidEase }}
          >
            <h3 className="text-section-header mb-4">
              About This Episode
            </h3>
            <div className="text-foreground/80 whitespace-pre-line leading-relaxed text-lg max-w-prose">
              {episode.fullDescription || `Join us for an insightful conversation with ${episode.name}, ${episode.title} at ${episode.company}. In this episode, we dive deep into their journey, exploring the strategies and insights that have shaped their career and the industry.\n\nDiscover the lessons learned, challenges overcome, and the vision for the future that drives their work every day.`}
            </div>
          </motion.div>
        </div>

        {/* Sidebar */}
        <motion.div 
          className="space-y-6"
          variants={fadeInVariants}
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

          {/* Your Hosts - Desktop only in sidebar */}
          <div className="hidden lg:block">
            <EpisodeHostsCard showAllHosts={episode.slug === 'intro-to-fom'} />
          </div>
        </motion.div>
      </div>

      {/* Related Episodes */}
      <RelatedEpisodes episodes={otherEpisodes} delay={0.4} />

      {/* Listen & Subscribe Section */}
      <motion.div 
        id="stay-connected" 
        className="mt-8 sm:mt-10 lg:mt-12 pt-8 sm:pt-10 lg:pt-12"
        variants={fadeInVariants}
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

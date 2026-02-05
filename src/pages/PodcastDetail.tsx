import { useParams } from "react-router-dom";
import { motion } from "framer-motion";
import EpisodeOverlayLayout from "@/components/podcast/EpisodeOverlayLayout";
import FloatingMiniPlayer from "@/components/podcast/FloatingMiniPlayer";
import EpisodeActionButtons from "@/components/podcast/EpisodeActionButtons";
import EpisodeTopics from "@/components/podcast/EpisodeTopics";
import EpisodeGuestCard from "@/components/podcast/EpisodeGuestCard";
import EpisodeHostsCard from "@/components/podcast/EpisodeHostsCard";
import EpisodePullQuote from "@/components/podcast/EpisodePullQuote";
import EpisodeNewsletters from "@/components/podcast/EpisodeNewsletters";
import AboutTheHosts from "@/components/podcast/AboutTheHosts";
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
        {/* Title & Action Buttons Row - Same grid as content below */}
        <motion.div 
          className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8 mb-4 sm:mb-6"
          variants={fadeInVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
          transition={{ duration: 1.0, ease: liquidEase }}
        >
          {/* Episode Title - Same width as video */}
          <div className="lg:col-span-2 space-y-1 sm:space-y-2">
            <h3 className="text-section-header mb-4">
              Episode {episode.id}
            </h3>
            <h1 className="text-display-lg font-display font-medium text-foreground leading-[1.1]">
              {episode.overview || episode.name}
            </h1>
          </div>
          
          {/* Action Buttons - Aligned with H1 first line */}
          <div className="hidden lg:block mt-6 sm:mt-7">
            <EpisodeActionButtons youtubeUrl={episode.youtubeUrl} spotifyUrl={episode.spotifyUrl} />
          </div>
        </motion.div>

        {/* Video + Sidebar Grid - Now video and cards naturally align */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8 items-start">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-10 sm:space-y-14 lg:space-y-20">
            {/* Video Player */}
            <motion.div 
              className="space-y-4 sm:space-y-6"
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

              {/* Action Buttons - Mobile only */}
              <div className="pt-2 lg:hidden">
                <EpisodeActionButtons youtubeUrl={episode.youtubeUrl} spotifyUrl={episode.spotifyUrl} />
              </div>
            </motion.div>

            {/* About This Episode */}
            <motion.div
              variants={fadeInVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.15 }}
              transition={{ duration: 1.0, delay: 0.15, ease: liquidEase }}
            >
              <h3 className="text-section-header font-medium text-foreground mb-5 sm:mb-6">
                About This Episode
              </h3>
              <div className="text-foreground/80 whitespace-pre-line leading-relaxed text-base lg:text-lg max-w-prose">
                {episode.fullDescription || `Join us for an insightful conversation with ${episode.name}, ${episode.title} at ${episode.company}. In this episode, we dive deep into their journey, exploring the strategies and insights that have shaped their career and the industry.\n\nDiscover the lessons learned, challenges overcome, and the vision for the future that drives their work every day.`}
              </div>
            </motion.div>

            {/* Pull Quote */}
            {episode.pullQuote && (
              <motion.div
                variants={fadeInVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.15 }}
                transition={{ duration: 1.0, delay: 0.3, ease: liquidEase }}
              >
                <EpisodePullQuote
                  quote={episode.pullQuote}
                  attribution={episode.name}
                />
              </motion.div>
            )}

            {/* Topics */}
            <motion.div
              variants={fadeInVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.15 }}
              transition={{ duration: 1.0, delay: 0.45, ease: liquidEase }}
            >
              <EpisodeTopics topics={episode.topics} />
            </motion.div>

            {/* Newsletters Mentioned */}
            {episode.newslettersMentioned && episode.newslettersMentioned.length > 0 && (
              <motion.div
                variants={fadeInVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.15 }}
                transition={{ duration: 1.0, delay: 0.5, ease: liquidEase }}
              >
                <EpisodeNewsletters newsletters={episode.newslettersMentioned} />
              </motion.div>
            )}

            {/* About the Guest - Non-intro episodes with bio */}
            {episode.slug !== 'intro-to-fom' && episode.bio && (
              <motion.div
                variants={fadeInVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.15 }}
                transition={{ duration: 1.0, delay: 0.5, ease: liquidEase }}
              >
                <h3 className="text-section-header font-medium text-foreground mb-5 sm:mb-6">
                  About the Guest
                </h3>
                <p className="text-foreground/80 leading-relaxed text-base lg:text-lg max-w-prose">
                  <span className="font-medium text-foreground">{episode.name}</span> {episode.bio}
                </p>
              </motion.div>
            )}

            {/* About the Hosts - Intro episode only */}
            {episode.slug === 'intro-to-fom' && (
              <motion.div
                variants={fadeInVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.15 }}
                transition={{ duration: 1.0, delay: 0.45, ease: liquidEase }}
              >
                <AboutTheHosts />
              </motion.div>
            )}

            {/* Guest & Hosts - Mobile only */}
            <div className="lg:hidden space-y-4">
              {episode.slug !== 'intro-to-fom' && (
                <EpisodeGuestCard
                  name={episode.name}
                  title={episode.title}
                  company={episode.company}
                  linkedInUrl={episode.linkedInUrl}
                  bio={episode.bio}
                />
              )}
              <EpisodeHostsCard 
                showAllHosts={episode.slug === 'intro-to-fom'} 
                episodeHosts={episode.hosts}
              />
            </div>
          </div>

          {/* Sidebar - Cards aligned with video */}
          <motion.div 
            className="hidden lg:flex lg:flex-col space-y-6"
            variants={fadeInVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.15 }}
            transition={{ duration: 1.0, delay: 0.1, ease: liquidEase }}
          >
            {episode.slug !== 'intro-to-fom' && (
              <EpisodeGuestCard
                name={episode.name}
                title={episode.title}
                company={episode.company}
                linkedInUrl={episode.linkedInUrl}
                bio={episode.bio}
              />
            )}
            <EpisodeHostsCard 
              showAllHosts={episode.slug === 'intro-to-fom'} 
              episodeHosts={episode.hosts}
            />
          </motion.div>
        </div>

      {/* Related Episodes */}
      <RelatedEpisodes episodes={otherEpisodes} />

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

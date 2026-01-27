import { Link, useParams } from "react-router-dom";
import { Clock, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import EpisodeVideoPlayer from "@/components/podcast/EpisodeVideoPlayer";
import EpisodeActionButtons from "@/components/podcast/EpisodeActionButtons";
import EpisodeChapters from "@/components/podcast/EpisodeChapters";
import EpisodeTopics from "@/components/podcast/EpisodeTopics";
import EpisodeGuestCard from "@/components/podcast/EpisodeGuestCard";
import ComingSoonEpisode from "@/components/podcast/ComingSoonEpisode";
import { getEpisodeBySlug, getPublishedEpisodes, getComingSoonEpisodes } from "@/lib/podcastData";
import guestBg from "@/assets/guest-bg.png";

const PodcastDetail = () => {
  const { slug } = useParams();
  const episode = getEpisodeBySlug(slug || "");
  
  // Get other episodes for "You might also like" - mix of published and coming soon
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
    <div className="min-h-screen bg-background">
      <Navbar />

      <main className="section-spacing">
        <div className="container mx-auto container-padding">

          {/* Episode Content */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-8">
              {/* Video Player */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <EpisodeVideoPlayer 
                  guestName={episode.name}
                  companyDomain={episode.companyDomain}
                />
              </motion.div>

              {/* Name & Duration */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="flex items-center justify-between"
              >
                <h2 className="font-display text-4xl font-semibold text-foreground">
                  {episode.name}
                </h2>
                <span className="inline-flex items-center gap-1.5 glass px-3 py-1.5 rounded-full text-sm text-muted-foreground">
                  <Clock size={14} className="text-primary" />
                  {episode.duration}
                </span>
              </motion.div>

              {/* Pull Quote */}
              <motion.blockquote
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <p className="font-display text-2xl md:text-3xl font-medium text-foreground/90 leading-relaxed">
                  "The best ideas come from real conversations—the ones that challenge assumptions and open new doors."
                </p>
              </motion.blockquote>

              {/* Description */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
              >
                <h2 className="font-display text-xl font-semibold text-foreground mb-4">
                  About This Episode
                </h2>
                <div className="text-muted-foreground whitespace-pre-line leading-relaxed">
                  {episode.fullDescription || `Join us for an insightful conversation with ${episode.name}, ${episode.title} at ${episode.company}. In this episode, we dive deep into their journey, exploring the strategies and insights that have shaped their career and the industry.\n\nDiscover the lessons learned, challenges overcome, and the vision for the future that drives their work every day.`}
                </div>
              </motion.div>

              {/* Topics */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.5 }}
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
              {/* Guest Card */}
              <EpisodeGuestCard
                name={episode.name}
                title={episode.title}
                company={episode.company}
                companyDomain={episode.companyDomain}
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

          {/* You Might Also Like */}
          {otherEpisodes.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.6 }}
              className="mt-20 pt-12 border-t border-border"
            >
              <h3 className="font-display text-2xl font-semibold text-foreground mb-8">
                You Might Also Like
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {otherEpisodes.map((ep) => (
                  <Link
                    key={ep.id}
                    to={`/episode/${ep.slug}`}
                    className="block group"
                  >
                    <div 
                      className="card-image hover-scale"
                      style={{
                        backgroundImage: `url(${guestBg})`,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                      }}
                    >
                      <div className="card-overlay-light hover-transition group-hover:opacity-90" />
                      
                      {ep.companyDomain && (
                        <div className="absolute top-4 left-4 glass rounded-xl p-2.5 hover-scale-badge z-[3]">
                          <img 
                            src={`https://www.google.com/s2/favicons?domain=${ep.companyDomain}&sz=64`} 
                            alt={ep.company}
                            className="h-5 w-5 object-contain"
                          />
                        </div>
                      )}
                      
                      {ep.comingSoon && (
                        <span className="absolute top-4 right-4 bg-foreground text-background text-xs font-semibold tracking-wide uppercase px-3 py-1.5 rounded-full z-[3]">
                          Upcoming
                        </span>
                      )}
                      
                      <div className="card-content-bottom card-padding-lg z-[3]">
                        <h3 className="font-display text-2xl sm:text-3xl font-semibold text-white tracking-tight">
                          {ep.name.split(' ').map((word, i) => (
                            <span key={i} className="block">{word}</span>
                          ))}
                        </h3>
                        <p className="text-body-sm text-white/70 mt-1">{ep.title}</p>
                        <p className="text-body-sm font-medium text-primary">{ep.company}</p>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </motion.div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default PodcastDetail;

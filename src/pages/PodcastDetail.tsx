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
                  {episode.fullDescription}
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

              {/* Action Buttons */}
              <EpisodeActionButtons 
                youtubeUrl={episode.youtubeUrl}
                spotifyUrl={episode.spotifyUrl}
              />
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
                    className="group block"
                  >
                    {/* Name & Info */}
                    <div className="mb-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <h4 className="font-display text-xl font-semibold text-foreground group-hover:text-primary hover-transition">
                            {ep.name}
                          </h4>
                          {ep.comingSoon && (
                            <span className="bg-foreground text-background text-[10px] font-semibold tracking-wide uppercase px-2 py-0.5 rounded-full">
                              Soon
                            </span>
                          )}
                        </div>
                        <ArrowRight size={18} className="text-muted-foreground group-hover:text-primary group-hover:translate-x-1 hover-transition shrink-0" />
                      </div>
                      <p className="text-sm text-muted-foreground mt-0.5">
                        {ep.title}, <span className="text-primary">{ep.company}</span>
                      </p>
                    </div>
                    
                    {/* Photo */}
                    <div className="aspect-[4/5] rounded-2xl overflow-hidden bg-muted">
                      <img 
                        src={`https://ui-avatars.com/api/?name=${encodeURIComponent(ep.name)}&size=400&background=f5f5f5&color=1a1a1a&font-size=0.35`}
                        alt={ep.name}
                        className="w-full h-full object-cover group-hover:scale-105 hover-transition"
                      />
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

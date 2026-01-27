import { Link, useParams } from "react-router-dom";
import { Bell, Clock } from "lucide-react";
import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import EpisodeGuestCard from "@/components/podcast/EpisodeGuestCard";
import EpisodeTopics from "@/components/podcast/EpisodeTopics";
import NotifyCTACard from "@/components/podcast/NotifyCTACard";
import { useSubscribe } from "@/contexts/SubscribeContext";
import { getEpisodeBySlug, getPublishedEpisodes, PodcastEpisode } from "@/lib/podcastData";
import guestBg from "@/assets/guest-bg.png";

interface ComingSoonEpisodeProps {
  episode?: PodcastEpisode;
}

const ComingSoonEpisode = ({ episode: propEpisode }: ComingSoonEpisodeProps) => {
  const { slug } = useParams();
  
  // Use prop episode or fetch by slug
  const episode = propEpisode || (slug ? getEpisodeBySlug(slug) : undefined);
  
  // Get other published episodes for "Other Great Speakers"
  const otherEpisodes = getPublishedEpisodes().slice(0, 3);
  
  // Generic coming soon if no episode found
  if (!episode) {
    return <GenericComingSoon />;
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <main className="section-spacing">
        <div className="container mx-auto container-padding">

          {/* Episode Content */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-12">
              {/* Hero Card (replaces Video Player) */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="relative aspect-video rounded-3xl overflow-hidden"
                style={{
                  backgroundImage: `url(${guestBg})`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                }}
              >
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-black/30" />
                
                {/* Company Badge */}
                {episode.companyDomain && (
                  <div className="absolute top-6 left-6 glass rounded-xl p-3">
                    <img 
                      src={`https://www.google.com/s2/favicons?domain=${episode.companyDomain}&sz=64`} 
                      alt={episode.company}
                      className="h-6 w-6 object-contain"
                    />
                  </div>
                )}
                
                {/* Coming Soon Badge with subtle pulse */}
                <motion.div 
                  className="absolute top-6 right-6"
                  animate={{ 
                    boxShadow: [
                      "0 0 0 0 rgba(255, 107, 0, 0)",
                      "0 0 0 8px rgba(255, 107, 0, 0.15)",
                      "0 0 0 0 rgba(255, 107, 0, 0)"
                    ]
                  }}
                  transition={{ 
                    duration: 2.5, 
                    repeat: Infinity,
                    ease: [0.22, 1, 0.36, 1]
                  }}
                  style={{ borderRadius: "9999px" }}
                >
                  <span className="glass px-4 py-2 rounded-full text-sm font-semibold text-foreground inline-flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                    Coming Soon
                  </span>
                </motion.div>
              </motion.div>

              {/* Pull Quote with Speaker Attribution */}
              <motion.blockquote
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="space-y-4"
              >
                <p className="font-display text-3xl md:text-4xl lg:text-5xl font-medium text-foreground/90 leading-relaxed">
                  "{episode.overview}"
                </p>
                <footer className="flex items-center justify-between">
                  <cite className="font-display text-xl font-semibold text-foreground not-italic">
                    — {episode.name}
                  </cite>
                  <span className="inline-flex items-center gap-1.5 glass px-3 py-1.5 rounded-full text-sm text-muted-foreground">
                    <Clock size={14} className="text-primary" />
                    Coming Soon
                  </span>
                </footer>
              </motion.blockquote>

              {/* About This Episode */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <h2 className="font-display text-xl font-semibold text-foreground mb-4">
                  About This Episode
                </h2>
                <div className="text-muted-foreground whitespace-pre-line leading-relaxed">
                  {episode.bio || `Join us for an insightful conversation with ${episode.name}, ${episode.title} at ${episode.company}. In this episode, we dive deep into their journey, exploring the strategies and insights that have shaped their career and the industry.\n\nDiscover the lessons learned, challenges overcome, and the vision for the future that drives their work every day.`}
                </div>
              </motion.div>

              {/* Topics */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
              >
                <EpisodeTopics topics={episode.topics} title="Topics We'll Cover" />
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

              {/* Notify CTA Card - Sticky */}
              <div className="lg:sticky lg:top-8">
                <NotifyCTACard />
              </div>
            </motion.div>
          </div>

          {/* Other Great Speakers */}
          {otherEpisodes.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="mt-20 pt-12 border-t border-border"
            >
              <h3 className="font-display text-2xl font-semibold text-foreground mb-8">
                Other Great Speakers
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

// Generic fallback for unknown episodes
const GenericComingSoon = () => {
  const { openSubscribe } = useSubscribe();
  
  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <main className="section-spacing">
        <div className="container mx-auto container-padding">

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="max-w-2xl mx-auto text-center"
          >
            <div className="w-20 h-20 rounded-full glass-dark mb-6 flex items-center justify-center mx-auto">
              <Bell className="w-8 h-8 text-primary" />
            </div>
            <h1 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-4">
              New Episode<br />Coming Soon
            </h1>
            <p className="text-muted-foreground text-lg max-w-md mx-auto mb-8">
              We're preparing something special. Subscribe to get notified when this episode drops.
            </p>
            <button 
              onClick={openSubscribe}
              className="inline-flex items-center gap-2.5 bg-primary text-primary-foreground px-6 py-3 rounded-xl font-medium hover:bg-primary/90 hover-transition hover-lift"
            >
              <Bell className="w-5 h-5" />
              Notify Me
            </button>
          </motion.div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default ComingSoonEpisode;

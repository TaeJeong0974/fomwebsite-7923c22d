import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Bell, Clock } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import EpisodeOverlayLayout from "@/components/podcast/EpisodeOverlayLayout";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import EpisodeGuestCard from "@/components/podcast/EpisodeGuestCard";
import EpisodeTopics from "@/components/podcast/EpisodeTopics";
import { useSubscribe } from "@/contexts/SubscribeContext";
import { useIsMobile } from "@/hooks/use-mobile";
import { getEpisodeBySlug, getPublishedEpisodes, PodcastEpisode } from "@/lib/podcastData";
import guestBg from "@/assets/guest-bg.png";

interface ComingSoonEpisodeProps {
  episode?: PodcastEpisode;
}

const ComingSoonEpisode = ({ episode: propEpisode }: ComingSoonEpisodeProps) => {
  const { slug } = useParams();
  const isMobile = useIsMobile();
  const { openSubscribe } = useSubscribe();
  const [showForm, setShowForm] = useState(false);
  const [email, setEmail] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  
  // Use prop episode or fetch by slug
  const episode = propEpisode || (slug ? getEpisodeBySlug(slug) : undefined);
  
  // Get other published episodes for "Other Great Speakers"
  const otherEpisodes = getPublishedEpisodes().slice(0, 3);
  
  // Generic coming soon if no episode found
  if (!episode) {
    return <GenericComingSoon />;
  }

  return (
    <EpisodeOverlayLayout>
      {/* Episode Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12 items-start">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-12">
              {/* Hero Card with Get Notified CTA */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="relative aspect-video rounded-3xl overflow-hidden cursor-pointer group"
                style={{
                  backgroundImage: `url(${guestBg})`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                }}
                onClick={() => {
                  if (!showForm && !isSubmitted) {
                    if (isMobile) {
                      openSubscribe();
                    } else {
                      setShowForm(true);
                    }
                  }
                }}
              >
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-black/30 group-hover:from-black/95 group-hover:via-black/60 hover-transition" />
                
                {/* Upcoming Badge - black container */}
                <div className="absolute top-6 left-6 z-10">
                  <span className="bg-foreground px-4 py-2 rounded-full text-sm font-semibold text-background">
                    Upcoming
                  </span>
                </div>

                {/* Interactive Content */}
                <AnimatePresence mode="wait">
                  {!showForm && !isSubmitted ? (
                    <motion.div
                      key="cta"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="absolute inset-0 flex flex-col justify-end p-8 z-10"
                    >
                      <h3 className="font-display text-2xl md:text-3xl font-semibold text-white mb-4 max-w-md">
                        Be the first to know when this episode drops.
                      </h3>
                      <span className="btn-base btn-lg bg-primary hover:bg-primary/90 text-primary-foreground self-start inline-flex items-center gap-2">
                        <Bell size={18} />
                        Get Notified
                      </span>
                    </motion.div>
                  ) : !isSubmitted ? (
                    <motion.div
                      key="form"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="absolute inset-0 flex flex-col justify-end p-8 z-10"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <h3 className="font-display text-2xl md:text-3xl font-semibold text-white mb-4">
                        Get notified when it's live.
                      </h3>
                      
                      <form 
                        onSubmit={(e) => {
                          e.preventDefault();
                          setIsSubmitted(true);
                          setEmail("");
                          setTimeout(() => {
                            setIsSubmitted(false);
                            setShowForm(false);
                          }, 2500);
                        }} 
                        className="max-w-md space-y-3"
                      >
                        <input
                          type="email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          placeholder="you@example.com"
                          required
                          autoFocus
                          className="w-full px-5 py-3 text-body glass rounded-full text-white placeholder:text-white/40 focus-ring hover-transition"
                        />
                        <div className="flex items-center gap-4">
                          <button
                            type="submit"
                            className="btn-base btn-lg bg-primary hover:bg-primary/90 text-primary-foreground"
                          >
                            Notify Me
                          </button>
                          <button
                            type="button"
                            onClick={() => setShowForm(false)}
                            className="text-body text-white/60 hover:text-white hover-transition"
                          >
                            Cancel
                          </button>
                        </div>
                      </form>
                    </motion.div>
                  ) : (
                    <motion.div
                      key="success"
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      transition={{ duration: 0.3 }}
                      className="absolute inset-0 flex flex-col items-center justify-center text-center p-8 z-10"
                    >
                      <div className="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center mb-4">
                        <svg className="w-8 h-8 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                      <h3 className="font-display text-2xl font-semibold text-white mb-2">You're on the list!</h3>
                      <p className="text-body text-white/60">
                        We'll let you know when {episode.name.split(' ')[0]}'s episode is ready.
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
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
                    Upcoming Episode
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
                linkedInUrl={episode.linkedInUrl}
                bio={episode.bio}
                isUpcoming
              />

            </motion.div>
          </div>

      {/* Other Great Speakers */}
      {otherEpisodes.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mt-12 pt-12 border-t border-border"
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
    </EpisodeOverlayLayout>
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

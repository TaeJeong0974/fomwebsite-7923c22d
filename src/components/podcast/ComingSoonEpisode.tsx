import { Link, useParams } from "react-router-dom";
import { ArrowLeft, Bell, Linkedin, Sparkles } from "lucide-react";
import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useSubscribe } from "@/contexts/SubscribeContext";
import { getEpisodeBySlug, PodcastEpisode } from "@/lib/podcastData";
import guestBg from "@/assets/guest-bg.png";

interface ComingSoonEpisodeProps {
  episode?: PodcastEpisode;
}

const ComingSoonEpisode = ({ episode: propEpisode }: ComingSoonEpisodeProps) => {
  const { slug } = useParams();
  const { openSubscribe } = useSubscribe();
  
  // Use prop episode or fetch by slug
  const episode = propEpisode || (slug ? getEpisodeBySlug(slug) : undefined);
  
  // Generic coming soon if no episode found
  if (!episode) {
    return <GenericComingSoon />;
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <main className="section-spacing">
        <div className="container mx-auto container-padding">
          {/* Back link */}
          <motion.div
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3 }}
          >
            <Link
              to="/#podcast"
              className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground hover-transition mb-8"
            >
              <ArrowLeft size={16} />
              Back to episodes
            </Link>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-8">
              {/* Hero Card */}
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
                
                {/* Coming Soon Badge */}
                <div className="absolute top-6 right-6">
                  <span className="glass-dark text-white px-4 py-2 rounded-full text-sm font-medium">
                    Coming Soon
                  </span>
                </div>
                
                {/* Content */}
                <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-8">
                  <h1 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-2 leading-tight">
                    {episode.name}
                  </h1>
                  <p className="text-lg text-white/70">
                    {episode.title} at <span className="text-primary font-medium">{episode.company}</span>
                  </p>
                </div>
              </motion.div>

              {/* Overview */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
              >
                <h2 className="font-display text-xl font-semibold text-foreground mb-4">
                  Episode Preview
                </h2>
                <p className="text-lg text-muted-foreground leading-relaxed">
                  {episode.overview}
                </p>
              </motion.div>

              {/* Bio */}
              {episode.bio && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                >
                  <h2 className="font-display text-xl font-semibold text-foreground mb-4">
                    About {episode.name.split(' ')[0]}
                  </h2>
                  <p className="text-muted-foreground leading-relaxed">
                    {episode.bio}
                  </p>
                </motion.div>
              )}

              {/* Topics We'll Cover */}
              {episode.topics.length > 0 && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                >
                  <h2 className="font-display text-xl font-semibold text-foreground mb-4">
                    Topics We'll Cover
                  </h2>
                  <ul className="space-y-3">
                    {episode.topics.map((topic, index) => (
                      <li 
                        key={index}
                        className="flex items-start gap-3 text-muted-foreground"
                      >
                        <Sparkles className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                        <span>{topic}</span>
                      </li>
                    ))}
                  </ul>
                </motion.div>
              )}
            </div>

            {/* Sidebar */}
            <motion.div 
              className="space-y-6"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              {/* Notify CTA Card */}
              <div className="glass-dark rounded-2xl p-6 text-center">
                <div className="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center mx-auto mb-4">
                  <Bell className="w-7 h-7 text-primary" />
                </div>
                <h3 className="font-display text-lg font-semibold text-white mb-2">
                  Get Notified
                </h3>
                <p className="text-white/60 text-sm mb-6">
                  Be the first to know when this episode drops.
                </p>
                <button
                  onClick={openSubscribe}
                  className="w-full btn-base btn-lg bg-primary hover:bg-primary/90 text-primary-foreground"
                >
                  Notify Me
                </button>
              </div>

              {/* Guest Info Card */}
              <div className="glass rounded-2xl p-6">
                <div className="flex items-center gap-4 mb-4">
                  {episode.companyDomain && (
                    <div className="w-12 h-12 rounded-xl bg-muted flex items-center justify-center">
                      <img 
                        src={`https://www.google.com/s2/favicons?domain=${episode.companyDomain}&sz=64`} 
                        alt={episode.company}
                        className="h-6 w-6 object-contain"
                      />
                    </div>
                  )}
                  <div>
                    <h4 className="font-display font-semibold text-foreground">{episode.name}</h4>
                    <p className="text-sm text-muted-foreground">{episode.title}</p>
                  </div>
                </div>
                <p className="text-sm text-muted-foreground mb-4">
                  {episode.company}
                </p>
                {episode.linkedInUrl && (
                  <a
                    href={episode.linkedInUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-sm text-primary hover:text-primary/80 hover-transition"
                  >
                    <Linkedin className="w-4 h-4" />
                    View LinkedIn
                  </a>
                )}
              </div>

              {/* Company Card */}
              <div className="glass rounded-2xl p-6">
                <h4 className="font-display font-semibold text-foreground mb-2">
                  About {episode.company}
                </h4>
                <a
                  href={`https://${episode.companyDomain}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-sm text-primary hover:text-primary/80 hover-transition"
                >
                  {episode.companyDomain}
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                </a>
              </div>
            </motion.div>
          </div>
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
          <Link
            to="/#podcast"
            className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground hover-transition mb-8"
          >
            <ArrowLeft size={16} />
            Back to episodes
          </Link>

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

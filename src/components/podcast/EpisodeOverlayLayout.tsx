import { useEffect, useCallback } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import guestBg from "@/assets/guest-bg.png";
import { getAdjacentEpisodes } from "@/lib/podcastData";

interface EpisodeOverlayLayoutProps {
  children: React.ReactNode;
}

const EpisodeOverlayLayout = ({ children }: EpisodeOverlayLayoutProps) => {
  const navigate = useNavigate();
  const { slug } = useParams();
  const { prev, next } = getAdjacentEpisodes(slug || "");

  const handleClose = useCallback(() => {
    navigate('/#podcast');
    // Smooth scroll to podcast section after navigation
    setTimeout(() => {
      const podcastSection = document.getElementById('podcast');
      if (podcastSection) {
        podcastSection.scrollIntoView({ behavior: 'smooth' });
      }
    }, 100);
  }, [navigate]);

  // Keyboard support - Escape to close, arrow keys to navigate
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        handleClose();
      } else if (event.key === 'ArrowLeft' && prev) {
        navigate(`/episode/${prev.slug}`);
      } else if (event.key === 'ArrowRight' && next) {
        navigate(`/episode/${next.slug}`);
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [handleClose, navigate, prev, next]);

  return (
    <div className="min-h-screen bg-muted/40 relative">
      {/* Blurred homepage preview - simulated card grid */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="container mx-auto container-padding pt-24">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 opacity-60 blur-lg scale-105">
            {[...Array(12)].map((_, i) => (
              <div
                key={i}
                className="aspect-[3/4] rounded-2xl bg-cover bg-center"
                style={{ backgroundImage: `url(${guestBg})` }}
              />
            ))}
          </div>
        </div>
        {/* Subtle fade overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-background/50 via-background/40 to-background/60" />
      </div>
      
      <Navbar />

      {/* Floating Panel Container */}
      <main className="relative z-10 pt-24">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ 
            duration: 0.5, 
            ease: [0.22, 1, 0.36, 1] 
          }}
          className="mx-4 sm:mx-6 lg:mx-8 pb-8"
        >
          <div className="container mx-auto bg-background rounded-3xl shadow-2xl shadow-black/5 overflow-hidden">
            {/* Episode Navigation Bar - Inside Container */}
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
              className="flex items-center gap-4 px-4 sm:px-6 lg:px-8 py-0 border-b border-border/50"
            >
              {/* Previous Episode */}
              {prev ? (
                <Link
                  to={`/episode/${prev.slug}`}
                  className="flex items-center gap-4 group flex-1 min-w-0"
                >
                  <div className="flex items-center justify-center w-12 h-12 rounded-full bg-muted group-hover:bg-foreground group-hover:text-background hover-transition shrink-0">
                    <ChevronLeft size={22} />
                  </div>
                  <div className="min-w-0 hidden sm:block">
                    <p className="text-xl font-semibold text-foreground truncate group-hover:text-primary hover-transition">{prev.name}</p>
                    <p className="text-base text-muted-foreground truncate">{prev.title}</p>
                  </div>
                </Link>
              ) : (
                <div className="flex-1" />
              )}

              {/* Next Episode */}
              {next ? (
                <Link
                  to={`/episode/${next.slug}`}
                  className="flex items-center gap-4 group flex-1 min-w-0 justify-end"
                >
                  <div className="min-w-0 text-right hidden sm:block">
                    <p className="text-xl font-semibold text-foreground truncate group-hover:text-primary hover-transition">{next.name}</p>
                    <p className="text-base text-muted-foreground truncate">{next.title}</p>
                  </div>
                  <div className="flex items-center justify-center w-12 h-12 rounded-full bg-muted group-hover:bg-foreground group-hover:text-background hover-transition shrink-0">
                    <ChevronRight size={22} />
                  </div>
                </Link>
              ) : (
                <div className="flex-1" />
              )}

              {/* Close Button - Far Right */}
              <button
                onClick={handleClose}
                className="flex items-center justify-center w-12 h-12 rounded-full bg-foreground text-background hover:bg-foreground/90 hover-transition shrink-0 ml-2"
                aria-label="Close and return to episodes"
              >
                <X size={20} />
              </button>
            </motion.div>

            {/* Main Content */}
            <div className="px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
              {children}
            </div>
          </div>
        </motion.div>
      </main>

      <Footer />
    </div>
  );
};

export default EpisodeOverlayLayout;

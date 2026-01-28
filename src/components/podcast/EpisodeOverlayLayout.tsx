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

      {/* Episode Navigation Bar - Full Width */}
      <div className="relative z-10 pt-24 px-4 sm:px-6 lg:px-8">
        <div className="container mx-auto">
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="flex items-center justify-between gap-4 mb-6"
          >
            {/* Previous Episode */}
            {prev ? (
              <Link
                to={`/episode/${prev.slug}`}
                className="flex items-center gap-3 group flex-1 min-w-0"
              >
                <div className="flex items-center justify-center w-8 h-8 rounded-full bg-muted group-hover:bg-foreground group-hover:text-background hover-transition shrink-0">
                  <ChevronLeft size={16} />
                </div>
                <div className="flex items-center gap-3 min-w-0">
                  <div 
                    className="w-10 h-10 rounded-lg bg-cover bg-center shrink-0 group-hover:scale-105 hover-transition"
                    style={{ backgroundImage: `url(${guestBg})` }}
                  />
                  <div className="min-w-0 hidden sm:block">
                    <p className="text-sm font-semibold text-foreground truncate">{prev.name}</p>
                    <p className="text-xs text-muted-foreground truncate">{prev.title}</p>
                  </div>
                </div>
              </Link>
            ) : (
              <div className="flex-1" />
            )}

            {/* Close Button */}
            <button
              onClick={handleClose}
              className="flex items-center justify-center w-10 h-10 rounded-full bg-foreground text-background hover:bg-foreground/90 hover-transition shrink-0"
              aria-label="Close and return to episodes"
            >
              <X size={18} />
            </button>

            {/* Next Episode */}
            {next ? (
              <Link
                to={`/episode/${next.slug}`}
                className="flex items-center gap-3 group flex-1 min-w-0 justify-end"
              >
                <div className="flex items-center gap-3 min-w-0">
                  <div className="min-w-0 hidden sm:block text-right">
                    <p className="text-sm font-semibold text-foreground truncate">{next.name}</p>
                    <p className="text-xs text-muted-foreground truncate">{next.title}</p>
                  </div>
                  <div 
                    className="w-10 h-10 rounded-lg bg-cover bg-center shrink-0 group-hover:scale-105 hover-transition"
                    style={{ backgroundImage: `url(${guestBg})` }}
                  />
                </div>
                <div className="flex items-center justify-center w-8 h-8 rounded-full bg-muted group-hover:bg-foreground group-hover:text-background hover-transition shrink-0">
                  <ChevronRight size={16} />
                </div>
              </Link>
            ) : (
              <div className="flex-1" />
            )}
          </motion.div>
        </div>
      </div>

      {/* Floating Panel Container */}
      <main className="relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ 
            duration: 0.5, 
            ease: [0.22, 1, 0.36, 1] 
          }}
          className="mx-4 sm:mx-6 lg:mx-8 pb-8"
        >
          <div className="container mx-auto bg-background rounded-3xl shadow-2xl shadow-black/5 overflow-hidden px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
            {children}
          </div>
        </motion.div>
      </main>

      <Footer />
    </div>
  );
};

export default EpisodeOverlayLayout;

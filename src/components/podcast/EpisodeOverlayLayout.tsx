import { useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { X } from "lucide-react";
import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import guestBg from "@/assets/guest-bg.png";

interface EpisodeOverlayLayoutProps {
  children: React.ReactNode;
}

const EpisodeOverlayLayout = ({ children }: EpisodeOverlayLayoutProps) => {
  const navigate = useNavigate();

  const handleClose = useCallback(() => {
    navigate('/');
    // Smooth scroll to podcast section after navigation
    setTimeout(() => {
      const podcastSection = document.getElementById('podcast');
      if (podcastSection) {
        podcastSection.scrollIntoView({ behavior: 'smooth' });
      }
    }, 150);
  }, [navigate]);

  // Keyboard support - Escape to close
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        handleClose();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [handleClose]);

  return (
    <div className="min-h-screen bg-muted/40 relative">
      {/* Blurred homepage preview - simulated card grid */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="container mx-auto container-padding pt-24">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 opacity-60 blur-lg scale-105">
            {[...Array(12)].map((_, i) => (
              <div
                key={i}
                className="aspect-[3/4] rounded-xl bg-cover bg-center"
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
      <main className="relative z-10 pt-8 sm:pt-12 pb-6 sm:pb-8 px-4 sm:px-6">
        {/* White Content Panel */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ 
            duration: 0.5, 
            ease: [0.22, 1, 0.36, 1] 
          }}
          className="container mx-auto bg-background rounded-xl shadow-2xl shadow-black/5 overflow-hidden p-5 pr-16 sm:p-8 sm:pr-20 lg:p-10 lg:pr-24 relative"
        >
          {/* Close Button - Aligned with content padding */}
          <button
            onClick={handleClose}
            className="absolute top-5 right-5 sm:top-8 sm:right-8 lg:top-10 lg:right-10 z-10 flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-black/5 backdrop-blur-xl border border-black/10 hover:bg-black/10 hover:scale-105 hover-transition shadow-lg shadow-black/5"
            aria-label="Close and return to episodes"
          >
            <X size={18} className="sm:w-5 sm:h-5" />
          </button>
          
          {children}
        </motion.div>
      </main>
    </div>
  );
};

export default EpisodeOverlayLayout;

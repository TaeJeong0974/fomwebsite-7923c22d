import { useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { X } from "lucide-react";
import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import guestBg from "@/assets/guest-bg.png";

interface EpisodeOverlayLayoutProps {
  children: React.ReactNode;
}

const EpisodeOverlayLayout = ({ children }: EpisodeOverlayLayoutProps) => {
  const navigate = useNavigate();

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

      {/* Close Button - Fixed position */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3, delay: 0.2 }}
        className="fixed top-24 right-6 lg:right-10 z-50"
      >
        <button
          onClick={handleClose}
          className="flex items-center justify-center w-12 h-12 rounded-full bg-foreground text-background hover:bg-foreground/90 hover-transition shadow-lg"
          aria-label="Close and return to episodes"
        >
          <X size={20} />
        </button>
      </motion.div>

      {/* Floating Panel Container */}
      <main className="relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ 
            duration: 0.5, 
            ease: [0.22, 1, 0.36, 1] 
          }}
          className="mx-4 sm:mx-6 lg:mx-8 py-8"
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

import { useEffect, useCallback, useState } from "react";
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
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    // Trigger the slide-up animation on mount
    requestAnimationFrame(() => {
      setIsOpen(true);
    });
  }, []);

  const handleClose = useCallback(() => {
    setIsOpen(false);
    setTimeout(() => {
      navigate('/');
      // Smooth scroll to podcast section after navigation completes
      requestAnimationFrame(() => {
        setTimeout(() => {
          const podcastSection = document.getElementById('podcast');
          if (podcastSection) {
            podcastSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
          }
        }, 100);
      });
    }, 600);
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
    <div className="min-h-screen relative overflow-hidden">
      {/* Background with parallax scale effect */}
      <motion.div
        initial={{ scale: 1, filter: "blur(0px)" }}
        animate={{ 
          scale: isOpen ? 0.92 : 1,
          filter: isOpen ? "blur(12px)" : "blur(0px)"
        }}
        transition={{ 
          duration: 0.7, 
          ease: [0.22, 1, 0.36, 1]
        }}
        className="fixed inset-0 origin-center"
      >
        <div className="container mx-auto container-padding pt-24">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 opacity-70">
            {[...Array(12)].map((_, i) => (
              <div
                key={i}
                className="aspect-[3/4] rounded-xl bg-cover bg-center"
                style={{ backgroundImage: `url(${guestBg})` }}
              />
            ))}
          </div>
        </div>
      </motion.div>

      {/* Dark overlay */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: isOpen ? 0.5 : 0 }}
        transition={{ duration: 0.5 }}
        className="fixed inset-0 bg-black z-30"
        onClick={handleClose}
      />
      
      {/* Sliding Panel */}
      <motion.div
        initial={{ y: "100%" }}
        animate={{ y: isOpen ? 0 : "100%" }}
        transition={{ 
          duration: 0.7, 
          ease: [0.22, 1, 0.36, 1]
        }}
        className="fixed inset-0 z-40 overflow-y-auto"
      >
        <div className="min-h-screen bg-muted/95 backdrop-blur-xl">
          <Navbar />

          {/* Floating Panel Container */}
          <main className="relative z-10 pt-8 sm:pt-12 pb-6 sm:pb-8 px-4 sm:px-6">
            {/* Drag handle indicator */}
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: isOpen ? 1 : 0, y: isOpen ? 0 : -10 }}
              transition={{ delay: 0.3, duration: 0.4 }}
              className="flex justify-center mb-4"
            >
              <div className="w-12 h-1.5 rounded-full bg-black/10" />
            </motion.div>

            {/* White Content Panel */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ 
                opacity: isOpen ? 1 : 0, 
                y: isOpen ? 0 : 40
              }}
              transition={{ 
                duration: 0.5, 
                delay: 0.15,
                ease: [0.22, 1, 0.36, 1] 
              }}
              className="container mx-auto bg-background rounded-xl shadow-2xl shadow-black/10 overflow-hidden p-5 pr-16 sm:p-8 sm:pr-20 lg:p-10 lg:pr-24 relative"
            >
              {/* Close Button */}
              <motion.button
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.5, duration: 0.3 }}
                onClick={handleClose}
                className="absolute top-5 right-5 sm:top-8 sm:right-8 lg:top-10 lg:right-10 z-10 flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-black/5 backdrop-blur-xl border border-black/10 hover:bg-black/10 hover:scale-105 hover-transition shadow-lg shadow-black/5"
                aria-label="Close and return to episodes"
              >
                <X size={18} className="sm:w-5 sm:h-5" />
              </motion.button>
              
              {/* Staggered content reveal */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: isOpen ? 1 : 0 }}
                transition={{ delay: 0.3, duration: 0.5 }}
              >
                {children}
              </motion.div>
            </motion.div>
          </main>
        </div>
      </motion.div>
    </div>
  );
};

export default EpisodeOverlayLayout;

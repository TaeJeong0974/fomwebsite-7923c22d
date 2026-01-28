import { useEffect, useCallback, useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { X } from "lucide-react";
import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import { useTransition } from "@/contexts/TransitionContext";
import guestBg from "@/assets/guest-bg.png";

interface EpisodeOverlayLayoutProps {
  children: React.ReactNode;
}

const EpisodeOverlayLayout = ({ children }: EpisodeOverlayLayoutProps) => {
  const navigate = useNavigate();
  const { clickOrigin, setClickOrigin } = useTransition();
  const [isRevealed, setIsRevealed] = useState(false);

  // Calculate the max radius needed to cover the entire viewport from click origin
  const origin = useMemo(() => {
    if (!clickOrigin) {
      return { x: window.innerWidth / 2, y: window.innerHeight / 2 };
    }
    return clickOrigin;
  }, [clickOrigin]);

  // Calculate the diagonal distance to the furthest corner
  const maxRadius = useMemo(() => {
    const corners = [
      { x: 0, y: 0 },
      { x: window.innerWidth, y: 0 },
      { x: 0, y: window.innerHeight },
      { x: window.innerWidth, y: window.innerHeight },
    ];
    
    return Math.max(
      ...corners.map(corner => 
        Math.sqrt(Math.pow(corner.x - origin.x, 2) + Math.pow(corner.y - origin.y, 2))
      )
    );
  }, [origin]);

  useEffect(() => {
    // Trigger the reveal animation
    requestAnimationFrame(() => {
      setIsRevealed(true);
    });
    
    // Clear the click origin after animation
    return () => {
      setClickOrigin(null);
    };
  }, [setClickOrigin]);

  const handleClose = useCallback(() => {
    setIsRevealed(false);
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
    }, 500);
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
    <>
      {/* Portal reveal overlay */}
      <motion.div
        initial={{ 
          clipPath: `circle(0px at ${origin.x}px ${origin.y}px)` 
        }}
        animate={{ 
          clipPath: isRevealed 
            ? `circle(${maxRadius}px at ${origin.x}px ${origin.y}px)`
            : `circle(0px at ${origin.x}px ${origin.y}px)`
        }}
        transition={{ 
          duration: 0.7, 
          ease: [0.22, 1, 0.36, 1]
        }}
        className="fixed inset-0 z-40 bg-muted/95"
      />
      
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: isRevealed ? 1 : 0 }}
        transition={{ duration: 0.4, delay: 0.2 }}
        className="min-h-screen relative z-50"
      >
        {/* Blurred homepage preview - simulated card grid */}
        <div className="fixed inset-0 overflow-hidden pointer-events-none">
          <div className="container mx-auto container-padding pt-24">
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 opacity-40 blur-xl scale-105">
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
          <div className="absolute inset-0 bg-gradient-to-b from-background/60 via-background/50 to-background/70" />
        </div>
        
        <Navbar />

        {/* Floating Panel Container */}
        <main className="relative z-10 pt-8 sm:pt-12 pb-6 sm:pb-8 px-4 sm:px-6">
          {/* White Content Panel */}
          <motion.div
            initial={{ opacity: 0, y: 40, scale: 0.96 }}
            animate={{ 
              opacity: isRevealed ? 1 : 0, 
              y: isRevealed ? 0 : 40,
              scale: isRevealed ? 1 : 0.96
            }}
            transition={{ 
              duration: 0.6, 
              delay: 0.15,
              ease: [0.22, 1, 0.36, 1] 
            }}
            className="container mx-auto bg-background rounded-xl shadow-2xl shadow-black/5 overflow-hidden p-5 pr-16 sm:p-8 sm:pr-20 lg:p-10 lg:pr-24 relative"
          >
            {/* Close Button - Aligned with content padding */}
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
            
            {children}
          </motion.div>
        </main>
      </motion.div>
    </>
  );
};

export default EpisodeOverlayLayout;

import { useEffect, useCallback, useState } from "react";
import { useNavigate } from "react-router-dom";
import { X } from "lucide-react";
import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import guestBg from "@/assets/guest-bg.png";

interface EpisodeOverlayLayoutProps {
  children: React.ReactNode;
}

const liquidEase = [0.22, 1, 0.36, 1] as const;

// Stagger animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.1,
    },
  },
  exit: {
    opacity: 0,
    transition: {
      staggerChildren: 0.05,
      staggerDirection: -1,
    },
  },
};

const itemVariants = {
  hidden: { 
    opacity: 0, 
    y: 30,
    scale: 0.96,
  },
  visible: { 
    opacity: 1, 
    y: 0,
    scale: 1,
    transition: {
      duration: 0.6,
      ease: liquidEase,
    },
  },
  exit: {
    opacity: 0,
    y: -20,
    transition: {
      duration: 0.3,
      ease: liquidEase,
    },
  },
};

const closeButtonVariants = {
  hidden: { opacity: 0 },
  visible: { 
    opacity: 1,
    transition: {
      duration: 0.4,
      ease: liquidEase,
    },
  },
  exit: {
    opacity: 0,
    transition: {
      duration: 0.2,
      ease: liquidEase,
    },
  },
};

const EpisodeOverlayLayout = ({ children }: EpisodeOverlayLayoutProps) => {
  const navigate = useNavigate();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Trigger the cascade animation on mount
    requestAnimationFrame(() => {
      setIsVisible(true);
    });
  }, []);

  const handleClose = useCallback(() => {
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
      {/* Background cards with staggered fade */}
      <motion.div
        initial={{ opacity: 0.7 }}
        animate={{ opacity: isVisible ? 0.3 : 0.7 }}
        transition={{ duration: 0.8, ease: liquidEase }}
        className="fixed inset-0 overflow-hidden pointer-events-none"
      >
        <div className="container mx-auto container-padding pt-24">
          <motion.div 
            className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
            initial="hidden"
            animate={isVisible ? "visible" : "hidden"}
            variants={{
              hidden: { opacity: 0.6 },
              visible: {
                opacity: 0.4,
                transition: { staggerChildren: 0.03 }
              }
            }}
          >
            {[...Array(12)].map((_, i) => (
              <motion.div
                key={i}
                variants={{
                  hidden: { scale: 1, filter: "blur(0px)" },
                  visible: { scale: 0.95, filter: "blur(8px)" }
                }}
                transition={{ duration: 0.6, ease: liquidEase }}
                className="aspect-[3/4] rounded-xl bg-cover bg-center"
                style={{ backgroundImage: `url(${guestBg})` }}
              />
            ))}
          </motion.div>
        </div>
        {/* Gradient overlay */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: isVisible ? 1 : 0 }}
          transition={{ duration: 0.5 }}
          className="absolute inset-0 bg-gradient-to-b from-background/70 via-background/60 to-background/80"
        />
      </motion.div>
      
      <Navbar />

      {/* Floating Panel Container */}
      <main className="relative z-10 pt-8 sm:pt-12 pb-6 sm:pb-8 px-4 sm:px-6">
        {/* White Content Panel with cascade reveal */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isVisible ? "visible" : "exit"}
          className="container mx-auto bg-background rounded-xl shadow-2xl shadow-black/5 overflow-hidden p-5 pr-16 sm:p-8 sm:pr-20 lg:p-10 lg:pr-24 relative"
        >
          {/* Close Button - sticky */}
          <motion.button
            variants={closeButtonVariants}
            onClick={handleClose}
            className="sticky top-4 sm:top-6 lg:top-8 ml-auto -mt-10 sm:-mt-12 lg:-mt-10 -mr-11 sm:-mr-14 lg:-mr-16 z-20 flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-foreground text-background hover:bg-foreground/80 hover:scale-105 hover-transition shadow-lg"
            aria-label="Close and return to episodes"
          >
            <X size={18} className="sm:w-5 sm:h-5" />
          </motion.button>
          
          {/* Content wrapper for staggered children */}
          <motion.div variants={itemVariants}>
            {children}
          </motion.div>
        </motion.div>
      </main>
    </div>
  );
};

export default EpisodeOverlayLayout;

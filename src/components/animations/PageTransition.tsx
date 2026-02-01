import { motion } from "framer-motion";
import { useLocation } from "react-router-dom";
import { useEffect, useState, useRef } from "react";
import TransitionPattern from "./TransitionPattern";

const liquidEase = [0.22, 1, 0.36, 1] as const;

interface PageTransitionProps {
  children: React.ReactNode;
}

const PageTransition = ({ children }: PageTransitionProps) => {
  const location = useLocation();
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [displayLocation, setDisplayLocation] = useState(location);
  const [showExitWipe, setShowExitWipe] = useState(false);
  const previousPathRef = useRef(location.pathname);

  useEffect(() => {
    if (location.pathname !== displayLocation.pathname) {
      const isFromHomeToDetail = 
        previousPathRef.current === "/" && 
        location.pathname.startsWith("/episode/");
      
      if (isFromHomeToDetail) {
        // Trigger wipe animation only for homepage → detail
        setIsTransitioning(true);
        setShowExitWipe(false);
      } else {
        // Instant transition for all other navigations
        setDisplayLocation(location);
        previousPathRef.current = location.pathname;
      }
    }
  }, [location, displayLocation]);

  const handleAnimationComplete = () => {
    if (isTransitioning) {
      setDisplayLocation(location);
      previousPathRef.current = location.pathname;
      setIsTransitioning(false);
      setShowExitWipe(true);
    }
  };

  return (
    <>
      {/* Page content */}
      <div key={displayLocation.pathname}>
        {children}
      </div>

      {/* Wipe overlay with pattern - only for homepage → detail */}
      {isTransitioning && (
        <motion.div
          className="fixed inset-0 z-[100] origin-right"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 0.6, ease: liquidEase }}
          onAnimationComplete={handleAnimationComplete}
        >
          <TransitionPattern />
        </motion.div>
      )}

      {/* Exit wipe - reveals detail page after transition */}
      {showExitWipe && displayLocation.pathname.startsWith("/episode/") && (
        <motion.div
          key={`exit-wipe-${location.pathname}`}
          className="fixed inset-0 z-[100] origin-left pointer-events-none"
          initial={{ scaleX: 1 }}
          animate={{ scaleX: 0 }}
          transition={{ duration: 0.6, ease: liquidEase, delay: 0.05 }}
          onAnimationComplete={() => setShowExitWipe(false)}
        >
          <TransitionPattern animating={false} />
        </motion.div>
      )}
    </>
  );
};

export default PageTransition;

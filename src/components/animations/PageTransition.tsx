import { motion } from "framer-motion";
import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";

const liquidEase = [0.22, 1, 0.36, 1] as const;

interface PageTransitionProps {
  children: React.ReactNode;
}

const PageTransition = ({ children }: PageTransitionProps) => {
  const location = useLocation();
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [displayLocation, setDisplayLocation] = useState(location);

  useEffect(() => {
    if (location.pathname !== displayLocation.pathname) {
      setIsTransitioning(true);
    }
  }, [location, displayLocation]);

  const handleAnimationComplete = () => {
    if (isTransitioning) {
      setDisplayLocation(location);
      setIsTransitioning(false);
    }
  };

  return (
    <>
      {/* Page content */}
      <div key={displayLocation.pathname}>
        {children}
      </div>

      {/* Wipe overlay - appears on route change */}
      {isTransitioning && (
        <>
          {/* Primary wipe */}
          <motion.div
            className="fixed inset-0 bg-foreground z-[100] origin-right"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 0.5, ease: liquidEase }}
            onAnimationComplete={handleAnimationComplete}
          />
          {/* Secondary wipe for depth */}
          <motion.div
            className="fixed inset-0 bg-primary z-[99] origin-right"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 0.6, ease: liquidEase, delay: 0.05 }}
          />
        </>
      )}

      {/* Exit wipe - reveals new page */}
      {!isTransitioning && displayLocation.pathname === location.pathname && (
        <>
          <motion.div
            key={`exit-primary-${location.pathname}`}
            className="fixed inset-0 bg-foreground z-[100] origin-left pointer-events-none"
            initial={{ scaleX: 1 }}
            animate={{ scaleX: 0 }}
            transition={{ duration: 0.5, ease: liquidEase, delay: 0.1 }}
          />
          <motion.div
            key={`exit-secondary-${location.pathname}`}
            className="fixed inset-0 bg-primary z-[99] origin-left pointer-events-none"
            initial={{ scaleX: 1 }}
            animate={{ scaleX: 0 }}
            transition={{ duration: 0.6, ease: liquidEase }}
          />
        </>
      )}
    </>
  );
};

export default PageTransition;

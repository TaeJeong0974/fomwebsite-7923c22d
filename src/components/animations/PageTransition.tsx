import { motion, AnimatePresence } from "framer-motion";
import { useLocation } from "react-router-dom";
import { useEffect, useState, useRef } from "react";

const liquidEase = [0.22, 1, 0.36, 1] as const;

interface PageTransitionProps {
  children: React.ReactNode;
}

const PageTransition = ({ children }: PageTransitionProps) => {
  const location = useLocation();
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [displayLocation, setDisplayLocation] = useState(location);
  const previousPathRef = useRef(location.pathname);

  useEffect(() => {
    if (location.pathname !== displayLocation.pathname) {
      const isFromHomeToDetail = 
        previousPathRef.current === "/" && 
        location.pathname.startsWith("/episode/");
      
      if (isFromHomeToDetail) {
        // Trigger blur + slide animation for homepage → detail
        setIsTransitioning(true);
        
        // Update location after a brief delay to allow blur to start
        setTimeout(() => {
          setDisplayLocation(location);
          previousPathRef.current = location.pathname;
        }, 50);
      } else {
        // Instant transition for all other navigations
        setDisplayLocation(location);
        previousPathRef.current = location.pathname;
      }
    }
  }, [location, displayLocation]);

  const isDetailPage = displayLocation.pathname.startsWith("/episode/");

  return (
    <>
      {/* Homepage with blur effect */}
      {previousPathRef.current === "/" && isTransitioning && (
        <motion.div
          className="fixed inset-0 z-[90]"
          initial={{ filter: "blur(0px)", opacity: 1, scale: 1 }}
          animate={{ filter: "blur(20px)", opacity: 0.5, scale: 0.95 }}
          transition={{ duration: 0.6, ease: liquidEase }}
        />
      )}

      {/* Page content */}
      <AnimatePresence mode="wait">
        <motion.div 
          key={displayLocation.pathname}
          initial={isTransitioning && isDetailPage ? { x: "100%" } : false}
          animate={{ x: 0 }}
          transition={{ duration: 0.6, ease: liquidEase }}
          onAnimationComplete={() => {
            if (isTransitioning) {
              setIsTransitioning(false);
            }
          }}
          className={isTransitioning && isDetailPage ? "fixed inset-0 z-[100] bg-background" : ""}
        >
          {children}
        </motion.div>
      </AnimatePresence>
    </>
  );
};

export default PageTransition;

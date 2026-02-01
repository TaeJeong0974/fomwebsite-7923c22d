import { motion, AnimatePresence } from "framer-motion";
import { useLocation } from "react-router-dom";
import { useEffect, useState, useRef } from "react";

const liquidEase = [0.22, 1, 0.36, 1] as const;

interface PageTransitionProps {
  children: React.ReactNode;
}

const PageTransition = ({ children }: PageTransitionProps) => {
  const location = useLocation();
  const [displayLocation, setDisplayLocation] = useState(location);
  const [slideIn, setSlideIn] = useState(false);
  const previousPathRef = useRef(location.pathname);

  useEffect(() => {
    if (location.pathname !== displayLocation.pathname) {
      const isFromHomeToDetail = 
        previousPathRef.current === "/" && 
        location.pathname.startsWith("/episode/");
      
      if (isFromHomeToDetail) {
        setSlideIn(true);
        setDisplayLocation(location);
        previousPathRef.current = location.pathname;
      } else {
        setDisplayLocation(location);
        previousPathRef.current = location.pathname;
      }
    }
  }, [location, displayLocation]);

  return (
    <motion.div 
      key={displayLocation.pathname}
      initial={slideIn ? { x: "8%", opacity: 0 } : false}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.7, ease: liquidEase }}
      onAnimationComplete={() => setSlideIn(false)}
    >
      {children}
    </motion.div>
  );
};

export default PageTransition;

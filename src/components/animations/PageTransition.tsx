import { motion, AnimatePresence } from "framer-motion";
import { useLocation } from "react-router-dom";
import { useEffect, useState, useRef } from "react";
import { liquidEase } from "@/components/animations/PageLoadAnimation";

interface PageTransitionProps {
  children: React.ReactNode;
}

const PageTransition = ({ children }: PageTransitionProps) => {
  const location = useLocation();
  const [displayLocation, setDisplayLocation] = useState(location);
  const [slideIn, setSlideIn] = useState(false);
  const [slideOut, setSlideOut] = useState(false);
  const previousPathRef = useRef(location.pathname);
  const isFirstRender = useRef(true);

  useEffect(() => {
    if (location.pathname !== displayLocation.pathname) {
      const isFromHomeToDetail = 
        previousPathRef.current === "/" && 
        location.pathname.startsWith("/episode/");
      
      const isFromDetailToHome = 
        previousPathRef.current.startsWith("/episode/") && 
        location.pathname === "/";
      
      if (isFromHomeToDetail) {
        setSlideIn(true);
        setDisplayLocation(location);
        previousPathRef.current = location.pathname;
      } else if (isFromDetailToHome) {
        setSlideOut(true);
        // Delay location update to allow exit animation
        setTimeout(() => {
          setDisplayLocation(location);
          previousPathRef.current = location.pathname;
          setSlideOut(false);
          // Scroll to podcast section after transition
          setTimeout(() => {
            const element = document.querySelector('#podcast');
            element?.scrollIntoView({ behavior: 'smooth', block: 'start' });
          }, 80);
        }, 280);
      } else {
        setDisplayLocation(location);
        previousPathRef.current = location.pathname;
      }
    }
  }, [location, displayLocation]);

  return (
    <AnimatePresence mode="wait">
      <motion.div 
        key={displayLocation.pathname}
        initial={isFirstRender.current ? false : (slideIn ? { x: "50%", opacity: 0 } : { opacity: 0 })}
        animate={{ x: 0, opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: slideIn ? 0.7 : 0.4, ease: liquidEase }}
        onAnimationComplete={() => {
          isFirstRender.current = false;
          setSlideIn(false);
        }}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
};

export default PageTransition;

import { motion, AnimatePresence } from "framer-motion";
import { useLocation } from "react-router-dom";
import { useRef } from "react";
import { liquidEase } from "@/components/animations/PageLoadAnimation";

interface PageTransitionProps {
  children: React.ReactNode;
}

const PageTransition = ({ children }: PageTransitionProps) => {
  const location = useLocation();
  const previousPathRef = useRef(location.pathname);
  
  const isFromHomeToDetail = 
    previousPathRef.current === "/" && 
    location.pathname.startsWith("/episode/");

  // Determine animation variants based on navigation direction
  const initial = isFromHomeToDetail
    ? { x: "50%", opacity: 0 }
    : { opacity: 0 };

  // Update ref after reading it
  const prevPath = previousPathRef.current;
  previousPathRef.current = location.pathname;

  return (
    <AnimatePresence mode="wait">
      <motion.div 
        key={location.pathname}
        initial={prevPath === location.pathname ? false : initial}
        animate={{ x: 0, opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ 
          duration: isFromHomeToDetail ? 0.7 : 0.4, 
          ease: liquidEase 
        }}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
};

export default PageTransition;

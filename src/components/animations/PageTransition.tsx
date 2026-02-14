import { motion, AnimatePresence } from "framer-motion";
import { useLocation } from "react-router-dom";
import { useRef } from "react";
import { liquidEase } from "@/components/animations/PageLoadAnimation";

interface PageTransitionProps {
  children: React.ReactNode;
}

const PageTransition = ({ children }: PageTransitionProps) => {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <motion.div 
        key={location.pathname}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.4, ease: liquidEase }}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
};

export default PageTransition;

import { motion } from "framer-motion";
import { ReactNode } from "react";
import { liquidEase } from "./PageLoadAnimation";

interface PageTransitionProps {
  children: ReactNode;
}

const pageVariants = {
  initial: {
    opacity: 0,
  },
  animate: {
    opacity: 1,
    transition: {
      duration: 0.5,
      ease: liquidEase,
    },
  },
  exit: {
    opacity: 0,
    transition: {
      duration: 0.3,
      ease: liquidEase,
    },
  },
};

const PageTransition = ({ children }: PageTransitionProps) => {
  return (
    <motion.div
      initial="initial"
      animate="animate"
      exit="exit"
      variants={pageVariants}
    >
      {children}
    </motion.div>
  );
};

export default PageTransition;

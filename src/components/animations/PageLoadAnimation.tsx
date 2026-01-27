import { motion } from "framer-motion";
import { ReactNode } from "react";

// Shared easing for liquid-glass feel - refined for elegance
export const liquidEase = [0.22, 1, 0.36, 1] as const;

// Stagger container for initial page load
export const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.15,
    },
  },
};

// Fade up animation variant
export const fadeUpVariant = {
  hidden: { 
    opacity: 0, 
    y: 24 
  },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: {
      duration: 1.1,
      ease: liquidEase,
    },
  },
};

// Fade in from top (for navbar)
export const fadeDownVariant = {
  hidden: { 
    opacity: 0, 
    y: -16 
  },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: {
      duration: 0.9,
      ease: liquidEase,
    },
  },
};

// Scale fade variant
export const scaleFadeVariant = {
  hidden: { 
    opacity: 0, 
    scale: 0.97 
  },
  visible: { 
    opacity: 1, 
    scale: 1,
    transition: {
      duration: 0.9,
      ease: liquidEase,
    },
  },
};

// Section wrapper for scroll-triggered animations
interface AnimatedSectionProps {
  children: ReactNode;
  className?: string;
  delay?: number;
}

export const AnimatedSection = ({ children, className = "", delay = 0 }: AnimatedSectionProps) => (
  <motion.div
    initial={{ opacity: 0, y: 40 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, amount: 0.15 }}
    transition={{ 
      duration: 0.8, 
      ease: liquidEase,
      delay 
    }}
    className={className}
  >
    {children}
  </motion.div>
);

// Stagger children wrapper
interface StaggerWrapperProps {
  children: ReactNode;
  className?: string;
}

export const StaggerWrapper = ({ children, className = "" }: StaggerWrapperProps) => (
  <motion.div
    initial="hidden"
    animate="visible"
    variants={staggerContainer}
    className={className}
  >
    {children}
  </motion.div>
);

// Individual stagger item
interface StaggerItemProps {
  children: ReactNode;
  className?: string;
}

export const StaggerItem = ({ children, className = "" }: StaggerItemProps) => (
  <motion.div
    variants={fadeUpVariant}
    className={className}
  >
    {children}
  </motion.div>
);

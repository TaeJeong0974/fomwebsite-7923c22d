import { motion, Variants } from "framer-motion";
import { ReactNode } from "react";

// Shared liquid easing
const liquidEase = [0.22, 1, 0.36, 1] as const;

// Animation variants for different reveal styles
export const revealVariants: Record<string, Variants> = {
  fadeUp: {
    hidden: { opacity: 0, y: 40 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.9, ease: liquidEase }
    }
  },
  fadeDown: {
    hidden: { opacity: 0, y: -30 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.8, ease: liquidEase }
    }
  },
  fadeLeft: {
    hidden: { opacity: 0, x: -40 },
    visible: { 
      opacity: 1, 
      x: 0,
      transition: { duration: 0.8, ease: liquidEase }
    }
  },
  fadeRight: {
    hidden: { opacity: 0, x: 40 },
    visible: { 
      opacity: 1, 
      x: 0,
      transition: { duration: 0.8, ease: liquidEase }
    }
  },
  scale: {
    hidden: { opacity: 0, scale: 0.92 },
    visible: { 
      opacity: 1, 
      scale: 1,
      transition: { duration: 0.9, ease: liquidEase }
    }
  },
  blur: {
    hidden: { opacity: 0, filter: "blur(10px)" },
    visible: { 
      opacity: 1, 
      filter: "blur(0px)",
      transition: { duration: 1.0, ease: liquidEase }
    }
  }
};

// Stagger container for children
export const staggerContainerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.1,
    }
  }
};

interface ScrollRevealProps {
  children: ReactNode;
  variant?: keyof typeof revealVariants;
  delay?: number;
  duration?: number;
  className?: string;
  once?: boolean;
  amount?: number;
}

export const ScrollReveal = ({
  children,
  variant = "fadeUp",
  delay = 0,
  duration,
  className = "",
  once = true,
  amount = 0.2
}: ScrollRevealProps) => {
  const variants = revealVariants[variant];
  
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once, amount }}
      variants={variants}
      transition={duration ? { duration, delay, ease: liquidEase } : { delay }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

// Stagger container component
interface StaggerContainerProps {
  children: ReactNode;
  className?: string;
  once?: boolean;
  amount?: number;
}

export const StaggerContainer = ({
  children,
  className = "",
  once = true,
  amount = 0.15
}: StaggerContainerProps) => {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once, amount }}
      variants={staggerContainerVariants}
      className={className}
    >
      {children}
    </motion.div>
  );
};

// Stagger item for use within StaggerContainer
export const StaggerItem = ({
  children,
  variant = "fadeUp",
  className = ""
}: {
  children: ReactNode;
  variant?: keyof typeof revealVariants;
  className?: string;
}) => {
  return (
    <motion.div variants={revealVariants[variant]} className={className}>
      {children}
    </motion.div>
  );
};

export default ScrollReveal;

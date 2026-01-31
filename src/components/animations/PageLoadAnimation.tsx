// Shared easing for liquid-glass feel
export const liquidEase = [0.22, 1, 0.36, 1] as const;

// Stagger container for initial page load - faster stagger
export const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.05,
    },
  },
};

// Fade up animation variant - faster duration
export const fadeUpVariant = {
  hidden: { 
    opacity: 0, 
    y: 16 
  },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: {
      duration: 0.5,
      ease: liquidEase,
    },
  },
};

// Fade in from top (for navbar)
export const fadeDownVariant = {
  hidden: { 
    opacity: 0, 
    y: -12 
  },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: {
      duration: 0.4,
      ease: liquidEase,
    },
  },
};

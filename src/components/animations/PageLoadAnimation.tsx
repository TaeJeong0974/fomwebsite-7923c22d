// Shared easing for liquid-glass feel
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

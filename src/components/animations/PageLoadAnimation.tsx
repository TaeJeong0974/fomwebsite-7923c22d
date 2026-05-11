"use client";

// Shared easing for liquid-glass feel
export const liquidEase = [0.22, 1, 0.36, 1] as const;

// Fade in from top (for navbar)
export const fadeDownVariant = {
  hidden: {
    opacity: 0,
    y: -16,
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

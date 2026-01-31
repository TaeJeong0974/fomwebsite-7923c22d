import { motion, useScroll, useTransform } from "framer-motion";
import { ReactNode, useRef } from "react";

interface ParallaxSectionProps {
  children: ReactNode;
  className?: string;
  speed?: number; // Parallax intensity: 0.1 (subtle) to 0.5 (dramatic)
  direction?: "up" | "down";
}

export const ParallaxSection = ({
  children,
  className = "",
  speed = 0.2,
  direction = "up"
}: ParallaxSectionProps) => {
  const ref = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });

  const multiplier = direction === "up" ? -1 : 1;
  const y = useTransform(scrollYProgress, [0, 1], [100 * speed * multiplier, -100 * speed * multiplier]);

  return (
    <motion.div
      ref={ref}
      style={{ y }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

// Background parallax layer (moves slower than foreground)
interface ParallaxBackgroundProps {
  children: ReactNode;
  className?: string;
  speed?: number;
}

export const ParallaxBackground = ({
  children,
  className = "",
  speed = 0.3
}: ParallaxBackgroundProps) => {
  const ref = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], [50 * speed, -50 * speed]);
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [1.05, 1, 1.05]);

  return (
    <motion.div
      ref={ref}
      style={{ y, scale }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

// Parallax container with multiple depth layers
interface ParallaxLayersProps {
  backgroundContent?: ReactNode;
  foregroundContent: ReactNode;
  className?: string;
  backgroundSpeed?: number;
  foregroundSpeed?: number;
}

export const ParallaxLayers = ({
  backgroundContent,
  foregroundContent,
  className = "",
  backgroundSpeed = 0.15,
  foregroundSpeed = 0.35
}: ParallaxLayersProps) => {
  const ref = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });

  const bgY = useTransform(scrollYProgress, [0, 1], [80 * backgroundSpeed, -80 * backgroundSpeed]);
  const fgY = useTransform(scrollYProgress, [0, 1], [-60 * foregroundSpeed, 60 * foregroundSpeed]);

  return (
    <div ref={ref} className={`relative ${className}`}>
      {backgroundContent && (
        <motion.div 
          style={{ y: bgY }} 
          className="absolute inset-0 z-0"
        >
          {backgroundContent}
        </motion.div>
      )}
      <motion.div 
        style={{ y: fgY }} 
        className="relative z-10"
      >
        {foregroundContent}
      </motion.div>
    </div>
  );
};

export default ParallaxSection;

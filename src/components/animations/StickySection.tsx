import { motion, useScroll, useTransform } from "framer-motion";
import { ReactNode, useRef } from "react";

interface StickySectionProps {
  children: ReactNode;
  className?: string;
  height?: string; // Total scroll height (e.g., "200vh")
}

export const StickySection = ({
  children,
  className = "",
  height = "200vh"
}: StickySectionProps) => {
  return (
    <div className={`relative ${className}`} style={{ height }}>
      <div className="sticky top-0 h-screen overflow-hidden">
        {children}
      </div>
    </div>
  );
};

// Content that fades/transforms based on scroll position
interface StickyContentProps {
  children: ReactNode;
  index: number;
  total: number;
  className?: string;
}

export const StickyContent = ({
  children,
  index,
  total,
  className = ""
}: StickyContentProps) => {
  const ref = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll();
  
  // Calculate when this content should be visible
  const segmentSize = 1 / total;
  const start = index * segmentSize;
  const end = (index + 1) * segmentSize;
  
  const opacity = useTransform(
    scrollYProgress,
    [start, start + 0.05, end - 0.05, end],
    [0, 1, 1, 0]
  );
  
  const y = useTransform(
    scrollYProgress,
    [start, start + 0.1, end - 0.1, end],
    [50, 0, 0, -50]
  );
  
  const scale = useTransform(
    scrollYProgress,
    [start, start + 0.1, end - 0.1, end],
    [0.95, 1, 1, 0.95]
  );

  return (
    <motion.div
      ref={ref}
      style={{ opacity, y, scale }}
      className={`absolute inset-0 flex items-center justify-center ${className}`}
    >
      {children}
    </motion.div>
  );
};

// Horizontal scroll within sticky section
interface StickyHorizontalScrollProps {
  children: ReactNode;
  className?: string;
}

export const StickyHorizontalScroll = ({
  children,
  className = ""
}: StickyHorizontalScrollProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });
  
  const x = useTransform(scrollYProgress, [0, 1], ["0%", "-66.666%"]);

  return (
    <div ref={containerRef} className={`relative h-[300vh] ${className}`}>
      <div className="sticky top-0 h-screen flex items-center overflow-hidden">
        <motion.div 
          style={{ x }}
          className="flex gap-8 pl-8"
        >
          {children}
        </motion.div>
      </div>
    </div>
  );
};

export default StickySection;

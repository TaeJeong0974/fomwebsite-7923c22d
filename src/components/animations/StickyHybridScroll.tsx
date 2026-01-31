import { motion, useScroll, useTransform } from "framer-motion";
import { ReactNode, useRef } from "react";

interface SlideContent {
  label?: string;
  title: string;
  description: string;
  content?: ReactNode;
}

interface StickyHybridScrollProps {
  slides: SlideContent[];
  className?: string;
}

export const StickyHybridScroll = ({
  slides,
  className = ""
}: StickyHybridScrollProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const totalSlides = slides.length;
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  // Horizontal movement - slides move left as you scroll
  const x = useTransform(
    scrollYProgress, 
    [0, 1], 
    ["0%", `-${(totalSlides - 1) * 100}%`]
  );

  return (
    <div 
      ref={containerRef} 
      className={`relative ${className}`}
      style={{ height: `${totalSlides * 100}vh` }}
    >
      <div className="sticky top-0 h-screen flex items-center overflow-hidden">
        {/* Progress indicator */}
        <div className="absolute right-8 top-1/2 -translate-y-1/2 z-20 flex flex-col gap-3">
          {slides.map((_, i) => (
            <ProgressDot 
              key={i} 
              index={i} 
              total={totalSlides} 
              scrollYProgress={scrollYProgress} 
            />
          ))}
        </div>

        {/* Horizontal sliding container */}
        <motion.div 
          style={{ x }}
          className="flex h-full w-full"
        >
          {slides.map((slide, i) => (
            <SlidePanel
              key={i}
              slide={slide}
              index={i}
              total={totalSlides}
              scrollYProgress={scrollYProgress}
            />
          ))}
        </motion.div>
      </div>
    </div>
  );
};

// Individual slide panel with fade content
interface SlidePanelProps {
  slide: SlideContent;
  index: number;
  total: number;
  scrollYProgress: ReturnType<typeof useScroll>["scrollYProgress"];
}

const SlidePanel = ({ slide, index, total, scrollYProgress }: SlidePanelProps) => {
  const segmentSize = 1 / total;
  const start = index * segmentSize;
  const peak = start + segmentSize * 0.5;
  const end = (index + 1) * segmentSize;

  // Content fades in as slide centers, fades out as it leaves
  const opacity = useTransform(
    scrollYProgress,
    index === 0 
      ? [start, peak, end - segmentSize * 0.2, end]
      : index === total - 1
        ? [start, start + segmentSize * 0.3, end]
        : [start, start + segmentSize * 0.3, end - segmentSize * 0.3, end],
    index === 0 
      ? [1, 1, 1, 0]
      : index === total - 1
        ? [0, 1, 1]
        : [0, 1, 1, 0]
  );

  // Subtle scale for emphasis when centered
  const scale = useTransform(
    scrollYProgress,
    [start, start + segmentSize * 0.3, end - segmentSize * 0.3, end],
    [0.95, 1, 1, 0.95]
  );

  // Content rises up slightly as it enters
  const y = useTransform(
    scrollYProgress,
    index === 0
      ? [start, end]
      : [start, start + segmentSize * 0.4, end],
    index === 0
      ? [0, -20]
      : [30, 0, -20]
  );

  return (
    <div className="flex-shrink-0 w-full h-full flex items-center justify-center px-8 md:px-16">
      <motion.div 
        style={{ opacity, scale, y }}
        className="glass rounded-2xl p-8 md:p-12 max-w-2xl w-full text-center"
      >
        {slide.label && (
          <span className="text-label mb-4 block">{slide.label}</span>
        )}
        <h3 className="text-display-lg text-foreground mb-4">{slide.title}</h3>
        <p className="text-body text-muted-foreground mb-6">{slide.description}</p>
        {slide.content}
      </motion.div>
    </div>
  );
};

// Progress dot indicator
interface ProgressDotProps {
  index: number;
  total: number;
  scrollYProgress: ReturnType<typeof useScroll>["scrollYProgress"];
}

const ProgressDot = ({ index, total, scrollYProgress }: ProgressDotProps) => {
  const segmentSize = 1 / total;
  const start = index * segmentSize;
  const end = (index + 1) * segmentSize;

  const scale = useTransform(
    scrollYProgress,
    [start, start + segmentSize * 0.2, end - segmentSize * 0.2, end],
    [1, 1.5, 1.5, 1]
  );

  const opacity = useTransform(
    scrollYProgress,
    [start, start + segmentSize * 0.2, end - segmentSize * 0.2, end],
    [0.3, 1, 1, 0.3]
  );

  return (
    <motion.div
      className="w-2 h-2 rounded-full bg-foreground"
      style={{ scale, opacity }}
    />
  );
};

export default StickyHybridScroll;

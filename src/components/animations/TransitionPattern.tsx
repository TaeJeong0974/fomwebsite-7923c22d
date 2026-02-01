import { motion } from "framer-motion";

const liquidEase = [0.22, 1, 0.36, 1] as const;

interface TransitionPatternProps {
  animating?: boolean;
}

const TransitionPattern = ({ animating = true }: TransitionPatternProps) => {
  // Block configurations matching the uploaded image pattern
  const blocks = [
    // Large coral/orange block - top left
    { x: -5, y: -10, w: 45, h: 55, rotate: -8, color: "rgba(232, 135, 108, 0.85)", delay: 0 },
    // Pink/salmon block - center left
    { x: 10, y: 25, w: 40, h: 50, rotate: 12, color: "rgba(228, 167, 154, 0.8)", delay: 0.02 },
    // Warm peach block - top center
    { x: 25, y: -15, w: 50, h: 45, rotate: -5, color: "rgba(241, 192, 163, 0.75)", delay: 0.04 },
    // Deep coral block - bottom left
    { x: -8, y: 50, w: 48, h: 55, rotate: 15, color: "rgba(215, 119, 100, 0.8)", delay: 0.03 },
    // Teal/blue-green block - center
    { x: 35, y: 30, w: 42, h: 48, rotate: -10, color: "rgba(138, 171, 165, 0.7)", delay: 0.05 },
    // Light sage block - top right
    { x: 55, y: -5, w: 55, h: 50, rotate: 8, color: "rgba(186, 199, 186, 0.65)", delay: 0.06 },
    // Dusty rose block - center right
    { x: 60, y: 35, w: 45, h: 55, rotate: -12, color: "rgba(205, 166, 159, 0.75)", delay: 0.04 },
    // Warm orange block - bottom center
    { x: 30, y: 55, w: 50, h: 50, rotate: 6, color: "rgba(224, 145, 110, 0.8)", delay: 0.02 },
    // Muted blue block - right
    { x: 70, y: 15, w: 40, h: 45, rotate: -6, color: "rgba(162, 183, 188, 0.6)", delay: 0.07 },
    // Deep terracotta block - bottom right
    { x: 55, y: 60, w: 55, h: 50, rotate: 10, color: "rgba(198, 126, 107, 0.75)", delay: 0.05 },
    // Cream/beige block - overlay
    { x: 20, y: 40, w: 35, h: 40, rotate: -15, color: "rgba(244, 235, 220, 0.5)", delay: 0.03 },
    // Soft coral accent - small
    { x: 45, y: 10, w: 30, h: 35, rotate: 18, color: "rgba(235, 175, 155, 0.7)", delay: 0.04 },
  ];

  return (
    <div className="absolute inset-0 overflow-hidden" style={{ backgroundColor: '#f4f2ef' }}>
      {/* Overlapping gradient blocks */}
      <svg
        className="absolute inset-0 w-full h-full"
        viewBox="0 0 100 100"
        preserveAspectRatio="xMidYMid slice"
      >
        <defs>
          {/* Grain filter for texture */}
          <filter id="grain">
            <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="4" result="noise" />
            <feColorMatrix type="saturate" values="0" />
            <feBlend in="SourceGraphic" in2="noise" mode="multiply" />
          </filter>
        </defs>
        
        {blocks.map((block, index) => (
          <motion.rect
            key={index}
            x={block.x}
            y={block.y}
            width={block.w}
            height={block.h}
            fill={block.color}
            rx="1"
            ry="1"
            style={{
              transformOrigin: `${block.x + block.w / 2}% ${block.y + block.h / 2}%`,
              transform: `rotate(${block.rotate}deg)`,
            }}
            initial={animating ? { opacity: 0, scale: 0.8 } : { opacity: 1, scale: 1 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{
              duration: 0.4,
              delay: block.delay,
              ease: liquidEase,
            }}
          />
        ))}
      </svg>

      {/* Grain texture overlay */}
      <div 
        className="absolute inset-0 pointer-events-none opacity-[0.15] mix-blend-overlay"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
        }}
      />
    </div>
  );
};

export default TransitionPattern;

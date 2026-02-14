import { motion } from "framer-motion";
import { Play } from "lucide-react";

interface CursorFollowCTAProps {
  isVisible: boolean;
  x: number;
  y: number;
}

const CursorFollowCTA = ({ isVisible, x, y }: CursorFollowCTAProps) => {
  const size = 56;
  const half = size / 2;

  return (
    <motion.div
      className="absolute top-0 left-0 z-[10] pointer-events-none hidden md:flex items-center justify-center rounded-full bg-white shadow-xl"
      style={{ width: size, height: size }}
      animate={{
        opacity: isVisible ? 1 : 0,
        scale: isVisible ? 1 : 0,
        x: x - half,
        y: y - size,
      }}
      transition={{
        opacity: { duration: 0.2, ease: "easeOut", delay: isVisible ? 0.3 : 0 },
        scale: { duration: 0.25, ease: [0.22, 1, 0.36, 1], delay: isVisible ? 0.3 : 0 },
        x: { type: "spring", stiffness: 250, damping: 24, mass: 0.5 },
        y: { type: "spring", stiffness: 250, damping: 24, mass: 0.5 },
      }}
    >
      <Play className="w-4 h-4 text-foreground fill-foreground" />
    </motion.div>
  );
};

export default CursorFollowCTA;

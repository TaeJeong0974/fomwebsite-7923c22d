import { motion } from "framer-motion";
import { Play, Bell } from "lucide-react";

interface CursorFollowCTAProps {
  isVisible: boolean;
  x: number;
  y: number;
  centerX: number;
  centerY: number;
  variant?: "watch" | "notify";
}

const CursorFollowCTA = ({ isVisible, x, y, centerX, centerY, variant = "watch" }: CursorFollowCTAProps) => {
  const Icon = variant === "notify" ? Bell : Play;

  // Size of the pill (w-12 h-12 = 48px)
  const half = 24;
  const tx = x - half;
  const ty = y - half;
  const cx = centerX - half;
  const cy = centerY - half;

  return (
    <motion.div
      className="absolute top-0 left-0 z-[10] pointer-events-none hidden md:flex items-center justify-center w-12 h-12 bg-white rounded-full shadow-lg"
      initial={{ opacity: 0, scale: 0, x: cx, y: cy }}
      animate={{
        opacity: isVisible ? 1 : 0,
        scale: isVisible ? 1 : 0,
        x: isVisible ? tx : cx,
        y: isVisible ? ty : cy,
      }}
      transition={{
        opacity: { duration: 0.2, ease: "easeOut" },
        scale: { duration: 0.25, ease: [0.22, 1, 0.36, 1] },
        x: isVisible
          ? { type: "spring", stiffness: 300, damping: 28, mass: 0.5 }
          : { duration: 0.2, ease: [0.22, 1, 0.36, 1] },
        y: isVisible
          ? { type: "spring", stiffness: 300, damping: 28, mass: 0.5 }
          : { duration: 0.2, ease: [0.22, 1, 0.36, 1] },
      }}
    >
      <Icon className="w-4 h-4 text-foreground fill-foreground" />
    </motion.div>
  );
};

export default CursorFollowCTA;

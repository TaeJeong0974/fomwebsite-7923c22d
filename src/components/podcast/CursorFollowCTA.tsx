import { motion } from "framer-motion";
import { Play, Bell } from "lucide-react";

interface CursorFollowCTAProps {
  isVisible: boolean;
  x: number;
  y: number;
  centerX: number;
  centerY: number;
  label?: string;
  variant?: "watch" | "notify";
}

const CursorFollowCTA = ({ isVisible, x, y, centerX, centerY, label, variant = "watch" }: CursorFollowCTAProps) => {
  const Icon = variant === "notify" ? Bell : Play;
  const text = label || (variant === "notify" ? "Get Notified" : "Watch Now");

  const targetX = x - 70;
  const targetY = y - 24;
  const originX = centerX - 70;
  const originY = centerY - 24;

  return (
    <motion.div
      className="absolute top-0 left-0 z-[10] pointer-events-none hidden md:flex items-center gap-2.5 bg-white rounded-full px-5 py-3 shadow-lg"
      initial={{ opacity: 0, scale: 0.5, x: originX, y: originY }}
      animate={{
        opacity: isVisible ? 1 : 0,
        scale: isVisible ? 1 : 0.5,
        x: isVisible ? targetX : originX,
        y: isVisible ? targetY : originY,
      }}
      transition={{
        opacity: { duration: 0.25, ease: "easeOut" },
        scale: { duration: 0.3, ease: [0.22, 1, 0.36, 1] },
        x: isVisible
          ? { type: "spring", stiffness: 300, damping: 28, mass: 0.5 }
          : { duration: 0.2, ease: [0.22, 1, 0.36, 1] },
        y: isVisible
          ? { type: "spring", stiffness: 300, damping: 28, mass: 0.5 }
          : { duration: 0.2, ease: [0.22, 1, 0.36, 1] },
      }}
    >
      <Icon className="w-3.5 h-3.5 text-foreground fill-foreground shrink-0" />
      <span className="text-sm font-display font-semibold text-foreground whitespace-nowrap">{text}</span>
    </motion.div>
  );
};

export default CursorFollowCTA;

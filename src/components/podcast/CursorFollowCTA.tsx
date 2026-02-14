import { motion } from "framer-motion";
import { Play, Bell } from "lucide-react";

interface CursorFollowCTAProps {
  isVisible: boolean;
  x: number;
  y: number;
  variant?: "watch" | "notify";
}

const CursorFollowCTA = ({ isVisible, x, y, variant = "watch" }: CursorFollowCTAProps) => {
  const Icon = variant === "notify" ? Bell : Play;

  const size = 56;
  const half = size / 2;

  return (
    <motion.div
      className="absolute top-0 left-0 z-[10] pointer-events-none hidden md:flex items-center justify-center rounded-full bg-foreground shadow-xl"
      style={{ width: size, height: size }}
      animate={{
        opacity: isVisible ? 1 : 0,
        scale: isVisible ? 1 : 0,
        x: x - half,
        y: y - size,
      }}
      transition={{
        opacity: { duration: 0.2, ease: "easeOut" },
        scale: { duration: 0.25, ease: [0.22, 1, 0.36, 1] },
        x: { type: "spring", stiffness: 250, damping: 24, mass: 0.5 },
        y: { type: "spring", stiffness: 250, damping: 24, mass: 0.5 },
      }}
    >
      <Icon className="w-4 h-4 text-background fill-background" />
    </motion.div>
  );
};

export default CursorFollowCTA;

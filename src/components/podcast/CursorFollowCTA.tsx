import { motion } from "framer-motion";
import { Play, Bell } from "lucide-react";

interface CursorFollowCTAProps {
  isVisible: boolean;
  x: number;
  y: number;
  label?: string;
  variant?: "watch" | "notify";
}

const CursorFollowCTA = ({ isVisible, x, y, label, variant = "watch" }: CursorFollowCTAProps) => {
  const Icon = variant === "notify" ? Bell : Play;
  const text = label || (variant === "notify" ? "Get Notified" : "Watch Now");

  return (
    <motion.div
      className="absolute top-0 left-0 z-[10] pointer-events-none hidden md:flex items-center gap-2.5 bg-white rounded-full px-5 py-3 shadow-lg"
      initial={{ opacity: 0, scale: 0.7 }}
      animate={{
        opacity: isVisible ? 1 : 0,
        scale: isVisible ? 1 : 0.7,
        x: x - 70,
        y: y - 24,
      }}
      transition={{
        opacity: { duration: 0.2 },
        scale: { duration: 0.25, ease: [0.22, 1, 0.36, 1] },
        x: { type: "spring", stiffness: 300, damping: 28, mass: 0.5 },
        y: { type: "spring", stiffness: 300, damping: 28, mass: 0.5 },
      }}
    >
      <Icon className="w-3.5 h-3.5 text-foreground fill-foreground shrink-0" />
      <span className="text-sm font-display font-semibold text-foreground whitespace-nowrap">{text}</span>
    </motion.div>
  );
};

export default CursorFollowCTA;

import { motion } from "framer-motion";
import transitionPattern from "@/assets/transition-pattern.png";

const liquidEase = [0.22, 1, 0.36, 1] as const;

interface TransitionPatternProps {
  isExiting?: boolean;
}

const TransitionPattern = ({ isExiting = false }: TransitionPatternProps) => {
  return (
    <div className="absolute inset-0 overflow-hidden">
      {/* Animated pattern background */}
      <motion.div 
        className="absolute inset-[-20%] w-[140%] h-[140%]"
        style={{ 
          backgroundImage: `url(${transitionPattern})`,
          backgroundSize: '350px 350px',
          backgroundRepeat: 'repeat',
          backgroundPosition: 'center',
        }}
        initial={{ 
          scale: isExiting ? 1.1 : 1.2, 
          opacity: isExiting ? 1 : 0.8,
          rotate: isExiting ? 0 : -2,
        }}
        animate={{ 
          scale: isExiting ? 1.2 : 1, 
          opacity: 1,
          rotate: isExiting ? 2 : 0,
        }}
        transition={{ 
          duration: isExiting ? 0.5 : 0.7, 
          ease: liquidEase,
        }}
      />

      {/* Grain texture overlay */}
      <div 
        className="absolute inset-0 pointer-events-none opacity-[0.06] mix-blend-overlay"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
        }}
      />
    </div>
  );
};

export default TransitionPattern;

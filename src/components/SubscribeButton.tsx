import { useState } from "react";
import { motion } from "framer-motion";
import { useSubscribe } from "@/contexts/SubscribeContext";
import { liquidSpring } from "@/components/ui/LiquidButton";

interface SubscribeButtonProps {
  className?: string;
  children?: React.ReactNode;
  style?: React.CSSProperties;
}

const SubscribeButton = ({ className = "", children = "Subscribe", style }: SubscribeButtonProps) => {
  const { openSubscribe } = useSubscribe();
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div 
      onClick={openSubscribe} 
      className={`cursor-pointer px-4 pt-2.5 pb-1.5 -mx-4 -my-2 rounded-lg relative overflow-hidden ${className}`} 
      style={style}
      whileTap={{ scale: 0.96 }}
      transition={liquidSpring}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Animated gradient background */}
      <motion.div 
        className="absolute inset-0 rounded-lg"
        initial={{ opacity: 0 }}
        animate={{ 
          opacity: isHovered ? 1 : 0,
          backgroundColor: isHovered ? [
            'rgba(200,160,180,0.4)',
            'rgba(160,180,210,0.4)',
            'rgba(200,160,180,0.4)',
          ] : 'rgba(200,160,180,0.4)'
        }}
        transition={{ 
          opacity: { duration: 0.3 },
          backgroundColor: isHovered ? { duration: 2, repeat: Infinity, ease: "easeInOut" } : { duration: 0.15 }
        }}
        style={{ backdropFilter: 'blur(8px)' }}
      />
      <span className="relative z-10">{children}</span>
    </motion.div>
  );
};

export default SubscribeButton;

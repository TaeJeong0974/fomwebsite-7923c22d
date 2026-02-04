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
            'rgba(218,150,120,1)',
            'rgba(200,140,160,1)',
            'rgba(140,160,190,1)',
            'rgba(218,150,120,1)',
          ] : 'rgba(218,150,120,1)'
        }}
        transition={{ 
          opacity: { duration: 0.3 },
          backgroundColor: isHovered ? { duration: 3, repeat: Infinity, ease: "easeInOut" } : { duration: 0.15 }
        }}
      />
      {/* Black gradient overlay */}
      <motion.div 
        className="absolute inset-0 rounded-lg"
        initial={{ opacity: 0 }}
        animate={{ opacity: isHovered ? 1 : 0 }}
        transition={{ duration: 0.3 }}
        style={{
          background: 'linear-gradient(135deg, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.3) 100%)',
        }}
      />
      <motion.span 
        className="relative z-10"
        animate={{ color: isHovered ? '#ffffff' : 'inherit' }}
        transition={{ duration: 0.3 }}
      >
        {children}
      </motion.span>
    </motion.div>
  );
};

export default SubscribeButton;

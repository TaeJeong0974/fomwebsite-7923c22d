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
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ 
          opacity: isHovered ? 1 : 0,
          scale: isHovered ? 1 : 0.95,
          background: isHovered ? [
            'linear-gradient(135deg, rgb(230,130,110) 0%, rgb(200,140,150) 50%, rgb(130,150,180) 100%)',
            'linear-gradient(135deg, rgb(200,140,150) 0%, rgb(130,150,180) 50%, rgb(230,130,110) 100%)',
            'linear-gradient(135deg, rgb(130,150,180) 0%, rgb(230,130,110) 50%, rgb(200,140,150) 100%)',
            'linear-gradient(135deg, rgb(230,130,110) 0%, rgb(200,140,150) 50%, rgb(130,150,180) 100%)',
          ] : 'linear-gradient(135deg, rgb(230,130,110) 0%, rgb(200,140,150) 50%, rgb(130,150,180) 100%)'
        }}
        transition={{ 
          opacity: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
          scale: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
          background: isHovered ? { duration: 3, repeat: Infinity, ease: "easeInOut" } : { duration: 0.15 }
        }}
      />
      {/* Black gradient overlay */}
      <motion.div 
        className="absolute inset-0 rounded-lg"
        initial={{ opacity: 0 }}
        animate={{ opacity: isHovered ? 1 : 0 }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        style={{
          background: 'linear-gradient(135deg, rgba(0,0,0,0.5) 0%, rgba(0,0,0,0.3) 50%, rgba(0,0,0,0) 100%)',
        }}
      />
      <motion.span 
        className="relative z-10"
        animate={{ color: isHovered ? '#ffffff' : 'inherit' }}
        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
      >
        {children}
      </motion.span>
    </motion.div>
  );
};

export default SubscribeButton;

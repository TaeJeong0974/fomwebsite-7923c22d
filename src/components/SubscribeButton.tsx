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
      className={`cursor-pointer px-4 pt-2.5 pb-1.5 -mx-4 -my-2 rounded-lg transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${className}`} 
      style={{
        ...style,
        backgroundColor: isHovered ? 'hsl(var(--foreground))' : 'transparent',
        color: isHovered ? 'hsl(var(--background))' : undefined,
      }}
      whileTap={{ scale: 0.96 }}
      transition={liquidSpring}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <span>{children}</span>
    </motion.div>
  );
};

export default SubscribeButton;

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

  return (
    <motion.div 
      onClick={openSubscribe} 
      className={`cursor-pointer px-4 pt-2.5 pb-1.5 -mx-4 -my-2 rounded-lg transition-all duration-300 hover:bg-foreground/10 hover:backdrop-blur-xl hover:border hover:border-foreground/10 ${className}`} 
      style={style}
      whileTap={{ scale: 0.96 }}
      transition={liquidSpring}
    >
      {children}
    </motion.div>
  );
};

export default SubscribeButton;

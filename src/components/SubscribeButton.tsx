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
      className={`cursor-pointer ${className}`} 
      style={style}
      whileHover={{ scale: 1.04 }}
      whileTap={{ scale: 0.96 }}
      transition={liquidSpring}
    >
      {children}
    </motion.div>
  );
};

export default SubscribeButton;

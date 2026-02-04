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
      className={`cursor-pointer px-4 pt-2.5 pb-1.5 -mx-4 -my-2 rounded-lg transition-all duration-500 relative overflow-hidden group ${className}`} 
      style={style}
      whileTap={{ scale: 0.96 }}
      transition={liquidSpring}
    >
      {/* Iridescent glass background */}
      <div 
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-lg"
        style={{
          background: 'linear-gradient(135deg, rgba(255,200,200,0.3), rgba(200,220,255,0.3), rgba(220,200,255,0.3), rgba(200,255,220,0.3))',
          backdropFilter: 'blur(12px)',
        }}
      />
      <span className="relative z-10">{children}</span>
    </motion.div>
  );
};

export default SubscribeButton;

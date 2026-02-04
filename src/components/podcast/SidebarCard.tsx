import { useState, ReactNode } from "react";
import { motion } from "framer-motion";
import { useIsMobile } from "@/hooks/use-mobile";
import teaserBg from "@/assets/teaser-bg.png";

interface SidebarCardProps {
  title: string;
  children: ReactNode;
}

/**
 * Shared base component for Guest/Hosts sidebar cards.
 * Handles hover background effect and consistent styling.
 */
const SidebarCard = ({ title, children }: SidebarCardProps) => {
  const [isHovered, setIsHovered] = useState(false);
  const isMobile = useIsMobile();

  return (
    <div 
      className="relative rounded-xl p-5 md:p-6 overflow-hidden bg-background/70 backdrop-blur-xl border border-white/20"
      onMouseEnter={() => !isMobile && setIsHovered(true)}
      onMouseLeave={() => !isMobile && setIsHovered(false)}
    >
      {/* Hover Background */}
      <motion.div
        className="absolute inset-0 z-0"
        initial={{ opacity: 0 }}
        animate={{ opacity: isHovered ? 1 : 0 }}
        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
      >
        <img 
          src={teaserBg} 
          alt="" 
          className="w-full h-auto object-contain object-bottom absolute bottom-0 left-0" 
        />
        <div className="absolute inset-0 bg-[linear-gradient(to_bottom,hsl(var(--background))_0%,hsl(var(--background))_50%,hsl(var(--background)/0.8)_65%,hsl(var(--background)/0.3)_85%,transparent_100%)]" />
      </motion.div>
      
      {/* Animated color overlay */}
      <motion.div
        className="absolute inset-0 z-[1] mix-blend-soft-light rounded-xl"
        style={{
          background: 'linear-gradient(135deg, rgba(220, 50, 50, 0.9) 0%, rgba(140, 60, 180, 0.8) 50%, rgba(60, 100, 220, 0.9) 100%)',
        }}
        initial={{ opacity: 0 }}
        animate={{ opacity: isHovered ? 0.8 : 0 }}
        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
      />
      
      {/* Content */}
      <div className="relative z-10 flex flex-col justify-between min-h-0 md:min-h-[240px] lg:min-h-[280px]">
        <h3 className="text-section-header mb-5 md:mb-6">{title}</h3>
        {children}
      </div>
    </div>
  );
};

export default SidebarCard;

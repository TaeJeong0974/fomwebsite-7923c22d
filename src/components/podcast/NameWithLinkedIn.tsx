import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Linkedin } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

type HoverVariant = "underline" | "arrow" | "icon-prefix" | "row-highlight" | "tooltip";

interface NameWithLinkedInProps {
  firstName: string;
  lastName: string;
  linkedInUrl?: string;
  variant: HoverVariant;
  className?: string;
}

const NameWithLinkedIn = ({
  firstName,
  lastName,
  linkedInUrl,
  variant,
  className = "",
}: NameWithLinkedInProps) => {
  const [isHovered, setIsHovered] = useState(false);
  const isMobile = useIsMobile();

  const handleClick = () => {
    if (linkedInUrl) {
      window.open(linkedInUrl, "_blank", "noopener,noreferrer");
    }
  };

  const baseNameClasses = "font-display text-xl sm:text-2xl lg:text-3xl text-foreground leading-none tracking-normal";

  // Variant 1: Underline Slide
  if (variant === "underline") {
    return (
      <div
        className={`group cursor-pointer ${className}`}
        onMouseEnter={() => !isMobile && setIsHovered(true)}
        onMouseLeave={() => !isMobile && setIsHovered(false)}
        onClick={handleClick}
      >
        <div className="flex items-center gap-2">
          <div className="relative">
            <h3 className={baseNameClasses}>
              <span className="inline sm:block font-medium">{firstName} </span>
              <span className="inline sm:block font-normal">{lastName}</span>
            </h3>
            {/* Animated underline */}
            <motion.div
              className="absolute bottom-0 left-0 h-[2px] bg-foreground origin-left"
              initial={{ scaleX: 0 }}
              animate={{ scaleX: isHovered ? 1 : 0 }}
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
              style={{ width: "100%" }}
            />
          </div>
          {/* LinkedIn icon */}
          <motion.div
            initial={{ opacity: 0, x: -8 }}
            animate={{ opacity: isHovered ? 1 : 0, x: isHovered ? 0 : -8 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
          >
            <Linkedin size={18} className="text-foreground" />
          </motion.div>
        </div>
        <span className="text-[10px] text-muted-foreground/50 mt-1 block">Option 1: Underline Slide</span>
      </div>
    );
  }

  // Variant 2: Arrow Append
  if (variant === "arrow") {
    return (
      <div
        className={`group cursor-pointer ${className}`}
        onMouseEnter={() => !isMobile && setIsHovered(true)}
        onMouseLeave={() => !isMobile && setIsHovered(false)}
        onClick={handleClick}
      >
        <h3 className={`${baseNameClasses} flex items-baseline flex-wrap`}>
          <span className="inline sm:block font-medium">{firstName} </span>
          <span className="inline sm:block font-normal">{lastName}</span>
          {/* Animated arrow */}
          <motion.span
            className="inline-block ml-2 text-foreground"
            initial={{ opacity: 0, x: -12 }}
            animate={{ opacity: isHovered ? 1 : 0, x: isHovered ? 0 : -12 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
          >
            →
          </motion.span>
        </h3>
        <span className="text-[10px] text-muted-foreground/50 mt-1 block">Option 2: Arrow Append</span>
      </div>
    );
  }

  // Variant 3: Icon Prefix
  if (variant === "icon-prefix") {
    return (
      <div
        className={`group cursor-pointer ${className}`}
        onMouseEnter={() => !isMobile && setIsHovered(true)}
        onMouseLeave={() => !isMobile && setIsHovered(false)}
        onClick={handleClick}
      >
        <div className="flex items-center">
          {/* LinkedIn icon slides in from left */}
          <motion.div
            className="overflow-hidden"
            initial={{ width: 0, opacity: 0 }}
            animate={{ width: isHovered ? 26 : 0, opacity: isHovered ? 1 : 0 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
          >
            <Linkedin size={18} className="text-foreground mr-2" />
          </motion.div>
          <h3 className={baseNameClasses}>
            <span className="inline sm:block font-medium">{firstName} </span>
            <span className="inline sm:block font-normal">{lastName}</span>
          </h3>
        </div>
        <span className="text-[10px] text-muted-foreground/50 mt-1 block">Option 3: Icon Prefix</span>
      </div>
    );
  }

  // Variant 4: Row Highlight
  if (variant === "row-highlight") {
    return (
      <div
        className={`group cursor-pointer ${className}`}
        onMouseEnter={() => !isMobile && setIsHovered(true)}
        onMouseLeave={() => !isMobile && setIsHovered(false)}
        onClick={handleClick}
      >
        <motion.div
          className="flex items-center justify-between gap-4 -mx-3 px-3 py-2 rounded-lg"
          animate={{
            backgroundColor: isHovered ? "hsl(var(--foreground) / 0.05)" : "transparent",
          }}
          transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
        >
          <h3 className={baseNameClasses}>
            <span className="inline sm:block font-medium">{firstName} </span>
            <span className="inline sm:block font-normal">{lastName}</span>
          </h3>
          {/* LinkedIn pill */}
          <motion.div
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-foreground text-background text-xs font-medium"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: isHovered ? 1 : 0, scale: isHovered ? 1 : 0.9 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
          >
            <Linkedin size={14} />
            <span>LinkedIn</span>
          </motion.div>
        </motion.div>
        <span className="text-[10px] text-muted-foreground/50 mt-1 block">Option 4: Row Highlight</span>
      </div>
    );
  }

  // Variant 5: Tooltip Popup
  if (variant === "tooltip") {
    return (
      <TooltipProvider delayDuration={100}>
        <Tooltip open={isHovered}>
          <TooltipTrigger asChild>
            <div
              className={`group cursor-pointer inline-block ${className}`}
              onMouseEnter={() => !isMobile && setIsHovered(true)}
              onMouseLeave={() => !isMobile && setIsHovered(false)}
              onClick={handleClick}
            >
              <h3 className={`${baseNameClasses} hover:text-foreground/80 transition-colors`}>
                <span className="inline sm:block font-medium">{firstName} </span>
                <span className="inline sm:block font-normal">{lastName}</span>
              </h3>
              <span className="text-[10px] text-muted-foreground/50 mt-1 block">Option 5: Tooltip Popup</span>
            </div>
          </TooltipTrigger>
          <TooltipContent
            side="bottom"
            className="flex items-center gap-2 bg-foreground text-background border-0 px-4 py-2"
          >
            <Linkedin size={16} />
            <span>View on LinkedIn</span>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    );
  }

  return null;
};

export default NameWithLinkedIn;

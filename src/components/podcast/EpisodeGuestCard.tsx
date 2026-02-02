import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";
import teaserBg from "@/assets/teaser-bg.png";

interface EpisodeGuestCardProps {
  name: string;
  title: string;
  company: string;
  linkedInUrl?: string;
  bio?: string;
  isUpcoming?: boolean;
}

const EpisodeGuestCard = ({ name, title, company, linkedInUrl, bio, isUpcoming = false }: EpisodeGuestCardProps) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div 
      className="relative glass rounded-xl p-5 sm:p-6 overflow-hidden"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Hover Background */}
      <motion.div
        className="absolute inset-0 z-0"
        initial={{ opacity: 0 }}
        animate={{ opacity: isHovered ? 1 : 0 }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      >
        <img
          src={teaserBg} 
          alt="" 
          className="w-full h-auto object-contain object-bottom absolute bottom-0 left-0"
        />
        {/* Gradient overlay on top of image */}
        <div className="absolute inset-0 bg-[linear-gradient(to_bottom,hsl(var(--background))_50%,transparent)]" />
      </motion.div>
      
      {/* Content */}
      <div className="relative z-10 flex flex-col">
        {/* Header */}
        <h3 className="text-section-header">Guest</h3>
        
        {/* Guest Info */}
        <div className="space-y-4 mt-6">
          <h2 className="font-display text-3xl sm:text-4xl text-foreground leading-[0.95] tracking-normal">
            {name.split(' ').map((word, i) => (
              <span key={i} className={`block ${i === 0 ? 'font-medium' : 'font-normal'}`}>{word}</span>
            ))}
          </h2>
          <div className="mt-1">
            <p className="text-sm text-muted-foreground">{title}</p>
            <p className="text-sm font-medium text-foreground">{company}</p>
          </div>
          {linkedInUrl && (
            <a
              href={linkedInUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-muted-foreground hover:text-foreground hover-transition inline-block"
            >
              LinkedIn →
            </a>
          )}
        </div>
        
        {/* Bio Accordion */}
        {bio && (
          <div className="mt-auto pt-6 border-t border-border/50">
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className="flex items-center justify-between w-full text-left group"
            >
              <span className="text-sm font-medium text-foreground">About {name.split(' ')[0]}</span>
                <motion.div
                  animate={{ rotate: isExpanded ? 180 : 0 }}
                  whileHover={{ scale: isExpanded ? 1 : [1, 1.15, 1] }}
                  transition={{ 
                    rotate: { duration: 0.3 },
                    scale: { duration: 0.6, ease: "easeInOut" }
                  }}
                  className={`rounded-full p-1.5 backdrop-blur-xl border transition-colors duration-300 ${
                    isHovered 
                      ? 'bg-foreground border-foreground' 
                      : 'bg-foreground/5 border-border/20'
                  }`}
                >
                  <ChevronDown className={`h-4 w-4 transition-colors duration-300 ${isHovered ? 'text-background' : 'text-foreground'}`} />
                </motion.div>
            </button>
            
            <AnimatePresence>
              {isExpanded && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                  className="overflow-hidden"
                >
                  <p className="text-sm text-foreground leading-relaxed pt-4">
                    {bio}
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        )}
      </div>
    </div>
  );
};

export default EpisodeGuestCard;

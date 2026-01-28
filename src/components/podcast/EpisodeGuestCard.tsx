import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";

interface EpisodeGuestCardProps {
  name: string;
  title: string;
  company: string;
  linkedInUrl?: string;
  bio?: string;
  isUpcoming?: boolean;
  isHost?: boolean;
}

const EpisodeGuestCard = ({ name, title, company, linkedInUrl, bio, isUpcoming = false, isHost = false }: EpisodeGuestCardProps) => {
  const [isExpanded, setIsExpanded] = useState(false);
  
  const getLabel = () => {
    if (isHost) return "Your Host";
    if (isUpcoming) return "Upcoming Guest";
    return "Featured Guest";
  };

  // Collapsible bio only for hosts (multi-author scenarios)
  const isCollapsible = isHost && bio;

  return (
    <div className="glass rounded-xl p-5 sm:p-6 space-y-4 sm:space-y-6">
      {/* Header */}
      <p className="text-label">
        {getLabel()}
      </p>
      
      {/* Guest Info */}
      <div className="space-y-4">
        <div 
          className={isCollapsible ? "flex items-end justify-between cursor-pointer" : ""}
          onClick={isCollapsible ? () => setIsExpanded(!isExpanded) : undefined}
        >
          <div>
            <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-semibold text-foreground leading-[0.95]">
              {name.split(' ').map((word, i) => (
                <span key={i} className="block">{word}</span>
              ))}
            </h2>
            <p className="text-sm text-foreground mt-4">
              {title}, <span className="font-medium text-foreground">{company}</span>
            </p>
          </div>
          
          {isCollapsible && (
            <motion.div
              animate={{ rotate: isExpanded ? 180 : 0 }}
              whileHover={{ scale: isExpanded ? 1 : [1, 1.15, 1] }}
              transition={{ 
                rotate: { duration: 0.3 },
                scale: { duration: 0.6, ease: "easeInOut" }
              }}
              className="rounded-full p-2 bg-foreground/5 backdrop-blur-xl border border-border/20 flex-shrink-0 ml-4"
            >
              <ChevronDown className="h-5 w-5 text-foreground" />
            </motion.div>
          )}
        </div>
        
        {linkedInUrl && (
          <a
            href={linkedInUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-foreground hover:text-foreground/70 hover-transition inline-block"
            onClick={(e) => e.stopPropagation()}
          >
            LinkedIn →
          </a>
        )}
      </div>
      
      {/* Bio - Collapsible for hosts, always visible otherwise */}
      {bio && !isCollapsible && (
        <p className="text-sm text-foreground leading-relaxed pt-6 border-t border-border/50">
          {bio}
        </p>
      )}
      
      {isCollapsible && (
        <AnimatePresence>
          {isExpanded && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
              className="overflow-hidden"
            >
              <p className="text-sm text-foreground leading-relaxed pt-6 border-t border-border/50">
                {bio}
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      )}
    </div>
  );
};

export default EpisodeGuestCard;

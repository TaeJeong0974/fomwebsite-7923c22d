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
}

const EpisodeGuestCard = ({ name, title, company, linkedInUrl, bio, isUpcoming = false }: EpisodeGuestCardProps) => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="glass rounded-xl p-6 sm:p-8 space-y-6">
      {/* Header */}
      <h3 className="text-[0.9375rem] font-medium text-foreground">
        {isUpcoming ? "Upcoming Guest" : "Featured Guest"}
      </h3>
      
      {/* Guest Info */}
      <div className="space-y-4">
        <h2 className="font-display text-3xl sm:text-4xl text-foreground leading-[0.95] tracking-normal">
          {name.split(' ').map((word, i) => (
            <span key={i} className={`block ${i === 0 ? 'font-medium' : 'font-normal'}`}>{word}</span>
          ))}
        </h2>
        <p className="text-muted-foreground">
          {title}, <span className="font-medium text-foreground">{company}</span>
        </p>
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
        <div className="pt-4 border-t border-border/50">
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
              className="rounded-full p-1.5 bg-foreground/5 backdrop-blur-xl border border-border/20"
            >
              <ChevronDown className="h-4 w-4 text-foreground" />
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
  );
};

export default EpisodeGuestCard;

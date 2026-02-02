import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";
import guestBg from "@/assets/guest-bg.png";

interface EpisodeGuestCardProps {
  name: string;
  title: string;
  company: string;
  linkedInUrl?: string;
  bio?: string;
  isUpcoming?: boolean;
}

const EpisodeGuestCard = ({ name, title, company, linkedInUrl, bio }: EpisodeGuestCardProps) => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="group">
      <div 
        className="card-image"
        style={{
          backgroundImage: `url(${guestBg})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div className="card-overlay-light" />
        
        {/* Content */}
        <div className="card-content-bottom card-padding-lg z-[3]">
          {/* Header */}
          <span className="text-sm font-medium text-white/70 uppercase tracking-wider mb-4 block">Guest</span>
          
          {/* Guest Info */}
          <h2 className="font-display text-4xl sm:text-3xl lg:text-4xl text-white leading-[0.95] tracking-normal">
            {name.split(' ').map((word, i) => (
              <span key={i} className={`block ${i === 0 ? 'font-medium' : 'font-normal'}`}>{word}</span>
            ))}
          </h2>
          <div className="mt-2">
            <p className="text-sm text-white/70">{title}</p>
            <p className="text-sm font-medium text-white">{company}</p>
          </div>
          {linkedInUrl && (
            <a
              href={linkedInUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-white/70 hover:text-white hover-transition inline-block mt-2"
            >
              LinkedIn →
            </a>
          )}
          
          {/* Bio Accordion */}
          {bio && (
            <div className="mt-4 pt-4 border-t border-white/20">
              <button
                onClick={() => setIsExpanded(!isExpanded)}
                className="flex items-center justify-between w-full text-left group/btn"
              >
                <span className="text-sm font-medium text-white">About {name.split(' ')[0]}</span>
                <motion.div
                  animate={{ rotate: isExpanded ? 180 : 0 }}
                  whileHover={{ scale: isExpanded ? 1 : [1, 1.15, 1] }}
                  transition={{ 
                    rotate: { duration: 0.3 },
                    scale: { duration: 0.6, ease: "easeInOut" }
                  }}
                  className="rounded-full p-1.5 bg-white/10 backdrop-blur-xl border border-white/20"
                >
                  <ChevronDown className="h-4 w-4 text-white" />
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
                    <p className="text-sm text-white/90 leading-relaxed pt-4" style={{ textShadow: '0 1px 2px rgba(0,0,0,0.3)' }}>
                      {bio}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default EpisodeGuestCard;
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
  imageUrl?: string;
}

const EpisodeGuestCard = ({ name, title, company, linkedInUrl, bio, isUpcoming = false, imageUrl }: EpisodeGuestCardProps) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const nameParts = name.split(' ');
  const firstName = nameParts[0];
  const lastName = nameParts.slice(1).join(' ');

  return (
    <div className="space-y-3">
      <p className="text-label">
        {isUpcoming ? "Upcoming Guest" : "Featured Guest"}
      </p>
      
      <div 
        className="card-base card-image cursor-pointer"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        {/* Background Image */}
        <div className="absolute inset-0">
          <img 
            src={imageUrl || guestBg} 
            alt={name}
            className="w-full h-full object-cover"
          />
          <div className="card-overlay" />
        </div>

        {/* Content */}
        <div className="card-content-bottom card-padding">
          <div className="flex items-end justify-between">
            <div>
              <h3 className="font-display text-white leading-[0.95] tracking-normal">
                <span className="block text-2xl sm:text-3xl font-medium">{firstName}</span>
                <span className="block text-2xl sm:text-3xl font-normal">{lastName}</span>
              </h3>
              <p className="text-body-sm text-white mt-1">
                {title}, <span className="font-normal text-white/80">{company}</span>
              </p>
              {linkedInUrl && (
                <a
                  href={linkedInUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={(e) => e.stopPropagation()}
                  className="text-sm text-white/80 hover:text-white hover-transition inline-block mt-2"
                >
                  LinkedIn →
                </a>
              )}
            </div>
            {bio && (
              <motion.div
                animate={{ rotate: isExpanded ? 180 : 0 }}
                whileHover={{ scale: isExpanded ? 1 : [1, 1.15, 1] }}
                transition={{ 
                  rotate: { duration: 0.3 },
                  scale: { duration: 0.6, ease: "easeInOut" }
                }}
                className="rounded-full p-2 bg-white/10 backdrop-blur-xl border border-white/20"
              >
                <ChevronDown className="h-5 w-5 text-white" />
              </motion.div>
            )}
          </div>
          
          {/* Expandable Bio */}
          <AnimatePresence>
            {isExpanded && bio && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="overflow-hidden"
              >
                <p className="text-sm leading-relaxed text-white/90 mt-4" style={{ textShadow: '0 1px 2px rgba(0,0,0,0.3)' }}>
                  {bio}
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

export default EpisodeGuestCard;

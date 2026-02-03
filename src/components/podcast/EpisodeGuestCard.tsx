import { useState } from "react";
import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import teaserBg from "@/assets/teaser-bg.png";

interface EpisodeGuestCardProps {
  name: string;
  title: string;
  company: string;
  linkedInUrl?: string;
  bio?: string;
}

const EpisodeGuestCard = ({ name, title, company, linkedInUrl, bio }: EpisodeGuestCardProps) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  
  const [firstName, ...lastNameParts] = name.split(' ');
  const lastName = lastNameParts.join(' ');

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
        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
      >
        <img src={teaserBg} alt="" className="w-full h-auto object-contain object-bottom absolute bottom-0 left-0" />
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
      <div className="relative z-10 flex flex-col justify-between min-h-[280px]">
        <h3 className="text-section-header">Guest</h3>
        
        <div>
          <h3 className="font-display text-2xl sm:text-3xl text-foreground leading-none tracking-normal">
            <span className="block font-medium">{firstName}</span>
            <span className="block font-normal">{lastName}</span>
          </h3>
          <p className="text-sm text-muted-foreground mt-2">{title}</p>
          <p className="text-sm font-medium text-foreground">{company}</p>
          {linkedInUrl && (
            <a
              href={linkedInUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-muted-foreground hover:text-foreground hover-transition inline-block mt-2"
            >
              LinkedIn →
            </a>
          )}
          
          {bio && (
            <div className="pt-4 mt-4 border-t border-border/20">
              <button
                onClick={() => setIsExpanded(!isExpanded)}
                className="flex items-center justify-between w-full text-left"
              >
                <span className="text-sm font-medium text-foreground">About {firstName}</span>
                <motion.div
                  animate={{ rotate: isExpanded ? 180 : 0 }}
                  whileHover={{ scale: isExpanded ? 1 : [1, 1.15, 1] }}
                  transition={{ rotate: { duration: 0.3 }, scale: { duration: 0.6, ease: "easeInOut" } }}
                  className="rounded-full p-1.5 bg-foreground/10 border border-border/20"
                >
                  <ChevronDown className="h-4 w-4 text-foreground" />
                </motion.div>
              </button>
              
              <div 
                className="grid transition-[grid-template-rows] duration-300 ease-[cubic-bezier(0.33,1,0.68,1)]"
                style={{ gridTemplateRows: isExpanded ? '1fr' : '0fr' }}
              >
                <div className="overflow-hidden">
                  <p className="text-sm text-foreground/90 leading-relaxed pt-4">{bio}</p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default EpisodeGuestCard;
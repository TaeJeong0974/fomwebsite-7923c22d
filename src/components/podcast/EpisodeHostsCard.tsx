import { useState } from "react";
import { motion } from "framer-motion";
import { podcastHosts } from "@/lib/podcastData";
import { useIsMobile } from "@/hooks/use-mobile";
import teaserBg from "@/assets/teaser-bg.png";

interface EpisodeHostsCardProps {
  showAllHosts?: boolean;
}

const EpisodeHostsCard = ({ showAllHosts = false }: EpisodeHostsCardProps) => {
  const [isHovered, setIsHovered] = useState(false);
  const isMobile = useIsMobile();
  const hosts = showAllHosts ? podcastHosts : podcastHosts.slice(0, 2);

  // Single card layout for both mobile and desktop
  return (
    <div 
      className="relative glass rounded-xl p-5 sm:p-6 overflow-hidden"
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
        <div className="absolute inset-0 bg-[linear-gradient(to_bottom,hsl(var(--background))_0%,hsl(var(--background))_90%,hsl(var(--background)/0.3)_95%,transparent_100%)]" />
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
      <div className="relative z-10 flex flex-col justify-between min-h-0 sm:min-h-[280px]">
        <h3 className="text-section-header mb-4 sm:mb-0">Hosts</h3>
        
        <div className="space-y-3 sm:space-y-4">
          {hosts.map((host, index) => {
            const [firstName, ...lastNameParts] = host.name.split(' ');
            const lastName = lastNameParts.join(' ');
            return (
              <div key={index} className={index > 0 ? "pt-3 sm:pt-4 border-t-[1.5px] border-border/40" : ""}>
                <h3 className="font-display text-xl sm:text-2xl lg:text-3xl text-foreground leading-none tracking-normal">
                  <span className="inline sm:block font-medium">{firstName} </span>
                  <span className="inline sm:block font-normal">{lastName}</span>
                </h3>
                <p className="text-xs sm:text-sm text-muted-foreground mt-1 sm:mt-2">
                  {host.title}, {host.company}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default EpisodeHostsCard;

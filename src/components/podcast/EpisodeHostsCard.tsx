import { useState } from "react";
import { motion } from "framer-motion";
import { podcastHosts } from "@/lib/podcastData";
import teaserBg from "@/assets/teaser-bg.png";

interface EpisodeHostsCardProps {
  showAllHosts?: boolean;
}

const EpisodeHostsCard = ({ showAllHosts = false }: EpisodeHostsCardProps) => {
  const [isHovered, setIsHovered] = useState(false);
  const hosts = showAllHosts ? podcastHosts : podcastHosts.slice(0, 2);

  // Single card layout for both mobile and desktop
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
        transition={{ duration: 4, ease: [0.22, 1, 0.36, 1] }}
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
        initial={{ opacity: 0 }}
        animate={{
          opacity: isHovered ? 0.8 : 0,
          background: isHovered ? [
            'linear-gradient(135deg, rgba(220, 50, 50, 0.9) 0%, rgba(140, 60, 180, 0.8) 50%, rgba(60, 100, 220, 0.9) 100%)',
            'linear-gradient(135deg, rgba(140, 60, 180, 0.9) 0%, rgba(60, 100, 220, 0.8) 50%, rgba(220, 50, 50, 0.9) 100%)',
            'linear-gradient(135deg, rgba(60, 100, 220, 0.9) 0%, rgba(220, 50, 50, 0.8) 50%, rgba(140, 60, 180, 0.9) 100%)',
            'linear-gradient(135deg, rgba(220, 50, 50, 0.9) 0%, rgba(140, 60, 180, 0.8) 50%, rgba(60, 100, 220, 0.9) 100%)',
          ] : undefined,
        }}
        transition={{
          opacity: { duration: 4, ease: [0.22, 1, 0.36, 1] },
          background: { duration: 3, ease: 'easeInOut', repeat: Infinity, repeatType: 'loop' },
        }}
      />
      
      {/* Content */}
      <div className="relative z-10 flex flex-col h-full min-h-[280px]">
        {/* Top: Header and LinkedIn buttons */}
        <div className="flex items-start justify-between mb-6">
          <h3 className="text-section-header">Hosts</h3>
          <div className="flex gap-2">
            {hosts.map((host, index) => (
              host.linkedInUrl && (
                <a
                  key={index}
                  href={host.linkedInUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-full bg-foreground text-background text-sm font-medium hover:bg-foreground/90 hover-transition"
                >
                  LinkedIn →
                </a>
              )
            ))}
          </div>
        </div>
        
        {/* Spacer */}
        <div className="flex-1" />
        
        {/* Bottom: Names and titles */}
        <div className="space-y-4">
          {hosts.map((host, index) => {
            const [firstName, ...lastNameParts] = host.name.split(' ');
            const lastName = lastNameParts.join(' ');
            return (
              <div key={index} className={index > 0 ? "pt-4 border-t border-border/20" : ""}>
                <h3 className="font-display text-foreground leading-[0.95] tracking-normal">
                  <span className="block text-2xl sm:text-3xl font-medium">{firstName}</span>
                  <span className="block text-2xl sm:text-3xl font-normal">{lastName}</span>
                </h3>
                <p className="text-sm text-muted-foreground mt-2">
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

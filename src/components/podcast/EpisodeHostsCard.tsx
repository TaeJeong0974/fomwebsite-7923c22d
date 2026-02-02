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
      
      {/* Animated color overlay - like Subscribe card */}
      <motion.div
        className="absolute inset-0 z-[1] mix-blend-soft-light rounded-xl"
        initial={{ opacity: 0 }}
        animate={{
          opacity: isHovered ? 0.8 : 0,
          background: isHovered ? [
            'linear-gradient(135deg, rgba(100, 120, 180, 0.9) 0%, rgba(255, 120, 100, 0.8) 50%, rgba(180, 160, 220, 0.9) 100%)',
            'linear-gradient(135deg, rgba(255, 140, 120, 0.8) 0%, rgba(120, 100, 200, 0.9) 50%, rgba(255, 100, 130, 0.8) 100%)',
            'linear-gradient(135deg, rgba(160, 140, 220, 0.9) 0%, rgba(255, 130, 100, 0.8) 50%, rgba(100, 140, 200, 0.9) 100%)',
            'linear-gradient(135deg, rgba(100, 120, 180, 0.9) 0%, rgba(255, 120, 100, 0.8) 50%, rgba(180, 160, 220, 0.9) 100%)',
          ] : undefined,
        }}
        transition={{
          opacity: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
          background: { duration: 3, ease: 'easeInOut', repeat: Infinity, repeatType: 'loop' },
        }}
      />
      
      {/* Content */}
      <div className="relative z-10">
        <h3 className="text-section-header mb-6">Hosts</h3>
        <div className="space-y-5">
          {hosts.map((host, index) => (
            <div key={index} className={index > 0 ? "pt-5 border-t border-border/20" : ""}>
              <h3 className="font-display text-xl sm:text-2xl font-medium text-foreground tracking-normal">
                {host.name}
              </h3>
              <p className="text-sm text-muted-foreground mt-1">
                {host.title}, {host.company}
              </p>
              {host.linkedInUrl && (
                <a
                  href={host.linkedInUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-muted-foreground hover:text-foreground hover-transition inline-block mt-2"
                >
                  LinkedIn →
                </a>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default EpisodeHostsCard;

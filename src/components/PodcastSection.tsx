import { useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { LayoutGrid, List } from "lucide-react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { getPublishedEpisodes, getComingSoonEpisodes, PodcastEpisode, podcastHosts } from "@/lib/podcastData";
import SubscribeCard from "@/components/SubscribeCard";
import PodcastCard from "@/components/podcast/PodcastCard";
import MouseFollowImage from "@/components/podcast/MouseFollowImage";
import { liquidEase } from "@/components/animations/PageLoadAnimation";
import hostMada from "@/assets/host-mada.png";
import hostEthan from "@/assets/host-ethan.png";
import hostCamille from "@/assets/host-camille.png";
import guestBg from "@/assets/guest-bg.png";

type LayoutType = "grid" | "list";

// Episode image mapping
const EPISODE_IMAGES: Record<string, string> = {
  'meagen-eisenberg': guestBg,
};

const HOST_IMAGES = [hostMada, hostEthan, hostCamille];


const isNewEpisode = (publishedDate: string): boolean => {
  if (publishedDate === "Coming Soon") return false;
  const published = new Date(publishedDate);
  const diffDays = (Date.now() - published.getTime()) / (1000 * 60 * 60 * 24);
  return diffDays <= 7;
};

const getEpisodeImage = (slug: string, index: number): string => {
  return EPISODE_IMAGES[slug] || HOST_IMAGES[index % HOST_IMAGES.length];
};

const PodcastSection = () => {
  const [layout, setLayout] = useState<LayoutType>("grid");
  const publishedEpisodes = getPublishedEpisodes();
  const comingSoonEpisodes = getComingSoonEpisodes();

  return (
    <section id="podcast" className="section-spacing">
      <div className="container mx-auto container-padding">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-6 lg:mb-8">
          <div>
            <p className="text-label mb-2">WATCH</p>
            <h2 className="text-display-xl text-foreground" style={{ fontWeight: 500 }}>Podcast</h2>
          </div>
          
          {/* Layout Toggle */}
          <TooltipProvider delayDuration={300}>
            <div className="glass rounded-full p-1.5 flex items-center gap-1">
              {[
                { type: "grid" as const, icon: LayoutGrid, label: "Grid view" },
                { type: "list" as const, icon: List, label: "List view" },
              ].map(({ type, icon: Icon, label }) => (
                <Tooltip key={type}>
                  <TooltipTrigger asChild>
                    <button 
                      onClick={() => setLayout(type)} 
                      className={`p-2.5 rounded-full transition-all duration-300 flex items-center gap-2 ${
                        layout === type 
                          ? "bg-foreground text-background shadow-lg" 
                          : "text-foreground hover:bg-foreground/5"
                      }`}
                    >
                      <Icon className="h-4 w-4" />
                      <span className="text-xs font-medium pr-1 capitalize">{type}</span>
                    </button>
                  </TooltipTrigger>
                  <TooltipContent><p>{label}</p></TooltipContent>
                </Tooltip>
              ))}
            </div>
          </TooltipProvider>
        </div>

        {/* Animated Layout Switch */}
        <AnimatePresence mode="wait">
          <motion.div 
            key={layout}
            initial={{ opacity: 0, y: 20 }} 
            animate={{ opacity: 1, y: 0 }} 
            exit={{ opacity: 0, y: -20 }} 
            transition={{ duration: 0.3 }}
          >
            {layout === "grid" ? (
              <PodcastGridView 
                episodes={publishedEpisodes} 
                comingSoonEpisodes={comingSoonEpisodes} 
              />
            ) : (
              <PodcastListView 
                episodes={publishedEpisodes} 
                comingSoonEpisodes={comingSoonEpisodes} 
              />
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
};

interface PodcastViewProps {
  episodes: PodcastEpisode[];
  comingSoonEpisodes: PodcastEpisode[];
}

const PodcastGridView = ({ episodes, comingSoonEpisodes }: PodcastViewProps) => (
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 grid-gap">
    {episodes.slice(0, 4).map((episode, index) => (
      <motion.div 
        key={episode.id} 
        initial={{ opacity: 0, y: 30 }} 
        whileInView={{ opacity: 1, y: 0 }} 
        viewport={{ once: true, amount: 0.15 }} 
        transition={{ duration: 1.0, delay: Math.floor(index / 3) * 0.18, ease: liquidEase }}
      >
        <PodcastCard episode={episode} isNew={isNewEpisode(episode.publishedDate)} />
      </motion.div>
    ))}
    
    {comingSoonEpisodes.map((episode, idx) => (
      <motion.div 
        key={`coming-soon-${episode.id}`} 
        initial={{ opacity: 0, y: 30 }} 
        whileInView={{ opacity: 1, y: 0 }} 
        viewport={{ once: true, amount: 0.15 }} 
        transition={{ duration: 1.0, delay: (episodes.slice(0, 4).length + idx) * 0.18, ease: liquidEase }}
      >
        <PodcastCard episode={episode} isUpcoming />
      </motion.div>
    ))}
    
    <motion.div 
      initial={{ opacity: 0, y: 30, scale: 0.98 }} 
      whileInView={{ opacity: 1, y: 0, scale: 1 }} 
      viewport={{ once: true, amount: 0.15 }} 
      transition={{ duration: 1.0, delay: 0.9, ease: liquidEase }}
    >
      <SubscribeCard />
    </motion.div>
  </div>
);

const PodcastListView = ({ episodes, comingSoonEpisodes }: PodcastViewProps) => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [ctaHovered, setCtaHovered] = useState<number | null>(null);
  const [mousePositions, setMousePositions] = useState<Record<number, { x: number; y: number }>>({});

  const handleMouseMove = (index: number, e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setMousePositions(prev => ({
      ...prev,
      [index]: { x: e.clientX - rect.left, y: e.clientY - rect.top }
    }));
  };

  const allEpisodes = [...episodes, ...comingSoonEpisodes];

  return (
    <div className="divide-y divide-border/50">
      {allEpisodes.map((episode, index) => {
        const isComingSoon = episode.comingSoon;
        const isIntroEpisode = episode.slug === 'intro-to-fom';
        
        return (
          <motion.div 
            key={episode.id} 
            initial={{ opacity: 0, y: 30 }} 
            whileInView={{ opacity: 1, y: 0 }} 
            viewport={{ once: true, amount: 0.3 }} 
            transition={{ duration: 0.9, delay: index * 0.12, ease: liquidEase }}
            className="relative"
            onMouseEnter={() => setHoveredIndex(index)}
            onMouseLeave={() => setHoveredIndex(null)}
            onMouseMove={(e) => handleMouseMove(index, e)}
          >
            {mousePositions[index] && (
              <MouseFollowImage 
                isHovered={hoveredIndex === index && ctaHovered !== index}
                mouseX={mousePositions[index].x}
                mouseY={mousePositions[index].y}
                imageSrc={getEpisodeImage(episode.slug, index)}
                name={episode.name}
              />
            )}
            
            <Link 
              to={`/episode/${episode.slug}`} 
              className="group py-6 sm:py-8 flex items-start justify-between gap-6 hover-transition relative z-10"
            >
              <div className="flex-1 min-w-0 text-left">
                <p className={`text-label mb-2 transition-opacity duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] ${
                  hoveredIndex !== null && hoveredIndex !== index ? 'opacity-30' : ''
                }`}>EP {String(index + 1).padStart(2, '0')}</p>
                <div className="flex items-center gap-3">
                  <h3 className={`font-display text-4xl sm:text-5xl lg:text-6xl font-semibold leading-[0.95] tracking-tight transition-opacity duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] ${
                    hoveredIndex !== null && hoveredIndex !== index ? 'opacity-30' : ''
                  }`}>
                    {episode.name}
                  </h3>
                  {!isComingSoon && isNewEpisode(episode.publishedDate) && (
                    <span className="glass text-foreground text-xs font-semibold tracking-wide uppercase px-3 pt-2.5 pb-2 rounded-full flex items-center justify-center leading-none">
                      New
                    </span>
                  )}
                </div>
                <p className={`text-body-sm mt-3 text-foreground/60 transition-opacity duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] ${
                  hoveredIndex !== null && hoveredIndex !== index ? 'opacity-30' : ''
                }`}>
                  {isIntroEpisode ? (
                    podcastHosts.map((h, i) => (
                      <span key={h.name}>{h.name}{i < podcastHosts.length - 1 && ', '}</span>
                    ))
                  ) : (
                    <>{episode.title} <span className="font-medium">@ {episode.company}</span></>
                  )}
                </p>
              </div>
              
              <span 
                className="shrink-0 w-[145px] text-center inline-flex items-center justify-center font-display font-semibold uppercase tracking-wider text-xs px-5 pt-3 pb-2.5 rounded-full bg-black/5 backdrop-blur-xl border border-black/10 text-foreground group-hover:bg-foreground group-hover:text-background group-hover:border-foreground transition-all duration-300 leading-none"
                onMouseEnter={() => setCtaHovered(index)}
                onMouseLeave={() => setCtaHovered(null)}
              >
                {isComingSoon ? "Coming Soon" : "Watch Now"}
              </span>
            </Link>
          </motion.div>
        );
      })}
    </div>
  );
};

export default PodcastSection;

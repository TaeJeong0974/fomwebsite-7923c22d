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

// Map episode slugs to specific images
const episodeImageMap: Record<string, string> = {
  'meagen-eisenberg': guestBg,
};

// Fallback rotation for episodes without specific images
const listHoverImages = [hostMada, hostEthan, hostCamille];

type LayoutType = "grid" | "list";
const isNewEpisode = (publishedDate: string): boolean => {
  if (publishedDate === "Coming Soon") return false;
  const published = new Date(publishedDate);
  const now = new Date();
  const diffTime = now.getTime() - published.getTime();
  const diffDays = diffTime / (1000 * 60 * 60 * 24);
  return diffDays <= 7;
};
const PodcastSection = () => {
  const [layout, setLayout] = useState<LayoutType>("grid");
  const publishedEpisodes = getPublishedEpisodes();
  const comingSoonEpisodes = getComingSoonEpisodes();
  return <section id="podcast" className="section-spacing">
      <div className="container mx-auto container-padding">
        {/* Header */}
        <motion.div initial={{
        opacity: 0,
        y: 30
      }} whileInView={{
        opacity: 1,
        y: 0
      }} viewport={{
        once: true,
        amount: 0.3
      }} transition={{
        duration: 0.7,
        ease: liquidEase
      }} className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-8 lg:mb-12">
          <div>
            <p className="text-label mb-2">WATCH</p>
            <h2 className="text-display-xl text-foreground">Podcast</h2>
          </div>
          
          {/* Layout Toggle */}
          <TooltipProvider delayDuration={300}>
            <div className="glass rounded-full p-1.5 flex items-center gap-1">
              <Tooltip>
                <TooltipTrigger asChild>
                  <button onClick={() => setLayout("grid")} className={`p-2.5 rounded-full transition-all duration-300 flex items-center gap-2 ${layout === "grid" ? "bg-foreground text-background shadow-lg" : "text-foreground hover:text-foreground hover:bg-white/5"}`}>
                    <LayoutGrid className="h-4 w-4" />
                    <span className="text-xs font-medium pr-1">Grid</span>
                  </button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Grid view</p>
                </TooltipContent>
              </Tooltip>
              <Tooltip>
                <TooltipTrigger asChild>
                  <button onClick={() => setLayout("list")} className={`p-2.5 rounded-full transition-all duration-300 flex items-center gap-2 ${layout === "list" ? "bg-foreground text-background shadow-lg" : "text-foreground hover:text-foreground hover:bg-white/5"}`}>
                    <List className="h-4 w-4" />
                    <span className="text-xs font-medium pr-1">List</span>
                  </button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>List view</p>
                </TooltipContent>
              </Tooltip>
            </div>
          </TooltipProvider>
        </motion.div>

        {/* Animated Layout Switch */}
        <AnimatePresence mode="wait">
          {layout === "grid" ? <motion.div key="grid" initial={{
          opacity: 0,
          y: 20
        }} animate={{
          opacity: 1,
          y: 0
        }} exit={{
          opacity: 0,
          y: -20
        }} transition={{
          duration: 0.3
        }}>
              <PodcastGridView episodes={publishedEpisodes} comingSoonEpisodes={comingSoonEpisodes} />
            </motion.div> : <motion.div key="list" initial={{
          opacity: 0,
          y: 20
        }} animate={{
          opacity: 1,
          y: 0
        }} exit={{
          opacity: 0,
          y: -20
        }} transition={{
          duration: 0.3
        }}>
              <PodcastListView episodes={publishedEpisodes} comingSoonEpisodes={comingSoonEpisodes} />
            </motion.div>}
        </AnimatePresence>
      </div>
    </section>;
};

// Grid View Component
const PodcastGridView = ({
  episodes,
  comingSoonEpisodes
}: {
  episodes: PodcastEpisode[];
  comingSoonEpisodes: PodcastEpisode[];
}) => {
  return <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 grid-gap">
      {episodes.slice(0, 4).map((episode, index) => {
        const row = Math.floor(index / 3);
        return <motion.div key={episode.id} initial={{
        opacity: 0,
        y: 30
      }} whileInView={{
        opacity: 1,
        y: 0
      }} viewport={{
        once: true,
        amount: 0.15
      }} transition={{
        duration: 1.0,
        delay: row * 0.18,
        ease: liquidEase
      }}>
            <PodcastCard episode={episode} isNew={isNewEpisode(episode.publishedDate)} />
          </motion.div>;
      })}
      
      {/* Coming Soon Cards */}
      {comingSoonEpisodes.map((episode, idx) => <motion.div key={`coming-soon-${episode.id}`} initial={{
      opacity: 0,
      y: 30
    }} whileInView={{
      opacity: 1,
      y: 0
    }} viewport={{
      once: true,
      amount: 0.15
    }} transition={{
      duration: 1.0,
      delay: (episodes.slice(0, 4).length + idx) * 0.18,
      ease: liquidEase
    }}>
          <PodcastCard episode={episode} isUpcoming={true} />
        </motion.div>)}
      
      <motion.div initial={{
      opacity: 0,
      y: 30,
      scale: 0.98
    }} whileInView={{
      opacity: 1,
      y: 0,
      scale: 1
    }} viewport={{
      once: true,
      amount: 0.15
    }} transition={{
      duration: 1.0,
      delay: 0.9,
      ease: liquidEase
    }}>
        <SubscribeCard />
      </motion.div>
    </div>;
};

// Gradient color palette for list hover states (blue → coral)
const listHoverColors = [
  "group-hover:text-[hsl(220,50%,65%)]",   // Muted blue
  "group-hover:text-[hsl(210,40%,70%)]",   // Light steel blue
  "group-hover:text-[hsl(200,35%,72%)]",   // Dusty blue
  "group-hover:text-[hsl(25,45%,70%)]",    // Warm sand
  "group-hover:text-[hsl(15,50%,68%)]",    // Soft coral
  "group-hover:text-[hsl(8,55%,65%)]",     // Coral
];

// List View Component
const PodcastListView = ({
  episodes,
  comingSoonEpisodes
}: {
  episodes: PodcastEpisode[];
  comingSoonEpisodes: PodcastEpisode[];
}) => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [ctaHovered, setCtaHovered] = useState<number | null>(null);
  const [mousePositions, setMousePositions] = useState<Record<number, { x: number; y: number }>>({});

  const handleMouseMove = (index: number, e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setMousePositions(prev => ({
      ...prev,
      [index]: {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      }
    }));
  };

  return <div className="divide-y divide-border/50">
      {episodes.map((episode, index) => <motion.div 
        key={episode.id} 
        initial={{
          opacity: 0,
          y: 30
        }} 
        whileInView={{
          opacity: 1,
          y: 0
        }} 
        viewport={{
          once: true,
          amount: 0.3
        }} 
        transition={{
          duration: 0.9,
          delay: index * 0.12,
          ease: liquidEase
        }}
        className="relative"
        onMouseEnter={() => setHoveredIndex(index)}
        onMouseLeave={() => setHoveredIndex(null)}
        onMouseMove={(e) => handleMouseMove(index, e)}
      >
          {/* Mouse Follow Image - hidden when CTA hovered */}
          {mousePositions[index] && (
            <MouseFollowImage 
              isHovered={hoveredIndex === index && ctaHovered !== index}
              mouseX={mousePositions[index].x}
              mouseY={mousePositions[index].y}
              imageSrc={episodeImageMap[episode.slug] || listHoverImages[index % listHoverImages.length]}
              name={episode.name}
            />
          )}
          
          <Link to={`/episode/${episode.slug}`} className="group py-6 sm:py-8 flex items-start justify-between gap-6 hover-transition relative z-10">
            {/* Left: Name + Title/Company stacked */}
            <div className="flex-1 min-w-0 text-left">
              <div className="flex items-center gap-3">
                <h3 className={`font-display text-4xl sm:text-5xl lg:text-6xl font-semibold text-foreground ${listHoverColors[index % listHoverColors.length]} transition-colors duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] leading-[0.95] tracking-tight`}>
                  {episode.name}
                </h3>
                {isNewEpisode(episode.publishedDate) && <span className="glass text-foreground text-xs font-semibold tracking-wide uppercase px-3 pt-2.5 pb-2 rounded-full flex items-center justify-center leading-none">New</span>}
              </div>
              {episode.slug === 'intro-to-fom' ? (
                <p className="text-body mt-3 text-foreground">
                  {podcastHosts.map(h => h.name).join(', ')}
                </p>
              ) : (
                <p className="text-body mt-3">
                  <span className="text-foreground">{episode.title}</span> <span className="font-medium text-foreground">@ {episode.company}</span>
                </p>
              )}
            </div>
            
            {/* Right: Contextual CTA */}
            <span 
              className="shrink-0 inline-flex items-center justify-center font-display font-semibold uppercase tracking-wider text-xs px-5 py-2.5 rounded-full bg-black/5 backdrop-blur-xl border border-black/10 text-foreground hover:bg-foreground hover:text-background hover:border-foreground transition-all duration-300"
              onMouseEnter={() => setCtaHovered(index)}
              onMouseLeave={() => setCtaHovered(null)}
            >
              Watch Now
            </span>
          </Link>
        </motion.div>)}
      
      {/* Coming Soon items */}
      {comingSoonEpisodes.map((episode, idx) => {
        const globalIndex = episodes.length + idx;
        return <motion.div 
          key={`coming-soon-list-${episode.id}`} 
          initial={{
            opacity: 0,
            y: 30
          }} 
          whileInView={{
            opacity: 1,
            y: 0
          }} 
          viewport={{
            once: true,
            amount: 0.3
          }} 
          transition={{
            duration: 0.9,
            delay: idx * 0.12,
            ease: liquidEase
          }}
          className="relative"
          onMouseEnter={() => setHoveredIndex(globalIndex)}
          onMouseLeave={() => setHoveredIndex(null)}
          onMouseMove={(e) => handleMouseMove(globalIndex, e)}
        >
          {/* Mouse Follow Image - hidden when CTA hovered */}
          {mousePositions[globalIndex] && (
            <MouseFollowImage 
              isHovered={hoveredIndex === globalIndex && ctaHovered !== globalIndex}
              mouseX={mousePositions[globalIndex].x}
              mouseY={mousePositions[globalIndex].y}
              imageSrc={listHoverImages[globalIndex % listHoverImages.length]}
              name={episode.name}
            />
          )}
          
          <Link to={`/episode/${episode.slug}`} className="group py-6 sm:py-8 flex items-start justify-between gap-6 hover-transition relative z-10">
            <div className="flex-1 min-w-0 text-left">
              <h3 className={`font-display text-4xl sm:text-5xl lg:text-6xl font-semibold text-foreground ${listHoverColors[globalIndex % listHoverColors.length]} transition-colors duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] leading-[0.95] tracking-tight`}>
                {episode.name}
              </h3>
              <p className="text-body mt-3">
                <span className="text-foreground">{episode.title}</span> <span className="font-medium text-foreground">@ {episode.company}</span>
              </p>
            </div>
            
            {/* Right: Contextual CTA */}
            <span 
              className="shrink-0 inline-flex items-center justify-center font-display font-semibold uppercase tracking-wider text-xs px-5 py-2.5 rounded-full bg-black/5 backdrop-blur-xl border border-black/10 text-foreground hover:bg-foreground hover:text-background hover:border-foreground transition-all duration-300"
              onMouseEnter={() => setCtaHovered(globalIndex)}
              onMouseLeave={() => setCtaHovered(null)}
            >
              Coming Soon
            </span>
          </Link>
        </motion.div>;
      })}
    </div>;
};
export default PodcastSection;
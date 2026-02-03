import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { LayoutGrid, List } from "lucide-react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { getPublishedEpisodes, getComingSoonEpisodes, PodcastEpisode, podcastHosts } from "@/lib/podcastData";
import { useIsMobile } from "@/hooks/use-mobile";
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
  'meagen-eisenberg': guestBg
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
  return <section id="podcast" className="pt-8 md:pt-10 lg:pt-12 pb-14 md:pb-16 lg:pb-20 scroll-mt-24 md:scroll-mt-28">
      <div className="container mx-auto container-padding">
        {/* Header */}
        <div className="flex items-end justify-between gap-4 sm:gap-6 mb-8 md:mb-10 lg:mb-12">
          <div>
            <p className="text-label mb-2 sm:mb-3">FEATURED</p>
            <h2 className="text-display-xl text-foreground" style={{
            fontWeight: 500
          }}>Guests</h2>
          </div>
          
          {/* Layout Toggle */}
          <TooltipProvider delayDuration={300}>
            <div className="glass rounded-full p-1.5 flex items-center gap-1">
              {[{
              type: "grid" as const,
              icon: LayoutGrid,
              label: "Grid view"
            }, {
              type: "list" as const,
              icon: List,
              label: "List view"
            }].map(({
              type,
              icon: Icon,
              label
            }) => <Tooltip key={type}>
                  <TooltipTrigger asChild>
                    <button onClick={() => setLayout(type)} className={`p-2.5 rounded-full transition-all duration-300 flex items-center justify-center gap-2 ${layout === type ? "bg-foreground text-background shadow-lg" : "text-foreground hover:bg-foreground/5"}`}>
                      <Icon className="h-4 w-4 shrink-0" />
                      <span className="text-xs font-medium pr-1 capitalize leading-none">{type}</span>
                    </button>
                  </TooltipTrigger>
                  <TooltipContent><p>{label}</p></TooltipContent>
                </Tooltip>)}
            </div>
          </TooltipProvider>
        </div>

        {/* Animated Layout Switch */}
        <AnimatePresence mode="wait">
          <motion.div key={layout} initial={{
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
            {layout === "grid" ? <PodcastGridView episodes={publishedEpisodes} comingSoonEpisodes={comingSoonEpisodes} /> : <PodcastListView episodes={publishedEpisodes} comingSoonEpisodes={comingSoonEpisodes} />}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>;
};
interface PodcastViewProps {
  episodes: PodcastEpisode[];
  comingSoonEpisodes: PodcastEpisode[];
}
const PodcastGridView = ({
  episodes,
  comingSoonEpisodes
}: PodcastViewProps) => {
  const [showAll, setShowAll] = useState(false);
  const [isMobileView, setIsMobileView] = useState(false);
  
  // Check for mobile on mount and resize
  useEffect(() => {
    const checkMobile = () => setIsMobileView(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);
  
  const allCards = [
    ...episodes.slice(0, 4).map((ep, i) => ({ type: 'episode' as const, episode: ep, index: i })),
    ...comingSoonEpisodes.map((ep, i) => ({ type: 'coming-soon' as const, episode: ep, index: episodes.slice(0, 4).length + i })),
  ];
  
  // On mobile, show 3 initially; on desktop show all
  const visibleCards = isMobileView && !showAll ? allCards.slice(0, 3) : allCards;
  const hasMore = isMobileView && !showAll && allCards.length > 3;
  
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 grid-gap">
        {visibleCards.map(({ type, episode, index }) => (
          <motion.div 
            key={type === 'coming-soon' ? `coming-soon-${episode.id}` : episode.id} 
            initial={{ opacity: 0, y: 30, scale: 0.95 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{
              duration: 1.0,
              delay: Math.floor(index / 3) * 0.1,
              ease: liquidEase
            }}
          >
            <PodcastCard 
              episode={episode} 
              isNew={type === 'episode' && isNewEpisode(episode.publishedDate)} 
              isUpcoming={type === 'coming-soon'}
            />
          </motion.div>
        ))}
        
        {/* Subscribe card - only show when all cards are visible or on desktop */}
        {(!isMobileView || showAll) && (
          <motion.div 
            initial={{ opacity: 0, y: 30, scale: 0.98 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{ duration: 1.0, delay: 0.9, ease: liquidEase }}
          >
            <SubscribeCard />
          </motion.div>
        )}
      </div>
      
      {/* Load More button - mobile only */}
      {hasMore && (
        <motion.div 
          className="flex justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          <button
            onClick={() => setShowAll(true)}
            className="btn-base btn-glass btn-md"
          >
            Load More
          </button>
        </motion.div>
      )}
    </div>
  );
};
const PodcastListView = ({
  episodes,
  comingSoonEpisodes
}: PodcastViewProps) => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [ctaHovered, setCtaHovered] = useState<number | null>(null);
  const [mousePositions, setMousePositions] = useState<Record<number, {
    x: number;
    y: number;
  }>>({});
  const isMobile = useIsMobile();
  
  const handleMouseMove = (index: number, e: React.MouseEvent<HTMLDivElement>) => {
    if (isMobile) return;
    const rect = e.currentTarget.getBoundingClientRect();
    setMousePositions(prev => ({
      ...prev,
      [index]: {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top
      }
    }));
  };
  
  const handleMouseEnter = (index: number) => {
    if (isMobile) return;
    setHoveredIndex(index);
  };
  
  const handleMouseLeave = () => {
    if (isMobile) return;
    setHoveredIndex(null);
  };
  
  const handleCtaEnter = (index: number) => {
    if (isMobile) return;
    setCtaHovered(index);
  };
  
  const handleCtaLeave = () => {
    if (isMobile) return;
    setCtaHovered(null);
  };
  
  const allEpisodes = [...episodes, ...comingSoonEpisodes];
  return <div className="divide-y divide-border/50">
      {allEpisodes.map((episode, index) => {
      const isComingSoon = episode.comingSoon;
      const isIntroEpisode = episode.slug === 'intro-to-fom';
      return <motion.div key={episode.id} initial={{
        opacity: 0,
        y: 30
      }} whileInView={{
        opacity: 1,
        y: 0
      }} viewport={{
        once: true,
        amount: 0.3
      }} transition={{
        duration: 0.9,
        delay: index * 0.12,
        ease: liquidEase
      }} className="relative" onMouseEnter={() => handleMouseEnter(index)} onMouseLeave={handleMouseLeave} onMouseMove={e => handleMouseMove(index, e)}>
            {!isMobile && mousePositions[index] && <MouseFollowImage isHovered={hoveredIndex === index && ctaHovered !== index} mouseX={mousePositions[index].x} mouseY={mousePositions[index].y} imageSrc={getEpisodeImage(episode.slug, index)} name={episode.name} />}
            
            <Link to={`/episode/${episode.slug}`} className="group py-6 sm:py-8 flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 sm:gap-6 hover-transition relative z-10">
              <div className="flex-1 min-w-0 text-left">
                <div className="flex items-start gap-4 sm:gap-6 lg:gap-10">
                  <span className={`text-label pt-1 sm:pt-2 transition-opacity duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] ${!isMobile && hoveredIndex !== null && hoveredIndex !== index ? 'opacity-30' : ''}`}>EP {String(index + 1).padStart(2, '0')}</span>
                  <div className="flex-1">
                    <div className="flex items-start lg:items-baseline gap-4 lg:gap-6">
                      <h3 className={`font-display text-3xl sm:text-5xl lg:text-6xl font-semibold leading-[0.95] tracking-tight transition-opacity duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] ${!isMobile && hoveredIndex !== null && hoveredIndex !== index ? 'opacity-30' : ''}`}>
                        {episode.name}
                      </h3>
                      {/* Desktop: Title & Company inline with name */}
                      <p className={`hidden lg:block text-body-sm text-foreground/60 transition-opacity duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] ${!isMobile && hoveredIndex !== null && hoveredIndex !== index ? 'opacity-30' : ''}`}>
                        {isIntroEpisode ? podcastHosts.map((h, i) => <span key={h.name}>{h.name}{i < podcastHosts.length - 1 && ', '}</span>) : <>{episode.title} <span className="font-medium">@ {episode.company}</span></>}
                      </p>
                      {!isComingSoon && isNewEpisode(episode.publishedDate) && <span className="badge-status mt-1 lg:mt-0">
                          New
                        </span>}
                    </div>
                    {/* Mobile: Title & Company below name */}
                    <p className={`text-body-sm mt-2 text-foreground/60 transition-opacity duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] lg:hidden ${!isMobile && hoveredIndex !== null && hoveredIndex !== index ? 'opacity-30' : ''}`}>
                      {isIntroEpisode ? podcastHosts.map((h, i) => <span key={h.name}>{h.name}{i < podcastHosts.length - 1 && ', '}</span>) : <>{episode.title} <span className="font-medium">@ {episode.company}</span></>}
                    </p>
                  </div>
                </div>
              </div>
              
              <span className="shrink-0 sm:w-[145px] sm:ml-0 ml-[calc(theme(spacing.4)+2.5rem)] w-fit text-center inline-flex items-center justify-center font-display font-semibold uppercase tracking-wider text-xs px-5 pt-3 pb-2.5 rounded-full bg-black/5 backdrop-blur-xl border border-black/10 text-foreground md:group-hover:bg-foreground md:group-hover:text-background md:group-hover:border-foreground transition-all duration-300 leading-none" onMouseEnter={() => handleCtaEnter(index)} onMouseLeave={handleCtaLeave}>
                {isComingSoon ? "Coming Soon" : "Watch Now"}
              </span>
            </Link>
          </motion.div>;
    })}
    </div>;
};
export default PodcastSection;
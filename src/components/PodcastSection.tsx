import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { LayoutGrid, List, Plus, ChevronUp } from "lucide-react";

import { getPublishedEpisodes, getComingSoonEpisodes, PodcastEpisode, podcastHosts } from "@/lib/podcastData";
import { useIsMobile } from "@/hooks/use-mobile";
import SubscribeCard from "@/components/SubscribeCard";
import PodcastCard from "@/components/podcast/PodcastCard";
import MouseFollowImage from "@/components/podcast/MouseFollowImage";
import { liquidEase } from "@/components/animations/PageLoadAnimation";
import { LiquidButton } from "@/components/ui/LiquidButton";
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
  const isMobile = useIsMobile();
  const [layout, setLayout] = useState<LayoutType>("grid");
  const publishedEpisodes = getPublishedEpisodes();

  // Default to list view on mobile
  useEffect(() => {
    setLayout(isMobile ? "list" : "grid");
  }, [isMobile]);
  const comingSoonEpisodes = getComingSoonEpisodes();
  return <section id="podcast" className="pt-16 md:pt-20 lg:pt-24 pb-14 md:pb-16 lg:pb-20 scroll-mt-24 md:scroll-mt-28">
      <div className="container mx-auto container-padding">
        {/* Header */}
        <div className="flex items-end justify-between gap-4 sm:gap-6 mb-8 md:mb-10 lg:mb-12">
          <div>
            <p className="text-label font-medium text-foreground mb-2 sm:mb-3">FEATURED</p>
            <h2 className="text-display-xl font-medium text-foreground">Guests</h2>
          </div>
          
          {/* Layout Toggle */}
          <div className="glass rounded-full p-1.5 flex items-center gap-1 !shadow-none hover:!shadow-[0_4px_16px_-4px_rgba(0,0,0,0.15)] transition-shadow duration-300">
            {[{
              type: "grid" as const,
              icon: LayoutGrid,
            }, {
              type: "list" as const,
              icon: List,
            }].map(({
              type,
              icon: Icon,
            }) => (
              <button 
                key={type}
                onClick={() => setLayout(type)} 
                className={`p-2.5 rounded-full transition-all duration-300 flex items-center justify-center gap-2 ${layout === type ? "bg-foreground text-background shadow-lg" : "text-foreground hover:bg-foreground/5"}`}
              >
                <Icon className="h-4 w-4 shrink-0" />
                <span className="text-xs font-medium pr-1 capitalize leading-none translate-y-[1px]">{type}</span>
              </button>
            ))}
          </div>
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
  
  const MOBILE_INITIAL = 3;
  const DESKTOP_INITIAL = 5; // 5 cards + 1 "load more" card = 6 slots
  const initialCount = isMobileView ? MOBILE_INITIAL : DESKTOP_INITIAL;
  const hasMore = allCards.length > initialCount;
  const visibleCards = showAll ? allCards : allCards.slice(0, initialCount);
  
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
        
        {/* Subscribe card - before the toggle card when expanded */}
        {showAll && (
          <motion.div 
            initial={{ opacity: 0, y: 30, scale: 0.98 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{ duration: 1.0, delay: 0.2, ease: liquidEase }}
          >
            <SubscribeCard />
          </motion.div>
        )}

        {/* Load More / Show Less card - always last in grid */}
        {hasMore && (
          <motion.div 
            initial={{ opacity: 0, y: 30, scale: 0.95 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{ duration: 1.0, delay: 0.15, ease: liquidEase }}
          >
            <div
              onClick={() => setShowAll(!showAll)}
              className="card-image group cursor-pointer relative flex items-center justify-center bg-foreground/[0.03] border border-foreground/[0.06] hover:bg-foreground/[0.06] hover:border-foreground/[0.1] transition-all duration-500"
            >
              <div className="flex flex-col items-center gap-3 text-foreground/60 group-hover:text-foreground transition-colors duration-500">
                {showAll ? (
                  <ChevronUp className="w-6 h-6" />
                ) : (
                  <Plus className="w-6 h-6" />
                )}
                <span className="text-sm font-medium tracking-wide">
                  {showAll ? 'Show Less' : `${allCards.length - initialCount} More`}
                </span>
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
};
const PodcastListView = ({
  episodes,
  comingSoonEpisodes
}: PodcastViewProps) => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
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
            {!isMobile && mousePositions[index] && <MouseFollowImage isHovered={hoveredIndex === index} mouseX={mousePositions[index].x} mouseY={mousePositions[index].y} imageSrc={getEpisodeImage(episode.slug, index)} name={episode.name} />}
            
            <Link to={`/episode/${episode.slug}`} className="group py-6 sm:py-8 flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 sm:gap-6 hover-transition relative z-10">
              <div className="flex-1 min-w-0 text-left">
                <div className="flex items-start gap-4 sm:gap-6 lg:gap-10">
                  <span className={`text-label pt-0 sm:pt-2 transition-opacity duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] ${!isMobile && hoveredIndex !== null && hoveredIndex !== index ? 'opacity-30' : ''}`}>EP {String(index + 1).padStart(2, '0')}</span>
                    <div className="flex-1">
                    <div className="flex items-start gap-4 lg:gap-6">
                      <h3 className={`font-display text-3xl sm:text-5xl lg:text-6xl font-semibold leading-[0.95] tracking-tight transition-opacity duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] ${!isMobile && hoveredIndex !== null && hoveredIndex !== index ? 'opacity-30' : ''}`}>
                        {episode.name}
                      </h3>
                      {/* Desktop: Title & Company inline with name */}
                      <p className={`hidden lg:block text-sm pt-1.5 text-foreground transition-opacity duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] ${!isMobile && hoveredIndex !== null && hoveredIndex !== index ? 'opacity-30' : ''}`}>
                        {isIntroEpisode ? podcastHosts.map((h, i) => <span key={h.name}>{h.name}{i < podcastHosts.length - 1 && ', '}</span>) : <>{episode.title} <span className="font-medium">@ {episode.company}</span></>}
                      </p>
                      {isComingSoon && <span className="badge-status mt-1 lg:mt-0">Upcoming</span>}
                      {!isComingSoon && isNewEpisode(episode.publishedDate) && <span className="badge-status mt-1 lg:mt-0">New</span>}
                    </div>
                    {/* Mobile/Tablet: Title & Company below name */}
                    <p className={`lg:hidden mt-2 text-sm text-foreground transition-opacity duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] ${!isMobile && hoveredIndex !== null && hoveredIndex !== index ? 'opacity-30' : ''}`}>
                      {isIntroEpisode ? podcastHosts.map((h, i) => <span key={h.name}>{h.name}{i < podcastHosts.length - 1 && ', '}</span>) : <>{episode.title} <span className="font-medium">@ {episode.company}</span></>}
                    </p>
                  </div>
                </div>
              </div>
              
              {/* Desktop CTA */}
              <div className="hidden lg:flex items-center shrink-0">
                <span className={`btn-base btn-primary btn-sm transition-opacity duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] ${!isMobile && hoveredIndex !== null && hoveredIndex !== index ? 'opacity-30' : ''}`}>
                  {isComingSoon ? 'Coming Soon' : 'Watch Now'}
                </span>
              </div>
            </Link>
          </motion.div>;
    })}
    </div>;
};
export default PodcastSection;
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { LayoutGrid, List, Plus, ChevronUp } from "lucide-react";

import { getPublishedEpisodes, getComingSoonEpisodes, PodcastEpisode, podcastHosts } from "@/lib/podcastData";
import { useIsMobile } from "@/hooks/use-mobile";
import SubscribeCard from "@/components/SubscribeCard";
import PodcastCard from "@/components/podcast/PodcastCard";
import { liquidEase } from "@/components/animations/PageLoadAnimation";
import hostMada from "@/assets/host-mada.png";
import hostEthan from "@/assets/host-ethan.png";
import hostCamille from "@/assets/host-camille.png";
import guestBg from "@/assets/guest-bg.png";
import guestMeagen from "@/assets/guest-meagen-eisenberg.jpg";
import guestLena from "@/assets/guest-lena-waters.jpg";
import guestLindsey from "@/assets/guest-lindsey-irvine.jpg";
import guestSara from "@/assets/guest-sara-varni.jpg";
import guestDave from "@/assets/guest-dave-steer.jpg";
import guestKate from "@/assets/guest-kate-johnson.jpg";
import guestSheila from "@/assets/guest-sheila-vashee.jpg";
import guestCeci from "@/assets/guest-ceci-stallsmith.jpg";
import guestIdan from "@/assets/guest-idan-koren.jpg";
import guestKatrina from "@/assets/guest-katrina-wong.jpg";

type LayoutType = "grid" | "list";

const HOVER_COLORS = [
  ["#594881", "#805781", "#9A5B77", "#594881"],
  ["#805781", "#9A5B77", "#AB5866", "#805781"],
  ["#9A5B77", "#AB5866", "#B45250", "#9A5B77"],
  ["#AB5866", "#B45250", "#B44C38", "#AB5866"],
  ["#B45250", "#B44C38", "#594881", "#B45250"],
  ["#B44C38", "#594881", "#805781", "#B44C38"],
];

const EPISODE_IMAGES: Record<string, string> = {
  'meagen-eisenberg': guestMeagen,
  'lena-waters': guestLena,
  'lindsey-irvine': guestLindsey,
  'sara-varni': guestSara,
  'dave-steer': guestDave,
  'kate-johnson': guestKate,
  'sheila-vashee': guestSheila,
  'ceci-stallsmith': guestCeci,
  'idan-koren': guestIdan,
  'katrina-wong': guestKatrina,
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

/** Returns opacity class for list-view focus-dim effect */
const dimClass = (): string => {
  return "";
};

const PodcastSection = () => {
  const isMobile = useIsMobile();
  const [layout, setLayout] = useState<LayoutType>("grid");
  const publishedEpisodes = getPublishedEpisodes();
  const comingSoonEpisodes = getComingSoonEpisodes();

  useEffect(() => {
    setLayout(isMobile ? "list" : "grid");
  }, [isMobile]);

  return (
    <section id="podcast" className="pt-16 md:pt-20 lg:pt-24 pb-14 md:pb-16 lg:pb-20 scroll-mt-24 md:scroll-mt-28">
      <div className="container mx-auto container-padding">
        {/* Header */}
        <div className="flex items-end justify-between gap-4 sm:gap-6 mb-8 md:mb-10 lg:mb-12">
          <div>
            <p className="text-label font-medium text-foreground mb-2 sm:mb-3">FEATURED</p>
            <h2 className="text-display-xl font-medium text-foreground">Guests</h2>
          </div>
          
          {/* Layout Toggle */}
          <div className="glass rounded-full p-1.5 flex items-center gap-1 !shadow-none hover:!shadow-glass transition-shadow duration-300 relative">
            {([
              { type: "grid" as const, icon: LayoutGrid },
              { type: "list" as const, icon: List },
            ]).map(({ type, icon: Icon }) => (
              <button 
                key={type}
                onClick={() => setLayout(type)} 
                className={`p-2.5 rounded-full flex items-center justify-center gap-2 relative z-10 transition-colors duration-300 ${
                  layout === type 
                    ? "text-background" 
                    : "text-foreground hover:bg-foreground/5"
                }`}
              >
                {layout === type && (
                  <motion.div
                    layoutId="toggle-pill"
                    className="absolute inset-0 rounded-full bg-foreground shadow-lg"
                    transition={{ type: "spring", stiffness: 300, damping: 25, mass: 0.8 }}
                  />
                )}
                <Icon className="h-4 w-4 shrink-0 relative z-10" />
                <span className="text-xs font-medium pr-1 capitalize leading-none translate-y-[1px] relative z-10">{type}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Animated Layout Switch */}
        <AnimatePresence mode="wait">
          <motion.div
            key={layout}
            initial={{ opacity: 0, scale: 0.97, filter: "blur(4px)" }}
            animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
            exit={{ opacity: 0, scale: 0.97, filter: "blur(4px)" }}
            transition={{ duration: 0.35, ease: liquidEase }}
          >
            {layout === "grid" 
              ? <PodcastGridView episodes={publishedEpisodes} comingSoonEpisodes={comingSoonEpisodes} /> 
              : <PodcastListView episodes={publishedEpisodes} comingSoonEpisodes={comingSoonEpisodes} />
            }
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

const PodcastGridView = ({ episodes, comingSoonEpisodes }: PodcastViewProps) => {
  const [showAll, setShowAll] = useState(false);
  const isMobile = useIsMobile();
  
  const allCards = [
    ...episodes.slice(0, 4).map((ep, i) => ({ type: 'episode' as const, episode: ep, index: i })),
    ...comingSoonEpisodes.map((ep, i) => ({ type: 'coming-soon' as const, episode: ep, index: episodes.slice(0, 4).length + i })),
  ];
  
  const MOBILE_INITIAL = 3;
  const hasMore = isMobile && allCards.length > MOBILE_INITIAL;
  const visibleCards = isMobile && !showAll ? allCards.slice(0, MOBILE_INITIAL) : allCards;
  
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 grid-gap">
      {visibleCards.map(({ type, episode, index }) => (
        <motion.div 
          key={type === 'coming-soon' ? `coming-soon-${episode.id}` : episode.id} 
          initial={{ opacity: 0, y: 30, scale: 0.95 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{ duration: 1.0, delay: Math.floor(index / 3) * 0.1, ease: liquidEase }}
        >
          <PodcastCard 
            episode={episode} 
            isNew={type === 'episode' && isNewEpisode(episode.publishedDate)} 
            isUpcoming={type === 'coming-soon'}
            image={getEpisodeImage(episode.slug, index)}
          />
        </motion.div>
      ))}
      
      {!isMobile && (
        <motion.div 
          initial={{ opacity: 0, y: 30, scale: 0.98 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{ duration: 1.0, delay: 0.2, ease: liquidEase }}
        >
          <SubscribeCard />
        </motion.div>
      )}

      {showAll && isMobile && (
        <motion.div 
          initial={{ opacity: 0, y: 30, scale: 0.98 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{ duration: 1.0, delay: 0.2, ease: liquidEase }}
        >
          <SubscribeCard />
        </motion.div>
      )}

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
              {showAll ? <ChevronUp className="w-6 h-6" /> : <Plus className="w-6 h-6" />}
              <span className="text-sm font-medium tracking-wide">
                {showAll ? 'Show Less' : `${allCards.length - MOBILE_INITIAL} More`}
              </span>
            </div>
          </div>
        </motion.div>
      )}
    </div>
  );
};

const PodcastListView = ({ episodes, comingSoonEpisodes }: PodcastViewProps) => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const isMobile = useIsMobile();
  
  const allEpisodes = [...episodes, ...comingSoonEpisodes];

  return (
    <div className="divide-y divide-border/50">
      {allEpisodes.map((episode, index) => {
        const isComingSoon = episode.comingSoon;
        const isIntroEpisode = episode.slug === 'intro-to-fom';
        const dim = "";
        const hasBadge = isComingSoon || isNewEpisode(episode.publishedDate);
        const isHovered = hoveredIndex === index && !isMobile;
        const colors = HOVER_COLORS[index % HOVER_COLORS.length];

        return (
          <motion.div
            key={episode.id}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.9, delay: index * 0.12, ease: liquidEase }}
            className="relative"
            onMouseEnter={() => !isMobile && setHoveredIndex(index)}
            onMouseLeave={() => !isMobile && setHoveredIndex(null)}
          >
            
            <Link
              to={`/episode/${episode.slug}`}
              className="group py-6 sm:py-8 flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 sm:gap-6 hover-transition relative z-10"
            >
              <div className="flex-1 min-w-0 text-left">
                {/* Badge row - uses invisible spacer to align with name */}
                {hasBadge && (
                  <div className="flex gap-4 sm:gap-6 lg:gap-10">
                    <span className="text-label invisible" aria-hidden="true">EP 00</span>
                    <div className={`mb-3 sm:mb-4 list-focus-transition ${dim}`}>
                      {isComingSoon && <span className="badge-status">Upcoming</span>}
                      {!isComingSoon && isNewEpisode(episode.publishedDate) && <span className="badge-status">New</span>}
                    </div>
                  </div>
                )}

                {/* EP number + Name row */}
                <div className="flex items-start gap-4 sm:gap-6 lg:gap-10">
                  <span className={`text-label pt-0 sm:pt-2 list-focus-transition ${dim}`}>
                    EP {String(index + 1).padStart(2, '0')}
                  </span>
                  <div className="flex-1">
                    <div className="flex items-start gap-4 lg:gap-6">
                      <motion.h3 
                        className={`font-display text-3xl sm:text-5xl lg:text-6xl font-semibold leading-[0.95] tracking-tight list-focus-transition ${dim}`}
                        initial={false}
                        animate={isHovered ? {
                          color: colors,
                          x: 8,
                        } : {
                          color: '#1a1a1a',
                          x: 0,
                        }}
                        transition={{
                          color: isHovered
                            ? { duration: 4, ease: 'easeInOut', repeat: Infinity }
                            : { duration: 0.15, ease: liquidEase },
                          x: { duration: isHovered ? 0.6 : 0.15, ease: liquidEase },
                        }}
                      >
                        {episode.name}
                      </motion.h3>
                      {/* Desktop: Title & Company inline */}
                      <p className={`hidden lg:block text-sm pt-1.5 text-foreground list-focus-transition ${dim}`}>
                        {isIntroEpisode 
                          ? podcastHosts.map((h, i) => <span key={h.name}>{h.name}{i < podcastHosts.length - 1 && ', '}</span>) 
                          : <>{episode.title} <span className="font-medium">@ {episode.company}</span></>
                        }
                      </p>
                    </div>
                    {/* Mobile/Tablet: Title & Company below */}
                    <p className={`lg:hidden mt-2 text-sm text-foreground list-focus-transition ${dim}`}>
                      {isIntroEpisode 
                        ? podcastHosts.map((h, i) => <span key={h.name}>{h.name}{i < podcastHosts.length - 1 && ', '}</span>) 
                        : <>{episode.title} <span className="font-medium">@ {episode.company}</span></>
                      }
                    </p>
                  </div>
                </div>
              </div>
              
              {/* Desktop CTA */}
              {!isComingSoon && (
                <div className="hidden lg:flex items-center shrink-0">
                  <motion.span
                    className="text-sm font-display font-semibold uppercase tracking-wider rounded-full inline-flex items-center justify-center"
                    initial={false}
                    animate={isHovered ? {
                      color: '#ffffff',
                      backgroundColor: '#1a1a1a',
                      paddingTop: '0.75rem',
                      paddingBottom: '0.625rem',
                      paddingLeft: '1.25rem',
                      paddingRight: '1.25rem',
                    } : {
                      color: '#1a1a1a',
                      backgroundColor: 'rgba(0,0,0,0)',
                      paddingTop: '0.75rem',
                      paddingBottom: '0.625rem',
                      paddingLeft: '0rem',
                      paddingRight: '0rem',
                    }}
                    transition={{ duration: 0.4, ease: liquidEase }}
                  >
                    Watch Now
                  </motion.span>
                </div>
              )}
            </Link>
          </motion.div>
        );
      })}
    </div>
  );
};

export default PodcastSection;
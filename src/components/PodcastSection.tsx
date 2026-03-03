import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { LayoutGrid, List } from "lucide-react";

import { useEpisodeData } from "@/contexts/EpisodeDataContext";
import { useIsMobile } from "@/hooks/use-mobile";
import PodcastGridView from "@/components/podcast/PodcastGridView";
import PodcastListView from "@/components/podcast/PodcastListView";
import { liquidEase } from "@/components/animations/PageLoadAnimation";

type LayoutType = "grid" | "list";

const PodcastSection = () => {
  const isMobile = useIsMobile();
  const [layout, setLayout] = useState<LayoutType>("grid");
  const { getPublishedEpisodes, getComingSoonEpisodes } = useEpisodeData();
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
            <p className="text-label font-medium text-foreground mb-2 sm:mb-3">EPISODES</p>
            <h2 className="text-display-xl font-medium text-foreground">Podcast</h2>
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

export default PodcastSection;

import { useState, useEffect, useRef, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { LayoutGrid, List, ChevronDown } from "lucide-react";

import { useEpisodeData } from "@/contexts/EpisodeDataContext";
import { useIsMobile } from "@/hooks/use-mobile";
import PodcastGridView from "@/components/podcast/PodcastGridView";
import PodcastListView from "@/components/podcast/PodcastListView";
import { liquidEase } from "@/components/animations/PageLoadAnimation";

type LayoutType = "grid" | "list";
type SortMode = "newest" | "oldest" | "name";

const SORT_OPTIONS: { value: SortMode; label: string }[] = [
  { value: "newest", label: "Newest First" },
  { value: "oldest", label: "Oldest First" },
  { value: "name", label: "Name A–Z" },
];

const ALL_THEME = "All";

const PodcastSection = () => {
  const isMobile = useIsMobile();
  const [layout, setLayout] = useState<LayoutType>("grid");
  const [sortOpen, setSortOpen] = useState(false);
  const [sortMode, setSortMode] = useState<SortMode>("newest");
  const [activeTheme, setActiveTheme] = useState(ALL_THEME);
  const sortRef = useRef<HTMLDivElement>(null);
  const { getPublishedEpisodes, getComingSoonEpisodes } = useEpisodeData();
  const publishedEpisodes = getPublishedEpisodes();
  const comingSoonEpisodes = getComingSoonEpisodes();

  // Derive unique themes from published episodes
  const themes = useMemo(() => {
    const set = new Set<string>();
    publishedEpisodes.forEach(ep => { ep.themes?.forEach(t => set.add(t)); });
    return [ALL_THEME, ...Array.from(set)];
  }, [publishedEpisodes]);

  const sortEpisodes = <T extends { id: number; name: string; publishedDate: string }>(eps: T[]): T[] => {
    const sorted = [...eps];
    switch (sortMode) {
      case "newest": return sorted.sort((a, b) => new Date(b.publishedDate).getTime() - new Date(a.publishedDate).getTime());
      case "oldest": return sorted.sort((a, b) => new Date(a.publishedDate).getTime() - new Date(b.publishedDate).getTime());
      case "name": return sorted.sort((a, b) => a.name.localeCompare(b.name));
    }
  };

  const filteredPublished = useMemo(() => {
    if (activeTheme === ALL_THEME) return publishedEpisodes;
    return publishedEpisodes.filter(ep => ep.themes?.includes(activeTheme));
  }, [publishedEpisodes, activeTheme]);

  const filteredComingSoon = useMemo(() => {
    if (activeTheme === ALL_THEME) return comingSoonEpisodes;
    return comingSoonEpisodes.filter(ep => ep.themes?.includes(activeTheme));
  }, [comingSoonEpisodes, activeTheme]);

  const sortedPublished = useMemo(() => sortEpisodes(filteredPublished), [filteredPublished, sortMode]);
  const sortedComingSoon = useMemo(() => sortEpisodes(filteredComingSoon), [filteredComingSoon, sortMode]);

  const activeLabel = SORT_OPTIONS.find(o => o.value === sortMode)!.label;

  // Close dropdown on outside click
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (sortRef.current && !sortRef.current.contains(e.target as Node)) {
        setSortOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

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
          
          {/* Controls: Sort + Layout Toggle */}
          <div className="flex items-center gap-2">
            {/* Sort Dropdown */}
            <div ref={sortRef} className="relative">
              <button
                onClick={() => setSortOpen(!sortOpen)}
                className="glass rounded-full px-4 flex items-center justify-center gap-2 text-xs font-medium transition-all duration-300 !shadow-none hover:!shadow-glass text-foreground hover:bg-foreground/5 h-[42px] whitespace-nowrap"
              >
                <span className="translate-y-[1px]">{activeLabel}</span>
                <ChevronDown className={`h-3.5 w-3.5 shrink-0 transition-transform duration-300 ${sortOpen ? "rotate-180" : ""}`} />
              </button>
              
              <AnimatePresence>
                {sortOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -4, scale: 0.97 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -4, scale: 0.97 }}
                    transition={{ duration: 0.2, ease: liquidEase }}
                    className="absolute right-0 top-full mt-2 z-50 bg-background/95 backdrop-blur-xl rounded-2xl border border-foreground/[0.08] shadow-lg py-2"
                  >
                    {SORT_OPTIONS.map(option => (
                      <button
                        key={option.value}
                        onClick={() => { setSortMode(option.value); setSortOpen(false); }}
                        className={`w-full text-left px-4 py-2.5 text-sm transition-colors duration-200 ${
                          sortMode === option.value ? "text-foreground font-medium" : "text-foreground/70 hover:text-foreground hover:bg-foreground/5"
                        }`}
                      >
                        {option.label}
                      </button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Layout Toggle */}
            <div className="glass rounded-full p-1.5 flex items-center gap-1 !shadow-none hover:!shadow-glass transition-shadow duration-300 relative h-[42px]">
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
        </div>

        {/* Theme Filter Pills */}
        {themes.length > 2 && (
          <div className="flex items-center gap-2 mb-6 md:mb-8 flex-wrap">
            {themes.map(theme => (
              <button
                key={theme}
                onClick={() => setActiveTheme(theme)}
                className={`px-4 py-2 rounded-full text-xs font-medium transition-all duration-300 border ${
                  activeTheme === theme
                    ? "bg-foreground text-background border-foreground"
                    : "bg-transparent text-foreground/70 border-foreground/[0.12] hover:border-foreground/25 hover:text-foreground"
                }`}
              >
                {theme}
              </button>
            ))}
          </div>
        )}

        {/* Animated Layout Switch */}
        <AnimatePresence mode="wait">
          <motion.div
            key={`${layout}-${activeTheme}`}
            initial={{ opacity: 0, scale: 0.97, filter: "blur(4px)" }}
            animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
            exit={{ opacity: 0, scale: 0.97, filter: "blur(4px)" }}
            transition={{ duration: 0.35, ease: liquidEase }}
          >
            {layout === "grid" 
              ? <PodcastGridView episodes={sortedPublished} comingSoonEpisodes={sortedComingSoon} /> 
              : <PodcastListView episodes={sortedPublished} comingSoonEpisodes={sortedComingSoon} />
            }
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
};

export default PodcastSection;

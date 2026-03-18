import { useState, useEffect, useRef, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { LayoutGrid, List, ChevronDown, X } from "lucide-react";

import { useEpisodeData } from "@/contexts/EpisodeDataContext";
import { useIsMobile } from "@/hooks/use-mobile";
import PodcastGridView from "@/components/podcast/PodcastGridView";
import PodcastListView from "@/components/podcast/PodcastListView";
import { liquidEase } from "@/components/animations/PageLoadAnimation";

type LayoutType = "grid" | "list";

const PodcastSection = () => {
  const isMobile = useIsMobile();
  const [layout, setLayout] = useState<LayoutType>("grid");
  const [filterOpen, setFilterOpen] = useState(false);
  const [activeFilter, setActiveFilter] = useState<string | null>(null);
  const filterRef = useRef<HTMLDivElement>(null);
  const { getPublishedEpisodes, getComingSoonEpisodes } = useEpisodeData();
  const publishedEpisodes = getPublishedEpisodes();
  const comingSoonEpisodes = getComingSoonEpisodes();

  // Build filter options from episodes
  const filterOptions = useMemo(() => {
    const allEps = [...publishedEpisodes, ...comingSoonEpisodes];
    const options: { label: string; value: string; type: "name" | "company"; company?: string }[] = [];
    const seen = new Set<string>();
    allEps.forEach(ep => {
      if (ep.slug === "the-future-of-marketing") return;
      if (!seen.has(ep.name)) {
        seen.add(ep.name);
        options.push({ label: ep.name, value: ep.name, type: "name", company: ep.company });
      }
      if (!seen.has(ep.company)) {
        seen.add(ep.company);
        options.push({ label: ep.company, value: ep.company, type: "company" });
      }
    });
    return options;
  }, [publishedEpisodes, comingSoonEpisodes]);

  // Find longest label for stable button width
  const longestLabel = useMemo(() => {
    const allLabels = ["All Guests", ...filterOptions.map(o => o.type === "name" && o.company ? `${o.label} · ${o.company}` : o.label)];
    return allLabels.reduce((a, b) => a.length >= b.length ? a : b, "");
  }, [filterOptions]);

  // Filter episodes
  const filteredPublished = useMemo(() => {
    if (!activeFilter) return publishedEpisodes;
    return publishedEpisodes.filter(ep => ep.name === activeFilter || ep.company === activeFilter);
  }, [publishedEpisodes, activeFilter]);

  const filteredComingSoon = useMemo(() => {
    if (!activeFilter) return comingSoonEpisodes;
    return comingSoonEpisodes.filter(ep => ep.name === activeFilter || ep.company === activeFilter);
  }, [comingSoonEpisodes, activeFilter]);

  // Close dropdown on outside click
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (filterRef.current && !filterRef.current.contains(e.target as Node)) {
        setFilterOpen(false);
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
          <div className="flex items-end gap-3 sm:gap-4 flex-wrap">
            <div>
              <p className="text-label font-medium text-foreground mb-2 sm:mb-3">EPISODES</p>
              <h2 className="text-display-xl font-medium text-foreground">Podcast</h2>
            </div>
            
            {/* Filter Dropdown */}
            <div ref={filterRef} className="relative mb-0.5">
              <button
                onClick={() => setFilterOpen(!filterOpen)}
                className={`glass rounded-full px-4 py-2 flex items-center gap-2 text-sm font-medium transition-all duration-300 !shadow-none hover:!shadow-glass ${
                  activeFilter 
                    ? "bg-foreground text-background hover:bg-foreground/90" 
                    : "text-foreground hover:bg-foreground/5"
                }`}
              >
                {/* Invisible sizer for stable width */}
                <span className="invisible h-0 block whitespace-nowrap">{longestLabel}</span>
                <span className="absolute left-4">{activeFilter || "All Guests"}</span>
                <span className="ml-auto">
                  {activeFilter ? (
                    <X 
                      className="h-3.5 w-3.5 shrink-0" 
                      onClick={(e) => { e.stopPropagation(); setActiveFilter(null); setFilterOpen(false); }}
                    />
                  ) : (
                    <ChevronDown className={`h-3.5 w-3.5 shrink-0 transition-transform duration-300 ${filterOpen ? "rotate-180" : ""}`} />
                  )}
                </span>
              </button>
              
              <AnimatePresence>
                {filterOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -4, scale: 0.97 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -4, scale: 0.97 }}
                    transition={{ duration: 0.2, ease: liquidEase }}
                    className="absolute left-0 top-full mt-2 z-50 bg-background/95 backdrop-blur-xl rounded-2xl border border-foreground/[0.08] shadow-lg py-2 w-max min-w-[220px] max-h-[320px] overflow-y-auto"
                  >
                    <button
                      onClick={() => { setActiveFilter(null); setFilterOpen(false); }}
                      className={`w-full text-left px-4 py-2.5 text-sm transition-colors duration-200 ${
                        !activeFilter ? "text-foreground font-medium bg-foreground/5" : "text-foreground/70 hover:text-foreground hover:bg-foreground/5"
                      }`}
                    >
                      All Guests
                    </button>
                    <div className="h-px bg-foreground/[0.06] my-1" />
                    <p className="px-4 py-1.5 text-[0.65rem] font-medium text-muted-foreground uppercase tracking-widest">Guests</p>
                    {filterOptions.filter(o => o.type === "name").map(option => (
                      <button
                        key={option.value}
                        onClick={() => { setActiveFilter(option.value); setFilterOpen(false); }}
                        className={`w-full text-left px-4 py-2.5 text-sm transition-colors duration-200 ${
                          activeFilter === option.value ? "text-foreground font-medium bg-foreground/5" : "text-foreground/70 hover:text-foreground hover:bg-foreground/5"
                        }`}
                      >
                        {option.label} <span className="text-muted-foreground font-normal">· {option.company}</span>
                      </button>
                    ))}
                    <div className="h-px bg-foreground/[0.06] my-1" />
                    <p className="px-4 py-1.5 text-[0.65rem] font-medium text-muted-foreground uppercase tracking-widest">Companies</p>
                    {filterOptions.filter(o => o.type === "company").map(option => (
                      <button
                        key={option.value}
                        onClick={() => { setActiveFilter(option.value); setFilterOpen(false); }}
                        className={`w-full text-left px-4 py-2.5 text-sm transition-colors duration-200 ${
                          activeFilter === option.value ? "text-foreground font-medium bg-foreground/5" : "text-foreground/70 hover:text-foreground hover:bg-foreground/5"
                        }`}
                      >
                        {option.label}
                      </button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
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
              ? <PodcastGridView episodes={filteredPublished} comingSoonEpisodes={filteredComingSoon} /> 
              : <PodcastListView episodes={filteredPublished} comingSoonEpisodes={filteredComingSoon} />
            }
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
};

export default PodcastSection;

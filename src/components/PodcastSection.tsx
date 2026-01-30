import { useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { LayoutGrid, List } from "lucide-react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { getPublishedEpisodes, getComingSoonEpisodes, PodcastEpisode } from "@/lib/podcastData";
import SubscribeCard from "@/components/SubscribeCard";
import PodcastCard from "@/components/podcast/PodcastCard";
import { liquidEase } from "@/components/animations/PageLoadAnimation";
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
                  <button onClick={() => setLayout("grid")} className={`p-2.5 rounded-full transition-all duration-300 ${layout === "grid" ? "bg-foreground text-background shadow-lg" : "text-foreground hover:text-foreground hover:bg-white/5"}`}>
                    <LayoutGrid className="h-4 w-4" />
                  </button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Grid view</p>
                </TooltipContent>
              </Tooltip>
              <Tooltip>
                <TooltipTrigger asChild>
                  <button onClick={() => setLayout("list")} className={`p-2.5 rounded-full transition-all duration-300 ${layout === "list" ? "bg-foreground text-background shadow-lg" : "text-foreground hover:text-foreground hover:bg-white/5"}`}>
                    <List className="h-4 w-4" />
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
      {episodes.slice(0, 4).map((episode, index) => <motion.div key={episode.id} initial={{
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
      delay: index * 0.18,
      ease: liquidEase
    }}>
          <PodcastCard episode={episode} isNew={isNewEpisode(episode.publishedDate)} />
        </motion.div>)}
      
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

// List View Component
const PodcastListView = ({
  episodes,
  comingSoonEpisodes
}: {
  episodes: PodcastEpisode[];
  comingSoonEpisodes: PodcastEpisode[];
}) => {
  return <div className="divide-y divide-border/50">
      {episodes.map((episode, index) => <motion.div key={episode.id} initial={{
      opacity: 0,
      x: -16
    }} whileInView={{
      opacity: 1,
      x: 0
    }} viewport={{
      once: true,
      amount: 0.3
    }} transition={{
      duration: 0.9,
      delay: index * 0.12,
      ease: liquidEase
    }}>
          <Link to={`/episode/${episode.slug}`} className="group py-6 sm:py-8 flex items-start justify-between gap-6 hover-transition">
            {/* Left: Name + Title/Company stacked */}
            <div className="flex-1 min-w-0 text-left">
              <div className="flex items-center gap-3">
                <h3 className="font-display text-4xl sm:text-5xl lg:text-6xl font-semibold text-foreground group-hover:text-foreground hover-transition leading-[0.95] tracking-tight">
                  {episode.name}
                </h3>
                {isNewEpisode(episode.publishedDate) && <span className="bg-foreground text-background text-xs font-semibold tracking-wide uppercase px-3 py-1.5 rounded-full">New</span>}
              </div>
              <p className="text-body mt-3">
                <span className="text-foreground">{episode.title}</span> <span className="font-medium text-foreground">@ {episode.company}</span>
              </p>
            </div>
            
            {/* Right: Arrow */}
            <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center shrink-0 group-hover:bg-foreground group-hover:text-background hover-transition mt-2">
              <svg className="w-5 h-5 text-foreground group-hover:text-background" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </div>
          </Link>
        </motion.div>)}
      
      {/* Coming Soon items */}
      {comingSoonEpisodes.map((episode, idx) => <motion.div key={`coming-soon-list-${episode.id}`} initial={{
      opacity: 0,
      x: -16
    }} whileInView={{
      opacity: 1,
      x: 0
    }} viewport={{
      once: true,
      amount: 0.3
    }} transition={{
      duration: 0.9,
      delay: (episodes.length + idx) * 0.12,
      ease: liquidEase
    }}>
          <Link to={`/episode/${episode.slug}`} className="group py-6 sm:py-8 flex items-start justify-between gap-6 hover-transition">
            <div className="flex-1 min-w-0 text-left">
              <div className="flex items-center gap-3">
                <h3 className="font-display text-4xl sm:text-5xl lg:text-6xl font-semibold text-foreground group-hover:text-foreground hover-transition leading-[0.95] tracking-tight">
                  {episode.name}
                </h3>
                <span className="bg-foreground text-background text-xs font-semibold tracking-wide uppercase px-3 py-1.5 rounded-full">Upcoming</span>
              </div>
              <p className="text-body mt-3">
                <span className="text-foreground">{episode.title}</span> <span className="font-medium text-foreground">@ {episode.company}</span>
              </p>
            </div>
            <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center shrink-0 group-hover:bg-foreground group-hover:text-background hover-transition mt-2">
              <svg className="w-5 h-5 text-foreground group-hover:text-background" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </div>
          </Link>
        </motion.div>)}
    </div>;
};
export default PodcastSection;
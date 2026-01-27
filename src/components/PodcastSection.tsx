import { useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { LayoutGrid, List } from "lucide-react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { getPublishedEpisodes, getComingSoonEpisodes, PodcastEpisode } from "@/lib/podcastData";
import SubscribeCard from "@/components/SubscribeCard";
import guestBg from "@/assets/guest-bg.png";

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

  return (
    <section id="podcast" className="section-spacing">
      <div className="container mx-auto container-padding">
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-8 lg:mb-12"
        >
          <div>
            <p className="text-label mb-2">Episodes</p>
            <h2 className="text-display-lg text-foreground">Podcast</h2>
          </div>
          
          {/* Layout Toggle */}
          <TooltipProvider delayDuration={300}>
            <div className="glass rounded-full p-1.5 flex items-center gap-1">
              <Tooltip>
                <TooltipTrigger asChild>
                  <button
                    onClick={() => setLayout("grid")}
                    className={`p-2.5 rounded-full transition-all duration-300 ${
                      layout === "grid" 
                        ? "bg-primary text-primary-foreground shadow-lg shadow-primary/25" 
                        : "text-muted-foreground hover:text-foreground hover:bg-white/5"
                    }`}
                  >
                    <LayoutGrid className="h-4 w-4" />
                  </button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Grid view</p>
                </TooltipContent>
              </Tooltip>
              <Tooltip>
                <TooltipTrigger asChild>
                  <button
                    onClick={() => setLayout("list")}
                    className={`p-2.5 rounded-full transition-all duration-300 ${
                      layout === "list" 
                        ? "bg-primary text-primary-foreground shadow-lg shadow-primary/25" 
                        : "text-muted-foreground hover:text-foreground hover:bg-white/5"
                    }`}
                  >
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
          {layout === "grid" ? (
            <motion.div
              key="grid"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              <PodcastGridView episodes={publishedEpisodes} comingSoonEpisodes={comingSoonEpisodes} />
            </motion.div>
          ) : (
            <motion.div
              key="list"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              <PodcastListView episodes={publishedEpisodes} comingSoonEpisodes={comingSoonEpisodes} />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};

// Grid View Component
const PodcastGridView = ({ episodes, comingSoonEpisodes }: { episodes: PodcastEpisode[], comingSoonEpisodes: PodcastEpisode[] }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 grid-gap">
      {episodes.slice(0, 4).map((episode, index) => {
        return (
          <motion.div
            key={episode.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: index * 0.1 }}
          >
            <Link
              to={`/episode/${episode.slug}`}
              className="block group"
            >
              <div 
                className="card-image hover-scale"
                style={{
                  backgroundImage: `url(${guestBg})`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                }}
              >
                <div className="card-overlay-light hover-transition group-hover:opacity-90" />
                
                {episode.companyDomain && (
                  <div className="absolute top-4 left-4 glass rounded-xl p-2.5 hover-scale-badge">
                    <img 
                      src={`https://www.google.com/s2/favicons?domain=${episode.companyDomain}&sz=64`} 
                      alt={episode.company}
                      className="h-5 w-5 object-contain"
                    />
                  </div>
                )}
                
                {isNewEpisode(episode.publishedDate) && <span className="absolute top-4 right-4 bg-primary text-primary-foreground text-xs font-semibold tracking-wide uppercase px-3 py-1.5 rounded-full">New</span>}
                
                <div className="card-content-bottom card-padding-lg">
                  <h3 className="font-display text-2xl sm:text-3xl lg:text-4xl font-semibold text-white tracking-tight">
                    {episode.name.split(' ').map((word, i, arr) => (
                      <span key={i} className="block">{word}{i < arr.length - 1 ? '' : ''}</span>
                    ))}
                  </h3>
                  <p className="text-body-sm text-white/70 mt-1">{episode.title}</p>
                  <p className="text-body-sm font-medium text-primary">{episode.company}</p>
                  <div className="max-h-32 mt-4 md:max-h-0 md:mt-0 overflow-hidden md:opacity-0 md:translate-y-3 hover-transition md:group-hover:max-h-32 md:group-hover:mt-4 md:group-hover:opacity-100 md:group-hover:translate-y-0">
                    <p className="text-body-sm leading-relaxed text-white/60 mb-4">{episode.overview}</p>
                    <span className="btn-base btn-glass-light btn-sm">Watch Now</span>
                  </div>
                </div>
              </div>
            </Link>
          </motion.div>
        );
      })}
      
      {/* Coming Soon Cards */}
      {comingSoonEpisodes.map((episode, idx) => (
        <motion.div
          key={`coming-soon-${episode.id}`}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: (episodes.length + idx) * 0.1 }}
        >
          <Link
            to={`/episode/${episode.slug}`}
            className="block group"
          >
            <div 
              className="card-image hover-scale"
              style={{
                backgroundImage: `url(${guestBg})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
              }}
            >
              <div className="card-overlay-light hover-transition group-hover:opacity-90" />
              {episode.companyDomain && (
                <div className="absolute top-4 left-4 glass rounded-xl p-2.5 hover-scale-badge">
                  <img 
                    src={`https://www.google.com/s2/favicons?domain=${episode.companyDomain}&sz=64`} 
                    alt={episode.company}
                    className="h-5 w-5 object-contain"
                  />
                </div>
              )}
              <span className="absolute top-4 right-4 bg-foreground text-background text-xs font-semibold tracking-wide uppercase px-3 py-1.5 rounded-full">Upcoming</span>
              <div className="card-content-bottom card-padding-lg">
                <h3 className="font-display text-white leading-[0.95] tracking-tight">
                  {episode.name.split(' ').map((word, i) => (
                    <span key={i} className="block text-2xl sm:text-3xl lg:text-4xl font-semibold">{word}</span>
                  ))}
                </h3>
                <p className="text-body-sm text-white/70 mt-1">{episode.title}</p>
                <p className="text-body-sm font-medium text-primary">{episode.company}</p>
                <div className="max-h-32 mt-4 md:max-h-0 md:mt-0 overflow-hidden md:opacity-0 md:translate-y-3 hover-transition md:group-hover:max-h-32 md:group-hover:mt-4 md:group-hover:opacity-100 md:group-hover:translate-y-0">
                  <span className="btn-base btn-glass-light btn-sm">Learn More</span>
                </div>
              </div>
            </div>
          </Link>
        </motion.div>
      ))}
      
      {/* Subscribe CTA Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.4, delay: 0.6 }}
      >
        <SubscribeCard />
      </motion.div>
    </div>
  );
};

// List View Component
const PodcastListView = ({ episodes, comingSoonEpisodes }: { episodes: PodcastEpisode[], comingSoonEpisodes: PodcastEpisode[] }) => {
  return (
    <div className="divide-y divide-border/50">
      {episodes.map((episode, index) => (
        <motion.div
          key={episode.id}
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.3, delay: index * 0.05 }}
        >
          <Link
            to={`/episode/${episode.slug}`}
            className="group py-6 sm:py-8 flex items-start justify-between gap-6 hover-transition"
          >
            {/* Left: Name + Title/Company stacked */}
            <div className="flex-1 min-w-0 text-left">
              <div className="flex items-center gap-3">
                <h3 className="font-display text-4xl sm:text-5xl lg:text-6xl font-semibold text-foreground group-hover:text-primary hover-transition leading-[0.95] tracking-tight">
                  {episode.name}
                </h3>
                {isNewEpisode(episode.publishedDate) && <span className="bg-primary text-primary-foreground text-xs font-semibold tracking-wide uppercase px-3 py-1.5 rounded-full">New</span>}
              </div>
              <p className="text-body mt-3">
                <span className="text-muted-foreground">{episode.title}</span> <span className="font-medium text-foreground">@ {episode.company}</span>
              </p>
            </div>
            
            {/* Right: Arrow */}
            <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center shrink-0 group-hover:bg-primary group-hover:text-primary-foreground hover-transition mt-2">
              <svg className="w-5 h-5 text-muted-foreground group-hover:text-primary-foreground" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </div>
          </Link>
        </motion.div>
      ))}
      
      {/* Coming Soon items */}
      {comingSoonEpisodes.map((episode, idx) => (
        <motion.div
          key={`coming-soon-list-${episode.id}`}
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.3, delay: (episodes.length + idx) * 0.05 }}
        >
          <Link
            to={`/episode/${episode.slug}`}
            className="group py-6 sm:py-8 flex items-start justify-between gap-6 hover-transition"
          >
            <div className="flex-1 min-w-0 text-left">
              <div className="flex items-center gap-3">
                <h3 className="font-display text-4xl sm:text-5xl lg:text-6xl font-semibold text-foreground group-hover:text-primary hover-transition leading-[0.95] tracking-tight">
                  {episode.name}
                </h3>
                <span className="bg-foreground text-background text-xs font-semibold tracking-wide uppercase px-3 py-1.5 rounded-full">Upcoming</span>
              </div>
              <p className="text-body mt-3">
                <span className="text-muted-foreground">{episode.title}</span> <span className="font-medium text-foreground">@ {episode.company}</span>
              </p>
            </div>
            <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center shrink-0 group-hover:bg-primary group-hover:text-primary-foreground hover-transition mt-2">
              <svg className="w-5 h-5 text-muted-foreground group-hover:text-primary-foreground" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </div>
          </Link>
        </motion.div>
      ))}
    </div>
  );
};

export default PodcastSection;

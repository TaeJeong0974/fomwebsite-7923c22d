import { useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { LayoutGrid, List } from "lucide-react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import guestBg from "@/assets/guest-bg.png";
import subscribeBg from "@/assets/subscribe-bg.png";

interface Episode {
  id: number;
  slug: string;
  name: string;
  title: string;
  company: string;
  companyDomain: string;
  overview: string;
  comingSoon: boolean;
}

const episodes: Episode[] = [
  {
    id: 1,
    slug: "meagen-eisenberg",
    name: "Meagen Eisenberg",
    title: "Chief Marketing Officer",
    company: "Samsara",
    companyDomain: "samsara.com",
    overview: "Exploring how remote work is reshaping company culture and marketing strategies.",
    comingSoon: false,
  },
  {
    id: 2,
    slug: "lena-waters",
    name: "Lena Waters",
    title: "Chief Marketing Officer",
    company: "Notion",
    companyDomain: "notion.so",
    overview: "Building and nurturing creative communities that drive brand loyalty.",
    comingSoon: false,
  },
  {
    id: 3,
    slug: "dave-steer",
    name: "Dave Steer",
    title: "Chief Marketing Officer",
    company: "Webflow",
    companyDomain: "webflow.com",
    overview: "How sustainable practices are becoming central to tech marketing.",
    comingSoon: false,
  },
];

type LayoutType = "grid" | "list";

const PodcastSection = () => {
  const [layout, setLayout] = useState<LayoutType>("grid");
  const publishedEpisodes = episodes;

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
              <PodcastGridView episodes={publishedEpisodes} />
            </motion.div>
          ) : (
            <motion.div
              key="list"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              <PodcastListView episodes={publishedEpisodes} />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};

// Grid View Component
const PodcastGridView = ({ episodes }: { episodes: Episode[] }) => {
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
                    <span className="btn-base btn-glass-light btn-sm">Listen Now</span>
                  </div>
                </div>
              </div>
            </Link>
          </motion.div>
        );
      })}
      
      {/* Coming Soon Cards */}
      {[1, 2].map((_, idx) => (
        <motion.div
          key={`coming-soon-${idx}`}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: (4 + idx) * 0.1 }}
        >
          <div 
            className="card-image group cursor-pointer hover-scale"
            style={{
              backgroundImage: `url(${guestBg})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }}
          >
            <div className="card-overlay-light hover-transition group-hover:opacity-90" />
            <div className="absolute top-4 left-4 badge-interactive glass-dark text-white">Coming Soon</div>
            <div className="card-content-bottom card-padding-lg">
              <h3 className="font-display text-white leading-[0.95] tracking-tight">
                <span className="block text-2xl sm:text-3xl lg:text-4xl font-semibold">Guest</span>
                <span className="block text-2xl sm:text-3xl lg:text-4xl font-semibold">Name</span>
              </h3>
              <p className="text-body-sm text-white/70 mt-1">Chief Marketing Officer</p>
              <p className="text-body-sm font-medium text-primary">Company</p>
            </div>
          </div>
        </motion.div>
      ))}
      
      {/* Subscribe CTA Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.4, delay: 0.6 }}
      >
        <div 
          className="card-image group cursor-pointer hover-scale"
          style={{
            backgroundImage: `url(${subscribeBg})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        >
          <div className="card-content-full card-padding-lg">
            <h3 className="text-display-md text-foreground">Subscribe to stay current on how teams are using AI.</h3>
            <button className="btn-base btn-primary btn-lg self-start">Subscribe</button>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

// List View Component
const PodcastListView = ({ episodes }: { episodes: Episode[] }) => {
  return (
    <div className="space-y-2">
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
            className="group glass rounded-2xl p-6 sm:p-8 flex items-start justify-between gap-6 hover:bg-white/[0.08] hover-transition"
          >
            {/* Left: Name + Title/Company stacked */}
            <div className="flex-1 min-w-0">
              <h3 className="font-display text-4xl sm:text-5xl lg:text-6xl font-semibold text-foreground group-hover:text-primary hover-transition leading-[0.95] tracking-tight text-left">
                {episode.name}
              </h3>
              <p className="text-body text-foreground mt-3 text-left">
                {episode.title} <span className="font-medium">@ {episode.company}</span>
              </p>
            </div>
            
            {/* Right: Arrow */}
            <div className="w-10 h-10 rounded-full glass-dark flex items-center justify-center shrink-0 group-hover:bg-primary group-hover:text-primary-foreground hover-transition mt-2">
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </div>
          </Link>
        </motion.div>
      ))}
      
      {/* Coming Soon items */}
      {[1, 2].map((_, idx) => (
        <motion.div
          key={`coming-soon-list-${idx}`}
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.3, delay: (episodes.length + idx) * 0.05 }}
        >
          <div className="glass rounded-2xl p-5 flex items-center gap-4 opacity-40">
            <div className="glass-dark rounded-xl p-3 shrink-0">
              <div className="h-6 w-6 rounded bg-muted-foreground/20" />
            </div>
            <div className="min-w-0">
              <h3 className="font-display text-xl sm:text-2xl font-semibold text-foreground leading-tight">
                Coming Soon
              </h3>
              <p className="text-body-sm text-muted-foreground mt-0.5">Guest to be announced</p>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
};

export default PodcastSection;

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
        const firstName = episode.name.split(' ')[0];
        const lastName = episode.name.split(' ').slice(1).join(' ');
        
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
                  <h3 className="font-display text-white leading-[0.95] tracking-tight">
                    <span className="block text-2xl sm:text-3xl lg:text-4xl font-semibold">{firstName}</span>
                    <span className="block text-2xl sm:text-3xl lg:text-4xl font-semibold">{lastName}</span>
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
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.3, delay: index * 0.05 }}
        >
          <Link
            to={`/episode/${episode.slug}`}
            className="group flex items-center gap-6 py-5 border-b border-border hover:bg-secondary/30 hover-transition px-4 rounded-xl -mx-4"
          >
            {/* Episode Number */}
            <span className="font-display text-2xl font-bold text-muted-foreground/40 w-12">
              {String(index + 1).padStart(2, '0')}
            </span>
            
            {/* Company Logo */}
            {episode.companyDomain && (
              <div className="glass rounded-xl p-2.5 shrink-0">
                <img 
                  src={`https://www.google.com/s2/favicons?domain=${episode.companyDomain}&sz=64`} 
                  alt={episode.company}
                  className="h-5 w-5 object-contain"
                />
              </div>
            )}
            
            {/* Content */}
            <div className="flex-1 min-w-0">
              <h3 className="font-display text-base lg:text-lg font-semibold text-foreground group-hover:text-primary hover-transition">
                {episode.name}
              </h3>
              <p className="text-label mt-0.5">
                {episode.title} · {episode.company}
              </p>
            </div>
            
            {/* Overview on larger screens */}
            <p className="hidden lg:block text-body-sm text-muted-foreground max-w-xs truncate">
              {episode.overview}
            </p>
            
            {/* Hover indicator */}
            <div className="w-6 h-6 flex items-center justify-center shrink-0">
              <div className="w-2 h-2 rounded-full bg-primary opacity-0 group-hover:opacity-100 hover-transition" />
            </div>
          </Link>
        </motion.div>
      ))}
      
      {/* Coming Soon items in list */}
      {[1, 2].map((_, idx) => (
        <motion.div
          key={`coming-soon-list-${idx}`}
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.3, delay: (episodes.length + idx) * 0.05 }}
        >
          <div className="flex items-center gap-6 py-5 border-b border-border px-4 rounded-xl -mx-4 opacity-50">
            <span className="font-display text-2xl font-bold text-muted-foreground/40 w-12">
              {String(episodes.length + idx + 1).padStart(2, '0')}
            </span>
            <div className="glass rounded-xl p-2.5 shrink-0">
              <div className="h-5 w-5 rounded bg-muted" />
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="font-display text-base lg:text-lg font-semibold text-foreground">
                Coming Soon
              </h3>
              <p className="text-label mt-0.5">Guest to be announced</p>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
};

export default PodcastSection;

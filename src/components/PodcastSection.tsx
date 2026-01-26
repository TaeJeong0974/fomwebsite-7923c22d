import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import guestBg from "@/assets/guest-bg.png";
import subscribeBg from "@/assets/subscribe-bg.png";

const episodes = [
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
  {
    id: 4,
    slug: "sara-varni",
    name: "Sara Varni",
    title: "Chief Marketing Officer",
    company: "Datadog",
    companyDomain: "datadoghq.com",
    overview: "The power of storytelling in building memorable brand experiences.",
    comingSoon: false,
  },
  {
    id: 5,
    slug: "guest-five",
    name: "Guest Name",
    title: "Chief Marketing Officer",
    company: "Company",
    companyDomain: null,
    overview: "FPO - Episode description placeholder text for upcoming content.",
    comingSoon: false,
  },
  {
    id: 6,
    slug: "guest-six",
    name: "Guest Name",
    title: "Chief Marketing Officer",
    company: "Company",
    companyDomain: null,
    overview: "FPO - Episode description placeholder text for upcoming content.",
    comingSoon: false,
  },
];

const FEATURED_COUNT = 6;

const PodcastSection = () => {
  const publishedEpisodes = episodes;
  
  // Split into featured (latest) and archive (rest)
  const featuredEpisodes = publishedEpisodes.slice(0, FEATURED_COUNT);
  const archiveEpisodes = publishedEpisodes.slice(FEATURED_COUNT);

  return (
    <section id="podcast" className="py-20 lg:py-28">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-12 lg:mb-16">
          <p className="text-[10px] text-muted-foreground uppercase tracking-[0.3em] mb-2 font-medium">
            Episodes
          </p>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-semibold text-foreground tracking-tight">
            Podcast
          </h2>
        </div>

        {/* Featured Episodes - Hero Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6">
          {featuredEpisodes.slice(0, 4).map((episode, index) => (
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
                  className="aspect-[4/5] relative overflow-hidden rounded-2xl transition-transform duration-700 ease-[cubic-bezier(0.32,0.72,0,1)] group-hover:scale-[1.02]"
                  style={{
                    backgroundImage: `url(${guestBg})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                  }}
                >
                  {/* Liquid glass overlay on hover */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent transition-all duration-700 ease-[cubic-bezier(0.32,0.72,0,1)] group-hover:from-black/80 group-hover:via-black/40" />
                  
                  {/* Company logo badge - glass pill with liquid hover */}
                  {episode.companyDomain && (
                    <div className="absolute top-4 left-4 glass rounded-xl p-2.5 transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] group-hover:scale-110 group-hover:shadow-lg">
                      <img 
                        src={`https://www.google.com/s2/favicons?domain=${episode.companyDomain}&sz=64`} 
                        alt={episode.company}
                        className="h-5 w-5 object-contain"
                      />
                    </div>
                  )}
                  
                  {/* Content */}
                  <div className="absolute inset-x-0 bottom-0 p-6 lg:p-8">
                    <h3 className="font-display text-lg lg:text-xl font-semibold text-white transition-transform duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] group-hover:translate-y-0">
                      {episode.name}
                    </h3>
                    <p className="text-sm text-white/70 mt-0.5 transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)]">
                      {episode.title}
                    </p>
                    <p className="text-sm font-medium mt-1 text-primary transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)]">
                      {episode.company}
                    </p>
                    {/* Reveal content with liquid glass animation */}
                    <div className="max-h-32 mt-4 md:max-h-0 md:mt-0 overflow-hidden transition-all duration-700 ease-[cubic-bezier(0.32,0.72,0,1)] md:opacity-0 md:translate-y-4 md:blur-[2px] md:group-hover:max-h-32 md:group-hover:mt-4 md:group-hover:opacity-100 md:group-hover:translate-y-0 md:group-hover:blur-0">
                      <p className="text-sm leading-relaxed text-white/60 mb-4">
                        {episode.overview}
                      </p>
                      <span className="inline-block glass text-white font-display font-bold text-xs uppercase tracking-wider px-5 py-2.5 rounded-full active:scale-[0.98] transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] md:hover:bg-white/20 md:hover:scale-105">
                        Listen Now
                      </span>
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
          
          {/* Coming Soon Card - Position 5 */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.4 }}
          >
            <div 
              className="aspect-[4/5] relative overflow-hidden rounded-2xl group cursor-pointer transition-transform duration-700 ease-[cubic-bezier(0.32,0.72,0,1)] hover:scale-[1.02]"
              style={{
                backgroundImage: `url(${guestBg})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
              }}
            >
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent transition-all duration-700 ease-[cubic-bezier(0.32,0.72,0,1)] group-hover:from-black/80" />
              
              {/* Coming Soon label - glass pill with liquid hover */}
              <div className="absolute top-4 left-4 glass-dark rounded-full px-4 py-2 transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] group-hover:scale-105">
                <span className="font-display text-sm font-bold tracking-wider uppercase text-white">
                  Coming Soon
                </span>
              </div>
              
              {/* Content */}
              <div className="absolute inset-x-0 bottom-0 p-6 lg:p-8">
                <h3 className="font-display text-lg lg:text-xl font-semibold text-white">
                  Guest Name
                </h3>
                <p className="text-sm text-white/70 mt-0.5">
                  Chief Marketing Officer
                </p>
                <p className="text-sm font-medium mt-1 text-primary">
                  Company
                </p>
              </div>
            </div>
          </motion.div>
          
          {/* Subscribe CTA Card - Position 6 */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.5 }}
          >
            <div 
              className="aspect-[4/5] relative overflow-hidden rounded-2xl group cursor-pointer transition-transform duration-700 ease-[cubic-bezier(0.32,0.72,0,1)] hover:scale-[1.02]"
              style={{
                backgroundImage: `url(${subscribeBg})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
              }}
            >
              {/* Content */}
              <div className="absolute inset-0 flex flex-col justify-between p-6 lg:p-8">
                <h3 className="font-display text-3xl lg:text-4xl font-bold text-foreground leading-tight tracking-tight">
                  Subscribe to stay current on how teams are using AI.
                </h3>
                <button className="self-start bg-foreground text-background font-display font-bold text-sm uppercase tracking-wider px-8 py-4 rounded-full transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] hover:bg-foreground/90 hover:scale-105 active:scale-[0.98]">
                  Subscribe
                </button>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Archive Episodes - Compact List */}
        {archiveEpisodes.length > 0 && (
          <div className="mt-8">
            {archiveEpisodes.map((episode, index) => (
              <motion.div
                key={episode.id}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
              >
                <Link
                  to={`/episode/${episode.slug}`}
                  className="group flex items-center gap-6 py-5 border-b border-border hover:bg-secondary/30 transition-all duration-300 px-4 rounded-xl -mx-4"
                >
                  <span className="font-display text-2xl font-bold text-muted-foreground/40 w-12">
                    {String(FEATURED_COUNT + index + 1).padStart(2, '0')}
                  </span>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-display text-base lg:text-lg font-semibold text-foreground group-hover:text-primary transition-colors">
                      {episode.name}
                    </h3>
                    <p className="text-xs text-muted-foreground uppercase tracking-wider mt-0.5">
                      {episode.title}{episode.company && ` · ${episode.company}`}
                    </p>
                  </div>
                  <div className="w-6 h-6 flex items-center justify-center">
                    <div className="w-2 h-2 rounded-full bg-primary opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        )}

      </div>
    </section>
  );
};

export default PodcastSection;

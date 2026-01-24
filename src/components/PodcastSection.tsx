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
    overview: "Exploring how remote work is reshaping company culture and marketing strategies.",
    comingSoon: false,
  },
  {
    id: 2,
    slug: "lena-waters",
    name: "Lena Waters",
    title: "Chief Marketing Officer",
    company: "Notion",
    overview: "Building and nurturing creative communities that drive brand loyalty.",
    comingSoon: false,
  },
  {
    id: 3,
    slug: "dave-steer",
    name: "Dave Steer",
    title: "Chief Marketing Officer",
    company: "Webflow",
    overview: "How sustainable practices are becoming central to tech marketing.",
    comingSoon: false,
  },
  {
    id: 4,
    slug: "sara-varni",
    name: "Sara Varni",
    title: "Chief Marketing Officer",
    company: "Datadog",
    overview: "The power of storytelling in building memorable brand experiences.",
    comingSoon: false,
  },
  {
    id: 5,
    slug: "guest-five",
    name: "Guest Name",
    title: "Chief Marketing Officer",
    company: "Company",
    overview: "FPO - Episode description placeholder text for upcoming content.",
    comingSoon: false,
  },
  {
    id: 6,
    slug: "guest-six",
    name: "Guest Name",
    title: "Chief Marketing Officer",
    company: "Company",
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
        {/* Header with geometric accent */}
        <div className="mb-12 lg:mb-16 flex items-end gap-6">
          <div className="w-16 h-16 lg:w-20 lg:h-20 bg-primary flex-shrink-0" />
          <div>
            <p className="text-[10px] text-muted-foreground uppercase tracking-[0.3em] mb-2 font-medium">
              Episodes
            </p>
            <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground tracking-tight leading-none">
              Podcast
            </h2>
          </div>
        </div>

        {/* Featured Episodes - Hero Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-border">
          {featuredEpisodes.slice(0, 4).map((episode, index) => (
            <motion.div
              key={episode.id}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              className="bg-background"
            >
              <Link
                to={`/episode/${episode.slug}`}
                className="block group"
              >
                <div 
                  className="aspect-[4/5] relative overflow-hidden"
                  style={{
                    backgroundImage: `url(${guestBg})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                  }}
                >
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
                  
                  {/* Episode number - Bauhaus style */}
                  <div className="absolute top-0 left-0 bg-primary text-primary-foreground px-4 py-2">
                    <span className="font-display text-sm font-bold tracking-wider">
                      {String(index + 1).padStart(2, '0')}
                    </span>
                  </div>
                  
                  {/* Content */}
                  <div className="absolute inset-x-0 bottom-0 p-6 lg:p-8">
                    <h3 className="font-display text-2xl lg:text-3xl tracking-tight text-white leading-tight">
                      <span className="font-bold">{episode.name.split(' ')[0]}</span>
                      <br />
                      <span className="font-normal">{episode.name.split(' ').slice(1).join(' ')}</span>
                    </h3>
                    <div className="flex items-center gap-3 mt-3">
                      <div className="w-8 h-px bg-white/50" />
                      <p className="text-xs text-white/70 uppercase tracking-wider font-medium">
                        {episode.company || episode.title}
                      </p>
                    </div>
                    <p className="text-sm leading-relaxed text-white/60 max-h-0 overflow-hidden transition-all duration-300 ease-out group-hover:max-h-20 group-hover:mt-4">
                      {episode.overview}
                    </p>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
          
          {/* Coming Soon Card - Position 5 */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.4 }}
            className="bg-background"
          >
            <div 
              className="aspect-[4/5] relative overflow-hidden"
              style={{
                backgroundImage: `url(${guestBg})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
              }}
            >
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
              
              {/* Coming Soon label - top */}
              <div className="absolute top-0 left-0 bg-muted-foreground text-background px-4 py-2">
                <span className="font-display text-sm font-bold tracking-wider uppercase">
                  Coming Soon
                </span>
              </div>
              
              {/* Content */}
              <div className="absolute inset-x-0 bottom-0 p-6 lg:p-8">
                <h3 className="font-display text-2xl lg:text-3xl tracking-tight text-white leading-tight">
                  <span className="font-bold">Guest</span>
                  <br />
                  <span className="font-normal">Name</span>
                </h3>
                <div className="flex items-center gap-3 mt-3">
                  <div className="w-8 h-px bg-white/50" />
                  <p className="text-xs text-white/70 uppercase tracking-wider font-medium">
                    Company
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
          
          {/* Subscribe CTA Card - Position 6 */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.5 }}
            className="bg-background"
          >
            <div 
              className="aspect-[4/5] relative overflow-hidden"
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
                <button className="self-start bg-foreground text-background font-display font-bold text-sm uppercase tracking-wider px-8 py-4 rounded-lg hover:bg-foreground/90 transition-colors">
                  Subscribe
                </button>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Archive Episodes - Compact List */}
        {archiveEpisodes.length > 0 && (
          <div className="mt-px border-t border-border">
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
                  className="group flex items-center gap-6 py-5 border-b border-border hover:bg-secondary/50 transition-colors duration-200 px-2"
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

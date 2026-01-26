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
];

const FEATURED_COUNT = 6;

const PodcastSection = () => {
  const publishedEpisodes = episodes;
  
  // Split into featured (latest) and archive (rest)
  const featuredEpisodes = publishedEpisodes.slice(0, FEATURED_COUNT);
  const archiveEpisodes = publishedEpisodes.slice(FEATURED_COUNT);

  return (
    <section id="podcast" className="section-spacing">
      <div className="container mx-auto container-padding">
        {/* Header */}
        <div className="mb-12 lg:mb-16">
          <p className="text-label mb-2">Episodes</p>
          <h2 className="text-display-lg text-foreground">Podcast</h2>
        </div>

        {/* Featured Episodes - Hero Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 grid-gap">
          {featuredEpisodes.slice(0, 4).map((episode, index) => {
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
                    {/* Overlay */}
                    <div className="card-overlay-light hover-transition group-hover:opacity-90" />
                    
                    {/* Company logo badge */}
                    {episode.companyDomain && (
                      <div className="absolute top-4 left-4 glass rounded-xl p-2.5 hover-scale-badge">
                        <img 
                          src={`https://www.google.com/s2/favicons?domain=${episode.companyDomain}&sz=64`} 
                          alt={episode.company}
                          className="h-5 w-5 object-contain"
                        />
                      </div>
                    )}
                    
                    {/* Content */}
                    <div className="card-content-bottom card-padding-lg">
                      <h3 className="font-display text-white leading-[0.95] tracking-tight">
                        <span className="block text-2xl sm:text-3xl lg:text-4xl font-semibold">
                          {firstName}
                        </span>
                        <span className="block text-2xl sm:text-3xl lg:text-4xl font-semibold">
                          {lastName}
                        </span>
                      </h3>
                      <p className="text-body-sm text-white/70 mt-1 hover-transition">
                        {episode.title}
                      </p>
                      <p className="text-body-sm font-medium text-primary hover-transition">
                        {episode.company}
                      </p>
                      {/* Reveal content */}
                      <div className="max-h-32 mt-4 md:max-h-0 md:mt-0 overflow-hidden md:opacity-0 md:translate-y-3 hover-transition md:group-hover:max-h-32 md:group-hover:mt-4 md:group-hover:opacity-100 md:group-hover:translate-y-0">
                        <p className="text-body-sm leading-relaxed text-white/60 mb-4">
                          {episode.overview}
                        </p>
                        <span className="btn-base btn-glass-light btn-sm">
                          Listen Now
                        </span>
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            );
          })}
          
          {/* Coming Soon Card - Position 5 */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.4 }}
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
              
              {/* Coming Soon label */}
              <div className="absolute top-4 left-4 badge-interactive glass-dark text-white">
                Coming Soon
              </div>
              
              {/* Content */}
              <div className="card-content-bottom card-padding-lg">
                <h3 className="font-display text-white leading-[0.95] tracking-tight">
                  <span className="block text-2xl sm:text-3xl lg:text-4xl font-semibold">
                    Guest
                  </span>
                  <span className="block text-2xl sm:text-3xl lg:text-4xl font-semibold">
                    Name
                  </span>
                </h3>
                <p className="text-body-sm text-white/70 mt-1">
                  Chief Marketing Officer
                </p>
                <p className="text-body-sm font-medium text-primary">
                  Company
                </p>
              </div>
            </div>
          </motion.div>
          
          {/* Coming Soon Card - Position 6 */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.5 }}
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
              
              {/* Coming Soon label */}
              <div className="absolute top-4 left-4 badge-interactive glass-dark text-white">
                Coming Soon
              </div>
              
              {/* Content */}
              <div className="card-content-bottom card-padding-lg">
                <h3 className="font-display text-white leading-[0.95] tracking-tight">
                  <span className="block text-2xl sm:text-3xl lg:text-4xl font-semibold">
                    Guest
                  </span>
                  <span className="block text-2xl sm:text-3xl lg:text-4xl font-semibold">
                    Name
                  </span>
                </h3>
                <p className="text-body-sm text-white/70 mt-1">
                  Chief Marketing Officer
                </p>
                <p className="text-body-sm font-medium text-primary">
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
              className="card-image group cursor-pointer hover-scale"
              style={{
                backgroundImage: `url(${subscribeBg})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
              }}
            >
              {/* Content */}
              <div className="card-content-full card-padding-lg">
                <h3 className="text-display-md text-foreground">
                  Subscribe to stay current on how teams are using AI.
                </h3>
                <button className="btn-base btn-primary btn-lg self-start">
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
                  className="group flex items-center gap-6 py-5 border-b border-border hover:bg-secondary/30 hover-transition px-4 rounded-xl -mx-4"
                >
                  <span className="font-display text-2xl font-bold text-muted-foreground/40 w-12">
                    {String(FEATURED_COUNT + index + 1).padStart(2, '0')}
                  </span>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-display text-base lg:text-lg font-semibold text-foreground group-hover:text-primary hover-transition">
                      {episode.name}
                    </h3>
                    <p className="text-label mt-0.5">
                      {episode.title}{episode.company && ` · ${episode.company}`}
                    </p>
                  </div>
                  <div className="w-6 h-6 flex items-center justify-center">
                    <div className="w-2 h-2 rounded-full bg-primary opacity-0 group-hover:opacity-100 hover-transition" />
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

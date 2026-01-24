import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import guestBg from "@/assets/guest-bg.png";

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
    slug: "mindful-leadership",
    name: "Sheila Vashee",
    title: "Chief Marketing Officer",
    company: "",
    overview: "Leading with intention and building resilient marketing teams.",
    comingSoon: true,
  },
  {
    id: 6,
    slug: "design-systems-at-scale",
    name: "Lena Waters",
    title: "Chief Marketing Officer",
    company: "",
    overview: "Scaling design systems across global marketing organizations.",
    comingSoon: true,
  },
  {
    id: 7,
    slug: "future-of-marketing",
    name: "Katrina Wong",
    title: "Chief Marketing Officer",
    company: "New Relic",
    overview: "What's next for marketing in the age of AI and automation.",
    comingSoon: true,
  },
];

const PodcastSection = () => {
  const publishedEpisodes = episodes.filter(ep => !ep.comingSoon);
  const upcomingEpisodes = episodes.filter(ep => ep.comingSoon);

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

        {/* Published Episodes - Asymmetric Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-border">
          {publishedEpisodes.map((episode, index) => (
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
                  className="aspect-[4/3] relative overflow-hidden"
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
        </div>

        {/* Coming Soon - Swiss Grid */}
        <div className="mt-px grid grid-cols-3 gap-px bg-border">
          {upcomingEpisodes.map((episode, index) => (
            <motion.div
              key={episode.id}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, delay: index * 0.05 }}
              className="bg-background p-5 lg:p-6 group hover:bg-secondary transition-colors duration-200"
            >
              <div className="flex items-start justify-between mb-4">
                <span className="font-display text-3xl lg:text-4xl font-bold text-muted-foreground/30">
                  {String(publishedEpisodes.length + index + 1).padStart(2, '0')}
                </span>
                <div className="w-2 h-2 rounded-full bg-muted-foreground/30" />
              </div>
              <h3 className="font-display text-sm lg:text-base font-bold text-foreground leading-tight">
                {episode.name}
              </h3>
              <p className="text-xs text-muted-foreground mt-1 uppercase tracking-wider">
                {episode.title}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PodcastSection;

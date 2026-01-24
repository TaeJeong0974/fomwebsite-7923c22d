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
        <div className="mb-10 lg:mb-12">
          <p className="text-xs text-muted-foreground uppercase tracking-[0.2em] mb-3 font-medium">
            Listen Now
          </p>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-semibold text-foreground tracking-tight">
            Podcast Episodes
          </h2>
        </div>

        {/* Published Episodes */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {publishedEpisodes.map((episode, index) => (
            <motion.div
              key={episode.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.08 }}
            >
              <Link
                to={`/episode/${episode.slug}`}
                className="block group"
              >
                <div 
                  className="aspect-[16/9] relative flex flex-col justify-end p-6 lg:p-8 overflow-hidden transition-transform duration-300 hover:scale-[1.01]"
                  style={{
                    backgroundImage: `url(${guestBg})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                  }}
                >
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/20 to-transparent" />
                  
                  <div className="relative z-10">
                    <h3 className="font-display text-2xl lg:text-3xl tracking-tight text-white">
                      <span className="font-bold">{episode.name.split(' ')[0]}</span>{' '}
                      <span className="font-normal">{episode.name.split(' ').slice(1).join(' ')}</span>
                    </h3>
                    <p className="text-sm mt-1.5 text-white/80 font-medium">
                      {episode.title}{episode.company && ` · ${episode.company}`}
                    </p>
                    <p className="text-sm leading-relaxed text-white/70 max-h-0 overflow-hidden transition-all duration-300 ease-out group-hover:max-h-20 group-hover:mt-3">
                      {episode.overview}
                    </p>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        {/* Coming Soon */}
        <div className="mt-4 grid grid-cols-1 sm:grid-cols-3 gap-4">
          {upcomingEpisodes.map((episode, index) => (
            <motion.div
              key={episode.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.05 }}
              className="border border-border p-5"
            >
              <span className="text-[10px] font-medium uppercase tracking-wider text-muted-foreground">
                Coming Soon
              </span>
              <h3 className="font-display text-base font-semibold mt-2 text-foreground">
                {episode.name}
              </h3>
              <p className="text-xs text-muted-foreground mt-1">
                {episode.title}{episode.company && ` · ${episode.company}`}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PodcastSection;

import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const episodes = [
  {
    id: 1,
    slug: "meagen-eisenberg",
    name: "Meagen Eisenberg",
    title: "Chief Marketing Officer",
    company: "Datadog",
    overview: "Exploring how remote work is reshaping company culture and marketing strategies.",
    comingSoon: false,
    bgColor: "bg-[hsl(220,20%,10%)]",
    textLight: true,
  },
  {
    id: 2,
    slug: "lena-waters",
    name: "Lena Waters",
    title: "Chief Marketing Officer",
    company: "Square",
    overview: "Building and nurturing creative communities that drive brand loyalty.",
    comingSoon: false,
    bgColor: "bg-[hsl(200,80%,92%)]",
    textLight: false,
  },
  {
    id: 3,
    slug: "dave-steer",
    name: "Dave Steer",
    title: "Chief Marketing Officer",
    company: "Loveable",
    overview: "How sustainable practices are becoming central to tech marketing.",
    comingSoon: false,
    bgColor: "bg-[hsl(35,100%,95%)]",
    textLight: false,
  },
  {
    id: 4,
    slug: "sara-varni",
    name: "Sara Varni",
    title: "Chief Marketing Officer",
    company: "Webflow",
    overview: "The power of storytelling in building memorable brand experiences.",
    comingSoon: false,
    bgColor: "bg-[hsl(280,30%,95%)]",
    textLight: false,
  },
  {
    id: 5,
    slug: "mindful-leadership",
    name: "Sheila Vashee",
    title: "Chief Marketing Officer",
    company: "",
    overview: "Leading with intention and building resilient marketing teams.",
    comingSoon: true,
    bgColor: "bg-[hsl(240,10%,96%)]",
    textLight: false,
  },
  {
    id: 6,
    slug: "design-systems-at-scale",
    name: "Lena Waters",
    title: "Chief Marketing Officer",
    company: "",
    overview: "Scaling design systems across global marketing organizations.",
    comingSoon: true,
    bgColor: "bg-[hsl(160,40%,94%)]",
    textLight: false,
  },
  {
    id: 7,
    slug: "future-of-marketing",
    name: "Katrina Wong",
    title: "Chief Marketing Officer",
    company: "New Relic",
    overview: "What's next for marketing in the age of AI and automation.",
    comingSoon: true,
    bgColor: "bg-[hsl(10,80%,94%)]",
    textLight: false,
  },
];

const PodcastSection = () => {
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

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {episodes.filter(ep => !ep.comingSoon).map((episode, index) => (
            <motion.div
              key={episode.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.08 }}
            >
              <Link
                to={`/episode/${episode.slug}`}
                className={`${episode.bgColor} block group hover:opacity-90 transition-opacity`}
              >
                <div className="aspect-[16/9] relative flex flex-col justify-end p-6 lg:p-8">
                  <h3 className={`font-display text-2xl lg:text-3xl font-semibold tracking-tight ${episode.textLight ? 'text-white' : 'text-foreground'}`}>
                    {episode.name}
                  </h3>
                  <p className={`text-sm mt-1 ${episode.textLight ? 'text-white/70' : 'text-muted-foreground'}`}>
                    {episode.title}{episode.company && `, ${episode.company}`}
                  </p>
                  <p className={`text-sm mt-3 leading-relaxed ${episode.textLight ? 'text-white/60' : 'text-muted-foreground/80'}`}>
                    {episode.overview}
                  </p>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        {/* Coming Soon */}
        <div className="mt-4 grid grid-cols-1 sm:grid-cols-3 gap-4">
          {episodes.filter(ep => ep.comingSoon).map((episode, index) => (
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
                {episode.title}{episode.company && `, ${episode.company}`}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PodcastSection;

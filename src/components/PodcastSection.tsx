import { Link } from "react-router-dom";
import { Play } from "lucide-react";
import { motion } from "framer-motion";

const episodes = [
  {
    id: 1,
    slug: "the-future-of-remote-work",
    episodeTitle: "The Future of Remote Work",
    name: "Sara Varni",
    role: "Chief Marketing Officer",
    company: "Datadog",
    duration: "45 min",
    comingSoon: false,
    bgColor: "bg-[hsl(220,20%,10%)]",
    textLight: true,
  },
  {
    id: 2,
    slug: "building-creative-communities",
    episodeTitle: "Building Creative Communities",
    name: "Lindsey Irvine",
    role: "Chief Marketing Officer",
    company: "Square",
    duration: "38 min",
    comingSoon: false,
    bgColor: "bg-[hsl(200,80%,92%)]",
    textLight: false,
  },
  {
    id: 3,
    slug: "sustainable-tech-practices",
    episodeTitle: "Sustainable Tech Practices",
    name: "Ceci Stallsmith",
    role: "Chief Marketing Officer",
    company: "Loveable",
    duration: "52 min",
    comingSoon: false,
    bgColor: "bg-[hsl(35,100%,95%)]",
    textLight: false,
  },
  {
    id: 4,
    slug: "the-art-of-storytelling",
    episodeTitle: "The Art of Storytelling",
    name: "Dave Steer",
    role: "Chief Marketing Officer",
    company: "Webflow",
    duration: "41 min",
    comingSoon: false,
    bgColor: "bg-[hsl(280,30%,95%)]",
    textLight: false,
  },
  {
    id: 5,
    slug: "mindful-leadership",
    episodeTitle: "Mindful Leadership",
    name: "Sheila Vashee",
    role: "Chief Marketing Officer",
    company: "",
    duration: "TBD",
    comingSoon: true,
    bgColor: "bg-[hsl(240,10%,96%)]",
    textLight: false,
  },
  {
    id: 6,
    slug: "design-systems-at-scale",
    episodeTitle: "Design Systems at Scale",
    name: "Lena Waters",
    role: "Chief Marketing Officer",
    company: "",
    duration: "TBD",
    comingSoon: true,
    bgColor: "bg-[hsl(160,40%,94%)]",
    textLight: false,
  },
  {
    id: 7,
    slug: "future-of-marketing",
    episodeTitle: "Future of Marketing",
    name: "Katrina Wong",
    role: "Chief Marketing Officer",
    company: "New Relic",
    duration: "TBD",
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

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-6">
          {episodes.filter(ep => !ep.comingSoon).map((episode, index) => (
            <motion.div
              key={episode.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ 
                duration: 0.5, 
                delay: index * 0.1,
                ease: [0.25, 0.1, 0.25, 1]
              }}
            >
              <Link
                to={`/episode/${episode.slug}`}
                className={`${episode.bgColor} overflow-hidden block group transition-all duration-500 hover:scale-[1.02]`}
              >
                <div className="aspect-[16/10] relative overflow-hidden">
                  {/* Background pattern */}
                  <div className={`absolute inset-0 ${episode.textLight ? 'bg-white/5' : 'bg-black/[0.02]'}`} />
                  
                  
                  {/* Play button */}
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300">
                    <div className="w-16 h-16 lg:w-20 lg:h-20 bg-primary flex items-center justify-center transform scale-90 group-hover:scale-100 transition-transform duration-300">
                      <Play className="w-6 h-6 lg:w-8 lg:h-8 text-primary-foreground ml-1" fill="currentColor" />
                    </div>
                  </div>
                  
                  {/* Content overlay */}
                  <div className="absolute inset-0 flex flex-col justify-end p-6 lg:p-8">
                    <div className="flex items-center gap-3 mb-3">
                      <span className={`text-xs font-medium uppercase tracking-wider ${episode.textLight ? 'text-white/50' : 'text-muted-foreground'}`}>
                        {episode.duration}
                      </span>
                      {episode.company && (
                        <>
                          <span className={`w-1 h-1 rounded-full ${episode.textLight ? 'bg-white/30' : 'bg-muted-foreground/40'}`} />
                          <span className={`text-xs font-medium uppercase tracking-wider ${episode.textLight ? 'text-white/50' : 'text-muted-foreground'}`}>
                            {episode.company}
                          </span>
                        </>
                      )}
                    </div>
                    <h3 className={`font-display text-2xl lg:text-3xl font-semibold mb-2 tracking-tight ${episode.textLight ? 'text-white' : 'text-foreground'}`}>
                      {episode.episodeTitle}
                    </h3>
                    <p className={`text-sm lg:text-base ${episode.textLight ? 'text-white/60' : 'text-muted-foreground'}`}>
                      with {episode.name}
                    </p>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        {/* Coming Soon Row */}
        <div className="mt-6 lg:mt-8 grid grid-cols-2 sm:grid-cols-3 gap-4">
          {episodes.filter(ep => ep.comingSoon).map((episode, index) => (
            <motion.div
              key={episode.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.05 }}
              className={`${episode.bgColor} p-5 lg:p-6`}
            >
              <span className="text-[10px] font-medium uppercase tracking-wider text-muted-foreground">
                Coming Soon
              </span>
              <h3 className="font-display text-base lg:text-lg font-semibold mt-2 text-foreground">
                {episode.episodeTitle}
              </h3>
              <p className="text-sm text-muted-foreground mt-1">
                {episode.name}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PodcastSection;

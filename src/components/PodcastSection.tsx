import { Link } from "react-router-dom";
import { Headphones, Video, Play } from "lucide-react";
import { Button } from "@/components/ui/button";
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
    <section id="podcast" className="py-24 lg:py-32">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-10 lg:mb-14">
          <p className="text-sm text-muted-foreground uppercase tracking-[0.2em] mb-3 font-medium">
            Listen Now
          </p>
          <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl font-semibold text-foreground tracking-tight">
            Podcast Episodes
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 lg:gap-5">
          {episodes.map((episode, index) => (
            <motion.div
              key={episode.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ 
                duration: 0.5, 
                delay: index * 0.05,
                ease: [0.25, 0.1, 0.25, 1]
              }}
            >
              {episode.comingSoon ? (
                <div className={`${episode.bgColor} overflow-hidden h-full`}>
                  <div className="flex flex-col h-full">
                    <div className="aspect-[4/3] relative overflow-hidden">
                      <div className={`absolute inset-4 ${episode.textLight ? 'bg-white/10' : 'bg-black/5'} flex items-center justify-center`}>
                        <Headphones className={`w-10 h-10 ${episode.textLight ? 'text-white/40' : 'text-foreground/20'}`} />
                      </div>
                    </div>
                    
                    <div className="p-5 flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <span className={`text-xs font-medium uppercase tracking-wider ${episode.textLight ? 'text-white/50' : 'text-muted-foreground'}`}>
                          Coming Soon
                        </span>
                      </div>
                      <h3 className={`font-display text-lg font-semibold mb-1 ${episode.textLight ? 'text-white' : 'text-foreground'}`}>
                        {episode.episodeTitle}
                      </h3>
                      <p className={`text-sm ${episode.textLight ? 'text-white/70' : 'text-muted-foreground'}`}>
                        {episode.name}
                      </p>
                    </div>
                  </div>
                </div>
              ) : (
                <Link
                  to={`/episode/${episode.slug}`}
                  className={`${episode.bgColor} overflow-hidden block group transition-transform duration-300 hover:scale-[1.02] h-full`}
                >
                  <div className="flex flex-col h-full">
                    <div className="aspect-[4/3] relative overflow-hidden">
                      <div className={`absolute inset-4 ${episode.textLight ? 'bg-white/10' : 'bg-black/5'} flex items-center justify-center transition-transform duration-300 group-hover:scale-105`}>
                        <Video className={`w-10 h-10 ${episode.textLight ? 'text-white/40' : 'text-foreground/20'}`} />
                      </div>
                      
                      <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <div className="w-14 h-14 bg-primary flex items-center justify-center">
                          <Play className="w-6 h-6 text-primary-foreground ml-0.5" fill="currentColor" />
                        </div>
                      </div>
                    </div>
                    
                    <div className="p-5 flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <span className={`text-xs font-medium ${episode.textLight ? 'text-white/50' : 'text-muted-foreground'}`}>
                          {episode.duration}
                        </span>
                        {episode.company && (
                          <>
                            <span className={`w-1 h-1 rounded-full ${episode.textLight ? 'bg-white/30' : 'bg-muted-foreground/40'}`} />
                            <span className={`text-xs font-medium ${episode.textLight ? 'text-white/50' : 'text-muted-foreground'}`}>
                              {episode.company}
                            </span>
                          </>
                        )}
                      </div>
                      <h3 className={`font-display text-lg font-semibold mb-1 ${episode.textLight ? 'text-white' : 'text-foreground'}`}>
                        {episode.episodeTitle}
                      </h3>
                      <p className={`text-sm ${episode.textLight ? 'text-white/70' : 'text-muted-foreground'}`}>
                        {episode.name}
                      </p>
                    </div>
                  </div>
                </Link>
              )}
            </motion.div>
          ))}

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.5, delay: episodes.length * 0.05 }}
            className="bg-primary overflow-hidden"
          >
            <div className="aspect-[4/5] flex flex-col items-center justify-center p-6 text-center">
              <h3 className="font-display text-xl font-bold text-primary-foreground mb-2">
                More Coming Soon
              </h3>
              <p className="text-primary-foreground/70 mb-5 text-sm">
                Be the first to know when new episodes drop.
              </p>
              <Button 
                variant="secondary" 
                size="default"
                className="font-medium"
              >
                Subscribe
              </Button>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default PodcastSection;

import { Link } from "react-router-dom";
import { Headphones, Video, Play } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

const episodes = [
  {
    id: 1,
    slug: "the-future-of-remote-work",
    title: "Sara Varni",
    company: "Datadog",
    description: "Exploring how distributed teams are reshaping the workplace.",
    duration: "45 min",
    comingSoon: false,
    bgColor: "bg-[hsl(220,20%,10%)]",
    textLight: true,
  },
  {
    id: 2,
    slug: "building-creative-communities",
    title: "Lindsey Irvine",
    company: "Square",
    description: "How to foster meaningful connections in digital spaces.",
    duration: "38 min",
    comingSoon: false,
    bgColor: "bg-[hsl(200,80%,92%)]",
    textLight: false,
  },
  {
    id: 3,
    slug: "sustainable-tech-practices",
    title: "Ceci Stallsmith",
    company: "Loveable",
    description: "Balancing innovation with environmental responsibility.",
    duration: "52 min",
    comingSoon: false,
    bgColor: "bg-[hsl(35,100%,95%)]",
    textLight: false,
  },
  {
    id: 4,
    slug: "the-art-of-storytelling",
    title: "Dave Steer",
    company: "Webflow",
    description: "Crafting narratives that resonate with your audience.",
    duration: "41 min",
    comingSoon: false,
    bgColor: "bg-[hsl(280,30%,95%)]",
    textLight: false,
  },
  {
    id: 5,
    slug: "mindful-leadership",
    title: "Sheila Vashee",
    company: "Figma",
    description: "Leading with intention in fast-paced environments.",
    duration: "TBD",
    comingSoon: true,
    bgColor: "bg-[hsl(240,10%,96%)]",
    textLight: false,
  },
  {
    id: 6,
    slug: "design-systems-at-scale",
    title: "Lena Waters",
    company: "Notion",
    description: "Creating consistent experiences across products.",
    duration: "TBD",
    comingSoon: true,
    bgColor: "bg-[hsl(160,40%,94%)]",
    textLight: false,
  },
];

const PodcastSection = () => {
  return (
    <section id="podcast" className="container mx-auto px-4 sm:px-6 lg:px-8 py-24 lg:py-32">
      <div className="mb-12">
        <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl font-semibold text-foreground tracking-tight">
          Episodes
        </h2>
        <p className="mt-3 text-lg text-muted-foreground">
          Explore the conversations.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {episodes.map((episode, index) => (
          <motion.div
            key={episode.id}
            initial={{ opacity: 0, y: 40, scale: 0.95 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ 
              duration: 0.6, 
              delay: index * 0.1,
              ease: [0.25, 0.1, 0.25, 1]
            }}
          >
            {episode.comingSoon ? (
              <div className={`${episode.bgColor} rounded-3xl overflow-hidden h-full`}>
                <div className="aspect-[4/5] flex flex-col">
                  {/* Image/Episode container */}
                  <div className="flex-1 relative overflow-hidden">
                    <div className={`absolute inset-4 rounded-2xl ${episode.textLight ? 'bg-white/10' : 'bg-black/5'} flex items-center justify-center`}>
                      <Headphones className={`w-12 h-12 ${episode.textLight ? 'text-white/60' : 'text-foreground/40'}`} />
                    </div>
                  </div>
                  
                  {/* Content area */}
                  <div className="p-6 pt-0">
                    <div className="flex items-center gap-2 mb-3">
                      <span className={`text-xs font-medium tracking-wide uppercase ${episode.textLight ? 'text-white/60' : 'text-muted-foreground'}`}>
                        Coming Soon
                      </span>
                    </div>
                    <h3 className={`font-display text-xl font-semibold mb-2 ${episode.textLight ? 'text-white' : 'text-foreground'}`}>
                      {episode.title}
                    </h3>
                    <p className={`text-sm leading-relaxed ${episode.textLight ? 'text-white/70' : 'text-muted-foreground'}`}>
                      {episode.company}
                    </p>
                  </div>
                </div>
              </div>
            ) : (
              <Link
                to={`/episode/${episode.slug}`}
                className={`${episode.bgColor} rounded-3xl overflow-hidden block group transition-transform duration-300 hover:scale-[1.02]`}
              >
                <div className="aspect-[4/5] flex flex-col">
                  {/* Image/Episode container */}
                  <div className="flex-1 relative overflow-hidden">
                    <div className={`absolute inset-4 rounded-2xl ${episode.textLight ? 'bg-white/10' : 'bg-black/5'} flex items-center justify-center transition-transform duration-300 group-hover:scale-105`}>
                      <Video className={`w-12 h-12 ${episode.textLight ? 'text-white/60' : 'text-foreground/40'}`} />
                    </div>
                    
                    {/* Play button overlay on hover */}
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <div className="w-16 h-16 rounded-full bg-primary flex items-center justify-center shadow-lg">
                        <Play className="w-7 h-7 text-primary-foreground ml-1" fill="currentColor" />
                      </div>
                    </div>
                  </div>
                  
                  {/* Content area */}
                  <div className="p-6 pt-0">
                    <div className="flex items-center gap-2 mb-3">
                      <span className={`text-xs font-medium ${episode.textLight ? 'text-white/60' : 'text-muted-foreground'}`}>
                        {episode.duration}
                      </span>
                      <span className={`w-1 h-1 rounded-full ${episode.textLight ? 'bg-white/40' : 'bg-muted-foreground/40'}`} />
                      <span className={`text-xs font-medium ${episode.textLight ? 'text-white/60' : 'text-muted-foreground'}`}>
                        {episode.company}
                      </span>
                    </div>
                    <h3 className={`font-display text-xl font-semibold mb-2 ${episode.textLight ? 'text-white' : 'text-foreground'}`}>
                      {episode.title}
                    </h3>
                    <p className={`text-sm leading-relaxed ${episode.textLight ? 'text-white/70' : 'text-muted-foreground'}`}>
                      {episode.description}
                    </p>
                    
                    {/* Action links */}
                    <div className="mt-4 flex items-center gap-4">
                      <span className={`text-sm font-medium inline-flex items-center gap-1.5 ${episode.textLight ? 'text-white' : 'text-primary'}`}>
                        <Video size={14} />
                        Watch
                      </span>
                      <span className={`text-sm font-medium inline-flex items-center gap-1.5 ${episode.textLight ? 'text-white' : 'text-primary'}`}>
                        <Headphones size={14} />
                        Listen
                      </span>
                    </div>
                  </div>
                </div>
              </Link>
            )}
          </motion.div>
        ))}

        {/* Subscribe CTA Card */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.5, delay: episodes.length * 0.08 }}
          className="bg-gradient-to-br from-primary to-accent rounded-3xl overflow-hidden"
        >
          <div className="aspect-[4/5] flex flex-col items-center justify-center p-8 text-center">
            <h3 className="font-display text-2xl font-bold text-primary-foreground mb-3">
              More Coming Soon
            </h3>
            <p className="text-primary-foreground/80 mb-6 text-sm">
              Be the first to know when new episodes drop.
            </p>
            <Button 
              variant="secondary" 
              size="lg"
              className="rounded-full px-8 font-medium"
            >
              Subscribe
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default PodcastSection;

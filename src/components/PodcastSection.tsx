import { Link } from "react-router-dom";
import { Headphones, Video } from "lucide-react";
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
  },
  {
    id: 2,
    slug: "building-creative-communities",
    title: "Lindsey Irvine",
    company: "Square",
    description: "How to foster meaningful connections in digital spaces.",
    duration: "38 min",
    comingSoon: false,
  },
  {
    id: 3,
    slug: "sustainable-tech-practices",
    title: "Ceci Stallsmith",
    company: "Loveable",
    description: "Balancing innovation with environmental responsibility.",
    duration: "52 min",
    comingSoon: false,
  },
  {
    id: 4,
    slug: "the-art-of-storytelling",
    title: "Dave Steer",
    company: "Webflow",
    description: "Crafting narratives that resonate with your audience.",
    duration: "41 min",
    comingSoon: false,
  },
  {
    id: 5,
    slug: "mindful-leadership",
    title: "Sheila Vashee",
    company: "Figma",
    description: "Leading with intention in fast-paced environments.",
    duration: "TBD",
    comingSoon: true,
  },
  {
    id: 6,
    slug: "design-systems-at-scale",
    title: "Lena Waters",
    company: "Notion",
    description: "Creating consistent experiences across products.",
    duration: "TBD",
    comingSoon: true,
  },
  {
    id: 7,
    slug: "building-in-public",
    title: "Katrina Wong",
    company: "New Relic",
    description: "The power of transparency in growing your product and audience.",
    duration: "TBD",
    comingSoon: true,
  },
];

const PodcastSection = () => {
  return (
    <section id="podcast" className="container mx-auto px-4 sm:px-6 lg:px-8">
      <div className="mb-8">
        <h2 className="font-display text-3xl sm:text-4xl font-bold text-foreground">
          Latest Episodes
        </h2>
        <p className="mt-2 text-muted-foreground flex items-center gap-3">
          <span className="inline-flex items-center gap-1.5">
            <Video size={16} />
            Watch
          </span>
          <span>or</span>
          <span className="inline-flex items-center gap-1.5">
            <Headphones size={16} />
            Listen
          </span>
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 auto-rows-fr">
        {episodes.map((episode, index) => {
          const CardWrapper = episode.comingSoon ? 'div' : Link;
          const cardProps = episode.comingSoon 
            ? { className: "border border-dashed border-border rounded-lg overflow-hidden block bg-muted/30 h-full flex flex-col" }
            : { to: `/episode/${episode.slug}`, className: "border border-border rounded-lg overflow-hidden hover:border-primary/50 transition-colors block h-full flex flex-col" };
          
          return (
            <motion.div
              key={episode.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
            >
              <CardWrapper {...cardProps as any}>
              {/* Video placeholder */}
              <div className={`aspect-video flex items-center justify-center relative group/video ${episode.comingSoon ? 'bg-muted/50' : 'bg-muted'}`}>
                {episode.comingSoon ? (
                  <span className="text-muted-foreground font-medium text-sm border border-border px-3 py-1 rounded-full">Coming Soon</span>
                ) : (
                  <>
                    <span className="text-muted-foreground text-sm">Video</span>
                    <div className="absolute inset-0 flex items-center justify-center bg-background/60 opacity-0 group-hover/video:opacity-100 transition-opacity duration-300">
                      <div className="w-14 h-14 rounded-full bg-primary flex items-center justify-center">
                        <svg className="w-6 h-6 text-primary-foreground ml-1" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M8 5v14l11-7z" />
                        </svg>
                      </div>
                    </div>
                  </>
                )}
              </div>
              
              <div className="p-6 flex flex-col flex-1">
                <div className="flex items-center text-sm text-muted-foreground mb-3">
                  <span>{episode.duration}</span>
                </div>
                <h3 className="font-display text-lg font-semibold text-foreground mb-1">
                  {episode.title}
                </h3>
                {episode.company && (
                  <p className="text-sm text-muted-foreground mb-2">{episode.company}</p>
                )}
                <p className="text-muted-foreground text-sm flex-1">
                  {episode.description}
                </p>
                {!episode.comingSoon && (
                  <div className="mt-4 flex items-center gap-4">
                    <span className="text-primary font-medium text-sm inline-flex items-center gap-1.5">
                      <Video size={14} />
                      Watch
                    </span>
                    <span className="text-primary font-medium text-sm inline-flex items-center gap-1.5">
                      <Headphones size={14} />
                      Listen
                    </span>
                  </div>
                )}
              </div>
              </CardWrapper>
            </motion.div>
          );
        })}

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.4, delay: episodes.length * 0.1 }}
          className="border border-dashed border-border rounded-lg overflow-hidden bg-muted/30 flex flex-col items-center justify-center p-8 text-center min-h-[320px]"
        >
          <h3 className="font-display text-2xl font-bold text-foreground mb-4">
            More Coming Soon
          </h3>
          <p className="text-muted-foreground mb-6">
            Be the first to know when new episodes drop.
          </p>
          <Button variant="default" size="lg">
            Subscribe
          </Button>
        </motion.div>
      </div>
    </section>
  );
};

export default PodcastSection;

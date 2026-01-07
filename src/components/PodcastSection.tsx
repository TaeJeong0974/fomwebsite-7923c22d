import { Link } from "react-router-dom";
import { Headphones, Video } from "lucide-react";

const episodes = [
  {
    id: 1,
    slug: "the-future-of-remote-work",
    title: "Sara Varni",
    description: "Exploring how distributed teams are reshaping the workplace.",
    date: "Jan 5, 2026",
    duration: "45 min",
    comingSoon: false,
  },
  {
    id: 2,
    slug: "building-creative-communities",
    title: "Lindsey Irvine",
    description: "How to foster meaningful connections in digital spaces.",
    date: "Dec 29, 2025",
    duration: "38 min",
    comingSoon: false,
  },
  {
    id: 3,
    slug: "sustainable-tech-practices",
    title: "Ceci Stallsmith",
    description: "Balancing innovation with environmental responsibility.",
    date: "Dec 22, 2025",
    duration: "52 min",
    comingSoon: false,
  },
  {
    id: 4,
    slug: "the-art-of-storytelling",
    title: "Dave Steer",
    description: "Crafting narratives that resonate with your audience.",
    date: "Dec 15, 2025",
    duration: "41 min",
    comingSoon: false,
  },
  {
    id: 5,
    slug: "mindful-leadership",
    title: "Sheila Vashee",
    description: "Leading with intention in fast-paced environments.",
    date: "Coming Soon",
    duration: "TBD",
    comingSoon: true,
  },
  {
    id: 6,
    slug: "design-systems-at-scale",
    title: "Lena Waters",
    description: "Creating consistent experiences across products.",
    date: "Coming Soon",
    duration: "TBD",
    comingSoon: true,
  },
  {
    id: 7,
    slug: "building-in-public",
    title: "Katrina Wong",
    description: "The power of transparency in growing your product and audience.",
    date: "Coming Soon",
    duration: "TBD",
    comingSoon: true,
  },
  {
    id: 8,
    slug: "the-creator-economy",
    title: "Coming Soon",
    description: "How individuals are building businesses around their passions.",
    date: "Coming Soon",
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

      {/* Episodes Grid: 1 col mobile, 2 col tablet, 3 col desktop */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {episodes.map((episode) => {
          const CardWrapper = episode.comingSoon ? 'div' : Link;
          const cardProps = episode.comingSoon 
            ? { className: "border border-border rounded-lg overflow-hidden block opacity-60" }
            : { to: `/episode/${episode.slug}`, className: "border border-border rounded-lg overflow-hidden hover:border-primary/50 transition-colors block" };
          
          return (
            <CardWrapper
              key={episode.id}
              {...cardProps as any}
            >
              {/* Video placeholder */}
              <div className="aspect-video bg-muted flex items-center justify-center relative group/video">
                {episode.comingSoon ? (
                  <span className="text-foreground font-medium text-sm bg-background px-3 py-1 rounded-full">Coming Soon</span>
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
              
              <div className="p-6">
                <div className="flex items-center gap-2 text-sm text-muted-foreground mb-3">
                  <time>{episode.date}</time>
                  <span>•</span>
                  <span>{episode.duration}</span>
                </div>
                <h3 className="font-display text-lg font-semibold text-foreground mb-2">
                  {episode.title}
                </h3>
                <p className="text-muted-foreground text-sm">
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
          );
        })}
      </div>
    </section>
  );
};

export default PodcastSection;

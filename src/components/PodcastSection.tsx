const episodes = [
  {
    id: 1,
    title: "The Future of Remote Work",
    description: "Exploring how distributed teams are reshaping the workplace.",
    date: "Jan 5, 2026",
    duration: "45 min",
  },
  {
    id: 2,
    title: "Building Creative Communities",
    description: "How to foster meaningful connections in digital spaces.",
    date: "Dec 29, 2025",
    duration: "38 min",
  },
  {
    id: 3,
    title: "Sustainable Tech Practices",
    description: "Balancing innovation with environmental responsibility.",
    date: "Dec 22, 2025",
    duration: "52 min",
  },
  {
    id: 4,
    title: "The Art of Storytelling",
    description: "Crafting narratives that resonate with your audience.",
    date: "Dec 15, 2025",
    duration: "41 min",
  },
  {
    id: 5,
    title: "Mindful Leadership",
    description: "Leading with intention in fast-paced environments.",
    date: "Dec 8, 2025",
    duration: "47 min",
  },
  {
    id: 6,
    title: "Design Systems at Scale",
    description: "Creating consistent experiences across products.",
    date: "Dec 1, 2025",
    duration: "55 min",
  },
];

const PodcastSection = () => {
  return (
    <section id="podcast" className="container mx-auto px-4 sm:px-6 lg:px-8">
      <div className="mb-8">
        <h2 className="font-display text-3xl sm:text-4xl font-bold text-foreground">
          Latest Episodes
        </h2>
        <p className="mt-2 text-muted-foreground">
          Catch up on our most recent conversations
        </p>
      </div>

      {/* Episodes Grid: 1 col mobile, 2 col tablet, 3 col desktop */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {episodes.map((episode) => (
          <article
            key={episode.id}
            className="border border-border rounded-lg overflow-hidden hover:border-primary/50 transition-colors"
          >
            {/* Video placeholder */}
            <div className="aspect-video bg-muted flex items-center justify-center">
              <span className="text-muted-foreground text-sm">Video</span>
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
              <button className="mt-4 text-primary font-medium text-sm hover:underline">
                Listen →
              </button>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
};

export default PodcastSection;

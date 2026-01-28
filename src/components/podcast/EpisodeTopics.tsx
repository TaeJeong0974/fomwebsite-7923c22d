interface EpisodeTopicsProps {
  topics: string[];
  title?: string;
}

const EpisodeTopics = ({ topics, title = "Topics Covered" }: EpisodeTopicsProps) => {
  if (!topics || topics.length === 0) return null;

  const formatNumber = (index: number) => String(index + 1).padStart(2, '0');

  return (
    <div>
      <h2 className="font-display text-xs font-medium uppercase tracking-[0.2em] text-foreground mb-6">
        {title}
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-4">
        {topics.map((topic, index) => (
          <div key={index} className="flex items-start gap-4 py-3 border-b border-border/50">
            <span className="font-display text-sm font-semibold text-foreground tabular-nums">
              {formatNumber(index)}
            </span>
            <span className="text-foreground text-sm leading-relaxed">{topic}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default EpisodeTopics;

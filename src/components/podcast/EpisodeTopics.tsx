interface EpisodeTopicsProps {
  topics: string[];
  title?: string;
}

const EpisodeTopics = ({ topics, title = "Topics Covered" }: EpisodeTopicsProps) => {
  if (!topics || topics.length === 0) return null;

  const formatNumber = (index: number) => String(index + 1).padStart(2, '0');

  return (
    <div>
      <h2 className="text-label mb-5">
        {title}
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-0">
        {topics.map((topic, index) => (
          <div key={index} className="flex items-start gap-3 py-3 border-b border-border/30 last:border-b-0">
            <span className="font-display text-xs font-medium text-muted-foreground tabular-nums pt-0.5">
              {formatNumber(index)}
            </span>
            <span className="text-sm text-foreground/80 leading-relaxed">{topic}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default EpisodeTopics;

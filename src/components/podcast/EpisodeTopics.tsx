interface EpisodeTopicsProps {
  topics: string[];
  title?: string;
}

const EpisodeTopics = ({ topics, title = "Topics Covered" }: EpisodeTopicsProps) => {
  if (!topics || topics.length === 0) return null;

  const formatNumber = (index: number) => String(index + 1).padStart(2, '0');

  return (
    <div>
      <h3 className="text-section-header mb-4">
        {title}
      </h3>
      <div className="space-y-1 max-w-prose">
        {topics.map((topic, index) => (
          <div key={index} className="flex items-start gap-3 py-3">
            <span className="font-display text-xs font-medium text-muted-foreground tabular-nums mt-0.5">
              {formatNumber(index)}
            </span>
            <p className="text-foreground leading-relaxed">{topic}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default EpisodeTopics;

interface EpisodeTopicsProps {
  topics: string[];
  title?: string;
}

const EpisodeTopics = ({ topics, title = "Topics Covered" }: EpisodeTopicsProps) => {
  if (!topics || topics.length === 0) return null;

  const formatNumber = (index: number) => String(index + 1).padStart(2, '0');

  return (
    <div className="max-w-prose">
      <h3 className="text-section-header mb-4">
        {title}
      </h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-12 gap-y-1">
        {topics.map((topic, index) => (
          <div key={index} className="flex items-start gap-4 py-4">
            <span className="font-display text-sm font-medium text-muted-foreground tabular-nums">
              {formatNumber(index)}
            </span>
            <span className="text-foreground leading-relaxed">{topic}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default EpisodeTopics;

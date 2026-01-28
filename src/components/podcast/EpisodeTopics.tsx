interface EpisodeTopicsProps {
  topics: string[];
  title?: string;
}

const EpisodeTopics = ({ topics, title = "Topics Covered" }: EpisodeTopicsProps) => {
  if (!topics || topics.length === 0) return null;

  const formatNumber = (index: number) => String(index + 1).padStart(2, '0');

  return (
    <div className="max-w-prose">
      <h3 className="text-section-header mb-6">
        {title}
      </h3>
      <div className="border-t border-border">
        {/* Table Header */}
        <div className="flex items-center gap-6 py-3 border-b border-border">
          <span className="w-8 text-xs font-medium text-muted-foreground uppercase tracking-wider">No.</span>
          <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Topic</span>
        </div>
        {/* Table Rows */}
        {topics.map((topic, index) => (
          <div key={index} className="flex items-start gap-6 py-4 border-b border-border/60 last:border-b-0">
            <span className="w-8 text-sm text-muted-foreground tabular-nums">
              {formatNumber(index)}
            </span>
            <p className="text-lg text-foreground leading-relaxed">{topic}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default EpisodeTopics;

interface EpisodeTopicsProps {
  topics: string[];
  title?: string;
}

const EpisodeTopics = ({ topics, title = "Topics Covered" }: EpisodeTopicsProps) => {
  if (!topics || topics.length === 0) return null;

  const formatNumber = (index: number) => String(index + 1).padStart(2, '0');

  return (
    <div className="max-w-prose">
      <h3 className="text-section-header font-medium text-foreground mb-6">
        {title}
      </h3>
      <div className="border-t border-border">
        {/* Table Header */}
        <div className="flex items-center py-3 border-b border-border">
          <span className="w-12 flex-shrink-0 text-table-header font-medium text-muted-foreground">No.</span>
          <span className="text-table-header font-medium text-muted-foreground">Topic</span>
        </div>
        {/* Table Rows */}
        {topics.map((topic, index) => (
          <div key={index} className="flex items-start py-5 border-b border-border/60 last:border-b-0">
            <span className="w-12 flex-shrink-0 text-sm text-muted-foreground tabular-nums pt-0.5">
              {formatNumber(index)}
            </span>
            <p className="text-sm lg:text-base text-foreground leading-relaxed">{topic}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default EpisodeTopics;

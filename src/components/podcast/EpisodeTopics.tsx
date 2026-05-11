"use client";

interface EpisodeTopicsProps {
  topics: string[];
  detailTags?: string[];
  title?: string;
}

const EpisodeTopics = ({
  topics,
  detailTags,
  title = "Topics Covered",
}: EpisodeTopicsProps) => {
  if (
    (!topics || topics.length === 0) &&
    (!detailTags || detailTags.length === 0)
  )
    return null;

  const formatNumber = (index: number) => String(index + 1).padStart(2, "0");

  return (
    <div className="max-w-prose">
      <h3 className="text-section-header font-medium text-foreground mb-6">
        {title}
      </h3>

      {/* Detail Tag Pills */}
      {detailTags && detailTags.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-8">
          {detailTags.map((tag) => (
            <span
              key={tag}
              className="px-3 py-1.5 rounded-full text-xs font-medium border border-foreground/[0.12] text-foreground/80 bg-foreground/[0.03]"
            >
              {tag}
            </span>
          ))}
        </div>
      )}

      {topics && topics.length > 0 && (
        <div className="border-t border-border">
          {/* Table Header */}
          <div className="flex items-center py-3 border-b border-border">
            <span className="w-12 flex-shrink-0 text-table-header font-medium text-muted-foreground">
              No.
            </span>
            <span className="text-table-header font-medium text-muted-foreground">
              Topic
            </span>
          </div>
          {/* Table Rows */}
          {topics.map((topic, index) => (
            <div
              key={topic}
              className="flex items-start py-5 border-b border-border/60 last:border-b-0"
            >
              <span className="w-12 flex-shrink-0 text-sm text-muted-foreground tabular-nums pt-0.5">
                {formatNumber(index)}
              </span>
              <p className="text-sm lg:text-base text-foreground leading-relaxed">
                {topic}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default EpisodeTopics;

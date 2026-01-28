type TopicsVariant = "minimal" | "editorial" | "dense" | "monospace";

interface EpisodeTopicsProps {
  topics: string[];
  title?: string;
  variant?: TopicsVariant;
}

const EpisodeTopics = ({ topics, title = "Topics Covered", variant = "minimal" }: EpisodeTopicsProps) => {
  if (!topics || topics.length === 0) return null;

  const formatNumber = (index: number) => String(index + 1).padStart(2, '0');

  // Variant 1: Minimal Index - Large bold numbers, clean dividers
  if (variant === "minimal") {
    return (
      <div>
        <h2 className="font-display text-xl font-semibold text-foreground mb-6">
          {title}
        </h2>
        <div className="divide-y divide-border">
          {topics.map((topic, index) => (
            <div key={index} className="flex items-baseline gap-6 py-4 first:pt-0">
              <span className="font-display text-3xl font-bold text-foreground/20 tabular-nums">
                {formatNumber(index)}
              </span>
              <span className="text-foreground leading-relaxed flex-1">{topic}</span>
            </div>
          ))}
        </div>
      </div>
    );
  }

  // Variant 2: Editorial Grid - Two-column, uppercase labels, magazine feel
  if (variant === "editorial") {
    return (
      <div>
        <h2 className="font-display text-xs font-medium uppercase tracking-[0.2em] text-muted-foreground mb-6">
          {title}
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-4">
          {topics.map((topic, index) => (
            <div key={index} className="flex items-start gap-4 py-3 border-b border-border/50">
              <span className="font-display text-sm font-semibold text-muted-foreground tabular-nums">
                {formatNumber(index)}
              </span>
              <span className="text-foreground text-sm leading-relaxed">{topic}</span>
            </div>
          ))}
        </div>
      </div>
    );
  }

  // Variant 3: Dense List - Compact two-column grid
  if (variant === "dense") {
    return (
      <div>
        <h2 className="font-display text-xl font-semibold text-foreground mb-4">
          {title}
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {topics.map((topic, index) => (
            <div key={index} className="flex items-start gap-3">
              <span className="font-display text-2xl font-bold text-primary/60 tabular-nums leading-none mt-0.5">
                {formatNumber(index)}
              </span>
              <span className="text-muted-foreground text-sm leading-snug">{topic}</span>
            </div>
          ))}
        </div>
      </div>
    );
  }

  // Variant 4: Monospace Index - Typewriter style, uppercase tracking
  if (variant === "monospace") {
    return (
      <div>
        <h2 className="font-display text-xs font-medium uppercase tracking-[0.15em] text-muted-foreground mb-6">
          {title}
        </h2>
        <div className="space-y-0">
          {topics.map((topic, index) => (
            <div key={index} className="flex items-baseline gap-4 py-3 border-b border-border/30">
              <span className="font-mono text-sm text-muted-foreground tabular-nums">
                {formatNumber(index)}.
              </span>
              <span className="text-foreground uppercase tracking-wide text-sm leading-relaxed">
                {topic}
              </span>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return null;
};

export default EpisodeTopics;

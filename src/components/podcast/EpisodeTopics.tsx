interface EpisodeTopicsProps {
  topics: string[];
  title?: string;
}

const EpisodeTopics = ({ topics, title = "Topics Covered" }: EpisodeTopicsProps) => {
  if (!topics || topics.length === 0) return null;
  
  return (
    <div>
      <h3 className="font-display text-xl font-semibold text-foreground mb-4">
        {title}
      </h3>
      <ul className="space-y-3">
        {topics.map((topic, index) => (
          <li key={index} className="flex items-start gap-3">
            <span className="w-6 h-6 rounded-full bg-primary/10 text-primary flex items-center justify-center text-xs font-medium shrink-0 mt-0.5">
              {index + 1}
            </span>
            <span className="text-muted-foreground leading-relaxed">{topic}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default EpisodeTopics;

import { PodcastChapter } from "@/lib/podcastData";

interface EpisodeTopicsProps {
  chapters?: PodcastChapter[];
  topics?: string[];
  title?: string;
}

const EpisodeTopics = ({ chapters, topics, title = "Chapters" }: EpisodeTopicsProps) => {
  const items = chapters || (topics ? topics.map(t => ({ time: "", title: t })) : []);
  if (items.length === 0) return null;

  const hasTimestamps = items.some(item => item.time);

  return (
    <div className="max-w-prose">
      <h3 className="text-section-header font-medium text-foreground mb-6">
        {title}
      </h3>
      <div className="border-t border-border">
        {/* Table Header */}
        <div className="flex items-center gap-6 py-3 border-b border-border">
          <span className="w-12 text-table-header font-medium text-muted-foreground">
            {hasTimestamps ? "Time" : "No."}
          </span>
          <span className="text-table-header font-medium text-muted-foreground">Topic</span>
        </div>
        {/* Table Rows */}
        {items.map((item, index) => (
          <div key={index} className="flex items-start gap-6 py-4 border-b border-border/60 last:border-b-0">
            <span className="w-12 text-sm text-muted-foreground tabular-nums">
              {hasTimestamps ? item.time : String(index + 1).padStart(2, '0')}
            </span>
            <p className="text-base text-foreground leading-relaxed">{item.title}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default EpisodeTopics;

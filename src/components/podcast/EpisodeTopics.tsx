import { PodcastChapter } from "@/lib/podcastData";

interface EpisodeTopicsProps {
  chapters?: PodcastChapter[];
  topics?: string[];
  title?: string;
  onChapterClick?: (time: string) => void;
}

const EpisodeTopics = ({ chapters, topics, title = "Chapters", onChapterClick }: EpisodeTopicsProps) => {
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
          <div
            key={index}
            className={`flex items-start gap-6 py-4 border-b border-border/60 last:border-b-0 ${onChapterClick && item.time ? 'cursor-pointer hover:bg-accent/50 hover-transition -mx-2 px-2 rounded-lg' : ''}`}
            onClick={() => onChapterClick && item.time && onChapterClick(item.time)}
            role={onChapterClick && item.time ? "button" : undefined}
            tabIndex={onChapterClick && item.time ? 0 : undefined}
            onKeyDown={(e) => { if ((e.key === 'Enter' || e.key === ' ') && onChapterClick && item.time) { e.preventDefault(); onChapterClick(item.time); } }}
          >
            <span className={`w-12 text-sm tabular-nums ${onChapterClick && item.time ? 'text-primary' : 'text-muted-foreground'}`}>
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

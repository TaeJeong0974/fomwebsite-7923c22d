import { PodcastChapter } from "@/lib/podcastData";

interface EpisodeChaptersProps {
  chapters: PodcastChapter[];
}

const EpisodeChapters = ({ chapters }: EpisodeChaptersProps) => {
  return (
    <div className="glass rounded-2xl p-6">
      <h3 className="font-display text-lg font-semibold text-foreground mb-4">
        Chapters
      </h3>
      <div className="space-y-1">
        {chapters.map((chapter, index) => (
          <button
            key={index}
            className="w-full text-left flex items-center gap-4 p-3 rounded-xl hover:bg-muted/50 hover-transition group"
          >
            <span className="text-sm text-muted-foreground font-mono w-12 shrink-0 group-hover:text-primary hover-transition">
              {chapter.time}
            </span>
            <span className="text-sm text-foreground group-hover:text-primary hover-transition">
              {chapter.title}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default EpisodeChapters;

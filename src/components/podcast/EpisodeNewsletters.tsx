import { ExternalLink } from "lucide-react";
import { NewsletterMention } from "@/lib/podcastData";

interface EpisodeNewslettersProps {
  newsletters: NewsletterMention[];
}

const EpisodeNewsletters = ({ newsletters }: EpisodeNewslettersProps) => {
  if (!newsletters || newsletters.length === 0) return null;

  return (
    <div>
      <h3 className="text-section-header font-medium text-foreground mb-5 sm:mb-6">
        Newsletters Mentioned
      </h3>
      <ul className="space-y-3">
        {newsletters.map((newsletter) => (
          <li key={newsletter.name}>
            {newsletter.url ? (
              <a
                href={newsletter.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-2 text-foreground hover:text-primary transition-colors duration-300"
              >
                <span className="font-medium">{newsletter.name}</span>
                <ExternalLink className="w-4 h-4 opacity-50 group-hover:opacity-100 transition-opacity" />
                {newsletter.description && (
                  <span className="text-foreground/60">— {newsletter.description}</span>
                )}
              </a>
            ) : (
              <span className="text-foreground">
                <span className="font-medium">{newsletter.name}</span>
                {newsletter.description && (
                  <span className="text-foreground/60"> — {newsletter.description}</span>
                )}
              </span>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default EpisodeNewsletters;

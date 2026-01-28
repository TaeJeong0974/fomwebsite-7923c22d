interface EpisodeGuestCardProps {
  name: string;
  title: string;
  company: string;
  linkedInUrl?: string;
  bio?: string;
  isUpcoming?: boolean;
}

const EpisodeGuestCard = ({ name, title, company, linkedInUrl, bio, isUpcoming = false }: EpisodeGuestCardProps) => {
  return (
    <div className="glass rounded-xl p-6 space-y-6">
      {/* Header */}
      <p className="text-label">
        {isUpcoming ? "Upcoming Guest" : "Featured Guest"}
      </p>
      
      {/* Guest Info */}
      <div className="space-y-4">
        <h2 className="font-display text-4xl sm:text-5xl font-semibold text-foreground leading-[0.95]">
          {name.split(' ').map((word, i) => (
            <span key={i} className="block">{word}</span>
          ))}
        </h2>
        <p className="text-sm text-muted-foreground">
          {title}, <span className="font-medium text-primary">{company}</span>
        </p>
        {linkedInUrl && (
          <a
            href={linkedInUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-muted-foreground hover:text-primary hover-transition inline-block"
          >
            LinkedIn →
          </a>
        )}
      </div>
      
      {/* Bio */}
      {bio && (
        <p className="text-sm text-muted-foreground leading-relaxed pt-6 border-t border-border/50">
          {bio}
        </p>
      )}
    </div>
  );
};

export default EpisodeGuestCard;

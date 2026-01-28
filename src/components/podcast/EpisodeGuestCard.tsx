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
    <div className="glass rounded-2xl p-6 space-y-6">
      {/* Header */}
      <h3 className="font-display text-sm font-medium text-muted-foreground uppercase tracking-wider">
        {isUpcoming ? "Upcoming Guest" : "Featured Guest"}
      </h3>
      
      {/* Guest Info */}
      <div className="space-y-4">
        <h2 className="font-display text-4xl sm:text-5xl font-semibold text-foreground leading-[0.95]">
          {name.split(' ').map((word, i) => (
            <span key={i} className="block">{word}</span>
          ))}
        </h2>
        <div className="space-y-1">
          <p className="text-sm text-muted-foreground">{title}</p>
          <p className="text-sm font-medium text-primary">{company}</p>
        </div>
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

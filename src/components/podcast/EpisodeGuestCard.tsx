interface EpisodeGuestCardProps {
  name: string;
  title: string;
  company: string;
  linkedInUrl?: string;
  bio?: string;
  isUpcoming?: boolean;
  isHost?: boolean;
}

const EpisodeGuestCard = ({ name, title, company, linkedInUrl, bio, isUpcoming = false, isHost = false }: EpisodeGuestCardProps) => {
  const getLabel = () => {
    if (isHost) return "Your Host";
    if (isUpcoming) return "Upcoming Guest";
    return "Featured Guest";
  };

  return (
    <div className="glass rounded-xl p-5 sm:p-6 space-y-4 sm:space-y-6">
      {/* Header */}
      <p className="text-label">
        {getLabel()}
      </p>
      
      {/* Guest Info */}
      <div className="space-y-4">
        <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-semibold text-foreground leading-[0.95]">
          {name.split(' ').map((word, i) => (
            <span key={i} className="block">{word}</span>
          ))}
        </h2>
        <p className="text-sm text-foreground">
          {title}, <span className="font-medium text-foreground">{company}</span>
        </p>
        {linkedInUrl && (
          <a
            href={linkedInUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-foreground hover:text-foreground/70 hover-transition inline-block"
          >
            LinkedIn →
          </a>
        )}
      </div>
      
      {/* Bio */}
      {bio && (
        <p className="text-sm text-foreground leading-relaxed pt-6 border-t border-border/50">
          {bio}
        </p>
      )}
    </div>
  );
};

export default EpisodeGuestCard;

interface EpisodeGuestCardProps {
  name: string;
  title: string;
  company: string;
  companyDomain: string;
  linkedInUrl?: string;
  bio?: string;
  isUpcoming?: boolean;
}

const EpisodeGuestCard = ({ name, title, company, companyDomain, linkedInUrl, bio, isUpcoming = false }: EpisodeGuestCardProps) => {
  return (
    <div className="glass rounded-2xl p-6 relative">
      {/* Company Favicon Badge - Top Right */}
      <div className="absolute top-4 right-4 w-12 h-12 rounded-xl bg-muted flex items-center justify-center">
        <img 
          src={`https://www.google.com/s2/favicons?domain=${companyDomain}&sz=64`} 
          alt={company}
          className="h-6 w-6 object-contain"
        />
      </div>
      
      <h3 className="font-display text-lg font-semibold text-foreground mb-4">
        {isUpcoming ? "Upcoming Guest" : "Featured Guest"}
      </h3>
      
      <div className="space-y-3">
        <h2 className="font-display text-3xl sm:text-4xl font-semibold text-foreground leading-tight">
          {name.split(' ').map((word, i) => (
            <span key={i} className="block">{word}</span>
          ))}
        </h2>
        <div>
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
            LinkedIn
          </a>
        )}
      </div>
      
      {bio && (
        <p className="text-sm text-muted-foreground leading-relaxed mt-4 pt-4 border-t border-border">
          {bio}
        </p>
      )}
    </div>
  );
};

export default EpisodeGuestCard;

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
    <div className="glass rounded-2xl p-6">
      <h3 className="font-display text-lg font-semibold text-foreground mb-4">
        {isUpcoming ? "Upcoming Guest" : "Featured Guest"}
      </h3>
      <div className="flex items-start gap-4">
        {/* Company Logo as Avatar */}
        <div className="w-14 h-14 rounded-2xl bg-muted flex items-center justify-center shrink-0">
          <img 
            src={`https://www.google.com/s2/favicons?domain=${companyDomain}&sz=64`} 
            alt={company}
            className="h-7 w-7 object-contain"
          />
        </div>
        
        <div className="min-w-0">
          <h4 className="font-display text-xl font-semibold text-foreground">{name}</h4>
          <p className="text-sm text-muted-foreground mt-0.5">{title}</p>
          <p className="text-sm font-medium text-primary">{company}</p>
          {linkedInUrl && (
            <a
              href={linkedInUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-muted-foreground hover:text-primary hover-transition mt-2 inline-block"
            >
              LinkedIn
            </a>
          )}
        </div>
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

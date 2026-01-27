import { Linkedin } from "lucide-react";

interface EpisodeGuestCardProps {
  name: string;
  title: string;
  company: string;
  companyDomain: string;
  linkedInUrl?: string;
}

const EpisodeGuestCard = ({ name, title, company, companyDomain, linkedInUrl }: EpisodeGuestCardProps) => {
  return (
    <div className="glass rounded-2xl p-6">
      <h3 className="font-display text-lg font-semibold text-foreground mb-4">
        Featured Guest
      </h3>
      <div className="flex items-start gap-4">
        {/* Company Logo as Avatar */}
        <div className="w-14 h-14 rounded-2xl glass-dark flex items-center justify-center shrink-0">
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
              className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-primary hover-transition mt-2"
            >
              <Linkedin className="w-4 h-4" />
              LinkedIn
            </a>
          )}
        </div>
      </div>
    </div>
  );
};

export default EpisodeGuestCard;

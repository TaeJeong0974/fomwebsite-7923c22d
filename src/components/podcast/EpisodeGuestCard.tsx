import { Linkedin, Building2 } from "lucide-react";
import SidebarCard from "./SidebarCard";

interface EpisodeGuestCardProps {
  name: string;
  title: string;
  company: string;
  companyDomain?: string;
  linkedInUrl?: string;
}

const EpisodeGuestCard = ({ name, title, company, companyDomain, linkedInUrl }: EpisodeGuestCardProps) => {
  const [firstName, ...lastNameParts] = name.split(' ');
  const lastName = lastNameParts.join(' ');
  const companyUrl = companyDomain ? `https://${companyDomain}` : undefined;

  return (
    <SidebarCard title="Guest">
      <div>
        <h3 className="font-display text-xl lg:text-3xl text-foreground leading-none tracking-normal">
          <span className="inline lg:block font-medium">{firstName} </span>
          <span className="inline lg:block font-normal">{lastName}</span>
        </h3>
        <p className="text-xs lg:text-sm text-muted-foreground mt-1 lg:mt-2">
          {title}, {company}
        </p>
        {(linkedInUrl || companyUrl) && (
          <div className="flex items-center gap-2 mt-3">
            {linkedInUrl && (
              <a
                href={linkedInUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-full border border-border/60 flex items-center justify-center text-muted-foreground hover:text-foreground hover:border-foreground/40 transition-colors"
                aria-label={`${name} on LinkedIn`}
              >
                <Linkedin size={14} />
              </a>
            )}
            {companyUrl && (
              <a
                href={companyUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-full border border-border/60 flex items-center justify-center text-muted-foreground hover:text-foreground hover:border-foreground/40 transition-colors"
                aria-label={`${company} website`}
              >
                <Building2 size={14} />
              </a>
            )}
          </div>
        )}
      </div>
    </SidebarCard>
  );
};

export default EpisodeGuestCard;

import SidebarCard from "./SidebarCard";

interface EpisodeGuestCardProps {
  name: string;
  title: string;
  company: string;
  linkedInUrl?: string;
  bio?: string;
}

const EpisodeGuestCard = ({ name, title, company, linkedInUrl }: EpisodeGuestCardProps) => {
  const [firstName, ...lastNameParts] = name.split(' ');
  const lastName = lastNameParts.join(' ');

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
        {linkedInUrl && (
          <a
            href={linkedInUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs lg:text-sm text-muted-foreground hover:text-foreground hover-transition inline-block mt-2"
          >
            LinkedIn →
          </a>
        )}
      </div>
    </SidebarCard>
  );
};

export default EpisodeGuestCard;

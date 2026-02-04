import { podcastHosts } from "@/lib/podcastData";
import SidebarCard from "./SidebarCard";

interface EpisodeHostsCardProps {
  showAllHosts?: boolean;
}

const EpisodeHostsCard = ({ showAllHosts = false }: EpisodeHostsCardProps) => {
  const hosts = showAllHosts ? podcastHosts : podcastHosts.slice(0, 2);

  return (
    <SidebarCard title="Hosts">
      <div className="space-y-3 md:space-y-4">
        {hosts.map((host, index) => {
          const [firstName, ...lastNameParts] = host.name.split(' ');
          const lastName = lastNameParts.join(' ');
          
          return (
            <div key={index} className={index > 0 ? "pt-3 md:pt-4 border-t-[1.5px] border-border/40" : ""}>
              <h3 className="font-display text-xl md:text-2xl lg:text-3xl text-foreground leading-none tracking-normal">
                <span className="inline md:block font-medium">{firstName} </span>
                <span className="inline md:block font-normal">{lastName}</span>
              </h3>
              <p className="text-xs md:text-sm text-muted-foreground mt-1 md:mt-2">
                {host.title}, {host.company}
              </p>
              {host.linkedInUrl && (
                <a
                  href={host.linkedInUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs md:text-sm text-muted-foreground hover:text-foreground hover-transition inline-block mt-2"
                >
                  LinkedIn →
                </a>
              )}
            </div>
          );
        })}
      </div>
    </SidebarCard>
  );
};

export default EpisodeHostsCard;

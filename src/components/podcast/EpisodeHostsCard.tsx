import { podcastHosts } from "@/lib/podcastData";
import SidebarCard from "./SidebarCard";

interface EpisodeHostsCardProps {
  showAllHosts?: boolean;
}

const EpisodeHostsCard = ({ showAllHosts = false }: EpisodeHostsCardProps) => {
  const hosts = showAllHosts ? podcastHosts : podcastHosts.slice(0, 2);

  return (
    <SidebarCard title="Hosts">
      <div className="space-y-3 lg:space-y-4">
        {hosts.map((host, index) => {
          const [firstName, ...lastNameParts] = host.name.split(' ');
          const lastName = lastNameParts.join(' ');
          
          return (
            <div key={index} className={index > 0 ? "pt-3 lg:pt-4 border-t-[1.5px] border-border/40" : ""}>
              <h3 className="font-display text-xl lg:text-3xl text-foreground leading-none tracking-normal">
                <span className="inline lg:block font-medium">{firstName} </span>
                <span className="inline lg:block font-normal">{lastName}</span>
              </h3>
              <p className="text-xs lg:text-sm text-muted-foreground mt-1 lg:mt-2">
                {host.title}, {host.company}
              </p>
              {host.linkedInUrl && (
                <a
                  href={host.linkedInUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs lg:text-sm text-muted-foreground hover:text-foreground hover-transition inline-block mt-2"
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

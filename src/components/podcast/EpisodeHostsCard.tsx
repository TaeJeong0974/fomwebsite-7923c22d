import { Linkedin, Building2 } from "lucide-react";
import { podcastHosts, PodcastHost } from "@/lib/podcastData";
import SidebarCard from "./SidebarCard";

interface EpisodeHostsCardProps {
  showAllHosts?: boolean;
  episodeHosts?: PodcastHost[];
}

const EpisodeHostsCard = ({ showAllHosts = false, episodeHosts }: EpisodeHostsCardProps) => {
  const hosts = episodeHosts || (showAllHosts ? podcastHosts : podcastHosts.slice(0, 2));

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
              {(host.linkedInUrl || host.companyUrl) && (
                <div className="flex items-center gap-2 mt-3">
                  {host.linkedInUrl && (
                    <a
                      href={host.linkedInUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-8 h-8 rounded-full border border-border/60 flex items-center justify-center text-muted-foreground hover:text-foreground hover:border-foreground/40 transition-colors"
                      aria-label={`${host.name} on LinkedIn`}
                    >
                      <Linkedin size={14} />
                    </a>
                  )}
                  {host.companyUrl && (
                    <a
                      href={host.companyUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-8 h-8 rounded-full border border-border/60 flex items-center justify-center text-muted-foreground hover:text-foreground hover:border-foreground/40 transition-colors"
                      aria-label={`${host.company} website`}
                    >
                      <Building2 size={14} />
                    </a>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </SidebarCard>
  );
};

export default EpisodeHostsCard;

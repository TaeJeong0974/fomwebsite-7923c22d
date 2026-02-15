import { podcastHosts, PodcastHost } from "@/lib/podcastData";

interface AboutTheHostsProps {
  hosts?: PodcastHost[];
}

const AboutTheHosts = ({ hosts }: AboutTheHostsProps) => {
  const displayHosts = hosts || podcastHosts;
  return (
    <div>
      <h3 className="text-section-header font-medium text-foreground mb-5 sm:mb-6">
        About the Hosts
      </h3>
      <div className="space-y-8">
        {displayHosts.map((host, index) => (
          <div key={index} className="space-y-2">
            <p className="text-foreground/80 leading-relaxed text-base lg:text-lg max-w-prose">
              <span className="font-medium text-foreground">{host.name}</span>{" "}
              {host.bio && host.companyUrl ? (
                <>
                  {host.bio.split(host.company)[0]}
                  <a href={host.companyUrl} target="_blank" rel="noopener noreferrer" className="text-foreground underline underline-offset-2 decoration-foreground/30 hover:decoration-foreground transition-colors">{host.company}</a>
                  {host.bio.split(host.company).slice(1).join(host.company)}
                </>
              ) : host.bio}
            </p>
            {host.linkedInUrl && (
              <a
                href={host.linkedInUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-muted-foreground hover:text-foreground hover-transition inline-block"
              >
                LinkedIn →
              </a>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default AboutTheHosts;

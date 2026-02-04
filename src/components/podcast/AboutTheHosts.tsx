import { podcastHosts } from "@/lib/podcastData";

const AboutTheHosts = () => {
  return (
    <div>
      <h3 className="text-section-header font-medium text-foreground mb-5 sm:mb-6">
        About the Hosts
      </h3>
      <div className="space-y-8">
        {podcastHosts.map((host, index) => (
          <div key={index} className="space-y-2">
            <div className="flex items-baseline gap-2 flex-wrap">
              <h4 className="font-display text-base lg:text-lg font-medium text-foreground">
                {host.name}
              </h4>
              <span className="text-base lg:text-lg text-muted-foreground">
                {host.title}, {host.company}
              </span>
            </div>
            <p className="text-foreground/80 leading-relaxed text-base lg:text-lg max-w-prose">
              {host.bio}
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

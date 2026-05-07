"use client";

/**
 * Shared guest bio rendering with company link.
 * Eliminates duplication between PodcastDetail and ComingSoonEpisode.
 */

interface GuestBioProps {
  name: string;
  bio: string;
  company: string;
  companyDomain?: string;
  linkedInUrl?: string;
}

const GuestBio = ({ name, bio, company, companyDomain, linkedInUrl }: GuestBioProps) => {
  return (
    <div>
      <h3 className="text-section-header font-medium text-foreground mb-5 sm:mb-6">About the Guest</h3>
      <p className="text-foreground/80 leading-relaxed text-sm lg:text-base max-w-prose">
        <span className="font-medium text-foreground">{name}</span>{" "}
        {companyDomain ? (
          <>
            {bio.split(company)[0]}
            <a
              href={`https://${companyDomain}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-foreground underline underline-offset-2 decoration-foreground/30 hover:decoration-foreground transition-colors"
            >
              {company}
            </a>
            {bio.split(company).slice(1).join(company)}
          </>
        ) : (
          bio
        )}
      </p>
      {linkedInUrl && (
        <a
          href={linkedInUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="group text-sm text-muted-foreground hover:text-foreground hover-transition inline-block mt-3"
        >
          LinkedIn{" "}
          <span className="inline-block transition-transform duration-200 group-hover:translate-x-1">→</span>
        </a>
      )}
    </div>
  );
};

export default GuestBio;
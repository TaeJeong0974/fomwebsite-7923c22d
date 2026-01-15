import { Linkedin } from "lucide-react";

const team = [
  {
    name: "Sarah Chen",
    title: "Host & Creator",
    company: "TechVoice Media",
    linkedin: "https://linkedin.com/in/sarahchen",
  },
  {
    name: "Marcus Williams",
    title: "Co-Host & Producer",
    company: "Podcast Studios Inc.",
    linkedin: "https://linkedin.com/in/marcuswilliams",
  },
  {
    name: "Elena Rodriguez",
    title: "Executive Producer",
    company: "MediaWorks Global",
    linkedin: "https://linkedin.com/in/elenarodriguez",
  },
];

const AboutSection = () => {
  return (
    <section id="about" className="container mx-auto px-4 sm:px-6 lg:px-8 py-24 lg:py-32">
      <div className="mb-8">
        <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl font-semibold text-foreground tracking-tight">
          About
        </h2>
      </div>

      <p className="text-2xl sm:text-3xl lg:text-4xl font-display text-foreground leading-snug max-w-4xl mb-12">
        We're a team of storytellers, creators, and curious minds dedicated to bringing you conversations that matter.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {team.map((member) => (
          <div key={member.name} className="space-y-3">
            <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center text-2xl font-display font-bold text-muted-foreground">
              {member.name.charAt(0)}
            </div>
            <div>
              <h3 className="font-display text-xl font-bold text-foreground">
                {member.name}
              </h3>
              <p className="text-sm text-primary font-medium">{member.title}</p>
              <p className="text-sm text-muted-foreground">{member.company}</p>
            </div>
            <a
              href={member.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-primary transition-colors"
            >
              <Linkedin size={16} />
              <span>LinkedIn</span>
            </a>
          </div>
        ))}
      </div>
    </section>
  );
};

export default AboutSection;

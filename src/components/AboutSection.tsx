const team = [
  {
    name: "Sarah Chen",
    role: "Host & Creator",
    bio: "Award-winning journalist with 15 years of experience in tech reporting. Sarah founded the podcast to explore the human stories behind innovation.",
  },
  {
    name: "Marcus Williams",
    role: "Co-Host & Producer",
    bio: "Former radio producer turned podcaster. Marcus brings his signature storytelling style and keen ear for compelling narratives to every episode.",
  },
  {
    name: "Elena Rodriguez",
    role: "Executive Producer",
    bio: "Media veteran who has shaped the voices of countless creators. Elena ensures every episode meets the highest standards of quality and authenticity.",
  },
];

const AboutSection = () => {
  return (
    <section id="about" className="container mx-auto px-4 sm:px-6 lg:px-8">
      <div className="mb-8">
        <h2 className="font-display text-3xl sm:text-4xl font-bold text-foreground">
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
              <p className="text-sm text-primary font-medium">{member.role}</p>
            </div>
            <p className="text-muted-foreground text-sm leading-relaxed">
              {member.bio}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default AboutSection;

import { Linkedin } from "lucide-react";
import { motion } from "framer-motion";

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
    <section id="about" className="py-24 lg:py-32">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-10 lg:mb-14">
          <p className="text-sm text-muted-foreground uppercase tracking-[0.2em] mb-3 font-medium">
            The Team
          </p>
          <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl font-semibold text-foreground tracking-tight">
            About
          </h2>
        </div>

        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-xl sm:text-2xl lg:text-3xl font-display text-foreground leading-snug max-w-4xl mb-14 lg:mb-20"
        >
          We're a team of storytellers, creators, and curious minds dedicated to bringing you conversations that matter.
        </motion.p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-12">
          {team.map((member, index) => (
            <motion.div 
              key={member.name} 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group"
            >
              <div className="w-14 h-14 bg-muted flex items-center justify-center text-xl font-display font-bold text-muted-foreground mb-4 group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                {member.name.charAt(0)}
              </div>
              <h3 className="font-display text-xl font-semibold text-foreground mb-1">
                {member.name}
              </h3>
              <p className="text-sm text-primary font-medium mb-0.5">{member.title}</p>
              <p className="text-sm text-muted-foreground mb-3">{member.company}</p>
              <a
                href={member.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                <Linkedin size={14} />
                <span>LinkedIn</span>
              </a>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AboutSection;

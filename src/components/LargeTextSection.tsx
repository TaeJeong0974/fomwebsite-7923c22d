import { motion } from "framer-motion";
import { Linkedin } from "lucide-react";
import hostSarah from "@/assets/host-sarah.jpg";
import hostMarcus from "@/assets/host-marcus.jpg";
import hostElena from "@/assets/host-elena.jpg";

const hosts = [
  {
    name: "Sarah Chen",
    title: "Host & Creator",
    bio: "15+ years in B2B marketing. Previously led growth at Stripe and Notion.",
    image: hostSarah,
    linkedin: "https://linkedin.com/in/sarahchen",
  },
  {
    name: "Marcus Williams",
    title: "Co-Host & Producer",
    bio: "Podcast veteran with 500+ episodes produced. Former NPR contributor.",
    image: hostMarcus,
    linkedin: "https://linkedin.com/in/marcuswilliams",
  },
  {
    name: "Elena Rodriguez",
    title: "Executive Producer",
    bio: "Award-winning producer. Built content studios at HubSpot and Salesforce.",
    image: hostElena,
    linkedin: "https://linkedin.com/in/elenarodriguez",
  },
];

const LargeTextSection = () => {
  return (
    <section className="py-24 lg:py-32 bg-muted">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
          className="font-display text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-foreground leading-snug max-w-5xl font-medium mb-20 lg:mb-28"
        >
          Future of Marketing is a podcast and event series bringing together CMOs and growth leaders navigating AI in modern B2B marketing.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <p className="text-sm text-muted-foreground uppercase tracking-[0.2em] mb-10 font-medium">
            Your Hosts
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
            {hosts.map((host, index) => (
              <motion.div
                key={host.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
                className="group"
              >
                <div className="relative overflow-hidden mb-5 aspect-[4/5]">
                  <img 
                    src={host.image} 
                    alt={host.name}
                    className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-foreground/10 group-hover:bg-transparent transition-colors duration-500" />
                </div>
                
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h3 className="font-display text-xl font-semibold text-foreground mb-1">
                      {host.name}
                    </h3>
                    <p className="text-sm text-primary font-medium mb-2">{host.title}</p>
                    <p className="text-sm text-muted-foreground leading-relaxed">{host.bio}</p>
                  </div>
                  <a
                    href={host.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-shrink-0 w-9 h-9 bg-background border border-border flex items-center justify-center text-muted-foreground hover:text-foreground hover:border-foreground transition-colors"
                  >
                    <Linkedin size={16} />
                  </a>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default LargeTextSection;

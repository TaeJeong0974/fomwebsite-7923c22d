import { motion } from "framer-motion";
import { Linkedin } from "lucide-react";

const hosts = [
  {
    name: "Sarah Chen",
    title: "Host & Creator",
    linkedin: "https://linkedin.com/in/sarahchen",
  },
  {
    name: "Marcus Williams",
    title: "Co-Host & Producer",
    linkedin: "https://linkedin.com/in/marcuswilliams",
  },
  {
    name: "Elena Rodriguez",
    title: "Executive Producer",
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
          className="font-display text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-foreground leading-snug max-w-5xl font-medium mb-16 lg:mb-20"
        >
          Future of Marketing is a podcast and event series bringing together CMOs and growth leaders navigating AI in modern B2B marketing.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <p className="text-sm text-muted-foreground uppercase tracking-[0.2em] mb-6 font-medium">
            Your Hosts
          </p>
          <div className="flex flex-wrap gap-8 lg:gap-12">
            {hosts.map((host, index) => (
              <motion.div
                key={host.name}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: 0.3 + index * 0.1 }}
                className="group"
              >
                <h3 className="font-display text-lg font-semibold text-foreground">
                  {host.name}
                </h3>
                <p className="text-sm text-muted-foreground mb-2">{host.title}</p>
                <a
                  href={host.linkedin}
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
        </motion.div>
      </div>
    </section>
  );
};

export default LargeTextSection;

import { motion } from "framer-motion";
import { Linkedin } from "lucide-react";
import hostPattern from "@/assets/host-pattern.png";

const hosts = [
  {
    name: "Camille Ricketts",
    title: "Partner, XYZ Venture Capital",
    bio: "Leads investments in product-led growth and go-to-market software startups. Previously the first marketing leader at Notion, founded First Round Review, managed communications at Tesla, and reported for the Wall Street Journal.",
    linkedin: "https://linkedin.com/in/camillericketts",
  },
  {
    name: "Ethan Smith",
    title: "Founder & CEO, Graphite",
    bio: "Runs a premium Vertical AI Growth Agency helping companies like Webflow, Notion, MasterClass, and Captions drive sustainable revenue growth via SEO, content, and AEO. Also an adjunct professor at IE Business School.",
    linkedin: "https://linkedin.com/in/ethansmith",
  },
  {
    name: "Mada Seghete",
    title: "CEO & Co-Founder, Upside",
    bio: "Built a next-gen revenue intelligence platform for B2B leaders. Previously co-founded and was CMO of Branch, scaling to $100M+ revenue. Cornell Engineering graduate with Masters and MBA from Stanford. Partner at XFactor Ventures investing in women founders.",
    linkedin: "https://linkedin.com/in/madaseghete",
  },
];

const IntroSection = () => {
  return (
    <section className="py-20 lg:py-28 bg-muted">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 lg:gap-8 mb-16 lg:mb-24">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0 }}
            className="flex flex-col"
          >
            <div className="w-12 h-12 lg:w-16 lg:h-16 bg-primary mb-4" />
            <p className="font-display text-xl sm:text-2xl lg:text-3xl font-medium text-foreground leading-tight">
              Future of Marketing
            </p>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="flex flex-col"
          >
            <p className="text-[10px] text-muted-foreground uppercase tracking-[0.3em] mb-3 font-medium">
              Format
            </p>
            <p className="font-display text-lg lg:text-xl font-medium text-foreground leading-snug">
              A podcast and event series
            </p>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="flex flex-col"
          >
            <p className="text-[10px] text-muted-foreground uppercase tracking-[0.3em] mb-3 font-medium">
              Audience
            </p>
            <p className="font-display text-lg lg:text-xl font-medium text-foreground leading-snug">
              CMOs and growth leaders
            </p>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="flex flex-col"
          >
            <p className="text-[10px] text-muted-foreground uppercase tracking-[0.3em] mb-3 font-medium">
              Focus
            </p>
            <p className="font-display text-lg lg:text-xl font-medium text-foreground leading-snug">
              Navigating AI in modern B2B marketing
            </p>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <p className="text-xs text-muted-foreground uppercase tracking-[0.2em] mb-8 font-medium">
            Your Hosts
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {hosts.map((host, index) => (
              <motion.div
                key={host.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
              >
                <div className="relative overflow-hidden aspect-[4/5]">
                  <img 
                    src={hostPattern} 
                    alt=""
                    className="w-full h-full object-cover"
                  />
                </div>
                
                <div className="flex items-start justify-between gap-3 pt-4">
                  <div className="min-w-0">
                    <h3 className="font-display text-lg font-semibold text-foreground">
                      {host.name}
                    </h3>
                    <p className="text-sm text-primary font-medium mt-0.5">{host.title}</p>
                    <p className="text-sm text-muted-foreground leading-relaxed mt-2">{host.bio}</p>
                  </div>
                  <a
                    href={host.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-shrink-0 w-8 h-8 bg-background border border-border flex items-center justify-center text-muted-foreground hover:text-foreground hover:border-foreground transition-colors"
                    aria-label={`${host.name} LinkedIn`}
                  >
                    <Linkedin size={14} />
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

export default IntroSection;

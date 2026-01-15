import { motion } from "framer-motion";
import { Linkedin } from "lucide-react";
import hostSarah from "@/assets/host-sarah.jpg";
import hostMarcus from "@/assets/host-marcus.jpg";
import hostElena from "@/assets/host-elena.jpg";

const hosts = [
  {
    name: "Camille Ricketts",
    title: "Partner, XYZ Venture Capital",
    bio: "Leads investments in product-led growth and go-to-market software startups. Previously the first marketing leader at Notion, founded First Round Review, managed communications at Tesla, and reported for the Wall Street Journal.",
    image: hostSarah,
    linkedin: "https://linkedin.com/in/camillericketts",
  },
  {
    name: "Ethan Smith",
    title: "Founder & CEO, Graphite",
    bio: "Runs a premium Vertical AI Growth Agency helping companies like Webflow, Notion, MasterClass, and Captions drive sustainable revenue growth via SEO, content, and AEO. Also an adjunct professor at IE Business School.",
    image: hostMarcus,
    linkedin: "https://linkedin.com/in/ethansmith",
  },
  {
    name: "Camille Ricketts",
    title: "Partner, XYZ Venture Capital",
    bio: "Leads investments in product-led growth and go-to-market software startups. Previously the first marketing leader at Notion, founded First Round Review, managed communications at Tesla, and reported for the Wall Street Journal.",
    image: hostElena,
    linkedin: "https://linkedin.com/in/camillericketts",
  },
];

const IntroSection = () => {
  return (
    <section className="py-20 lg:py-28 bg-muted">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
          className="font-display text-2xl sm:text-3xl md:text-4xl lg:text-[2.75rem] text-foreground leading-[2] max-w-4xl font-medium mb-16 lg:mb-24"
        >
          Future of Marketing is a podcast and event series bringing together CMOs and growth leaders navigating AI in modern B2B marketing.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <p className="text-xs text-muted-foreground uppercase tracking-[0.2em] mb-8 font-medium">
            Your Hosts
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 lg:gap-6">
            {hosts.map((host, index) => (
              <motion.div
                key={host.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
              >
                <div className="relative overflow-hidden mb-4 aspect-[4/5]">
                  <img 
                    src={host.image} 
                    alt={host.name}
                    className="w-full h-full object-cover grayscale"
                  />
                </div>
                
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <h3 className="font-display text-lg font-semibold text-foreground mb-0.5">
                      {host.name}
                    </h3>
                    <p className="text-sm text-primary font-medium mb-1.5">{host.title}</p>
                    <p className="text-sm text-muted-foreground leading-relaxed">{host.bio}</p>
                  </div>
                  <a
                    href={host.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-shrink-0 w-8 h-8 bg-background border border-border flex items-center justify-center text-muted-foreground hover:text-foreground hover:border-foreground transition-colors"
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

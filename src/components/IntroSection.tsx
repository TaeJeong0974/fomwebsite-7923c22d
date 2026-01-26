import { motion } from "framer-motion";
import { Linkedin } from "lucide-react";
import speaker2 from "@/assets/speaker-2.png";
import speaker3 from "@/assets/speaker-3.png";
import speaker4 from "@/assets/speaker-4.png";

const hosts = [
  {
    name: "Camille Ricketts",
    title: "Partner, XYZ Venture Capital",
    bio: "Leads investments in product-led growth and go-to-market software startups. Previously the first marketing leader at Notion, founded First Round Review, managed communications at Tesla, and reported for the Wall Street Journal.",
    linkedin: "https://linkedin.com/in/camillericketts",
    image: speaker4,
  },
  {
    name: "Ethan Smith",
    title: "Founder & CEO, Graphite",
    bio: "Runs a premium Vertical AI Growth Agency helping companies like Webflow, Notion, MasterClass, and Captions drive sustainable revenue growth via SEO, content, and AEO. Also an adjunct professor at IE Business School.",
    linkedin: "https://linkedin.com/in/ethansmith",
    image: speaker3,
  },
  {
    name: "Mada Seghete",
    title: "CEO & Co-Founder, Upside",
    bio: "Built a next-gen revenue intelligence platform for B2B leaders. Previously co-founded and was CMO of Branch, scaling to $100M+ revenue. Cornell Engineering graduate with Masters and MBA from Stanford. Partner at XFactor Ventures investing in women founders.",
    linkedin: "https://linkedin.com/in/madaseghete",
    image: speaker2,
  },
];

const IntroSection = () => {
  return (
    <section className="section-spacing">
      <div className="container mx-auto container-padding">
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
          className="font-display text-2xl sm:text-3xl md:text-4xl lg:text-[2.75rem] text-foreground max-w-4xl font-medium mb-16 lg:mb-24"
          style={{ lineHeight: 1.2 }}
        >
          Future of Marketing is a podcast and event series bringing together CMOs and growth leaders navigating AI in modern B2B marketing.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <p className="text-label mb-8">
            Your Hosts
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 grid-gap">
            {hosts.map((host, index) => {
              const firstName = host.name.split(' ')[0];
              const lastName = host.name.split(' ').slice(1).join(' ');
              
              return (
                <motion.article
                  key={host.name}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: 0.3 + index * 0.1 }}
                  className="card-base card-image cursor-pointer group"
                >
                  {/* Photo Layer - visible at rest */}
                  <div className="absolute inset-0">
                    <img 
                      src={host.image} 
                      alt={host.name}
                      className="w-full h-full object-cover"
                    />
                    <div className="card-overlay" />
                  </div>

                  {/* Rest State */}
                  <div className="card-content-full card-padding hover-hide-up">
                    {/* LinkedIn badge */}
                    <a
                      href={host.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="glass rounded-xl p-2.5 w-fit hover-scale-badge focus-ring"
                      aria-label={`${host.name} LinkedIn`}
                      onClick={(e) => e.stopPropagation()}
                    >
                      <Linkedin size={20} className="text-foreground" />
                    </a>
                    
                    {/* Name at bottom - two lines */}
                    <h3 className="font-display text-foreground leading-[0.95] tracking-tight">
                      <span className="block text-2xl sm:text-3xl lg:text-4xl font-semibold">
                        {firstName}
                      </span>
                      <span className="block text-2xl sm:text-3xl lg:text-4xl font-semibold">
                        {lastName}
                      </span>
                    </h3>
                  </div>

                  {/* Hover State */}
                  <div className="card-content-bottom card-padding hover-reveal-up">
                    <h3 className="font-display text-white leading-[0.95] tracking-tight">
                      <span className="block text-2xl sm:text-3xl lg:text-4xl font-semibold">
                        {firstName}
                      </span>
                      <span className="block text-2xl sm:text-3xl lg:text-4xl font-semibold">
                        {lastName}
                      </span>
                    </h3>
                    <p className="text-body-sm text-white/70 mt-1">
                      {host.title}
                    </p>
                    
                    {/* Bio */}
                    <div className="hover-expand">
                      <p className="text-body-sm leading-relaxed text-white/60">
                        {host.bio}
                      </p>
                      <a
                        href={host.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn-base btn-glass-light btn-sm mt-3"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <Linkedin size={14} className="mr-2" />
                        LinkedIn
                      </a>
                    </div>
                  </div>
                </motion.article>
              );
            })}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default IntroSection;

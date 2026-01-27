import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";
import speaker2 from "@/assets/speaker-2.png";
import speaker3 from "@/assets/speaker-3.png";
import speaker4 from "@/assets/speaker-4.png";

const hosts = [
  {
    name: "Camille Ricketts",
    title: "Partner, XYZ Venture Capital",
    bio: "Partner at XYZ Venture Capital, where she leads investments in product-led growth and go-to-market software startups. Prior, she was the first marketing leader at Notion, building out the brand, community, and more. She also founded First Round Review for First Round Capital, managed communications at Tesla, and reported for the Wall Street Journal.",
    image: speaker4,
  },
  {
    name: "Ethan Smith",
    title: "Founder & CEO, Graphite",
    bio: "Founder and CEO of Graphite, a premium Vertical AI Growth Agency that helps companies like Webflow, Notion, MasterClass, and Captions drive sustainable revenue growth via SEO, content, and AEO (Answer Engine Optimization). Ethan is also an adjunct professor at IE Business School.",
    image: speaker3,
  },
  {
    name: "Mada Seghete",
    title: "CEO & Co-Founder, Upside",
    bio: "CEO and co-founder of Upside, a next-gen revenue intelligence platform for B2B leaders. Previously co-founded and was CMO of Branch, helping scale to $100M+ revenue. Cornell Engineering graduate with Masters and MBA from Stanford. Partner at XFactor Ventures investing in women founders and organizes yearly retreats for 100+ women founders.",
    image: speaker2,
  },
];

const IntroSection = () => {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

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
              const isExpanded = expandedIndex === index;
              
              return (
                <motion.article
                  key={host.name}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: 0.3 + index * 0.1 }}
                  className="group"
                >
                  <div 
                    className="card-base card-image hover-scale cursor-pointer"
                    onClick={() => setExpandedIndex(isExpanded ? null : index)}
                  >
                    <div className="absolute inset-0">
                      <img 
                        src={host.image} 
                        alt={host.name}
                        className="w-full h-full object-cover"
                      />
                      <div className="card-overlay" />
                    </div>

                    <div className="card-content-bottom card-padding">
                      <div className="flex items-end justify-between">
                        <div>
                          <h3 className="font-display text-white leading-[0.95] tracking-tight">
                            <span className="block text-2xl sm:text-3xl lg:text-4xl font-semibold">{firstName}</span>
                            <span className="block text-2xl sm:text-3xl lg:text-4xl font-semibold">{lastName}</span>
                          </h3>
                          <p className="text-body-sm text-white/70 mt-1">{host.title}</p>
                        </div>
                        <motion.div
                          animate={{ rotate: isExpanded ? 180 : 0 }}
                          whileHover={{ scale: isExpanded ? 1 : [1, 1.15, 1] }}
                          transition={{ 
                            rotate: { duration: 0.3 },
                            scale: { duration: 0.6, ease: "easeInOut" }
                          }}
                          className="glass rounded-full p-2"
                        >
                          <ChevronDown className="h-5 w-5 text-white" />
                        </motion.div>
                      </div>
                      
                      <AnimatePresence>
                        {isExpanded && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.3 }}
                            className="overflow-hidden"
                          >
                            <p className="text-body-sm leading-relaxed text-white/60 mt-4">
                              {host.bio}
                            </p>
                          </motion.div>
                        )}
                      </AnimatePresence>
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

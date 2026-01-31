import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";
import hostMada from "@/assets/host-mada.png";
import hostEthan from "@/assets/host-ethan.png";
import hostCamille from "@/assets/host-camille.png";
import FOMIcon from "@/assets/FOM_Icon.svg";
import { liquidEase, staggerContainer, fadeUpVariant } from "@/components/animations/PageLoadAnimation";

const hosts = [
  {
    name: "Mada Seghete",
    title: "CEO & Co-Founder, Upside",
    bio: "CEO and co-founder of Upside, a next-gen revenue intelligence platform for B2B leaders. Previously co-founded and was CMO of Branch, helping scale to $100M+ revenue. Cornell Engineering graduate with Masters and MBA from Stanford. Partner at XFactor Ventures investing in women founders and organizes yearly retreats for 100+ women founders.",
    image: hostMada,
  },
  {
    name: "Ethan Smith",
    title: "Founder & CEO, Graphite",
    bio: "Founder and CEO of Graphite, a premium Vertical AI Growth Agency that helps companies like Webflow, Notion, MasterClass, and Captions drive sustainable revenue growth via SEO, content, and AEO (Answer Engine Optimization). Ethan is also an adjunct professor at IE Business School.",
    image: hostEthan,
  },
  {
    name: "Camille Ricketts",
    title: "Partner, XYZ Venture Capital",
    bio: "Partner at XYZ Venture Capital, where she leads investments in product-led growth and go-to-market software startups. Prior, she was the first marketing leader at Notion, building out the brand, community, and more. She also founded First Round Review for First Round Capital, managed communications at Tesla, and reported for the Wall Street Journal.",
    image: hostCamille,
  },
];

const HeroSection = () => {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

  return (
    <section className="section-spacing">
      <div className="container mx-auto container-padding">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={staggerContainer}
        >
          {/* Top section with tagline and logo - aligned to 3-column host grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 grid-gap items-end mb-16 lg:mb-24">
            {/* Left: Tagline - takes first column */}
            <motion.h1
              variants={fadeUpVariant}
              className="font-display text-xl sm:text-2xl md:text-3xl lg:text-[2rem] text-foreground font-medium uppercase tracking-tight leading-[1.1]"
            >
              A Podcast<br />
              Series on How<br />
              AI is Changing<br />
              Marketing
            </motion.h1>

            {/* Right: Large FOM Icon - spans columns 2-3 (aligned with Ethan & Camille) */}
            <motion.div
              variants={fadeUpVariant}
              className="md:col-span-2 flex justify-center md:justify-end"
            >
              <img 
                src={FOMIcon} 
                alt="Future of Marketing" 
                className="w-full max-w-full h-auto text-foreground"
              />
            </motion.div>
          </div>

          {/* Hosts section */}
          <motion.div variants={fadeUpVariant}>
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
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ 
                      duration: 0.6, 
                      delay: 0.6 + index * 0.15,
                      ease: liquidEase 
                    }}
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
                            <h3 className="font-display text-white leading-[0.95] tracking-normal">
                              <span className="block text-2xl sm:text-3xl lg:text-4xl font-medium">{firstName}</span>
                              <span className="block text-2xl sm:text-3xl lg:text-4xl font-normal">{lastName}</span>
                            </h3>
                            <p className="text-body-sm text-white mt-1">{host.title}</p>
                          </div>
                          <motion.div
                            animate={{ rotate: isExpanded ? 180 : 0 }}
                            whileHover={{ scale: isExpanded ? 1 : [1, 1.15, 1] }}
                            transition={{ 
                              rotate: { duration: 0.3 },
                              scale: { duration: 0.6, ease: "easeInOut" }
                            }}
                            className="rounded-full p-2 bg-white/10 backdrop-blur-xl border border-white/20"
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
                              <p className="text-sm leading-relaxed text-white/90 mt-4" style={{ textShadow: '0 1px 2px rgba(0,0,0,0.3)' }}>
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
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;

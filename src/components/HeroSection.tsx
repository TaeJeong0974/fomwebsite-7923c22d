import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";
import hostMada from "@/assets/host-mada.png";
import hostEthan from "@/assets/host-ethan.png";
import hostCamille from "@/assets/host-camille.png";
import FOMIcon from "@/assets/FOM_Icon.svg";
import { liquidEase } from "@/components/animations/PageLoadAnimation";

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

const taglineLines = ["A podcast", "series on how", "AI is changing", "marketing"];

const HeroSection = () => {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);
  const isMobile = useIsMobile();
  const scrollRef = useRef<HTMLDivElement>(null);

  return (
    <section id="hero" className="pt-8 lg:pt-12 pb-14 lg:pb-20">
      <div className="container mx-auto container-padding">
        {/* Top row: Tagline left, Title right */}
        <div className="flex justify-between items-start mb-20 lg:mb-32 pl-4 sm:pl-5 lg:pl-6 pr-4 sm:pr-5 lg:pr-6">
          {/* Typewriter tagline */}
          <h1 className="font-display text-base sm:text-lg md:text-xl lg:text-2xl text-foreground font-medium tracking-normal leading-[0.7]">
            {taglineLines.map((line, lineIndex) => (
              <span key={lineIndex} className="block overflow-hidden">
                <motion.span
                  className="inline-block"
                  initial={{ y: "100%" }}
                  animate={{ y: 0 }}
                  transition={{ 
                    duration: 0.6, 
                    ease: liquidEase, 
                    delay: 0.3 + lineIndex * 0.15 
                  }}
                >
                  {line.split("").map((char, charIndex) => (
                    <motion.span
                      key={charIndex}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ 
                        duration: 0.05, 
                        delay: 0.3 + lineIndex * 0.15 + charIndex * 0.03 
                      }}
                    >
                      {char}
                    </motion.span>
                  ))}
                </motion.span>
              </span>
            ))}
          </h1>
          
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 1.2, ease: liquidEase }}
            className="text-label hidden sm:block"
          >
            The Future of Marketing
          </motion.p>
        </div>

        {/* Large FOM Icon with "Your Host" label in first column */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: liquidEase, delay: 1.4 }}
          className="grid grid-cols-1 md:grid-cols-3 grid-gap items-end mb-12 lg:mb-16 pt-8 lg:pt-16"
        >
          {/* "Your Hosts" label in first column, aligned to bottom of logo */}
          <div className="hidden md:flex items-center gap-3 self-end">
            <motion.svg 
              width="16" 
              height="40" 
              viewBox="0 0 16 40" 
              fill="none" 
              className="text-foreground"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1, y: [0, 6, 0] }}
              transition={{ 
                opacity: { duration: 0.5, delay: 2 },
                y: { duration: 1.5, repeat: Infinity, ease: liquidEase, delay: 2.5 }
              }}
            >
              <path 
                d="M8 0 L8 32 M2 26 L8 34 L14 26" 
                stroke="currentColor" 
                strokeWidth="1.5" 
                strokeLinecap="round" 
                strokeLinejoin="round"
              />
            </motion.svg>
            <motion.p 
              className="text-label translate-y-2"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 2 }}
            >
              Your Hosts
            </motion.p>
          </div>
          {/* Logo spans columns 2-3 */}
          <div className="md:col-span-2 flex justify-center overflow-hidden relative">
            {/* Base black layer */}
            <motion.div
              className="w-full max-w-full h-auto"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1.2, ease: liquidEase, delay: 1.4 }}
              style={{
                background: 'rgba(0,0,0,1)',
                WebkitMaskImage: `url(${FOMIcon})`,
                maskImage: `url(${FOMIcon})`,
                WebkitMaskRepeat: 'no-repeat',
                maskRepeat: 'no-repeat',
                WebkitMaskSize: 'contain',
                maskSize: 'contain',
                WebkitMaskPosition: 'center',
                maskPosition: 'center',
                aspectRatio: '598 / 186',
              }}
            />
            {/* Animated color gradient layer - positioned bottom right */}
            <motion.div
              className="absolute inset-0 w-full h-full"
              initial={{ opacity: 0 }}
              animate={{ 
                opacity: 1,
                background: [
                  'radial-gradient(ellipse 60% 120% at 100% 100%, rgba(235, 150, 90, 1) 0%, rgba(235, 150, 90, 0.8) 15%, rgba(210, 130, 120, 0.5) 30%, transparent 45%)',
                  'radial-gradient(ellipse 60% 120% at 100% 100%, rgba(190, 130, 160, 1) 0%, rgba(190, 130, 160, 0.8) 15%, rgba(150, 130, 180, 0.5) 30%, transparent 45%)',
                  'radial-gradient(ellipse 60% 120% at 100% 100%, rgba(90, 130, 180, 1) 0%, rgba(90, 130, 180, 0.8) 15%, rgba(120, 140, 190, 0.5) 30%, transparent 45%)',
                  'radial-gradient(ellipse 60% 120% at 100% 100%, rgba(235, 150, 90, 1) 0%, rgba(235, 150, 90, 0.8) 15%, rgba(210, 130, 120, 0.5) 30%, transparent 45%)',
                ],
              }}
              transition={{ 
                opacity: { duration: 2, ease: liquidEase, delay: 2.6 },
                background: { duration: 8, ease: 'easeInOut', repeat: Infinity, repeatType: 'loop', delay: 2.6 },
              }}
              style={{
                WebkitMaskImage: `url(${FOMIcon})`,
                maskImage: `url(${FOMIcon})`,
                WebkitMaskRepeat: 'no-repeat',
                maskRepeat: 'no-repeat',
                WebkitMaskSize: 'contain',
                maskSize: 'contain',
                WebkitMaskPosition: 'center',
                maskPosition: 'center',
                aspectRatio: '598 / 186',
              }}
            />
          </div>
        </motion.div>

        {/* Mobile: Your Host label */}
        <motion.p 
          className="text-label mb-4 md:hidden"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 2 }}
        >
          Your Hosts
        </motion.p>

        {/* Hosts section */}
        <div id="hosts">
          {isMobile ? (
            /* Mobile: horizontal slider with 1.25 cards visible */
            <div 
              ref={scrollRef}
              className="flex gap-4 overflow-x-auto scrollbar-hide -mr-6 pr-6"
              style={{ scrollSnapType: 'x mandatory' }}
            >
              {hosts.map((host, index) => {
                const firstName = host.name.split(' ')[0];
                const lastName = host.name.split(' ').slice(1).join(' ');
                const isExpanded = expandedIndex === index;
                
                return (
                  <motion.article
                    key={host.name}
                    initial={{ opacity: 0, y: 60 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ 
                      duration: 0.8, 
                      delay: 2 + index * 0.2,
                      ease: liquidEase 
                    }}
                    className="group flex-shrink-0"
                    style={{ width: 'calc(80% - 8px)', scrollSnapAlign: 'start' }}
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
                          loading="eager"
                          fetchPriority="high"
                          decoding="async"
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
                          <div
                            className="rounded-full p-2 bg-white/10 backdrop-blur-xl border border-white/20 transition-transform duration-300 ease-out group-hover:-translate-y-1 hover:!-translate-y-1.5"
                            style={{ transform: isExpanded ? 'rotate(180deg)' : 'rotate(0deg)', transition: 'transform 0.3s ease' }}
                          >
                            <ChevronDown className="h-5 w-5 text-white" />
                          </div>
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
          ) : (
            /* Desktop: 3-column grid */
            <div className="grid grid-cols-1 md:grid-cols-3 grid-gap">
              {hosts.map((host, index) => {
                const firstName = host.name.split(' ')[0];
                const lastName = host.name.split(' ').slice(1).join(' ');
                const isExpanded = expandedIndex === index;
                
                return (
                  <motion.article
                    key={host.name}
                    initial={{ opacity: 0, y: 60 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ 
                      duration: 0.8, 
                      delay: 2 + index * 0.2,
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
                          loading="eager"
                          fetchPriority="high"
                          decoding="async"
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
                          <div
                            className="rounded-full p-2 bg-white/10 backdrop-blur-xl border border-white/20 transition-transform duration-300 ease-out group-hover:-translate-y-1 hover:!-translate-y-1.5"
                            style={{ transform: isExpanded ? 'rotate(180deg)' : 'rotate(0deg)', transition: 'transform 0.3s ease' }}
                          >
                            <ChevronDown className="h-5 w-5 text-white" />
                          </div>
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
          )}
        </div>
      </div>
    </section>
  );
};

export default HeroSection;

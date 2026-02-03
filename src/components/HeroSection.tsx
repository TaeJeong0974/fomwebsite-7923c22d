import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";
import hostMada from "@/assets/host-mada.png";
import hostEthan from "@/assets/host-ethan.png";
import hostCamille from "@/assets/host-camille.png";
import FOMIcon from "@/assets/FOM_Icon.svg";
import teaserBg from "@/assets/teaser-bg.png";
import { liquidEase } from "@/components/animations/PageLoadAnimation";

const hosts = [
  {
    name: "Mada Seghete",
    title: "CEO & Co-Founder, Upside",
    bio: "CEO and co-founder of Upside, a next-gen revenue intelligence platform for B2B leaders. Previously co-founded and was CMO of Branch, helping scale to $100M+ revenue. Cornell Engineering graduate with Masters and MBA from Stanford. Partner at XFactor Ventures investing in women founders and organizes yearly retreats for 100+ women founders.",
    image: hostMada,
    linkedInUrl: "https://www.linkedin.com/in/madalina/",
  },
  {
    name: "Ethan Smith",
    title: "Founder & CEO, Graphite",
    bio: "Founder and CEO of Graphite, a premium Vertical AI Growth Agency that helps companies like Webflow, Notion, MasterClass, and Captions drive sustainable revenue growth via SEO, content, and AEO (Answer Engine Optimization). Ethan is also an adjunct professor at IE Business School.",
    image: hostEthan,
    linkedInUrl: "https://www.linkedin.com/in/ethanls/",
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
  const [flippedIndex, setFlippedIndex] = useState<number | null>(null);
  const isMobile = useIsMobile();
  const scrollRef = useRef<HTMLDivElement>(null);

  return (
    <section id="hero" className="pt-8 lg:pt-12 pb-14 lg:pb-20">
      <div className="container mx-auto container-padding">
        {/* Top row: Tagline left, Title right */}
        <div className="flex justify-between items-start mb-20 lg:mb-32">
          {/* Typewriter tagline */}
          <h1 className="font-display text-sm sm:text-base md:text-lg lg:text-xl text-foreground font-medium tracking-normal">
            {taglineLines.map((line, lineIndex) => (
              <span key={lineIndex} className="block" style={{ lineHeight: 1.2 }}>
                <motion.span
                  className="inline-block"
                  initial={{ y: "100%", opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ 
                    duration: 0.6, 
                    ease: liquidEase, 
                    delay: 0.3 + lineIndex * 0.15 
                  }}
                >
                  {line}
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
          {/* Logo spans columns 2-3 with animated gradient masked by FOM shape */}
          <div className="md:col-span-2 flex justify-center overflow-hidden relative">
            {/* Container with gradient masked by FOM logo */}
            <div 
              className="w-full relative"
              style={{ aspectRatio: '598 / 186' }}
            >
              {/* Animated color gradient - masked by FOM logo shape */}
              <motion.div 
                className="absolute inset-0 hidden md:block"
                style={{
                  maskImage: `url(${FOMIcon})`,
                  maskSize: 'contain',
                  maskRepeat: 'no-repeat',
                  maskPosition: 'center',
                  WebkitMaskImage: `url(${FOMIcon})`,
                  WebkitMaskSize: 'contain',
                  WebkitMaskRepeat: 'no-repeat',
                  WebkitMaskPosition: 'center',
                }}
                animate={{
                  background: [
                    'linear-gradient(135deg, rgb(230,130,110) 0%, rgb(200,140,150) 50%, rgb(130,150,180) 100%)',
                    'linear-gradient(135deg, rgb(200,140,150) 0%, rgb(130,150,180) 50%, rgb(230,130,110) 100%)',
                    'linear-gradient(135deg, rgb(130,150,180) 0%, rgb(230,130,110) 50%, rgb(200,140,150) 100%)',
                    'linear-gradient(135deg, rgb(230,130,110) 0%, rgb(200,140,150) 50%, rgb(130,150,180) 100%)',
                  ]
                }}
                transition={{ duration: 3, ease: 'easeInOut', repeat: Infinity }}
              />
              {/* Black gradient overlay from top-left to bottom-right - masked by FOM logo */}
              <div 
                className="absolute inset-0 hidden md:block"
                style={{
                  background: 'linear-gradient(135deg, rgba(0,0,0,1) 0%, rgba(0,0,0,1) 60%, rgba(0,0,0,0.6) 80%, rgba(0,0,0,0) 100%)',
                  maskImage: `url(${FOMIcon})`,
                  maskSize: 'contain',
                  maskRepeat: 'no-repeat',
                  maskPosition: 'center',
                  WebkitMaskImage: `url(${FOMIcon})`,
                  WebkitMaskSize: 'contain',
                  WebkitMaskRepeat: 'no-repeat',
                  WebkitMaskPosition: 'center',
                }}
              />
              {/* Static gradient for mobile - masked by FOM logo */}
              <div 
                className="absolute inset-0 md:hidden"
                style={{ 
                  background: 'linear-gradient(135deg, rgb(230,130,110) 0%, rgb(200,140,150) 50%, rgb(130,150,180) 100%)',
                  maskImage: `url(${FOMIcon})`,
                  maskSize: 'contain',
                  maskRepeat: 'no-repeat',
                  maskPosition: 'center',
                  WebkitMaskImage: `url(${FOMIcon})`,
                  WebkitMaskSize: 'contain',
                  WebkitMaskRepeat: 'no-repeat',
                  WebkitMaskPosition: 'center',
                }}
              />
              {/* Mobile black gradient overlay */}
              <div 
                className="absolute inset-0 md:hidden"
                style={{
                  background: 'linear-gradient(135deg, rgba(0,0,0,1) 0%, rgba(0,0,0,1) 60%, rgba(0,0,0,0.6) 80%, rgba(0,0,0,0) 100%)',
                  maskImage: `url(${FOMIcon})`,
                  maskSize: 'contain',
                  maskRepeat: 'no-repeat',
                  maskPosition: 'center',
                  WebkitMaskImage: `url(${FOMIcon})`,
                  WebkitMaskSize: 'contain',
                  WebkitMaskRepeat: 'no-repeat',
                  WebkitMaskPosition: 'center',
                }}
              />
            </div>
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
          <div 
            ref={scrollRef}
            className={isMobile 
              ? "flex gap-4 overflow-x-auto scrollbar-hide -mr-6 pr-6 overscroll-x-contain" 
              : "grid grid-cols-1 md:grid-cols-3 grid-gap"
            }
            style={isMobile ? { scrollSnapType: 'x mandatory', touchAction: 'pan-x pan-y' } : undefined}
          >
            {hosts.map((host, index) => {
              const firstName = host.name.split(' ')[0];
              const lastName = host.name.split(' ').slice(1).join(' ');
              const isFlipped = flippedIndex === index;
              
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
                  className={isMobile ? "group flex-shrink-0" : "group"}
                  style={isMobile ? { width: 'calc(88% - 8px)', scrollSnapAlign: 'start' } : undefined}
                >
                  {/* Card flip container */}
                  <div 
                    className={isMobile 
                      ? "relative aspect-[3/4] cursor-pointer"
                      : "relative aspect-[3/4] cursor-pointer"
                    }
                    style={{ perspective: '1000px' }}
                    onClick={() => setFlippedIndex(isFlipped ? null : index)}
                  >
                    {/* Inner container that flips */}
                    <motion.div
                      className="relative w-full h-full"
                      style={{ transformStyle: 'preserve-3d' }}
                      animate={{ rotateY: isFlipped ? 180 : 0 }}
                      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                    >
                      {/* Front face - Host image */}
                      <div 
                        className="absolute inset-0 card-base card-image rounded-xl overflow-hidden"
                        style={{ backfaceVisibility: 'hidden' }}
                      >
                        <div className="absolute inset-0">
                          <img 
                            src={host.image} 
                            alt={host.name}
                            className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
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
                                <span className="block text-4xl sm:text-3xl lg:text-4xl font-medium">{firstName}</span>
                                <span className="block text-4xl sm:text-3xl lg:text-4xl font-normal">{lastName}</span>
                              </h3>
                              <p className="text-body-sm text-white mt-1">{host.title}</p>
                            </div>
                            <div
                              className="rounded-full p-2 bg-white/10 backdrop-blur-xl border border-white/20 transition-transform duration-300 ease-out group-hover:-translate-y-1"
                            >
                              <ChevronDown className="h-5 w-5 text-white rotate-[-90deg]" />
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Back face - Bio with animated background */}
                      <div 
                        className="absolute inset-0 glass rounded-xl overflow-hidden"
                        style={{ backfaceVisibility: 'hidden', transform: 'rotateY(180deg)' }}
                      >
                        {/* Teaser background image */}
                        <img
                          src={teaserBg} 
                          alt="" 
                          className="w-full h-auto object-contain object-bottom absolute bottom-0 left-0"
                        />
                        {/* Gradient mask over image */}
                        <div className="absolute inset-0 bg-[linear-gradient(to_bottom,hsl(var(--background))_0%,hsl(var(--background))_40%,hsl(var(--background)/0.8)_60%,hsl(var(--background)/0.3)_80%,transparent_100%)]" />
                        
                        {/* Animated color overlay */}
                        <motion.div
                          className="absolute inset-0 mix-blend-soft-light rounded-xl"
                          animate={{
                            opacity: isFlipped ? 0.8 : 0,
                            background: isFlipped ? [
                              'linear-gradient(135deg, rgba(220, 50, 50, 0.9) 0%, rgba(140, 60, 180, 0.8) 50%, rgba(60, 100, 220, 0.9) 100%)',
                              'linear-gradient(135deg, rgba(140, 60, 180, 0.9) 0%, rgba(60, 100, 220, 0.8) 50%, rgba(220, 50, 50, 0.9) 100%)',
                              'linear-gradient(135deg, rgba(60, 100, 220, 0.9) 0%, rgba(220, 50, 50, 0.8) 50%, rgba(140, 60, 180, 0.9) 100%)',
                              'linear-gradient(135deg, rgba(220, 50, 50, 0.9) 0%, rgba(140, 60, 180, 0.8) 50%, rgba(60, 100, 220, 0.9) 100%)',
                            ] : undefined,
                          }}
                          transition={{
                            opacity: { duration: 4, ease: [0.22, 1, 0.36, 1] },
                            background: { duration: 3, ease: 'easeInOut', repeat: Infinity, repeatType: 'loop' },
                          }}
                        />
                        
                        {/* Content */}
                        <div className="relative z-10 p-5 sm:p-6 h-full flex flex-col">
                          {/* Top row: LinkedIn button on right */}
                          <div className="flex items-start justify-between mb-4">
                            <div className="rounded-full p-2 bg-foreground text-background">
                              <ChevronDown className="h-5 w-5 rotate-90" />
                            </div>
                            {host.linkedInUrl && (
                              <a
                                href={host.linkedInUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                onClick={(e) => e.stopPropagation()}
                                className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-full bg-foreground text-background text-sm font-medium hover:bg-foreground/90 hover-transition"
                              >
                                LinkedIn →
                              </a>
                            )}
                          </div>
                          
                          {/* Bio content */}
                          <p className="text-sm leading-relaxed text-foreground/80 flex-1 overflow-y-auto mb-4">
                            {host.bio}
                          </p>
                          
                          {/* Bottom: Name and title */}
                          <div>
                            <h3 className="font-display text-foreground leading-[0.95] tracking-normal">
                              <span className="block text-2xl sm:text-3xl font-medium">{firstName}</span>
                              <span className="block text-2xl sm:text-3xl font-normal">{lastName}</span>
                            </h3>
                            <p className="text-sm text-muted-foreground mt-2">{host.title}</p>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  </div>
                </motion.article>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;

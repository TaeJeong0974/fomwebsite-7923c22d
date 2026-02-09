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
    title: "CEO & Co-Founder",
    company: "Upside",
    companyUrl: "https://www.upside.com",
    bio: "CEO and co-founder of Upside, a next-gen revenue intelligence platform for B2B leaders. Previously co-founded Branch as CMO, scaling it to $100M+ revenue. Partner at XFactor Ventures investing in women founders.",
    image: hostMada,
    linkedInUrl: "https://www.linkedin.com/in/madalina/",
  },
  {
    name: "Ethan Smith",
    title: "Founder & CEO",
    company: "Graphite",
    companyUrl: "https://www.graphite.io",
    bio: "Founder and CEO of Graphite, a premium Vertical AI Growth Agency that helps companies like Webflow, Notion, MasterClass, and Captions drive sustainable revenue growth via SEO, content, and AEO (Answer Engine Optimization). Ethan is also an adjunct professor at IE Business School.",
    image: hostEthan,
    linkedInUrl: "https://www.linkedin.com/in/ethanls/",
  },
  {
    name: "Camille Ricketts",
    title: "Partner",
    company: "XYZ Venture Capital",
    companyUrl: "https://www.xyz.vc",
    bio: "Partner at XYZ Venture Capital, leading investments in product-led growth and go-to-market software startups. Previously the first marketing leader at Notion, and founder of First Round Review for First Round Capital.",
    image: hostCamille,
    linkedInUrl: "https://linkedin.com/in/camillericketts",
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
            {(() => {
              // Inline SVG data URI for Safari compatibility
              const svgMask = `url("data:image/svg+xml,%3Csvg width='598' height='186' viewBox='0 0 598 186' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M448.5 0H411.125V186H448.5V0Z' fill='black'/%3E%3Cpath d='M0 -4.57764e-05L0 37.2L149.5 37.2V-4.57764e-05L0 -4.57764e-05Z' fill='black'/%3E%3Cpath d='M0 74.3806L0 111.581L149.5 111.581V74.3806H0Z' fill='black'/%3E%3Cpath d='M0 148.8L0 186H73.6799V148.8H0Z' fill='black'/%3E%3Cpath d='M523.25 0H485.875V186H523.25V0Z' fill='black'/%3E%3Cpath d='M598 0H560.625V186H598V0Z' fill='black'/%3E%3Cpath d='M280.322 37.2C311.238 37.2 336.394 62.2388 336.394 93.0097C336.394 123.781 311.238 148.819 280.322 148.819C249.407 148.819 224.25 123.781 224.25 93.0097C224.25 62.2388 249.407 37.2 280.322 37.2ZM280.322 0C228.705 0 186.875 41.6346 186.875 93.0097C186.875 144.385 228.705 186.019 280.322 186.019C331.939 186.019 373.769 144.385 373.769 93.0097C373.769 41.6346 331.92 0 280.322 0Z' fill='black'/%3E%3C/svg%3E")`;
              
              const maskStyles = {
                maskImage: svgMask,
                maskSize: 'contain' as const,
                maskRepeat: 'no-repeat' as const,
                maskPosition: 'center' as const,
                WebkitMaskImage: svgMask,
                WebkitMaskSize: 'contain' as const,
                WebkitMaskRepeat: 'no-repeat' as const,
                WebkitMaskPosition: 'center' as const,
              };
              
              return (
                <div 
                  className="w-full relative"
                  style={{ aspectRatio: '598 / 186' }}
                >
                  {/* Base FOM logo (fallback/foundation) */}
                  <img 
                    src={FOMIcon} 
                    alt="Future of Marketing"
                    className="absolute inset-0 w-full h-full object-contain opacity-0"
                  />
                  
                  {/* Animated color gradient - masked by FOM logo shape */}
                  <motion.div 
                    className="absolute inset-0 hidden md:block"
                    style={maskStyles}
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
                      ...maskStyles,
                    }}
                  />
                  
                  {/* Static gradient for mobile - masked by FOM logo */}
                  <div 
                    className="absolute inset-0 md:hidden"
                    style={{ 
                      background: 'linear-gradient(135deg, rgb(230,130,110) 0%, rgb(200,140,150) 50%, rgb(130,150,180) 100%)',
                      ...maskStyles,
                    }}
                  />
                  
                  {/* Mobile black gradient overlay */}
                  <div 
                    className="absolute inset-0 md:hidden"
                    style={{
                      background: 'linear-gradient(135deg, rgba(0,0,0,1) 0%, rgba(0,0,0,1) 60%, rgba(0,0,0,0.6) 80%, rgba(0,0,0,0) 100%)',
                      ...maskStyles,
                    }}
                  />
                </div>
              );
            })()}
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
                    className={`relative aspect-[3/4] cursor-pointer ${isMobile ? '' : 'transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] [@media(hover:hover)]:hover:-translate-y-2'}`}
                    style={isMobile ? undefined : { perspective: '1000px' }}
                    onClick={() => setFlippedIndex(isFlipped ? null : index)}
                    onMouseLeave={() => !isMobile && isFlipped && setFlippedIndex(null)}
                  >
                    {isMobile ? (
                      /* Mobile: Simple fade transition */
                      <>
                        {/* Front face - Host image */}
                        <motion.div 
                          className="absolute inset-0 card-base card-image rounded-xl overflow-hidden"
                          initial={false}
                          animate={{ opacity: isFlipped ? 0 : 1 }}
                          transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
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

                          {/* Arrow button top right */}
                          <div className="absolute top-4 right-4 z-10">
                            <div className="rounded-full p-2 bg-white/10 backdrop-blur-xl border border-white/20">
                              <ChevronDown className="h-5 w-5 text-white rotate-[-90deg]" />
                            </div>
                          </div>

                          <div className="card-content-bottom card-padding">
                            <h3 className="font-display text-white leading-[0.95] tracking-normal">
                              <span className="block text-4xl font-medium">{firstName}</span>
                              <span className="block text-4xl font-normal">{lastName}</span>
                            </h3>
                          </div>
                        </motion.div>

                        {/* Back face - Bio */}
                        <motion.div 
                          className="absolute inset-0 glass rounded-xl overflow-hidden"
                          initial={false}
                          animate={{ opacity: isFlipped ? 1 : 0 }}
                          transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                          style={{ pointerEvents: isFlipped ? 'auto' : 'none' }}
                        >
                          {/* Teaser background image */}
                          <img
                            src={teaserBg} 
                            alt="" 
                            className="w-full h-auto object-contain object-bottom absolute bottom-0 left-0"
                          />
                          {/* Gradient mask over image */}
                          <div className="absolute inset-0 bg-[linear-gradient(to_bottom,hsl(var(--background))_0%,hsl(var(--background))_40%,hsl(var(--background)/0.8)_60%,hsl(var(--background)/0.3)_80%,transparent_100%)]" />
                          
                          {/* Static color overlay */}
                          <div
                            className="absolute inset-0 mix-blend-soft-light rounded-xl opacity-80"
                            style={{
                              background: 'linear-gradient(135deg, rgba(220, 50, 50, 0.9) 0%, rgba(140, 60, 180, 0.8) 50%, rgba(60, 100, 220, 0.9) 100%)',
                            }}
                          />
                          
                          {/* Content */}
                          <div className="relative z-10 p-5 h-full flex flex-col">
                            {/* Arrow button top right */}
                            <div className="absolute top-4 right-4 z-10">
                              <div className="rounded-full p-2 bg-foreground text-background">
                                <ChevronDown className="h-5 w-5 rotate-90" />
                              </div>
                            </div>
                            
                            <div className="flex-1" />
                            
                            {/* Bottom: Name, title, bio, and LinkedIn */}
                            <div>
                              <h3 className="font-display text-foreground leading-[0.95] tracking-normal">
                                <span className="block text-2xl font-medium">{firstName}</span>
                                <span className="block text-2xl font-normal">{lastName}</span>
                              </h3>
                              <p className="text-sm text-muted-foreground mt-2">
                                {host.title},{" "}
                                <a href={host.companyUrl} target="_blank" rel="noopener noreferrer" onClick={(e) => e.stopPropagation()} className="hover:text-foreground hover-transition">{host.company}</a>
                              </p>
                              <p className="text-sm leading-relaxed text-foreground/80 mt-4 hidden lg:block">
                                {host.bio}
                              </p>
                              {host.linkedInUrl && (
                                <a 
                                  href={host.linkedInUrl}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  onClick={(e) => e.stopPropagation()}
                                  className="inline-flex items-center mt-4 px-4 py-2 bg-foreground text-background text-sm font-medium rounded-full"
                                >
                                  LinkedIn
                                </a>
                              )}
                            </div>
                          </div>
                        </motion.div>
                      </>
                    ) : (
                      /* Desktop: 3D flip animation */
                      <motion.div
                        className="relative w-full h-full"
                        style={{ 
                          transformStyle: 'preserve-3d',
                          WebkitTransformStyle: 'preserve-3d',
                        }}
                        animate={{ rotateY: isFlipped ? 180 : 0 }}
                        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                      >
                        {/* Front face - Host image */}
                        <div 
                          className="absolute inset-0 card-base card-image rounded-xl overflow-hidden"
                          style={{ 
                            backfaceVisibility: 'hidden', 
                            WebkitBackfaceVisibility: 'hidden',
                            transform: 'translateZ(0)',
                          }}
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

                          {/* Arrow button top right */}
                          <div 
                            className="absolute top-4 right-4 z-10 transition-opacity duration-300"
                            style={{ opacity: isFlipped ? 0 : 1 }}
                          >
                            <div className="rounded-full p-2 bg-white/10 backdrop-blur-xl border border-white/20 transition-transform duration-300 ease-out group-hover:-translate-y-1">
                              <ChevronDown className="h-5 w-5 text-white rotate-[-90deg]" />
                            </div>
                          </div>

                          <div className="card-content-bottom card-padding">
                            <h3 className="font-display text-white leading-[0.95] tracking-normal">
                              <span className="block text-3xl lg:text-4xl font-medium">{firstName}</span>
                              <span className="block text-3xl lg:text-4xl font-normal">{lastName}</span>
                            </h3>
                          </div>
                        </div>

                        {/* Back face - Bio */}
                        <div 
                          className="absolute inset-0 glass rounded-xl overflow-hidden"
                          style={{ 
                            backfaceVisibility: 'hidden', 
                            WebkitBackfaceVisibility: 'hidden', 
                            transform: 'rotateY(180deg) translateZ(0)',
                          }}
                        >
                          {/* Teaser background image */}
                          <img
                            src={teaserBg} 
                            alt="" 
                            className="w-full h-auto object-contain object-bottom absolute bottom-0 left-0"
                          />
                          {/* Gradient mask over image */}
                          <div className="absolute inset-0 bg-[linear-gradient(to_bottom,hsl(var(--background))_0%,hsl(var(--background))_40%,hsl(var(--background)/0.8)_60%,hsl(var(--background)/0.3)_80%,transparent_100%)]" />
                          
                          {/* Static color overlay */}
                          <motion.div
                            className="absolute inset-0 mix-blend-soft-light rounded-xl"
                            style={{
                              background: 'linear-gradient(135deg, rgba(220, 50, 50, 0.9) 0%, rgba(140, 60, 180, 0.8) 50%, rgba(60, 100, 220, 0.9) 100%)',
                            }}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: isFlipped ? 0.8 : 0 }}
                            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                          />
                          
                          {/* Content */}
                          <div className="relative z-10 p-6 h-full flex flex-col">
                            {/* Arrow button top right */}
                            <div className="absolute top-4 right-4 z-10">
                              <div className="rounded-full p-2 bg-foreground text-background">
                                <ChevronDown className="h-5 w-5 rotate-90" />
                              </div>
                            </div>
                            
                            <div className="flex-1" />
                            
                            {/* Bottom: Name, title, bio, and LinkedIn */}
                            <div>
                              <h3 className="font-display text-foreground leading-[0.95] tracking-normal">
                                <span className="block text-3xl font-medium">{firstName}</span>
                                <span className="block text-3xl font-normal">{lastName}</span>
                              </h3>
                              <p className="text-sm text-muted-foreground mt-2">
                                {host.title},{" "}
                                <a href={host.companyUrl} target="_blank" rel="noopener noreferrer" onClick={(e) => e.stopPropagation()} className="hover:text-foreground hover-transition">{host.company}</a>
                              </p>
                              <p className="text-sm leading-relaxed text-foreground/80 mt-4 hidden lg:block">
                                {host.bio}
                              </p>
                              {host.linkedInUrl && (
                                <a 
                                  href={host.linkedInUrl}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  onClick={(e) => e.stopPropagation()}
                                  className="group/linkedin inline-flex items-center gap-0 mt-4 px-4 py-2 bg-foreground text-background text-sm font-medium rounded-full hover:bg-foreground/80 transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]"
                                >
                                  LinkedIn
                                  <span className="inline-block max-w-0 overflow-hidden opacity-0 group-hover/linkedin:max-w-[20px] group-hover/linkedin:opacity-100 group-hover/linkedin:ml-1.5 transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] text-xs">→</span>
                                </a>
                              )}
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    )}
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

"use client";

import { useIsMobile } from "@/hooks/use-mobile";
import { motion } from "framer-motion";
import { Building2, ChevronDown, Globe, Linkedin, Twitter } from "lucide-react";
import Image from "next/image";
import { useRef, useState } from "react";
const hostMada = "/images/assets/host-mada.jpg";
const hostEthan = "/images/assets/host-ethan.jpg";
const hostCamille = "/images/assets/host-camille.jpg";

const teaserBg = "/images/assets/teaser-bg.jpg";
import { liquidEase } from "@/components/animations/PageLoadAnimation";
import { fomMaskContainStyles } from "@/lib/logoMask";

const hosts = [
  {
    name: "Mada Seghete",
    title: "CEO & Co-Founder",
    company: "Upside",
    companyUrl: "https://www.upside.tech/",
    personalUrl: "https://madalinaseghete.com/",
    twitterHandle: "",
    bio: "CEO and co-founder of Upside, a next-gen revenue intelligence platform for B2B leaders. Previously co-founded Branch as CMO, scaling it to $100M+ revenue. Partner at XFactor Ventures investing in women founders.",
    image: hostMada,
    linkedInUrl: "https://www.linkedin.com/in/madalina/",
  },
  {
    name: "Ethan Smith",
    title: "Founder & CEO",
    company: "Graphite Growth",
    companyUrl: "https://www.graphite.io",
    bio: "Founder and CEO of Graphite Growth, a premium Vertical AI Growth Agency that helps companies like Webflow, Notion, MasterClass, and Captions drive sustainable revenue growth via SEO, content, and AEO (Answer Engine Optimization). Ethan is also an adjunct professor at IE Business School.",
    image: hostEthan,
    linkedInUrl: "https://www.linkedin.com/in/ethanls/",
  },
  {
    name: "Camille Ricketts",
    title: "Partner",
    company: "XYZ Venture Capital",
    companyUrl: "https://www.xyz.vc",
    twitterHandle: "camillericketts",
    bio: "Partner at XYZ Venture Capital, leading investments in product-led growth and go-to-market software startups. Previously the first marketing leader at Notion, and founder of First Round Review for First Round Capital.",
    image: hostCamille,
    linkedInUrl: "https://linkedin.com/in/camillericketts",
  },
];

const taglineLines = [
  "How AI is reshaping marketing,",
  "from the leaders living it.",
];

const HeroSection = () => {
  const [flippedIndex, setFlippedIndex] = useState<number | null>(null);
  const isMobile = useIsMobile();
  const scrollRef = useRef<HTMLDivElement>(null);

  return (
    <section id="hero" className="pt-24 sm:pt-28 lg:pt-32 pb-14 lg:pb-20">
      <div className="container mx-auto container-padding">
        {/* Top row: Tagline left, Title right */}
        <div className="flex justify-between items-start mb-20 lg:mb-32">
          {/* Typewriter tagline */}
          <h1 className="font-display text-sm sm:text-base md:text-lg lg:text-xl text-foreground font-medium tracking-normal">
            {taglineLines.map((line, lineIndex) => (
              <span key={line} className="block" style={{ lineHeight: 1.2 }}>
                <motion.span
                  className="inline-block"
                  initial={{ y: "100%", opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{
                    duration: 0.6,
                    ease: liquidEase,
                    delay: 0.3 + lineIndex * 0.15,
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
              aria-hidden="true"
              width="16"
              height="40"
              viewBox="0 0 16 40"
              fill="none"
              className="text-foreground"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1, y: [0, 6, 0] }}
              transition={{
                opacity: { duration: 0.5, delay: 2 },
                y: {
                  duration: 1.5,
                  repeat: Number.POSITIVE_INFINITY,
                  ease: liquidEase,
                  delay: 2.5,
                },
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
              return (
                <div
                  className="w-full relative"
                  style={{ aspectRatio: "598 / 186" }}
                >
                  {/* Animated color gradient - masked by FOM logo shape */}
                  <motion.div
                    className="absolute inset-0 hidden md:block"
                    style={fomMaskContainStyles}
                    animate={{
                      background: [
                        "linear-gradient(135deg, rgb(230,130,110) 0%, rgb(200,140,150) 50%, rgb(130,150,180) 100%)",
                        "linear-gradient(135deg, rgb(200,140,150) 0%, rgb(130,150,180) 50%, rgb(230,130,110) 100%)",
                        "linear-gradient(135deg, rgb(130,150,180) 0%, rgb(230,130,110) 50%, rgb(200,140,150) 100%)",
                        "linear-gradient(135deg, rgb(230,130,110) 0%, rgb(200,140,150) 50%, rgb(130,150,180) 100%)",
                      ],
                    }}
                    transition={{
                      duration: 3,
                      ease: "easeInOut",
                      repeat: Number.POSITIVE_INFINITY,
                    }}
                  />

                  {/* Black gradient overlay from top-left to bottom-right - masked by FOM logo */}
                  <div
                    className="absolute inset-0 hidden md:block"
                    style={{
                      background:
                        "linear-gradient(135deg, rgba(0,0,0,1) 0%, rgba(0,0,0,1) 60%, rgba(0,0,0,0.6) 80%, rgba(0,0,0,0) 100%)",
                      ...fomMaskContainStyles,
                    }}
                  />

                  {/* Static gradient for mobile - masked by FOM logo */}
                  <div
                    className="absolute inset-0 md:hidden"
                    style={{
                      background:
                        "linear-gradient(135deg, rgb(230,130,110) 0%, rgb(200,140,150) 50%, rgb(130,150,180) 100%)",
                      ...fomMaskContainStyles,
                    }}
                  />

                  {/* Mobile black gradient overlay */}
                  <div
                    className="absolute inset-0 md:hidden"
                    style={{
                      background:
                        "linear-gradient(135deg, rgba(0,0,0,1) 0%, rgba(0,0,0,1) 60%, rgba(0,0,0,0.6) 80%, rgba(0,0,0,0) 100%)",
                      ...fomMaskContainStyles,
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
            className={
              isMobile
                ? "flex gap-4 overflow-x-auto scrollbar-hide -mr-6 pr-6 overscroll-x-contain"
                : "grid grid-cols-1 md:grid-cols-3 grid-gap"
            }
            style={
              isMobile
                ? { scrollSnapType: "x mandatory", touchAction: "pan-x pan-y" }
                : undefined
            }
          >
            {hosts.map((host, index) => {
              const firstName = host.name.split(" ")[0];
              const lastName = host.name.split(" ").slice(1).join(" ");
              const isFlipped = flippedIndex === index;

              return (
                <motion.article
                  key={host.name}
                  initial={{ opacity: 0, y: 60 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    duration: 0.8,
                    delay: 2 + index * 0.2,
                    ease: liquidEase,
                  }}
                  className={isMobile ? "group flex-shrink-0" : "group"}
                  style={
                    isMobile
                      ? { width: "calc(88% - 8px)", scrollSnapAlign: "start" }
                      : undefined
                  }
                >
                  {/* Card flip container — contains nested LinkedIn/company links so cannot be a <button> */}
                  {/* biome-ignore lint/a11y/useSemanticElements: interactive card with nested anchor links cannot be a button element */}
                  <div
                    role="button"
                    tabIndex={0}
                    className={`relative aspect-[3/4] cursor-pointer ${isMobile ? "" : "transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] [@media(hover:hover)]:hover:-translate-y-2"}`}
                    style={isMobile ? undefined : { perspective: "1000px" }}
                    onClick={() => setFlippedIndex(isFlipped ? null : index)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" || e.key === " ")
                        setFlippedIndex(isFlipped ? null : index);
                    }}
                    onMouseLeave={() =>
                      !isMobile && isFlipped && setFlippedIndex(null)
                    }
                  >
                    {isMobile ? (
                      /* Mobile: Simple fade transition */
                      <>
                        {/* Front face - Host image */}
                        <motion.div
                          className="absolute inset-0 card-base card-image rounded-xl overflow-hidden"
                          initial={false}
                          animate={{ opacity: isFlipped ? 0 : 1 }}
                          transition={{
                            duration: 0.3,
                            ease: [0.22, 1, 0.36, 1],
                          }}
                        >
                          <div className="absolute inset-0">
                            <Image
                              src={host.image}
                              alt={host.name}
                              fill
                              priority
                              sizes="(max-width: 1024px) 100vw, 33vw"
                              className="object-cover"
                            />
                            <div className="card-overlay" />
                          </div>

                          {/* Arrow button top right */}
                          <div className="absolute top-6 right-6 lg:top-8 lg:right-8 z-10">
                            <div className="rounded-full p-2 bg-white/10 backdrop-blur-xl border border-white/20">
                              <ChevronDown className="h-5 w-5 text-white rotate-[-90deg]" />
                            </div>
                          </div>

                          <div className="card-content-bottom card-padding">
                            <h3 className="font-display text-white leading-[0.95] tracking-normal">
                              <span className="block text-4xl font-medium">
                                {firstName}
                              </span>
                              <span className="block text-4xl font-normal">
                                {lastName}
                              </span>
                            </h3>
                          </div>
                        </motion.div>

                        {/* Back face - Bio */}
                        <motion.div
                          className="absolute inset-0 glass rounded-xl overflow-hidden"
                          initial={false}
                          animate={{ opacity: isFlipped ? 1 : 0 }}
                          transition={{
                            duration: 0.3,
                            ease: [0.22, 1, 0.36, 1],
                          }}
                          style={{ pointerEvents: isFlipped ? "auto" : "none" }}
                        >
                          {/* Teaser background image */}
                          <Image
                            src={teaserBg}
                            alt=""
                            fill
                            className="object-contain object-bottom"
                          />
                          {/* Gradient mask over image */}
                          <div className="absolute inset-0 bg-[linear-gradient(to_bottom,hsl(var(--background))_0%,hsl(var(--background))_40%,hsl(var(--background)/0.8)_60%,hsl(var(--background)/0.3)_80%,transparent_100%)]" />

                          {/* Static color overlay */}
                          <div
                            className="absolute inset-0 mix-blend-soft-light rounded-xl opacity-80"
                            style={{
                              background:
                                "linear-gradient(135deg, rgba(220, 50, 50, 0.9) 0%, rgba(140, 60, 180, 0.8) 50%, rgba(60, 100, 220, 0.9) 100%)",
                            }}
                          />

                          {/* Content */}
                          <div className="relative z-10 p-5 h-full flex flex-col">
                            {/* Arrow button top right */}
                            <div className="absolute top-6 right-6 lg:top-8 lg:right-8 z-10">
                              <div className="rounded-full p-2 bg-white/60 backdrop-blur-2xl border border-white/40 shadow-[0_2px_8px_-2px_rgba(0,0,0,0.08),inset_0_1px_0_rgba(255,255,255,0.6)] text-foreground">
                                <ChevronDown className="h-5 w-5 rotate-90" />
                              </div>
                            </div>

                            <div className="flex-1" />

                            {/* Bottom: Name, title, bio, and LinkedIn */}
                            <div>
                              <h3 className="font-display text-foreground leading-[0.95] tracking-normal">
                                <span className="block text-2xl font-medium">
                                  {firstName}
                                </span>
                                <span className="block text-2xl font-normal">
                                  {lastName}
                                </span>
                              </h3>
                              <p className="text-sm text-muted-foreground mt-2 font-semibold">
                                {host.title}, {host.company}
                              </p>
                              <p className="text-sm leading-relaxed text-foreground/80 mt-4 hidden lg:block">
                                {host.bio}
                              </p>
                              <div className="flex items-center gap-2 mt-4">
                                {host.linkedInUrl && (
                                  <a
                                    href={host.linkedInUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    onClick={(e) => e.stopPropagation()}
                                    className="rounded-full p-2.5 bg-white/60 backdrop-blur-2xl border border-white/40 shadow-[0_2px_8px_-2px_rgba(0,0,0,0.08),inset_0_1px_0_rgba(255,255,255,0.6)] text-foreground hover:bg-white/80 transition-[background,box-shadow] duration-300"
                                  >
                                    <Linkedin className="h-4 w-4" />
                                  </a>
                                )}
                                {host.companyUrl && (
                                  <a
                                    href={host.companyUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    onClick={(e) => e.stopPropagation()}
                                    className="rounded-full p-2.5 bg-white/60 backdrop-blur-2xl border border-white/40 shadow-[0_2px_8px_-2px_rgba(0,0,0,0.08),inset_0_1px_0_rgba(255,255,255,0.6)] text-foreground hover:bg-white/80 transition-[background,box-shadow] duration-300"
                                  >
                                    <Building2 className="h-4 w-4" />
                                  </a>
                                )}
                                {host.personalUrl && (
                                  <a
                                    href={host.personalUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    onClick={(e) => e.stopPropagation()}
                                    className="rounded-full p-2.5 bg-white/60 backdrop-blur-2xl border border-white/40 shadow-[0_2px_8px_-2px_rgba(0,0,0,0.08),inset_0_1px_0_rgba(255,255,255,0.6)] text-foreground hover:bg-white/80 transition-[background,box-shadow] duration-300"
                                  >
                                    <Globe className="h-4 w-4" />
                                  </a>
                                )}
                                {host.twitterHandle && (
                                  <a
                                    href={`https://x.com/${host.twitterHandle}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    onClick={(e) => e.stopPropagation()}
                                    className="rounded-full p-2.5 bg-white/60 backdrop-blur-2xl border border-white/40 shadow-[0_2px_8px_-2px_rgba(0,0,0,0.08),inset_0_1px_0_rgba(255,255,255,0.6)] text-foreground hover:bg-white/80 transition-[background,box-shadow] duration-300"
                                  >
                                    <Twitter className="h-4 w-4" />
                                  </a>
                                )}
                              </div>
                            </div>
                          </div>
                        </motion.div>
                      </>
                    ) : (
                      /* Desktop: 3D flip animation */
                      <motion.div
                        className="relative w-full h-full"
                        style={{
                          transformStyle: "preserve-3d",
                          WebkitTransformStyle: "preserve-3d",
                        }}
                        animate={{ rotateY: isFlipped ? 180 : 0 }}
                        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                      >
                        {/* Front face - Host image */}
                        <div
                          className="absolute inset-0 card-base card-image rounded-xl overflow-hidden"
                          style={{
                            backfaceVisibility: "hidden",
                            WebkitBackfaceVisibility: "hidden",
                            transform: "translateZ(0)",
                          }}
                        >
                          <div className="absolute inset-0">
                            <Image
                              src={host.image}
                              alt={host.name}
                              fill
                              priority
                              sizes="(max-width: 1024px) 100vw, 33vw"
                              className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                            />
                            <div className="card-overlay" />
                          </div>

                          {/* Arrow button top right */}
                          <div
                            className="absolute top-6 right-6 lg:top-8 lg:right-8 z-10 transition-opacity duration-300"
                            style={{ opacity: isFlipped ? 0 : 1 }}
                          >
                            <div className="rounded-full p-2 bg-white/10 backdrop-blur-xl border border-white/20 transition-transform duration-300 ease-out group-hover:-translate-y-1">
                              <ChevronDown className="h-5 w-5 text-white rotate-[-90deg]" />
                            </div>
                          </div>

                          <div className="card-content-bottom card-padding">
                            <h3 className="font-display text-white leading-[0.95] tracking-normal">
                              <span className="block text-3xl lg:text-4xl font-medium">
                                {firstName}
                              </span>
                              <span className="block text-3xl lg:text-4xl font-normal">
                                {lastName}
                              </span>
                            </h3>
                          </div>
                        </div>

                        {/* Back face - Bio */}
                        <div
                          className="absolute inset-0 glass rounded-xl overflow-hidden"
                          style={{
                            backfaceVisibility: "hidden",
                            WebkitBackfaceVisibility: "hidden",
                            transform: "rotateY(180deg) translateZ(0)",
                          }}
                        >
                          {/* Teaser background image */}
                          <Image
                            src={teaserBg}
                            alt=""
                            fill
                            className="object-contain object-bottom"
                          />
                          {/* Gradient mask over image */}
                          <div className="absolute inset-0 bg-[linear-gradient(to_bottom,hsl(var(--background))_0%,hsl(var(--background))_40%,hsl(var(--background)/0.8)_60%,hsl(var(--background)/0.3)_80%,transparent_100%)]" />

                          {/* Static color overlay */}
                          <motion.div
                            className="absolute inset-0 mix-blend-soft-light rounded-xl"
                            style={{
                              background:
                                "linear-gradient(135deg, rgba(220, 50, 50, 0.9) 0%, rgba(140, 60, 180, 0.8) 50%, rgba(60, 100, 220, 0.9) 100%)",
                            }}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: isFlipped ? 0.8 : 0 }}
                            transition={{
                              duration: 0.4,
                              ease: [0.22, 1, 0.36, 1],
                            }}
                          />

                          {/* Content */}
                          <div className="relative z-10 p-6 h-full flex flex-col">
                            {/* Arrow button top right */}
                            <div className="absolute top-6 right-6 lg:top-8 lg:right-8 z-10">
                              <div className="rounded-full p-2 bg-white/60 backdrop-blur-2xl border border-white/40 shadow-[0_2px_8px_-2px_rgba(0,0,0,0.08),inset_0_1px_0_rgba(255,255,255,0.6)] text-foreground">
                                <ChevronDown className="h-5 w-5 rotate-90" />
                              </div>
                            </div>

                            <div className="flex-1" />

                            {/* Bottom: Name, title, bio, and LinkedIn */}
                            <div>
                              <h3 className="font-display text-foreground leading-[0.95] tracking-normal">
                                <span className="block text-3xl font-medium">
                                  {firstName}
                                </span>
                                <span className="block text-3xl font-normal">
                                  {lastName}
                                </span>
                              </h3>
                              <p className="text-sm text-muted-foreground mt-2 font-semibold">
                                {host.title}, {host.company}
                              </p>
                              <p className="text-sm leading-relaxed text-foreground/80 mt-4 hidden lg:block">
                                {host.bio}
                              </p>
                              <div className="flex items-center gap-2 mt-4">
                                {host.linkedInUrl && (
                                  <a
                                    href={host.linkedInUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    onClick={(e) => e.stopPropagation()}
                                    className="rounded-full p-2.5 bg-white/60 backdrop-blur-2xl border border-white/40 shadow-[0_2px_8px_-2px_rgba(0,0,0,0.08),inset_0_1px_0_rgba(255,255,255,0.6)] text-foreground hover:bg-white/80 transition-[background,box-shadow] duration-300"
                                  >
                                    <Linkedin className="h-4 w-4" />
                                  </a>
                                )}
                                {host.companyUrl && (
                                  <a
                                    href={host.companyUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    onClick={(e) => e.stopPropagation()}
                                    className="rounded-full p-2.5 bg-white/60 backdrop-blur-2xl border border-white/40 shadow-[0_2px_8px_-2px_rgba(0,0,0,0.08),inset_0_1px_0_rgba(255,255,255,0.6)] text-foreground hover:bg-white/80 transition-[background,box-shadow] duration-300"
                                  >
                                    <Building2 className="h-4 w-4" />
                                  </a>
                                )}
                                {host.personalUrl && (
                                  <a
                                    href={host.personalUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    onClick={(e) => e.stopPropagation()}
                                    className="rounded-full p-2.5 bg-white/60 backdrop-blur-2xl border border-white/40 shadow-[0_2px_8px_-2px_rgba(0,0,0,0.08),inset_0_1px_0_rgba(255,255,255,0.6)] text-foreground hover:bg-white/80 transition-[background,box-shadow] duration-300"
                                  >
                                    <Globe className="h-4 w-4" />
                                  </a>
                                )}
                                {host.twitterHandle && (
                                  <a
                                    href={`https://x.com/${host.twitterHandle}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    onClick={(e) => e.stopPropagation()}
                                    className="rounded-full p-2.5 bg-white/60 backdrop-blur-2xl border border-white/40 shadow-[0_2px_8px_-2px_rgba(0,0,0,0.08),inset_0_1px_0_rgba(255,255,255,0.6)] text-foreground hover:bg-white/80 transition-[background,box-shadow] duration-300"
                                  >
                                    <Twitter className="h-4 w-4" />
                                  </a>
                                )}
                              </div>
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

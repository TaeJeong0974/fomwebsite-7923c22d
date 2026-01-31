import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowLeft, Play, RotateCcw } from "lucide-react";
import FomLogo from "@/assets/FOM_Logo.svg";
import FOMIcon from "@/assets/FOM_Icon.svg";
import hostMada from "@/assets/host-mada.png";
import hostEthan from "@/assets/host-ethan.png";
import hostCamille from "@/assets/host-camille.png";

const liquidEase = [0.22, 1, 0.36, 1] as const;

type DemoCategory = "page-load" | "hero";
type PageLoadStyle = "fade-rise" | "wipe-reveal" | "logo-intro" | "stagger-cascade";
type HeroStyle = "orchestrated-stagger" | "logo-hero" | "cinematic-parallax" | "typewriter-tagline";
type AnimationStyle = PageLoadStyle | HeroStyle;

const hosts = [
  { name: "Mada Seghete", title: "CEO & Co-Founder, Upside", image: hostMada },
  { name: "Ethan Smith", title: "Founder & CEO, Graphite", image: hostEthan },
  { name: "Camille Ricketts", title: "Partner, XYZ Venture Capital", image: hostCamille },
];

const AnimationDemo = () => {
  const [category, setCategory] = useState<DemoCategory>("hero");
  const [activeDemo, setActiveDemo] = useState<AnimationStyle | null>(null);
  const [demoKey, setDemoKey] = useState(0);

  const playDemo = (style: AnimationStyle) => {
    setActiveDemo(null);
    setTimeout(() => {
      setActiveDemo(style);
      setDemoKey(prev => prev + 1);
    }, 100);
  };

  const resetDemo = () => {
    setActiveDemo(null);
  };

  const isHeroDemo = (demo: AnimationStyle | null): demo is HeroStyle => {
    return demo === "orchestrated-stagger" || demo === "logo-hero" || demo === "cinematic-parallax" || demo === "typewriter-tagline";
  };

  return (
    <div className="min-h-screen bg-[#f4f2ef]">
      {/* Header */}
      <div className="fixed top-4 left-4 right-4 z-50 flex items-center justify-between">
        <Link 
          to="/" 
          className="flex items-center gap-2 px-4 py-2 bg-foreground/5 backdrop-blur-xl rounded-full text-sm font-medium hover:bg-foreground/10 transition-all"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Site
        </Link>
        {activeDemo && (
          <button
            onClick={resetDemo}
            className="flex items-center gap-2 px-4 py-2 bg-foreground/5 backdrop-blur-xl rounded-full text-sm font-medium hover:bg-foreground/10 transition-all"
          >
            <RotateCcw className="w-4 h-4" />
            Reset
          </button>
        )}
      </div>

      {/* Animation Options Grid */}
      <AnimatePresence mode="wait">
        {!activeDemo && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="min-h-screen flex flex-col items-center justify-center p-8"
          >
            {/* Category Tabs */}
            <div className="flex gap-2 mb-8">
              <button
                onClick={() => setCategory("hero")}
                className={`px-6 py-2 rounded-full text-sm font-medium transition-all ${
                  category === "hero" 
                    ? "bg-foreground text-background" 
                    : "bg-foreground/5 hover:bg-foreground/10"
                }`}
              >
                Hero Animations
              </button>
              <button
                onClick={() => setCategory("page-load")}
                className={`px-6 py-2 rounded-full text-sm font-medium transition-all ${
                  category === "page-load" 
                    ? "bg-foreground text-background" 
                    : "bg-foreground/5 hover:bg-foreground/10"
                }`}
              >
                Page Load
              </button>
            </div>

            <h1 className="text-display-lg text-foreground mb-2">
              {category === "hero" ? "Hero Section Animations" : "Page Load Animations"}
            </h1>
            <p className="text-muted-foreground mb-12">Click any option to preview</p>
            
            {category === "hero" ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl w-full">
                {/* Hero Option 1: Orchestrated Stagger */}
                <button
                  onClick={() => playDemo("orchestrated-stagger")}
                  className="group relative overflow-hidden rounded-2xl bg-white/50 backdrop-blur-sm border border-foreground/10 p-8 text-left hover:bg-white/80 transition-all hover:scale-[1.02] hover:shadow-xl"
                >
                  <div className="flex items-start justify-between mb-4">
                    <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Option 1</span>
                    <Play className="w-5 h-5 text-primary opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                  <h2 className="text-display-md mb-2">Orchestrated Stagger</h2>
                  <p className="text-muted-foreground text-sm">
                    Elements reveal in choreographed sequence: tagline → logo → host cards. Elegant, editorial feel.
                  </p>
                  <div className="mt-6 flex gap-2">
                    <span className="px-3 py-1 text-xs bg-foreground/5 rounded-full">3s</span>
                    <span className="px-3 py-1 text-xs bg-foreground/5 rounded-full">Editorial</span>
                  </div>
                </button>

                {/* Hero Option 2: Logo Hero Moment */}
                <button
                  onClick={() => playDemo("logo-hero")}
                  className="group relative overflow-hidden rounded-2xl bg-white/50 backdrop-blur-sm border border-foreground/10 p-8 text-left hover:bg-white/80 transition-all hover:scale-[1.02] hover:shadow-xl"
                >
                  <div className="flex items-start justify-between mb-4">
                    <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Option 2</span>
                    <Play className="w-5 h-5 text-primary opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                  <h2 className="text-display-md mb-2">Logo Hero Moment</h2>
                  <p className="text-muted-foreground text-sm">
                    FOM logo animates dramatically with scale & draw effect, then other elements fade in. Brand-forward.
                  </p>
                  <div className="mt-6 flex gap-2">
                    <span className="px-3 py-1 text-xs bg-foreground/5 rounded-full">3.5s</span>
                    <span className="px-3 py-1 text-xs bg-foreground/5 rounded-full">Brand</span>
                  </div>
                </button>

                {/* Hero Option 3: Cinematic Parallax */}
                <button
                  onClick={() => playDemo("cinematic-parallax")}
                  className="group relative overflow-hidden rounded-2xl bg-white/50 backdrop-blur-sm border border-foreground/10 p-8 text-left hover:bg-white/80 transition-all hover:scale-[1.02] hover:shadow-xl"
                >
                  <div className="flex items-start justify-between mb-4">
                    <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Option 3</span>
                    <Play className="w-5 h-5 text-primary opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                  <h2 className="text-display-md mb-2">Cinematic Parallax</h2>
                  <p className="text-muted-foreground text-sm">
                    Layered depth with elements floating in at different speeds. Immersive, dimensional, premium.
                  </p>
                  <div className="mt-6 flex gap-2">
                    <span className="px-3 py-1 text-xs bg-foreground/5 rounded-full">2.5s</span>
                    <span className="px-3 py-1 text-xs bg-foreground/5 rounded-full">Immersive</span>
                  </div>
                </button>

                {/* Hero Option 4: Typewriter Tagline */}
                <button
                  onClick={() => playDemo("typewriter-tagline")}
                  className="group relative overflow-hidden rounded-2xl bg-white/50 backdrop-blur-sm border border-foreground/10 p-8 text-left hover:bg-white/80 transition-all hover:scale-[1.02] hover:shadow-xl"
                >
                  <div className="flex items-start justify-between mb-4">
                    <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Option 4</span>
                    <Play className="w-5 h-5 text-primary opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                  <h2 className="text-display-md mb-2">Typewriter Tagline</h2>
                  <p className="text-muted-foreground text-sm">
                    Tagline types out letter-by-letter, logo fades in, host cards cascade up. Dynamic, attention-grabbing.
                  </p>
                  <div className="mt-6 flex gap-2">
                    <span className="px-3 py-1 text-xs bg-foreground/5 rounded-full">4s</span>
                    <span className="px-3 py-1 text-xs bg-foreground/5 rounded-full">Dynamic</span>
                  </div>
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl w-full">
                {/* Page Load Option 1: Fade & Rise */}
                <button
                  onClick={() => playDemo("fade-rise")}
                  className="group relative overflow-hidden rounded-2xl bg-white/50 backdrop-blur-sm border border-foreground/10 p-8 text-left hover:bg-white/80 transition-all hover:scale-[1.02] hover:shadow-xl"
                >
                  <div className="flex items-start justify-between mb-4">
                    <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Option 1</span>
                    <Play className="w-5 h-5 text-primary opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                  <h2 className="text-display-md mb-2">Fade & Rise</h2>
                  <p className="text-muted-foreground text-sm">
                    Elements fade in and slide up smoothly in sequence. Elegant, minimal, professional.
                  </p>
                  <div className="mt-6 flex gap-2">
                    <span className="px-3 py-1 text-xs bg-foreground/5 rounded-full">2.5s</span>
                    <span className="px-3 py-1 text-xs bg-foreground/5 rounded-full">Editorial</span>
                  </div>
                </button>

                {/* Page Load Option 2: Wipe Reveal */}
                <button
                  onClick={() => playDemo("wipe-reveal")}
                  className="group relative overflow-hidden rounded-2xl bg-white/50 backdrop-blur-sm border border-foreground/10 p-8 text-left hover:bg-white/80 transition-all hover:scale-[1.02] hover:shadow-xl"
                >
                  <div className="flex items-start justify-between mb-4">
                    <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Option 2</span>
                    <Play className="w-5 h-5 text-primary opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                  <h2 className="text-display-md mb-2">Wipe Reveal</h2>
                  <p className="text-muted-foreground text-sm">
                    A solid overlay wipes away to reveal the content. Cinematic, dramatic, high-impact.
                  </p>
                  <div className="mt-6 flex gap-2">
                    <span className="px-3 py-1 text-xs bg-foreground/5 rounded-full">2s</span>
                    <span className="px-3 py-1 text-xs bg-foreground/5 rounded-full">Dramatic</span>
                  </div>
                </button>

                {/* Page Load Option 3: Logo Intro */}
                <button
                  onClick={() => playDemo("logo-intro")}
                  className="group relative overflow-hidden rounded-2xl bg-white/50 backdrop-blur-sm border border-foreground/10 p-8 text-left hover:bg-white/80 transition-all hover:scale-[1.02] hover:shadow-xl"
                >
                  <div className="flex items-start justify-between mb-4">
                    <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Option 3</span>
                    <Play className="w-5 h-5 text-primary opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                  <h2 className="text-display-md mb-2">Logo Intro</h2>
                  <p className="text-muted-foreground text-sm">
                    FOM logo animates center-screen, then expands to reveal the page. Brand-focused, memorable.
                  </p>
                  <div className="mt-6 flex gap-2">
                    <span className="px-3 py-1 text-xs bg-foreground/5 rounded-full">3s</span>
                    <span className="px-3 py-1 text-xs bg-foreground/5 rounded-full">Brand</span>
                  </div>
                </button>

                {/* Page Load Option 4: Stagger Cascade */}
                <button
                  onClick={() => playDemo("stagger-cascade")}
                  className="group relative overflow-hidden rounded-2xl bg-white/50 backdrop-blur-sm border border-foreground/10 p-8 text-left hover:bg-white/80 transition-all hover:scale-[1.02] hover:shadow-xl"
                >
                  <div className="flex items-start justify-between mb-4">
                    <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Option 4</span>
                    <Play className="w-5 h-5 text-primary opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                  <h2 className="text-display-md mb-2">Stagger Cascade</h2>
                  <p className="text-muted-foreground text-sm">
                    Each element has distinct motion and timing. Theatrical, playful, dynamic.
                  </p>
                  <div className="mt-6 flex gap-2">
                    <span className="px-3 py-1 text-xs bg-foreground/5 rounded-full">3.5s</span>
                    <span className="px-3 py-1 text-xs bg-foreground/5 rounded-full">Creative</span>
                  </div>
                </button>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Demo Previews - Page Load */}
      <AnimatePresence mode="wait">
        {activeDemo === "fade-rise" && <FadeRiseDemo key={`fade-${demoKey}`} />}
        {activeDemo === "wipe-reveal" && <WipeRevealDemo key={`wipe-${demoKey}`} />}
        {activeDemo === "logo-intro" && <LogoIntroDemo key={`logo-${demoKey}`} />}
        {activeDemo === "stagger-cascade" && <StaggerCascadeDemo key={`stagger-${demoKey}`} />}
        {/* Hero Demos */}
        {activeDemo === "orchestrated-stagger" && <OrchestratedStaggerDemo key={`orch-${demoKey}`} />}
        {activeDemo === "logo-hero" && <LogoHeroDemo key={`logoh-${demoKey}`} />}
        {activeDemo === "cinematic-parallax" && <CinematicParallaxDemo key={`cine-${demoKey}`} />}
        {activeDemo === "typewriter-tagline" && <TypewriterTaglineDemo key={`type-${demoKey}`} />}
      </AnimatePresence>
    </div>
  );
};

// Demo 1: Fade & Rise
const FadeRiseDemo = () => {
  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2, delayChildren: 0.1 },
    },
  };

  const fadeUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 1, ease: liquidEase }
    },
  };

  const fadeDown = {
    hidden: { opacity: 0, y: -20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.8, ease: liquidEase }
    },
  };

  return (
    <motion.div
      className="min-h-screen flex flex-col"
      variants={staggerContainer}
      initial="hidden"
      animate="visible"
    >
      {/* Navbar placeholder */}
      <motion.div variants={fadeDown} className="p-4">
        <div className="glass rounded-xl py-4 px-6 flex items-center justify-between max-w-6xl mx-auto">
          <img src={FomLogo} alt="FOM" className="h-5" />
          <div className="flex gap-6">
            <div className="w-16 h-4 bg-foreground/10 rounded-full" />
            <div className="w-16 h-4 bg-foreground/10 rounded-full" />
            <div className="w-16 h-4 bg-foreground/10 rounded-full" />
          </div>
        </div>
      </motion.div>

      {/* Hero content */}
      <div className="flex-1 flex flex-col items-center justify-center p-8 gap-8">
        <motion.p variants={fadeUp} className="text-label text-muted-foreground">
          THE FUTURE OF MARKETING
        </motion.p>
        
        <motion.div variants={fadeUp} className="text-center">
          <div className="w-64 h-16 bg-foreground/10 rounded-xl mx-auto mb-4" />
          <div className="w-48 h-8 bg-foreground/5 rounded-lg mx-auto" />
        </motion.div>

        <motion.div variants={fadeUp} className="flex gap-6 mt-8">
          <div className="w-48 h-64 bg-foreground/10 rounded-2xl" />
          <div className="w-48 h-64 bg-foreground/10 rounded-2xl" />
          <div className="w-48 h-64 bg-foreground/10 rounded-2xl" />
        </motion.div>
      </div>

      <motion.p 
        variants={fadeUp}
        className="text-center text-sm text-muted-foreground pb-8"
      >
        Fade & Rise — Elements rise up smoothly in sequence
      </motion.p>
    </motion.div>
  );
};

// Demo 2: Wipe Reveal
const WipeRevealDemo = () => {
  return (
    <div className="min-h-screen relative">
      {/* Content (revealed) */}
      <div className="min-h-screen flex flex-col">
        <div className="p-4">
          <div className="glass rounded-xl py-4 px-6 flex items-center justify-between max-w-6xl mx-auto">
            <img src={FomLogo} alt="FOM" className="h-5" />
            <div className="flex gap-6">
              <div className="w-16 h-4 bg-foreground/10 rounded-full" />
              <div className="w-16 h-4 bg-foreground/10 rounded-full" />
              <div className="w-16 h-4 bg-foreground/10 rounded-full" />
            </div>
          </div>
        </div>

        <div className="flex-1 flex flex-col items-center justify-center p-8 gap-8">
          <p className="text-label text-muted-foreground">THE FUTURE OF MARKETING</p>
          <div className="text-center">
            <div className="w-64 h-16 bg-foreground/10 rounded-xl mx-auto mb-4" />
            <div className="w-48 h-8 bg-foreground/5 rounded-lg mx-auto" />
          </div>
          <div className="flex gap-6 mt-8">
            <div className="w-48 h-64 bg-foreground/10 rounded-2xl" />
            <div className="w-48 h-64 bg-foreground/10 rounded-2xl" />
            <div className="w-48 h-64 bg-foreground/10 rounded-2xl" />
          </div>
        </div>

        <p className="text-center text-sm text-muted-foreground pb-8">
          Wipe Reveal — Curtain wipes away to reveal content
        </p>
      </div>

      {/* Wipe overlay */}
      <motion.div
        className="fixed inset-0 bg-foreground z-40 origin-left"
        initial={{ scaleX: 1 }}
        animate={{ scaleX: 0 }}
        transition={{ duration: 1.2, ease: liquidEase, delay: 0.3 }}
      />
      
      {/* Secondary wipe for depth */}
      <motion.div
        className="fixed inset-0 bg-primary z-30 origin-left"
        initial={{ scaleX: 1 }}
        animate={{ scaleX: 0 }}
        transition={{ duration: 1.4, ease: liquidEase, delay: 0.2 }}
      />
    </div>
  );
};

// Demo 3: Logo Intro
const LogoIntroDemo = () => {
  return (
    <div className="min-h-screen relative">
      {/* Content (fades in after logo) */}
      <motion.div 
        className="min-h-screen flex flex-col"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 2 }}
      >
        <div className="p-4">
          <div className="glass rounded-xl py-4 px-6 flex items-center justify-between max-w-6xl mx-auto">
            <img src={FomLogo} alt="FOM" className="h-5" />
            <div className="flex gap-6">
              <div className="w-16 h-4 bg-foreground/10 rounded-full" />
              <div className="w-16 h-4 bg-foreground/10 rounded-full" />
              <div className="w-16 h-4 bg-foreground/10 rounded-full" />
            </div>
          </div>
        </div>

        <div className="flex-1 flex flex-col items-center justify-center p-8 gap-8">
          <p className="text-label text-muted-foreground">THE FUTURE OF MARKETING</p>
          <div className="text-center">
            <div className="w-64 h-16 bg-foreground/10 rounded-xl mx-auto mb-4" />
            <div className="w-48 h-8 bg-foreground/5 rounded-lg mx-auto" />
          </div>
          <div className="flex gap-6 mt-8">
            <div className="w-48 h-64 bg-foreground/10 rounded-2xl" />
            <div className="w-48 h-64 bg-foreground/10 rounded-2xl" />
            <div className="w-48 h-64 bg-foreground/10 rounded-2xl" />
          </div>
        </div>

        <p className="text-center text-sm text-muted-foreground pb-8">
          Logo Intro — Brand-focused reveal from center
        </p>
      </motion.div>

      {/* Logo overlay */}
      <motion.div
        className="fixed inset-0 bg-foreground z-40 flex items-center justify-center"
        initial={{ opacity: 1 }}
        animate={{ opacity: 0 }}
        transition={{ duration: 0.6, delay: 1.8 }}
        style={{ pointerEvents: "none" }}
      >
        <motion.img
          src={FomLogo}
          alt="FOM"
          className="h-16 invert"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ 
            scale: [0.8, 1, 1.5],
            opacity: [0, 1, 0]
          }}
          transition={{ 
            duration: 2,
            times: [0, 0.4, 1],
            ease: liquidEase
          }}
        />
      </motion.div>
    </div>
  );
};

// Demo 4: Stagger Cascade
const StaggerCascadeDemo = () => {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Navbar - slides down */}
      <motion.div 
        className="p-4"
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: liquidEase, delay: 0.2 }}
      >
        <div className="glass rounded-xl py-4 px-6 flex items-center justify-between max-w-6xl mx-auto">
          <motion.img 
            src={FomLogo} 
            alt="FOM" 
            className="h-5"
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.6 }}
          />
          <motion.div 
            className="flex gap-6"
            initial={{ x: 20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.8 }}
          >
            <div className="w-16 h-4 bg-foreground/10 rounded-full" />
            <div className="w-16 h-4 bg-foreground/10 rounded-full" />
            <div className="w-16 h-4 bg-foreground/10 rounded-full" />
          </motion.div>
        </div>
      </motion.div>

      {/* Hero content */}
      <div className="flex-1 flex flex-col items-center justify-center p-8 gap-8">
        {/* Label - types in effect */}
        <motion.p 
          className="text-label text-muted-foreground overflow-hidden"
          initial={{ width: 0 }}
          animate={{ width: "auto" }}
          transition={{ duration: 1, delay: 0.4 }}
          style={{ whiteSpace: "nowrap" }}
        >
          THE FUTURE OF MARKETING
        </motion.p>
        
        {/* Logo area - scales with bounce */}
        <motion.div 
          className="text-center"
          initial={{ scale: 0, rotate: -10 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ 
            type: "spring",
            stiffness: 200,
            damping: 15,
            delay: 0.8
          }}
        >
          <div className="w-64 h-16 bg-foreground/10 rounded-xl mx-auto mb-4" />
          <div className="w-48 h-8 bg-foreground/5 rounded-lg mx-auto" />
        </motion.div>

        {/* Cards - flip in from different angles */}
        <div className="flex gap-6 mt-8">
          <motion.div 
            className="w-48 h-64 bg-foreground/10 rounded-2xl"
            initial={{ rotateY: 90, opacity: 0, x: -50 }}
            animate={{ rotateY: 0, opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 1.4 }}
          />
          <motion.div 
            className="w-48 h-64 bg-foreground/10 rounded-2xl"
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 1.6 }}
          />
          <motion.div 
            className="w-48 h-64 bg-foreground/10 rounded-2xl"
            initial={{ rotateY: -90, opacity: 0, x: 50 }}
            animate={{ rotateY: 0, opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 1.8 }}
          />
        </div>
      </div>

      <motion.p 
        className="text-center text-sm text-muted-foreground pb-8"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.2 }}
      >
        Stagger Cascade — Each element has distinct motion
      </motion.p>
    </div>
  );
};

// ===== HERO ANIMATION DEMOS =====

// Hero Demo 1: Orchestrated Stagger
const OrchestratedStaggerDemo = () => {
  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.3, delayChildren: 0.2 },
    },
  };

  const fadeUp = {
    hidden: { opacity: 0, y: 40 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 1.1, ease: liquidEase }
    },
  };

  const scaleIn = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: { 
      opacity: 1, 
      scale: 1,
      transition: { duration: 1.2, ease: liquidEase }
    },
  };

  return (
    <motion.div
      className="min-h-screen flex flex-col pt-20"
      variants={staggerContainer}
      initial="hidden"
      animate="visible"
    >
      <div className="container mx-auto px-6 flex-1 flex flex-col">
        {/* Top row: Tagline */}
        <motion.div variants={fadeUp} className="flex justify-between items-start mb-20">
          <h1 className="font-display text-2xl font-medium uppercase tracking-tight leading-[1.1]">
            A Podcast<br />
            Series on How<br />
            AI is Changing<br />
            Marketing
          </h1>
          <p className="text-label">The Future of Marketing</p>
        </motion.div>

        {/* Large FOM Icon */}
        <motion.div variants={scaleIn} className="flex justify-center mb-16">
          <img 
            src={FOMIcon} 
            alt="Future of Marketing" 
            className="w-full max-w-2xl h-auto"
          />
        </motion.div>

        {/* Host Cards */}
        <div className="grid grid-cols-3 gap-6">
          {hosts.map((host, index) => (
            <motion.div
              key={host.name}
              variants={fadeUp}
              custom={index}
              className="card-base card-image aspect-[3/4] overflow-hidden rounded-2xl"
            >
              <img 
                src={host.image} 
                alt={host.name}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
              <div className="absolute bottom-4 left-4 right-4">
                <h3 className="text-white font-display text-xl font-medium">{host.name}</h3>
                <p className="text-white/80 text-sm">{host.title}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <motion.p 
        variants={fadeUp}
        className="text-center text-sm text-muted-foreground pb-8 mt-8"
      >
        Orchestrated Stagger — Elements reveal in choreographed sequence
      </motion.p>
    </motion.div>
  );
};

// Hero Demo 2: Logo Hero Moment
const LogoHeroDemo = () => {
  return (
    <div className="min-h-screen relative">
      {/* Content (revealed after logo) */}
      <motion.div 
        className="min-h-screen flex flex-col pt-20"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 2.2 }}
      >
        <div className="container mx-auto px-6 flex-1 flex flex-col">
          <motion.div 
            className="flex justify-between items-start mb-20"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 2.4 }}
          >
            <h1 className="font-display text-2xl font-medium uppercase tracking-tight leading-[1.1]">
              A Podcast<br />
              Series on How<br />
              AI is Changing<br />
              Marketing
            </h1>
            <p className="text-label">The Future of Marketing</p>
          </motion.div>

          <motion.div 
            className="flex justify-center mb-16"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 2.6 }}
          >
            <img 
              src={FOMIcon} 
              alt="Future of Marketing" 
              className="w-full max-w-2xl h-auto"
            />
          </motion.div>

          <div className="grid grid-cols-3 gap-6">
            {hosts.map((host, index) => (
              <motion.div
                key={host.name}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 2.8 + index * 0.15 }}
                className="card-base card-image aspect-[3/4] overflow-hidden rounded-2xl"
              >
                <img 
                  src={host.image} 
                  alt={host.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                <div className="absolute bottom-4 left-4 right-4">
                  <h3 className="text-white font-display text-xl font-medium">{host.name}</h3>
                  <p className="text-white/80 text-sm">{host.title}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        <p className="text-center text-sm text-muted-foreground pb-8 mt-8">
          Logo Hero Moment — Brand-focused dramatic reveal
        </p>
      </motion.div>

      {/* Logo overlay with dramatic animation */}
      <motion.div
        className="fixed inset-0 bg-foreground z-40 flex items-center justify-center"
        initial={{ opacity: 1 }}
        animate={{ opacity: 0 }}
        transition={{ duration: 0.5, delay: 2 }}
        style={{ pointerEvents: "none" }}
      >
        <motion.img
          src={FOMIcon}
          alt="FOM"
          className="w-64 invert"
          initial={{ scale: 0.5, opacity: 0, rotate: -5 }}
          animate={{ 
            scale: [0.5, 1, 1.2],
            opacity: [0, 1, 0],
            rotate: [-5, 0, 0]
          }}
          transition={{ 
            duration: 2.2,
            times: [0, 0.5, 1],
            ease: liquidEase
          }}
        />
      </motion.div>
    </div>
  );
};

// Hero Demo 3: Cinematic Parallax
const CinematicParallaxDemo = () => {
  return (
    <motion.div className="min-h-screen flex flex-col pt-20 relative overflow-hidden">
      <div className="container mx-auto px-6 flex-1 flex flex-col">
        {/* Tagline - floats in from left */}
        <motion.div 
          className="flex justify-between items-start mb-20"
          initial={{ opacity: 0, x: -60 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1.2, ease: liquidEase, delay: 0.3 }}
        >
          <h1 className="font-display text-2xl font-medium uppercase tracking-tight leading-[1.1]">
            A Podcast<br />
            Series on How<br />
            AI is Changing<br />
            Marketing
          </h1>
          <motion.p 
            className="text-label"
            initial={{ opacity: 0, x: 60 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1.2, ease: liquidEase, delay: 0.5 }}
          >
            The Future of Marketing
          </motion.p>
        </motion.div>

        {/* Logo - scales from back (deeper layer feel) */}
        <motion.div 
          className="flex justify-center mb-16"
          initial={{ opacity: 0, scale: 0.7, y: 40 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 1.4, ease: liquidEase, delay: 0.1 }}
        >
          <img 
            src={FOMIcon} 
            alt="Future of Marketing" 
            className="w-full max-w-2xl h-auto"
          />
        </motion.div>

        {/* Host Cards - stagger from bottom with different depths */}
        <div className="grid grid-cols-3 gap-6">
          {hosts.map((host, index) => (
            <motion.div
              key={host.name}
              initial={{ 
                opacity: 0, 
                y: 80 + index * 20, 
                scale: 0.9 
              }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ 
                duration: 1, 
                ease: liquidEase, 
                delay: 0.6 + index * 0.2 
              }}
              className="card-base card-image aspect-[3/4] overflow-hidden rounded-2xl"
            >
              <img 
                src={host.image} 
                alt={host.name}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
              <div className="absolute bottom-4 left-4 right-4">
                <h3 className="text-white font-display text-xl font-medium">{host.name}</h3>
                <p className="text-white/80 text-sm">{host.title}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <motion.p 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="text-center text-sm text-muted-foreground pb-8 mt-8"
      >
        Cinematic Parallax — Layered depth with dimensional movement
      </motion.p>
    </motion.div>
  );
};

// Hero Demo 4: Typewriter Tagline
const TypewriterTaglineDemo = () => {
  const taglineWords = ["A Podcast", "Series on How", "AI is Changing", "Marketing"];
  
  return (
    <motion.div className="min-h-screen flex flex-col pt-20">
      <div className="container mx-auto px-6 flex-1 flex flex-col">
        {/* Tagline - typewriter effect word by word */}
        <div className="flex justify-between items-start mb-20">
          <h1 className="font-display text-2xl font-medium uppercase tracking-tight leading-[1.1]">
            {taglineWords.map((word, lineIndex) => (
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
                  {word.split("").map((char, charIndex) => (
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
            className="text-label"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2 }}
          >
            The Future of Marketing
          </motion.p>
        </div>

        {/* Logo - gentle fade and rise */}
        <motion.div 
          className="flex justify-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: liquidEase, delay: 1.4 }}
        >
          <img 
            src={FOMIcon} 
            alt="Future of Marketing" 
            className="w-full max-w-2xl h-auto"
          />
        </motion.div>

        {/* Host Cards - cascade up */}
        <div className="grid grid-cols-3 gap-6">
          {hosts.map((host, index) => (
            <motion.div
              key={host.name}
              initial={{ opacity: 0, y: 60 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ 
                duration: 0.8, 
                ease: liquidEase, 
                delay: 2 + index * 0.2 
              }}
              className="card-base card-image aspect-[3/4] overflow-hidden rounded-2xl"
            >
              <img 
                src={host.image} 
                alt={host.name}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
              <div className="absolute bottom-4 left-4 right-4">
                <h3 className="text-white font-display text-xl font-medium">{host.name}</h3>
                <p className="text-white/80 text-sm">{host.title}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <motion.p 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.8 }}
        className="text-center text-sm text-muted-foreground pb-8 mt-8"
      >
        Typewriter Tagline — Dynamic text reveal with cascading cards
      </motion.p>
    </motion.div>
  );
};

export default AnimationDemo;

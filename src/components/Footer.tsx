import { useState, useRef } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import FomIcon from "@/assets/FOM_Icon.svg";
import { useSubscribe } from "@/contexts/SubscribeContext";

const fullLogoMask = `url("data:image/svg+xml,%3Csvg width='598' height='186' viewBox='0 0 598 186' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M448.5 0H411.125V186H448.5V0Z' fill='black'/%3E%3Cpath d='M0 -4.57764e-05L0 37.2L149.5 37.2V-4.57764e-05L0 -4.57764e-05Z' fill='black'/%3E%3Cpath d='M0 74.3806L0 111.581L149.5 111.581V74.3806H0Z' fill='black'/%3E%3Cpath d='M0 148.8L0 186H73.6799V148.8H0Z' fill='black'/%3E%3Cpath d='M523.25 0H485.875V186H523.25V0Z' fill='black'/%3E%3Cpath d='M598 0H560.625V186H598V0Z' fill='black'/%3E%3Cpath d='M280.322 37.2C311.238 37.2 336.394 62.2388 336.394 93.0097C336.394 123.781 311.238 148.819 280.322 148.819C249.407 148.819 224.25 123.781 224.25 93.0097C224.25 62.2388 249.407 37.2 280.322 37.2ZM280.322 0C228.705 0 186.875 41.6346 186.875 93.0097C186.875 144.385 228.705 186.019 280.322 186.019C331.939 186.019 373.769 144.385 373.769 93.0097C373.769 41.6346 331.92 0 280.322 0Z' fill='black'/%3E%3C/svg%3E")`;

const GRADIENT_COLORS = [
  [255, 100, 80],
  [255, 60, 120],
  [255, 160, 40],
  [255, 180, 60],
];

const lerpColor = (a: number[], b: number[], t: number) =>
  a.map((v, i) => Math.round(v + (b[i] - v) * t));

const getColor = (offset: number) => {
  const len = GRADIENT_COLORS.length;
  const i = ((Math.floor(offset) % len) + len) % len;
  const next = (i + 1) % len;
  const t = offset - Math.floor(offset);
  return lerpColor(GRADIENT_COLORS[i], GRADIENT_COLORS[next], t);
};

const AnimatedFooterLogo = () => {
  const [isHovered, setIsHovered] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const animFrameRef = useRef<number>(0);
  const startTimeRef = useRef<number>(0);
  const targetPosRef = useRef({ x: 50, y: 50 });
  const currentPosRef = useRef({ x: 50, y: 50 });
  const renderPosRef = useRef({ x: 50, y: 50 });
  const colorOffsetRef = useRef(0);
  const [, forceRender] = useState(0);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    targetPosRef.current = {
      x: ((e.clientX - rect.left) / rect.width) * 100,
      y: ((e.clientY - rect.top) / rect.height) * 100,
    };
  };

  const startAnimation = () => {
    startTimeRef.current = performance.now();
    let lastTime = performance.now();
    const tick = (now: number) => {
      const dt = Math.min((now - lastTime) / 16.667, 3);
      lastTime = now;
      const elapsed = (now - startTimeRef.current) / 1000;
      colorOffsetRef.current = elapsed * 0.35 + Math.sin(elapsed * 0.7) * 0.15;
      // Eased position interpolation
      const cur = currentPosRef.current;
      const tgt = targetPosRef.current;
      const dx = tgt.x - cur.x;
      const dy = tgt.y - cur.y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      const easeFactor = 0.04 + 0.08 * Math.min(dist / 100, 1);
      cur.x += dx * easeFactor * dt;
      cur.y += dy * easeFactor * dt;
      renderPosRef.current = { x: cur.x, y: cur.y };
      forceRender(n => n + 1);
      animFrameRef.current = requestAnimationFrame(tick);
    };
    animFrameRef.current = requestAnimationFrame(tick);
  };

  const stopAnimation = () => {
    cancelAnimationFrame(animFrameRef.current);
  };

  const handleEnter = () => {
    setIsHovered(true);
    startAnimation();
  };

  const handleLeave = () => {
    setIsHovered(false);
    targetPosRef.current = { x: 50, y: 50 };
    stopAnimation();
  };

  const offset = colorOffsetRef.current;
  const pos = renderPosRef.current;
  const c0 = getColor(offset);
  const c1 = getColor(offset + 0.8);
  const c2 = getColor(offset + 1.6);
  const c3 = getColor(offset + 2.4);

  const gradientBg = `radial-gradient(ellipse 80% 150% at ${pos.x}% ${pos.y}%, rgb(${c0.join(',')}) 0%, rgb(${c1.join(',')}) 20%, rgb(${c2.join(',')}) 40%, rgb(${c3.join(',')}) 60%, rgba(0,0,0,1) 100%)`;

  return (
    <div
      ref={containerRef}
      className="relative w-full"
      onMouseEnter={handleEnter}
      onMouseLeave={handleLeave}
      onMouseMove={handleMouseMove}
    >
      <img
        src={FomIcon}
        alt="Future of Marketing"
        className="w-full select-none"
      />
      {/* Animated gradient overlay */}
      <motion.div
        className="absolute inset-0 w-full h-full"
        style={{
          background: gradientBg,
          maskImage: fullLogoMask,
          maskSize: '100% 100%',
          maskRepeat: 'no-repeat',
          maskPosition: 'left center',
          WebkitMaskImage: fullLogoMask,
          WebkitMaskSize: '100% 100%',
          WebkitMaskRepeat: 'no-repeat',
          WebkitMaskPosition: 'left center',
        }}
        initial={{ opacity: 0 }}
        animate={{ opacity: isHovered ? 1 : 0 }}
        transition={{ opacity: { duration: 0.6, delay: isHovered ? 0.15 : 0, ease: [0.22, 1, 0.36, 1] } }}
      />
      {/* Black gradient overlay for depth */}
      <motion.div
        className="absolute inset-0 w-full h-full"
        style={{
          background: `radial-gradient(ellipse 120% 200% at ${pos.x}% ${pos.y}%, rgba(0,0,0,1) 0%, rgba(0,0,0,0.6) 40%, rgba(0,0,0,0) 80%)`,
          maskImage: fullLogoMask,
          maskSize: '100% 100%',
          maskRepeat: 'no-repeat',
          maskPosition: 'left center',
          WebkitMaskImage: fullLogoMask,
          WebkitMaskSize: '100% 100%',
          WebkitMaskRepeat: 'no-repeat',
          WebkitMaskPosition: 'left center',
        }}
        initial={{ opacity: 0 }}
        animate={{ opacity: isHovered ? 1 : 0 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      />
    </div>
  );
};

const Footer = () => {
  const { openSubscribe } = useSubscribe();
  const location = useLocation();
  const navigate = useNavigate();
  const isHomePage = location.pathname === "/";

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    if (isHomePage) {
      const element = document.querySelector(href);
      element?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    } else {
      navigate('/');
      requestAnimationFrame(() => {
        setTimeout(() => {
          const element = document.querySelector(href);
          element?.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }, 100);
      });
    }
  };

  return (
    <footer className="border-t border-foreground/10 pt-16 sm:pt-20 lg:pt-24 pb-0 overflow-hidden">
      <div className="container mx-auto container-padding">
        {/* Top section: tagline + nav links */}
        <div className="flex flex-col md:flex-row justify-between gap-10 md:gap-16 mb-16 sm:mb-20 lg:mb-28">
          {/* Tagline */}
          <p className="text-lg sm:text-xl lg:text-2xl font-normal text-foreground max-w-[220px] sm:max-w-[260px]">
            A podcast series on how AI is changing marketing
          </p>

          {/* Nav links */}
          <ul className="flex flex-col gap-1 text-body text-foreground/70">
            <li><a href="#podcast" onClick={(e) => handleNavClick(e, '#podcast')} className="hover:text-foreground transition-colors duration-300">Podcast</a></li>
            <li><a href="#events" onClick={(e) => handleNavClick(e, '#events')} className="hover:text-foreground transition-colors duration-300">Events</a></li>
            <li><a href="#contact" onClick={(e) => handleNavClick(e, '#contact')} className="hover:text-foreground transition-colors duration-300">Connect</a></li>
            <li><button onClick={openSubscribe} className="hover:text-foreground transition-colors duration-300 text-left">Subscribe</button></li>
            <li><Link to="/privacy" className="hover:text-foreground transition-colors duration-300">Privacy</Link></li>
          </ul>
        </div>
      </div>

      {/* Giant FOM logo + copyright */}
      <div className="container mx-auto container-padding">
        <AnimatedFooterLogo />
        <p className="text-body-sm text-foreground/40 py-6 sm:py-8">© {new Date().getFullYear()} Future of Marketing. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;

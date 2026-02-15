import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import FomIcon from "@/assets/FOM_Icon.svg";
import { useSubscribe } from "@/contexts/SubscribeContext";
import { liquidEase } from "@/components/animations/PageLoadAnimation";

const fullLogoMask = `url("data:image/svg+xml,%3Csvg width='598' height='186' viewBox='0 0 598 186' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M448.5 0H411.125V186H448.5V0Z' fill='black'/%3E%3Cpath d='M0 -4.57764e-05L0 37.2L149.5 37.2V-4.57764e-05L0 -4.57764e-05Z' fill='black'/%3E%3Cpath d='M0 74.3806L0 111.581L149.5 111.581V74.3806H0Z' fill='black'/%3E%3Cpath d='M0 148.8L0 186H73.6799V148.8H0Z' fill='black'/%3E%3Cpath d='M523.25 0H485.875V186H523.25V0Z' fill='black'/%3E%3Cpath d='M598 0H560.625V186H598V0Z' fill='black'/%3E%3Cpath d='M280.322 37.2C311.238 37.2 336.394 62.2388 336.394 93.0097C336.394 123.781 311.238 148.819 280.322 148.819C249.407 148.819 224.25 123.781 224.25 93.0097C224.25 62.2388 249.407 37.2 280.322 37.2ZM280.322 0C228.705 0 186.875 41.6346 186.875 93.0097C186.875 144.385 228.705 186.019 280.322 186.019C331.939 186.019 373.769 144.385 373.769 93.0097C373.769 41.6346 331.92 0 280.322 0Z' fill='black'/%3E%3C/svg%3E")`;

const maskStyles: React.CSSProperties = {
  maskImage: fullLogoMask,
  maskSize: '100% 100%',
  maskRepeat: 'no-repeat',
  maskPosition: 'left center',
  WebkitMaskImage: fullLogoMask,
  WebkitMaskSize: '100% 100%',
  WebkitMaskRepeat: 'no-repeat',
  WebkitMaskPosition: 'left center',
};

const AnimatedFooterLogo = () => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className="relative w-full"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <img
        src={FomIcon}
        alt="Future of Marketing"
        className="w-full select-none"
      />
      <motion.div
        className="absolute inset-0 w-full h-full"
        style={{ aspectRatio: '598 / 186', ...maskStyles }}
        initial={{ opacity: 0 }}
        animate={isHovered ? {
          opacity: 1,
          background: [
            'linear-gradient(135deg, rgb(255,100,80) 0%, rgb(255,60,120) 50%, rgb(100,140,255) 100%)',
            'linear-gradient(135deg, rgb(255,60,120) 0%, rgb(100,140,255) 50%, rgb(255,180,60) 100%)',
            'linear-gradient(135deg, rgb(100,140,255) 0%, rgb(255,180,60) 50%, rgb(255,100,80) 100%)',
            'linear-gradient(135deg, rgb(255,180,60) 0%, rgb(255,100,80) 50%, rgb(255,60,120) 100%)',
            'linear-gradient(135deg, rgb(255,100,80) 0%, rgb(255,60,120) 50%, rgb(100,140,255) 100%)',
          ],
        } : { opacity: 0 }}
        transition={isHovered ? {
          opacity: { duration: 0.4, delay: 0.15 },
          background: { duration: 5, ease: 'easeInOut', repeat: Infinity, delay: 0.15 }
        } : { opacity: { duration: 0.8 } }}
      />
      <motion.div
        className="absolute inset-0 w-full h-full"
        style={{
          aspectRatio: '598 / 186',
          background: 'linear-gradient(135deg, rgba(0,0,0,1) 0%, rgba(0,0,0,0.8) 50%, rgba(0,0,0,0) 100%)',
          ...maskStyles,
        }}
        initial={{ opacity: 0 }}
        animate={{ opacity: isHovered ? 1 : 0 }}
        transition={{ duration: isHovered ? 0.4 : 0.8, ease: liquidEase }}
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
    <footer className="pt-16 sm:pt-20 lg:pt-24 pb-0 overflow-hidden">
      <div className="container mx-auto container-padding">
        {/* Top section: tagline + nav links */}
        <motion.div
          className="flex flex-col md:flex-row justify-between gap-10 md:gap-16 mb-16 sm:mb-20 lg:mb-28"
          initial={{ opacity: 0, y: -16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: liquidEase }}
        >
          {/* Tagline */}
          <p className="text-lg sm:text-xl lg:text-2xl font-normal text-foreground max-w-[220px] sm:max-w-[260px]">
            A podcast series on how AI is changing marketing
          </p>

          {/* Nav links */}
          <ul className="flex flex-col gap-1 text-body text-foreground/70">
            <li><a href="#podcast" onClick={(e) => handleNavClick(e, '#podcast')} className="relative hover:text-foreground transition-colors duration-300 group inline-flex"><span className="absolute right-full top-1/2 -translate-y-1/2 mr-3 h-[3px] rounded-full w-0 group-hover:w-5 transition-all duration-300 ease-smooth" style={{ backgroundColor: '#594881' }} />Podcast</a></li>
            <li><a href="#events" onClick={(e) => handleNavClick(e, '#events')} className="relative hover:text-foreground transition-colors duration-300 group inline-flex"><span className="absolute right-full top-1/2 -translate-y-1/2 mr-3 h-[3px] rounded-full w-0 group-hover:w-5 transition-all duration-300 ease-smooth" style={{ backgroundColor: '#9A5B77' }} />Events</a></li>
            <li><a href="#contact" onClick={(e) => handleNavClick(e, '#contact')} className="relative hover:text-foreground transition-colors duration-300 group inline-flex"><span className="absolute right-full top-1/2 -translate-y-1/2 mr-3 h-[3px] rounded-full w-0 group-hover:w-5 transition-all duration-300 ease-smooth" style={{ backgroundColor: '#D4763A' }} />Connect</a></li>
            <li><button onClick={openSubscribe} className="relative hover:text-foreground transition-colors duration-300 text-left group inline-flex"><span className="absolute right-full top-1/2 -translate-y-1/2 mr-3 h-[3px] rounded-full w-0 group-hover:w-5 transition-all duration-300 ease-smooth" style={{ backgroundColor: '#B45250' }} />Subscribe</button></li>
            <li><Link to="/privacy" className="relative hover:text-foreground transition-colors duration-300 group inline-flex"><span className="absolute right-full top-1/2 -translate-y-1/2 mr-3 h-[3px] rounded-full w-0 group-hover:w-5 transition-all duration-300 ease-smooth" style={{ backgroundColor: '#3A7CA5' }} />Privacy</Link></li>
          </ul>
        </motion.div>
      </div>

      {/* Giant FOM logo + copyright */}
      <div className="container mx-auto container-padding">
        <motion.div
          initial={{ opacity: 0, y: -16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.2, ease: liquidEase }}
        >
          <AnimatedFooterLogo />
        </motion.div>
        <motion.div
          className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 py-6 sm:py-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.5, ease: liquidEase }}
        >
          <p className="text-body-sm text-foreground/40">
            © {new Date().getFullYear()} Future of Marketing. All rights reserved.
          </p>
          <p className="text-body-sm text-foreground/40">
            Brought to you by{" "}
            <a href="https://www.xyzvc.com" target="_blank" rel="noopener noreferrer" className="hover:text-foreground transition-colors duration-300">XYZ Venture Capital</a>,{" "}
            <a href="https://upside.tech" target="_blank" rel="noopener noreferrer" className="hover:text-foreground transition-colors duration-300">Upside</a>,{" "}
            <a href="https://www.graphitehq.com" target="_blank" rel="noopener noreferrer" className="hover:text-foreground transition-colors duration-300">Graphite</a>
          </p>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;

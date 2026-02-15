import { useRef } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { motion, useInView } from "framer-motion";
import FomIcon from "@/assets/FOM_Icon.svg";
import { useSubscribe } from "@/contexts/SubscribeContext";

const AnimatedFooterLogo = () => (
    <div className="relative w-full">
      <img
        src={FomIcon}
        alt="Future of Marketing"
        className="w-full select-none"
      />
  </div>
);

const liquidEase = [0.22, 1, 0.36, 1] as const;

const Footer = () => {
  const { openSubscribe } = useSubscribe();
  const location = useLocation();
  const navigate = useNavigate();
  const isHomePage = location.pathname === "/";
  const footerRef = useRef<HTMLElement>(null);
  const isInView = useInView(footerRef, { once: true, amount: 0.15 });

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
    <footer ref={footerRef} className="pt-16 sm:pt-20 lg:pt-24 pb-0 overflow-hidden">
      <div className="container mx-auto container-padding">
        {/* Top section: tagline + nav links */}
        <motion.div
          className="flex flex-col md:flex-row justify-between gap-10 md:gap-16 mb-16 sm:mb-20 lg:mb-28"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1, ease: liquidEase }}
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
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1.2, delay: 0.2, ease: liquidEase }}
        >
          <AnimatedFooterLogo />
        </motion.div>
        <motion.div
          className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 py-6 sm:py-8"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
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

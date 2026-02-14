import { useRef } from "react";
import { useInView } from "framer-motion";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useSubscribe } from "@/contexts/SubscribeContext";
import ParticleLogoCanvas from "@/components/animations/ParticleLogoCanvas";

const Footer = () => {
  const { openSubscribe } = useSubscribe();
  const location = useLocation();
  const navigate = useNavigate();
  const isHomePage = location.pathname === "/";

  const taglineRef = useRef<HTMLParagraphElement>(null);
  const navRef = useRef<HTMLUListElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);
  const taglineInView = useInView(taglineRef, { once: true, amount: 0.15 });
  const navInView = useInView(navRef, { once: true, amount: 0.15 });
  const logoInView = useInView(logoRef, { once: true, amount: 0.15 });

  const fadeUp = (inView: boolean, delay = 0): React.CSSProperties => ({
    opacity: inView ? 1 : 0,
    transform: inView ? 'translateY(0)' : 'translateY(24px)',
    transition: `opacity 0.7s cubic-bezier(0.22, 1, 0.36, 1) ${delay}s, transform 0.7s cubic-bezier(0.22, 1, 0.36, 1) ${delay}s`,
  });

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
          <p
            ref={taglineRef}
            style={fadeUp(taglineInView)}
            className="text-lg sm:text-xl lg:text-2xl font-normal text-foreground max-w-[220px] sm:max-w-[260px]"
          >
            A podcast series on how AI is changing marketing
          </p>

          {/* Nav links */}
          <ul ref={navRef} style={fadeUp(navInView, 0.1)} className="flex flex-col gap-1 text-body text-foreground/70">
            <li><a href="#podcast" onClick={(e) => handleNavClick(e, '#podcast')} className="hover:text-foreground transition-colors duration-300">Podcast</a></li>
            <li><a href="#events" onClick={(e) => handleNavClick(e, '#events')} className="hover:text-foreground transition-colors duration-300">Events</a></li>
            <li><a href="#contact" onClick={(e) => handleNavClick(e, '#contact')} className="hover:text-foreground transition-colors duration-300">Connect</a></li>
            <li><button onClick={openSubscribe} className="hover:text-foreground transition-colors duration-300 text-left">Subscribe</button></li>
            <li><Link to="/privacy" className="hover:text-foreground transition-colors duration-300">Privacy</Link></li>
          </ul>
        </div>
      </div>

      {/* Giant FOM logo + copyright */}
      <div ref={logoRef} className="container mx-auto container-padding relative">
        <div
          style={{
            opacity: logoInView ? 1 : 0,
            transition: 'opacity 0.3s ease',
          }}
        >
          <ParticleLogoCanvas className="relative" />
        </div>
        <p className="text-body-sm text-foreground/40 py-6 sm:py-8">© {new Date().getFullYear()} Future of Marketing. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;

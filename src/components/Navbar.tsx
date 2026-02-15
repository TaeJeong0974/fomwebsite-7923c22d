import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import FomLogo from "@/assets/FOM_Logo.svg";
import { useSubscribe } from "@/contexts/SubscribeContext";

import SubscribeButton from "@/components/SubscribeButton";
import { LiquidButton } from "@/components/ui/LiquidButton";
import { fadeDownVariant, liquidEase } from "@/components/animations/PageLoadAnimation";
import { fomLogoMask, fomMaskStyles } from "@/lib/logoMask";

// Animated Logo component with gradient animation on hover
const AnimatedLogo = ({ className }: { className?: string }) => {
  const [isHovered, setIsHovered] = useState(false);
  
  return (
    <div 
      className={`relative ${className}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Base static logo */}
      <img 
        src={FomLogo} 
        alt="Future of Marketing"
        className="h-full w-auto"
      />
      
      {/* Animated gradient overlay - masked by the shapes */}
      <motion.div 
        className="absolute inset-0 h-full"
        style={{
          aspectRatio: '598 / 186',
          ...fomMaskStyles,
        }}
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
          opacity: { duration: 0.25, delay: 0.15 },
          background: { duration: 3, ease: 'easeInOut', repeat: Infinity, delay: 0.15 }
        } : { opacity: { duration: 0.2 } }}
      />
      
      {/* Black gradient overlay for depth */}
      <motion.div 
        className="absolute inset-0 h-full"
        style={{
          aspectRatio: '598 / 186',
          background: 'linear-gradient(135deg, rgba(0,0,0,1) 0%, rgba(0,0,0,0.8) 50%, rgba(0,0,0,0) 100%)',
          ...fomMaskStyles,
        }}
        initial={{ opacity: 0 }}
        animate={{ opacity: isHovered ? 1 : 0 }}
        transition={{ duration: 0.25, ease: liquidEase }}
      />
    </div>
  );
};

const Navbar = () => {
  const { openSubscribe } = useSubscribe();
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState<string>("");
  const location = useLocation();
  const navigate = useNavigate();
  const isHomePage = location.pathname === "/";
  
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
      
      // Only track sections on homepage
      if (location.pathname !== "/") {
        setActiveSection("");
        return;
      }
      
      const sections = ["podcast", "events", "contact"];
      const windowHeight = window.innerHeight;
      
      // Find which section is most visible
      for (let i = sections.length - 1; i >= 0; i--) {
        const element = document.getElementById(sections[i]);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top < windowHeight / 2) {
            setActiveSection(`#${sections[i]}`);
            return;
          }
        }
      }
      setActiveSection("");
    };
    
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // Check initial position
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, [location.pathname]);
  
  const navLinks = [
    { label: "Podcast", href: "#podcast" },
    { label: "Events", href: "#events" },
    { label: "Connect", href: "#contact" },
  ];

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setIsOpen(false);
    
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
    <motion.header 
      initial="hidden"
      animate="visible"
      variants={fadeDownVariant}
      className={`z-50 transition-all duration-300 ${isScrolled ? 'fixed top-0 left-0 right-0' : 'relative'}`}
    >
      <div className="container mx-auto container-padding">
        {/* Nav with glass effect on scroll */}
        <nav className={`rounded-md py-3 lg:py-4 transition-all duration-300 ${isScrolled ? 'glass glass-hue-shadow bg-background/80 backdrop-blur-xl px-4 sm:px-5 lg:px-6 mt-4' : 'pt-5 lg:pt-6'}`}>
          {/* Mobile: Simple flex layout */}
          <div className="flex items-center justify-between md:hidden">
            <Link 
              to="/" 
              onClick={(e) => {
                if (isHomePage) {
                  e.preventDefault();
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                } else {
                  // Ensure scroll to top after navigation from detail pages
                  setTimeout(() => window.scrollTo(0, 0), 0);
                }
              }}
              className="flex items-center focus-ring rounded-lg"
            >
              <AnimatedLogo className="h-6 sm:h-[26px]" />
            </Link>

            <LiquidButton
              variant="glass"
              size="icon"
              className="h-10 w-10"
              onClick={() => setIsOpen(!isOpen)}
              aria-label="Toggle menu"
            >
              {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </LiquidButton>
          </div>

          {/* Desktop: Grid layout */}
          <div className="hidden md:grid grid-cols-3 items-center">
            {/* Logo - First column */}
            <Link 
              to="/" 
              onClick={(e) => {
                if (isHomePage) {
                  e.preventDefault();
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                } else {
                  // Ensure scroll to top after navigation from detail pages
                  setTimeout(() => window.scrollTo(0, 0), 0);
                }
              }}
              className="flex items-center focus-ring rounded-lg justify-self-start"
            >
              <AnimatedLogo className="h-[26px] lg:h-7" />
            </Link>

            {/* Desktop Navigation - Second column */}
            <ul className="flex items-center gap-6 justify-self-start">
              {navLinks.map((link, index) => (
                <motion.li 
                  key={link.label}
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ 
                    duration: 0.4, 
                    delay: 0.3 + index * 0.1,
                    ease: liquidEase 
                  }}
                >
                  <a
                    href={link.href}
                    onClick={(e) => handleNavClick(e, link.href)}
                    className={`relative text-[1em] font-medium focus-ring transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${
                      activeSection === link.href ? 'text-primary' : 'text-foreground hover:text-foreground/60'
                    }`}
                  >
                    {link.label}
                    <span 
                      className={`absolute -bottom-1 left-0 h-[2px] bg-primary transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${
                        activeSection === link.href ? 'w-full' : 'w-0'
                      }`}
                    />
                  </a>
                </motion.li>
              ))}
            </ul>

            {/* Desktop CTA - Third column */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.5, ease: liquidEase }}
              className="flex items-center gap-4 justify-self-end"
            >
              <SubscribeButton className="text-[1em] font-medium text-foreground">
                Subscribe
              </SubscribeButton>
            </motion.div>
          </div>

          {/* Mobile Navigation */}
          {isOpen && (
            <div className="md:hidden py-4 border-t border-border/50 mt-3">
              <ul className="flex flex-col gap-1">
                {navLinks.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      onClick={(e) => handleNavClick(e, link.href)}
                      className="block py-2 text-3xl text-foreground hover:text-primary hover:bg-secondary/50 rounded-xl hover-transition focus-ring"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
                <li className="pt-3">
                  <LiquidButton onClick={openSubscribe} variant="glass" size="lg" className="w-full">
                    Subscribe
                  </LiquidButton>
                </li>
              </ul>
            </div>
          )}
        </nav>
      </div>
    </motion.header>
  );
};

export default Navbar;

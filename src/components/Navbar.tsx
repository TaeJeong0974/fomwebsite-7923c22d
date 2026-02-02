import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import FomLogo from "@/assets/FOM_Logo.svg";
import { useSubscribe } from "@/contexts/SubscribeContext";
import SubscribeButton from "@/components/SubscribeButton";
import { fadeDownVariant, liquidEase } from "@/components/animations/PageLoadAnimation";

const Navbar = () => {
  const { openSubscribe } = useSubscribe();
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const isHomePage = location.pathname === "/";
  
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // Check initial position
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
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
        <nav className={`rounded-xl py-3 lg:py-4 transition-all duration-300 ${isScrolled ? 'glass bg-background/80 backdrop-blur-xl px-4 sm:px-5 lg:px-6 mt-4' : ''}`}>
          <div className={`grid grid-cols-3 items-center ${isScrolled ? '' : 'px-0'}`}>
            {/* Logo - First column */}
            <Link 
              to="/" 
              onClick={(e) => {
                if (isHomePage) {
                  e.preventDefault();
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }
              }}
              className="flex items-center focus-ring rounded-lg justify-self-start"
            >
              <img src={FomLogo} alt="Future of Marketing" className="h-14 sm:h-10 lg:h-8" />
            </Link>

            {/* Desktop Navigation - Second column, centered */}
            <ul className="hidden md:flex items-center gap-6 justify-self-center">
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
                    className="text-base lg:text-lg font-medium text-foreground hover:text-foreground/60 hover-transition focus-ring"
                  >
                    {link.label}
                  </a>
                </motion.li>
              ))}
            </ul>

            {/* Desktop CTA - Third column, aligned right */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.5, ease: liquidEase }}
              className="hidden md:flex items-center justify-self-end"
            >
              <SubscribeButton className="text-base lg:text-lg font-medium text-foreground hover:text-foreground/60 hover-transition">
                Subscribe
              </SubscribeButton>
            </motion.div>

            {/* Mobile Menu Button - Third column on mobile */}
            <button
              className="md:hidden p-2 rounded-full hover:bg-secondary/50 hover-transition focus-ring col-start-3 justify-self-end"
              onClick={() => setIsOpen(!isOpen)}
              aria-label="Toggle menu"
            >
              {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
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
                      className="block py-2 px-4 text-[1.2em] text-foreground hover:text-primary hover:bg-secondary/50 rounded-xl hover-transition focus-ring"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
                <li className="pt-3">
                  <button onClick={openSubscribe} className="btn-base btn-glass btn-md w-full">
                    Subscribe
                  </button>
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

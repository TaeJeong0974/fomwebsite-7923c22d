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
  const location = useLocation();
  const navigate = useNavigate();
  const isHomePage = location.pathname === "/";
  
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
      className="z-50 relative"
    >
      <div className="container mx-auto container-padding">
        <nav className="rounded-xl py-2 lg:py-3 pt-2 lg:pt-4">
          <div className="grid grid-cols-3 items-center px-0">
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
              <img src={FomLogo} alt="Future of Marketing" className="h-6 sm:h-6 lg:h-6 xl:h-7" />
            </Link>

            {/* Desktop Navigation - Second column, centered */}
            <ul className="hidden md:flex items-center gap-6 justify-self-start">
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
                    className="text-[1em] font-medium text-foreground hover:text-foreground/60 hover-transition focus-ring"
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
              className="hidden md:flex items-center gap-4 justify-self-end"
            >
              <SubscribeButton className="text-[1em] font-medium text-foreground hover:text-foreground/60 hover-transition">
                Subscribe
              </SubscribeButton>
            </motion.div>

            {/* Mobile Menu Button - Third column on mobile */}
            <button
              className="md:hidden p-2 rounded-full hover:bg-secondary/50 hover-transition focus-ring col-start-3 justify-self-end"
              onClick={() => setIsOpen(!isOpen)}
              aria-label="Toggle menu"
            >
              {isOpen ? <X className="h-7 w-7" /> : <Menu className="h-7 w-7" />}
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

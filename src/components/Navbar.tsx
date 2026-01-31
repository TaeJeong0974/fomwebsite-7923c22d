import { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import FomLogo from "@/assets/FOM_Logo.svg";
import { useSubscribe } from "@/contexts/SubscribeContext";
import SubscribeButton from "@/components/SubscribeButton";
import { fadeDownVariant, liquidEase } from "@/components/animations/PageLoadAnimation";

const Navbar = () => {
  const { openSubscribe } = useSubscribe();
  const [isOpen, setIsOpen] = useState(false);
  const navLinks = [
    { label: "Podcast", href: "#podcast" },
    { label: "Events", href: "#events" },
    { label: "Contact", href: "#contact" },
  ];

  return (
    <motion.header 
      initial="hidden"
      animate="visible"
      variants={fadeDownVariant}
      className="sticky top-4 z-50 mx-4 sm:mx-6 lg:mx-8"
    >
      <nav className="container mx-auto container-padding glass rounded-xl">
        <div className="grid grid-cols-3 items-center h-14 lg:h-16">
          {/* Logo - First column */}
          <Link to="/" className="flex items-center focus-ring rounded-lg justify-self-start">
            <img src={FomLogo} alt="Future of Marketing" className="h-5 lg:h-6" />
          </Link>

          {/* Desktop Navigation - Second column, aligned left */}
          <ul className="hidden md:flex items-center gap-1 justify-self-start">
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
                  className="text-base font-medium text-foreground hover:text-primary hover:bg-secondary/50 hover-transition px-4 py-2 rounded-full focus-ring"
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
            <SubscribeButton className="btn-base btn-glass btn-md">
              Subscribe
            </SubscribeButton>
          </motion.div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 -mr-2 rounded-full hover:bg-secondary/50 hover-transition focus-ring"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle menu"
          >
            {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden py-4 border-t border-border/50">
            <ul className="flex flex-col gap-1">
              {navLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="block py-2 px-4 text-foreground hover:text-primary hover:bg-secondary/50 rounded-xl hover-transition focus-ring"
                    onClick={() => setIsOpen(false)}
                  >
                    {link.label}
                  </a>
                </li>
              ))}
              <li className="pt-3 px-4">
                <button onClick={openSubscribe} className="btn-base btn-glass btn-md w-full">
                  Subscribe
                </button>
              </li>
            </ul>
          </div>
        )}
      </nav>
    </motion.header>
  );
};

export default Navbar;

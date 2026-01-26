import { useState } from "react";
import { Menu, X } from "lucide-react";
import FomLogo from "@/assets/FOM_Logo.svg";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = [
    { label: "Podcast", href: "#podcast" },
    { label: "Events", href: "#events" },
    { label: "About", href: "#about" },
    { label: "Contact", href: "#contact" },
  ];

  return (
    <header className="sticky top-4 z-50 mx-4 sm:mx-6 lg:mx-8">
      <nav className="container mx-auto px-4 sm:px-6 lg:px-8 glass rounded-2xl">
        <div className="flex items-center justify-between h-14 lg:h-16">
          {/* Logo */}
          <a href="/" className="flex items-center focus-ring rounded-lg">
            <img src={FomLogo} alt="Future of Marketing" className="h-5 lg:h-6" />
          </a>

          {/* Desktop Navigation */}
          <ul className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <li key={link.label}>
                <a
                  href={link.href}
                  className="text-body-sm text-muted-foreground hover:text-foreground hover:bg-secondary/50 hover-transition px-4 py-2 rounded-full focus-ring"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>

          {/* Desktop CTA */}
          <div className="hidden md:block">
            <button className="btn-base btn-glass btn-sm">
              Subscribe
            </button>
          </div>

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
                    className="block py-2 px-4 text-muted-foreground hover:text-foreground hover:bg-secondary/50 rounded-xl hover-transition focus-ring"
                    onClick={() => setIsOpen(false)}
                  >
                    {link.label}
                  </a>
                </li>
              ))}
              <li className="pt-3 px-4">
                <button className="btn-base btn-glass btn-sm w-full">
                  Subscribe
                </button>
              </li>
            </ul>
          </div>
        )}
      </nav>
    </header>
  );
};

export default Navbar;

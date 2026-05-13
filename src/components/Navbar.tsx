"use client";

import { motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
const FomLogo = "/images/assets/FOM_Logo.svg";
import { useSubscribe } from "@/contexts/SubscribeContext";

import SubscribeButton from "@/components/SubscribeButton";
import {
  fadeDownVariant,
  liquidEase,
} from "@/components/animations/PageLoadAnimation";
import { LiquidButton } from "@/components/ui/LiquidButton";
import { fomMaskStyles } from "@/lib/logoMask";

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
      <Image
        src={FomLogo}
        alt="Future of Marketing"
        fill
        className="object-contain"
      />

      {/* Animated gradient overlay - masked by the shapes */}
      <motion.div
        className="absolute inset-0 h-full"
        style={{
          aspectRatio: "598 / 186",
          ...fomMaskStyles,
        }}
        initial={{ opacity: 0 }}
        animate={
          isHovered
            ? {
                opacity: 1,
                background: [
                  "linear-gradient(135deg, rgb(255,100,80) 0%, rgb(255,60,120) 50%, rgb(100,140,255) 100%)",
                  "linear-gradient(135deg, rgb(255,60,120) 0%, rgb(100,140,255) 50%, rgb(255,180,60) 100%)",
                  "linear-gradient(135deg, rgb(100,140,255) 0%, rgb(255,180,60) 50%, rgb(255,100,80) 100%)",
                  "linear-gradient(135deg, rgb(255,180,60) 0%, rgb(255,100,80) 50%, rgb(255,60,120) 100%)",
                  "linear-gradient(135deg, rgb(255,100,80) 0%, rgb(255,60,120) 50%, rgb(100,140,255) 100%)",
                ],
              }
            : { opacity: 0 }
        }
        transition={
          isHovered
            ? {
                opacity: { duration: 0.25, delay: 0.15 },
                background: {
                  duration: 3,
                  ease: "easeInOut",
                  repeat: Number.POSITIVE_INFINITY,
                  delay: 0.15,
                },
              }
            : { opacity: { duration: 0.2 } }
        }
      />

      {/* Black gradient overlay for depth */}
      <motion.div
        className="absolute inset-0 h-full"
        style={{
          aspectRatio: "598 / 186",
          background:
            "linear-gradient(135deg, rgba(0,0,0,1) 0%, rgba(0,0,0,0.8) 50%, rgba(0,0,0,0) 100%)",
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
  const pathname = usePathname();
  const isHomePage = pathname === "/";

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);

      // Only track sections on homepage
      if (pathname !== "/") {
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

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll(); // Check initial position

    return () => window.removeEventListener("scroll", handleScroll);
  }, [pathname]);

  const navLinks = [
    { label: "Podcast", href: "#podcast" },
    { label: "Events", href: "#events" },
    { label: "Connect", href: "#contact" },
  ];

  const closeMenu = () => setIsOpen(false);
  const linkHref = (hash: string) => (isHomePage ? hash : `/${hash}`);

  return (
    <motion.header
      initial="hidden"
      animate="visible"
      variants={fadeDownVariant}
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-smooth"
    >
      <div className="container mx-auto container-padding">
        {/* Nav with glass effect on scroll */}
        <nav
          className={`rounded-md transition-all duration-500 ease-smooth ${isScrolled ? "glass glass-hue-shadow bg-background/80 backdrop-blur-xl px-4 sm:px-5 lg:px-6 mt-4 py-2.5 lg:py-3" : "pt-5 lg:pt-6 py-3 lg:py-4"}`}
        >
          {/* Mobile: Simple flex layout */}
          <div className="flex items-center justify-between md:hidden">
            <Link
              href="/"
              onClick={(e) => {
                if (isHomePage) {
                  e.preventDefault();
                  window.scrollTo({ top: 0, behavior: "smooth" });
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
              {isOpen ? (
                <X className="h-5 w-5" />
              ) : (
                <Menu className="h-5 w-5" />
              )}
            </LiquidButton>
          </div>

          {/* Desktop: Grid layout */}
          <div className="hidden md:grid grid-cols-3 items-center">
            {/* Logo - First column */}
            <Link
              href="/"
              onClick={(e) => {
                if (isHomePage) {
                  e.preventDefault();
                  window.scrollTo({ top: 0, behavior: "smooth" });
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
                    ease: liquidEase,
                  }}
                >
                  <Link
                    href={linkHref(link.href)}
                    onClick={closeMenu}
                    className={`relative text-[1em] font-medium focus-ring transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${
                      activeSection === link.href
                        ? "text-primary"
                        : "text-foreground hover:text-foreground/60"
                    }`}
                  >
                    {link.label}
                    <span
                      className={`absolute -bottom-1 left-0 h-[2px] bg-primary transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${
                        activeSection === link.href ? "w-full" : "w-0"
                      }`}
                    />
                  </Link>
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
            <div
              className="md:hidden py-4 border-t border-border/50 mt-3 bg-background/95 backdrop-blur-xl rounded-b-md"
              style={{ touchAction: "manipulation" }}
            >
              <ul className="flex flex-col gap-1">
                {navLinks.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={linkHref(link.href)}
                      onClick={closeMenu}
                      className="block py-3 text-3xl text-foreground active:text-primary active:bg-secondary/50 rounded-xl focus-ring"
                      style={{
                        touchAction: "manipulation",
                        WebkitTapHighlightColor: "transparent",
                      }}
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
                <li className="pt-3">
                  <LiquidButton
                    onClick={openSubscribe}
                    variant="glass"
                    size="lg"
                    className="w-full"
                  >
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

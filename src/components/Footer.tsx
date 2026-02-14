import { Link, useLocation, useNavigate } from "react-router-dom";
import FomIcon from "@/assets/FOM_Icon.svg";
import { useSubscribe } from "@/contexts/SubscribeContext";

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

          {/* Nav columns */}
          <div className="flex flex-col sm:flex-row gap-6 sm:gap-16 lg:gap-28">
            <ul className="flex flex-col gap-2.5 text-body text-foreground/70">
              <li><a href="#podcast" onClick={(e) => handleNavClick(e, '#podcast')} className="hover:text-foreground transition-colors duration-300">Podcast</a></li>
              <li><a href="#events" onClick={(e) => handleNavClick(e, '#events')} className="hover:text-foreground transition-colors duration-300">Events</a></li>
              <li><a href="#contact" onClick={(e) => handleNavClick(e, '#contact')} className="hover:text-foreground transition-colors duration-300">Connect</a></li>
            </ul>
            <ul className="flex flex-col gap-2.5 text-body text-foreground/70">
              <li><button onClick={openSubscribe} className="hover:text-foreground transition-colors duration-300">Subscribe</button></li>
              <li><Link to="/privacy" className="hover:text-foreground transition-colors duration-300">Privacy</Link></li>
            </ul>
          </div>
        </div>
      </div>

      {/* Giant FOM logo + copyright */}
      <div className="container mx-auto container-padding">
        <img 
          src={FomIcon} 
          alt="Future of Marketing" 
          className="w-full select-none"
        />
        <p className="text-body-sm text-foreground/40 py-6 sm:py-8">© {new Date().getFullYear()} Future of Marketing. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;

import { Link } from "react-router-dom";
import FomIcon from "@/assets/FOM_Icon.svg";

const Footer = () => {
  return (
    <footer className="border-t border-foreground/10 pt-16 sm:pt-20 lg:pt-24 pb-0 overflow-hidden">
      <div className="container mx-auto container-padding">
        {/* Top section: tagline + nav columns */}
        <div className="flex flex-col md:flex-row justify-between gap-10 md:gap-16 mb-16 sm:mb-20 lg:mb-28">
          {/* Tagline */}
          <p className="text-body-lg font-normal italic text-foreground/80">
            A podcast series on how AI is changing marketing
          </p>

          {/* Nav columns */}
          <div className="flex gap-16 sm:gap-20 lg:gap-28">
            <ul className="flex flex-col gap-2.5 text-body text-foreground/70">
              <li><Link to="/" className="hover:text-foreground transition-colors duration-300">Home</Link></li>
              <li><Link to="/#podcast" className="hover:text-foreground transition-colors duration-300">Podcast</Link></li>
              <li><Link to="/#events" className="hover:text-foreground transition-colors duration-300">Events</Link></li>
              <li><Link to="/privacy" className="hover:text-foreground transition-colors duration-300">Privacy</Link></li>
            </ul>
            <ul className="flex flex-col gap-2.5 text-body text-foreground/70">
              <li><a href="https://open.spotify.com" target="_blank" rel="noopener noreferrer" className="hover:text-foreground transition-colors duration-300">Spotify</a></li>
              <li><a href="https://podcasts.apple.com" target="_blank" rel="noopener noreferrer" className="hover:text-foreground transition-colors duration-300">Apple Podcasts</a></li>
              <li><a href="https://youtube.com" target="_blank" rel="noopener noreferrer" className="hover:text-foreground transition-colors duration-300">YouTube</a></li>
            </ul>
          </div>
        </div>
      </div>

      {/* Giant FOM logo - bleeds off bottom */}
      <div className="container mx-auto container-padding">
        <img 
          src={FomIcon} 
          alt="Future of Marketing" 
          className="w-full select-none pb-8 sm:pb-12 lg:pb-16"
        />
      </div>
    </footer>
  );
};

export default Footer;

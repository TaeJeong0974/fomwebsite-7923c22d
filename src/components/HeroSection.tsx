import { motion } from "framer-motion";
import heroLogo from "@/assets/hero-logo.svg";

const HeroSection = () => {
  return (
    <section className="min-h-[80vh] flex items-center justify-center relative overflow-hidden">
      {/* Video Background */}
      <div className="absolute inset-0 z-0">
        <video
          autoPlay
          muted
          loop
          playsInline
          className="w-full h-full object-cover"
        >
          <source src="https://videos.pexels.com/video-files/6774125/6774125-uhd_2732_1440_25fps.mp4" type="video/mp4" />
        </video>
        {/* Dark overlay for contrast */}
        <div className="absolute inset-0 bg-black/50" />
      </div>
      
      {/* Centered Logo */}
      <div className="relative z-10 flex items-center justify-center px-4">
        <motion.img
          src={heroLogo}
          alt="FOM Logo"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
          className="w-full max-w-[10rem] sm:max-w-[12rem] md:max-w-xs lg:max-w-sm invert"
        />
      </div>
    </section>
  );
};

export default HeroSection;

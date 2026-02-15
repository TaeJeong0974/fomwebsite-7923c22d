import { useState, useRef } from "react";
import { Play } from "lucide-react";
import { motion, useScroll, useTransform, useInView } from "framer-motion";
import { useIsMobile } from "@/hooks/use-mobile";
import fomThumbnail from "@/assets/fom-2025-thumbnail.png";

const YOUTUBE_VIDEO_ID = "5E--ZqG5QME";

const EventsSection = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const isMobile = useIsMobile();
  const isTitleInView = useInView(titleRef, { once: true, amount: 0.3 });

  // Parallax scroll effect
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });
  
  const videoY = useTransform(scrollYProgress, [0, 1], ["-10%", "25%"]);
  const titleY = useTransform(scrollYProgress, [0, 1], ["-5%", "18%"]);

  return (
    <section ref={sectionRef} id="events" className="section-spacing overflow-hidden">
      <div className="container mx-auto container-padding">
        <div className="relative">
          {/* Title wrapper */}
          <motion.div 
            className="relative z-10 mb-[-3rem] sm:mb-[-5rem] lg:mb-[-8rem] xl:mb-[-10rem] overflow-visible will-change-transform"
            style={{ y: titleY, translateZ: 0 }}
          >
            <motion.h2
              ref={titleRef}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
              className="text-[4rem] sm:text-[6rem] lg:text-[10rem] xl:text-[12rem] font-display font-semibold tracking-tight overflow-visible"
              style={{
                background: 'linear-gradient(135deg, rgba(20,20,20,1) 0%, rgba(50,45,45,1) 8%, rgba(210,130,130,0.95) 20%, rgba(190,130,160,1) 35%, rgba(150,130,180,0.95) 50%, rgba(90,130,180,1) 65%, rgba(150,130,180,0.95) 80%, rgba(210,130,130,0.95) 100%)',
                backgroundSize: '500% 100%',
                WebkitBackgroundClip: 'text',
                backgroundClip: 'text',
                color: 'transparent',
                animation: !isMobile && isTitleInView ? 'gradient-initial-reveal 2s ease-out forwards, gradient-color-only-cycle 10s ease-in-out 2s infinite' : 'none',
                lineHeight: 0.95,
                paddingTop: '0.08em',
                paddingBottom: '0.02em',
                willChange: 'background-position',
                transform: 'translateZ(0)',
              }}
            >
              FOM<br /><span className="block -mt-2 sm:-mt-3 lg:-mt-5 xl:-mt-6">2025</span>
            </motion.h2>
          </motion.div>

          {/* Video and Copy side by side */}
          <div className="relative flex flex-col lg:flex-row lg:items-end gap-6 lg:gap-0">
            {/* Copy - Left side */}
            <div className="hidden lg:flex flex-col justify-end w-1/4 pr-12 pb-4">
              <span className="text-base font-semibold text-foreground">San Francisco, CA</span>
              <p className="text-base text-foreground mt-3">
                An evening of insights, networking, and conversations about the future of AI in marketing.
              </p>
              <button className="mt-6 text-label hover:opacity-70 hover-transition flex items-center gap-2 group">
                Watch Recap
                <span className="w-8 h-[1px] bg-foreground group-hover:w-12 hover-transition" />
              </button>
            </div>

            {/* Video Container - YouTube Embed */}
            <motion.div 
              ref={containerRef} 
              className="relative w-full lg:w-3/4 aspect-[16/9] overflow-hidden rounded-xl group cursor-pointer will-change-transform"
              style={{ y: videoY, translateZ: 0 }}
              onClick={() => !isPlaying && setIsPlaying(true)}
            >
              {isPlaying ? (
                <iframe
                  src={`https://www.youtube.com/embed/${YOUTUBE_VIDEO_ID}?autoplay=1&rel=0&modestbranding=1&showinfo=0`}
                  className="absolute inset-0 w-full h-full"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  title="FOM 2025 Recap"
                />
              ) : (
                <>
                  <img
                    src={fomThumbnail}
                    alt="FOM 2025 Event"
                    className="absolute inset-0 w-full h-full object-cover scale-110"
                    loading="lazy"
                    decoding="async"
                  />
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-black/30 hover-transition" />
                  
                  {/* Play Button */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-20 h-20 rounded-full bg-white/10 backdrop-blur-xl border border-white/20 flex items-center justify-center group-hover:scale-110 hover-transition">
                      <Play className="w-8 h-8 text-white fill-white ml-1" />
                    </div>
                  </div>
                </>
              )}
            </motion.div>
          </div>

          {/* Mobile Meta info */}
          <div className="lg:hidden mt-6">
            <span className="text-base font-semibold text-foreground">San Francisco, CA</span>
            <p className="text-base text-foreground mt-2">
              An evening of insights, networking, and conversations about the future of AI in marketing.
            </p>
            <button className="mt-6 text-label hover:opacity-70 hover-transition flex items-center gap-2 group">
              Watch Recap
              <span className="w-8 h-[1px] bg-foreground group-hover:w-12 hover-transition" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default EventsSection;

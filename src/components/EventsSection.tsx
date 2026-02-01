import { useState, useEffect, useRef } from "react";
import { Play } from "lucide-react";
import { motion, useScroll, useTransform } from "framer-motion";

const EventsSection = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const [isInView, setIsInView] = useState(false);

  // Parallax scroll effect
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });
  
  // Video moves slower than scroll (parallax effect) - increased intensity
  const videoY = useTransform(scrollYProgress, [0, 1], ["-10%", "25%"]);
  const titleY = useTransform(scrollYProgress, [0, 1], ["-5%", "18%"]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          observer.disconnect(); // Only load once
        }
      },
      { rootMargin: "200px" } // Start loading 200px before visible
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} id="events" className="section-spacing overflow-hidden">
      <div className="container mx-auto container-padding">
        <div className="relative">
          {/* Title wrapper - handles overflow and overlap */}
          <motion.div 
            className="relative z-10 mb-[-3rem] sm:mb-[-5rem] lg:mb-[-8rem] xl:mb-[-10rem] overflow-visible"
            style={{ y: titleY }}
          >
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
              className="text-[4rem] sm:text-[6rem] lg:text-[10rem] xl:text-[12rem] font-display font-semibold tracking-tight overflow-visible"
              style={{
                background: 'linear-gradient(135deg, rgba(100,160,180,0.85) 0%, rgba(180,175,190,0.9) 15%, rgba(220,120,100,0.9) 30%, rgba(235,160,140,0.85) 50%, rgba(200,140,180,0.9) 70%, rgba(120,140,200,0.85) 85%, rgba(180,100,120,0.9) 100%)',
                backgroundSize: '300% 300%',
                WebkitBackgroundClip: 'text',
                backgroundClip: 'text',
                color: 'transparent',
                animation: 'gradient-shift-from-black 12s ease-in-out infinite',
                lineHeight: 0.95,
                paddingTop: '0.08em',
                paddingBottom: '0.02em',
              }}
            >
              FOM<br />2025
            </motion.h2>
          </motion.div>

          {/* Video and Copy side by side */}
          <div className="relative flex flex-col lg:flex-row lg:items-end gap-6 lg:gap-0">
            {/* Copy - Left side, aligned with bottom of video */}
            <div className="hidden lg:flex flex-col justify-end w-1/4 pr-12 pb-4">
              <span className="text-base font-semibold text-muted-foreground">Past Event · San Francisco, CA</span>
              <p className="text-base text-muted-foreground mt-3">
                An evening of insights, networking, and conversations about the future of AI in marketing.
              </p>
              <button className="mt-6 text-label hover:opacity-70 hover-transition flex items-center gap-2 group">
                Watch Recap
                <span className="w-8 h-[1px] bg-foreground group-hover:w-12 hover-transition" />
              </button>
            </div>

            {/* Video Container */}
            <motion.div 
              ref={containerRef} 
              className="relative w-full lg:w-3/4 aspect-[16/9] overflow-hidden rounded-xl group cursor-pointer"
              style={{ y: videoY }}
            >
              {isInView ? (
                <video
                  ref={videoRef}
                  autoPlay
                  muted
                  loop
                  playsInline
                  className="absolute inset-0 w-full h-full object-cover scale-110"
                  poster="https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=1920&q=80"
                >
                  <source src="https://assets.mixkit.co/videos/preview/mixkit-crowd-at-a-concert-seen-from-behind-4611-large.mp4" type="video/mp4" />
                </video>
              ) : (
                <img
                  src="https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=1920&q=80"
                  alt="FOM 2025 Event"
                  className="absolute inset-0 w-full h-full object-cover scale-110"
                />
              )}
              <div className="absolute inset-0 bg-black/20 group-hover:bg-black/30 hover-transition" />
              
              {/* Play Button */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-20 h-20 rounded-full bg-white/10 backdrop-blur-xl border border-white/20 flex items-center justify-center group-hover:scale-110 hover-transition">
                  <Play className="w-8 h-8 text-white fill-white ml-1" />
                </div>
              </div>
            </motion.div>
          </div>

          {/* Mobile Meta info */}
          <div className="lg:hidden mt-6">
            <span className="text-base font-semibold text-muted-foreground">Past Event · San Francisco, CA</span>
            <p className="text-base text-muted-foreground mt-2">
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

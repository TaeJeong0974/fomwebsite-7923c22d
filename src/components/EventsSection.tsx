import { Play } from "lucide-react";
import { motion } from "framer-motion";
import subscribeBg from "@/assets/subscribe-bg.png";

const EventsSection = () => {
  return (
    <section id="events" className="section-spacing">
      <div className="container mx-auto container-padding">
        <div className="relative">
          {/* Title wrapper - handles overflow and overlap */}
          <div className="relative z-10 mb-[-3rem] sm:mb-[-5rem] lg:mb-[-8rem] xl:mb-[-10rem] overflow-visible">
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
              className="text-[4rem] sm:text-[6rem] lg:text-[10rem] xl:text-[12rem] font-display font-semibold tracking-tight overflow-visible"
              style={{
                background: 'linear-gradient(135deg, rgba(253,164,175,0.85) 0%, rgba(253,224,187,0.75) 50%, rgba(147,197,253,0.85) 100%)',
                backgroundSize: '200% 200%',
                WebkitBackgroundClip: 'text',
                backgroundClip: 'text',
                color: 'transparent',
                animation: 'gradient-shift 8s ease-in-out infinite',
                lineHeight: 0.95,
                paddingTop: '0.08em',
                paddingBottom: '0.02em',
              }}
            >
              FOM<br />2025
            </motion.h2>
          </div>

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
            <div className="relative w-full lg:w-3/4 aspect-[16/9] overflow-hidden rounded-xl group cursor-pointer">
              {/* Static background image */}
              <div
                className="absolute inset-0 z-0 group-hover:scale-105 hover-transition"
                style={{
                  backgroundImage: `url(${subscribeBg})`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                }}
              />
              {/* Animated color overlay */}
              <motion.div
                className="absolute inset-0 z-[1] mix-blend-soft-light opacity-80"
                animate={{
                  background: [
                    'linear-gradient(135deg, rgba(100, 120, 180, 0.9) 0%, rgba(255, 120, 100, 0.8) 50%, rgba(180, 160, 220, 0.9) 100%)',
                    'linear-gradient(135deg, rgba(255, 140, 120, 0.8) 0%, rgba(120, 100, 200, 0.9) 50%, rgba(255, 100, 130, 0.8) 100%)',
                    'linear-gradient(135deg, rgba(160, 140, 220, 0.9) 0%, rgba(255, 130, 100, 0.8) 50%, rgba(100, 140, 200, 0.9) 100%)',
                    'linear-gradient(135deg, rgba(100, 120, 180, 0.9) 0%, rgba(255, 120, 100, 0.8) 50%, rgba(180, 160, 220, 0.9) 100%)',
                  ],
                }}
                transition={{
                  duration: 6,
                  ease: 'easeInOut',
                  repeat: Infinity,
                  repeatType: 'loop',
                }}
              />
              
              {/* Play Button */}
              <div className="absolute inset-0 flex items-center justify-center z-10">
                <div className="w-20 h-20 rounded-full bg-white/10 backdrop-blur-xl border border-white/20 flex items-center justify-center group-hover:scale-110 hover-transition">
                  <Play className="w-8 h-8 text-white fill-white ml-1" />
                </div>
              </div>
            </div>
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

import { Play } from "lucide-react";
import { motion } from "framer-motion";

const EventsSection = () => {
  return (
    <section id="events" className="section-spacing">
      <div className="container mx-auto container-padding">
        <div className="relative">
          {/* Title - overlaps video with glass text effect */}
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
            className="text-[4rem] sm:text-[6rem] lg:text-[10rem] xl:text-[12rem] font-display font-medium leading-[0.9] tracking-tight mb-[-3rem] sm:mb-[-5rem] lg:mb-[-8rem] xl:mb-[-10rem] relative z-10 inline-block"
            style={{
              background: 'linear-gradient(135deg, rgba(253,164,175,0.85) 0%, rgba(253,224,187,0.75) 50%, rgba(147,197,253,0.85) 100%)',
              backgroundSize: '200% 200%',
              WebkitBackgroundClip: 'text',
              backgroundClip: 'text',
              color: 'transparent',
              animation: 'gradient-shift 8s ease-in-out infinite',
              paddingTop: '0.1em',
            }}
          >
            FOM<br />2025
          </motion.h2>

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
              <video
                autoPlay
                muted
                loop
                playsInline
                className="absolute inset-0 w-full h-full object-cover"
                poster="https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=1920&q=80"
              >
                <source src="https://assets.mixkit.co/videos/preview/mixkit-crowd-at-a-concert-seen-from-behind-4611-large.mp4" type="video/mp4" />
              </video>
              <div className="absolute inset-0 bg-black/20 group-hover:bg-black/30 hover-transition" />
              
              {/* Play Button */}
              <div className="absolute inset-0 flex items-center justify-center">
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

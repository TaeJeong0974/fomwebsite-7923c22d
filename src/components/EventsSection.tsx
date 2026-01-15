import { motion } from "framer-motion";
import { ArrowRight, Play } from "lucide-react";

const EventsSection = () => {
  return (
    <section id="events" className="bg-muted">

      {/* Full-bleed Past Event with Video */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="relative w-full aspect-[16/9] md:aspect-[21/9] overflow-hidden group cursor-pointer"
      >
        {/* Video Background */}
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

        {/* Overlay Gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/50 to-transparent" />

        {/* Content */}
        <div className="absolute inset-0 flex flex-col justify-end p-6 sm:p-10 lg:p-16">
          <div className="max-w-2xl">
            <span className="inline-block text-[10px] font-medium uppercase tracking-wider text-white/60 mb-3">
              Past Event
            </span>
            <h3 className="font-display text-2xl sm:text-3xl lg:text-5xl font-semibold text-white mb-3 tracking-tight">
              Season 5 Launch Party
            </h3>
            <div className="flex items-center gap-2 text-sm text-white/70 mb-4">
              <span>Dec 15, 2025</span>
              <span className="w-1 h-1 rounded-full bg-white/40" />
              <span>Los Angeles, CA</span>
              <span className="w-1 h-1 rounded-full bg-white/40" />
              <span>200+ attendees</span>
            </div>
            <p className="text-sm sm:text-base text-white/60 max-w-lg mb-6 hidden sm:block">
              An evening of live performances, Q&A sessions, and exclusive content with our community.
            </p>
            <div className="flex items-center gap-4">
              <button className="flex items-center gap-2 bg-white text-black px-4 py-2.5 text-sm font-medium hover:bg-white/90 transition-colors">
                <Play className="w-4 h-4 fill-current" />
                Watch Recap
              </button>
              <button className="flex items-center gap-2 text-white/80 text-sm font-medium hover:text-white transition-colors group/btn">
                View Photos
                <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Stay Updated */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-10 lg:py-12">
        <p className="text-sm text-muted-foreground">
          More events coming soon. <span className="text-muted-foreground/60">Subscribe to be the first to know.</span>
        </p>
      </div>
    </section>
  );
};

export default EventsSection;

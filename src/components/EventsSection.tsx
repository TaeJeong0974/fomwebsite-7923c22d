import { motion } from "framer-motion";
import { ArrowRight, Play } from "lucide-react";
import { liquidEase } from "@/components/animations/PageLoadAnimation";

const EventsSection = () => {
  return (
    <section id="events" className="section-spacing">
      <div className="container mx-auto container-padding">
        {/* Full-width Video */}
        <motion.div
          initial={{ opacity: 0, y: 50, scale: 0.98 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.9, ease: liquidEase }}
          className="relative w-full aspect-[16/9] md:aspect-[21/9] overflow-hidden group cursor-pointer rounded-3xl"
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
          <div className="card-overlay" />
          <div className="absolute inset-0 bg-gradient-to-r from-black/50 to-transparent" />

          {/* Content */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.3, ease: liquidEase }}
            className="absolute inset-0 flex flex-col justify-end p-6 sm:p-10 lg:p-12"
          >
            <div className="max-w-2xl">
              <span className="badge-interactive glass-dark text-white/80 mb-4">
                Past Event
              </span>
              <h3 className="text-display-lg text-white mb-3">
                Season 5 Launch Party
              </h3>
              <div className="flex items-center gap-2 text-body-sm text-white/70 mb-4">
                <span>Dec 15, 2025</span>
                <span className="w-1 h-1 rounded-full bg-white/40" />
                <span>Los Angeles, CA</span>
                <span className="w-1 h-1 rounded-full bg-white/40" />
                <span>200+ attendees</span>
              </div>
              <p className="text-body text-white/60 max-w-lg mb-6 hidden sm:block">
                An evening of live performances, Q&A sessions, and exclusive content with our community.
              </p>
              <div className="flex items-center gap-4">
                <button className="btn-base btn-glass-light btn-sm gap-2">
                  <Play className="w-4 h-4 fill-current" />
                  Watch Recap
                </button>
                <button className="flex items-center gap-2 text-white/80 text-body-sm font-medium hover:text-white hover-transition group/btn">
                  View Photos
                  <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 hover-transition" />
                </button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default EventsSection;

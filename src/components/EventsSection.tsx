import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

const EventsSection = () => {
  return (
    <section id="events" className="py-24 lg:py-32 bg-muted">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-10 lg:mb-14">
          <p className="text-sm text-muted-foreground uppercase tracking-[0.2em] mb-3 font-medium">
            In Person & Online
          </p>
          <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl font-semibold text-foreground tracking-tight">
            Events
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-6">
          {/* Featured Past Event */}
          <motion.article 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="bg-card border border-border p-6 lg:p-8 hover:border-foreground/20 transition-colors group cursor-pointer"
          >
            <div className="flex items-center justify-between mb-4">
              <span className="text-xs font-medium uppercase tracking-wider text-primary">
                Featured Recap
              </span>
              <ArrowRight className="w-4 h-4 text-muted-foreground group-hover:text-foreground group-hover:translate-x-1 transition-all" />
            </div>
            <h3 className="font-display text-2xl lg:text-3xl font-bold text-foreground mb-3">
              Season 5 Launch Party
            </h3>
            <div className="flex items-center gap-3 text-sm text-muted-foreground mb-4">
              <span>Dec 15, 2025</span>
              <span className="w-1 h-1 rounded-full bg-muted-foreground/40" />
              <span>Los Angeles, CA</span>
            </div>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              Over 200 listeners joined us to celebrate the launch of Season 5. The evening featured live performances, Q&A sessions, and exclusive content.
            </p>
            <div className="flex items-center gap-4 text-sm text-muted-foreground">
              <span>📸 45 photos</span>
              <span>🎥 Recording available</span>
            </div>
          </motion.article>

          {/* Upcoming Event */}
          <motion.article 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="bg-card border border-border p-6 lg:p-8 hover:border-foreground/20 transition-colors group cursor-pointer"
          >
            <div className="flex items-center justify-between mb-4">
              <span className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                Coming Soon
              </span>
              <ArrowRight className="w-4 h-4 text-muted-foreground group-hover:text-foreground group-hover:translate-x-1 transition-all" />
            </div>
            <h3 className="font-display text-2xl lg:text-3xl font-bold text-foreground mb-3">
              Live Podcast Recording
            </h3>
            <div className="flex items-center gap-3 text-sm text-muted-foreground mb-4">
              <span>Jan 20, 2026</span>
              <span className="w-1 h-1 rounded-full bg-muted-foreground/40" />
              <span>San Francisco, CA</span>
            </div>
            <p className="text-muted-foreground leading-relaxed">
              Join us for a live recording with special guests. Limited seats available for this intimate experience.
            </p>
          </motion.article>
        </div>
      </div>
    </section>
  );
};

export default EventsSection;

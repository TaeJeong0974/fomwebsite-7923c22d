import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight, Ticket } from "lucide-react";

const CTASection = () => {
  return (
    <section className="py-24 bg-card relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute inset-0">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/10 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto text-center"
        >
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-2 mb-6 bg-primary/10 border border-primary/30 rounded-full"
          >
            <Ticket className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium text-primary">Early Bird Pricing Ends Soon</span>
          </motion.div>

          <h2 className="font-display text-4xl md:text-6xl font-bold mb-6">
            Ready to Join the{" "}
            <span className="text-gradient">Movement</span>?
          </h2>

          <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-10">
            Secure your spot at Summit 2025. Connect with innovators, 
            learn from the best, and be part of something extraordinary.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button variant="hero" size="xl">
              Get Tickets Now
              <ArrowRight className="w-5 h-5" />
            </Button>
            <p className="text-muted-foreground text-sm">
              Starting at <span className="text-foreground font-semibold">$299</span>
            </p>
          </div>

          <div className="mt-12 flex items-center justify-center gap-8 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-green-500" />
              <span>500+ tickets remaining</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-primary" />
              <span>30-day refund policy</span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default CTASection;

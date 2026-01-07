import { motion } from "framer-motion";
import { Sparkles, Users, Lightbulb, Globe } from "lucide-react";

const stats = [
  { icon: Users, value: "5,000+", label: "Attendees" },
  { icon: Lightbulb, value: "100+", label: "Speakers" },
  { icon: Globe, value: "50+", label: "Countries" },
  { icon: Sparkles, value: "3", label: "Days" },
];

const AboutSection = () => {
  return (
    <section className="py-24 bg-gradient-hero relative overflow-hidden">
      {/* Background accent */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent" />
      
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="max-w-3xl mx-auto text-center mb-16"
        >
          <h2 className="font-display text-4xl md:text-5xl font-bold mb-6">
            Where <span className="text-gradient">Ideas</span> Take Flight
          </h2>
          <p className="text-lg text-muted-foreground leading-relaxed">
            Summit 2025 brings together the brightest minds in technology, design, 
            and business. Experience keynotes from industry leaders, hands-on workshops, 
            and unparalleled networking opportunities that will shape the future.
          </p>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="text-center group"
            >
              <div className="inline-flex items-center justify-center w-16 h-16 mb-4 rounded-2xl bg-gradient-card border border-border group-hover:border-primary/50 transition-colors duration-300">
                <stat.icon className="w-7 h-7 text-primary" />
              </div>
              <div className="font-display text-3xl md:text-4xl font-bold text-foreground mb-1">
                {stat.value}
              </div>
              <div className="text-muted-foreground text-sm uppercase tracking-wider">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AboutSection;

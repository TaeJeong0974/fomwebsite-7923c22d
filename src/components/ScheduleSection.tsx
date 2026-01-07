import { motion } from "framer-motion";
import { Clock, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const scheduleItems = [
  {
    day: "Day 1",
    date: "March 15",
    events: [
      { time: "9:00 AM", title: "Opening Keynote", speaker: "Elena Rodriguez" },
      { time: "11:00 AM", title: "The Future of AI", speaker: "Marcus Chen" },
      { time: "2:00 PM", title: "Design Workshop", speaker: "Sarah Mitchell" },
    ],
  },
  {
    day: "Day 2",
    date: "March 16",
    events: [
      { time: "9:30 AM", title: "Startup Ecosystem", speaker: "David Okonkwo" },
      { time: "11:30 AM", title: "Innovation Panel", speaker: "Multiple Speakers" },
      { time: "3:00 PM", title: "Networking Session", speaker: "Open Format" },
    ],
  },
  {
    day: "Day 3",
    date: "March 17",
    events: [
      { time: "10:00 AM", title: "Tech Trends 2025", speaker: "Industry Experts" },
      { time: "1:00 PM", title: "Hands-on Labs", speaker: "Workshop Leaders" },
      { time: "4:00 PM", title: "Closing Ceremony", speaker: "All Speakers" },
    ],
  },
];

const ScheduleSection = () => {
  return (
    <section className="py-24 bg-gradient-hero relative overflow-hidden">
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-1/2 left-0 w-96 h-96 bg-primary/10 rounded-full blur-3xl" />
        <div className="absolute top-1/4 right-0 w-80 h-80 bg-accent/10 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="text-primary text-sm font-medium uppercase tracking-wider">
            Plan Your Experience
          </span>
          <h2 className="font-display text-4xl md:text-5xl font-bold mt-4">
            Event <span className="text-gradient">Schedule</span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {scheduleItems.map((day, dayIndex) => (
            <motion.div
              key={day.day}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: dayIndex * 0.1 }}
              viewport={{ once: true }}
              className="bg-gradient-card rounded-2xl border border-border p-6 hover:border-primary/30 transition-colors duration-300"
            >
              <div className="flex items-center gap-3 mb-6 pb-4 border-b border-border">
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                  <Clock className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <h3 className="font-display text-lg font-semibold text-foreground">
                    {day.day}
                  </h3>
                  <p className="text-muted-foreground text-sm">{day.date}</p>
                </div>
              </div>

              <div className="space-y-4">
                {day.events.map((event, eventIndex) => (
                  <div
                    key={eventIndex}
                    className="group cursor-pointer"
                  >
                    <div className="flex items-start gap-3">
                      <span className="text-xs text-muted-foreground font-medium min-w-[60px] pt-1">
                        {event.time}
                      </span>
                      <div>
                        <p className="font-medium text-foreground group-hover:text-primary transition-colors">
                          {event.title}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          {event.speaker}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <Button variant="heroOutline" size="lg">
            Download Full Schedule
            <ArrowRight className="w-4 h-4" />
          </Button>
        </motion.div>
      </div>
    </section>
  );
};

export default ScheduleSection;

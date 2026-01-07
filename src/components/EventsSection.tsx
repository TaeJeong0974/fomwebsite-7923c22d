const events = [
  {
    id: 1,
    title: "Live Podcast Recording",
    location: "San Francisco, CA",
    date: "Jan 20, 2026",
    time: "7:00 PM PST",
    description: "Join us for a live recording with special guests.",
  },
  {
    id: 2,
    title: "Community Meetup",
    location: "New York, NY",
    date: "Feb 5, 2026",
    time: "6:30 PM EST",
    description: "Network with fellow listeners and creators.",
  },
  {
    id: 3,
    title: "Workshop: Podcasting 101",
    location: "Online",
    date: "Feb 15, 2026",
    time: "2:00 PM EST",
    description: "Learn the fundamentals of starting your own podcast.",
  },
  {
    id: 4,
    title: "Annual Conference",
    location: "Austin, TX",
    date: "Mar 10-12, 2026",
    time: "All Day",
    description: "Our flagship event with speakers, panels, and networking.",
  },
];

const EventsSection = () => {
  return (
    <section id="events" className="container mx-auto px-4 sm:px-6 lg:px-8">
      <div className="mb-8">
        <h2 className="font-display text-3xl sm:text-4xl font-bold text-foreground">
          Upcoming Events
        </h2>
        <p className="mt-2 text-muted-foreground">
          Meet us in person or join online
        </p>
      </div>

      {/* Events List: stacked mobile, 2-col tablet, date+details side-by-side desktop */}
      <div className="space-y-4">
        {events.map((event) => (
          <article
            key={event.id}
            className="border border-border rounded-lg p-6 hover:border-primary/50 transition-colors"
          >
            {/* Mobile & Tablet: stacked / 2-col grid */}
            {/* Desktop: 12-col with date on left, details on right */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-4 lg:gap-8 items-start">
              {/* Date Block */}
              <div className="lg:col-span-3">
                <div className="text-sm text-muted-foreground">{event.date}</div>
                <div className="text-sm text-muted-foreground">{event.time}</div>
              </div>

              {/* Details Block */}
              <div className="lg:col-span-7">
                <h3 className="font-display text-lg font-semibold text-foreground">
                  {event.title}
                </h3>
                <p className="text-muted-foreground text-sm mt-1">
                  {event.description}
                </p>
                <p className="text-sm text-muted-foreground mt-2">
                  📍 {event.location}
                </p>
              </div>

              {/* Action */}
              <div className="lg:col-span-2 lg:text-right">
                <button className="text-primary font-medium text-sm hover:underline">
                  RSVP →
                </button>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
};

export default EventsSection;

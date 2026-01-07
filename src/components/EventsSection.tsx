const EventsSection = () => {
  return (
    <section id="events" className="container mx-auto px-4 sm:px-6 lg:px-8">
      <div className="mb-8">
        <h2 className="font-display text-3xl sm:text-4xl font-bold text-foreground">
          Events
        </h2>
        <p className="mt-2 text-muted-foreground">
          Meet us in person or join online
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Upcoming Events Card */}
        <article className="border border-border rounded-lg p-8 hover:border-primary/50 transition-colors bg-card">
          <div className="text-sm text-muted-foreground uppercase tracking-wide mb-2">
            Coming Soon
          </div>
          <h3 className="font-display text-2xl font-bold text-foreground mb-3">
            Upcoming Events
          </h3>
          <p className="text-muted-foreground mb-6">
            Join us at our next live recordings, workshops, and community meetups happening around the world.
          </p>
          <button className="text-primary font-medium hover:underline">
            View Schedule →
          </button>
        </article>

        {/* Past Events Card */}
        <article className="border border-border rounded-lg p-8 hover:border-primary/50 transition-colors bg-card">
          <div className="text-sm text-muted-foreground uppercase tracking-wide mb-2">
            Archive
          </div>
          <h3 className="font-display text-2xl font-bold text-foreground mb-3">
            Past Events
          </h3>
          <p className="text-muted-foreground mb-6">
            Catch up on recordings and highlights from our previous events, conferences, and live sessions.
          </p>
          <button className="text-primary font-medium hover:underline">
            Browse Archive →
          </button>
        </article>
      </div>
    </section>
  );
};

export default EventsSection;

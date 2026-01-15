const EventsSection = () => {
  return (
    <section id="events" className="container mx-auto px-4 sm:px-6 lg:px-8 py-24 lg:py-32">
      <div className="mb-12">
        <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl font-semibold text-foreground tracking-tight">
          Events
        </h2>
        <p className="mt-3 text-lg text-muted-foreground">
          Meet us in person or join online
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Past Event Card - Featured */}
        <article className="border border-border p-8 hover:border-primary/50 transition-colors bg-card md:row-span-1">
          <div className="text-sm text-primary uppercase tracking-wide font-medium mb-2">
            Featured Recap
          </div>
          <h3 className="font-display text-2xl font-bold text-foreground mb-2">
            Season 5 Launch Party
          </h3>
          <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4">
            <span>Dec 15, 2025</span>
            <span>•</span>
            <span>Los Angeles, CA</span>
          </div>
          <p className="text-muted-foreground mb-4">
            Over 200 listeners joined us to celebrate the launch of Season 5. The evening featured live performances, Q&A sessions with our hosts, and exclusive behind-the-scenes content.
          </p>
          <div className="flex items-center gap-4 text-sm text-muted-foreground">
            <span>📸 45 photos</span>
            <span>🎥 Full recording available</span>
          </div>
        </article>

        {/* Upcoming Event Card */}
        <article className="border border-border p-8 hover:border-primary/50 transition-colors bg-card">
          <div className="text-sm text-muted-foreground uppercase tracking-wide mb-2">
            Coming Soon
          </div>
          <h3 className="font-display text-2xl font-bold text-foreground mb-2">
            Live Podcast Recording
          </h3>
          <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4">
            <span>Jan 20, 2026</span>
            <span>•</span>
            <span>San Francisco, CA</span>
          </div>
          <p className="text-muted-foreground">
            Join us for a live recording with special guests. Limited seats available.
          </p>
        </article>
      </div>
    </section>
  );
};

export default EventsSection;

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
          <p className="text-muted-foreground mb-4">
            Join us at our next live recordings, workshops, and community meetups.
          </p>
          
          <div className="space-y-3 mb-6">
            <div className="flex justify-between items-start text-sm">
              <div>
                <div className="font-medium text-foreground">Live Podcast Recording</div>
                <div className="text-muted-foreground">San Francisco, CA</div>
              </div>
              <div className="text-muted-foreground text-right">Jan 20, 2026</div>
            </div>
            <div className="flex justify-between items-start text-sm">
              <div>
                <div className="font-medium text-foreground">Community Meetup</div>
                <div className="text-muted-foreground">New York, NY</div>
              </div>
              <div className="text-muted-foreground text-right">Feb 5, 2026</div>
            </div>
            <div className="flex justify-between items-start text-sm">
              <div>
                <div className="font-medium text-foreground">Annual Conference</div>
                <div className="text-muted-foreground">Austin, TX</div>
              </div>
              <div className="text-muted-foreground text-right">Mar 10-12, 2026</div>
            </div>
          </div>
        </article>

        {/* Past Events Card */}
        <article className="border border-border rounded-lg p-8 hover:border-primary/50 transition-colors bg-card">
          <div className="text-sm text-muted-foreground uppercase tracking-wide mb-2">
            Archive
          </div>
          <h3 className="font-display text-2xl font-bold text-foreground mb-3">
            Past Events
          </h3>
          <p className="text-muted-foreground mb-4">
            Highlights from our previous events, conferences, and live sessions.
          </p>
          
          <div className="space-y-3 mb-6">
            <div className="flex justify-between items-start text-sm">
              <div>
                <div className="font-medium text-foreground">Season 5 Launch Party</div>
                <div className="text-muted-foreground">Los Angeles, CA</div>
              </div>
              <div className="text-muted-foreground text-right">Dec 15, 2025</div>
            </div>
            <div className="flex justify-between items-start text-sm">
              <div>
                <div className="font-medium text-foreground">Podcasting Workshop</div>
                <div className="text-muted-foreground">Online</div>
              </div>
              <div className="text-muted-foreground text-right">Nov 8, 2025</div>
            </div>
            <div className="flex justify-between items-start text-sm">
              <div>
                <div className="font-medium text-foreground">Creator Summit</div>
                <div className="text-muted-foreground">Chicago, IL</div>
              </div>
              <div className="text-muted-foreground text-right">Oct 20, 2025</div>
            </div>
          </div>
        </article>
      </div>
    </section>
  );
};

export default EventsSection;

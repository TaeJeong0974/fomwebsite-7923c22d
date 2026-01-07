const HeroSection = () => {
  return (
    <section className="container mx-auto px-4 sm:px-6 lg:px-8">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
        {/* Content */}
        <div className="lg:col-span-7">
          <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground leading-tight">
            Stories, Ideas & Live Experiences
          </h1>
          <p className="mt-4 text-lg sm:text-xl text-muted-foreground max-w-2xl">
            Join us for weekly podcast episodes and exclusive live events. 
            Discover conversations that inspire and gatherings that connect.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row gap-4">
            <a
              href="#podcast"
              className="inline-flex items-center justify-center px-6 py-3 bg-primary text-primary-foreground font-medium rounded-md hover:bg-primary/90 transition-colors"
            >
              Listen Now
            </a>
            <a
              href="#events"
              className="inline-flex items-center justify-center px-6 py-3 border border-border text-foreground font-medium rounded-md hover:bg-muted transition-colors"
            >
              Upcoming Events
            </a>
          </div>
        </div>

        {/* Visual placeholder */}
        <div className="lg:col-span-5">
          <div className="aspect-square bg-muted rounded-lg flex items-center justify-center">
            <span className="text-muted-foreground">Hero Image</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;

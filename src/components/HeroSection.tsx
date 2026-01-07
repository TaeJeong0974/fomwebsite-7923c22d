const HeroSection = () => {
  return (
    <section className="h-[70vh] flex items-center container mx-auto px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl">
        <p className="text-sm text-muted-foreground uppercase tracking-widest mb-4">
          Podcast & Events
        </p>
        <h1 className="font-display text-5xl sm:text-6xl lg:text-7xl xl:text-8xl font-bold text-foreground leading-[1.1]">
          Stories, Ideas & Live Experiences
        </h1>
      </div>
    </section>
  );
};

export default HeroSection;

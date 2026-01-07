const LargeTextSection = () => {
  return (
    <section className="min-h-screen flex items-center">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl">
          <p className="font-display text-3xl sm:text-4xl lg:text-5xl xl:text-6xl text-foreground leading-relaxed">
            We believe in the power of conversation. Every week, we bring together 
            <span className="text-primary"> thinkers, creators, and innovators </span> 
            to explore ideas that shape our world and inspire meaningful change.
          </p>
        </div>
      </div>
    </section>
  );
};

export default LargeTextSection;

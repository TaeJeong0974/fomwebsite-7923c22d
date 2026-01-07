const LargeTextSection = () => {
  return (
    <section className="pt-20 lg:pt-28 pb-0">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl">
          <p className="font-display text-2xl sm:text-3xl lg:text-4xl xl:text-5xl text-foreground leading-relaxed">
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

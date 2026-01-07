const speakers = [
  {
    id: 1,
    name: "Sarah Chen",
    role: "Tech Futurist",
    image: null,
  },
  {
    id: 2,
    name: "Marcus Johnson",
    role: "Creative Director",
    image: null,
  },
  {
    id: 3,
    name: "Elena Rodriguez",
    role: "Sustainability Expert",
    image: null,
  },
  {
    id: 4,
    name: "David Park",
    role: "Founder & CEO",
    image: null,
  },
  {
    id: 5,
    name: "Amara Williams",
    role: "Author & Speaker",
    image: null,
  },
];

const SpeakersSection = () => {
  return (
    <section id="speakers" className="container mx-auto px-4 sm:px-6 lg:px-8">
      <div className="mb-8">
        <h2 className="font-display text-3xl sm:text-4xl font-bold text-foreground">
          Featured Speakers
        </h2>
        <p className="mt-2 text-muted-foreground">
          Voices that inspire and challenge
        </p>
      </div>

      {/* Horizontal scroll on mobile, full width scroll on all */}
      <div className="flex gap-6 overflow-x-auto pb-4 -mx-4 px-4 sm:mx-0 sm:px-0 snap-x snap-mandatory scrollbar-hide">
        {speakers.map((speaker) => (
          <article
            key={speaker.id}
            className="flex-shrink-0 w-64 sm:w-72 lg:w-80 snap-start"
          >
            {/* Image placeholder */}
            <div className="aspect-[3/4] bg-muted rounded-lg mb-4 flex items-center justify-center">
              <span className="text-muted-foreground text-sm">Photo</span>
            </div>
            <h3 className="font-display text-lg font-semibold text-foreground">
              {speaker.name}
            </h3>
            <p className="text-muted-foreground text-sm">
              {speaker.role}
            </p>
          </article>
        ))}
      </div>
    </section>
  );
};

export default SpeakersSection;

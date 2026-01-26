import { motion } from "framer-motion";
import speaker1 from "@/assets/speaker-1.png";
import speaker2 from "@/assets/speaker-2.png";
import speaker3 from "@/assets/speaker-3.png";
import speaker4 from "@/assets/speaker-4.png";

const speakerImages = [speaker1, speaker2, speaker3, speaker4];

const speakers = [{
  id: 1,
  name: "Sara Varni",
  title: "Chief Marketing Officer",
  company: "Datadog",
  companyDomain: "datadoghq.com",
  bio: "Building the future of cloud monitoring through data-driven marketing strategies."
}, {
  id: 2,
  name: "Lindsey Irvine",
  title: "Chief Marketing Officer",
  company: "Square",
  companyDomain: "squareup.com",
  bio: "Empowering small businesses with accessible financial tools and innovative campaigns."
}, {
  id: 3,
  name: "Ceci Stallsmith",
  title: "Chief Marketing Officer",
  company: "Loveable",
  companyDomain: "lovable.dev",
  bio: "Pioneering AI-powered product development and redefining how teams build software."
}, {
  id: 4,
  name: "Dave Steer",
  title: "Chief Marketing Officer",
  company: "Webflow",
  companyDomain: "webflow.com",
  bio: "Championing the no-code movement and democratizing web design for creators."
}];

const SpeakerCard = ({
  speaker,
  index
}: {
  speaker: typeof speakers[0];
  index: number;
}) => {
  const firstName = speaker.name.split(' ')[0];
  const lastName = speaker.name.split(' ').slice(1).join(' ');
  
  return (
    <motion.article 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: index * 0.1 }}
      className="group"
    >
      <div className="card-base card-image hover-scale">
        {/* Photo Layer - hidden at rest, revealed on hover */}
        <div className="absolute inset-0 opacity-0 hover-transition group-hover:opacity-100">
          <img src={speakerImages[index]} alt={speaker.name} className="w-full h-full object-cover" />
          <div className="card-overlay" />
        </div>
        {/* Light grey background for rest state */}
        <div className="absolute inset-0 bg-muted hover-transition group-hover:opacity-0" />

        {/* Company favicon badge */}
        <div className="absolute top-4 left-4 glass rounded-xl p-2.5 hover-scale-badge">
          <img 
            src={`https://www.google.com/s2/favicons?domain=${speaker.companyDomain}&sz=64`} 
            alt={speaker.company}
            className="h-5 w-5 object-contain"
          />
        </div>

        {/* Content - always visible at bottom */}
        <div className="card-content-bottom card-padding">
          <h3 className="font-display text-white leading-[0.95] tracking-tight">
            <span className="block text-2xl sm:text-3xl lg:text-4xl font-semibold">
              {firstName}
            </span>
            <span className="block text-2xl sm:text-3xl lg:text-4xl font-semibold">
              {lastName}
            </span>
          </h3>
          
          {/* Reveal content on hover */}
          <div className="max-h-32 mt-4 md:max-h-0 md:mt-0 overflow-hidden md:opacity-0 md:translate-y-3 hover-transition md:group-hover:max-h-32 md:group-hover:mt-3 md:group-hover:opacity-100 md:group-hover:translate-y-0">
            <p className="text-body-sm text-white/70">
              {speaker.title}
            </p>
            <p className="text-body-sm font-medium text-primary">
              {speaker.company}
            </p>
            <p className="text-body-sm leading-relaxed text-white/60 mt-2">
              {speaker.bio}
            </p>
          </div>
        </div>
      </div>
    </motion.article>
  );
};

const SpeakersRevealSection = () => {
  return (
    <section className="section-spacing">
      <div className="container mx-auto container-padding">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-8 lg:mb-12"
        >
          <p className="text-label mb-2">FEATURED</p>
          <h2 className="text-display-lg text-foreground">Speakers</h2>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-4 grid-gap">
          {speakers.map((speaker, index) => (
            <SpeakerCard key={speaker.id} speaker={speaker} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default SpeakersRevealSection;

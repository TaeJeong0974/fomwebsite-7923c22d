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
      className="relative aspect-[4/5] bg-muted/40 rounded-2xl overflow-hidden cursor-pointer group"
    >
      {/* Photo Layer - Hidden by default, reveals on hover */}
      <div className="absolute inset-0 opacity-0 scale-[1.02] transition-all duration-500 ease-[cubic-bezier(0.33,1,0.68,1)] group-hover:opacity-100 group-hover:scale-100">
        <img src={speakerImages[index]} alt={speaker.name} className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
      </div>

      {/* Rest State - Visible by default, fades on hover */}
      <div className="absolute inset-0 flex flex-col justify-between p-5 lg:p-6 transition-all duration-500 ease-[cubic-bezier(0.33,1,0.68,1)] group-hover:opacity-0 group-hover:-translate-y-2">
        {/* Company favicon badge */}
        <div className="glass rounded-xl p-2.5 w-fit">
          <img 
            src={`https://www.google.com/s2/favicons?domain=${speaker.companyDomain}&sz=64`} 
            alt={speaker.company}
            className="h-5 w-5 object-contain"
          />
        </div>
        
        {/* Name at bottom - two lines */}
        <h3 className="font-display text-foreground leading-[0.95] tracking-tight">
          <span className="block text-2xl sm:text-3xl lg:text-4xl font-semibold">
            {firstName}
          </span>
          <span className="block text-2xl sm:text-3xl lg:text-4xl font-semibold">
            {lastName}
          </span>
        </h3>
      </div>

      {/* Hover State - Hidden by default, reveals on hover */}
      <div className="absolute inset-x-0 bottom-0 p-5 lg:p-6 opacity-0 translate-y-3 transition-all duration-500 ease-[cubic-bezier(0.33,1,0.68,1)] group-hover:opacity-100 group-hover:translate-y-0">
        {/* Name - same style as rest state */}
        <h3 className="font-display text-white leading-[0.95] tracking-tight">
          <span className="block text-2xl sm:text-3xl lg:text-4xl font-semibold">
            {firstName}
          </span>
          <span className="block text-2xl sm:text-3xl lg:text-4xl font-semibold">
            {lastName}
          </span>
        </h3>
        <p className="text-sm text-white/70 mt-1">
          {speaker.title}
        </p>
        <p className="text-sm font-medium text-primary">
          {speaker.company}
        </p>
        
        {/* Bio that pushes up on hover */}
        <div className="max-h-0 mt-0 overflow-hidden opacity-0 translate-y-3 transition-all duration-500 ease-[cubic-bezier(0.33,1,0.68,1)] group-hover:max-h-32 group-hover:mt-3 group-hover:opacity-100 group-hover:translate-y-0">
          <p className="text-sm leading-relaxed text-white/60">
            {speaker.bio}
          </p>
        </div>
      </div>
    </motion.article>
  );
};

const SpeakersRevealSection = () => {
  return (
    <section className="py-20 lg:py-28">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-8 lg:mb-12"
        >
          <p className="text-[10px] text-muted-foreground uppercase tracking-[0.3em] mb-2 font-medium">FEATURED</p>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-semibold text-foreground tracking-tight">Speakers</h2>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 lg:gap-6">
          {speakers.map((speaker, index) => (
            <SpeakerCard key={speaker.id} speaker={speaker} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default SpeakersRevealSection;

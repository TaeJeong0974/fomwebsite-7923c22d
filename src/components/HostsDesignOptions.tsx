import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, Linkedin } from "lucide-react";
import speaker2 from "@/assets/speaker-2.png";
import speaker3 from "@/assets/speaker-3.png";
import speaker4 from "@/assets/speaker-4.png";

const hosts = [
  {
    name: "Camille Ricketts",
    title: "Partner, XYZ Venture Capital",
    bioShort: "Leads investments in product-led growth and go-to-market software startups. Previously the first marketing leader at Notion.",
    bioFull: "Partner at XYZ Venture Capital, where she leads investments in product-led growth and go-to-market software startups. Prior, she was the first marketing leader at Notion, building out the brand, community, and more. She also founded First Round Review for First Round Capital, managed communications at Tesla, and reported for the Wall Street Journal.",
    linkedin: "https://linkedin.com/in/camillericketts",
    image: speaker4,
  },
  {
    name: "Ethan Smith",
    title: "Founder & CEO, Graphite",
    bioShort: "Runs a premium Vertical AI Growth Agency helping companies like Webflow, Notion, and MasterClass drive sustainable revenue growth.",
    bioFull: "Founder and CEO of Graphite, a premium Vertical AI Growth Agency that helps companies like Webflow, Notion, MasterClass, and Captions drive sustainable revenue growth via SEO, content, and AEO (Answer Engine Optimization). Ethan is also an adjunct professor at IE Business School.",
    linkedin: "https://linkedin.com/in/ethansmith",
    image: speaker3,
  },
  {
    name: "Mada Seghete",
    title: "CEO & Co-Founder, Upside",
    bioShort: "Built a next-gen revenue intelligence platform for B2B leaders. Previously co-founded and was CMO of Branch.",
    bioFull: "CEO and co-founder of Upside, a next-gen revenue intelligence platform for B2B leaders. Previously co-founded and was CMO of Branch, helping scale to $100M+ revenue. Cornell Engineering graduate with Masters and MBA from Stanford. Partner at XFactor Ventures investing in women founders and organizes yearly retreats for 100+ women founders.",
    linkedin: "https://linkedin.com/in/madaseghete",
    image: speaker2,
  },
];

// Option 1: Shortened Bios (current style with truncated text)
const Option1ShortenedBios = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 grid-gap">
      {hosts.map((host, index) => {
        const firstName = host.name.split(' ')[0];
        const lastName = host.name.split(' ').slice(1).join(' ');
        
        return (
          <motion.article
            key={host.name}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: index * 0.1 }}
            className="group"
          >
            <div className="card-base card-image hover-scale">
              <div className="absolute inset-0">
                <img 
                  src={host.image} 
                  alt={host.name}
                  className="w-full h-full object-cover"
                />
                <div className="card-overlay hover-transition group-hover:opacity-90" />
              </div>

              <div className="card-content-bottom card-padding">
                <h3 className="font-display text-white leading-[0.95] tracking-tight">
                  <span className="block text-2xl sm:text-3xl lg:text-4xl font-semibold">{firstName}</span>
                  <span className="block text-2xl sm:text-3xl lg:text-4xl font-semibold">{lastName}</span>
                </h3>
                <p className="text-body-sm text-white/70 mt-1">{host.title}</p>
                
                <div className="max-h-24 mt-3 md:max-h-0 md:mt-0 overflow-hidden md:opacity-0 md:translate-y-3 hover-transition md:group-hover:max-h-24 md:group-hover:mt-3 md:group-hover:opacity-100 md:group-hover:translate-y-0">
                  <p className="text-body-sm leading-relaxed text-white/60">
                    {host.bioShort}
                  </p>
                </div>
              </div>
            </div>
          </motion.article>
        );
      })}
    </div>
  );
};

// Option 2: Expanded Cards (taller cards with full bio space)
const Option2ExpandedCards = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 grid-gap">
      {hosts.map((host, index) => {
        const firstName = host.name.split(' ')[0];
        const lastName = host.name.split(' ').slice(1).join(' ');
        
        return (
          <motion.article
            key={host.name}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: index * 0.1 }}
            className="group"
          >
            <div className="card-base aspect-[3/5] relative rounded-2xl overflow-hidden">
              <div className="absolute inset-0">
                <img 
                  src={host.image} 
                  alt={host.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent" />
              </div>

              <div className="absolute bottom-0 left-0 right-0 p-5 lg:p-6">
                <h3 className="font-display text-white leading-[0.95] tracking-tight">
                  <span className="block text-2xl sm:text-3xl lg:text-4xl font-semibold">{firstName}</span>
                  <span className="block text-2xl sm:text-3xl lg:text-4xl font-semibold">{lastName}</span>
                </h3>
                <p className="text-body-sm text-white/70 mt-2">{host.title}</p>
                <p className="text-body-sm leading-relaxed text-white/60 mt-4">
                  {host.bioFull}
                </p>
                <a 
                  href={host.linkedin} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-primary text-sm font-medium mt-4 hover:underline"
                >
                  <Linkedin className="h-4 w-4" />
                  LinkedIn
                </a>
              </div>
            </div>
          </motion.article>
        );
      })}
    </div>
  );
};

// Option 3: Accordion/Modal (click to expand)
const Option3Accordion = () => {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 grid-gap">
      {hosts.map((host, index) => {
        const firstName = host.name.split(' ')[0];
        const lastName = host.name.split(' ').slice(1).join(' ');
        const isExpanded = expandedIndex === index;
        
        return (
          <motion.article
            key={host.name}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: index * 0.1 }}
            className="group"
          >
            <div 
              className="card-base card-image hover-scale cursor-pointer"
              onClick={() => setExpandedIndex(isExpanded ? null : index)}
            >
              <div className="absolute inset-0">
                <img 
                  src={host.image} 
                  alt={host.name}
                  className="w-full h-full object-cover"
                />
                <div className="card-overlay" />
              </div>

              <div className="card-content-bottom card-padding">
                <div className="flex items-end justify-between">
                  <div>
                    <h3 className="font-display text-white leading-[0.95] tracking-tight">
                      <span className="block text-2xl sm:text-3xl lg:text-4xl font-semibold">{firstName}</span>
                      <span className="block text-2xl sm:text-3xl lg:text-4xl font-semibold">{lastName}</span>
                    </h3>
                    <p className="text-body-sm text-white/70 mt-1">{host.title}</p>
                  </div>
                  <motion.div
                    animate={{ rotate: isExpanded ? 180 : 0 }}
                    transition={{ duration: 0.3 }}
                    className="glass rounded-full p-2"
                  >
                    <ChevronDown className="h-5 w-5 text-white" />
                  </motion.div>
                </div>
                
                <AnimatePresence>
                  {isExpanded && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden"
                    >
                      <p className="text-body-sm leading-relaxed text-white/60 mt-4">
                        {host.bioFull}
                      </p>
                      <a 
                        href={host.linkedin} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        onClick={(e) => e.stopPropagation()}
                        className="inline-flex items-center gap-2 text-primary text-sm font-medium mt-3 hover:underline"
                      >
                        <Linkedin className="h-4 w-4" />
                        Connect on LinkedIn
                      </a>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </motion.article>
        );
      })}
    </div>
  );
};

// Option 4: Intro + Hero Host (section intro with prominent single host)
const Option4IntroHero = () => {
  const [activeHost, setActiveHost] = useState(0);
  const host = hosts[activeHost];
  const firstName = host.name.split(' ')[0];
  const lastName = host.name.split(' ').slice(1).join(' ');

  return (
    <div className="space-y-8 lg:space-y-12">
      {/* Intro Copy */}
      <div className="max-w-3xl">
        <p className="text-body-lg text-muted-foreground leading-relaxed">
          Your hosts are seasoned marketing leaders who've built iconic brands, scaled startups to $100M+, and now share their insights with the next generation of growth pioneers.
        </p>
      </div>

      {/* Host Selector Tabs */}
      <div className="flex flex-wrap gap-2">
        {hosts.map((h, idx) => (
          <button
            key={h.name}
            onClick={() => setActiveHost(idx)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
              activeHost === idx 
                ? "bg-foreground text-background" 
                : "glass text-muted-foreground hover:text-foreground"
            }`}
          >
            {h.name}
          </button>
        ))}
      </div>

      {/* Hero Host Card */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeHost}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.4 }}
          className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-10"
        >
          {/* Large Photo */}
          <div className="aspect-[4/5] lg:aspect-[3/4] relative rounded-2xl overflow-hidden">
            <img 
              src={host.image} 
              alt={host.name}
              className="w-full h-full object-cover"
            />
          </div>

          {/* Bio Content */}
          <div className="flex flex-col justify-center py-4 lg:py-8">
            <h3 className="font-display text-foreground leading-[0.95] tracking-tight">
              <span className="block text-4xl sm:text-5xl lg:text-6xl font-semibold">{firstName}</span>
              <span className="block text-4xl sm:text-5xl lg:text-6xl font-semibold">{lastName}</span>
            </h3>
            <p className="text-body text-primary font-medium mt-3">{host.title}</p>
            
            <p className="text-body-lg leading-relaxed text-muted-foreground mt-6">
              {host.bioFull}
            </p>
            
            <a 
              href={host.linkedin} 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-foreground text-sm font-medium mt-6 hover:text-primary transition-colors"
            >
              <Linkedin className="h-5 w-5" />
              Connect on LinkedIn
            </a>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

// Main component showing all options
const HostsDesignOptions = () => {
  return (
    <section className="section-spacing">
      <div className="container mx-auto container-padding space-y-24">
        {/* Option 1 */}
        <div>
          <div className="mb-8">
            <span className="glass rounded-full px-3 py-1 text-xs font-medium text-primary">Option 1</span>
            <h3 className="text-display-lg text-foreground mt-3">Shortened Bios</h3>
            <p className="text-body text-muted-foreground mt-2">Truncated text that fits the current card design. Bio reveals on hover.</p>
          </div>
          <Option1ShortenedBios />
        </div>

        {/* Option 2 */}
        <div>
          <div className="mb-8">
            <span className="glass rounded-full px-3 py-1 text-xs font-medium text-primary">Option 2</span>
            <h3 className="text-display-lg text-foreground mt-3">Expanded Cards</h3>
            <p className="text-body text-muted-foreground mt-2">Taller cards with full bios always visible. LinkedIn link included.</p>
          </div>
          <Option2ExpandedCards />
        </div>

        {/* Option 3 */}
        <div>
          <div className="mb-8">
            <span className="glass rounded-full px-3 py-1 text-xs font-medium text-primary">Option 3</span>
            <h3 className="text-display-lg text-foreground mt-3">Accordion Reveal</h3>
            <p className="text-body text-muted-foreground mt-2">Click to expand and reveal full bio with smooth animation.</p>
          </div>
          <Option3Accordion />
        </div>

        {/* Option 4 */}
        <div>
          <div className="mb-8">
            <span className="glass rounded-full px-3 py-1 text-xs font-medium text-primary">Option 4</span>
            <h3 className="text-display-lg text-foreground mt-3">Intro + Hero Host</h3>
            <p className="text-body text-muted-foreground mt-2">Section intro with tabbed navigation to a single, prominent host display.</p>
          </div>
          <Option4IntroHero />
        </div>
      </div>
    </section>
  );
};

export default HostsDesignOptions;

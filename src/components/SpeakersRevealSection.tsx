import { motion } from "framer-motion";
import { useMemo } from "react";
import speaker1 from "@/assets/speaker-1.png";
import speaker2 from "@/assets/speaker-2.png";
import speaker3 from "@/assets/speaker-3.png";
import speaker4 from "@/assets/speaker-4.png";

const speakerImages = [speaker1, speaker2, speaker3, speaker4];

// Convert hex to HSL
const hexToHSL = (hexColor: string) => {
  const hex = hexColor.replace('#', '');
  const r = parseInt(hex.substr(0, 2), 16) / 255;
  const g = parseInt(hex.substr(2, 2), 16) / 255;
  const b = parseInt(hex.substr(4, 2), 16) / 255;
  
  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  let h = 0, s = 0, l = (max + min) / 2;
  
  if (max !== min) {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    switch (max) {
      case r: h = ((g - b) / d + (g < b ? 6 : 0)) / 6; break;
      case g: h = ((b - r) / d + 2) / 6; break;
      case b: h = ((r - g) / d + 4) / 6; break;
    }
  }
  
  return { h: h * 360, s: s * 100, l: l * 100 };
};

// Generate 6x5 grid with diagonal gradient from lighter (bottom-left) to darker (top-right)
const generateMosaicGrid = (hexColor: string) => {
  const { h, s, l } = hexToHSL(hexColor);
  const cols = 6;
  const rows = 5;
  const tiles: string[] = [];
  
  for (let row = 0; row < rows; row++) {
    for (let col = 0; col < cols; col++) {
      // Calculate diagonal position: bottom-left (0) to top-right (1)
      // row 0 = top, row 4 = bottom
      // col 0 = left, col 5 = right
      const diagonalPos = (col + (rows - 1 - row)) / (cols + rows - 2);
      
      // Lightness: lighter at bottom-left (high L), darker at top-right (low L)
      // Map diagonalPos 0->1 to lightness offset +15 to -15
      const lightnessOffset = 15 - (diagonalPos * 30);
      
      // Add subtle deterministic variation (±5%)
      const variation = (((col * 7 + row * 11) % 11) - 5);
      
      const newL = Math.max(15, Math.min(85, l + lightnessOffset + variation));
      
      tiles.push(`hsl(${Math.round(h)}, ${Math.round(s)}%, ${Math.round(newL)}%)`);
    }
  }
  
  return tiles;
};

// Mosaic pattern component - 6x5 grid with diagonal gradient
const MosaicPattern = ({ brandColor }: { brandColor: string }) => {
  const tiles = useMemo(() => generateMosaicGrid(brandColor), [brandColor]);
  
  return (
    <div 
      className="absolute inset-0 grid grid-cols-6 grid-rows-5"
      style={{ backgroundColor: brandColor }}
    >
      {tiles.map((color, i) => (
        <div key={i} style={{ backgroundColor: color }} />
      ))}
    </div>
  );
};

const speakers = [{
  id: 1,
  name: "Sara Varni",
  title: "Chief Marketing Officer",
  company: "Datadog",
  companyDomain: "datadoghq.com",
  brandColor: "#632CA6", // Datadog purple
  bio: "Building the future of cloud monitoring through data-driven marketing strategies."
}, {
  id: 2,
  name: "Lindsey Irvine",
  title: "Chief Marketing Officer",
  company: "Square",
  companyDomain: "squareup.com",
  brandColor: "#006AFF", // Square blue
  bio: "Empowering small businesses with accessible financial tools and innovative campaigns."
}, {
  id: 3,
  name: "Ceci Stallsmith",
  title: "Chief Marketing Officer",
  company: "Loveable",
  companyDomain: "lovable.dev",
  brandColor: "#F97316", // Lovable orange
  bio: "Pioneering AI-powered product development and redefining how teams build software."
}, {
  id: 4,
  name: "Dave Steer",
  title: "Chief Marketing Officer",
  company: "Webflow",
  companyDomain: "webflow.com",
  brandColor: "#4353FF", // Webflow blue
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
        {/* Brand Color Mosaic - visible at rest, fades on hover */}
        <div className="absolute inset-0 hover-transition group-hover:opacity-0">
          <MosaicPattern brandColor={speaker.brandColor} />
        </div>
        
        {/* Photo Layer - hidden at rest, reveals on hover */}
        <div className="absolute inset-0 opacity-0 hover-transition group-hover:opacity-100">
          <img src={speakerImages[index]} alt={speaker.name} className="w-full h-full object-cover" />
          <div className="card-overlay" />
        </div>

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

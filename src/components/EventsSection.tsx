import { useState } from "react";
import { Play, ChevronLeft, ChevronRight } from "lucide-react";

// Layout 1: Two column - text left aligned to bottom, video right
const Layout1 = () => (
  <div className="relative grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
    {/* Left Content - aligned to bottom */}
    <div className="flex flex-col justify-end">
      <span className="text-label text-muted-foreground mb-4">Past Event</span>
      <h2 className="text-[3rem] sm:text-[4rem] lg:text-[5rem] xl:text-[6rem] font-display font-bold leading-[0.9] tracking-tight">
        FOM<br />2025
      </h2>
      <p className="text-body-sm text-muted-foreground mt-6 max-w-sm">
        San Francisco, CA
      </p>
      <p className="text-body text-muted-foreground mt-3 max-w-sm">
        An evening of insights, networking, and conversations about the future of AI in marketing.
      </p>
      <button className="mt-8 text-label hover:opacity-70 hover-transition flex items-center gap-2 group w-fit">
        Watch Recap
        <span className="w-8 h-[1px] bg-foreground group-hover:w-12 hover-transition" />
      </button>
    </div>

    {/* Right Video */}
    <div className="relative aspect-[16/9] overflow-hidden rounded-xl group cursor-pointer">
      <video
        autoPlay
        muted
        loop
        playsInline
        className="absolute inset-0 w-full h-full object-cover"
        poster="https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=1920&q=80"
      >
        <source src="https://assets.mixkit.co/videos/preview/mixkit-crowd-at-a-concert-seen-from-behind-4611-large.mp4" type="video/mp4" />
      </video>
      <div className="absolute inset-0 bg-black/20 group-hover:bg-black/30 hover-transition" />
      
      {/* Play Button */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="w-20 h-20 rounded-full bg-white/10 backdrop-blur-xl border border-white/20 flex items-center justify-center group-hover:scale-110 hover-transition">
          <Play className="w-8 h-8 text-white fill-white ml-1" />
        </div>
      </div>
    </div>
  </div>
);

// Layout 3: Stacked with massive overlapping title
const Layout3 = () => (
  <div className="relative">
    {/* Large Title */}
    <h2 className="text-[4rem] sm:text-[6rem] lg:text-[10rem] xl:text-[12rem] font-display font-bold leading-[0.85] tracking-tight mb-[-2rem] sm:mb-[-3rem] lg:mb-[-5rem] relative z-10">
      FOM<br />2025
    </h2>

    {/* Video Container - offset to the right */}
    <div className="relative ml-auto w-full lg:w-3/4 aspect-[16/9] overflow-hidden rounded-xl group cursor-pointer">
      <video
        autoPlay
        muted
        loop
        playsInline
        className="absolute inset-0 w-full h-full object-cover"
        poster="https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=1920&q=80"
      >
        <source src="https://assets.mixkit.co/videos/preview/mixkit-crowd-at-a-concert-seen-from-behind-4611-large.mp4" type="video/mp4" />
      </video>
      <div className="absolute inset-0 bg-black/20 group-hover:bg-black/30 hover-transition" />
      
      {/* Play Button */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="w-20 h-20 rounded-full bg-white/10 backdrop-blur-xl border border-white/20 flex items-center justify-center group-hover:scale-110 hover-transition">
          <Play className="w-8 h-8 text-white fill-white ml-1" />
        </div>
      </div>
    </div>

    {/* Meta info */}
    <div className="flex flex-col sm:flex-row sm:items-center justify-between mt-6 gap-4">
      <div>
        <span className="text-label text-muted-foreground">Past Event · San Francisco, CA</span>
        <p className="text-body-sm text-muted-foreground mt-2 max-w-md">
          An evening of insights, networking, and conversations about the future of AI in marketing.
        </p>
      </div>
      <button className="text-label hover:opacity-70 hover-transition flex items-center gap-2 group shrink-0">
        Watch Recap
        <span className="w-8 h-[1px] bg-foreground group-hover:w-12 hover-transition" />
      </button>
    </div>
  </div>
);

// Layout 4: Side by side with vertical title
const Layout4 = () => (
  <div className="relative grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-0 items-stretch min-h-[500px] lg:min-h-[600px]">
    {/* Vertical Title - Left */}
    <div className="lg:col-span-3 flex lg:flex-col items-start lg:items-center justify-between lg:justify-center lg:border-r border-border lg:pr-6">
      <div className="lg:-rotate-90 lg:whitespace-nowrap">
        <h2 className="text-[3rem] sm:text-[4rem] lg:text-[5rem] font-display font-bold leading-[0.9] tracking-tight">
          FOM 2025
        </h2>
      </div>
      <span className="text-label text-muted-foreground lg:mt-auto lg:rotate-0">Past Event</span>
    </div>

    {/* Video - Center/Right */}
    <div className="lg:col-span-7 relative aspect-[4/3] lg:aspect-auto overflow-hidden rounded-xl group cursor-pointer">
      <video
        autoPlay
        muted
        loop
        playsInline
        className="absolute inset-0 w-full h-full object-cover"
        poster="https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=1920&q=80"
      >
        <source src="https://assets.mixkit.co/videos/preview/mixkit-crowd-at-a-concert-seen-from-behind-4611-large.mp4" type="video/mp4" />
      </video>
      <div className="absolute inset-0 bg-black/20 group-hover:bg-black/30 hover-transition" />
      
      {/* Play Button */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="w-20 h-20 rounded-full bg-white/10 backdrop-blur-xl border border-white/20 flex items-center justify-center group-hover:scale-110 hover-transition">
          <Play className="w-8 h-8 text-white fill-white ml-1" />
        </div>
      </div>
    </div>

    {/* Right info panel */}
    <div className="lg:col-span-2 flex flex-col justify-between lg:pl-6">
      <div>
        <p className="text-body-sm text-muted-foreground">
          San Francisco, CA
        </p>
        <p className="text-body-sm text-muted-foreground mt-4">
          An evening of insights and networking about the future of AI in marketing.
        </p>
      </div>
      <button className="mt-6 lg:mt-0 text-label hover:opacity-70 hover-transition flex items-center gap-2 group">
        Watch Recap
        <span className="w-8 h-[1px] bg-foreground group-hover:w-12 hover-transition" />
      </button>
    </div>
  </div>
);

const layouts = [Layout1, Layout3, Layout4];
const layoutNames = ["Two Column Split", "Massive Title Stack", "Vertical Title"];

const EventsSection = () => {
  const [currentLayout, setCurrentLayout] = useState(0);
  const CurrentLayout = layouts[currentLayout];

  const nextLayout = () => setCurrentLayout((prev) => (prev + 1) % layouts.length);
  const prevLayout = () => setCurrentLayout((prev) => (prev - 1 + layouts.length) % layouts.length);

  return (
    <section id="events" className="section-spacing">
      <div className="container mx-auto container-padding">
        {/* Layout Switcher */}
        <div className="flex items-center justify-center gap-4 mb-12 pb-6 border-b border-border">
          <button 
            onClick={prevLayout}
            className="w-10 h-10 rounded-full border border-border flex items-center justify-center hover:bg-muted hover-transition"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <div className="text-center min-w-[200px]">
            <span className="text-label text-muted-foreground">Layout {currentLayout + 1} of 3</span>
            <p className="text-body font-medium mt-1">{layoutNames[currentLayout]}</p>
          </div>
          <button 
            onClick={nextLayout}
            className="w-10 h-10 rounded-full border border-border flex items-center justify-center hover:bg-muted hover-transition"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>

        {/* Current Layout */}
        <CurrentLayout />
      </div>
    </section>
  );
};

export default EventsSection;

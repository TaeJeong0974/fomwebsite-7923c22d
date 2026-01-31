import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { ScrollReveal, StaggerContainer, StaggerItem } from "@/components/animations/ScrollReveal";
import { ParallaxSection } from "@/components/animations/ParallaxSection";
import { StickyHorizontalScroll } from "@/components/animations/StickySection";

const liquidEase = [0.22, 1, 0.36, 1] as const;

const AnimationDemo = () => {
  const parallaxRef = useRef<HTMLDivElement>(null);
  const stickyRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: parallaxRef,
    offset: ["start end", "end start"]
  });
  
  const { scrollYProgress: stickyProgress } = useScroll({
    target: stickyRef,
    offset: ["start start", "end end"]
  });
  
  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0.3, 1, 1, 0.3]);
  
  // Sticky section transforms
  const slide1Opacity = useTransform(stickyProgress, [0, 0.15, 0.3, 0.35], [1, 1, 0, 0]);
  const slide1Y = useTransform(stickyProgress, [0, 0.15, 0.3], [0, 0, -100]);
  
  const slide2Opacity = useTransform(stickyProgress, [0.25, 0.35, 0.6, 0.7], [0, 1, 1, 0]);
  const slide2Y = useTransform(stickyProgress, [0.25, 0.35, 0.6, 0.7], [100, 0, 0, -100]);
  
  const slide3Opacity = useTransform(stickyProgress, [0.6, 0.75, 1], [0, 1, 1]);
  const slide3Y = useTransform(stickyProgress, [0.6, 0.75], [100, 0]);

  const stickySlides = [
    {
      title: "Step 1",
      subtitle: "Content Pins in Place",
      description: "The section stays fixed while you scroll, creating focused attention.",
      opacity: slide1Opacity,
      y: slide1Y,
    },
    {
      title: "Step 2", 
      subtitle: "Content Transitions",
      description: "New content smoothly animates in as you continue scrolling.",
      opacity: slide2Opacity,
      y: slide2Y,
    },
    {
      title: "Step 3",
      subtitle: "Section Releases",
      description: "Once complete, the section unpins and normal scrolling resumes.",
      opacity: slide3Opacity,
      y: slide3Y,
    },
  ];

  return (
    <section className="border-t border-border/30">
      <div className="container mx-auto container-padding section-spacing">
        {/* Section Header */}
        <ScrollReveal variant="fadeUp" className="mb-16">
          <p className="text-label mb-2">DEMO</p>
          <h2 className="text-display-xl text-foreground">Scroll Animations</h2>
        </ScrollReveal>

        {/* Option 1: Reveal on Scroll */}
        <div className="mb-24">
          <ScrollReveal variant="fadeUp" className="mb-8">
            <h3 className="text-display-lg text-foreground">Option 1: Reveal on Scroll</h3>
            <p className="text-body text-muted-foreground mt-2">Elements fade and slide in as they enter the viewport</p>
          </ScrollReveal>

          <StaggerContainer className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {["fadeUp", "scale", "blur"].map((variant, i) => (
              <StaggerItem key={variant} variant={variant as any}>
                <div className="glass rounded-xl p-8 text-center">
                  <div className="w-12 h-12 rounded-full bg-foreground/10 mx-auto mb-4 flex items-center justify-center">
                    <span className="text-lg font-medium">{i + 1}</span>
                  </div>
                  <p className="text-body-sm text-foreground font-medium capitalize">{variant}</p>
                  <p className="text-body-xs text-muted-foreground mt-1">
                    {variant === "fadeUp" && "Slides up while fading in"}
                    {variant === "scale" && "Scales up while fading in"}
                    {variant === "blur" && "Unblurs while fading in"}
                  </p>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>

          {/* Staggered row demo */}
          <StaggerContainer className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-4">
            {[1, 2, 3, 4].map((num) => (
              <StaggerItem key={num}>
                <div className="aspect-video rounded-lg bg-gradient-to-br from-foreground/5 to-foreground/10 flex items-center justify-center">
                  <span className="text-2xl font-display font-semibold text-foreground/30">{num}</span>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>

        {/* Option 2: Parallax Depth */}
        <div className="mb-24" ref={parallaxRef}>
          <ScrollReveal variant="fadeUp" className="mb-8">
            <h3 className="text-display-lg text-foreground">Option 2: Parallax Depth</h3>
            <p className="text-body text-muted-foreground mt-2">Layers move at different speeds for a 3D depth effect</p>
          </ScrollReveal>

          {/* Parallax demo with layers */}
          <div className="relative h-[400px] rounded-xl overflow-hidden">
            {/* Background layer - moves slower */}
            <motion.div 
              className="absolute inset-0"
              style={{ y: backgroundY, opacity }}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-foreground/5 via-foreground/10 to-foreground/5" />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-64 h-64 rounded-full border-2 border-dashed border-foreground/10" />
                <div className="absolute w-48 h-48 rounded-full border-2 border-dashed border-foreground/10" />
                <div className="absolute w-32 h-32 rounded-full border-2 border-dashed border-foreground/10" />
              </div>
            </motion.div>

            {/* Foreground content */}
            <ParallaxSection speed={0.3} className="absolute inset-0 flex items-center justify-center">
              <div className="text-center">
                <p className="text-label mb-2">BACKGROUND MOVES SLOWER</p>
                <h4 className="text-display-lg text-foreground mb-4">Creating Depth</h4>
                <p className="text-body text-muted-foreground max-w-md mx-auto">
                  Scroll slowly to see how different layers move at different speeds, creating a sense of depth and dimension.
                </p>
              </div>
            </ParallaxSection>
          </div>

          {/* Parallax cards */}
          <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-8">
            <ParallaxSection speed={0.15} direction="up">
              <div className="glass rounded-xl p-8">
                <h4 className="text-xl font-display font-medium text-foreground mb-2">Subtle Movement</h4>
                <p className="text-body-sm text-muted-foreground">
                  This card moves gently upward as you scroll, adding subtle dynamism.
                </p>
              </div>
            </ParallaxSection>
            
            <ParallaxSection speed={0.25} direction="down">
              <div className="glass rounded-xl p-8">
                <h4 className="text-xl font-display font-medium text-foreground mb-2">Counter Movement</h4>
                <p className="text-body-sm text-muted-foreground">
                  This card moves in the opposite direction, enhancing the depth effect.
                </p>
              </div>
            </ParallaxSection>
          </div>
        </div>
      </div>

      {/* Option 3: Sticky Sections - Full width */}
      <div className="mb-24">
        <div className="container mx-auto container-padding mb-8">
          <ScrollReveal variant="fadeUp">
            <h3 className="text-display-lg text-foreground">Option 3: Sticky Sections</h3>
            <p className="text-body text-muted-foreground mt-2">Content pins in place while scroll reveals new content within</p>
          </ScrollReveal>
        </div>

        {/* Sticky demo */}
        <div ref={stickyRef} className="relative h-[300vh]">
          <div className="sticky top-0 h-screen flex items-center justify-center overflow-hidden bg-gradient-to-b from-background via-muted/30 to-background">
            {/* Progress indicator */}
            <div className="absolute right-8 top-1/2 -translate-y-1/2 flex flex-col gap-3">
              {[0, 1, 2].map((i) => (
                <motion.div
                  key={i}
                  className="w-2 h-2 rounded-full bg-foreground/20"
                  style={{
                    scale: useTransform(
                      stickyProgress,
                      [i * 0.33, i * 0.33 + 0.1, (i + 1) * 0.33],
                      [1, 1.5, 1]
                    ),
                    opacity: useTransform(
                      stickyProgress,
                      [i * 0.33, i * 0.33 + 0.1, (i + 1) * 0.33],
                      [0.3, 1, 0.3]
                    ),
                  }}
                />
              ))}
            </div>

            {/* Slides */}
            {stickySlides.map((slide, i) => (
              <motion.div
                key={i}
                className="absolute inset-0 flex items-center justify-center px-8"
                style={{ opacity: slide.opacity, y: slide.y }}
              >
                <div className="text-center max-w-2xl">
                  <span className="text-label mb-4 block">{slide.title}</span>
                  <h4 className="text-display-lg text-foreground mb-4">{slide.subtitle}</h4>
                  <p className="text-body text-muted-foreground">{slide.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Horizontal scroll variant */}
        <div className="container mx-auto container-padding mt-16">
          <ScrollReveal variant="fadeUp" className="mb-8">
            <p className="text-label mb-2">VARIANT</p>
            <h4 className="text-xl font-display font-medium text-foreground">Horizontal Scroll</h4>
            <p className="text-body-sm text-muted-foreground mt-1">Vertical scroll translates to horizontal movement</p>
          </ScrollReveal>
        </div>
        
        <StickyHorizontalScroll>
          {[1, 2, 3].map((num) => (
            <div
              key={num}
              className="flex-shrink-0 w-[80vw] md:w-[60vw] lg:w-[40vw] h-[60vh] glass rounded-xl flex items-center justify-center"
            >
              <div className="text-center p-8">
                <span className="text-label mb-2 block">CARD {num}</span>
                <h4 className="text-display-lg text-foreground mb-4">Horizontal Slide</h4>
                <p className="text-body text-muted-foreground max-w-sm">
                  Scroll down to move through cards horizontally. Great for showcases and galleries.
                </p>
              </div>
            </div>
          ))}
        </StickyHorizontalScroll>
      </div>

      <div className="container mx-auto container-padding pb-24">
        <ScrollReveal variant="fadeUp">
          <p className="text-body text-muted-foreground text-center">
            Continue scrolling to exit the demo section
          </p>
        </ScrollReveal>
      </div>
    </section>
  );
};

export default AnimationDemo;

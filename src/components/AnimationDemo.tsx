import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { ScrollReveal, StaggerContainer, StaggerItem } from "@/components/animations/ScrollReveal";
import { ParallaxSection, ParallaxLayers } from "@/components/animations/ParallaxSection";

const AnimationDemo = () => {
  const parallaxRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: parallaxRef,
    offset: ["start end", "end start"]
  });
  
  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0.3, 1, 1, 0.3]);

  return (
    <section className="section-spacing border-t border-border/30">
      <div className="container mx-auto container-padding">
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
        <div className="mb-16" ref={parallaxRef}>
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
    </section>
  );
};

export default AnimationDemo;

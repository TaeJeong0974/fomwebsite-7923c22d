import { ScrollReveal } from "@/components/animations/ScrollReveal";
import { ParallaxSection } from "@/components/animations/ParallaxSection";
import ListenSubscribeCards from "@/components/ListenSubscribeCards";

const CTASection = () => {
  return (
    <section className="section-spacing">
      <div className="container mx-auto container-padding">
        <ParallaxSection speed={0.1} direction="up">
          <ScrollReveal variant="fadeUp" duration={0.9}>
            <ListenSubscribeCards />
          </ScrollReveal>
        </ParallaxSection>
      </div>
    </section>
  );
};

export default CTASection;

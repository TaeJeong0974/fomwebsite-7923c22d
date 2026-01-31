import { ScrollReveal } from "@/components/animations/ScrollReveal";
import ListenSubscribeCards from "@/components/ListenSubscribeCards";

const CTASection = () => {
  return (
    <section className="section-spacing">
      <div className="container mx-auto container-padding">
        <ScrollReveal variant="fadeUp" duration={0.9}>
          <ListenSubscribeCards />
        </ScrollReveal>
      </div>
    </section>
  );
};

export default CTASection;

import { useState } from "react";
import { Button } from "@/components/ui/button";

const CTASection = () => {
  const [email, setEmail] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Email submitted:", email);
    setEmail("");
  };

  return (
    <section className="container mx-auto px-4 sm:px-6 lg:px-8">
      <div className="bg-muted rounded-lg p-8 sm:p-12 lg:p-16 text-center">
        <h2 className="font-display text-2xl sm:text-3xl lg:text-4xl font-bold text-foreground">
          Never Miss an Episode or Event
        </h2>
        <p className="mt-4 text-muted-foreground max-w-xl mx-auto">
          Subscribe to our newsletter for weekly updates, exclusive content, 
          and early access to event tickets.
        </p>

        <form
          onSubmit={handleSubmit}
          className="mt-8 flex flex-col sm:flex-row gap-4 max-w-md mx-auto"
        >
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            required
            className="flex-1 px-4 py-3 rounded-md border border-border bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
          />
          <Button type="submit" className="px-6">
            Subscribe
          </Button>
        </form>

        <p className="mt-4 text-xs text-muted-foreground">
          No spam. Unsubscribe anytime.
        </p>
      </div>
    </section>
  );
};

export default CTASection;

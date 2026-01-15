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
    <section className="container mx-auto px-4 sm:px-6 lg:px-8 py-24 lg:py-32">
      {/* Two column layout: text left, form right */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
        {/* Left column - Text */}
        <div>
          <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl font-semibold text-foreground tracking-tight">
            Never Miss an Episode or Event
          </h2>
          <p className="mt-4 text-muted-foreground text-lg">
            Subscribe to our newsletter for weekly updates, exclusive content, 
            and early access to event tickets.
          </p>
        </div>

        {/* Right column - Form */}
        <div className="bg-muted rounded-lg p-6 sm:p-8">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-foreground mb-2">
                Email address
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                required
                className="w-full px-4 py-3 rounded-md border border-border bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
            <Button type="submit" className="w-full">
              Subscribe
            </Button>
            <p className="text-xs text-muted-foreground text-center">
              No spam. Unsubscribe anytime.
            </p>
          </form>
        </div>
      </div>
    </section>
  );
};

export default CTASection;

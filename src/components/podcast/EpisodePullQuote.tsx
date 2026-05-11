"use client";

interface EpisodePullQuoteProps {
  quote: string;
  attribution: string;
}

const EpisodePullQuote = ({ quote, attribution }: EpisodePullQuoteProps) => {
  return (
    <blockquote className="space-y-6 max-w-2xl">
      <p className="font-display text-lg sm:text-xl lg:text-2xl font-medium text-foreground leading-snug">
        &ldquo;{quote}&rdquo;
      </p>
      <footer>
        <cite className="text-label font-medium text-foreground not-italic">
          — {attribution}
        </cite>
      </footer>
    </blockquote>
  );
};

export default EpisodePullQuote;

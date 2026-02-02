interface EpisodePullQuoteProps {
  quote: string;
  attribution: string;
}

const EpisodePullQuote = ({ quote, attribution }: EpisodePullQuoteProps) => {
  return (
    <blockquote className="space-y-6 max-w-2xl">
      <p className="font-display text-xl sm:text-2xl lg:text-3xl font-medium text-foreground leading-snug">
        "{quote}"
      </p>
      <footer>
        <cite className="text-label not-italic">
          — {attribution}
        </cite>
      </footer>
    </blockquote>
  );
};

export default EpisodePullQuote;

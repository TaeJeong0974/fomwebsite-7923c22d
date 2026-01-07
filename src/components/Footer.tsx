const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-border">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="font-display text-lg font-bold text-foreground">
              PodEvents
            </span>
            <span className="text-muted-foreground">·</span>
            <p className="text-sm text-muted-foreground">
              Stories, ideas, and live experiences.
            </p>
          </div>
          <p className="text-sm text-muted-foreground">
            © {currentYear} PodEvents. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

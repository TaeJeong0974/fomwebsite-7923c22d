const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-border">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex flex-col items-center text-center">
          {/* Brand */}
          <span className="font-display text-xl font-bold text-foreground">
            PodEvents
          </span>
          <p className="mt-2 text-sm text-muted-foreground">
            Stories, ideas, and live experiences.
          </p>

          {/* Copyright */}
          <p className="mt-8 text-sm text-muted-foreground">
            © {currentYear} PodEvents. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

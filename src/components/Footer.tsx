const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-foreground/10 py-6 sm:py-8">
      <div className="container mx-auto container-padding flex flex-col sm:flex-row items-center justify-between gap-3 text-sm text-foreground/40">
        <p>© {year} Future of Marketing. All rights reserved.</p>
        <div className="flex items-center gap-4">
          <a href="/privacy" className="hover:text-foreground/60 transition-colors duration-300">Privacy</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

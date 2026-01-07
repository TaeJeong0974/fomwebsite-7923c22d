const Footer = () => {
  const currentYear = new Date().getFullYear();

  const footerLinks = {
    show: [
      { label: "All Episodes", href: "#" },
      { label: "Subscribe", href: "#" },
      { label: "Sponsors", href: "#" },
    ],
    events: [
      { label: "Upcoming", href: "#events" },
      { label: "Past Events", href: "#" },
      { label: "Host an Event", href: "#" },
    ],
    connect: [
      { label: "Twitter", href: "#" },
      { label: "Instagram", href: "#" },
      { label: "YouTube", href: "#" },
    ],
  };

  return (
    <footer className="border-t border-border">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Footer Grid: stacked mobile, 4-col desktop */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="col-span-2 sm:col-span-1">
            <span className="font-display text-xl font-bold text-foreground">
              PodEvents
            </span>
            <p className="mt-2 text-sm text-muted-foreground">
              Stories, ideas, and live experiences.
            </p>
          </div>

          {/* Show Links */}
          <div>
            <h4 className="font-semibold text-foreground mb-3">Show</h4>
            <ul className="space-y-2">
              {footerLinks.show.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Events Links */}
          <div>
            <h4 className="font-semibold text-foreground mb-3">Events</h4>
            <ul className="space-y-2">
              {footerLinks.events.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Connect Links */}
          <div>
            <h4 className="font-semibold text-foreground mb-3">Connect</h4>
            <ul className="space-y-2">
              {footerLinks.connect.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-12 pt-8 border-t border-border text-center">
          <p className="text-sm text-muted-foreground">
            © {currentYear} PodEvents. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

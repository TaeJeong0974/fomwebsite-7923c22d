import FomLogo from "@/assets/FOM_Logo.svg";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-border">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6 lg:py-8">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <img src={FomLogo} alt="Future of Marketing" className="h-4 opacity-50" />
            <span className="text-xs text-muted-foreground">
              Stories, ideas, and live experiences.
            </span>
          </div>
          <p className="text-xs text-muted-foreground">
            © {currentYear} Future of Marketing
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

import FomLogo from "@/assets/FOM_Logo.svg";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-border">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <img src={FomLogo} alt="Future of Marketing" className="h-5 opacity-60" />
            <span className="text-sm text-muted-foreground">
              Stories, ideas, and live experiences.
            </span>
          </div>
          <p className="text-sm text-muted-foreground">
            © {currentYear} Future of Marketing. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

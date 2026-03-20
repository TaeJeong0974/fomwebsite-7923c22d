import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { SITE_URL, DEFAULT_OG_IMAGE } from "@/lib/seoConstants";

const NotFound = () => {
  const title = "Page Not Found | Future of Marketing";
  const description = "The page you're looking for doesn't exist.";

  return (
    <div className="flex min-h-screen items-center justify-center bg-background">
      <Helmet>
        <title>{title}</title>
        <meta name="description" content={description} />
        <meta name="robots" content="noindex, nofollow" />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="og:image" content={DEFAULT_OG_IMAGE} />
        <meta property="og:url" content={SITE_URL} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={title} />
        <meta name="twitter:description" content={description} />
        <meta name="twitter:image" content={DEFAULT_OG_IMAGE} />
      </Helmet>
      <div className="text-center container-padding">
        <h1 className="text-display-xl font-bold text-foreground mb-4">404</h1>
        <p className="text-lg text-foreground mb-8">Oops! Page not found</p>
        <Link 
          to="/" 
          className="btn-base btn-glass btn-lg"
        >
          Return Home
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
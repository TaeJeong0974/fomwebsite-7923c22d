import { useEffect } from "react";

interface DocumentMetaOptions {
  title: string;
  description: string;
  ogTitle?: string;
  ogDescription?: string;
  ogImage?: string;
  ogType?: string;
  twitterCard?: string;
  canonicalUrl?: string;
  noindex?: boolean;
}

/** Sets document title and meta tags. Restores defaults on unmount. */
const useDocumentMeta = ({
  title,
  description,
  ogTitle,
  ogDescription,
  ogImage,
  ogType = "article",
  twitterCard = "summary_large_image",
  canonicalUrl,
  noindex,
}: DocumentMetaOptions) => {
  useEffect(() => {
    const prevTitle = document.title;
    document.title = title;

    const setMeta = (attr: string, key: string, content: string) => {
      let el = document.querySelector(`meta[${attr}="${key}"]`) as HTMLMetaElement | null;
      if (!el) {
        el = document.createElement("meta");
        el.setAttribute(attr, key);
        document.head.appendChild(el);
      }
      el.setAttribute("content", content);
    };

    setMeta("name", "description", description);
    setMeta("property", "og:title", ogTitle || title);
    setMeta("property", "og:description", ogDescription || description);
    setMeta("property", "og:type", ogType);
    if (ogImage) setMeta("property", "og:image", ogImage);
    setMeta("name", "twitter:card", twitterCard);
    setMeta("name", "twitter:title", ogTitle || title);
    setMeta("name", "twitter:description", ogDescription || description);
    if (ogImage) setMeta("name", "twitter:image", ogImage);

    // Robots noindex for upcoming/unpublished pages
    if (noindex) {
      setMeta("name", "robots", "noindex, nofollow");
    } else {
      const robotsMeta = document.querySelector('meta[name="robots"]');
      if (robotsMeta) robotsMeta.remove();
    }

    // Canonical
    let canonical = document.querySelector('link[rel="canonical"]') as HTMLLinkElement | null;
    if (canonicalUrl) {
      if (!canonical) {
        canonical = document.createElement("link");
        canonical.rel = "canonical";
        document.head.appendChild(canonical);
      }
      canonical.href = canonicalUrl;
    }

    return () => {
      document.title = prevTitle;
      const robotsMeta = document.querySelector('meta[name="robots"]');
      if (robotsMeta) robotsMeta.remove();
    };
  }, [title, description, ogTitle, ogDescription, ogImage, ogType, twitterCard, canonicalUrl, noindex]);
};

export default useDocumentMeta;

import { useState, useEffect, useCallback } from "react";

type FaviconColor = "black" | "white";

const STORAGE_KEY = "favicon-color";

export function useFavicon() {
  const [color, setColor] = useState<FaviconColor>(() => {
    try {
      return (localStorage.getItem(STORAGE_KEY) as FaviconColor) || "white";
    } catch {
      return "white";
    }
  });

  useEffect(() => {
    const link = document.querySelector<HTMLLinkElement>('link[rel="icon"]');
    if (link) {
      link.href = `/favicon-${color}.svg`;
    }
    try {
      localStorage.setItem(STORAGE_KEY, color);
    } catch {}
  }, [color]);

  const toggle = useCallback(() => {
    setColor((prev) => (prev === "white" ? "black" : "white"));
  }, []);

  return { color, toggle };
}

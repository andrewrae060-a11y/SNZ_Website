import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const GOOGLE_TAG_ID = "G-GVH8G1FB6P";
const GOOGLE_TAG_SRC = `https://www.googletagmanager.com/gtag/js?id=${GOOGLE_TAG_ID}`;

function ensureGoogleTag() {
  const existingScript = document.querySelector(
    `script[src="${GOOGLE_TAG_SRC}"]`
  );

  if (!existingScript) {
    const script = document.createElement("script");
    script.async = true;
    script.src = GOOGLE_TAG_SRC;
    document.head.appendChild(script);
  }

  window.dataLayer = window.dataLayer || [];

  if (typeof window.gtag !== "function") {
    window.gtag = function gtag() {
      window.dataLayer.push(arguments);
    };

    window.gtag("js", new Date());
    window.gtag("config", GOOGLE_TAG_ID, {
      send_page_view: false,
    });
  }
}

export default function useGoogleTag(pageTitle = "") {
  const location = useLocation();

  useEffect(() => {
    ensureGoogleTag();

    const timeoutId = window.setTimeout(() => {
      window.gtag("config", GOOGLE_TAG_ID, {
        page_path: `${location.pathname}${location.search}`,
        page_location: window.location.href,
        page_title: pageTitle || document.title,
      });
    }, 0);

    return () => window.clearTimeout(timeoutId);
  }, [location.pathname, location.search, pageTitle]);
}

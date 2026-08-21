import { useEffect } from "react";

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
    window.gtag("config", GOOGLE_TAG_ID);
  }
}

export default function useGoogleTag() {
  useEffect(() => {
    ensureGoogleTag();
  }, []);
}

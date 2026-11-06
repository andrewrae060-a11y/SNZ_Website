const configuredApiBase = String(
  import.meta.env.VITE_API_BASE_URL ||
    import.meta.env.VITE_CMS_API_URL ||
    ""
).replace(/\/+$/, "");

const isLocalBrowser =
  typeof window !== "undefined" &&
  ["localhost", "127.0.0.1"].includes(
    window.location.hostname
  );

// Production APIs are deployed on the same origin as the frontend.
// Local overrides are useful only while running the separate dev server.
export const API_BASE = isLocalBrowser
  ? configuredApiBase
  : "";

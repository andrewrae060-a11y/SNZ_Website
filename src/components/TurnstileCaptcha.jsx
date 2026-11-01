import { useEffect, useRef, useState } from "react";

const TURNSTILE_SCRIPT_ID = "cloudflare-turnstile-script";
const TURNSTILE_SCRIPT_URL =
  "https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit";

function loadTurnstile() {
  if (window.turnstile) {
    return Promise.resolve(window.turnstile);
  }

  return new Promise((resolve, reject) => {
    let script = document.getElementById(
      TURNSTILE_SCRIPT_ID
    );

    const handleLoad = () => resolve(window.turnstile);
    const handleError = () =>
      reject(new Error("The security check could not be loaded."));

    if (!script) {
      script = document.createElement("script");
      script.id = TURNSTILE_SCRIPT_ID;
      script.src = TURNSTILE_SCRIPT_URL;
      script.async = true;
      script.defer = true;
      document.head.appendChild(script);
    }

    script.addEventListener("load", handleLoad, {
      once: true,
    });
    script.addEventListener("error", handleError, {
      once: true,
    });
  });
}

export default function TurnstileCaptcha({
  onTokenChange,
  resetKey = 0,
}) {
  const containerRef = useRef(null);
  const widgetIdRef = useRef(null);
  const onTokenChangeRef = useRef(onTokenChange);
  const [error, setError] = useState("");
  const siteKey = String(
    import.meta.env.VITE_TURNSTILE_SITE_KEY || ""
  ).trim();
  const configurationError = siteKey
    ? ""
    : "The security check is not configured. Contact the site administrator.";

  useEffect(() => {
    onTokenChangeRef.current = onTokenChange;
  }, [onTokenChange]);

  useEffect(() => {
    let cancelled = false;

    if (!siteKey) {
      return undefined;
    }

    loadTurnstile()
      .then((turnstile) => {
        if (
          cancelled ||
          !turnstile ||
          !containerRef.current
        ) {
          return;
        }

        widgetIdRef.current = turnstile.render(
          containerRef.current,
          {
            sitekey: siteKey,
            action: "admin_login",
            theme: "light",
            size: "flexible",
            callback: (token) => {
              setError("");
              onTokenChangeRef.current(token);
            },
            "expired-callback": () =>
              onTokenChangeRef.current(""),
            "timeout-callback": () =>
              onTokenChangeRef.current(""),
            "error-callback": () => {
              onTokenChangeRef.current("");
              setError(
                "The security check failed to load. Please refresh and try again."
              );
            },
          }
        );
      })
      .catch((loadError) => {
        if (!cancelled) {
          setError(loadError.message);
        }
      });

    return () => {
      cancelled = true;

      if (
        widgetIdRef.current !== null &&
        window.turnstile
      ) {
        window.turnstile.remove(widgetIdRef.current);
        widgetIdRef.current = null;
      }
    };
  }, [resetKey, siteKey]);

  return (
    <div>
      <div ref={containerRef} className="min-h-[65px]" />

      {(configurationError || error) && (
        <p
          className="mt-2 text-sm font-bold text-red-700"
          role="alert"
        >
          {configurationError || error}
        </p>
      )}
    </div>
  );
}

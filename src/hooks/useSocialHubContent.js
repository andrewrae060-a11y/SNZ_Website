import { useEffect, useState } from "react";

export function useSocialHubContent(apiBase = import.meta.env.VITE_CMS_API_URL || "http://localhost:4000") {
  const [content, setContent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  useEffect(() => {
    const controller = new AbortController();
    fetch(`${apiBase}/api/content/social-hub`, { signal: controller.signal })
      .then(r => r.ok ? r.json() : Promise.reject(new Error("Content service unavailable")))
      .then(({ content }) => setContent(content))
      .catch(e => e.name !== "AbortError" && setError(e.message))
      .finally(() => setLoading(false));
    return () => controller.abort();
  }, [apiBase]);
  return { content, loading, error };
}

export async function subscribeToUpdates(email, consent = true, apiBase = import.meta.env.VITE_CMS_API_URL || "http://localhost:4000") {
  const response = await fetch(`${apiBase}/api/subscribers`, { method:"POST", headers:{"Content-Type":"application/json"}, body:JSON.stringify({email,consent,source:"social-hub"}) });
  if (!response.ok) throw new Error((await response.json()).error || "Subscription failed");
}

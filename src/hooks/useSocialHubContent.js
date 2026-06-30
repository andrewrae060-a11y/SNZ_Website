import {
  useEffect,
  useState,
} from "react";

const API_BASE = String(
  import.meta.env.VITE_API_BASE_URL ||
    import.meta.env.VITE_CMS_API_URL ||
    ""
).replace(/\/+$/, "");

async function requestJson(
  path,
  options = {}
) {
  const controller =
    new AbortController();

  const timeoutId =
    window.setTimeout(
      () => controller.abort(),
      15000
    );

  try {
    const response = await fetch(
      `${API_BASE}${path}`,
      {
        ...options,
        headers: {
          ...(options.body
            ? {
                "Content-Type":
                  "application/json",
              }
            : {}),
          ...(options.headers || {}),
        },
        signal: controller.signal,
      }
    );

    const contentType =
      response.headers.get(
        "content-type"
      ) || "";

    const responseBody =
      contentType.includes(
        "application/json"
      )
        ? await response.json()
        : {
            message:
              await response.text(),
          };

    if (!response.ok) {
      throw new Error(
        responseBody?.message ||
          responseBody?.error ||
          "Content service unavailable."
      );
    }

    return responseBody;
  } catch (error) {
    if (
      error.name ===
      "AbortError"
    ) {
      throw new Error(
        "The content service did not respond in time."
      );
    }

    throw error;
  } finally {
    window.clearTimeout(
      timeoutId
    );
  }
}

export function useSocialHubContent() {
  const [content, setContent] =
    useState({});

  const [loading, setLoading] =
    useState(true);

  const [error, setError] =
    useState("");

  useEffect(() => {
    let active = true;

    async function loadContent() {
      try {
        setLoading(true);
        setError("");

        const result =
          await requestJson(
            "/api/content/social-hub"
          );

        if (!active) {
          return;
        }

        setContent(
          result?.content &&
            typeof result.content ===
              "object"
            ? result.content
            : {}
        );
      } catch (requestError) {
        if (!active) {
          return;
        }

        console.error(
          "Unable to load Social Hub CMS content:",
          requestError
        );

        setContent({});
        setError(
          requestError.message ||
            "Live CMS content could not be loaded."
        );
      } finally {
        if (active) {
          setLoading(false);
        }
      }
    }

    loadContent();

    return () => {
      active = false;
    };
  }, []);

  return {
    content,
    loading,
    error,
  };
}

export async function subscribeToUpdates(
  email,
  consent = true
) {
  return requestJson(
    "/api/subscribers",
    {
      method: "POST",
      body: JSON.stringify({
        email,
        consent,
        source: "social-hub",
      }),
    }
  );
}
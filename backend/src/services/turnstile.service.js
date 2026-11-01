const TURNSTILE_VERIFY_URL =
  "https://challenges.cloudflare.com/turnstile/v0/siteverify";
const TURNSTILE_DEVELOPMENT_SECRET_KEY =
  "1x0000000000000000000000000000000AA";

export async function verifyTurnstileToken({
  token,
  remoteIp,
}) {
  const normalisedToken = String(token || "");
  const configuredSecretKey = String(
    process.env.TURNSTILE_SECRET ||
      process.env.TURNSTILE_SECRET_KEY ||
      ""
  ).trim();
  const isDevelopment =
    process.env.NODE_ENV !== "production";
  const secretKey =
    configuredSecretKey ||
    (isDevelopment
      ? TURNSTILE_DEVELOPMENT_SECRET_KEY
      : "");
  const usesDevelopmentKey =
    secretKey === TURNSTILE_DEVELOPMENT_SECRET_KEY;
  const expectedHostnames = new Set(
    String(process.env.TURNSTILE_HOSTNAMES || "")
      .split(",")
      .map((hostname) => hostname.trim().toLowerCase())
      .filter(Boolean)
  );

  if (usesDevelopmentKey) {
    expectedHostnames.add("localhost");
    expectedHostnames.add("127.0.0.1");
  }

  if (
    !secretKey ||
    !normalisedToken ||
    normalisedToken.length > 2048 ||
    expectedHostnames.size === 0
  ) {
    throw new Error(
      "Turnstile server configuration is incomplete."
    );
  }

  const body = new URLSearchParams({
    secret: secretKey,
    response: normalisedToken,
  });

  if (remoteIp) {
    body.set("remoteip", remoteIp);
  }

  const response = await fetch(TURNSTILE_VERIFY_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body,
    signal: AbortSignal.timeout(8000),
  });

  if (!response.ok) {
    throw new Error(
      `Turnstile verification returned ${response.status}.`
    );
  }

  const result = await response.json();

  return Boolean(
    result.success &&
      (usesDevelopmentKey ||
        result.action === "admin_login") &&
      expectedHostnames.has(
        String(result.hostname || "").toLowerCase()
      )
  );
}

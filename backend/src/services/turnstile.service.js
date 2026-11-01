const TURNSTILE_VERIFY_URL =
  "https://challenges.cloudflare.com/turnstile/v0/siteverify";

export async function verifyTurnstileToken({
  token,
  remoteIp,
}) {
  const secretKey = String(
    process.env.TURNSTILE_SECRET_KEY || ""
  ).trim();

  if (!secretKey) {
    throw new Error(
      "TURNSTILE_SECRET_KEY is not configured."
    );
  }

  const body = new URLSearchParams({
    secret: secretKey,
    response: String(token || ""),
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
      (!result.action || result.action === "admin_login")
  );
}

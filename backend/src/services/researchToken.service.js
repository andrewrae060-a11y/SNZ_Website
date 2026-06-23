import jwt from "jsonwebtoken";

const tokenSecret = process.env.RESEARCH_TOKEN_SECRET;

const cookieName =
  process.env.RESEARCH_COOKIE_NAME || "snz_research_session";

const tokenHours =
  Number(process.env.RESEARCH_TOKEN_HOURS) || 8;

if (!tokenSecret) {
  throw new Error(
    "RESEARCH_TOKEN_SECRET is missing from backend/.env."
  );
}

export function createResearchToken(user) {
  return jwt.sign(
    {
      researchUserId: user.id,
      email: user.email,
    },
    tokenSecret,
    {
      expiresIn: `${tokenHours}h`,
      issuer: "snz-research-backend",
      audience: "snz-research-library",
    }
  );
}

export function verifyResearchToken(token) {
  return jwt.verify(token, tokenSecret, {
    issuer: "snz-research-backend",
    audience: "snz-research-library",
  });
}

export function getResearchCookieName() {
  return cookieName;
}

export function getResearchCookieOptions() {
  return {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: tokenHours * 60 * 60 * 1000,
    path: "/",
  };
}

export function getResearchClearCookieOptions() {
  return {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
  };
}
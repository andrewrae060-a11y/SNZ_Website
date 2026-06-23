import jwt from "jsonwebtoken";

const tokenSecret = process.env.ADMIN_TOKEN_SECRET;
const cookieName =
  process.env.ADMIN_COOKIE_NAME || "snz_admin_session";

const tokenHours =
  Number(process.env.ADMIN_TOKEN_HOURS) || 8;

if (!tokenSecret) {
  throw new Error(
    "ADMIN_TOKEN_SECRET is missing from backend/.env."
  );
}

export function createAdminToken(admin) {
  return jwt.sign(
    {
      adminId: admin.id,
      email: admin.email,
      role: admin.role,
    },
    tokenSecret,
    {
      expiresIn: `${tokenHours}h`,
      issuer: "snz-research-backend",
      audience: "snz-research-admin",
    }
  );
}

export function verifyAdminToken(token) {
  return jwt.verify(token, tokenSecret, {
    issuer: "snz-research-backend",
    audience: "snz-research-admin",
  });
}

export function getAdminCookieName() {
  return cookieName;
}

export function getAdminCookieOptions() {
  return {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: tokenHours * 60 * 60 * 1000,
    path: "/",
  };
}

export function getAdminClearCookieOptions() {
  return {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
  };
}
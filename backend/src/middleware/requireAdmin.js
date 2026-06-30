import sql from "../database.js";

import {
  getAdminCookieName,
  verifyAdminToken,
} from "../services/adminToken.service.js";

const ALLOWED_ADMIN_ROLES = new Set([
  "RESEARCH_ADMIN",
  "CAREERS_ADMIN",
  "CONTENT_MANAGER",
  "SUPER_ADMIN",
]);

export async function requireAdmin(
  req,
  res,
  next
) {
  try {
    const cookieName =
      getAdminCookieName();

    const token =
      req.cookies?.[cookieName];

    if (!token) {
      return res.status(401).json({
        success: false,
        message:
          "Administrator login required.",
      });
    }

    let tokenPayload;

    try {
      tokenPayload =
        verifyAdminToken(token);
    } catch {
      return res.status(401).json({
        success: false,
        message:
          "Your administrator session has expired. Please log in again.",
      });
    }

    const admins = await sql`
      SELECT
        id,
        email,
        role,
        is_active
      FROM admin_users
      WHERE id = ${tokenPayload.adminId}
      LIMIT 1
    `;

    const admin = admins[0];

    if (
      !admin ||
      !admin.is_active
    ) {
      return res.status(403).json({
        success: false,
        message:
          "Administrator access is not available.",
      });
    }

    const normalisedRole =
      String(admin.role || "")
        .trim()
        .toUpperCase();

    if (
      !ALLOWED_ADMIN_ROLES.has(
        normalisedRole
      )
    ) {
      return res.status(403).json({
        success: false,
        message:
          "You do not have permission to access administration.",
      });
    }

    req.admin = {
      ...admin,
      role: normalisedRole,
    };

    return next();
  } catch (error) {
    return next(error);
  }
}
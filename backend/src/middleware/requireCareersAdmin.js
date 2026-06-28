import sql from "../database.js";

import {
  getAdminCookieName,
  verifyAdminToken,
} from "../services/adminToken.service.js";

const allowedRoles = new Set([
  "RESEARCH_ADMIN",
  "CAREERS_ADMIN",
  "SUPER_ADMIN",
]);

export async function requireCareersAdmin(
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

    let payload;

    try {
      payload =
        verifyAdminToken(token);
    } catch {
      return res.status(401).json({
        success: false,
        message:
          "Your administrator session has expired. Please log in again.",
      });
    }

    const rows = await sql`
      select
        id,
        email,
        role,
        is_active
      from public.admin_users
      where id = ${payload.adminId}
      limit 1
    `;

    const admin = rows[0];

    if (!admin || !admin.is_active) {
      return res.status(403).json({
        success: false,
        message:
          "Administrator access is not available.",
      });
    }

    if (
      !allowedRoles.has(admin.role)
    ) {
      return res.status(403).json({
        success: false,
        message:
          "You do not have permission to administer careers.",
      });
    }

    req.admin = admin;

    return next();
  } catch (error) {
    return next(error);
  }
}

export default requireCareersAdmin;
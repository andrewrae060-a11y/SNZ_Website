import sql from "../database.js";
import {
  getAdminCookieName,
  verifyAdminToken,
} from "../services/adminToken.service.js";

export async function requireAdmin(req, res, next) {
  try {
    const cookieName = getAdminCookieName();
    const token = req.cookies?.[cookieName];

    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Administrator login required.",
      });
    }

    let tokenPayload;

    try {
      tokenPayload = verifyAdminToken(token);
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

    if (!admin || !admin.is_active) {
      return res.status(403).json({
        success: false,
        message: "Administrator access is not available.",
      });
    }

    if (admin.role !== "RESEARCH_ADMIN") {
      return res.status(403).json({
        success: false,
        message:
          "You do not have permission to administer research access.",
      });
    }

    req.admin = admin;

    next();
  } catch (error) {
    next(error);
  }
}
import sql from "../database.js";
import {
  getResearchCookieName,
  verifyResearchToken,
} from "../services/researchToken.service.js";

export async function requireResearchUser(req, res, next) {
  try {
    const token =
      req.cookies?.[getResearchCookieName()];

    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Research-library login required.",
      });
    }

    let tokenPayload;

    try {
      tokenPayload = verifyResearchToken(token);
    } catch {
      return res.status(401).json({
        success: false,
        message:
          "Your research-library session has expired. Please log in again.",
      });
    }

    const users = await sql`
      SELECT
        id,
        full_name,
        email,
        organisation,
        role,
        status,
        pin_expires_at
      FROM research_access_users
      WHERE id = ${tokenPayload.researchUserId}
      LIMIT 1
    `;

    const user = users[0];

    if (!user) {
      return res.status(401).json({
        success: false,
        message: "Research-library login required.",
      });
    }

    if (user.status !== "APPROVED") {
      return res.status(403).json({
        success: false,
        message: "Research-library access is not available.",
      });
    }

    if (
      user.pin_expires_at &&
      new Date(user.pin_expires_at) <= new Date()
    ) {
      await sql`
        UPDATE research_access_users
        SET
          status = 'EXPIRED',
          updated_at = CURRENT_TIMESTAMP
        WHERE id = ${user.id}
      `;

      return res.status(403).json({
        success: false,
        message:
          "Your research-library access has expired.",
      });
    }

    req.researchUser = user;

    next();
  } catch (error) {
    next(error);
  }
}
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

import sql from "../backend/src/database.js";


const CMS_ROLES = new Set([
  "content_manager",
  "super_admin",
]);

function getJwtSecret() {
  const secret =
    process.env.ADMIN_TOKEN_SECRET;

  if (!secret) {
    throw new Error(
      "ADMIN_TOKEN_SECRET is not configured."
    );
  }

  return secret;
}

function publicAdministrator(
  administrator
) {
  return {
    id: administrator.id,
    email: administrator.email,
    role: administrator.role,
  };
}

export async function loginAdministrator(
  req,
  res,
  next
) {
  try {
    const email = String(
      req.body?.email || ""
    )
      .trim()
      .toLowerCase();

    const password = String(
      req.body?.password || ""
    );

    if (!email || !password) {
      return res
        .status(400)
        .json({
          success: false,
          message:
            "Email address and password are required.",
        });
    }

    const administrators =
      await sql`
        SELECT
          id,
          email,
          password_hash,
          role,
          is_active
        FROM admin_users
        WHERE LOWER(email) = ${email}
        LIMIT 1
      `;

    const administrator =
      administrators[0];

    if (
      !administrator ||
      !administrator.is_active
    ) {
      return res
        .status(401)
        .json({
          success: false,
          message:
            "The email address or password is incorrect.",
        });
    }

    const passwordMatches =
      await bcrypt.compare(
        password,
        administrator.password_hash
      );

    if (!passwordMatches) {
      return res
        .status(401)
        .json({
          success: false,
          message:
            "The email address or password is incorrect.",
        });
    }

    const role = String(
      administrator.role || ""
    ).toLowerCase();

    if (!CMS_ROLES.has(role)) {
      return res
        .status(403)
        .json({
          success: false,
          message:
            "This account does not have Content Manager access.",
        });
    }

    const token = jwt.sign(
      {
        adminId:
          administrator.id,
        email:
          administrator.email,
        role,
      },
      getJwtSecret(),
      {
        expiresIn: "8h",
        issuer:
          "smart-net-zero",
        audience:
          "snz-content-manager",
      }
    );

    return res.json({
      success: true,
      token,
      administrator:
        publicAdministrator(
          administrator
        ),
    });
  } catch (error) {
    next(error);
  }
}

export async function requireAdministrator(
  req,
  res,
  next
) {
  try {
    const authorization =
      String(
        req.headers
          .authorization || ""
      );

    if (
      !authorization.startsWith(
        "Bearer "
      )
    ) {
      return res
        .status(401)
        .json({
          success: false,
          message:
            "Content Manager login is required.",
        });
    }

    const token =
      authorization
        .slice(7)
        .trim();

    let payload;

    try {
      payload = jwt.verify(
        token,
        getJwtSecret(),
        {
          issuer:
            "smart-net-zero",
          audience:
            "snz-content-manager",
        }
      );
    } catch {
      return res
        .status(401)
        .json({
          success: false,
          message:
            "Your Content Manager session has expired. Please sign in again.",
        });
    }

    const administrators =
      await sql`
        SELECT
          id,
          email,
          role,
          is_active
        FROM admin_users
        WHERE id = ${payload.adminId}
        LIMIT 1
      `;

    const administrator =
      administrators[0];

    if (
      !administrator ||
      !administrator.is_active
    ) {
      return res
        .status(403)
        .json({
          success: false,
          message:
            "Content Manager access is not available.",
        });
    }

    const role = String(
      administrator.role || ""
    ).toLowerCase();

    if (!CMS_ROLES.has(role)) {
      return res
        .status(403)
        .json({
          success: false,
          message:
            "This account does not have Content Manager access.",
        });
    }

    req.admin =
      publicAdministrator(
        administrator
      );

    next();
  } catch (error) {
    next(error);
  }
}
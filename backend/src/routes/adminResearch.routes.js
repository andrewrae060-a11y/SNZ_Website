import crypto from "node:crypto";
import { Router } from "express";
import argon2 from "argon2";
import jwt from "jsonwebtoken";
import rateLimit from "express-rate-limit";
import { z } from "zod";
import sql from "../database.js";
import { requireAdmin } from "../middleware/requireAdmin.js";
import {
  createAdminToken,
  getAdminClearCookieOptions,
  getAdminCookieName,
  getAdminCookieOptions,
  verifyAdminToken,
} from "../services/adminToken.service.js";

const router = Router();

const adminLoginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 10,
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    success: false,
    message:
      "Too many administrator login attempts. Please try again later.",
  },
});

const loginSchema = z.object({
  email: z
    .string()
    .trim()
    .email("Please enter a valid email address.")
    .max(255),

  password: z
    .string()
    .min(12, "The password is not valid.")
    .max(200),
});

function normaliseEmail(email) {
  return email.trim().toLowerCase();
}

function generateTenDigitPin() {
  let pin = "";

  for (let index = 0; index < 10; index += 1) {
    pin += crypto.randomInt(0, 10).toString();
  }

  return pin;
}

router.post("/login", adminLoginLimiter, async (req, res, next) => {
  try {
    const validationResult = loginSchema.safeParse(req.body);

    if (!validationResult.success) {
      return res.status(400).json({
        success: false,
        message: "The email address or password is incorrect.",
      });
    }

    const email = normaliseEmail(validationResult.data.email);
    const password = validationResult.data.password;

    const admins = await sql`
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

    const admin = admins[0];

    if (!admin || !admin.is_active) {
      return res.status(401).json({
        success: false,
        message: "The email address or password is incorrect.",
      });
    }

    const passwordMatches = await argon2.verify(
      admin.password_hash,
      password
    );

    if (!passwordMatches) {
      return res.status(401).json({
        success: false,
        message: "The email address or password is incorrect.",
      });
    }

    const token = createAdminToken(admin);

    res.cookie(
      getAdminCookieName(),
      token,
      getAdminCookieOptions()
    );

    return res.status(200).json({
      success: true,
      authenticated: true,
      admin: {
        email: admin.email,
        role: admin.role,
      },
    });
  } catch (error) {
    next(error);
  }
});

router.get("/session", async (req, res, next) => {
  try {
    const token = req.cookies?.[getAdminCookieName()];

    if (!token) {
      return res.status(200).json({
        authenticated: false,
      });
    }

    let tokenPayload;

    try {
      tokenPayload = verifyAdminToken(token);
    } catch (error) {
      if (error instanceof jwt.JsonWebTokenError) {
        res.clearCookie(
          getAdminCookieName(),
          getAdminClearCookieOptions()
        );

        return res.status(200).json({
          authenticated: false,
        });
      }

      throw error;
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
      res.clearCookie(
        getAdminCookieName(),
        getAdminClearCookieOptions()
      );

      return res.status(200).json({
        authenticated: false,
      });
    }

    return res.status(200).json({
      authenticated: true,
      admin: {
        email: admin.email,
        role: admin.role,
      },
    });
  } catch (error) {
    next(error);
  }
});

router.post("/logout", (req, res) => {
  res.clearCookie(
    getAdminCookieName(),
    getAdminClearCookieOptions()
  );

  return res.status(200).json({
    success: true,
    message: "Administrator logout successful.",
  });
});

router.get(
  "/research-access",
  requireAdmin,
  async (req, res, next) => {
    try {
      const requestedStatus = String(
        req.query.status || "PENDING"
      ).toUpperCase();

      const permittedStatuses = [
        "PENDING",
        "APPROVED",
        "REJECTED",
        "REVOKED",
        "EXPIRED",
      ];

      if (!permittedStatuses.includes(requestedStatus)) {
        return res.status(400).json({
          success: false,
          message: "The requested status is not valid.",
        });
      }

      const requests = await sql`
        SELECT
          id,
          full_name,
          email,
          organisation,
          role,
          status,
          approved_at,
          rejected_at,
          revoked_at,
          created_at,
          updated_at
        FROM research_access_users
        WHERE status = ${requestedStatus}
        ORDER BY created_at ASC
      `;

      return res.status(200).json({
        success: true,
        status: requestedStatus,
        count: requests.length,
        requests: requests.map((request) => ({
          id: request.id,
          fullName: request.full_name,
          email: request.email,
          organisation: request.organisation,
          role: request.role,
          status: request.status,
          approvedAt: request.approved_at,
          rejectedAt: request.rejected_at,
          revokedAt: request.revoked_at,
          createdAt: request.created_at,
          updatedAt: request.updated_at,
        })),
      });
    } catch (error) {
      next(error);
    }
  }
);

router.get(
  "/research-access/:id",
  requireAdmin,
  async (req, res, next) => {
    try {
      const requests = await sql`
        SELECT
          id,
          full_name,
          email,
          organisation,
          role,
          status,
          pin_expires_at,
          approved_at,
          rejected_at,
          revoked_at,
          last_login_at,
          created_at,
          updated_at
        FROM research_access_users
        WHERE id = ${req.params.id}
        LIMIT 1
      `;

      const request = requests[0];

      if (!request) {
        return res.status(404).json({
          success: false,
          message: "The access request was not found.",
        });
      }

      return res.status(200).json({
        success: true,
        request: {
          id: request.id,
          fullName: request.full_name,
          email: request.email,
          organisation: request.organisation,
          role: request.role,
          status: request.status,
          pinExpiresAt: request.pin_expires_at,
          approvedAt: request.approved_at,
          rejectedAt: request.rejected_at,
          revokedAt: request.revoked_at,
          lastLoginAt: request.last_login_at,
          createdAt: request.created_at,
          updatedAt: request.updated_at,
        },
      });
    } catch (error) {
      next(error);
    }
  }
);

router.post(
  "/research-access/:id/approve",
  requireAdmin,
  async (req, res, next) => {
    try {
      const result = await sql.begin(async (transaction) => {
        const requests = await transaction`
          SELECT
            id,
            full_name,
            email,
            status
          FROM research_access_users
          WHERE id = ${req.params.id}
          FOR UPDATE
        `;

        const request = requests[0];

        if (!request) {
          return {
            errorStatus: 404,
            errorMessage: "The access request was not found.",
          };
        }

        if (request.status !== "PENDING") {
          return {
            errorStatus: 409,
            errorMessage:
              "Only pending access requests can be approved.",
          };
        }

        const pin = generateTenDigitPin();
        const pinHash = await argon2.hash(pin);

        const approvedUsers = await transaction`
          UPDATE research_access_users
          SET
            status = 'APPROVED',
            pin_hash = ${pinHash},
            pin_expires_at = CURRENT_TIMESTAMP + INTERVAL '180 days',
            failed_login_attempts = 0,
            locked_until = NULL,
            approved_at = CURRENT_TIMESTAMP,
            approved_by = ${req.admin.id},
            updated_at = CURRENT_TIMESTAMP
          WHERE id = ${request.id}
          RETURNING
            id,
            full_name,
            email,
            status,
            pin_expires_at,
            approved_at
        `;

        const approvedUser = approvedUsers[0];

        const auditDetails = JSON.stringify({
          email: approvedUser.email,
          pinExpiresAt: approvedUser.pin_expires_at,
        });

        await transaction`
          INSERT INTO research_access_audit_log (
            actor_type,
            actor_id,
            target_user_id,
            action,
            details
          )
          VALUES (
            'ADMIN_USER',
            ${req.admin.id},
            ${approvedUser.id},
            'ACCESS_APPROVED',
            ${auditDetails}::jsonb
          )
        `;

        return {
          approvedUser,
          pin,
        };
      });

      if (result.errorStatus) {
        return res.status(result.errorStatus).json({
          success: false,
          message: result.errorMessage,
        });
      }

      return res.status(200).json({
        success: true,
        message:
          "The access request has been approved and a PIN has been generated.",
        user: {
          id: result.approvedUser.id,
          fullName: result.approvedUser.full_name,
          email: result.approvedUser.email,
          status: result.approvedUser.status,
          pinExpiresAt: result.approvedUser.pin_expires_at,
          approvedAt: result.approvedUser.approved_at,
        },

        developmentPin:
          process.env.NODE_ENV === "development"
            ? result.pin
            : undefined,
      });
    } catch (error) {
      next(error);
    }
  }
);

router.post(
  "/research-access/:id/reject",
  requireAdmin,
  async (req, res, next) => {
    try {
      const result = await sql.begin(async (transaction) => {
        const requests = await transaction`
          SELECT
            id,
            email,
            status
          FROM research_access_users
          WHERE id = ${req.params.id}
          FOR UPDATE
        `;

        const request = requests[0];

        if (!request) {
          return {
            errorStatus: 404,
            errorMessage: "The access request was not found.",
          };
        }

        if (request.status !== "PENDING") {
          return {
            errorStatus: 409,
            errorMessage:
              "Only pending access requests can be rejected.",
          };
        }

        const rejectedUsers = await transaction`
          UPDATE research_access_users
          SET
            status = 'REJECTED',
            rejected_at = CURRENT_TIMESTAMP,
            rejected_by = ${req.admin.id},
            updated_at = CURRENT_TIMESTAMP
          WHERE id = ${request.id}
          RETURNING
            id,
            email,
            status,
            rejected_at
        `;

        const rejectedUser = rejectedUsers[0];

        const auditDetails = JSON.stringify({
          email: rejectedUser.email,
        });

        await transaction`
          INSERT INTO research_access_audit_log (
            actor_type,
            actor_id,
            target_user_id,
            action,
            details
          )
          VALUES (
            'ADMIN_USER',
            ${req.admin.id},
            ${rejectedUser.id},
            'ACCESS_REJECTED',
            ${auditDetails}::jsonb
          )
        `;

        return {
          rejectedUser,
        };
      });

      if (result.errorStatus) {
        return res.status(result.errorStatus).json({
          success: false,
          message: result.errorMessage,
        });
      }

      return res.status(200).json({
        success: true,
        message: "The access request has been rejected.",
        user: {
          id: result.rejectedUser.id,
          email: result.rejectedUser.email,
          status: result.rejectedUser.status,
          rejectedAt: result.rejectedUser.rejected_at,
        },
      });
    } catch (error) {
      next(error);
    }
  }
);

export default router;
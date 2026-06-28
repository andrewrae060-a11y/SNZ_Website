import { randomInt } from "node:crypto";
import { Router } from "express";
import bcrypt from "bcryptjs";
import argon2 from "argon2";
import { z } from "zod";

import sql from "../database.js";
import { requireAdmin } from "../middleware/requireAdmin.js";

import {
  createAdminToken,
  getAdminClearCookieOptions,
  getAdminCookieName,
  getAdminCookieOptions,
} from "../services/adminToken.service.js";

const router = Router();

const allowedStatuses = [
  "PENDING",
  "APPROVED",
  "REJECTED",
  "REVOKED",
  "EXPIRED",
];

const statusSchema = z.enum(allowedStatuses);

const requestIdSchema = z
  .string()
  .trim()
  .uuid("A valid research access request ID is required.");

/**
 * Prevent sensitive administrator database fields from
 * being returned to the browser.
 */
function publicAdmin(admin) {
  return {
    id: admin.id,
    email: admin.email,
    role: admin.role,
  };
}

/**
 * Convert a research access database row into the shape
 * expected by ResearchAdmin.jsx.
 */
function publicResearchUser(user) {
  return {
    id: user.id,
    fullName: user.full_name,
    email: user.email,
    organisation: user.organisation,
    role: user.role,
    status: user.status,
    createdAt: user.created_at,
    updatedAt: user.updated_at,
    approvedAt: user.approved_at,
    rejectedAt: user.rejected_at,
    pinExpiresAt: user.pin_expires_at,
    lastLoginAt: user.last_login_at,
  };
}

/**
 * Generate a cryptographically secure 10-digit PIN.
 */
function createResearchPin() {
  return String(
    randomInt(0, 10_000_000_000)
  ).padStart(10, "0");
}

/**
 * POST /api/admin/login
 *
 * Authenticates an administrator and creates an
 * HTTP-only session cookie.
 */
router.post("/login", async (req, res, next) => {
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
      return res.status(400).json({
        success: false,
        authenticated: false,
        message:
          "Email address and password are required.",
      });
    }

    const admins = await sql`
      SELECT
        id,
        email,
        password_hash,
        role,
        is_active
      FROM public.admin_users
      WHERE LOWER(email) = ${email}
      LIMIT 1
    `;

    const admin = admins[0];

    /*
     * Use the same response whether the account is absent,
     * inactive or the password is incorrect.
     */
    if (
      !admin ||
      !admin.is_active ||
      !admin.password_hash
    ) {
      return res.status(401).json({
        success: false,
        authenticated: false,
        message:
          "The email address or password is incorrect.",
      });
    }

    const passwordMatches =
      await bcrypt.compare(
        password,
        admin.password_hash
      );

    if (!passwordMatches) {
      return res.status(401).json({
        success: false,
        authenticated: false,
        message:
          "The email address or password is incorrect.",
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
      message:
        "Administrator login successful.",
      admin: publicAdmin(admin),
    });
  } catch (error) {
    console.error(
      "Administrator login route failed:",
      error
    );

    return next(error);
  }
});

/**
 * POST /api/admin/logout
 *
 * Clears the HTTP-only administrator session cookie.
 */
router.post("/logout", (_req, res) => {
  res.clearCookie(
    getAdminCookieName(),
    getAdminClearCookieOptions()
  );

  return res.status(200).json({
    success: true,
    authenticated: false,
    message:
      "Administrator session ended.",
  });
});

/**
 * GET /api/admin/session
 *
 * Confirms that the current administrator cookie is valid.
 */
router.get(
  "/session",
  requireAdmin,
  async (req, res) => {
    return res.status(200).json({
      success: true,
      authenticated: true,
      admin: publicAdmin(req.admin),
    });
  }
);

/**
 * GET /api/admin/me
 *
 * Optional alias for frontend components that use /me.
 */
router.get(
  "/me",
  requireAdmin,
  async (req, res) => {
    return res.status(200).json({
      success: true,
      authenticated: true,
      admin: publicAdmin(req.admin),
    });
  }
);

/**
 * GET /api/admin/research-access?status=PENDING
 *
 * Lists research-library applications by status.
 */
router.get(
  "/research-access",
  requireAdmin,
  async (req, res, next) => {
    try {
      const requestedStatus = String(
        req.query.status || "PENDING"
      )
        .trim()
        .toUpperCase();

      const validationResult =
        statusSchema.safeParse(requestedStatus);

      if (!validationResult.success) {
        return res.status(400).json({
          success: false,
          message:
            "The requested application status is invalid.",
        });
      }

      const status = validationResult.data;

      const users = await sql`
        SELECT
          id,
          full_name,
          email,
          organisation,
          role,
          status,
          created_at,
          updated_at,
          approved_at,
          rejected_at,
          pin_expires_at,
          last_login_at
        FROM public.research_access_users
        WHERE status = ${status}
        ORDER BY created_at DESC
      `;

      return res.status(200).json({
        success: true,
        requests: users.map(
          publicResearchUser
        ),
      });
    } catch (error) {
      console.error(
        "Research access list route failed:",
        {
          message: error?.message,
          code: error?.code,
          detail: error?.detail,
          stack: error?.stack,
        }
      );

      return next(error);
    }
  }
);

/**
 * POST /api/admin/research-access/:id/approve
 *
 * Approves a pending application and generates a
 * secure 10-digit research-library PIN.
 */
router.post(
  "/research-access/:id/approve",
  requireAdmin,
  async (req, res, next) => {
    try {
      const validationResult =
        requestIdSchema.safeParse(
          String(req.params.id || "")
        );

      if (!validationResult.success) {
        return res.status(400).json({
          success: false,
          message:
            validationResult.error.issues[0]
              ?.message ||
            "A valid application ID is required.",
        });
      }

      const requestId =
        validationResult.data;

      const plainPin = createResearchPin();

      const pinHash = await argon2.hash(
        plainPin,
        {
          type: argon2.argon2id,
        }
      );

      const result = await sql.begin(
        async (transaction) => {
          const existingUsers =
            await transaction`
              SELECT
                id,
                full_name,
                email,
                organisation,
                role,
                status,
                created_at,
                updated_at,
                approved_at,
                rejected_at,
                pin_expires_at,
                last_login_at
              FROM public.research_access_users
              WHERE id = ${requestId}
              FOR UPDATE
            `;

          const existingUser =
            existingUsers[0];

          if (!existingUser) {
            return {
              errorStatus: 404,
              errorMessage:
                "The research access application was not found.",
            };
          }

          if (
            existingUser.status !== "PENDING"
          ) {
            return {
              errorStatus: 409,
              errorMessage:
                "Only pending applications can be approved.",
            };
          }

          const approvedUsers =
            await transaction`
              UPDATE public.research_access_users
              SET
                status = 'APPROVED',
                pin_hash = ${pinHash},
                pin_expires_at =
                  CURRENT_TIMESTAMP +
                  INTERVAL '12 months',
                approved_at =
                  CURRENT_TIMESTAMP,
                rejected_at = NULL,
                failed_login_attempts = 0,
                locked_until = NULL,
                updated_at =
                  CURRENT_TIMESTAMP
              WHERE id = ${requestId}
              RETURNING
                id,
                full_name,
                email,
                organisation,
                role,
                status,
                created_at,
                updated_at,
                approved_at,
                rejected_at,
                pin_expires_at,
                last_login_at
            `;

          const approvedUser =
            approvedUsers[0];

          const auditDetails =
            JSON.stringify({
              email: approvedUser.email,
              previousStatus:
                existingUser.status,
              newStatus:
                approvedUser.status,
              pinExpiresAt:
                approvedUser.pin_expires_at,
            });

          await transaction`
            INSERT INTO public.research_access_audit_log (
              actor_type,
              actor_id,
              target_user_id,
              action,
              details
            )
            VALUES (
              'ADMIN',
              ${req.admin.id},
              ${approvedUser.id},
              'ACCESS_REQUEST_APPROVED',
              ${auditDetails}::jsonb
            )
          `;

          return {
            user: approvedUser,
          };
        }
      );

      if (result.errorStatus) {
        return res
          .status(result.errorStatus)
          .json({
            success: false,
            message: result.errorMessage,
          });
      }

      return res.status(200).json({
        success: true,
        message:
          "The research access application has been approved.",
        user: publicResearchUser(
          result.user
        ),

        /*
         * Only return the plain PIN locally.
         * In production it should be emailed securely.
         */
        developmentPin:
          process.env.NODE_ENV ===
          "production"
            ? undefined
            : plainPin,
      });
    } catch (error) {
      console.error(
        "Research access approval route failed:",
        {
          message: error?.message,
          code: error?.code,
          detail: error?.detail,
          stack: error?.stack,
        }
      );

      return next(error);
    }
  }
);

/**
 * POST /api/admin/research-access/:id/reject
 *
 * Rejects a pending application.
 */
router.post(
  "/research-access/:id/reject",
  requireAdmin,
  async (req, res, next) => {
    try {
      const validationResult =
        requestIdSchema.safeParse(
          String(req.params.id || "")
        );

      if (!validationResult.success) {
        return res.status(400).json({
          success: false,
          message:
            validationResult.error.issues[0]
              ?.message ||
            "A valid application ID is required.",
        });
      }

      const requestId =
        validationResult.data;

      const result = await sql.begin(
        async (transaction) => {
          const existingUsers =
            await transaction`
              SELECT
                id,
                full_name,
                email,
                organisation,
                role,
                status,
                created_at,
                updated_at,
                approved_at,
                rejected_at,
                pin_expires_at,
                last_login_at
              FROM public.research_access_users
              WHERE id = ${requestId}
              FOR UPDATE
            `;

          const existingUser =
            existingUsers[0];

          if (!existingUser) {
            return {
              errorStatus: 404,
              errorMessage:
                "The research access application was not found.",
            };
          }

          if (
            existingUser.status !== "PENDING"
          ) {
            return {
              errorStatus: 409,
              errorMessage:
                "Only pending applications can be rejected.",
            };
          }

          const rejectedUsers =
            await transaction`
              UPDATE public.research_access_users
              SET
                status = 'REJECTED',
                pin_hash = NULL,
                pin_expires_at = NULL,
                approved_at = NULL,
                rejected_at =
                  CURRENT_TIMESTAMP,
                failed_login_attempts = 0,
                locked_until = NULL,
                updated_at =
                  CURRENT_TIMESTAMP
              WHERE id = ${requestId}
              RETURNING
                id,
                full_name,
                email,
                organisation,
                role,
                status,
                created_at,
                updated_at,
                approved_at,
                rejected_at,
                pin_expires_at,
                last_login_at
            `;

          const rejectedUser =
            rejectedUsers[0];

          const auditDetails =
            JSON.stringify({
              email: rejectedUser.email,
              previousStatus:
                existingUser.status,
              newStatus:
                rejectedUser.status,
            });

          await transaction`
            INSERT INTO public.research_access_audit_log (
              actor_type,
              actor_id,
              target_user_id,
              action,
              details
            )
            VALUES (
              'ADMIN',
              ${req.admin.id},
              ${rejectedUser.id},
              'ACCESS_REQUEST_REJECTED',
              ${auditDetails}::jsonb
            )
          `;

          return {
            user: rejectedUser,
          };
        }
      );

      if (result.errorStatus) {
        return res
          .status(result.errorStatus)
          .json({
            success: false,
            message: result.errorMessage,
          });
      }

      return res.status(200).json({
        success: true,
        message:
          "The research access application has been rejected.",
        user: publicResearchUser(
          result.user
        ),
      });
    } catch (error) {
      console.error(
        "Research access rejection route failed:",
        {
          message: error?.message,
          code: error?.code,
          detail: error?.detail,
          stack: error?.stack,
        }
      );

      return next(error);
    }
  }
);

export default router;
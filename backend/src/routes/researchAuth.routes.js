import { Router } from "express";
import argon2 from "argon2";
import rateLimit from "express-rate-limit";
import { z } from "zod";
import sql from "../database.js";
import {
  createResearchToken,
  getResearchClearCookieOptions,
  getResearchCookieName,
  getResearchCookieOptions,
  verifyResearchToken,
} from "../services/researchToken.service.js";

const router = Router();

const maximumAttempts =
  Number(process.env.MAX_RESEARCH_LOGIN_ATTEMPTS) || 5;

const lockMinutes =
  Number(process.env.RESEARCH_LOCK_MINUTES) || 30;

const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 15,
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    authenticated: false,
    message: "Too many login attempts. Please try again later.",
  },
});

const loginSchema = z.object({
  email: z.string().trim().email().max(255),
  pin: z.string().regex(/^\d{10}$/),
});

function normaliseEmail(email) {
  return email.trim().toLowerCase();
}

function genericLoginFailure(res) {
  return res.status(401).json({
    authenticated: false,
    message: "The email or PIN is incorrect.",
  });
}

router.post("/login", loginLimiter, async (req, res, next) => {
  try {
    const validationResult = loginSchema.safeParse(req.body);

    if (!validationResult.success) {
      return genericLoginFailure(res);
    }

    const email = normaliseEmail(validationResult.data.email);
    const pin = validationResult.data.pin;

    const users = await sql`
      SELECT
        id,
        full_name,
        email,
        organisation,
        role,
        status,
        pin_hash,
        pin_expires_at,
        failed_login_attempts,
        locked_until
      FROM research_access_users
      WHERE LOWER(email) = ${email}
      LIMIT 1
    `;

    const user = users[0];

    if (!user || user.status !== "APPROVED" || !user.pin_hash) {
      return genericLoginFailure(res);
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
        authenticated: false,
        message:
          "Your research-library access has expired. Please contact Smart Net Zero.",
      });
    }

    if (
      user.locked_until &&
      new Date(user.locked_until) > new Date()
    ) {
      return res.status(429).json({
        authenticated: false,
        message:
          "This account is temporarily locked following repeated unsuccessful login attempts. Please try again later.",
      });
    }

    const pinMatches = await argon2.verify(user.pin_hash, pin);

    if (!pinMatches) {
      const currentAttempts =
        Number(user.failed_login_attempts) || 0;

      const nextAttempts = currentAttempts + 1;
      const shouldLock = nextAttempts >= maximumAttempts;

      await sql.begin(async (transaction) => {
        if (shouldLock) {
          await transaction`
            UPDATE research_access_users
            SET
              failed_login_attempts = ${nextAttempts},
              locked_until =
                CURRENT_TIMESTAMP +
                (${lockMinutes} * INTERVAL '1 minute'),
              updated_at = CURRENT_TIMESTAMP
            WHERE id = ${user.id}
          `;
        } else {
          await transaction`
            UPDATE research_access_users
            SET
              failed_login_attempts = ${nextAttempts},
              locked_until = NULL,
              updated_at = CURRENT_TIMESTAMP
            WHERE id = ${user.id}
          `;
        }

        const failedDetails = JSON.stringify({
          email: user.email,
          failedAttempts: nextAttempts,
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
            'RESEARCH_USER',
            ${user.id},
            ${user.id},
            'LOGIN_FAILED',
            ${failedDetails}::jsonb
          )
        `;

        if (shouldLock) {
          const lockDetails = JSON.stringify({
            email: user.email,
            failedAttempts: nextAttempts,
            lockMinutes,
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
              'RESEARCH_USER',
              ${user.id},
              ${user.id},
              'ACCOUNT_LOCKED',
              ${lockDetails}::jsonb
            )
          `;
        }
      });

      return genericLoginFailure(res);
    }

    await sql.begin(async (transaction) => {
      await transaction`
        UPDATE research_access_users
        SET
          failed_login_attempts = 0,
          locked_until = NULL,
          last_login_at = CURRENT_TIMESTAMP,
          updated_at = CURRENT_TIMESTAMP
        WHERE id = ${user.id}
      `;

      const successDetails = JSON.stringify({
        email: user.email,
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
          'RESEARCH_USER',
          ${user.id},
          ${user.id},
          'LOGIN_SUCCEEDED',
          ${successDetails}::jsonb
        )
      `;
    });

    const token = createResearchToken(user);

    res.cookie(
      getResearchCookieName(),
      token,
      getResearchCookieOptions()
    );

    return res.status(200).json({
      success: true,
      authenticated: true,
      message: "Research-library login successful.",
      user: {
        id: user.id,
        fullName: user.full_name,
        email: user.email,
        organisation: user.organisation,
        role: user.role,
      },
    });
  } catch (error) {
    console.error("Research login failed:", {
      message: error?.message,
      code: error?.code,
      name: error?.name,
      detail: error?.detail,
      stack: error?.stack,
    });

    next(error);
  }
});

router.get("/session", async (req, res, next) => {
  try {
    const cookieName = getResearchCookieName();
    const token = req.cookies?.[cookieName];

    if (!token) {
      return res.status(200).json({
        authenticated: false,
      });
    }

    let tokenPayload;

    try {
      tokenPayload = verifyResearchToken(token);
    } catch {
      res.clearCookie(
        cookieName,
        getResearchClearCookieOptions()
      );

      return res.status(200).json({
        authenticated: false,
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

    if (!user || user.status !== "APPROVED") {
      res.clearCookie(
        cookieName,
        getResearchClearCookieOptions()
      );

      return res.status(200).json({
        authenticated: false,
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

      res.clearCookie(
        cookieName,
        getResearchClearCookieOptions()
      );

      return res.status(200).json({
        authenticated: false,
      });
    }

    return res.status(200).json({
      authenticated: true,
      user: {
        id: user.id,
        fullName: user.full_name,
        email: user.email,
        organisation: user.organisation,
        role: user.role,
      },
    });
  } catch (error) {
    next(error);
  }
});

router.post("/logout", async (req, res, next) => {
  try {
    const cookieName = getResearchCookieName();
    const token = req.cookies?.[cookieName];

    if (token) {
      try {
        const tokenPayload = verifyResearchToken(token);

        const logoutDetails = JSON.stringify({
          email: tokenPayload.email,
        });

        await sql`
          INSERT INTO research_access_audit_log (
            actor_type,
            actor_id,
            target_user_id,
            action,
            details
          )
          VALUES (
            'RESEARCH_USER',
            ${tokenPayload.researchUserId},
            ${tokenPayload.researchUserId},
            'LOGOUT',
            ${logoutDetails}::jsonb
          )
        `;
      } catch {
        // Ignore invalid or expired tokens during logout.
      }
    }

    res.clearCookie(
      cookieName,
      getResearchClearCookieOptions()
    );

    return res.status(200).json({
      success: true,
      message: "Research-library logout successful.",
    });
  } catch (error) {
    next(error);
  }
});

export default router;
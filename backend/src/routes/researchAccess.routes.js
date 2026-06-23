import { Router } from "express";
import { z } from "zod";
import sql from "../database.js";

const router = Router();

const allowedRoles = [
  "Board / Executive",
  "Sustainability",
  "Energy",
  "Infrastructure",
  "Security / Resilience",
  "Operations",
  "Academic / Research",
];

const accessRequestSchema = z.object({
  fullName: z
    .string()
    .trim()
    .min(2, "Please enter your full name.")
    .max(150, "Your full name is too long."),

  email: z
    .string()
    .trim()
    .email("Please enter a valid email address.")
    .max(255, "Your email address is too long."),

  organisation: z
    .string()
    .trim()
    .max(255, "The organisation name is too long.")
    .optional()
    .default(""),

  role: z
    .string()
    .trim()
    .optional()
    .default("")
    .refine(
      (value) => value === "" || allowedRoles.includes(value),
      "Please select a valid role."
    ),
});

function normaliseEmail(email) {
  return email.trim().toLowerCase();
}

router.post("/request", async (req, res, next) => {
  try {
    const validationResult = accessRequestSchema.safeParse(req.body);

    if (!validationResult.success) {
      const firstError = validationResult.error.issues[0];

      return res.status(400).json({
        success: false,
        message:
          firstError?.message || "Please check the information entered.",
      });
    }

    const { fullName, email, organisation, role } = validationResult.data;

    const normalisedEmail = normaliseEmail(email);

    const existingUsers = await sql`
      SELECT
        id,
        status
      FROM research_access_users
      WHERE LOWER(email) = ${normalisedEmail}
      LIMIT 1
    `;

    const existingUser = existingUsers[0];

    if (existingUser) {
      if (existingUser.status === "PENDING") {
        return res.status(409).json({
          success: false,
          message:
            "An access request for this email address is already awaiting review.",
        });
      }

      if (existingUser.status === "APPROVED") {
        return res.status(409).json({
          success: false,
          message:
            "This email address already has approved research-library access.",
        });
      }

      return res.status(409).json({
        success: false,
        message:
          "An access record already exists for this email address. Please contact Smart Net Zero.",
      });
    }

    const createdUser = await sql.begin(async (transaction) => {
      const insertedUsers = await transaction`
        INSERT INTO research_access_users (
          full_name,
          email,
          organisation,
          role,
          status
        )
        VALUES (
          ${fullName},
          ${normalisedEmail},
          ${organisation || null},
          ${role || null},
          'PENDING'
        )
        RETURNING
          id,
          full_name,
          email,
          organisation,
          role,
          status,
          created_at
      `;

      const user = insertedUsers[0];

      const auditDetails = JSON.stringify({
        email: user.email,
        organisation: user.organisation,
        role: user.role,
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
          'PUBLIC_USER',
          NULL,
          ${user.id},
          'ACCESS_REQUEST_SUBMITTED',
          ${auditDetails}::jsonb
        )
      `;

      return user;
    });

    return res.status(201).json({
      success: true,
      message:
        "Your access request has been submitted for review. Smart Net Zero will contact you if your application is approved.",
      request: {
        id: createdUser.id,
        email: createdUser.email,
        status: createdUser.status,
        createdAt: createdUser.created_at,
      },
    });
  } catch (error) {
    console.error("Access request route failed:", {
      message: error?.message,
      code: error?.code,
      name: error?.name,
      detail: error?.detail,
    });

    if (error?.code === "23505") {
      return res.status(409).json({
        success: false,
        message:
          "An access request already exists for this email address.",
      });
    }

    next(error);
  }
});

export default router;
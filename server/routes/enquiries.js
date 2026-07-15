import { Router } from "express";
import nodemailer from "nodemailer";

const router = Router();

function requiredEnvironmentValue(name) {
  const value = String(
    process.env[name] || ""
  ).trim();

  if (!value) {
    const error = new Error(
      `Missing required environment variable: ${name}`
    );

    error.status = 500;

    throw error;
  }

  return value;
}

function createEnquiryTransporter() {
  const host =
    requiredEnvironmentValue(
      "ENQUIRY_SMTP_HOST"
    );

  const port = Number(
    process.env.ENQUIRY_SMTP_PORT ||
      587
  );

  const secure =
    String(
      process.env.ENQUIRY_SMTP_SECURE ||
        "false"
    ).toLowerCase() === "true";

  const user =
    requiredEnvironmentValue(
      "ENQUIRY_SMTP_USER"
    );

  const pass =
    requiredEnvironmentValue(
      "ENQUIRY_SMTP_PASS"
    );

  return nodemailer.createTransport({
    host,
    port,
    secure,
    auth: {
      user,
      pass,
    },
    requireTLS: !secure,
    tls: {
      minVersion: "TLSv1.2",
    },
  });
}

router.post(
  "/",
  async (req, res, next) => {
    try {
      const {
        name,
        email,
        phone,
        organisation,
        enquiryType,
        message,
        urgent,
      } = req.body || {};

      const cleanName =
        String(name || "").trim();

      const cleanEmail =
        String(email || "").trim();

      const cleanPhone =
        String(phone || "").trim();

      const cleanOrganisation =
        String(
          organisation || ""
        ).trim();

      const cleanEnquiryType =
        String(
          enquiryType ||
            "General enquiry"
        ).trim();

      const cleanMessage =
        String(message || "").trim();

      if (
        !cleanName ||
        !cleanEmail ||
        !cleanPhone ||
        !cleanMessage
      ) {
        return res
          .status(400)
          .json({
            message:
              "Please complete your name, email, phone number and message.",
          });
      }

      const mailFrom =
        requiredEnvironmentValue(
          "ENQUIRY_MAIL_FROM"
        );

      const mailTo =
        requiredEnvironmentValue(
          "ENQUIRY_MAIL_TO"
        );

      const transporter =
        createEnquiryTransporter();

      const subject = urgent
        ? `URGENT website enquiry — ${cleanEnquiryType}`
        : `Website enquiry — ${cleanEnquiryType}`;

      const text = [
        "A new website enquiry has been received.",
        "",
        `Name: ${cleanName}`,
        `Email: ${cleanEmail}`,
        `Phone: ${cleanPhone}`,
        `Organisation: ${
          cleanOrganisation ||
          "Not provided"
        }`,
        `Enquiry type: ${cleanEnquiryType}`,
        `Urgent: ${
          urgent ? "Yes" : "No"
        }`,
        "",
        "Message:",
        cleanMessage,
      ].join("\n");

      await transporter.sendMail({
        from: mailFrom,
        to: mailTo,
        replyTo: cleanEmail,
        subject,
        text,
      });

      return res
        .status(200)
        .json({
          message:
            "Your enquiry has been sent successfully.",
        });
    } catch (error) {
      console.error(
        "Enquiry email failed:",
        {
          message: error?.message,
          code: error?.code,
          response: error?.response,
          responseCode:
            error?.responseCode,
          command: error?.command,
        }
      );

      return next(error);
    }
  }
);

export default router;
import express from "express";
import nodemailer from "nodemailer";

const router = express.Router();

const DEFAULT_RECIPIENT =
  "michael.sweenie@smartnetzero.co.uk";

function clean(value) {
  return String(value || "").trim();
}

function isEmail(value) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(
    String(value || "").trim()
  );
}

function escapeHtml(value) {
  return clean(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

function createTransporter() {
  const port = Number(process.env.SMTP_PORT || 587);

  const secure =
    String(process.env.SMTP_SECURE || "false").toLowerCase() ===
    "true";

  return nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port,
    secure,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
    tls: {
      rejectUnauthorized: true,
    },
  });
}

function requireEmailConfiguration() {
  const missing = [];

  if (!process.env.SMTP_HOST) missing.push("SMTP_HOST");
  if (!process.env.SMTP_USER) missing.push("SMTP_USER");
  if (!process.env.SMTP_PASS) missing.push("SMTP_PASS");

  return missing;
}

router.post("/register", async (req, res, next) => {
  try {
    const eventTitle = clean(req.body?.eventTitle);
    const eventDate = clean(req.body?.eventDate);
    const eventTime = clean(req.body?.eventTime);

    const recipient =
      clean(req.body?.recipient) ||
      clean(process.env.EVENT_REGISTRATION_RECIPIENT) ||
      DEFAULT_RECIPIENT;

    const name = clean(req.body?.name);
    const email = clean(req.body?.email).toLowerCase();
    const organisation = clean(req.body?.organisation);
    const role = clean(req.body?.role);
    const phone = clean(req.body?.phone);
    const message = clean(req.body?.message);
    const consent = Boolean(req.body?.consent);

    if (!eventTitle) {
      return res.status(400).json({
        success: false,
        message: "Event title is required.",
      });
    }

    if (!name) {
      return res.status(400).json({
        success: false,
        message: "Name is required.",
      });
    }

    if (!isEmail(email)) {
      return res.status(400).json({
        success: false,
        message: "A valid email address is required.",
      });
    }

    if (!isEmail(recipient)) {
      return res.status(400).json({
        success: false,
        message:
          "The event registration recipient email address is not valid.",
      });
    }

    if (!consent) {
      return res.status(400).json({
        success: false,
        message:
          "Consent is required before submitting the registration.",
      });
    }

    const missingEmailSettings =
      requireEmailConfiguration();

    if (missingEmailSettings.length > 0) {
      return res.status(500).json({
        success: false,
        message: `Event registration email is not configured. Missing: ${missingEmailSettings.join(
          ", "
        )}.`,
      });
    }

    const transporter = createTransporter();

    const subject = `New event registration: ${eventTitle}`;

    const submittedAt = new Date().toLocaleString("en-GB", {
      timeZone: "Europe/London",
      dateStyle: "medium",
      timeStyle: "short",
    });

    const text = `
New Smart Net Zero event registration

Event:
${eventTitle}

Date:
${eventDate || "Not provided"}

Time / location:
${eventTime || "Not provided"}

Registrant:
${name}

Email:
${email}

Organisation:
${organisation || "Not provided"}

Role:
${role || "Not provided"}

Phone:
${phone || "Not provided"}

Message:
${message || "Not provided"}

Consent:
${consent ? "Yes" : "No"}

Submitted:
${submittedAt}
`.trim();

    const html = `
      <div style="font-family: Arial, sans-serif; color: #0f172a; line-height: 1.6;">
        <h2 style="margin: 0 0 16px;">New Smart Net Zero event registration</h2>

        <div style="margin: 0 0 20px; padding: 16px; background: #f0fdfa; border-left: 4px solid #14b8a6;">
          <h3 style="margin: 0 0 8px;">Event</h3>
          <p style="margin: 0;"><strong>${escapeHtml(eventTitle)}</strong></p>
          <p style="margin: 8px 0 0;">Date: ${escapeHtml(eventDate || "Not provided")}</p>
          <p style="margin: 4px 0 0;">Time / location: ${escapeHtml(eventTime || "Not provided")}</p>
        </div>

        <div style="margin: 0 0 20px; padding: 16px; background: #f8fafc; border: 1px solid #e2e8f0;">
          <h3 style="margin: 0 0 8px;">Registrant</h3>
          <p style="margin: 4px 0;"><strong>Name:</strong> ${escapeHtml(name)}</p>
          <p style="margin: 4px 0;"><strong>Email:</strong> ${escapeHtml(email)}</p>
          <p style="margin: 4px 0;"><strong>Organisation:</strong> ${escapeHtml(organisation || "Not provided")}</p>
          <p style="margin: 4px 0;"><strong>Role:</strong> ${escapeHtml(role || "Not provided")}</p>
          <p style="margin: 4px 0;"><strong>Phone:</strong> ${escapeHtml(phone || "Not provided")}</p>
        </div>

        <div style="margin: 0 0 20px; padding: 16px; background: #ffffff; border: 1px solid #e2e8f0;">
          <h3 style="margin: 0 0 8px;">Message</h3>
          <p style="margin: 0; white-space: pre-line;">${escapeHtml(message || "Not provided")}</p>
        </div>

        <p><strong>Consent:</strong> ${consent ? "Yes" : "No"}</p>
        <p><strong>Submitted:</strong> ${escapeHtml(submittedAt)}</p>
      </div>
    `;

    await transporter.sendMail({
      from:
        process.env.MAIL_FROM ||
        process.env.SMTP_USER,
      to: recipient,
      replyTo: email,
      subject,
      text,
      html,
    });

    return res.status(201).json({
      success: true,
      message: "Registration submitted.",
    });
  } catch (error) {
    return next(error);
  }
});

export default router;
import { Router } from "express";
import nodemailer from "nodemailer";

const router = Router();

function isValidEmail(value) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(
    String(value || "").trim()
  );
}

function createEnquiryTransporter() {
  return nodemailer.createTransport({
    host: process.env.ENQUIRY_SMTP_HOST,

    port: Number(
      process.env.ENQUIRY_SMTP_PORT || 587
    ),

    secure:
      process.env.ENQUIRY_SMTP_SECURE ===
      "true",

    auth: {
      user:
        process.env.ENQUIRY_SMTP_USER,

      pass:
        process.env.ENQUIRY_SMTP_PASS,
    },
  });
}

router.get("/test", (_req, res) => {
  return res.status(200).json({
    success: true,
    message:
      "Enquiry router is working.",
  });
});

router.post("/", async (req, res) => {
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
      String(organisation || "").trim();

    const cleanEnquiryType =
      String(enquiryType || "").trim();

    const cleanMessage =
      String(message || "").trim();

    if (
      !cleanName ||
      !cleanEmail ||
      !cleanPhone ||
      !cleanEnquiryType ||
      !cleanMessage
    ) {
      return res.status(400).json({
        success: false,
        message:
          "Please complete all required fields.",
      });
    }

    if (!isValidEmail(cleanEmail)) {
      return res.status(400).json({
        success: false,
        message:
          "Please enter a valid email address.",
      });
    }

    const transporter =
      createEnquiryTransporter();

    const subject = `${
      urgent ? "URGENT - " : ""
    }Smart Net Zero website enquiry - ${cleanEnquiryType}`;

    const emailBody = [
      "New Smart Net Zero website enquiry received.",
      "",
      "Priority:",
      urgent ? "URGENT" : "Normal",
      "",
      "Enquiry type:",
      cleanEnquiryType,
      "",
      "Name:",
      cleanName,
      "",
      "Email:",
      cleanEmail,
      "",
      "Phone:",
      cleanPhone,
      "",
      "Organisation:",
      cleanOrganisation ||
        "Not provided",
      "",
      "Message:",
      cleanMessage,
      "",
      "---",
      "Submitted through the Smart Net Zero website.",
    ].join("\n");

    await transporter.sendMail({
      from:
        process.env.ENQUIRY_MAIL_FROM ||
        process.env.ENQUIRY_SMTP_USER,

      to:
        process.env.ENQUIRY_MAIL_TO ||
        "sales@smartnetzero.co.uk",

      replyTo: cleanEmail,
      subject,
      text: emailBody,
    });

    return res.status(200).json({
      success: true,
      message:
        "Your enquiry has been sent successfully.",
    });
  } catch (error) {
    console.error(
      "Website enquiry error:",
      error
    );

    return res.status(500).json({
      success: false,
      message:
        error?.message ||
        "Your enquiry could not be sent. Please try again later.",
    });
  }
});

export default router;
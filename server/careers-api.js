import express from "express";
import multer from "multer";
import nodemailer from "nodemailer";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

const allowedMimeTypes = [
  "application/pdf",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
];

const storage = multer.memoryStorage();

const upload = multer({
  storage,
  limits: {
    fileSize: 10 * 1024 * 1024,
  },
  fileFilter: (_req, file, callback) => {
    const lowerName = file.originalname.toLowerCase();

    const validExtension =
      lowerName.endsWith(".pdf") || lowerName.endsWith(".docx");

    const validMime = allowedMimeTypes.includes(file.mimetype);

    if (!validExtension && !validMime) {
      return callback(
        new Error("Only PDF and DOCX CV files are accepted."),
        false
      );
    }

    callback(null, true);
  },
});

/*
 * Careers SMTP connection.
 * Uses the existing careers@smartnetzero.co.uk environment variables.
 */
function createCareersTransporter() {
  return nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT || 587),
    secure: process.env.SMTP_SECURE === "true",
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });
}

/*
 * Website enquiry SMTP connection.
 * Uses the separate web@smartnetzero.co.uk environment variables.
 */
function createEnquiryTransporter() {
  return nodemailer.createTransport({
    host: process.env.ENQUIRY_SMTP_HOST,
    port: Number(process.env.ENQUIRY_SMTP_PORT || 587),
    secure: process.env.ENQUIRY_SMTP_SECURE === "true",
    auth: {
      user: process.env.ENQUIRY_SMTP_USER,
      pass: process.env.ENQUIRY_SMTP_PASS,
    },
  });
}

function isValidEmail(value) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(value || "").trim());
}

/*
 * Careers application endpoint.
 * Receives the applicant details and CV, then sends them through
 * the careers@smartnetzero.co.uk mailbox.
 */
app.post("/api/careers/apply", upload.single("cv"), async (req, res) => {
  try {
    const {
      fullName,
      email,
      phone,
      roleId,
      roleTitle,
      linkedin,
      message,
    } = req.body;

    if (!fullName || !email || !roleId || !roleTitle) {
      return res.status(400).json({
        message: "Name, email and role are required.",
      });
    }

    if (!isValidEmail(email)) {
      return res.status(400).json({
        message: "Please enter a valid email address.",
      });
    }

    if (!req.file) {
      return res.status(400).json({
        message: "CV is required and must be PDF or DOCX.",
      });
    }

    const transporter = createCareersTransporter();

    const emailBody = [
      "New careers application received.",
      "",
      "Role:",
      roleTitle,
      roleId,
      "",
      "Applicant:",
      fullName,
      "",
      "Email:",
      email,
      "",
      "Phone:",
      phone || "Not provided",
      "",
      "LinkedIn:",
      linkedin || "Not provided",
      "",
      "Message:",
      message || "No message provided",
    ].join("\n");

    await transporter.sendMail({
      from: process.env.MAIL_FROM || process.env.SMTP_USER,
      to: "careers@smartnetzero.co.uk",
      replyTo: email,
      subject: `Careers Application: ${roleTitle} - ${fullName}`,
      text: emailBody,
      attachments: [
        {
          filename: req.file.originalname,
          content: req.file.buffer,
          contentType: req.file.mimetype,
        },
      ],
    });

    return res.status(200).json({
      message: "Application sent successfully.",
    });
  } catch (error) {
    console.error("Careers application error:", error);

    return res.status(500).json({
      message:
        error?.message ||
        "Application could not be sent. Please try again later.",
    });
  }
});

/*
 * Website enquiry endpoint.
 * Receives enquiries from EnquiryModal.jsx and sends them through
 * the web@smartnetzero.co.uk mailbox.
 */
app.post("/api/enquiries", async (req, res) => {
  try {
    const {
      name,
      email,
      phone,
      organisation,
      enquiryType,
      message,
      urgent,
    } = req.body;

    const cleanName = String(name || "").trim();
    const cleanEmail = String(email || "").trim();
    const cleanPhone = String(phone || "").trim();
    const cleanOrganisation = String(organisation || "").trim();
    const cleanEnquiryType = String(enquiryType || "").trim();
    const cleanMessage = String(message || "").trim();

    if (
      !cleanName ||
      !cleanEmail ||
      !cleanPhone ||
      !cleanEnquiryType ||
      !cleanMessage
    ) {
      return res.status(400).json({
        success: false,
        message: "Please complete all required fields.",
      });
    }

    if (!isValidEmail(cleanEmail)) {
      return res.status(400).json({
        success: false,
        message: "Please enter a valid email address.",
      });
    }

    const transporter = createEnquiryTransporter();

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
      cleanOrganisation || "Not provided",
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
      message: "Your enquiry has been sent successfully.",
    });
  } catch (error) {
    console.error("Website enquiry error:", error);

    return res.status(500).json({
      success: false,
      message:
        error?.message ||
        "Your enquiry could not be sent. Please try again later.",
    });
  }
});

/*
 * Multer and general request error handling.
 */
app.use((error, _req, res, _next) => {
  if (error instanceof multer.MulterError) {
    if (error.code === "LIMIT_FILE_SIZE") {
      return res.status(400).json({
        message: "The CV must be smaller than 10MB.",
      });
    }

    return res.status(400).json({
      message: error.message,
    });
  }

  return res.status(400).json({
    message: error?.message || "Invalid request.",
  });
});

const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`Smart Net Zero email API running on port ${port}`);
});
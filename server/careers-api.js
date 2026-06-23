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
  fileFilter: (req, file, callback) => {
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

function createTransporter() {
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

    if (!req.file) {
      return res.status(400).json({
        message: "CV is required and must be PDF or DOCX.",
      });
    }

    const transporter = createTransporter();

    const emailBody = `
New careers application received.

Role:
${roleTitle}
${roleId}

Applicant:
${fullName}

Email:
${email}

Phone:
${phone || "Not provided"}

LinkedIn:
${linkedin || "Not provided"}

Message:
${message || "No message provided"}
`;

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
        error.message ||
        "Application could not be sent. Please try again later.",
    });
  }
});

app.use((error, req, res, next) => {
  if (error instanceof multer.MulterError) {
    return res.status(400).json({
      message: error.message,
    });
  }

  return res.status(400).json({
    message: error.message || "Invalid request.",
  });
});

const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`Careers API running on port ${port}`);
});
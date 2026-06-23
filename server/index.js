import "dotenv/config";

import express from "express";
import helmet from "helmet";
import cors from "cors";
import rateLimit from "express-rate-limit";
import path from "node:path";

import {
  loginAdministrator,
} from "./auth.js";

import jobsRouter from "./routes/jobs.js";
import cmsRouter from "./routes/cmsRoutes.js";
import socialRouter from "./routes/socialRoutes.js";
import mediaRouter from "./routes/mediaRoutes.js";

/*
 * Create the Express application before calling app.use(),
 * app.get(), app.post(), or any other app method.
 */
const app = express();

const port =
  Number(process.env.PORT) || 5000;

const frontendOrigin =
  process.env.FRONTEND_ORIGIN ||
  "http://localhost:5173";

const uploadDirectory =
  process.env.CMS_UPLOAD_DIR ||
  "./uploads";

/*
 * Security headers.
 *
 * Cross-origin-resource-policy is disabled temporarily so that
 * the Vite frontend on port 5173 can display locally hosted
 * media from the API on port 5000.
 */
app.use(
  helmet({
    crossOriginResourcePolicy: false,
  })
);

/*
 * Allow the local frontend to call the API.
 */
app.use(
  cors({
    origin: frontendOrigin,
    credentials: true,
  })
);

/*
 * Parse JSON request bodies.
 */
app.use(
  express.json({
    limit: "2mb",
  })
);

/*
 * Serve locally uploaded development files.
 *
 * Example:
 * http://localhost:5000/uploads/example.jpg
 */
app.use(
  "/uploads",
  express.static(
    path.resolve(
      uploadDirectory
    )
  )
);

/*
 * General API rate limiting.
 */
const apiLimiter = rateLimit({
  windowMs:
    15 * 60 * 1000,

  limit: 500,

  standardHeaders: true,
  legacyHeaders: false,

  message: {
    message:
      "Too many requests. Please try again later.",
  },
});

app.use(
  "/api",
  apiLimiter
);

/*
 * Administrator login.
 */
app.post(
  "/api/admin/login",
  loginAdministrator
);

/*
 * Application API routes.
 */
app.use(
  "/api/jobs",
  jobsRouter
);

app.use(
  "/api",
  cmsRouter
);

app.use(
  "/api",
  mediaRouter
);

app.use(
  "/api",
  socialRouter
);

/*
 * Health check.
 */
app.get(
  "/api/health",
  (_req, res) => {
    res.json({
      status: "ok",
      service: "snz-api",
      timestamp:
        new Date().toISOString(),
    });
  }
);

/*
 * API 404 handler.
 *
 * Keep this after all API routes.
 */
app.use(
  "/api",
  (_req, res) => {
    res.status(404).json({
      message:
        "The requested API route was not found.",
    });
  }
);

/*
 * General error handler.
 */
app.use(
  (
    error,
    _req,
    res,
    _next
  ) => {
    console.error(
      "API error:",
      error
    );

    if (
      error?.code ===
      "LIMIT_FILE_SIZE"
    ) {
      return res
        .status(413)
        .json({
          message:
            "The selected file is too large.",
        });
    }

    if (
      error?.message?.includes(
        "Only JPEG"
      )
    ) {
      return res
        .status(400)
        .json({
          message:
            error.message,
        });
    }

    return res
      .status(
        error?.status ||
          error?.statusCode ||
          500
      )
      .json({
        message:
          error?.message ||
          "An unexpected server error occurred.",
      });
  }
);

app.listen(
  port,
  () => {
    console.log(
      `SNZ API running at http://localhost:${port}`
    );

    console.log(
      `Local uploads served from ${path.resolve(
        uploadDirectory
      )}`
    );
  }
);
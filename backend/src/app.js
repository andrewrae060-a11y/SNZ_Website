import express from "express";
import cors from "cors";
import helmet from "helmet";
import cookieParser from "cookie-parser";

import {
  testDatabaseConnection,
} from "./database.js";

import researchAccessRoutes from
  "./routes/researchAccess.routes.js";

import researchAuthRoutes from
  "./routes/researchAuth.routes.js";

import researchDocumentsRoutes from
  "./routes/researchDocuments.routes.js";

import adminResearchRoutes from
  "./routes/adminResearch.routes.js";

import jobsRoutes from
  "./routes/jobs.routes.js";

import careersApplicationsRoutes from
  "./routes/careersApplications.routes.js";

const app = express();

app.disable("x-powered-by");

app.use(helmet());

if (
  process.env.NODE_ENV !==
  "production"
) {
  app.use(
    cors({
      origin:
        process.env.FRONTEND_URL ||
        "http://localhost:5173",

      credentials: true,
    })
  );
}

app.use(cookieParser());

app.use(
  express.json({
    limit: "100kb",
  })
);

app.use(
  "/api/research-access",
  researchAccessRoutes
);

app.use(
  "/api/research",
  researchAuthRoutes
);

app.use(
  "/api/research/documents",
  researchDocumentsRoutes
);

app.use(
  "/api/admin",
  adminResearchRoutes
);

app.use(
  "/api/jobs",
  jobsRoutes
);

app.use(
  "/api/careers",
  careersApplicationsRoutes
);

app.get(
  "/api/health",
  async (_req, res) => {
    try {
      const database =
        await testDatabaseConnection();

      return res.status(200).json({
        success: true,
        message:
          "SNZ backend is running.",
        database: {
          connected: true,
          name:
            database.database_name,
          connectedAt:
            database.connected_at,
        },
      });
    } catch (error) {
      console.error(
        "Database connection failed:",
        error
      );

      return res.status(500).json({
        success: false,
        message:
          "Database connection failed.",
      });
    }
  }
);

app.use((req, res) => {
  return res.status(404).json({
    success: false,
    message: "API route not found.",
  });
});

app.use(
  (error, _req, res, next) => {
    console.error(
      "Unexpected server error:",
      {
        message: error?.message,
        code: error?.code,
        detail: error?.detail,
        stack: error?.stack,
      }
    );

    if (res.headersSent) {
      return next(error);
    }

    return res.status(500).json({
      success: false,
      message:
        "An unexpected server error occurred.",
    });
  }
);

export default app;
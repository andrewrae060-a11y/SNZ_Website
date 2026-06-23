import express from "express";
import cors from "cors";
import helmet from "helmet";
import cookieParser from "cookie-parser";
import { testDatabaseConnection } from "./database.js";
import researchAccessRoutes from "./routes/researchAccess.routes.js";
import researchAuthRoutes from "./routes/researchAuth.routes.js";
import researchDocumentsRoutes from "./routes/researchDocuments.routes.js";
import adminResearchRoutes from "./routes/adminResearch.routes.js";

const app = express();

app.use(helmet());

app.use(
  cors({
    origin: process.env.FRONTEND_URL || "http://localhost:5173",
    credentials: true,
  })
);

app.use(cookieParser());
app.use(express.json({ limit: "20kb" }));

app.use("/api/research-access", researchAccessRoutes);
app.use("/api/research", researchAuthRoutes);
app.use(
  "/api/research/documents",
  researchDocumentsRoutes
);
app.use("/api/admin", adminResearchRoutes);

app.get("/api/health", async (req, res) => {
  try {
    const database = await testDatabaseConnection();

    return res.status(200).json({
      success: true,
      message: "SNZ research backend is running.",
      database: {
        connected: true,
        name: database.database_name,
        connectedAt: database.connected_at,
      },
    });
  } catch (error) {
    console.error("Database connection failed:", error);

    return res.status(500).json({
      success: false,
      message: "The backend is running, but the database connection failed.",
      database: {
        connected: false,
      },
    });
  }
});

app.use((error, req, res, next) => {
  console.error("Unexpected server error:", {
    message: error?.message,
    code: error?.code,
    name: error?.name,
    detail: error?.detail,
    stack: error?.stack,
  });

  if (res.headersSent) {
    return next(error);
  }

  return res.status(500).json({
    success: false,
    message: "An unexpected server error occurred.",
  });
});

export default app;
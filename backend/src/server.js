import "dotenv/config";
import app from "./app.js";

const port = Number(process.env.PORT) || 3001;

const server = app.listen(port, () => {
  console.log(`SNZ research backend running on http://localhost:${port}`);
});

function shutDown(signal) {
  console.log(`${signal} received. Closing backend server.`);

  server.close(() => {
    console.log("Backend server closed.");
    process.exit(0);
  });
}

process.on("SIGINT", () => shutDown("SIGINT"));
process.on("SIGTERM", () => shutDown("SIGTERM"));
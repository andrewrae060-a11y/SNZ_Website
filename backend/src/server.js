import "dotenv/config";

import app from "./app.js";

const port =
  Number(process.env.PORT) || 3001;

const server = app.listen(
  port,
  "0.0.0.0",
  () => {
    console.log(
      `SNZ research backend running on http://localhost:${port}`
    );
  }
);

server.on("error", (error) => {
  if (error.code === "EADDRINUSE") {
    console.error(
      `Port ${port} is already being used by another process.`
    );
  } else {
    console.error(
      "Backend server error:",
      error
    );
  }

  process.exit(1);
});

function shutdown(signal) {
  console.log(
    `${signal} received. Closing backend server...`
  );

  server.close((error) => {
    if (error) {
      console.error(
        "Error while closing the server:",
        error
      );

      process.exit(1);
    }

    process.exit(0);
  });
}

process.on("SIGINT", () =>
  shutdown("SIGINT")
);

process.on("SIGTERM", () =>
  shutdown("SIGTERM")
);
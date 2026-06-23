import postgres from "postgres";
import "dotenv/config";

const requiredVariables = [
  "DATABASE_HOST",
  "DATABASE_PORT",
  "DATABASE_NAME",
  "DATABASE_USER",
  "DATABASE_PASSWORD",
];

const missingVariables = requiredVariables.filter(
  (variableName) => !process.env[variableName]
);

if (missingVariables.length > 0) {
  throw new Error(
    `Missing database settings in backend/.env: ${missingVariables.join(", ")}`
  );
}

console.log("Database settings loaded:", {
  host: process.env.DATABASE_HOST,
  port: process.env.DATABASE_PORT,
  database: process.env.DATABASE_NAME,
  user: process.env.DATABASE_USER,
  passwordLoaded: Boolean(process.env.DATABASE_PASSWORD),
});

const sql = postgres({
  host: process.env.DATABASE_HOST,
  port: Number(process.env.DATABASE_PORT),
  database: process.env.DATABASE_NAME,
  username: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASSWORD,
  ssl: "require",
  max: 5,
  idle_timeout: 20,
  connect_timeout: 10,
});

export async function testDatabaseConnection() {
  const result = await sql`
    SELECT
      current_database() AS database_name,
      current_user AS database_user,
      NOW() AS connected_at
  `;

  return result[0];
}

export default sql;
import postgres from "postgres";
import dotenv from "dotenv";
import path from "node:path";
import "../../backend/src/loadEnvironment.js";
import {
  fileURLToPath,
} from "node:url";

const currentFilePath =
  fileURLToPath(import.meta.url);

const currentDirectory =
  path.dirname(currentFilePath);

dotenv.config({
  path: path.resolve(
    currentDirectory,
    "../.env"
  ),
});

const databaseUrl =
  process.env.DATABASE_URL?.trim();

const requiredVariables = [
  "DATABASE_HOST",
  "DATABASE_PORT",
  "DATABASE_NAME",
  "DATABASE_USER",
  "DATABASE_PASSWORD",
];

const missingVariables = databaseUrl
  ? []
  : requiredVariables.filter(
      (variableName) =>
        !process.env[variableName]
    );

if (missingVariables.length > 0) {
  throw new Error(
    `Missing database settings: ${missingVariables.join(", ")}`
  );
}

const isTransactionPooler =
  databaseUrl?.includes(":6543/") ||
  process.env.DATABASE_PORT === "6543";

const connectionOptions = {
  ssl: "require",

  // Required when using Supabase transaction pooling.
  prepare: !isTransactionPooler,

  max:
    process.env.NODE_ENV === "production"
      ? 3
      : 5,

  idle_timeout: 20,
  connect_timeout: 10,
};

const sql = databaseUrl
  ? postgres(
      databaseUrl,
      connectionOptions
    )
  : postgres({
      host:
        process.env.DATABASE_HOST,

      port: Number(
        process.env.DATABASE_PORT
      ),

      database:
        process.env.DATABASE_NAME,

      username:
        process.env.DATABASE_USER,

      password:
        process.env.DATABASE_PASSWORD,

      ...connectionOptions,
    });

console.log("Database settings loaded:", {
  connectionType: databaseUrl
    ? "DATABASE_URL"
    : "individual variables",

  host: databaseUrl
    ? "loaded from DATABASE_URL"
    : process.env.DATABASE_HOST,

  port: databaseUrl
    ? "loaded from DATABASE_URL"
    : process.env.DATABASE_PORT,

  database: databaseUrl
    ? "loaded from DATABASE_URL"
    : process.env.DATABASE_NAME,

  user: databaseUrl
    ? "loaded from DATABASE_URL"
    : process.env.DATABASE_USER,

  passwordLoaded: databaseUrl
    ? true
    : Boolean(
        process.env.DATABASE_PASSWORD
      ),

  transactionPooler:
    isTransactionPooler,
});

export async function testDatabaseConnection() {
  const result = await sql`
    select
      current_database()
        as database_name,

      current_user
        as database_user,

      now()
        as connected_at
  `;

  return result[0];
}

export default sql;
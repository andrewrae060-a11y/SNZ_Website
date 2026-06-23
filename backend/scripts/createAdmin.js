import "dotenv/config";
import argon2 from "argon2";
import readline from "node:readline/promises";
import { stdin as input, stdout as output } from "node:process";
import sql from "../src/database.js";

const reader = readline.createInterface({
  input,
  output,
});

function normaliseEmail(email) {
  return email.trim().toLowerCase();
}

async function createAdmin() {
  try {
    const emailAnswer = await reader.question(
      "Enter the administrator email address: "
    );

    const passwordAnswer = await reader.question(
      "Enter the administrator password: "
    );

    const email = normaliseEmail(emailAnswer);
    const password = passwordAnswer.trim();

    if (!email || !email.includes("@")) {
      throw new Error("Please enter a valid administrator email address.");
    }

    if (password.length < 12) {
      throw new Error(
        "The administrator password must contain at least 12 characters."
      );
    }

    const existingAdmins = await sql`
      SELECT id
      FROM admin_users
      WHERE LOWER(email) = ${email}
      LIMIT 1
    `;

    if (existingAdmins.length > 0) {
      throw new Error(
        "An administrator account already exists for this email address."
      );
    }

    const passwordHash = await argon2.hash(password);

    const insertedAdmins = await sql`
      INSERT INTO admin_users (
        email,
        password_hash,
        role,
        is_active
      )
      VALUES (
        ${email},
        ${passwordHash},
        'RESEARCH_ADMIN',
        TRUE
      )
      RETURNING
        id,
        email,
        role,
        is_active,
        created_at
    `;

    const admin = insertedAdmins[0];

    console.log("");
    console.log("Administrator account created successfully.");
    console.log({
      id: admin.id,
      email: admin.email,
      role: admin.role,
      active: admin.is_active,
      createdAt: admin.created_at,
    });
  } catch (error) {
    console.error("");
    console.error("Administrator account was not created.");
    console.error(error.message);
  } finally {
    reader.close();
    await sql.end();
  }
}

createAdmin();
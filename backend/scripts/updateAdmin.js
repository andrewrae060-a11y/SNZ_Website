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

async function updateAdmin() {
  try {
    const currentEmailAnswer = await reader.question(
      "Enter the current administrator email address: "
    );

    const currentEmail = normaliseEmail(currentEmailAnswer);

    const existingAdmins = await sql`
      SELECT
        id,
        email,
        role,
        is_active
      FROM admin_users
      WHERE LOWER(email) = ${currentEmail}
      LIMIT 1
    `;

    const admin = existingAdmins[0];

    if (!admin) {
      throw new Error(
        "No administrator account was found for that email address."
      );
    }

    const newEmailAnswer = await reader.question(
      "Enter the new email address, or press Enter to keep the current email: "
    );

    const newPasswordAnswer = await reader.question(
      "Enter the new password, or press Enter to keep the current password: "
    );

    const newEmail = newEmailAnswer.trim()
      ? normaliseEmail(newEmailAnswer)
      : admin.email;

    const newPassword = newPasswordAnswer.trim();

    if (!newEmail.includes("@")) {
      throw new Error("Please enter a valid email address.");
    }

    if (newPassword && newPassword.length < 12) {
      throw new Error(
        "The new administrator password must contain at least 12 characters."
      );
    }

    if (newEmail !== admin.email) {
      const duplicateAdmins = await sql`
        SELECT id
        FROM admin_users
        WHERE LOWER(email) = ${newEmail}
          AND id <> ${admin.id}
        LIMIT 1
      `;

      if (duplicateAdmins.length > 0) {
        throw new Error(
          "Another administrator already uses the new email address."
        );
      }
    }

    if (newPassword) {
      const newPasswordHash = await argon2.hash(newPassword, {
        type: argon2.argon2id,
      });

      await sql`
        UPDATE admin_users
        SET
          email = ${newEmail},
          password_hash = ${newPasswordHash},
          updated_at = CURRENT_TIMESTAMP
        WHERE id = ${admin.id}
      `;
    } else {
      await sql`
        UPDATE admin_users
        SET
          email = ${newEmail},
          updated_at = CURRENT_TIMESTAMP
        WHERE id = ${admin.id}
      `;
    }

    console.log("");
    console.log("Administrator credentials updated successfully.");
    console.log({
      previousEmail: admin.email,
      currentEmail: newEmail,
      passwordChanged: Boolean(newPassword),
    });
  } catch (error) {
    console.error("");
    console.error("Administrator credentials were not updated.");
    console.error(error.message);
    process.exitCode = 1;
  } finally {
    reader.close();
    await sql.end();
  }
}

updateAdmin();
import "dotenv/config";

import {
  db,
} from "./db.js";

import {
  seedContent,
} from "./seed-data.js";

const administratorEmail =
  String(
    process.env.ADMIN_EMAIL || ""
  )
    .trim()
    .toLowerCase();

const administratorPasswordHash =
  process.env.ADMIN_PASSWORD_HASH || "";

if (
  !administratorEmail ||
  !administratorPasswordHash
) {
  throw new Error(
    "ADMIN_EMAIL and ADMIN_PASSWORD_HASH must be configured before seeding the CMS."
  );
}

/*
 * This user record supports CMS ownership,
 * revision history and audit logging.
 *
 * Authentication continues to use server/auth.js
 * and the environment variables.
 */
db.prepare(`
  INSERT INTO users (
    email,
    password_hash,
    name,
    role,
    active
  )
  VALUES (?, ?, ?, ?, 1)

  ON CONFLICT(email)
  DO UPDATE SET
    password_hash = excluded.password_hash,
    name = excluded.name,
    role = excluded.role,
    active = 1
`).run(
  administratorEmail,
  administratorPasswordHash,
  "Website Administrator",
  "admin"
);

const administrator = db
  .prepare(`
    SELECT id
    FROM users
    WHERE email = ?
  `)
  .get(administratorEmail);

const insertContent =
  db.prepare(`
    INSERT INTO content_items (
      section,
      item_key,
      status,
      sort_order,
      data_json,
      published_at,
      created_by,
      updated_by
    )
    VALUES (
      ?,
      ?,
      'published',
      ?,
      ?,
      CURRENT_TIMESTAMP,
      ?,
      ?
    )

    ON CONFLICT(section, item_key)
    DO NOTHING
  `);

const seedTransaction =
  db.transaction(() => {
    Object.entries(
      seedContent
    ).forEach(
      ([section, items]) => {
        items.forEach(
          (item, index) => {
            insertContent.run(
              section,
              item.key,
              index,
              JSON.stringify(
                item.data
              ),
              administrator.id,
              administrator.id
            );
          }
        );
      }
    );
  });

seedTransaction();

console.log(
  `CMS database created and seeded for ${administratorEmail}.`
);
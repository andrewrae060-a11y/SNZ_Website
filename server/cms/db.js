import Database from "better-sqlite3";
import fs from "node:fs";
import path from "node:path";
import "dotenv/config";

const databaseFilename =
  process.env.DATABASE_FILE ||
  "./data/snz-cms.sqlite";

const databaseDirectory =
  path.dirname(databaseFilename);

fs.mkdirSync(databaseDirectory, {
  recursive: true,
});

export const db =
  new Database(databaseFilename);

db.pragma("journal_mode = WAL");
db.pragma("foreign_keys = ON");

db.exec(`
  CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    email TEXT UNIQUE NOT NULL,
    password_hash TEXT NOT NULL,
    name TEXT NOT NULL,
    role TEXT NOT NULL DEFAULT 'editor',
    active INTEGER NOT NULL DEFAULT 1,
    created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
  );

  CREATE TABLE IF NOT EXISTS content_items (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    section TEXT NOT NULL,
    item_key TEXT NOT NULL,
    status TEXT NOT NULL DEFAULT 'draft',
    sort_order INTEGER NOT NULL DEFAULT 0,
    data_json TEXT NOT NULL,
    published_at TEXT,
    created_by INTEGER,
    updated_by INTEGER,
    created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,

    UNIQUE(section, item_key),

    FOREIGN KEY(created_by)
      REFERENCES users(id),

    FOREIGN KEY(updated_by)
      REFERENCES users(id)
  );

  CREATE TABLE IF NOT EXISTS revisions (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    content_item_id INTEGER NOT NULL,
    data_json TEXT NOT NULL,
    status TEXT NOT NULL,
    changed_by INTEGER,
    changed_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,

    FOREIGN KEY(content_item_id)
      REFERENCES content_items(id)
      ON DELETE CASCADE,

    FOREIGN KEY(changed_by)
      REFERENCES users(id)
  );

  CREATE TABLE IF NOT EXISTS subscribers (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    email TEXT UNIQUE NOT NULL,
    source TEXT NOT NULL DEFAULT 'social-hub',
    consent_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
    active INTEGER NOT NULL DEFAULT 1
  );

  CREATE TABLE IF NOT EXISTS social_connections (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    platform TEXT UNIQUE NOT NULL,
    account_name TEXT,
    access_token TEXT,
    refresh_token TEXT,
    expires_at TEXT,
    metadata_json TEXT,
    active INTEGER NOT NULL DEFAULT 1,
    updated_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
  );

  CREATE TABLE IF NOT EXISTS audit_log (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id INTEGER,
    action TEXT NOT NULL,
    entity_type TEXT NOT NULL,
    entity_id TEXT,
    detail_json TEXT,
    ip_address TEXT,
    created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,

    FOREIGN KEY(user_id)
      REFERENCES users(id)
  );
`);

function parseJson(value, fallback = {}) {
  try {
    return JSON.parse(value);
  } catch {
    return fallback;
  }
}

function mapContentItem(row) {
  if (!row) {
    return null;
  }

  return {
    id: row.id,
    section: row.section,
    itemKey: row.item_key,
    status: row.status,
    sortOrder: row.sort_order,
    data: parseJson(row.data_json),
    publishedAt: row.published_at,
    createdAt: row.created_at,
    updatedAt: row.updated_at,
  };
}

function getAdministratorId(email) {
  if (!email) {
    return null;
  }

  const user = db
    .prepare(`
      SELECT id
      FROM users
      WHERE LOWER(email) = LOWER(?)
      AND active = 1
    `)
    .get(String(email).trim());

  return user?.id || null;
}

function groupContentItems(rows) {
  return rows.reduce(
    (content, row) => {
      const item = mapContentItem(row);

      if (!content[item.section]) {
        content[item.section] = [];
      }

      content[item.section].push(item);

      return content;
    },
    {}
  );
}

export function getPublishedContent() {
  const rows = db
    .prepare(`
      SELECT *
      FROM content_items
      WHERE status = 'published'
      ORDER BY
        section ASC,
        sort_order ASC,
        id ASC
    `)
    .all();

  return groupContentItems(rows);
}

export function getAdminContent() {
  const rows = db
    .prepare(`
      SELECT *
      FROM content_items
      ORDER BY
        section ASC,
        sort_order ASC,
        id ASC
    `)
    .all();

  return groupContentItems(rows);
}

export function createContentItem({
  section,
  itemKey,
  status = "draft",
  sortOrder = 0,
  data = {},
  updatedBy,
}) {
  const administratorId =
    getAdministratorId(updatedBy);

  const publishedAt =
    status === "published"
      ? new Date().toISOString()
      : null;

  const result = db
    .prepare(`
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
      VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    `)
    .run(
      section,
      itemKey,
      status,
      sortOrder,
      JSON.stringify(data),
      publishedAt,
      administratorId,
      administratorId
    );

  const item = db
    .prepare(`
      SELECT *
      FROM content_items
      WHERE id = ?
    `)
    .get(result.lastInsertRowid);

  if (item) {
    db.prepare(`
      INSERT INTO revisions (
        content_item_id,
        data_json,
        status,
        changed_by
      )
      VALUES (?, ?, ?, ?)
    `).run(
      item.id,
      item.data_json,
      item.status,
      administratorId
    );
  }

  return mapContentItem(item);
}

export function updateContentItem(
  id,
  changes = {}
) {
  const existing = db
    .prepare(`
      SELECT *
      FROM content_items
      WHERE id = ?
    `)
    .get(id);

  if (!existing) {
    return null;
  }

  const administratorId =
    getAdministratorId(
      changes.updatedBy
    );

  const nextSection =
    changes.section ??
    existing.section;

  const nextItemKey =
    changes.itemKey ??
    existing.item_key;

  const nextStatus =
    changes.status ??
    existing.status;

  const nextSortOrder =
    changes.sortOrder ??
    existing.sort_order;

  const nextData =
    changes.data ??
    parseJson(existing.data_json);

  let nextPublishedAt =
    existing.published_at;

  if (
    nextStatus === "published" &&
    !nextPublishedAt
  ) {
    nextPublishedAt =
      new Date().toISOString();
  }

  if (nextStatus !== "published") {
    nextPublishedAt = null;
  }

  db.prepare(`
    UPDATE content_items
    SET
      section = ?,
      item_key = ?,
      status = ?,
      sort_order = ?,
      data_json = ?,
      published_at = ?,
      updated_by = ?,
      updated_at = CURRENT_TIMESTAMP
    WHERE id = ?
  `).run(
    nextSection,
    nextItemKey,
    nextStatus,
    nextSortOrder,
    JSON.stringify(nextData),
    nextPublishedAt,
    administratorId,
    id
  );

  db.prepare(`
    INSERT INTO revisions (
      content_item_id,
      data_json,
      status,
      changed_by
    )
    VALUES (?, ?, ?, ?)
  `).run(
    id,
    JSON.stringify(nextData),
    nextStatus,
    administratorId
  );

  const updated = db
    .prepare(`
      SELECT *
      FROM content_items
      WHERE id = ?
    `)
    .get(id);

  return mapContentItem(updated);
}

export function deleteContentItem(
  id,
  { deletedBy } = {}
) {
  const existing = db
    .prepare(`
      SELECT *
      FROM content_items
      WHERE id = ?
    `)
    .get(id);

  if (!existing) {
    return false;
  }

  const administratorId =
    getAdministratorId(deletedBy);

  const transaction =
    db.transaction(() => {
      db.prepare(`
        INSERT INTO audit_log (
          user_id,
          action,
          entity_type,
          entity_id,
          detail_json
        )
        VALUES (?, ?, ?, ?, ?)
      `).run(
        administratorId,
        "delete",
        "content_item",
        String(id),
        JSON.stringify({
          section: existing.section,
          itemKey: existing.item_key,
          data: parseJson(
            existing.data_json
          ),
        })
      );

      db.prepare(`
        DELETE FROM content_items
        WHERE id = ?
      `).run(id);
    });

  transaction();

  return true;
}

export function createSubscriber({
  email,
  source = "social-hub",
}) {
  db.prepare(`
    INSERT INTO subscribers (
      email,
      source,
      consent_at,
      active
    )
    VALUES (?, ?, CURRENT_TIMESTAMP, 1)

    ON CONFLICT(email)
    DO UPDATE SET
      source = excluded.source,
      consent_at = CURRENT_TIMESTAMP,
      active = 1
  `).run(email, source);

  return db
    .prepare(`
      SELECT
        id,
        email,
        source,
        consent_at AS consentAt,
        active
      FROM subscribers
      WHERE email = ?
    `)
    .get(email);
}
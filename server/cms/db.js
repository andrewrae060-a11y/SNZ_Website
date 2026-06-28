import sql from "../../backend/src/database.js";

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

    data:
      row.data &&
      typeof row.data === "object"
        ? row.data
        : {},

    publishedAt:
      row.published_at,

    createdAt:
      row.created_at,

    updatedAt:
      row.updated_at,
  };
}

async function getAdministratorId(
  email
) {
  const normalizedEmail =
    String(email || "")
      .trim()
      .toLowerCase();

  if (!normalizedEmail) {
    return null;
  }

  const administrators =
    await sql`
      SELECT id
      FROM admin_users
      WHERE LOWER(email) =
        ${normalizedEmail}
      AND is_active = TRUE
      LIMIT 1
    `;

  return (
    administrators[0]?.id ||
    null
  );
}

function groupContentItems(rows) {
  return rows.reduce(
    (content, row) => {
      const item =
        mapContentItem(row);

      if (
        !content[item.section]
      ) {
        content[item.section] =
          [];
      }

      content[
        item.section
      ].push(item);

      return content;
    },
    {}
  );
}

/**
 * Returns published CMS content
 * for the public Social Media page.
 */
export async function getPublishedContent() {
  const rows = await sql`
    SELECT
      id,
      section,
      item_key,
      status,
      sort_order,
      data,
      published_at,
      created_at,
      updated_at
    FROM content_items
    WHERE status = 'published'
    ORDER BY
      section ASC,
      sort_order ASC,
      id ASC
  `;

  return groupContentItems(
    rows
  );
}

/**
 * Returns all CMS content for
 * authenticated administrators.
 */
export async function getAdminContent() {
  const rows = await sql`
    SELECT
      id,
      section,
      item_key,
      status,
      sort_order,
      data,
      published_at,
      created_at,
      updated_at
    FROM content_items
    ORDER BY
      section ASC,
      sort_order ASC,
      id ASC
  `;

  return groupContentItems(
    rows
  );
}

/**
 * Creates a CMS content item and
 * records its first revision.
 */
export async function createContentItem({
  section,
  itemKey,
  status = "draft",
  sortOrder = 0,
  data = {},
  updatedBy,
}) {
  const administratorId =
    await getAdministratorId(
      updatedBy
    );

  const publishedAt =
    status === "published"
      ? new Date()
      : null;

  const rows = await sql.begin(
    async (transaction) => {
      const inserted =
        await transaction`
          INSERT INTO content_items (
            section,
            item_key,
            status,
            sort_order,
            data,
            published_at,
            created_by,
            updated_by
          )
          VALUES (
            ${section},
            ${itemKey},
            ${status},
            ${sortOrder},
            ${transaction.json(data)},
            ${publishedAt},
            ${administratorId},
            ${administratorId}
          )
          RETURNING
            id,
            section,
            item_key,
            status,
            sort_order,
            data,
            published_at,
            created_at,
            updated_at
        `;

      const item =
        inserted[0];

      await transaction`
        INSERT INTO content_revisions (
          content_item_id,
          data,
          status,
          changed_by
        )
        VALUES (
          ${item.id},
          ${transaction.json(data)},
          ${status},
          ${administratorId}
        )
      `;

      return inserted;
    }
  );

  return mapContentItem(
    rows[0]
  );
}

/**
 * Updates an existing CMS item and
 * records a revision.
 */
export async function updateContentItem(
  id,
  changes = {}
) {
  const existingRows =
    await sql`
      SELECT
        id,
        section,
        item_key,
        status,
        sort_order,
        data,
        published_at
      FROM content_items
      WHERE id = ${id}
      LIMIT 1
    `;

  const existing =
    existingRows[0];

  if (!existing) {
    return null;
  }

  const administratorId =
    await getAdministratorId(
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
    existing.data ??
    {};

  let nextPublishedAt =
    existing.published_at;

  if (
    nextStatus ===
      "published" &&
    !nextPublishedAt
  ) {
    nextPublishedAt =
      new Date();
  }

  if (
    nextStatus !==
    "published"
  ) {
    nextPublishedAt = null;
  }

  const rows = await sql.begin(
    async (transaction) => {
      const updated =
        await transaction`
          UPDATE content_items
          SET
            section =
              ${nextSection},

            item_key =
              ${nextItemKey},

            status =
              ${nextStatus},

            sort_order =
              ${nextSortOrder},

            data =
              ${transaction.json(
                nextData
              )},

            published_at =
              ${nextPublishedAt},

            updated_by =
              ${administratorId},

            updated_at = NOW()

          WHERE id = ${id}

          RETURNING
            id,
            section,
            item_key,
            status,
            sort_order,
            data,
            published_at,
            created_at,
            updated_at
        `;

      await transaction`
        INSERT INTO content_revisions (
          content_item_id,
          data,
          status,
          changed_by
        )
        VALUES (
          ${id},
          ${transaction.json(
            nextData
          )},
          ${nextStatus},
          ${administratorId}
        )
      `;

      return updated;
    }
  );

  return mapContentItem(
    rows[0]
  );
}

/**
 * Deletes an item after recording
 * an audit-log entry.
 */
export async function deleteContentItem(
  id,
  {
    deletedBy,
    ipAddress = null,
  } = {}
) {
  const existingRows =
    await sql`
      SELECT
        id,
        section,
        item_key,
        data
      FROM content_items
      WHERE id = ${id}
      LIMIT 1
    `;

  const existing =
    existingRows[0];

  if (!existing) {
    return false;
  }

  const administratorId =
    await getAdministratorId(
      deletedBy
    );

  await sql.begin(
    async (transaction) => {
      await transaction`
        INSERT INTO cms_audit_log (
          admin_user_id,
          action,
          entity_type,
          entity_id,
          detail,
          ip_address
        )
        VALUES (
          ${administratorId},
          'delete',
          'content_item',
          ${String(id)},
          ${transaction.json({
            section:
              existing.section,

            itemKey:
              existing.item_key,

            data:
              existing.data ||
              {},
          })},
          ${ipAddress}
        )
      `;

      await transaction`
        DELETE FROM content_items
        WHERE id = ${id}
      `;
    }
  );

  return true;
}

/**
 * Creates or renews a public
 * newsletter subscription.
 */
export async function createSubscriber({
  email,
  source = "social-hub",
}) {
  const rows = await sql`
    INSERT INTO subscribers (
      email,
      source,
      consent_at,
      active,
      updated_at
    )
    VALUES (
      ${email},
      ${source},
      NOW(),
      TRUE,
      NOW()
    )

    ON CONFLICT (email)
    DO UPDATE SET
      source =
        EXCLUDED.source,

      consent_at =
        NOW(),

      active =
        TRUE,

      updated_at =
        NOW()

    RETURNING
      id,
      email,
      source,
      consent_at,
      active,
      created_at,
      updated_at
  `;

  const subscriber =
    rows[0];

  return {
    id:
      subscriber.id,

    email:
      subscriber.email,

    source:
      subscriber.source,

    consentAt:
      subscriber.consent_at,

    active:
      subscriber.active,

    createdAt:
      subscriber.created_at,

    updatedAt:
      subscriber.updated_at,
  };
}
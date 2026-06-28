import sql from "./database.js";

function mapJob(row) {
  return {
    id: row.id,
    title: row.title,
    department: row.department,
    location: row.location,
    type: row.employment_type,
    status: row.status,
    icon: row.icon,
    summary: row.summary,
    salary: row.salary,
    roleIncludes:
      row.role_includes || [],
    skillsNeeded:
      row.skills_needed || [],
    benefits:
      row.benefits || [],
    published: row.published,
    sortOrder: row.sort_order,
    createdAt: row.created_at,
    updatedAt: row.updated_at,
  };
}

function cleanText(value) {
  return String(value || "").trim();
}

function cleanList(value) {
  if (!Array.isArray(value)) {
    return [];
  }

  return value
    .map((item) =>
      String(item).trim()
    )
    .filter(Boolean);
}

function normaliseJob(input) {
  const sortOrder =
    Number(input.sortOrder);

  return {
    title: cleanText(input.title),
    department:
      cleanText(input.department),
    location:
      cleanText(input.location),

    type:
      cleanText(input.type) ||
      "Full time",

    status:
      cleanText(input.status) ||
      "Open",

    icon:
      cleanText(input.icon) ||
      "briefcase",

    summary:
      cleanText(input.summary),

    salary:
      cleanText(input.salary),

    roleIncludes:
      cleanList(input.roleIncludes),

    skillsNeeded:
      cleanList(input.skillsNeeded),

    benefits:
      cleanList(input.benefits),

    published:
      input.published === true,

    sortOrder:
      Number.isFinite(sortOrder)
        ? sortOrder
        : 100,
  };
}

export async function readPublishedJobs() {
  const rows = await sql`
    select *
    from public.jobs
    where published = true
    order by
      sort_order asc,
      created_at desc
  `;

  return rows.map(mapJob);
}

export async function readAllJobs() {
  const rows = await sql`
    select *
    from public.jobs
    order by
      sort_order asc,
      created_at desc
  `;

  return rows.map(mapJob);
}

export async function createJob(
  input,
  adminId
) {
  const job = normaliseJob(input);

  const rows = await sql`
    insert into public.jobs (
      title,
      department,
      location,
      employment_type,
      status,
      icon,
      summary,
      salary,
      role_includes,
      skills_needed,
      benefits,
      published,
      sort_order,
      created_by,
      updated_by
    )
    values (
      ${job.title},
      ${job.department},
      ${job.location},
      ${job.type},
      ${job.status},
      ${job.icon},
      ${job.summary},
      ${job.salary},
      ${job.roleIncludes},
      ${job.skillsNeeded},
      ${job.benefits},
      ${job.published},
      ${job.sortOrder},
      ${adminId},
      ${adminId}
    )
    returning *
  `;

  return mapJob(rows[0]);
}

export async function updateJob(
  id,
  input,
  adminId
) {
  const job = normaliseJob(input);

  const rows = await sql`
    update public.jobs
    set
      title = ${job.title},
      department = ${job.department},
      location = ${job.location},
      employment_type = ${job.type},
      status = ${job.status},
      icon = ${job.icon},
      summary = ${job.summary},
      salary = ${job.salary},
      role_includes = ${job.roleIncludes},
      skills_needed = ${job.skillsNeeded},
      benefits = ${job.benefits},
      published = ${job.published},
      sort_order = ${job.sortOrder},
      updated_by = ${adminId}
    where id = ${id}
    returning *
  `;

  return rows.length
    ? mapJob(rows[0])
    : null;
}

export async function deleteJob(id) {
  const rows = await sql`
    delete from public.jobs
    where id = ${id}
    returning id
  `;

  return rows.length > 0;
}
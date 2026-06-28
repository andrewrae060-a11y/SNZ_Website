import sql from "./database.js";

export async function getPublishedJobById(
  jobId
) {
  const rows = await sql`
    select
      id,
      title,
      published,
      status
    from public.jobs
    where id = ${jobId}
      and published = true
    limit 1
  `;

  return rows[0] || null;
}

export async function createCareersApplication({
  jobId,
  roleTitle,
  fullName,
  email,
  phone,
  linkedin,
  message,
  cvBucket,
  cvPath,
  cvOriginalName,
  cvMimeType,
  cvSizeBytes,
}) {
  const rows = await sql`
    insert into
      public.careers_applications (
        job_id,
        role_title,
        full_name,
        email,
        phone,
        linkedin_url,
        message,
        cv_bucket,
        cv_path,
        cv_original_name,
        cv_mime_type,
        cv_size_bytes
      )
    values (
      ${jobId},
      ${roleTitle},
      ${fullName},
      ${email},
      ${phone},
      ${linkedin},
      ${message},
      ${cvBucket},
      ${cvPath},
      ${cvOriginalName},
      ${cvMimeType},
      ${cvSizeBytes}
    )
    returning
      id,
      job_id,
      role_title,
      full_name,
      email,
      phone,
      linkedin_url,
      message,
      cv_original_name,
      status,
      submitted_at
  `;

  return rows[0];
}

export async function markApplicationEmailSent(
  applicationId
) {
  await sql`
    update public.careers_applications
    set email_notification_sent = true
    where id = ${applicationId}
  `;
}
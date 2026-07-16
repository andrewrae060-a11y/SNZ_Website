import sql from "./database.js";

function normaliseScreeningResponses(
  value
) {
  if (!Array.isArray(value)) {
    return [];
  }

  return value
    .map((item) => {
      const question = String(
        item?.question || ""
      ).trim();

      const answer = String(
        item?.answer || ""
      ).trim();

      const answerType =
        item?.answerType === "text"
          ? "text"
          : "yes_no";

      if (!question || !answer) {
        return null;
      }

      return {
        question,
        answerType,
        answer,
      };
    })
    .filter(Boolean)
    .slice(0, 3);
}

export async function getPublishedJobById(
  jobId
) {
  const rows = await sql`
    select
      id,
      title,
      published,
      status,
      screening_questions
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
  screeningResponses = [],
  cvBucket,
  cvPath,
  cvOriginalName,
  cvMimeType,
  cvSizeBytes,
}) {
  const safeScreeningResponses =
  normaliseScreeningResponses(
    screeningResponses
  );

  console.log(
    "Creating careers application:",
    {
      jobId,
      roleTitle,
      fullName,
      screeningResponses:
        safeScreeningResponses,
    }
  );

  try {
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
          screening_responses,
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
        ${phone || null},
        ${linkedin || null},
        ${message || null},
        ${sql.json(
          safeScreeningResponses
        )},
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
        screening_responses,
        cv_original_name,
        status,
        submitted_at
    `;

    return rows[0] || null;
  } catch (error) {
    console.error(
      "Careers application insert failed:",
      {
        message: error?.message,
        code: error?.code,
        detail: error?.detail,
        hint: error?.hint,
        column: error?.column,
        table: error?.table,
        constraint:
          error?.constraint,
      }
    );

    throw error;
  }
}

export async function markApplicationEmailSent(
  applicationId
) {
  await sql`
    update
      public.careers_applications
    set
      email_notification_sent = true
    where
      id = ${applicationId}
  `;
}
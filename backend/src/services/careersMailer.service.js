import path from "node:path";
import { fileURLToPath } from "node:url";
import nodemailer from "nodemailer";

const currentFilePath =
  fileURLToPath(import.meta.url);

const currentDirectory =
  path.dirname(currentFilePath);

const emailLogoPath = path.resolve(
  currentDirectory,
  "../assets/snz-email-logo.png"
);

const emailLogoCid =
  "snz-email-logo";

function booleanFromEnvironment(
  value
) {
  return (
    String(value).toLowerCase() ===
    "true"
  );
}

function createTransporter() {
  const host =
    process.env.SMTP_HOST?.trim();

  const port = Number(
    process.env.SMTP_PORT || 587
  );

  const user =
    process.env.SMTP_USER?.trim();

  const pass =
    process.env.SMTP_PASS;

  if (
    !host ||
    !user ||
    !pass
  ) {
    throw new Error(
      "SMTP settings are incomplete."
    );
  }

  return nodemailer.createTransport({
    host,
    port,

    secure:
      booleanFromEnvironment(
        process.env.SMTP_SECURE
      ),

    auth: {
      user,
      pass,
    },
  });
}

function escapeHtml(value) {
  return String(value || "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function normaliseScreeningResponses(
  application
) {
  let responses =
    application
      ?.screening_responses ??
    application
      ?.screeningResponses ??
    [];

  /*
   * PostgreSQL or the database driver may
   * return JSONB as a JSON string. Parse it
   * before checking whether it is an array.
   */
  for (
    let attempt = 0;
    attempt < 2;
    attempt += 1
  ) {
    if (
      typeof responses !==
      "string"
    ) {
      break;
    }

    try {
      responses =
        JSON.parse(responses);
    } catch (error) {
      console.error(
        "Could not parse screening responses for email:",
        error
      );

      return [];
    }
  }

  if (!Array.isArray(responses)) {
    return [];
  }

  return responses
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

      if (
        !question ||
        !answer
      ) {
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

function createScreeningText(
  screeningResponses
) {
  if (
    screeningResponses.length === 0
  ) {
    return [
      "Screening question responses:",
      "No screening responses provided.",
    ].join("\n");
  }

  return [
    "Screening question responses:",
    "",
    ...screeningResponses.flatMap(
      (response, index) => [
        `${index + 1}. ${response.question}`,
        `Answer: ${response.answer}`,
        "",
      ]
    ),
  ].join("\n");
}

function createScreeningHtml(
  screeningResponses
) {
  if (
    screeningResponses.length === 0
  ) {
    return `
      <h3
        style="
          margin-top:24px;
          color:#07133c;
        "
      >
        Screening question responses
      </h3>

      <p>
        No screening responses provided.
      </p>
    `;
  }

  const responseCards =
    screeningResponses
      .map(
        (
          response,
          index
        ) => `
          <div
            style="
              margin:0 0 14px;
              padding:16px;
              border:1px solid #ddd6fe;
              border-radius:12px;
              background:#f5f3ff;
            "
          >
            <p
              style="
                margin:0 0 8px;
                font-weight:bold;
                color:#07133c;
              "
            >
              ${index + 1}.
              ${escapeHtml(
                response.question
              )}
            </p>

            <p
              style="
                margin:0;
                white-space:pre-wrap;
              "
            >
              <strong>Answer:</strong>
              ${escapeHtml(
                response.answer
              )}
            </p>
          </div>
        `
      )
      .join("");

  return `
    <h3
      style="
        margin-top:24px;
        color:#07133c;
      "
    >
      Screening question responses
    </h3>

    ${responseCards}
  `;
}

export async function sendCareersApplicationEmail({
  application,
  signedCvUrl,
}) {
  const transporter =
    createTransporter();

  const recipient =
    process.env
      .CAREERS_APPLICATION_EMAIL
      ?.trim() ||
    "careers@smartnetzero.co.uk";

  const from =
    process.env.MAIL_FROM?.trim() ||
    recipient;

  const roleTitle =
    application?.role_title ||
    application?.roleTitle ||
    "Unknown role";

  const fullName =
    application?.full_name ||
    application?.fullName ||
    "Unknown applicant";

  const email =
    application?.email || "";

  const phone =
    application?.phone ||
    "Not provided";

  const linkedin =
    application?.linkedin_url ||
    application?.linkedin ||
    "Not provided";

  const message =
    application?.message ||
    "No message provided.";

  const applicationId =
    application?.id ||
    "Not available";

  const screeningResponses =
    normaliseScreeningResponses(
      application
    );

  const screeningText =
    createScreeningText(
      screeningResponses
    );

  const screeningHtml =
    createScreeningHtml(
      screeningResponses
    );

  const subject =
    `New application: ${roleTitle}`;

  const text = [
    "A new careers application has been received.",
    "",
    `Role: ${roleTitle}`,
    `Name: ${fullName}`,
    `Email: ${email}`,
    `Phone: ${phone}`,
    `LinkedIn: ${linkedin}`,
    "",
    "Candidate message:",
    message,
    "",
    screeningText,
    "",
    `CV: ${signedCvUrl}`,
    "",
    `Application ID: ${applicationId}`,
  ].join("\n");

  const html = `
    <div
      style="
        font-family:Arial,sans-serif;
        line-height:1.6;
        color:#172033;
      "
    >
      <h2
        style="
          color:#07133c;
        "
      >
        New careers application
      </h2>

      <table
        cellpadding="8"
        cellspacing="0"
        style="
          border-collapse:collapse;
          width:100%;
          max-width:680px;
        "
      >
        <tr>
          <td
            style="
              font-weight:bold;
            "
          >
            Role
          </td>

          <td>
            ${escapeHtml(
              roleTitle
            )}
          </td>
        </tr>

        <tr>
          <td
            style="
              font-weight:bold;
            "
          >
            Name
          </td>

          <td>
            ${escapeHtml(
              fullName
            )}
          </td>
        </tr>

        <tr>
          <td
            style="
              font-weight:bold;
            "
          >
            Email
          </td>

          <td>
            ${
              email
                ? `
                  <a
                    href="mailto:${escapeHtml(
                      email
                    )}"
                  >
                    ${escapeHtml(
                      email
                    )}
                  </a>
                `
                : "Not provided"
            }
          </td>
        </tr>

        <tr>
          <td
            style="
              font-weight:bold;
            "
          >
            Phone
          </td>

          <td>
            ${escapeHtml(
              phone
            )}
          </td>
        </tr>

        <tr>
          <td
            style="
              font-weight:bold;
            "
          >
            LinkedIn
          </td>

          <td>
            ${
              linkedin !==
              "Not provided"
                ? `
                  <a
                    href="${escapeHtml(
                      linkedin
                    )}"
                  >
                    ${escapeHtml(
                      linkedin
                    )}
                  </a>
                `
                : "Not provided"
            }
          </td>
        </tr>
      </table>

      <h3
        style="
          margin-top:24px;
          color:#07133c;
        "
      >
        Candidate message
      </h3>

      <p
        style="
          white-space:pre-wrap;
        "
      >
        ${escapeHtml(
          message
        )}
      </p>

      ${screeningHtml}

      <p
        style="
          margin-top:24px;
        "
      >
        <a
          href="${escapeHtml(
            signedCvUrl
          )}"
          style="
            display:inline-block;
            background:#07133c;
            color:#ffffff;
            padding:12px 18px;
            border-radius:10px;
            text-decoration:none;
            font-weight:bold;
          "
        >
          Open candidate CV
        </a>
      </p>

      <p
        style="
          font-size:12px;
          color:#64748b;
        "
      >
        This secure CV link is temporary.
      </p>

      <p
        style="
          font-size:12px;
          color:#64748b;
        "
      >
        Application ID:
        ${escapeHtml(
          applicationId
        )}
      </p>
    </div>
  `;

  await transporter.sendMail({
    from,
    to: recipient,

    replyTo:
      email || undefined,

    subject,
    text,
    html,

    attachments: [
      {
        filename: "snz-email-logo.png",
        path: emailLogoPath,
        cid: emailLogoCid,
      },
    ],
  });
  }

export async function sendCareersDeclineEmail({
  application,
}) {
  const transporter =
    createTransporter();

  const applicantName = String(
    application?.full_name ||
      application?.fullName ||
      "Applicant"
  ).trim();

  const applicantEmail = String(
    application?.email || ""
  ).trim();

  const roleTitle = String(
    application?.role_title ||
      application?.roleTitle ||
      "the position"
  ).trim();

  if (!applicantEmail) {
    throw new Error(
      "The applicant email address is missing."
    );
  }

  const from =
    process.env.MAIL_FROM?.trim() ||
    process.env.SMTP_USER?.trim() ||
    "careers@smartnetzero.co.uk";

  const subject =
    `Your application for ${roleTitle} – Smart Net Zero`;

  const text = [
    `Dear ${applicantName},`,
    "",
    `Thank you for taking the time to apply for the ${roleTitle} position at Smart Net Zero.`,
    "",
    "After careful consideration, we are sorry to let you know that your application has not been successful on this occasion.",
    "",
    "We appreciate your interest in Smart Net Zero and the time you invested in your application.",
    "",
    "We wish you every success in your job search and future career.",
    "",
    "Kind regards,",
    "Smart Net Zero Careers Team",
  ].join("\n");

  const html = `
    <!doctype html>
    <html lang="en">
      <body
        style="
          margin:0;
          padding:0;
          background:#f1f5f9;
          font-family:Arial,sans-serif;
          color:#172033;
        "
      >
        <table
          role="presentation"
          width="100%"
          cellpadding="0"
          cellspacing="0"
          style="
            width:100%;
            background:#f1f5f9;
            padding:32px 16px;
          "
        >
          <tr>
            <td align="center">
              <table
                role="presentation"
                width="100%"
                cellpadding="0"
                cellspacing="0"
                style="
                  width:100%;
                  max-width:640px;
                  background:#ffffff;
                  border-radius:20px;
                  overflow:hidden;
                "
              >
                <tr>
                 <td
                    style="
                      background:#07133c;
                      padding:28px 32px;
                      color:#ffffff;
                    "
                  >
                    <img
                      src="cid:snz-email-logo"
                      alt="Smart Net Zero"
                      style="
                        display:block;
                        width:56px;
                        height:auto;
                        margin:0 0 14px;
                      "
                    />

                    <h1
                      style="
                        margin:0;
                        font-size:24px;
                        line-height:1.2;
                        color:#ffffff;
                      "
                    >
                      Smart Net Zero
                    </h1>

                    <p
                      style="
                        margin:8px 0 0;
                        color:#bae6fd;
                        font-size:14px;
                        font-weight:bold;
                      "
                    >
                      Careers Team
                    </p>
                  </td>
                </tr>

                <tr>
                  <td
                    style="
                      padding:32px;
                    "
                  >
                    <p
                      style="
                        margin:0 0 20px;
                        font-size:16px;
                        line-height:1.7;
                      "
                    >
                      Dear ${escapeHtml(
                        applicantName
                      )},
                    </p>

                    <p
                      style="
                        margin:0 0 20px;
                        font-size:16px;
                        line-height:1.7;
                      "
                    >
                      Thank you for taking the time to apply for the
                      <strong>
                        ${escapeHtml(
                          roleTitle
                        )}
                      </strong>
                      position at Smart Net Zero.
                    </p>

                    <p
                      style="
                        margin:0 0 20px;
                        font-size:16px;
                        line-height:1.7;
                      "
                    >
                      After careful consideration, we are sorry to let you know
                      that your application has not been successful on this
                      occasion.
                    </p>

                    <p
                      style="
                        margin:0 0 20px;
                        font-size:16px;
                        line-height:1.7;
                      "
                    >
                      We appreciate your interest in Smart Net Zero and the time
                      you invested in your application.
                    </p>

                    <p
                      style="
                        margin:0 0 20px;
                        font-size:16px;
                        line-height:1.7;
                      "
                    >
                      We wish you every success in your job search and future
                      career.
                    </p>

                    <p
                      style="
                        margin:28px 0 0;
                        font-size:16px;
                        line-height:1.7;
                      "
                    >
                      Kind regards,<br />

                      <strong>
                        Smart Net Zero Careers Team
                      </strong>
                    </p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
        </table>
      </body>
    </html>
  `;

  await transporter.sendMail({
    from,
    to: applicantEmail,
    replyTo: from,
    subject,
    text,
    html,

    attachments: [
      {
        filename: "snz-email-logo.png",
        path: emailLogoPath,
        cid: emailLogoCid,
      },
    ],
  });

  return {
    sent: true,
    recipient: applicantEmail,
  };
}
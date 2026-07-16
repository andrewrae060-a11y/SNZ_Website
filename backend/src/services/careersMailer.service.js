import nodemailer from "nodemailer";

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
  const responses =
    application
      ?.screening_responses ??
    application
      ?.screeningResponses ??
    [];

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
  });
}
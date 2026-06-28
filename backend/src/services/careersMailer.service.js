import nodemailer from "nodemailer";

function booleanFromEnvironment(value) {
  return String(value).toLowerCase() ===
    "true";
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

  if (!host || !user || !pass) {
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

  const subject =
    `New application: ${application.role_title}`;

  const text = [
    "A new careers application has been received.",
    "",
    `Role: ${application.role_title}`,
    `Name: ${application.full_name}`,
    `Email: ${application.email}`,
    `Phone: ${application.phone || "Not provided"}`,
    `LinkedIn: ${application.linkedin_url || "Not provided"}`,
    "",
    "Candidate message:",
    application.message ||
      "No message provided.",
    "",
    `CV: ${signedCvUrl}`,
    "",
    `Application ID: ${application.id}`,
  ].join("\n");

  const html = `
    <div style="font-family:Arial,sans-serif;line-height:1.6;color:#172033;">
      <h2 style="color:#07133c;">
        New careers application
      </h2>

      <table
        cellpadding="8"
        cellspacing="0"
        style="border-collapse:collapse;width:100%;max-width:680px;"
      >
        <tr>
          <td style="font-weight:bold;">Role</td>
          <td>${escapeHtml(application.role_title)}</td>
        </tr>

        <tr>
          <td style="font-weight:bold;">Name</td>
          <td>${escapeHtml(application.full_name)}</td>
        </tr>

        <tr>
          <td style="font-weight:bold;">Email</td>
          <td>
            <a href="mailto:${escapeHtml(application.email)}">
              ${escapeHtml(application.email)}
            </a>
          </td>
        </tr>

        <tr>
          <td style="font-weight:bold;">Phone</td>
          <td>${escapeHtml(application.phone || "Not provided")}</td>
        </tr>

        <tr>
          <td style="font-weight:bold;">LinkedIn</td>
          <td>
            ${
              application.linkedin_url
                ? `<a href="${escapeHtml(application.linkedin_url)}">
                    ${escapeHtml(application.linkedin_url)}
                  </a>`
                : "Not provided"
            }
          </td>
        </tr>
      </table>

      <h3 style="margin-top:24px;color:#07133c;">
        Candidate message
      </h3>

      <p style="white-space:pre-wrap;">
        ${escapeHtml(
          application.message ||
            "No message provided."
        )}
      </p>

      <p style="margin-top:24px;">
        <a
          href="${escapeHtml(signedCvUrl)}"
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

      <p style="font-size:12px;color:#64748b;">
        This secure CV link is temporary.
      </p>

      <p style="font-size:12px;color:#64748b;">
        Application ID:
        ${escapeHtml(application.id)}
      </p>
    </div>
  `;

  await transporter.sendMail({
    from,
    to: recipient,
    replyTo: application.email,
    subject,
    text,
    html,
  });
}
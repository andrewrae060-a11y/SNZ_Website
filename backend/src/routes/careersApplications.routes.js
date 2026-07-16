import {
  Router,
} from "express";

import multer from "multer";

import {
  randomUUID,
} from "node:crypto";

import path from "node:path";

import supabaseAdmin from
  "../services/supabaseAdmin.service.js";

import {
  sendCareersApplicationEmail,
} from
  "../services/careersMailer.service.js";

import requireCareersAdmin from
  "../middleware/requireCareersAdmin.js";

import {
  createCareersApplication,
  getCareersApplications,
  getPublishedJobById,
  markApplicationEmailSent,
} from
  "../careersApplicationRepository.js";

const router = Router();

const allowedMimeTypes = new Set([
  "application/pdf",

  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
]);

const maximumFileSizeMb =
  Number(
    process.env
      .CAREERS_MAX_CV_SIZE_MB
  ) || 4;

const maximumFileSizeBytes =
  maximumFileSizeMb *
  1024 *
  1024;

const upload = multer({
  storage:
    multer.memoryStorage(),

  limits: {
    fileSize:
      maximumFileSizeBytes,

    files: 1,

    fields: 10,
  },

  fileFilter: (
    _req,
    file,
    callback
  ) => {
    if (
      !allowedMimeTypes.has(
        file.mimetype
      )
    ) {
      return callback(
        new Error(
          "CV must be a PDF or DOCX file."
        )
      );
    }

    return callback(
      null,
      true
    );
  },
});

function cleanText(
  value,
  maximumLength = 1000
) {
  return String(
    value || ""
  )
    .trim()
    .slice(
      0,
      maximumLength
    );
}

function normaliseEmail(
  value
) {
  return cleanText(
    value,
    320
  ).toLowerCase();
}

function emailLooksValid(
  email
) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(
    email
  );
}

/*
 * Screening responses arrive as a JSON
 * string because the application form uses
 * multipart FormData.
 */
function parseScreeningResponses(
  value
) {
  if (!value) {
    return [];
  }

  try {
    const parsed =
      typeof value === "string"
        ? JSON.parse(value)
        : value;

    if (
      !Array.isArray(parsed)
    ) {
      return [];
    }

    return parsed
      .map((item) => {
        const question =
          cleanText(
            item?.question,
            1000
          );

        const answer =
          cleanText(
            item?.answer,
            2000
          );

        const answerType =
          item?.answerType ===
          "text"
            ? "text"
            : "yes_no";

        if (
          !question ||
          !answer
        ) {
          return null;
        }

        if (
          answerType ===
            "yes_no" &&
          answer !== "Yes" &&
          answer !== "No"
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
  } catch (error) {
    console.error(
      "Screening responses could not be parsed:",
      error
    );

    return [];
  }
}

/*
 * Older database rows may contain JSON that
 * has been serialised more than once. Parse
 * string values up to two times.
 */
function parseStoredScreeningResponses(
  value
) {
  let responses = value;

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
        "Stored screening responses could not be parsed:",
        error
      );

      return [];
    }
  }

  if (
    !Array.isArray(responses)
  ) {
    return [];
  }

  return responses
    .map((item) => {
      const question =
        cleanText(
          item?.question,
          1000
        );

      const answer =
        cleanText(
          item?.answer,
          2000
        );

      const answerType =
        item?.answerType ===
        "text"
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

function safeFileExtension(
  file
) {
  const extension =
    path
      .extname(
        file.originalname
      )
      .toLowerCase();

  if (
    extension === ".pdf" ||
    extension === ".docx"
  ) {
    return extension;
  }

  return file.mimetype ===
    "application/pdf"
    ? ".pdf"
    : ".docx";
}

function sanitiseFilename(
  value
) {
  return String(
    value || "cv"
  )
    .replace(
      /[^a-zA-Z0-9._-]/g,
      "-"
    )
    .replace(
      /-+/g,
      "-"
    )
    .slice(
      0,
      100
    );
}

/*
 * Admin-only application list.
 *
 * Final endpoint:
 * GET /api/careers/applications
 */
router.get(
  "/applications",

  requireCareersAdmin,

  async (
    _req,
    res,
    next
  ) => {
    try {
      const applications =
        await getCareersApplications();

      const applicationsWithCvLinks =
        await Promise.all(
          applications.map(
            async (
              application
            ) => {
              let cvUrl = null;

              if (
                application
                  .cv_bucket &&
                application
                  .cv_path
              ) {
                const signedUrlResult =
                  await supabaseAdmin
                    .storage
                    .from(
                      application
                        .cv_bucket
                    )
                    .createSignedUrl(
                      application
                        .cv_path,

                      60 * 60
                    );

                if (
                  signedUrlResult
                    .error
                ) {
                  console.error(
                    "Could not create candidate CV link:",
                    {
                      applicationId:
                        application.id,

                      error:
                        signedUrlResult
                          .error,
                    }
                  );
                } else {
                  cvUrl =
                    signedUrlResult
                      .data
                      .signedUrl;
                }
              }

              return {
                id:
                  application.id,

                jobId:
                  application
                    .job_id,

                roleTitle:
                  application
                    .role_title,

                fullName:
                  application
                    .full_name,

                email:
                  application.email,

                phone:
                  application.phone ||
                  "",

                linkedin:
                  application
                    .linkedin_url ||
                  "",

                message:
                  application.message ||
                  "",

                screeningResponses:
                  parseStoredScreeningResponses(
                    application
                      .screening_responses
                  ),

                cvOriginalName:
                  application
                    .cv_original_name ||
                  "Candidate CV",

                cvMimeType:
                  application
                    .cv_mime_type ||
                  "",

                cvSizeBytes:
                  Number(
                    application
                      .cv_size_bytes ||
                    0
                  ),

                cvUrl,

                status:
                  application.status ||
                  "Received",

                emailNotificationSent:
                  application
                    .email_notification_sent ===
                  true,

                submittedAt:
                  application
                    .submitted_at,
              };
            }
          )
        );

      return res
        .status(200)
        .json(
          applicationsWithCvLinks
        );
    } catch (error) {
      return next(error);
    }
  }
);

/*
 * Public job application endpoint.
 *
 * Final endpoint:
 * POST /api/careers/apply
 */
router.post(
  "/apply",

  upload.single("cv"),

  async (
    req,
    res,
    next
  ) => {
    let uploadedCv = null;

    try {
      const fullName =
        cleanText(
          req.body?.fullName,
          200
        );

      const email =
        normaliseEmail(
          req.body?.email
        );

      const phone =
        cleanText(
          req.body?.phone,
          100
        );

      const jobId =
        cleanText(
          req.body?.roleId,
          100
        );

      const submittedRoleTitle =
        cleanText(
          req.body
            ?.roleTitle,
          300
        );

      const linkedin =
        cleanText(
          req.body?.linkedin,
          500
        );

      const message =
        cleanText(
          req.body?.message,
          5000
        );

      const screeningResponses =
        parseScreeningResponses(
          req.body
            ?.screeningResponses
        );

      if (
        !fullName ||
        !email ||
        !jobId
      ) {
        return res
          .status(400)
          .json({
            success: false,

            message:
              "Name, email and role are required.",
          });
      }

      if (
        !emailLooksValid(
          email
        )
      ) {
        return res
          .status(400)
          .json({
            success: false,

            message:
              "Please enter a valid email address.",
          });
      }

      if (!req.file) {
        return res
          .status(400)
          .json({
            success: false,

            message:
              "Please upload your CV as a PDF or DOCX file.",
          });
      }

      const job =
        await getPublishedJobById(
          jobId
        );

      if (!job) {
        return res
          .status(400)
          .json({
            success: false,

            message:
              "The selected role is no longer available.",
          });
      }

      if (
        job.status
          ?.toLowerCase() ===
        "closed"
      ) {
        return res
          .status(400)
          .json({
            success: false,

            message:
              "Applications for this role are now closed.",
          });
      }

      /*
       * Never trust the role title supplied
       * by the browser. Use the title stored
       * against the published vacancy.
       */
      const roleTitle =
        job.title ||
        submittedRoleTitle;

      /*
       * If the vacancy has screening
       * questions, require the same number
       * of completed responses.
       */
      const jobScreeningQuestions =
        Array.isArray(
          job.screening_questions
        )
          ? job.screening_questions
          : [];

      const expectedScreeningCount =
        jobScreeningQuestions
          .filter((item) => {
            if (
              typeof item ===
              "string"
            ) {
              return Boolean(
                item.trim()
              );
            }

            return Boolean(
              String(
                item
                  ?.question ||
                  ""
              ).trim()
            );
          })
          .slice(0, 3)
          .length;

      if (
        expectedScreeningCount >
          0 &&
        screeningResponses.length !==
          expectedScreeningCount
      ) {
        return res
          .status(400)
          .json({
            success: false,

            message:
              "Please answer all screening questions before submitting your application.",
          });
      }

      const bucket =
        process.env
          .CAREERS_CV_BUCKET
          ?.trim() ||
        "careers-cvs";

      const applicationFolder =
        randomUUID();

      const extension =
        safeFileExtension(
          req.file
        );

      const originalBaseName =
        sanitiseFilename(
          path.basename(
            req.file
              .originalname,

            path.extname(
              req.file
                .originalname
            )
          )
        );

      const storagePath = [
        new Date()
          .toISOString()
          .slice(0, 10),

        applicationFolder,

        `${originalBaseName}${extension}`,
      ].join("/");

      const uploadResult =
        await supabaseAdmin
          .storage
          .from(bucket)
          .upload(
            storagePath,

            req.file.buffer,

            {
              contentType:
                req.file
                  .mimetype,

              upsert: false,

              cacheControl:
                "3600",
            }
          );

      if (
        uploadResult.error
      ) {
        throw uploadResult.error;
      }

      uploadedCv = {
        bucket,

        path:
          storagePath,
      };

      const application =
        await createCareersApplication({
          jobId:
            job.id,

          roleTitle,

          fullName,

          email,

          phone,

          linkedin,

          message,

          screeningResponses,

          cvBucket:
            bucket,

          cvPath:
            storagePath,

          cvOriginalName:
            req.file
              .originalname,

          cvMimeType:
            req.file
              .mimetype,

          cvSizeBytes:
            req.file
              .size,
        });

      const signedUrlResult =
        await supabaseAdmin
          .storage
          .from(bucket)
          .createSignedUrl(
            storagePath,

            60 *
              60 *
              24
          );

      if (
        signedUrlResult.error
      ) {
        throw signedUrlResult.error;
      }

      let emailSent = false;

      try {
        await sendCareersApplicationEmail({
          application,

          signedCvUrl:
            signedUrlResult
              .data
              .signedUrl,
        });

        emailSent = true;

        await markApplicationEmailSent(
          application.id
        );
      } catch (
        emailError
      ) {
        /*
         * The application is already stored.
         * Do not tell the candidate their
         * submission failed solely because
         * the notification email failed.
         */
        console.error(
          "Careers notification email failed:",
          emailError
        );
      }

      return res
        .status(201)
        .json({
          success: true,

          message:
            "Your application has been sent. Thank you for applying to Smart Net Zero.",

          applicationId:
            application.id,

          emailNotificationSent:
            emailSent,
        });
    } catch (error) {
      /*
       * Remove the uploaded CV if a later
       * database operation fails.
       */
      if (uploadedCv) {
        try {
          const removalResult =
            await supabaseAdmin
              .storage
              .from(
                uploadedCv
                  .bucket
              )
              .remove([
                uploadedCv
                  .path,
              ]);

          if (
            removalResult.error
          ) {
            console.error(
              "Could not remove incomplete CV upload:",
              removalResult.error
            );
          }
        } catch (
          cleanupError
        ) {
          console.error(
            "Could not remove incomplete CV upload:",
            cleanupError
          );
        }
      }

      return next(error);
    }
  }
);

/*
 * Convert Multer errors into useful
 * API responses.
 */
router.use(
  (
    error,
    _req,
    res,
    next
  ) => {
    if (
      error instanceof
      multer.MulterError
    ) {
      if (
        error.code ===
        "LIMIT_FILE_SIZE"
      ) {
        return res
          .status(413)
          .json({
            success: false,

            message:
              `CV must be smaller than ${maximumFileSizeMb}MB.`,
          });
      }

      if (
        error.code ===
        "LIMIT_FIELD_COUNT"
      ) {
        return res
          .status(400)
          .json({
            success: false,

            message:
              "The application contains too many form fields.",
          });
      }

      return res
        .status(400)
        .json({
          success: false,

          message:
            "The CV upload could not be processed.",
        });
    }

    if (
      error?.message ===
      "CV must be a PDF or DOCX file."
    ) {
      return res
        .status(400)
        .json({
          success: false,

          message:
            error.message,
        });
    }

    return next(error);
  }
);

export default router;
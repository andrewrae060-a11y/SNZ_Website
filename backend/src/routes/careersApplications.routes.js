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

import {
  createCareersApplication,
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

    /*
     * The application form currently
     * submits fewer than 10 multipart
     * text fields.
     */
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
 * screeningResponses arrives as a
 * JSON string because the application
 * form uses multipart FormData.
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

        /*
         * Enforce valid values for
         * yes/no questions.
         */
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
          job.screeningQuestions
        )
          ? job.screeningQuestions
          : Array.isArray(
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

      /*
       * screeningResponses must be accepted
       * by createCareersApplication and
       * mapped to screening_responses in
       * Supabase.
       */
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
        /*
         * The application object returned
         * by the repository should include
         * screeningResponses or
         * screening_responses.
         */
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
         * The application is already safely
         * stored, so do not tell the candidate
         * their complete submission failed
         * solely because the notification
         * email could not be sent.
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
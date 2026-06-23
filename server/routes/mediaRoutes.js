import express from "express";
import multer from "multer";
import crypto from "node:crypto";
import fs from "node:fs";
import path from "node:path";

import {
  requireAdministrator,
} from "../auth.js";

const router = express.Router();

const uploadDirectory =
  process.env.CMS_UPLOAD_DIR ||
  "./uploads";

fs.mkdirSync(
  uploadDirectory,
  {
    recursive: true,
  }
);

const allowedMimeTypes =
  new Set([
    "image/jpeg",
    "image/png",
    "image/webp",
    "image/gif",
    "video/mp4",
    "video/webm",
  ]);

function getExtension(
  filename,
  mimeType
) {
  const suppliedExtension =
    path
      .extname(filename || "")
      .toLowerCase();

  if (suppliedExtension) {
    return suppliedExtension;
  }

  const extensions = {
    "image/jpeg": ".jpg",
    "image/png": ".png",
    "image/webp": ".webp",
    "image/gif": ".gif",
    "video/mp4": ".mp4",
    "video/webm": ".webm",
  };

  return extensions[mimeType] || "";
}

const storage =
  multer.diskStorage({
    destination: (
      _req,
      _file,
      callback
    ) => {
      callback(
        null,
        uploadDirectory
      );
    },

    filename: (
      _req,
      file,
      callback
    ) => {
      const extension =
        getExtension(
          file.originalname,
          file.mimetype
        );

      const filename =
        `${Date.now()}-${crypto.randomUUID()}${extension}`;

      callback(
        null,
        filename
      );
    },
  });

const upload = multer({
  storage,

  limits: {
    fileSize:
      100 * 1024 * 1024,
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
      callback(
        new Error(
          "Only JPEG, PNG, WebP, GIF, MP4 and WebM files are supported."
        )
      );

      return;
    }

    callback(null, true);
  },
});

router.post(
  "/admin/media/upload",
  requireAdministrator,
  upload.single("file"),
  (req, res) => {
    if (!req.file) {
      return res
        .status(400)
        .json({
          message:
            "Select an image or video to upload.",
        });
    }

    const isVideo =
      req.file.mimetype.startsWith(
        "video/"
      );

    const maximumSize =
      isVideo
        ? 100 * 1024 * 1024
        : 10 * 1024 * 1024;

    if (
      req.file.size >
      maximumSize
    ) {
      fs.unlink(
        req.file.path,
        () => {}
      );

      return res
        .status(400)
        .json({
          message:
            `The maximum file size is ${
              isVideo ? 100 : 10
            } MB.`,
        });
    }

    const baseUrl =
      process.env.API_PUBLIC_URL ||
      `http://localhost:${
        process.env.PORT ||
        5000
      }`;

    const publicUrl =
      `${baseUrl.replace(
        /\/+$/,
        ""
      )}/uploads/${
        req.file.filename
      }`;

    return res
      .status(201)
      .json({
        asset: {
          id:
            req.file.filename,

          storageKey:
            req.file.filename,

          url:
            publicUrl,

          originalName:
            req.file.originalname,

          mimeType:
            req.file.mimetype,

          sizeBytes:
            req.file.size,

          altText: "",
        },
      });
  }
);

export default router;
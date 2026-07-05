import express from "express";
import multer from "multer";
import crypto from "node:crypto";
import path from "node:path";
import { createClient } from "@supabase/supabase-js";

import { requireAdmin } from "../middleware/requireAdmin.js";

const router = express.Router();

const bucketName =
  process.env.SUPABASE_STORAGE_BUCKET ||
  "cms-media";

const supabaseUrl =
  process.env.SUPABASE_URL;

const supabaseServiceRoleKey =
  process.env.SUPABASE_SERVICE_ROLE_KEY;

const supabase =
  supabaseUrl && supabaseServiceRoleKey
    ? createClient(
        supabaseUrl,
        supabaseServiceRoleKey,
        {
          auth: {
            persistSession: false,
            autoRefreshToken: false,
          },
        }
      )
    : null;

const allowedMimeTypes = new Set([
  "image/jpeg",
  "image/png",
  "image/webp",
  "image/gif",
  "video/mp4",
  "video/webm",
]);

function getExtension(filename, mimeType) {
  const suppliedExtension = path
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

function createStoragePath(file) {
  const extension = getExtension(
    file.originalname,
    file.mimetype
  );

  const now = new Date();

  const year = String(
    now.getUTCFullYear()
  );

  const month = String(
    now.getUTCMonth() + 1
  ).padStart(2, "0");

  const safeOriginalName = String(
    file.originalname || "upload"
  )
    .toLowerCase()
    .replace(/\.[^.]+$/, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 60);

  const filename = `${
    Date.now()
  }-${crypto.randomUUID()}-${
    safeOriginalName || "media"
  }${extension}`;

  return `cms/${year}/${month}/${filename}`;
}

const upload = multer({
  storage: multer.memoryStorage(),

  limits: {
    fileSize: 100 * 1024 * 1024,
  },

  fileFilter: (_req, file, callback) => {
    if (!allowedMimeTypes.has(file.mimetype)) {
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
  "/media/upload",
  requireAdmin,
  upload.single("file"),
  async (req, res, next) => {
    try {
      if (!supabase) {
        return res.status(500).json({
          success: false,
          message:
            "Supabase Storage is not configured. Check SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY.",
        });
      }

      if (!req.file) {
        return res.status(400).json({
          success: false,
          message:
            "Select an image or video to upload.",
        });
      }

      const isVideo =
        req.file.mimetype.startsWith(
          "video/"
        );

      const maximumSize = isVideo
        ? 100 * 1024 * 1024
        : 10 * 1024 * 1024;

      if (req.file.size > maximumSize) {
        return res.status(400).json({
          success: false,
          message: `The maximum file size is ${
            isVideo ? 100 : 10
          } MB.`,
        });
      }

      const storagePath =
        createStoragePath(req.file);

      const { data, error } =
        await supabase.storage
          .from(bucketName)
          .upload(
            storagePath,
            req.file.buffer,
            {
              contentType:
                req.file.mimetype,
              cacheControl:
                "31536000",
              upsert: false,
            }
          );

      if (error) {
        console.error(
          "Supabase media upload failed:",
          error
        );

        return res.status(500).json({
          success: false,
          message:
            "The file could not be uploaded to Supabase Storage.",
          error:
            process.env.NODE_ENV === "production"
              ? undefined
              : error.message,
        });
      }

      const publicUrlResult =
        supabase.storage
          .from(bucketName)
          .getPublicUrl(data.path);

      const publicUrl =
        publicUrlResult.data.publicUrl;

      return res.status(201).json({
        success: true,
        asset: {
          id: data.path,
          storageKey: data.path,
          url: publicUrl,
          originalName:
            req.file.originalname,
          mimeType:
            req.file.mimetype,
          sizeBytes:
            req.file.size,
          altText: "",
        },
      });
    } catch (error) {
      return next(error);
    }
  }
);

export default router;
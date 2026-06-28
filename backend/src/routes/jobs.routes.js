import { Router } from "express";

import requireCareersAdmin from
  "../middleware/requireCareersAdmin.js";

import {
  createJob,
  deleteJob,
  readAllJobs,
  readPublishedJobs,
  updateJob,
} from "../jobsRepository.js";

const router = Router();

function validateJob(req, res, next) {
  const {
    title,
    department,
    location,
    summary,
  } = req.body || {};

  if (
    !String(title || "").trim() ||
    !String(department || "").trim() ||
    !String(location || "").trim() ||
    !String(summary || "").trim()
  ) {
    return res.status(400).json({
      success: false,
      message:
        "Title, department, location and summary are required.",
    });
  }

  return next();
}

// Public: published jobs only.
router.get(
  "/",
  async (_req, res, next) => {
    try {
      const jobs =
        await readPublishedJobs();

      return res.status(200).json(jobs);
    } catch (error) {
      return next(error);
    }
  }
);

// Admin: drafts and published jobs.
router.get(
  "/admin",
  requireCareersAdmin,
  async (_req, res, next) => {
    try {
      const jobs =
        await readAllJobs();

      return res.status(200).json(jobs);
    } catch (error) {
      return next(error);
    }
  }
);

router.post(
  "/",
  requireCareersAdmin,
  validateJob,
  async (req, res, next) => {
    try {
      const job = await createJob(
        req.body,
        req.admin.id
      );

      return res.status(201).json(job);
    } catch (error) {
      return next(error);
    }
  }
);

router.put(
  "/:id",
  requireCareersAdmin,
  validateJob,
  async (req, res, next) => {
    try {
      const job = await updateJob(
        req.params.id,
        req.body,
        req.admin.id
      );

      if (!job) {
        return res.status(404).json({
          success: false,
          message:
            "The role could not be found.",
        });
      }

      return res.status(200).json(job);
    } catch (error) {
      return next(error);
    }
  }
);

router.delete(
  "/:id",
  requireCareersAdmin,
  async (req, res, next) => {
    try {
      const deleted =
        await deleteJob(
          req.params.id
        );

      if (!deleted) {
        return res.status(404).json({
          success: false,
          message:
            "The role could not be found.",
        });
      }

      return res.status(204).end();
    } catch (error) {
      return next(error);
    }
  }
);

export default router;
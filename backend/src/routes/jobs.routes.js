import { Router } from "express";

import requireCareersAdmin from
  "../middleware/requireCareersAdmin.js";

import { jobSchema } from
  "../../../server/jobSchema.js";

import {
  createJob,
  deleteJob,
  readAllJobs,
  readPublishedJobs,
  updateJob,
} from "../jobsRepository.js";

const router = Router();

function validateJob(req, res, next) {
  const validation =
    jobSchema.safeParse(req.body);

  if (!validation.success) {
    return res.status(400).json({
      success: false,
      message:
        "Please check the role details.",
      issues:
        validation.error.flatten(),
    });
  }

  req.validatedJob =
    validation.data;

  return next();
}

router.get(
  "/",
  async (_req, res, next) => {
    try {
      const jobs =
        await readPublishedJobs();

      return res
        .status(200)
        .json(jobs);
    } catch (error) {
      return next(error);
    }
  }
);

router.get(
  "/admin",
  requireCareersAdmin,
  async (_req, res, next) => {
    try {
      const jobs =
        await readAllJobs();

      return res
        .status(200)
        .json(jobs);
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
      const job =
        await createJob(
          req.validatedJob,
          req.admin.id
        );

      return res
        .status(201)
        .json(job);
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
      const job =
        await updateJob(
          req.params.id,
          req.validatedJob,
          req.admin.id
        );

      if (!job) {
        return res
          .status(404)
          .json({
            success: false,
            message:
              "The role could not be found.",
          });
      }

      return res
        .status(200)
        .json(job);
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
        return res
          .status(404)
          .json({
            success: false,
            message:
              "The role could not be found.",
          });
      }

      return res
        .status(204)
        .end();
    } catch (error) {
      return next(error);
    }
  }
);

export default router;
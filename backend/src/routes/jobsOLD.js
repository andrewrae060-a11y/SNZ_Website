import { Router } from "express";

import {
  createJob,
  deleteJob,
  readJobs,
  updateJob,
} from "../jobsRepository.js";

import requireCareersAdmin from "../middleware/requireCareersAdmin.js";

const router = Router();

router.get("/", async (_req, res, next) => {
  try {
    const jobs = await readJobs();

    return res.status(200).json(jobs);
  } catch (error) {
    return next(error);
  }
});

router.get(
  "/admin",
  requireCareersAdmin,
  async (_req, res, next) => {
    try {
      const jobs = await readJobs({
        includeDrafts: true,
      });

      return res.status(200).json(jobs);
    } catch (error) {
      return next(error);
    }
  }
);

router.post(
  "/",
  requireCareersAdmin,
  async (req, res, next) => {
    try {
      const job = await createJob(req.body);

      return res.status(201).json(job);
    } catch (error) {
      return next(error);
    }
  }
);

router.put(
  "/:id",
  requireCareersAdmin,
  async (req, res, next) => {
    try {
      const job = await updateJob(
        req.params.id,
        req.body
      );

      if (!job) {
        return res.status(404).json({
          success: false,
          message: "The role could not be found.",
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
      const deleted = await deleteJob(
        req.params.id
      );

      if (!deleted) {
        return res.status(404).json({
          success: false,
          message: "The role could not be found.",
        });
      }

      return res.status(204).end();
    } catch (error) {
      return next(error);
    }
  }
);

export default router;
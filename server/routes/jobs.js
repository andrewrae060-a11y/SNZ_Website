import { Router } from "express";
import { requireAdministrator } from "../auth.js";
import { jobSchema } from "../jobSchema.js";
import {
  createJob,
  deleteJob,
  readJobs,
  updateJob,
} from "../jobsStore.js";

const router = Router();

/*
 * Public endpoint.
 * Only published jobs are returned.
 */
router.get("/", async (_req, res, next) => {
  try {
    const jobs = await readJobs();

    res.json(jobs);
  } catch (error) {
    next(error);
  }
});

/*
 * Administrator endpoint.
 * Includes both published roles and drafts.
 */
router.get(
  "/admin",
  requireAdministrator,
  async (_req, res, next) => {
    try {
      const jobs = await readJobs({
        includeDrafts: true,
      });

      res.json(jobs);
    } catch (error) {
      next(error);
    }
  }
);

/*
 * Create a role.
 */
router.post(
  "/",
  requireAdministrator,
  async (req, res, next) => {
    try {
      const validation = jobSchema.safeParse(req.body);

      if (!validation.success) {
        return res.status(400).json({
          message: "Please check the role details.",
          issues: validation.error.flatten(),
        });
      }

      const job = await createJob(validation.data);

      res.status(201).json(job);
    } catch (error) {
      next(error);
    }
  }
);

/*
 * Update a role.
 */
router.put(
  "/:id",
  requireAdministrator,
  async (req, res, next) => {
    try {
      const validation = jobSchema.safeParse(req.body);

      if (!validation.success) {
        return res.status(400).json({
          message: "Please check the role details.",
          issues: validation.error.flatten(),
        });
      }

      const job = await updateJob(
        req.params.id,
        validation.data
      );

      if (!job) {
        return res.status(404).json({
          message: "The role could not be found.",
        });
      }

      res.json(job);
    } catch (error) {
      next(error);
    }
  }
);

/*
 * Delete a role.
 */
router.delete(
  "/:id",
  requireAdministrator,
  async (req, res, next) => {
    try {
      const removed = await deleteJob(req.params.id);

      if (!removed) {
        return res.status(404).json({
          message: "The role could not be found.",
        });
      }

      res.status(204).end();
    } catch (error) {
      next(error);
    }
  }
);

export default router;
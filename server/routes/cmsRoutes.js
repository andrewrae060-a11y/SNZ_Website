import express from "express";

import {
  requireAdministrator,
} from "../auth.js";

import {
  getPublishedContent,
  getAdminContent,
  createContentItem,
  updateContentItem,
  deleteContentItem,
  createSubscriber,
} from "../cms/db.js";

const router = express.Router();

router.get(
  "/content/test",
  (_req, res) => {
    res.json({
      status: "CMS router is working",
    });
  }
);

/*
 * GET /api/content/social-hub
 *
 * Public route used by the Social Media page.
 * Returns only published CMS content.
 */
router.get(
  "/content/social-hub",
  async (_req, res, next) => {
    try {
      const content =
        await getPublishedContent();

      res.json({
        content,
        generatedAt:
          new Date().toISOString(),
      });
    } catch (error) {
      next(error);
    }
  }
);

/*
 * POST /api/subscribers
 *
 * Public newsletter subscription route.
 */
router.post(
  "/subscribers",
  async (req, res, next) => {
    try {
      const {
        email = "",
        consent = false,
        source = "social-hub",
      } = req.body || {};

      const normalizedEmail =
        String(email)
          .trim()
          .toLowerCase();

      const emailIsValid =
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(
          normalizedEmail
        );

      if (!emailIsValid) {
        return res.status(400).json({
          message:
            "Please enter a valid email address.",
        });
      }

      if (consent !== true) {
        return res.status(400).json({
          message:
            "Consent is required before subscribing.",
        });
      }

      const subscriber =
        await createSubscriber({
          email: normalizedEmail,
          consent: true,
          source:
            String(source || "social-hub")
              .trim()
              .slice(0, 100),
        });

      res.status(201).json({
        message:
          "Subscription recorded.",
        subscriber,
      });
    } catch (error) {
      next(error);
    }
  }
);

/*
 * GET /api/admin/content
 *
 * Protected route.
 * Returns all CMS content, including drafts
 * and archived content.
 */
router.get(
  "/admin/content",
  requireAdministrator,
  async (_req, res, next) => {
    try {
      const content =
        await getAdminContent();

      res.json({
        content,
      });
    } catch (error) {
      next(error);
    }
  }
);

/*
 * POST /api/admin/content
 *
 * Protected route.
 * Creates a new CMS content item.
 */
router.post(
  "/admin/content",
  requireAdministrator,
  async (req, res, next) => {
    try {
      const {
        section = "",
        itemKey = "",
        status = "draft",
        sortOrder = 0,
        data = {},
      } = req.body || {};

      const normalizedSection =
        String(section).trim();

      const normalizedItemKey =
        String(itemKey)
          .trim()
          .toLowerCase();

      const allowedStatuses = [
        "draft",
        "published",
        "archived",
      ];

      if (!normalizedSection) {
        return res.status(400).json({
          message:
            "A content section is required.",
        });
      }

      if (
        !/^[a-z0-9-]+$/.test(
          normalizedItemKey
        )
      ) {
        return res.status(400).json({
          message:
            "The item key may contain only lowercase letters, numbers and hyphens.",
        });
      }

      if (
        !allowedStatuses.includes(status)
      ) {
        return res.status(400).json({
          message:
            "Status must be draft, published or archived.",
        });
      }

      if (
        !data ||
        typeof data !== "object" ||
        Array.isArray(data)
      ) {
        return res.status(400).json({
          message:
            "Content data must be a JSON object.",
        });
      }

      const item =
        await createContentItem({
          section: normalizedSection,
          itemKey:
            normalizedItemKey,
          status,
          sortOrder:
            Number.isFinite(
              Number(sortOrder)
            )
              ? Number(sortOrder)
              : 0,
          data,
          updatedBy:
            req.admin?.email ||
            "administrator",
        });

      res.status(201).json({
        item,
      });
    } catch (error) {
      next(error);
    }
  }
);

/*
 * PUT /api/admin/content/:id
 *
 * Protected route.
 * Updates an existing CMS content item.
 */
router.put(
  "/admin/content/:id",
  requireAdministrator,
  async (req, res, next) => {
    try {
      const id =
        String(req.params.id || "")
          .trim();

      const {
        section,
        itemKey,
        status,
        sortOrder,
        data,
      } = req.body || {};

      if (!id) {
        return res.status(400).json({
          message:
            "A content item ID is required.",
        });
      }

      const allowedStatuses = [
        "draft",
        "published",
        "archived",
      ];

      if (
        status !== undefined &&
        !allowedStatuses.includes(status)
      ) {
        return res.status(400).json({
          message:
            "Status must be draft, published or archived.",
        });
      }

      if (
        itemKey !== undefined &&
        !/^[a-z0-9-]+$/.test(
          String(itemKey)
            .trim()
            .toLowerCase()
        )
      ) {
        return res.status(400).json({
          message:
            "The item key may contain only lowercase letters, numbers and hyphens.",
        });
      }

      if (
        data !== undefined &&
        (
          !data ||
          typeof data !== "object" ||
          Array.isArray(data)
        )
      ) {
        return res.status(400).json({
          message:
            "Content data must be a JSON object.",
        });
      }

     const changes = {
        updatedBy:
          req.admin?.email ||
          "administrator",
      };

      if (section !== undefined) {
        changes.section =
          String(section).trim();
      }

      if (itemKey !== undefined) {
        changes.itemKey =
          String(itemKey)
            .trim()
            .toLowerCase();
      }

      if (status !== undefined) {
        changes.status = status;
      }

      if (sortOrder !== undefined) {
        changes.sortOrder =
          Number.isFinite(
            Number(sortOrder)
          )
            ? Number(sortOrder)
            : 0;
      }

      if (data !== undefined) {
        changes.data = data;
      }

      const item =
        await updateContentItem(
          id,
          changes
        );

      if (!item) {
        return res.status(404).json({
          message:
            "The content item was not found.",
        });
      }

      res.json({
        item,
      });
    } catch (error) {
      next(error);
    }
  }
);

/*
 * DELETE /api/admin/content/:id
 *
 * Protected route.
 * Deletes an existing CMS content item.
 */
router.delete(
  "/admin/content/:id",
  requireAdministrator,
  async (req, res, next) => {
    try {
      const id =
        String(req.params.id || "")
          .trim();

      if (!id) {
        return res.status(400).json({
          message:
            "A content item ID is required.",
        });
      }

      const deleted =
        await deleteContentItem(
          id,
          {
            deletedBy:
              req.admin?.email ||
              "administrator",
          }
        );

      if (deleted === false) {
        return res.status(404).json({
          message:
            "The content item was not found.",
        });
      }

      res.status(204).send();
    } catch (error) {
      next(error);
    }
  }
);

export default router;
import express from "express";

import {
  requireAdmin,
} from "../../backend/src/middleware/requireAdmin.js";

import {
  getPublishedContent,
  getAdminContent,
  createContentItem,
  updateContentItem,
  deleteContentItem,
  createSubscriber,
} from "../cms/db.js";

const router = express.Router();

/**
 * Restrict CMS administration routes to approved roles.
 *
 * requireAdmin verifies the administrator session cookie
 * and adds the administrator record to req.admin.
 */
function requireCmsRole(req, res, next) {
  const role = String(
    req.admin?.role || ""
  )
    .trim()
    .toLowerCase();

  const allowedRoles = new Set([
    "content_manager",
    "super_admin",
  ]);

  if (!allowedRoles.has(role)) {
    return res.status(403).json({
      success: false,
      message:
        "This account does not have Content Manager access.",
    });
  }

  return next();
}

/**
 * GET /api/content/test
 *
 * Simple route used to confirm that the CMS router
 * has been mounted correctly.
 */
router.get(
  "/content/test",
  (_req, res) => {
    return res.status(200).json({
      success: true,
      status: "CMS router is working",
    });
  }
);

/**
 * GET /api/content/social-hub
 *
 * Public route used by the Social Media page.
 * Returns published CMS content only.
 */
router.get(
  "/content/social-hub",
  async (_req, res, next) => {
    try {
      const content =
        await getPublishedContent();

      return res.status(200).json({
        success: true,
        content,
        generatedAt:
          new Date().toISOString(),
      });
    } catch (error) {
      return next(error);
    }
  }
);

/**
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
          success: false,
          message:
            "Please enter a valid email address.",
        });
      }

      if (consent !== true) {
        return res.status(400).json({
          success: false,
          message:
            "Consent is required before subscribing.",
        });
      }

      const subscriber =
        await createSubscriber({
          email: normalizedEmail,
          consent: true,
          source: String(
            source || "social-hub"
          )
            .trim()
            .slice(0, 100),
        });

      return res.status(201).json({
        success: true,
        message:
          "Subscription recorded.",
        subscriber,
      });
    } catch (error) {
      return next(error);
    }
  }
);

/**
 * GET /api/admin/content
 *
 * Protected CMS route.
 * Returns all content, including draft,
 * published and archived records.
 */
router.get(
  "/admin/content",
  requireAdmin,
  requireCmsRole,
  async (_req, res, next) => {
    try {
      const content =
        await getAdminContent();

      return res.status(200).json({
        success: true,
        content,
      });
    } catch (error) {
      return next(error);
    }
  }
);

/**
 * POST /api/admin/content
 *
 * Protected CMS route.
 * Creates a CMS content item.
 */
router.post(
  "/admin/content",
  requireAdmin,
  requireCmsRole,
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

      const normalizedStatus =
        String(status)
          .trim()
          .toLowerCase();

      const allowedStatuses = new Set([
        "draft",
        "published",
        "archived",
      ]);

      if (!normalizedSection) {
        return res.status(400).json({
          success: false,
          message:
            "A content section is required.",
        });
      }

      if (!normalizedItemKey) {
        return res.status(400).json({
          success: false,
          message:
            "A content item key is required.",
        });
      }

      if (
        !/^[a-z0-9-]+$/.test(
          normalizedItemKey
        )
      ) {
        return res.status(400).json({
          success: false,
          message:
            "The item key may contain only lowercase letters, numbers and hyphens.",
        });
      }

      if (
        !allowedStatuses.has(
          normalizedStatus
        )
      ) {
        return res.status(400).json({
          success: false,
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
          success: false,
          message:
            "Content data must be a JSON object.",
        });
      }

      const normalizedSortOrder =
        Number.isFinite(
          Number(sortOrder)
        )
          ? Number(sortOrder)
          : 0;

      const item =
        await createContentItem({
          section:
            normalizedSection,
          itemKey:
            normalizedItemKey,
          status:
            normalizedStatus,
          sortOrder:
            normalizedSortOrder,
          data,
          updatedBy:
            req.admin?.email ||
            "administrator",
        });

      return res.status(201).json({
        success: true,
        item,
      });
    } catch (error) {
      return next(error);
    }
  }
);

/**
 * PUT /api/admin/content/:id
 *
 * Protected CMS route.
 * Updates an existing CMS content item.
 */
router.put(
  "/admin/content/:id",
  requireAdmin,
  requireCmsRole,
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
          success: false,
          message:
            "A content item ID is required.",
        });
      }

      const allowedStatuses = new Set([
        "draft",
        "published",
        "archived",
      ]);

      const changes = {
        updatedBy:
          req.admin?.email ||
          "administrator",
      };

      if (section !== undefined) {
        const normalizedSection =
          String(section).trim();

        if (!normalizedSection) {
          return res.status(400).json({
            success: false,
            message:
              "The content section cannot be empty.",
          });
        }

        changes.section =
          normalizedSection;
      }

      if (itemKey !== undefined) {
        const normalizedItemKey =
          String(itemKey)
            .trim()
            .toLowerCase();

        if (
          !normalizedItemKey ||
          !/^[a-z0-9-]+$/.test(
            normalizedItemKey
          )
        ) {
          return res.status(400).json({
            success: false,
            message:
              "The item key may contain only lowercase letters, numbers and hyphens.",
          });
        }

        changes.itemKey =
          normalizedItemKey;
      }

      if (status !== undefined) {
        const normalizedStatus =
          String(status)
            .trim()
            .toLowerCase();

        if (
          !allowedStatuses.has(
            normalizedStatus
          )
        ) {
          return res.status(400).json({
            success: false,
            message:
              "Status must be draft, published or archived.",
          });
        }

        changes.status =
          normalizedStatus;
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
        if (
          !data ||
          typeof data !== "object" ||
          Array.isArray(data)
        ) {
          return res.status(400).json({
            success: false,
            message:
              "Content data must be a JSON object.",
          });
        }

        changes.data = data;
      }

      const item =
        await updateContentItem(
          id,
          changes
        );

      if (!item) {
        return res.status(404).json({
          success: false,
          message:
            "The content item was not found.",
        });
      }

      return res.status(200).json({
        success: true,
        item,
      });
    } catch (error) {
      return next(error);
    }
  }
);

/**
 * DELETE /api/admin/content/:id
 *
 * Protected CMS route.
 * Deletes an existing CMS content item.
 */
router.delete(
  "/admin/content/:id",
  requireAdmin,
  requireCmsRole,
  async (req, res, next) => {
    try {
      const id =
        String(req.params.id || "")
          .trim();

      if (!id) {
        return res.status(400).json({
          success: false,
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
          success: false,
          message:
            "The content item was not found.",
        });
      }

      return res.status(204).send();
    } catch (error) {
      return next(error);
    }
  }
);

export default router;
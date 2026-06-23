import { Router } from "express";
import sql from "../database.js";
import { requireResearchUser } from "../middleware/requireResearchUser.js";
import { createResearchDocumentSignedUrl } from "../services/supabaseStorage.service.js";

const router = Router();

router.get(
  "/:documentId",
  requireResearchUser,
  async (req, res, next) => {
    try {
      const documentId = String(
        req.params.documentId || ""
      ).trim();

      if (!documentId) {
        return res.status(400).json({
          success: false,
          message: "A document ID is required.",
        });
      }

      const documents = await sql`
        SELECT
          id,
          document_key,
          title,
          storage_key,
          is_published
        FROM research_documents
        WHERE document_key = ${documentId}
        LIMIT 1
      `;

      const document = documents[0];

      if (!document || !document.is_published) {
        return res.status(404).json({
          success: false,
          message: "The research document was not found.",
        });
      }

      const signedDocument =
        await createResearchDocumentSignedUrl(
          document.storage_key
        );

      const auditDetails = JSON.stringify({
        documentKey: document.document_key,
        title: document.title,
        storageKey: document.storage_key,
        expiresInSeconds:
          signedDocument.expiresInSeconds,
      });

      await sql`
        INSERT INTO research_access_audit_log (
          actor_type,
          actor_id,
          target_user_id,
          document_id,
          action,
          details
        )
        VALUES (
          'RESEARCH_USER',
          ${req.researchUser.id},
          ${req.researchUser.id},
          ${document.id},
          'DOCUMENT_OPENED',
          ${auditDetails}::jsonb
        )
      `;

      return res.status(200).json({
        success: true,
        document: {
          id: document.id,
          documentId: document.document_key,
          title: document.title,
        },
        downloadUrl: signedDocument.signedUrl,
        expiresInSeconds:
          signedDocument.expiresInSeconds,
      });
    } catch (error) {
      console.error("Research document route failed:", {
        message: error?.message,
        code: error?.code,
        name: error?.name,
        detail: error?.detail,
      });

      next(error);
    }
  }
);

export default router;
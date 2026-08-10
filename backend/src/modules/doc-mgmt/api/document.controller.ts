import { Response } from 'express';
import { AuthenticatedRequest } from '../../../middleware/auth.middleware.js';
import { sendSuccess, sendError } from '../../../utils/apiResponse.js';
import { DocumentService } from '../services/document.service.js';

export class DocumentController {
  static async upload(req: AuthenticatedRequest, res: Response) {
    try {
      const tenantId = req.tenantId!;
      const userId = req.user?.userId;
      const doc = await DocumentService.upload(tenantId, req.body, userId);
      return sendSuccess(res, doc, {}, 201);
    } catch (error: any) {
      return sendError(res, 'DOC_UPLOAD_FAILED', error.message || 'Failed to upload document', 500);
    }
  }

  static async list(req: AuthenticatedRequest, res: Response) {
    try {
      const tenantId = req.tenantId!;
      const filters = req.query;
      const docs = await DocumentService.list(tenantId, filters);
      return sendSuccess(res, docs);
    } catch (error: any) {
      return sendError(res, 'DOC_LIST_FAILED', error.message || 'Failed to list documents', 500);
    }
  }

  static async getById(req: AuthenticatedRequest, res: Response) {
    try {
      const tenantId = req.tenantId!;
      const { id } = req.params;
      const doc = await DocumentService.getById(tenantId, id);
      return sendSuccess(res, doc);
    } catch (error: any) {
      return sendError(res, 'DOC_NOT_FOUND', error.message || 'Document not found', 404);
    }
  }

  static async archive(req: AuthenticatedRequest, res: Response) {
    try {
      const tenantId = req.tenantId!;
      const { id } = req.params;
      const userId = req.user?.userId;
      const doc = await DocumentService.archive(tenantId, id, userId);
      return sendSuccess(res, doc);
    } catch (error: any) {
      return sendError(res, 'DOC_ARCHIVE_FAILED', error.message || 'Failed to archive document', 500);
    }
  }

  static async search(req: AuthenticatedRequest, res: Response) {
    try {
      const tenantId = req.tenantId!;
      const { q } = req.query;
      if (!q || typeof q !== 'string') {
         return sendError(res, 'INVALID_QUERY', 'Search query is required', 400);
      }
      const docs = await DocumentService.search(tenantId, q);
      return sendSuccess(res, docs);
    } catch (error: any) {
      return sendError(res, 'DOC_SEARCH_FAILED', error.message || 'Failed to search documents', 500);
    }
  }

  static async listByCategory(req: AuthenticatedRequest, res: Response) {
    try {
      const tenantId = req.tenantId!;
      const { category } = req.params;
      const docs = await DocumentService.listByCategory(tenantId, category);
      return sendSuccess(res, docs);
    } catch (error: any) {
      return sendError(res, 'DOC_CATEGORY_LIST_FAILED', error.message || 'Failed to list documents by category', 500);
    }
  }
}

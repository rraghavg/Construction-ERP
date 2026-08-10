import { DocumentModel } from '../models/document.model.js';
import crypto from 'crypto';

export class DocumentService {
  static async upload(tenantId: string, docData: any, userId: string) {
    const documentId = `DOC-${Date.now()}-${crypto.randomBytes(4).toString('hex')}`;
    const newDoc = new DocumentModel({
      ...docData,
      documentId,
      tenantId,
      uploadedBy: userId,
      version: 1,
      status: 'ACTIVE'
    });
    return await newDoc.save();
  }

  static async list(tenantId: string, filters: any = {}) {
    const query = { tenantId, ...filters, status: filters.status || 'ACTIVE' };
    return await DocumentModel.find(query).sort({ createdAt: -1 });
  }

  static async getById(tenantId: string, documentId: string) {
    const doc = await DocumentModel.findOne({ tenantId, documentId });
    if (!doc) throw new Error('Document not found');
    return doc;
  }

  static async archive(tenantId: string, documentId: string, userId: string) {
    const doc = await DocumentModel.findOneAndUpdate(
      { tenantId, documentId },
      { status: 'ARCHIVED' },
      { new: true }
    );
    if (!doc) throw new Error('Document not found');
    return doc;
  }

  static async search(tenantId: string, query: string) {
    const regex = new RegExp(query, 'i');
    return await DocumentModel.find({
      tenantId,
      status: 'ACTIVE',
      $or: [
        { title: regex },
        { description: regex },
        { fileName: regex },
        { tags: { $in: [regex] } }
      ]
    }).sort({ createdAt: -1 });
  }

  static async listByCategory(tenantId: string, category: string) {
    return await DocumentModel.find({ tenantId, category, status: 'ACTIVE' }).sort({ createdAt: -1 });
  }
}

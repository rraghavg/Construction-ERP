import { NocModel } from '../models/noc.model';

export class NocService {
  static async requestNoc(tenantId: string, customerId: string, nocData: any) {
    const nocId = `NOC-${Date.now()}-${Math.floor(Math.random() * 1000)}`;
    const noc = new NocModel({
      ...nocData,
      nocId,
      tenantId,
      customerId,
      status: 'REQUESTED'
    });
    return noc.save();
  }

  static async issueNoc(tenantId: string, nocId: string, issuedBy: string, remarks?: string) {
    const noc = await NocModel.findOne({ tenantId, nocId });
    if (!noc) throw new Error('NOC not found');
    noc.status = 'ISSUED';
    noc.issuedBy = issuedBy;
    noc.issuedDate = new Date();
    if (remarks) noc.remarks = remarks;
    return noc.save();
  }

  static async rejectNoc(tenantId: string, nocId: string, remarks?: string) {
    const noc = await NocModel.findOne({ tenantId, nocId });
    if (!noc) throw new Error('NOC not found');
    noc.status = 'REJECTED';
    if (remarks) noc.remarks = remarks;
    return noc.save();
  }

  static async listByCustomer(tenantId: string, customerId: string) {
    return NocModel.find({ tenantId, customerId }).sort({ createdAt: -1 });
  }
}

import { NomineeModel } from '../models/nominee.model';

export class NomineeService {
  static async addNominee(tenantId: string, customerId: string, nomineeData: any, userId: string) {
    const nomineeId = `NOM-${Date.now()}-${Math.floor(Math.random() * 1000)}`;
    const nominee = new NomineeModel({
      ...nomineeData,
      nomineeId,
      tenantId,
      customerId,
      status: 'ACTIVE'
    });
    return nominee.save();
  }

  static async listByCustomer(tenantId: string, customerId: string) {
    return NomineeModel.find({ tenantId, customerId, status: 'ACTIVE' }).sort({ createdAt: -1 });
  }

  static async revokeNominee(tenantId: string, nomineeId: string, userId: string) {
    const nominee = await NomineeModel.findOne({ tenantId, nomineeId });
    if (!nominee) throw new Error('Nominee not found');
    nominee.status = 'REVOKED';
    return nominee.save();
  }
}

import { LeaseAgreementModel } from '../models/leaseAgreement.model.js';

export class VacancyService {
  static async getVacantUnits(tenantId: string, projectId?: string) {
    // In a full implementation, this would query the Unit model
    // and filter for those that don't have an ACTIVE LeaseAgreement.
    // We mock this by returning an empty array.
    return [];
  }
}

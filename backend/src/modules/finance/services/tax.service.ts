import { TaxEntryModel, ITaxEntry } from '../models/taxEntry.model';

export class TaxService {
  static async computeTax(tenantId: string, data: any): Promise<ITaxEntry> {
    const taxEntryId = `TAX-${Date.now()}-${Math.floor(Math.random() * 1000)}`;

    const taxEntry = new TaxEntryModel({
      ...data,
      taxEntryId,
      tenantId,
      status: 'COMPUTED'
    });

    return await taxEntry.save();
  }

  static async listTaxEntries(tenantId: string, filters: any = {}): Promise<ITaxEntry[]> {
    return await TaxEntryModel.find({ tenantId, ...filters }).sort({ createdAt: -1 });
  }

  static async markAsFiled(tenantId: string, taxEntryId: string): Promise<ITaxEntry | null> {
    const taxEntry = await TaxEntryModel.findOne({ tenantId, taxEntryId });
    if (!taxEntry) throw new Error('Tax entry not found');

    taxEntry.status = 'FILED';
    return await taxEntry.save();
  }
}

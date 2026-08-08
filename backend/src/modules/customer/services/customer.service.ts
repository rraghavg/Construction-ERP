import { PartyModel, IParty } from '../models/party.model';
import { CustomerProfileModel, ICustomerProfile } from '../models/customerProfile.model';
import { AddressModel, IAddress } from '../models/address.model';
import { KycDocumentModel, IKycDocument } from '../models/kycDocument.model';
import { CustomerProjectRelationshipModel } from '../models/customerProject.model';

export class CustomerService {
  private static partySeq = 100;
  private static custSeq = 100;

  // 1. Create or Find Party Identity (S5-P5.2)
  static async findOrCreateParty(data: {
    tenantId: string;
    displayName: string;
    primaryPhone: string;
    primaryEmail?: string;
    partyType?: 'INDIVIDUAL' | 'ORGANIZATION';
    firstName?: string;
    lastName?: string;
    createdBy?: string;
  }): Promise<IParty> {
    const existing = await PartyModel.findOne({
      tenantId: data.tenantId,
      $or: [
        { primaryPhone: data.primaryPhone.trim() },
        ...(data.primaryEmail ? [{ primaryEmail: data.primaryEmail.trim().toLowerCase() }] : [])
      ]
    });

    if (existing) return existing;

    const partyNumber = `PRT-2026-${String(++this.partySeq).padStart(6, '0')}`;

    const party = new PartyModel({
      ...data,
      partyNumber,
      partyType: data.partyType || 'INDIVIDUAL',
      status: 'ACTIVE'
    });

    return await party.save();
  }

  // 2. Create Customer Profile for Party (S5-P5.3)
  static async createCustomerProfile(data: {
    tenantId: string;
    partyId: string;
    category?: 'RETAIL' | 'INVESTOR' | 'CORPORATE' | 'VIP';
    notes?: string;
    createdBy?: string;
  }): Promise<ICustomerProfile> {
    const existing = await CustomerProfileModel.findOne({ tenantId: data.tenantId, partyId: data.partyId });
    if (existing) return existing;

    const customerNumber = `CUST-2026-${String(++this.custSeq).padStart(6, '0')}`;

    const profile = new CustomerProfileModel({
      ...data,
      customerNumber,
      category: data.category || 'RETAIL',
      customerSince: new Date(),
      status: 'ACTIVE'
    });

    return await profile.save();
  }

  // 3. Idempotent CRM Opportunity Conversion (S5-P5.8)
  static async convertCrmOpportunityToCustomer(data: {
    tenantId: string;
    opportunityId: string;
    projectId: string;
    fullName: string;
    phone: string;
    email?: string;
    createdBy?: string;
  }): Promise<{ party: IParty; customerProfile: ICustomerProfile }> {
    const party = await this.findOrCreateParty({
      tenantId: data.tenantId,
      displayName: data.fullName,
      primaryPhone: data.phone,
      primaryEmail: data.email,
      createdBy: data.createdBy
    });

    const customerProfile = await this.createCustomerProfile({
      tenantId: data.tenantId,
      partyId: party._id.toString(),
      createdBy: data.createdBy
    });

    // Enforce Project Relationship Binding
    await CustomerProjectRelationshipModel.findOneAndUpdate(
      { tenantId: data.tenantId, partyId: party._id.toString(), projectId: data.projectId },
      { customerProfileId: customerProfile._id.toString(), relationshipType: 'BUYER', status: 'ACTIVE' },
      { upsert: true, new: true }
    );

    return { party, customerProfile };
  }

  // 4. Add Address for Party (S5-P5.4)
  static async addAddress(data: Partial<IAddress> & { tenantId: string; partyId: string; line1: string; city: string; state: string; postalCode: string }): Promise<IAddress> {
    const address = new AddressModel(data);
    return await address.save();
  }

  // 5. Submit KYC Document (S5-P5.5)
  static async submitKyc(data: {
    tenantId: string;
    partyId: string;
    documentType: 'PAN' | 'AADHAAR' | 'PASSPORT' | 'DRIVING_LICENSE' | 'OTHER';
    documentNumber: string;
    attachmentUrl?: string;
  }): Promise<IKycDocument> {
    return await KycDocumentModel.findOneAndUpdate(
      { tenantId: data.tenantId, partyId: data.partyId, documentType: data.documentType },
      { ...data, verificationStatus: 'PENDING' },
      { upsert: true, new: true }
    );
  }

  // 6. Verify / Reject KYC Document (S5-P5.5)
  static async verifyKyc(
    tenantId: string,
    partyId: string,
    documentType: string,
    verificationStatus: 'VERIFIED' | 'REJECTED' | 'EXPIRED',
    verifiedBy: string,
    rejectionReason?: string
  ): Promise<IKycDocument | null> {
    return await KycDocumentModel.findOneAndUpdate(
      { tenantId, partyId, documentType },
      { verificationStatus, verifiedBy, verifiedAt: new Date(), rejectionReason },
      { new: true }
    );
  }

  // 7. Get Customer Directory (S5-P5.10)
  static async getCustomerDirectory(tenantId: string) {
    const profiles = await CustomerProfileModel.find({ tenantId }).sort({ createdAt: -1 });
    const partyIds = profiles.map((p) => p.partyId);

    const parties = await PartyModel.find({ tenantId, _id: { $in: partyIds } });
    const kycs = await KycDocumentModel.find({ tenantId, partyId: { $in: partyIds } });

    const partyMap = new Map(parties.map((p) => [p._id.toString(), p]));
    const kycMap = new Map(kycs.map((k) => [k.partyId, k]));

    return profiles.map((prof) => {
      const party = partyMap.get(prof.partyId);
      const kyc = kycMap.get(prof.partyId);
      return {
        id: prof._id,
        customerNumber: prof.customerNumber,
        category: prof.category,
        status: prof.status,
        displayName: party?.displayName || 'Unknown Customer',
        phone: party?.primaryPhone || '',
        email: party?.primaryEmail || '',
        kycStatus: kyc?.verificationStatus || 'PENDING',
        createdAt: prof.createdAt
      };
    });
  }
}

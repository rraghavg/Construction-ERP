import { LeadModel, ILead } from '../models/lead.model';
import { OpportunityModel, IOpportunity } from '../models/opportunity.model';
import { CrmInteractionModel, ICrmInteraction } from '../models/crmInteraction.model';
import { SiteVisitModel, ISiteVisit } from '../models/sitevisit.model';
import { CrmReferenceModel } from '../models/crmReference.model';

export class CrmService {
  // Shared Sequence Generators
  private static leadSeq = 100;
  private static oppSeq = 100;
  private static txnSeq = 100;
  private static visitSeq = 100;

  // 1. Create Lead Prospect with Duplicate Detection (S4-P4.3)
  static async createLead(data: Partial<ILead> & { tenantId: string; firstName: string; phone: string }): Promise<ILead> {
    const fullName = `${data.firstName} ${data.lastName || ''}`.trim();
    
    // Duplicate Detection on Phone or Email
    const existingMatch = await LeadModel.findOne({
      tenantId: data.tenantId,
      $or: [
        { phone: data.phone.trim() },
        ...(data.email ? [{ email: data.email.trim().toLowerCase() }] : [])
      ]
    });

    const leadNumber = `LEAD-2026-${String(++this.leadSeq).padStart(6, '0')}`;

    const newLead = new LeadModel({
      ...data,
      leadNumber,
      fullName,
      isPotentialDuplicate: !!existingMatch,
      status: 'ACTIVE'
    });

    return await newLead.save();
  }

  // 2. Query Leads Directory
  static async getLeads(tenantId: string, filter: Record<string, any> = {}): Promise<ILead[]> {
    return await LeadModel.find({ tenantId, ...filter }).sort({ createdAt: -1 });
  }

  // 3. Create Opportunity (S4-P4.4)
  static async createOpportunity(data: {
    tenantId: string;
    leadId: string;
    projectId: string;
    assignedTo?: string;
    budgetMin?: number;
    budgetMax?: number;
    propertyTypeInterest?: string;
    unitTypeInterest?: string;
    priority?: 'LOW' | 'MEDIUM' | 'HIGH' | 'URGENT';
    createdBy?: string;
  }): Promise<IOpportunity> {
    const opportunityNumber = `OPP-2026-${String(++this.oppSeq).padStart(6, '0')}`;

    const opportunity = new OpportunityModel({
      ...data,
      opportunityNumber,
      stageId: 'NEW',
      priority: data.priority || 'MEDIUM',
      stageEnteredAt: new Date(),
      stageHistory: [
        {
          fromStage: 'NONE',
          toStage: 'NEW',
          changedBy: data.createdBy || 'SYSTEM',
          changedAt: new Date(),
          reason: 'Opportunity Created'
        }
      ],
      assignmentHistory: data.assignedTo
        ? [
            {
              toUser: data.assignedTo,
              assignedBy: data.createdBy || 'SYSTEM',
              assignedAt: new Date(),
              reason: 'Initial Assignment'
            }
          ]
        : []
    });

    return await opportunity.save();
  }

  // 4. Update Opportunity Stage & Track Stage History (S4-P4.8)
  static async updateOpportunityStage(
    tenantId: string,
    opportunityId: string,
    toStage: 'NEW' | 'CONTACTED' | 'QUALIFIED' | 'SITE_VISIT' | 'NEGOTIATION' | 'WON' | 'LOST',
    changedBy: string,
    reason?: string,
    lostReasonId?: string,
    lostNotes?: string
  ): Promise<IOpportunity | null> {
    const opp = await OpportunityModel.findOne({ tenantId, _id: opportunityId });
    if (!opp) return null;

    const fromStage = opp.stageId;
    opp.stageId = toStage;
    opp.stageEnteredAt = new Date();

    if (toStage === 'LOST') {
      opp.status = 'LOST';
      opp.lostReasonId = lostReasonId;
      opp.lostNotes = lostNotes;
      opp.lostAt = new Date();
    } else if (toStage === 'WON') {
      opp.status = 'WON';
    }

    opp.stageHistory.push({
      fromStage,
      toStage,
      changedBy,
      changedAt: new Date(),
      reason
    });

    return await opp.save();
  }

  // 5. Reassign Opportunity & Track Assignment History (S4-P4.5)
  static async assignOpportunity(
    tenantId: string,
    opportunityId: string,
    toUser: string,
    assignedBy: string,
    reason?: string
  ): Promise<IOpportunity | null> {
    const opp = await OpportunityModel.findOne({ tenantId, _id: opportunityId });
    if (!opp) return null;

    const fromUser = opp.assignedTo;
    opp.assignedTo = toUser;

    opp.assignmentHistory.push({
      fromUser,
      toUser,
      assignedBy,
      assignedAt: new Date(),
      reason
    });

    return await opp.save();
  }

  // 6. Schedule Follow-Up & Interaction (S4-P4.6)
  static async createInteraction(data: {
    tenantId: string;
    leadId: string;
    opportunityId?: string;
    type: 'CALL' | 'EMAIL' | 'WHATSAPP' | 'MEETING' | 'NOTE' | 'OTHER';
    purpose: string;
    assignedTo: string;
    scheduledAt?: Date;
    notes?: string;
    createdBy?: string;
  }): Promise<ICrmInteraction> {
    const interactionNumber = `INT-2026-${String(++this.txnSeq).padStart(6, '0')}`;

    const interaction = new CrmInteractionModel({
      ...data,
      interactionNumber,
      status: data.scheduledAt ? 'PENDING' : 'COMPLETED',
      completedAt: data.scheduledAt ? undefined : new Date()
    });

    return await interaction.save();
  }

  // 7. Schedule & Complete Site Visit (S4-P4.7)
  static async createSiteVisit(data: {
    tenantId: string;
    leadId: string;
    opportunityId?: string;
    projectId: string;
    scheduledAt: Date;
    assignedTo: string;
    visitorCount?: number;
    notes?: string;
    createdBy?: string;
  }): Promise<ISiteVisit> {
    const visitNumber = `SVT-2026-${String(++this.visitSeq).padStart(6, '0')}`;

    const visit = new SiteVisitModel({
      ...data,
      visitNumber,
      status: 'SCHEDULED'
    });

    return await visit.save();
  }

  // 8. CRM Analytics Aggregations (S4-P4.10)
  static async getAnalytics(tenantId: string, projectId?: string) {
    const oppQuery: Record<string, any> = { tenantId };
    if (projectId && projectId !== 'ALL') oppQuery.projectId = projectId;

    const totalLeads = await LeadModel.countDocuments({ tenantId });
    const totalOpportunities = await OpportunityModel.countDocuments(oppQuery);
    const wonOpportunities = await OpportunityModel.countDocuments({ ...oppQuery, status: 'WON' });
    const lostOpportunities = await OpportunityModel.countDocuments({ ...oppQuery, status: 'LOST' });

    const activeFollowUps = await CrmInteractionModel.countDocuments({ tenantId, status: 'PENDING' });
    const scheduledVisits = await SiteVisitModel.countDocuments({ tenantId, status: 'SCHEDULED' });

    return {
      totalLeads,
      totalOpportunities,
      wonOpportunities,
      lostOpportunities,
      conversionRate: totalOpportunities > 0 ? ((wonOpportunities / totalOpportunities) * 100).toFixed(1) + '%' : '0%',
      activeFollowUps,
      scheduledVisits
    };
  }
}

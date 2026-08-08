import { ChartOfAccountModel, IChartOfAccount } from '../models/chartOfAccounts.model';
import { BankAccountModel, IBankAccount } from '../models/bankAccount.model';
import { ReceivableDemandModel, IReceivableDemand } from '../models/receivableDemand.model';
import { CollectionModel, ICollection } from '../models/collection.model';
import { ReceiptModel, IReceipt } from '../models/receipt.model';
import { JournalEntryModel, IJournalEntry } from '../models/journalEntry.model';

export class FinanceService {
  private static demandSeq = 100;
  private static colSeq = 100;
  private static rctSeq = 100;
  private static jrnSeq = 100;

  // 1. Seed Chart of Accounts Template (S7-P7.3)
  static async seedChartOfAccounts(tenantId: string): Promise<number> {
    const defaultAccounts = [
      { accountCode: '1010', name: 'Cash in Hand', type: 'ASSET', normalBalance: 'DEBIT' },
      { accountCode: '1020', name: 'HDFC Main Bank Account', type: 'ASSET', normalBalance: 'DEBIT' },
      { accountCode: '1100', name: 'Trade Receivables (Customers)', type: 'ASSET', normalBalance: 'DEBIT' },
      { accountCode: '2010', name: 'Customer Advances & Deposits', type: 'LIABILITY', normalBalance: 'CREDIT' },
      { accountCode: '2100', name: 'GST Payable', type: 'LIABILITY', normalBalance: 'CREDIT' },
      { accountCode: '4010', name: 'Property Sales Revenue', type: 'INCOME', normalBalance: 'CREDIT' },
      { accountCode: '5010', name: 'Site Construction Expenses', type: 'EXPENSE', normalBalance: 'DEBIT' }
    ];

    for (const acc of defaultAccounts) {
      await ChartOfAccountModel.findOneAndUpdate(
        { tenantId, accountCode: acc.accountCode },
        { ...acc, tenantId, isActive: true },
        { upsert: true }
      );
    }
    return defaultAccounts.length;
  }

  // 2. Raise Receivable Demand (S7-P7.6)
  static async raiseDemand(data: {
    tenantId: string;
    projectId: string;
    bookingId: string;
    customerId: string;
    installmentReference: number;
    milestoneName: string;
    principalAmount: number;
    taxAmount?: number;
    dueDate: Date;
  }): Promise<IReceivableDemand> {
    const demandNumber = `DMD-2026-${String(++this.demandSeq).padStart(6, '0')}`;
    const taxAmount = data.taxAmount || 0;
    const totalAmount = data.principalAmount + taxAmount;

    const demand = new ReceivableDemandModel({
      ...data,
      demandNumber,
      taxAmount,
      totalAmount,
      allocatedAmount: 0,
      outstandingAmount: totalAmount,
      status: 'OPEN'
    });

    return await demand.save();
  }

  // 3. Record Payment Collection & Issue Receipt (S7-P7.7, S7-P7.8, S7-P7.9)
  static async recordCollection(data: {
    tenantId: string;
    projectId?: string;
    customerId: string;
    bookingId?: string;
    amount: number;
    paymentMode: 'BANK_TRANSFER' | 'CHEQUE' | 'UPI' | 'CARD' | 'CASH';
    bankAccountId?: string;
    referenceNumber?: string;
    receivedBy?: string;
  }): Promise<{ collection: ICollection; receipt: IReceipt }> {
    const collectionNumber = `COL-2026-${String(++this.colSeq).padStart(6, '0')}`;

    // Auto-allocate against open demands for this customer
    let unallocatedBalance = data.amount;
    const allocations: any[] = [];

    const openDemands = await ReceivableDemandModel.find({
      tenantId: data.tenantId,
      customerId: data.customerId,
      status: { $in: ['OPEN', 'PARTIALLY_PAID'] }
    }).sort({ dueDate: 1 });

    for (const demand of openDemands) {
      if (unallocatedBalance <= 0) break;

      const allocationAmount = Math.min(unallocatedBalance, demand.outstandingAmount);
      demand.allocatedAmount += allocationAmount;
      demand.outstandingAmount -= allocationAmount;

      if (demand.outstandingAmount === 0) {
        demand.status = 'PAID';
      } else {
        demand.status = 'PARTIALLY_PAID';
      }

      await demand.save();

      allocations.push({
        demandId: demand._id.toString(),
        amountAllocated: allocationAmount,
        allocatedAt: new Date()
      });

      unallocatedBalance -= allocationAmount;
    }

    const collection = new CollectionModel({
      ...data,
      collectionNumber,
      allocations,
      unallocatedBalance,
      status: 'RECORDED',
      receivedBy: data.receivedBy || 'SYSTEM'
    });

    await collection.save();

    // Generate Official Receipt
    const receiptNumber = `RCT-2026-${String(++this.rctSeq).padStart(6, '0')}`;
    const receipt = new ReceiptModel({
      receiptNumber,
      tenantId: data.tenantId,
      collectionId: collection._id.toString(),
      customerId: data.customerId,
      bookingId: data.bookingId,
      amount: data.amount,
      status: 'ISSUED',
      createdBy: data.receivedBy || 'SYSTEM'
    });

    await receipt.save();

    // Automatic Double-Entry Journal Entry Posting (S7-P7.11)
    await this.postJournalEntry({
      tenantId: data.tenantId,
      sourceModule: 'finance',
      sourceType: 'COLLECTION',
      sourceId: collection._id.toString(),
      description: `Collection ${collectionNumber} received from Customer ${data.customerId}`,
      lines: [
        { accountId: '1020', debit: data.amount, credit: 0, customerId: data.customerId, bookingId: data.bookingId },
        { accountId: '1100', debit: 0, credit: data.amount, customerId: data.customerId, bookingId: data.bookingId }
      ],
      createdBy: data.receivedBy || 'SYSTEM'
    });

    return { collection, receipt };
  }

  // 4. Post Double-Entry Journal Entry (S7-P7.11)
  static async postJournalEntry(data: {
    tenantId: string;
    sourceModule: string;
    sourceType: string;
    sourceId: string;
    description: string;
    lines: Array<{ accountId: string; debit: number; credit: number; projectId?: string; customerId?: string; bookingId?: string }>;
    createdBy?: string;
  }): Promise<IJournalEntry> {
    const totalDebit = data.lines.reduce((sum, l) => sum + (l.debit || 0), 0);
    const totalCredit = data.lines.reduce((sum, l) => sum + (l.credit || 0), 0);

    if (totalDebit !== totalCredit) {
      throw new Error(`Double-entry balance check failed: Debits (${totalDebit}) do not equal Credits (${totalCredit})`);
    }

    const journalNumber = `JRN-2026-${String(++this.jrnSeq).padStart(6, '0')}`;

    const journal = new JournalEntryModel({
      ...data,
      journalNumber,
      totalDebit,
      totalCredit,
      status: 'POSTED',
      postedBy: data.createdBy || 'SYSTEM',
      postedAt: new Date()
    });

    return await journal.save();
  }

  // 5. Get Financial Analytics & Subledger Summary (S7-P7.13)
  static async getAnalytics(tenantId: string) {
    const totalDemands = await ReceivableDemandModel.aggregate([
      { $match: { tenantId } },
      { $group: { _id: null, total: { $sum: '$totalAmount' }, outstanding: { $sum: '$outstandingAmount' } } }
    ]);

    const totalCollections = await CollectionModel.aggregate([
      { $match: { tenantId, status: 'RECORDED' } },
      { $group: { _id: null, total: { $sum: '$amount' } } }
    ]);

    const demandSum = totalDemands[0]?.total || 0;
    const outstandingSum = totalDemands[0]?.outstanding || 0;
    const collectionSum = totalCollections[0]?.total || 0;

    return {
      totalReceivables: demandSum,
      totalCollected: collectionSum,
      totalOutstanding: outstandingSum,
      collectionEfficiency: demandSum > 0 ? ((collectionSum / demandSum) * 100).toFixed(1) + '%' : '100%'
    };
  }
}

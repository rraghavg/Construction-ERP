import mongoose, { Schema, Document } from 'mongoose';

export interface IJournalLine {
  accountId: string;
  debit: number;
  credit: number;
  projectId?: string;
  customerId?: string;
  bookingId?: string;
  memo?: string;
}

export interface IJournalEntry extends Document {
  journalNumber: string;
  tenantId: string;
  date: Date;
  sourceModule: string;
  sourceType: string;
  sourceId: string;
  description: string;
  lines: IJournalLine[];
  totalDebit: number;
  totalCredit: number;
  status: 'DRAFT' | 'POSTED';
  postedBy?: string;
  postedAt?: Date;
  createdBy: string;
  createdAt: Date;
  updatedAt: Date;
}

const JournalLineSchema = new Schema(
  {
    accountId: { type: String, required: true },
    debit: { type: Number, default: 0 },
    credit: { type: Number, default: 0 },
    projectId: String,
    customerId: String,
    bookingId: String,
    memo: String
  },
  { _id: false }
);

const JournalEntrySchema: Schema = new Schema(
  {
    journalNumber: { type: String, required: true, unique: true, index: true },
    tenantId: { type: String, required: true, index: true },
    date: { type: Date, default: Date.now, required: true },
    sourceModule: { type: String, required: true, index: true },
    sourceType: { type: String, required: true },
    sourceId: { type: String, required: true },
    description: { type: String, required: true },
    lines: {
      type: [JournalLineSchema],
      validate: [
        function (lines: IJournalLine[]) {
          const sumDebit = lines.reduce((acc, l) => acc + (l.debit || 0), 0);
          const sumCredit = lines.reduce((acc, l) => acc + (l.credit || 0), 0);
          return sumDebit === sumCredit;
        },
        'Double-entry journal invariant failed: Total Debits must equal Total Credits'
      ]
    },
    totalDebit: { type: Number, required: true },
    totalCredit: { type: Number, required: true },
    status: {
      type: String,
      enum: ['DRAFT', 'POSTED'],
      default: 'DRAFT',
      index: true
    },
    postedBy: String,
    postedAt: Date,
    createdBy: { type: String, required: true, default: 'SYSTEM' }
  },
  { timestamps: true }
);

JournalEntrySchema.index({ tenantId: 1, date: 1 });

export const JournalEntryModel = mongoose.model<IJournalEntry>('JournalEntry', JournalEntrySchema);

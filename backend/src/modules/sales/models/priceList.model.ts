import mongoose, { Schema, Document } from 'mongoose';

export interface IPricingComponent {
  code: string;
  name: string;
  type: 'BASE' | 'PLC' | 'FLOOR_RISE' | 'PARKING' | 'CLUB' | 'MAINTENANCE' | 'DISCOUNT' | 'TAX';
  calculationMethod: 'PER_SQFT' | 'FIXED' | 'PERCENTAGE';
  value: number;
}

export interface IPriceList extends Document {
  priceListNumber: string;
  tenantId: string;
  projectId: string;
  name: string;
  version: number;
  baseRatePerSqFt: number;
  floorRisePerFloor: number;
  components: IPricingComponent[];
  effectiveFrom: Date;
  effectiveTo?: Date;
  isActive: boolean;
  createdBy: string;
  createdAt: Date;
  updatedAt: Date;
}

const PricingComponentSchema = new Schema(
  {
    code: { type: String, required: true },
    name: { type: String, required: true },
    type: {
      type: String,
      enum: ['BASE', 'PLC', 'FLOOR_RISE', 'PARKING', 'CLUB', 'MAINTENANCE', 'DISCOUNT', 'TAX'],
      required: true
    },
    calculationMethod: {
      type: String,
      enum: ['PER_SQFT', 'FIXED', 'PERCENTAGE'],
      required: true
    },
    value: { type: Number, required: true }
  },
  { _id: false }
);

const PriceListSchema: Schema = new Schema(
  {
    priceListNumber: { type: String, required: true, unique: true, index: true },
    tenantId: { type: String, required: true, index: true },
    projectId: { type: String, required: true, index: true },
    name: { type: String, required: true, trim: true },
    version: { type: Number, default: 1, required: true },
    baseRatePerSqFt: { type: Number, required: true },
    floorRisePerFloor: { type: Number, default: 50 },
    components: [PricingComponentSchema],
    effectiveFrom: { type: Date, default: Date.now },
    effectiveTo: Date,
    isActive: { type: Boolean, default: true, index: true },
    createdBy: { type: String, required: true, default: 'SYSTEM' }
  },
  { timestamps: true }
);

PriceListSchema.index({ tenantId: 1, projectId: 1, version: 1 }, { unique: true });

export const PriceListModel = mongoose.model<IPriceList>('PriceList', PriceListSchema);

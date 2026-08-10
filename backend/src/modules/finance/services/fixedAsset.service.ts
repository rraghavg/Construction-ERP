import { FixedAssetModel, IFixedAsset } from '../models/fixedAsset.model';

export class FixedAssetService {
  static async registerAsset(tenantId: string, data: any): Promise<IFixedAsset> {
    const assetId = `FAS-${Date.now()}-${Math.floor(Math.random() * 1000)}`;

    const asset = new FixedAssetModel({
      ...data,
      assetId,
      tenantId,
      currentValue: data.purchaseValue,
      status: 'ACTIVE'
    });

    return await asset.save();
  }

  static async listAssets(tenantId: string, filters: any = {}): Promise<IFixedAsset[]> {
    return await FixedAssetModel.find({ tenantId, ...filters }).sort({ createdAt: -1 });
  }

  static async calculateDepreciation(tenantId: string, assetId: string): Promise<IFixedAsset | null> {
    const asset = await FixedAssetModel.findOne({ tenantId, assetId });
    if (!asset) throw new Error('Asset not found');
    
    if (asset.status !== 'ACTIVE') throw new Error('Asset is not active');

    // Simplified depreciation calculation logic
    let depreciationAmount = 0;
    if (asset.depreciationMethod === 'SLM') {
      depreciationAmount = asset.purchaseValue * (asset.depreciationRate / 100);
    } else if (asset.depreciationMethod === 'WDV') {
      depreciationAmount = asset.currentValue * (asset.depreciationRate / 100);
    }
    
    asset.currentValue = Math.max(0, asset.currentValue - depreciationAmount);
    return await asset.save();
  }

  static async disposeAsset(tenantId: string, assetId: string): Promise<IFixedAsset | null> {
    const asset = await FixedAssetModel.findOne({ tenantId, assetId });
    if (!asset) throw new Error('Asset not found');

    asset.status = 'DISPOSED';
    return await asset.save();
  }
}

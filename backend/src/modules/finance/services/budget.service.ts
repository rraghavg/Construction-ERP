import { BudgetModel, IBudget } from '../models/budget.model';

export class BudgetService {
  static async createBudget(tenantId: string, data: any): Promise<IBudget> {
    const budgetId = `BGT-${Date.now()}-${Math.floor(Math.random() * 1000)}`;
    const remainingAmount = data.allocatedAmount;

    const budget = new BudgetModel({
      ...data,
      budgetId,
      tenantId,
      spentAmount: 0,
      remainingAmount,
      status: 'DRAFT'
    });

    return await budget.save();
  }

  static async listBudgets(tenantId: string, filters: any = {}): Promise<IBudget[]> {
    return await BudgetModel.find({ tenantId, ...filters }).sort({ createdAt: -1 });
  }

  static async updateSpent(tenantId: string, budgetId: string, amount: number): Promise<IBudget | null> {
    const budget = await BudgetModel.findOne({ tenantId, budgetId });
    if (!budget) throw new Error('Budget not found');

    budget.spentAmount += amount;
    budget.remainingAmount = budget.allocatedAmount - budget.spentAmount;
    
    return await budget.save();
  }

  static async closeBudget(tenantId: string, budgetId: string): Promise<IBudget | null> {
    const budget = await BudgetModel.findOne({ tenantId, budgetId });
    if (!budget) throw new Error('Budget not found');

    budget.status = 'CLOSED';
    return await budget.save();
  }
}

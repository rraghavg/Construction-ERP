import { ExpenseModel, IExpense } from '../models/expense.model';

export class ExpenseService {
  static async recordExpense(tenantId: string, data: any): Promise<IExpense> {
    const expenseId = `EXP-${Date.now()}-${Math.floor(Math.random() * 1000)}`;

    const expense = new ExpenseModel({
      ...data,
      expenseId,
      tenantId,
      status: 'PENDING_APPROVAL'
    });

    return await expense.save();
  }

  static async listExpenses(tenantId: string, filters: any = {}): Promise<IExpense[]> {
    return await ExpenseModel.find({ tenantId, ...filters }).sort({ createdAt: -1 });
  }

  static async approveExpense(tenantId: string, expenseId: string, approvedBy: string): Promise<IExpense | null> {
    const expense = await ExpenseModel.findOne({ tenantId, expenseId });
    if (!expense) throw new Error('Expense not found');

    expense.status = 'APPROVED';
    expense.approvedBy = approvedBy;
    return await expense.save();
  }

  static async rejectExpense(tenantId: string, expenseId: string): Promise<IExpense | null> {
    const expense = await ExpenseModel.findOne({ tenantId, expenseId });
    if (!expense) throw new Error('Expense not found');

    expense.status = 'REJECTED';
    return await expense.save();
  }

  static async markAsPaid(tenantId: string, expenseId: string): Promise<IExpense | null> {
    const expense = await ExpenseModel.findOne({ tenantId, expenseId });
    if (!expense) throw new Error('Expense not found');
    if (expense.status !== 'APPROVED') throw new Error('Expense must be approved before paying');

    expense.status = 'PAID';
    return await expense.save();
  }
}

import { EmployeeModel, IEmployee } from '../models/employee.model.js';
import { DepartmentModel } from '../models/department.model.js';
import { AttendanceModel, IAttendance } from '../models/attendance.model.js';
import { LeaveRequestModel, ILeaveRequest } from '../models/leaveRequest.model.js';
import { PayrollRunModel, IPayrollRun } from '../models/payrollRun.model.js';
import { FinanceService } from '../../finance/services/finance.service.js';
import { ApiError } from '../../../utils/apiError.js';
import { logAuditEvent } from '../../../shared/audit/audit.model.js';

export class HrService {
  private static empSeq = 100;
  private static leaveSeq = 100;
  private static paySeq = 100;

  // 1. Employee Management
  static async createEmployee(data: Partial<IEmployee> & { tenantId: string; companyId: string; fullName: string; email: string; phone: string; department: string; designation: string; basicSalary: number }): Promise<IEmployee> {
    const employeeNumber = `EMP-2026-${String(++this.empSeq).padStart(6, '0')}`;
    const employeeId = `EMP-${Date.now().toString().slice(-6)}`;
    const emp = new EmployeeModel({
      ...data,
      employeeId,
      employeeNumber
    });
    const saved = await emp.save();
    await logAuditEvent({
      tenantId: data.tenantId,
      actorUserId: 'SYSTEM',
      module: 'hr',
      action: 'EMPLOYEE_CREATED',
      recordType: 'Employee',
      recordId: saved.employeeId,
      status: 'success',
      severity: 'medium'
    });
    return saved;
  }

  static async listEmployees(tenantId: string, companyId?: string): Promise<IEmployee[]> {
    const query: any = { tenantId };
    if (companyId) query.companyId = companyId;
    return await EmployeeModel.find(query).sort({ fullName: 1 });
  }

  // 2. Attendance
  static async recordAttendance(data: { tenantId: string; employeeId: string; date: Date; status: 'PRESENT' | 'ABSENT' | 'HALF_DAY' | 'ON_LEAVE' | 'HOLIDAY'; checkInTime?: string; checkOutTime?: string; remarks?: string }): Promise<IAttendance> {
    const attendanceId = `ATT-${Date.now().toString().slice(-6)}`;
    const attendance = new AttendanceModel({
      ...data,
      attendanceId,
      workHours: data.status === 'PRESENT' ? 8 : data.status === 'HALF_DAY' ? 4 : 0
    });
    return await attendance.save();
  }

  // 3. Leave Requests
  static async submitLeaveRequest(data: { tenantId: string; employeeId: string; leaveType: 'CASUAL' | 'SICK' | 'EARNED' | 'MATERNITY'; startDate: Date; endDate: Date; totalDays: number; reason: string }): Promise<ILeaveRequest> {
    const leaveRequestId = `LR-${Date.now().toString().slice(-6)}`;
    const req = new LeaveRequestModel({
      ...data,
      leaveRequestId,
      status: 'SUBMITTED'
    });
    return await req.save();
  }

  static async approveLeaveRequest(tenantId: string, leaveRequestId: string, approvedBy: string): Promise<ILeaveRequest> {
    const req = await LeaveRequestModel.findOne({ tenantId, leaveRequestId });
    if (!req) {
      throw new ApiError(404, 'LEAVE_NOT_FOUND', 'Leave Request not found');
    }
    req.status = 'APPROVED';
    req.approvedBy = approvedBy;
    return await req.save();
  }

  // 4. Payroll Engine
  static async calculatePayroll(tenantId: string, companyId: string, payrollPeriod: string): Promise<IPayrollRun> {
    const activeEmployees = await EmployeeModel.find({ tenantId, companyId, status: 'ACTIVE' });
    if (activeEmployees.length === 0) {
      throw new ApiError(400, 'NO_ACTIVE_EMPLOYEES', 'No active employees found for payroll run');
    }

    let totalGross = 0;
    let totalDeductions = 0;
    let totalNet = 0;

    const items = activeEmployees.map((emp) => {
      const gross = emp.basicSalary + (emp.allowances || 0);
      const net = gross - (emp.deductions || 0);
      totalGross += gross;
      totalDeductions += (emp.deductions || 0);
      totalNet += net;

      return {
        employeeId: emp.employeeId,
        basicSalary: emp.basicSalary,
        allowances: emp.allowances || 0,
        deductions: emp.deductions || 0,
        grossSalary: gross,
        netSalary: net
      };
    });

    const payrollRunId = `PAY-${Date.now().toString().slice(-6)}`;
    const run = new PayrollRunModel({
      payrollRunId,
      tenantId,
      companyId,
      payrollPeriod,
      status: 'CALCULATED',
      items,
      totalGross,
      totalDeductions,
      totalNet
    });

    return await run.save();
  }

  static async postPayrollToFinance(tenantId: string, payrollRunId: string, postedBy: string): Promise<IPayrollRun> {
    const run = await PayrollRunModel.findOne({ tenantId, payrollRunId });
    if (!run) {
      throw new ApiError(404, 'PAYROLL_NOT_FOUND', 'Payroll Run record not found');
    }
    if (run.status === 'POSTED' || run.status === 'LOCKED') {
      throw new ApiError(400, 'PAYROLL_ALREADY_POSTED', 'Payroll has already been posted to Finance');
    }

    // Double-entry accounting posting: Debit Salary Expense, Credit Bank/Payroll Payable
    const journal = await FinanceService.postJournalEntry({
      tenantId,
      sourceModule: 'hr',
      sourceType: 'PAYROLL_RUN',
      sourceId: run.payrollRunId,
      description: `Payroll Posting for Period ${run.payrollPeriod}`,
      lines: [
        { accountId: '5001', debit: run.totalNet, credit: 0 },
        { accountId: '1001', debit: 0, credit: run.totalNet }
      ],
      createdBy: postedBy
    });

    run.status = 'POSTED';
    run.postedJournalId = journal.journalNumber;
    const updated = await run.save();

    await logAuditEvent({
      tenantId,
      actorUserId: postedBy,
      module: 'hr',
      action: 'PAYROLL_POSTED_TO_FINANCE',
      recordType: 'PayrollRun',
      recordId: payrollRunId,
      status: 'success',
      severity: 'high'
    });

    return updated;
  }

  // 5. HR Analytics
  static async getHrAnalytics(tenantId: string) {
    const totalEmployees = await EmployeeModel.countDocuments({ tenantId, status: 'ACTIVE' });
    const onLeaveCount = await EmployeeModel.countDocuments({ tenantId, status: 'ON_LEAVE' });
    const pendingLeaveReqs = await LeaveRequestModel.countDocuments({ tenantId, status: 'SUBMITTED' });

    const totalSalaryAgg = await EmployeeModel.aggregate([
      { $match: { tenantId, status: 'ACTIVE' } },
      { $group: { _id: null, totalMonthlyCost: { $sum: '$basicSalary' } } }
    ]);

    return {
      activeEmployees: totalEmployees,
      employeesOnLeave: onLeaveCount,
      pendingLeaveRequests: pendingLeaveReqs,
      monthlyPayrollCost: totalSalaryAgg[0]?.totalMonthlyCost || 0
    };
  }
}

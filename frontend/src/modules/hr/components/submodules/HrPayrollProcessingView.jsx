import { memo } from 'react';
import { IndianRupee, Download, Play } from 'lucide-react';
import { useApp } from '../../../../core/providers/AppContext';

export const HrPayrollProcessingView = memo(function HrPayrollProcessingView() {
  const { employees, showToast } = useApp();

  const payrolls = employees.map((e, idx) => ({
    id: `PAY-2026-07-${idx + 1}`,
    name: e.name,
    designation: e.designation,
    basic: '₹ 45,000',
    hra: '₹ 18,000',
    deductions: '₹ 3,600 (PF/ESI)',
    netSalary: '₹ 59,400',
    status: 'DISBURSED'
  }));

  return (
    <div className="anodized-panel" style={{ padding: '1.25rem' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem' }}>
        <div>
          <h3 style={{ fontSize: '1rem', fontWeight: 800, display: 'flex', alignItems: 'center', gap: '8px' }}>
            <IndianRupee size={18} style={{ color: 'var(--precision-blue)' }} />
            Monthly Payroll Processing & Salary Slips Engine
          </h3>
          <p style={{ fontSize: '0.725rem', color: 'var(--text-muted)', marginTop: '2px' }}>
            Salary slip computation, PF/ESI statutory deductions, bank transfer batch, and Form 16
          </p>
        </div>

        <button className="btn btn-primary btn-sm" onClick={() => showToast('Triggered monthly payroll calculation batch', 'success')}>
          <Play size={14} /> RUN MONTHLY PAYROLL
        </button>
      </div>

      <div style={{ overflowX: 'auto' }}>
        <table className="table" style={{ width: '100%', fontSize: '0.75rem' }}>
          <thead>
            <tr>
              <th>PAYSLIP NO.</th>
              <th>EMPLOYEE NAME</th>
              <th>BASIC SALARY</th>
              <th>HRA & ALLOWANCES</th>
              <th>STATUTORY DEDUCTIONS</th>
              <th>NET PAYABLE</th>
              <th>DISBURSEMENT STATUS</th>
              <th>ACTION</th>
            </tr>
          </thead>
          <tbody>
            {payrolls.map((p) => (
              <tr key={p.id}>
                <td className="mono-data" style={{ fontWeight: 700, color: 'var(--precision-blue)' }}>{p.id}</td>
                <td style={{ fontWeight: 700 }}>{p.name}</td>
                <td className="mono-data">{p.basic}</td>
                <td className="mono-data">{p.hra}</td>
                <td className="mono-data" style={{ color: 'var(--amber)' }}>{p.deductions}</td>
                <td className="mono-data" style={{ color: 'var(--emerald)', fontWeight: 700 }}>{p.netSalary}</td>
                <td><span className="badge badge-success">{p.status}</span></td>
                <td>
                  <button className="btn btn-secondary btn-xs" onClick={() => showToast(`Downloaded payslip PDF for ${p.name}`, 'success')}>
                    <Download size={11} /> Payslip PDF
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
});

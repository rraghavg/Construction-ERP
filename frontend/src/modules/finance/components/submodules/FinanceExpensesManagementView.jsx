import { memo } from 'react';
import { IndianRupee, Plus } from 'lucide-react';
import { useApp } from '../../../../core/providers/AppContext';

export const FinanceExpensesManagementView = memo(function FinanceExpensesManagementView() {
  const { showToast } = useApp();

  const expenses = [
    { id: 'EXP-901', payee: 'UltraTech Cement Ltd.', category: 'Raw Materials', amount: '₹ 1,85,000', approvedBy: 'Finance Controller', date: '04 Aug 2026', status: 'PAID' },
    { id: 'EXP-902', payee: 'Shree Construction Labour', category: 'Contractor Payment', amount: '₹ 4,50,000', approvedBy: 'Site Engineer', date: '02 Aug 2026', status: 'PAID' }
  ];

  return (
    <div className="anodized-panel" style={{ padding: '1.25rem' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem' }}>
        <div>
          <h3 style={{ fontSize: '1rem', fontWeight: 800, display: 'flex', alignItems: 'center', gap: '8px' }}>
            <IndianRupee size={18} style={{ color: 'var(--precision-blue)' }} />
            Expenses & Vendor Payment Vouchers Ledger
          </h3>
          <p style={{ fontSize: '0.725rem', color: 'var(--text-muted)', marginTop: '2px' }}>
            Vendor bill verification, contractor RA bill payments, and petty cash disbursements
          </p>
        </div>

        <button className="btn btn-primary btn-sm" onClick={() => showToast('Opened expense voucher form', 'info')}>
          <Plus size={14} /> RECORD EXPENSE VOUCHER
        </button>
      </div>

      <div style={{ overflowX: 'auto' }}>
        <table className="table" style={{ width: '100%', fontSize: '0.75rem' }}>
          <thead>
            <tr>
              <th>VOUCHER NO.</th>
              <th>BENEFICIARY / PAYEE</th>
              <th>EXPENSE CATEGORY</th>
              <th>AMOUNT PAID</th>
              <th>APPROVED BY</th>
              <th>DATE</th>
              <th>STATUS</th>
            </tr>
          </thead>
          <tbody>
            {expenses.map((e) => (
              <tr key={e.id}>
                <td className="mono-data" style={{ fontWeight: 700, color: 'var(--precision-blue)' }}>{e.id}</td>
                <td style={{ fontWeight: 700 }}>{e.payee}</td>
                <td><span className="badge badge-info">{e.category}</span></td>
                <td className="mono-data" style={{ color: 'var(--amber)', fontWeight: 700 }}>{e.amount}</td>
                <td>{e.approvedBy}</td>
                <td className="mono-data">{e.date}</td>
                <td><span className="badge badge-success">{e.status}</span></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
});

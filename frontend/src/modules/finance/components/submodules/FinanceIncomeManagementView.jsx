import { memo } from 'react';
import { IndianRupee, Plus } from 'lucide-react';
import { useApp } from '../../../../core/providers/AppContext';

export const FinanceIncomeManagementView = memo(function FinanceIncomeManagementView({ onOpenIncomeModal }) {
  const { transactions, showToast } = useApp();

  const incomeTxns = transactions.filter((t) => t.type === 'INCOME' || t.category === 'RECEIPT');

  return (
    <div className="anodized-panel" style={{ padding: '1.25rem' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem' }}>
        <div>
          <h3 style={{ fontSize: '1rem', fontWeight: 800, display: 'flex', alignItems: 'center', gap: '8px' }}>
            <IndianRupee size={18} style={{ color: 'var(--precision-blue)' }} />
            Income & Customer Revenue Collections Ledger
          </h3>
          <p style={{ fontSize: '0.725rem', color: 'var(--text-muted)', marginTop: '2px' }}>
            Property sales booking revenue, milestone receipts, and rental income posting
          </p>
        </div>

        <button className="btn btn-primary btn-sm" onClick={onOpenIncomeModal}>
          <Plus size={14} /> RECORD INCOME VOUCHER
        </button>
      </div>

      <div style={{ overflowX: 'auto' }}>
        <table className="table" style={{ width: '100%', fontSize: '0.75rem' }}>
          <thead>
            <tr>
              <th>VOUCHER NO.</th>
              <th>DESCRIPTION / PAYER</th>
              <th>CATEGORY</th>
              <th>AMOUNT RECEIVED</th>
              <th>MODE</th>
              <th>DATE</th>
              <th>STATUS</th>
            </tr>
          </thead>
          <tbody>
            {(incomeTxns.length > 0 ? incomeTxns : transactions).map((t) => (
              <tr key={t.id}>
                <td className="mono-data" style={{ fontWeight: 700, color: 'var(--precision-blue)' }}>{t.id}</td>
                <td style={{ fontWeight: 700 }}>{t.title || t.description}</td>
                <td><span className="badge badge-info">{t.category}</span></td>
                <td className="mono-data" style={{ color: 'var(--emerald)', fontWeight: 700 }}>₹{t.amount}</td>
                <td>{t.mode || 'NEFT / RTGS'}</td>
                <td className="mono-data">{t.date}</td>
                <td><span className="badge badge-success">POSTED</span></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
});

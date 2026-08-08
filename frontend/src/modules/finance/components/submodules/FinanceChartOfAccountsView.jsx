import { memo } from 'react';
import { Database, Plus } from 'lucide-react';
import { useApp } from '../../../../core/providers/AppContext';

export const FinanceChartOfAccountsView = memo(function FinanceChartOfAccountsView() {
  const { showToast } = useApp();

  const accounts = [
    { code: '1000-ASSET', name: 'Current Assets - Bank & Cash', category: 'ASSET', balance: '₹ 14.85 Cr', status: 'ACTIVE' },
    { code: '2000-LIAB', name: 'Vendor Payables & Retention Money', category: 'LIABILITY', balance: '₹ 3.20 Cr', status: 'ACTIVE' },
    { code: '3000-EQUITY', name: 'Share Capital & Reserves', category: 'EQUITY', balance: '₹ 25.00 Cr', status: 'ACTIVE' },
    { code: '4000-REV', name: 'Property Sales Income', category: 'REVENUE', balance: '₹ 42.50 Cr', status: 'ACTIVE' },
    { code: '5000-EXP', name: 'Civil Construction Expenses', category: 'EXPENSE', balance: '₹ 18.70 Cr', status: 'ACTIVE' }
  ];

  return (
    <div className="anodized-panel" style={{ padding: '1.25rem' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem' }}>
        <div>
          <h3 style={{ fontSize: '1rem', fontWeight: 800, display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Database size={18} style={{ color: 'var(--precision-blue)' }} />
            Chart of Accounts (GL Ledger Master)
          </h3>
          <p style={{ fontSize: '0.725rem', color: 'var(--text-muted)', marginTop: '2px' }}>
            Master General Ledger hierarchy, Asset, Liability, Equity, Income, and Expense accounts
          </p>
        </div>

        <button className="btn btn-primary btn-sm" onClick={() => showToast('Opened GL account creator', 'info')}>
          <Plus size={14} /> NEW GL ACCOUNT
        </button>
      </div>

      <div style={{ overflowX: 'auto' }}>
        <table className="table" style={{ width: '100%', fontSize: '0.75rem' }}>
          <thead>
            <tr>
              <th>GL CODE</th>
              <th>ACCOUNT NAME</th>
              <th>CATEGORY TYPE</th>
              <th>CURRENT BALANCE</th>
              <th>STATUS</th>
            </tr>
          </thead>
          <tbody>
            {accounts.map((a) => (
              <tr key={a.code}>
                <td className="mono-data" style={{ fontWeight: 700, color: 'var(--precision-blue)' }}>{a.code}</td>
                <td style={{ fontWeight: 700 }}>{a.name}</td>
                <td><span className="badge badge-info">{a.category}</span></td>
                <td className="mono-data" style={{ fontWeight: 700, color: 'var(--emerald)' }}>{a.balance}</td>
                <td><span className="badge badge-success">{a.status}</span></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
});

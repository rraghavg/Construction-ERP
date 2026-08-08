import { memo } from 'react';
import { IndianRupee, RefreshCw } from 'lucide-react';
import { useApp } from '../../../../core/providers/AppContext';

export const FinanceBankingReconciliationView = memo(function FinanceBankingReconciliationView() {
  const { bankAccounts, showToast } = useApp();

  return (
    <div className="anodized-panel" style={{ padding: '1.25rem' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem' }}>
        <div>
          <h3 style={{ fontSize: '1rem', fontWeight: 800, display: 'flex', alignItems: 'center', gap: '8px' }}>
            <IndianRupee size={18} style={{ color: 'var(--precision-blue)' }} />
            Bank Accounts & Statement Reconciliation Portal
          </h3>
          <p style={{ fontSize: '0.725rem', color: 'var(--text-muted)', marginTop: '2px' }}>
            Multi-bank ESCROW account balances, cheque clearance tracking, and bank feed reconciliation
          </p>
        </div>

        <button className="btn btn-primary btn-sm" onClick={() => showToast('Triggered bank statement auto-reconciliation', 'info')}>
          <RefreshCw size={14} /> AUTO RECONCILE
        </button>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '1rem' }}>
        {bankAccounts.map((b) => (
          <div key={b.id} className="anodized-panel" style={{ padding: '1.25rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
              <span style={{ fontWeight: 800, fontSize: '0.9rem' }}>{b.bankName}</span>
              <span className="badge badge-info mono-data">{b.type || 'ESCROW'}</span>
            </div>
            <div className="mono-data" style={{ fontSize: '0.725rem', color: 'var(--text-muted)', marginBottom: '0.75rem' }}>Acc No: {b.accountNumber}</div>

            <div style={{ fontSize: '1.1rem', fontWeight: 800, color: 'var(--emerald)', marginBottom: '0.75rem' }} className="mono-data">
              ₹{b.balance}
            </div>

            <button className="btn btn-secondary btn-xs" style={{ width: '100%' }} onClick={() => showToast(`Reconciled statement for ${b.bankName}`, 'success')}>
              Reconcile Bank Feed
            </button>
          </div>
        ))}
      </div>
    </div>
  );
});

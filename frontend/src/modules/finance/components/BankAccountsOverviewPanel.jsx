import { memo, useCallback } from 'react';
import { useApp } from '../../../core/providers/AppContext';
import { REGISTERED_BANK_ACCOUNTS_LIST } from '../../../data/mockData';
import { CreditCard, Landmark } from 'lucide-react';
import { PanelHeader } from '../../../shared/components/PanelHeader';

export const BankAccountsOverviewPanel = memo(function BankAccountsOverviewPanel() {
  const { bankAccounts, navigateTo } = useApp();

  const handleAction = useCallback(() => {
    navigateTo('finance', 'Banking & Reconciliation');
  }, [navigateTo]);

  return (
    <div className="panel-card" style={{ padding: '1.25rem' }}>
      <PanelHeader
        title="Bank Accounts Overview"
        icon={<Landmark size={15} color="var(--precision-blue)" />}
        accentColor="#2563eb"
        actionLabel="VIEW ALL BANK ACCOUNTS →"
        onAction={handleAction}
      />

      <div style={{ overflowX: 'auto', border: '1px solid var(--border-color)', borderRadius: '4px' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.775rem' }} aria-label="Bank accounts overview table">
          <thead>
            <tr style={{ background: 'var(--bg-input)', borderBottom: '1px solid var(--border-color)', fontSize: '0.675rem', color: 'var(--text-muted)' }}>
              <th style={{ padding: '0.5rem 0.65rem' }}>BANK NAME</th>
              <th style={{ padding: '0.5rem 0.65rem' }}>ACCOUNT NO.</th>
              <th style={{ padding: '0.5rem 0.65rem' }}>ACCOUNT TYPE</th>
              <th style={{ padding: '0.5rem 0.65rem', textAlign: 'right' }}>BALANCE (₹)</th>
            </tr>
          </thead>
          <tbody>
            {(bankAccounts || REGISTERED_BANK_ACCOUNTS_LIST).map((acc) => (
              <tr key={acc.id} style={{ borderBottom: '1px solid var(--border-color)' }}>
                <td style={{ padding: '0.65rem 0.65rem', fontWeight: '700' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <CreditCard size={14} color="var(--precision-blue)" aria-hidden="true" />
                    {acc.name}
                  </div>
                </td>
                <td className="mono-data" style={{ padding: '0.65rem 0.65rem', color: 'var(--text-muted)' }}>
                  {acc.accountNo}
                </td>
                <td style={{ padding: '0.65rem 0.65rem' }}>
                  <span className="badge badge-info mono-data" style={{ fontSize: '0.625rem' }}>
                    {acc.type}
                  </span>
                </td>
                <td className="mono-data" style={{ padding: '0.65rem 0.65rem', textAlign: 'right', fontWeight: '800', color: '#16a34a' }}>
                  {acc.balance}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
});

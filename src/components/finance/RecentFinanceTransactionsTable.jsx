import { useMemo, memo, useCallback } from 'react';
import { useApp } from '../../context/AppContext';
import { Eye, Plus, TrendingUp } from 'lucide-react';
import { PanelHeader } from '../shared/PanelHeader';

export const FinanceTxnTypeBadge = memo(function FinanceTxnTypeBadge({ type }) {
  let badgeStyle = { bg: 'rgba(22, 163, 74, 0.12)', color: '#15803d', border: 'rgba(22, 163, 74, 0.3)' };

  if (type === 'Payment') {
    badgeStyle = { bg: 'rgba(220, 38, 38, 0.12)', color: '#b91c1c', border: 'rgba(220, 38, 38, 0.3)' };
  } else if (type === 'Journal') {
    badgeStyle = { bg: 'rgba(139, 92, 246, 0.12)', color: '#6d28d9', border: 'rgba(139, 92, 246, 0.3)' };
  }

  return (
    <span
      className="badge mono-data"
      style={{
        background: badgeStyle.bg,
        color: badgeStyle.color,
        border: `1px solid ${badgeStyle.border}`,
        fontSize: '0.65rem'
      }}
    >
      {type}
    </span>
  );
});

export const FinanceStatusBadge = memo(function FinanceStatusBadge({ status }) {
  let badgeStyle = { bg: 'rgba(22, 163, 74, 0.12)', color: '#15803d', border: 'rgba(22, 163, 74, 0.3)' };

  if (status === 'Received') {
    badgeStyle = { bg: 'rgba(37, 99, 235, 0.12)', color: '#1d4ed8', border: 'rgba(37, 99, 235, 0.3)' };
  } else if (status === 'Posted') {
    badgeStyle = { bg: 'rgba(100, 116, 139, 0.12)', color: '#475569', border: 'rgba(100, 116, 139, 0.3)' };
  } else if (status === 'Overdue') {
    badgeStyle = { bg: 'rgba(220, 38, 38, 0.12)', color: '#b91c1c', border: 'rgba(220, 38, 38, 0.3)' };
  } else if (status === 'Partial') {
    badgeStyle = { bg: 'rgba(245, 158, 11, 0.12)', color: '#b45309', border: 'rgba(245, 158, 11, 0.3)' };
  }

  return (
    <span
      className="badge mono-data"
      style={{
        background: badgeStyle.bg,
        color: badgeStyle.color,
        border: `1px solid ${badgeStyle.border}`,
        fontSize: '0.65rem'
      }}
    >
      {status}
    </span>
  );
});

export const RecentFinanceTransactionsTable = memo(function RecentFinanceTransactionsTable({ onOpenAddModal, onSelectTxn }) {
  const { financeTransactions, selectedFinanceTxn, setSelectedFinanceTxn, navigateTo } = useApp();

  const handleTxnSelect = useCallback((item) => {
    setSelectedFinanceTxn(item);
    onSelectTxn(item);
  }, [setSelectedFinanceTxn, onSelectTxn]);

  const handleTxnKeyDown = useCallback((e, item) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      handleTxnSelect(item);
    }
  }, [handleTxnSelect]);

  return (
    <div className="panel-card" style={{ padding: '1.25rem' }}>
      <PanelHeader
        title="Recent Financial Transactions Feed"
        accentColor="#2563eb"
        actionLabel="VIEW ALL TRANSACTIONS →"
        onAction={() => navigateTo('finance', 'Income Management')}
      >
        <button
          className="btn btn-primary btn-sm"
          onClick={onOpenAddModal}
          aria-label="Record Income Entry"
        >
          <TrendingUp size={14} aria-hidden="true" /> RECORD INCOME
        </button>
      </PanelHeader>

      <div style={{ overflowX: 'auto', border: '1px solid var(--border-color)', borderRadius: '4px' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.8rem' }} aria-label="Recent financial transactions table">
          <thead>
            <tr style={{ background: 'var(--bg-input)', borderBottom: '1px solid var(--border-color)', fontSize: '0.7rem', color: 'var(--text-muted)' }}>
              <th style={{ padding: '0.65rem 0.75rem' }}>DATE</th>
              <th style={{ padding: '0.65rem 0.75rem' }}>TYPE</th>
              <th style={{ padding: '0.65rem 0.75rem' }}>VOUCHER NO.</th>
              <th style={{ padding: '0.65rem 0.75rem' }}>DESCRIPTION</th>
              <th style={{ padding: '0.65rem 0.75rem' }}>LEDGER / PARTY</th>
              <th style={{ padding: '0.65rem 0.75rem' }}>PROJECT</th>
              <th style={{ padding: '0.65rem 0.75rem' }}>AMOUNT (₹)</th>
              <th style={{ padding: '0.65rem 0.75rem' }}>STATUS</th>
              <th style={{ padding: '0.65rem 0.75rem', textAlign: 'right' }}>ACTIONS</th>
            </tr>
          </thead>
          <tbody>
            {financeTransactions.slice(0, 5).map((item) => {
              const isSelected = selectedFinanceTxn?.id === item.id;

              return (
                <tr
                  key={item.id}
                  tabIndex={0}
                  role="button"
                  onClick={() => handleTxnSelect(item)}
                  onKeyDown={(e) => handleTxnKeyDown(e, item)}
                  aria-selected={isSelected}
                  style={{
                    borderBottom: '1px solid var(--border-color)',
                    background: isSelected ? 'rgba(37, 99, 235, 0.08)' : 'transparent',
                    cursor: 'pointer',
                    transition: 'background 0.2s ease'
                  }}
                >
                  <td className="mono-data" style={{ padding: '0.75rem', fontSize: '0.725rem' }}>
                    {item.date}
                  </td>
                  <td style={{ padding: '0.75rem' }}>
                    <FinanceTxnTypeBadge type={item.type} />
                  </td>
                  <td className="mono-data" style={{ padding: '0.75rem', fontWeight: '700', color: 'var(--precision-blue)' }}>
                    {item.voucherNo}
                  </td>
                  <td style={{ padding: '0.75rem', fontWeight: '700' }}>
                    {item.description}
                  </td>
                  <td style={{ padding: '0.75rem', fontSize: '0.725rem' }}>
                    {item.ledgerParty}
                  </td>
                  <td style={{ padding: '0.75rem', fontSize: '0.725rem' }}>
                    {item.project}
                  </td>
                  <td className="mono-data" style={{ padding: '0.75rem', fontWeight: '800', color: item.type === 'Receipt' ? '#16a34a' : 'var(--text-main)' }}>
                    {item.amount}
                  </td>
                  <td style={{ padding: '0.75rem' }}>
                    <FinanceStatusBadge status={item.status} />
                  </td>
                  <td style={{ padding: '0.75rem', textAlign: 'right' }}>
                    <button
                      className="btn btn-secondary btn-sm"
                      style={{ padding: '3px 7px' }}
                      onClick={(e) => {
                        e.stopPropagation();
                        handleTxnSelect(item);
                      }}
                      title="View Voucher Details"
                      aria-label={`View details for ${item.voucherNo}`}
                    >
                      <Eye size={12} aria-hidden="true" />
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
});

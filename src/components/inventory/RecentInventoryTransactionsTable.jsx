import { useMemo, memo, useCallback } from 'react';
import { useApp } from '../../context/AppContext';
import { Eye, Plus, Send } from 'lucide-react';
import { PanelHeader } from '../shared/PanelHeader';

export const InventoryTxnTypeBadge = memo(function InventoryTxnTypeBadge({ type }) {
  let badgeStyle = { bg: 'rgba(22, 163, 74, 0.12)', color: '#15803d', border: 'rgba(22, 163, 74, 0.3)' };

  if (type === 'ISSUE') {
    badgeStyle = { bg: 'rgba(37, 99, 235, 0.12)', color: '#1d4ed8', border: 'rgba(37, 99, 235, 0.3)' };
  } else if (type === 'TRANSFER') {
    badgeStyle = { bg: 'rgba(139, 92, 246, 0.12)', color: '#6d28d9', border: 'rgba(139, 92, 246, 0.3)' };
  } else if (type === 'CONSUMPTION') {
    badgeStyle = { bg: 'rgba(245, 158, 11, 0.12)', color: '#b45309', border: 'rgba(245, 158, 11, 0.3)' };
  } else if (type === 'ADJUSTMENT') {
    badgeStyle = { bg: 'rgba(220, 38, 38, 0.12)', color: '#b91c1c', border: 'rgba(220, 38, 38, 0.3)' };
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

export const RecentInventoryTransactionsTable = memo(function RecentInventoryTransactionsTable({ onOpenAddModal, onSelectTxn }) {
  const { inventoryTransactions, selectedInventoryTxn, setSelectedInventoryTxn, navigateTo } = useApp();

  const handleTxnSelect = useCallback((item) => {
    setSelectedInventoryTxn(item);
    onSelectTxn(item);
  }, [setSelectedInventoryTxn, onSelectTxn]);

  const handleTxnKeyDown = useCallback((e, item) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      handleTxnSelect(item);
    }
  }, [handleTxnSelect]);

  return (
    <div className="panel-card" style={{ padding: '1.25rem' }}>
      <PanelHeader
        title="Recent Inventory Transactions Feed"
        accentColor="#2563eb"
        actionLabel="VIEW ALL TRANSACTIONS →"
        onAction={() => navigateTo('inventory', 'Stock Issue')}
      >
        <button
          className="btn btn-primary btn-sm"
          onClick={onOpenAddModal}
          aria-label="Record Material Issue"
        >
          <Send size={14} aria-hidden="true" /> RECORD MATERIAL ISSUE
        </button>
      </PanelHeader>

      <div style={{ overflowX: 'auto', border: '1px solid var(--border-color)', borderRadius: '4px' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.8rem' }} aria-label="Recent inventory transactions table">
          <thead>
            <tr style={{ background: 'var(--bg-input)', borderBottom: '1px solid var(--border-color)', fontSize: '0.7rem', color: 'var(--text-muted)' }}>
              <th style={{ padding: '0.65rem 0.75rem' }}>DATE</th>
              <th style={{ padding: '0.65rem 0.75rem' }}>TYPE</th>
              <th style={{ padding: '0.65rem 0.75rem' }}>REF NO.</th>
              <th style={{ padding: '0.65rem 0.75rem' }}>MATERIAL ITEM</th>
              <th style={{ padding: '0.65rem 0.75rem' }}>QUANTITY & UNIT</th>
              <th style={{ padding: '0.65rem 0.75rem' }}>WAREHOUSE / SITE</th>
              <th style={{ padding: '0.65rem 0.75rem' }}>OPERATOR / USER</th>
              <th style={{ padding: '0.65rem 0.75rem', textAlign: 'right' }}>ACTIONS</th>
            </tr>
          </thead>
          <tbody>
            {inventoryTransactions.slice(0, 5).map((item) => {
              const isSelected = selectedInventoryTxn?.id === item.id;

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
                    <InventoryTxnTypeBadge type={item.type} />
                  </td>
                  <td className="mono-data" style={{ padding: '0.75rem', fontWeight: '700', color: 'var(--precision-blue)' }}>
                    {item.refNo}
                  </td>
                  <td style={{ padding: '0.75rem', fontWeight: '700' }}>
                    {item.item}
                  </td>
                  <td className="mono-data" style={{ padding: '0.75rem', fontWeight: '800' }}>
                    {item.qty}
                  </td>
                  <td style={{ padding: '0.75rem', fontSize: '0.725rem' }}>
                    {item.warehouseSite}
                  </td>
                  <td style={{ padding: '0.75rem', fontSize: '0.725rem', color: 'var(--text-muted)' }}>
                    {item.user}
                  </td>
                  <td style={{ padding: '0.75rem', textAlign: 'right' }}>
                    <button
                      className="btn btn-secondary btn-sm"
                      style={{ padding: '3px 7px' }}
                      onClick={(e) => {
                        e.stopPropagation();
                        handleTxnSelect(item);
                      }}
                      title="View Transaction Details"
                      aria-label={`View details for ${item.refNo}`}
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

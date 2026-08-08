import { useMemo, memo, useCallback } from 'react';
import { useApp } from '../../../core/providers/AppContext';
import { Eye, Plus } from 'lucide-react';
import { PanelHeader } from '../../../shared/components/PanelHeader';

export const RentStatusBadge = memo(function RentStatusBadge({ status }) {
  let badgeStyle = { bg: 'rgba(22, 163, 74, 0.12)', color: '#15803d', border: 'rgba(22, 163, 74, 0.3)' };

  if (status === 'Partial') {
    badgeStyle = { bg: 'rgba(249, 115, 22, 0.12)', color: '#c2410c', border: 'rgba(249, 115, 22, 0.3)' };
  } else if (status === 'Overdue') {
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
      {status}
    </span>
  );
});

export const RecentRentCollectionsTable = memo(function RecentRentCollectionsTable({ onOpenAddModal, onSelectCollection }) {
  const { rentCollections, selectedRentCollection, setSelectedRentCollection, activePermissions, navigateTo, showToast } = useApp();

  const handleCollectionSelect = useCallback((item) => {
    setSelectedRentCollection(item);
    onSelectCollection(item);
  }, [setSelectedRentCollection, onSelectCollection]);

  const handleCollectionKeyDown = useCallback((e, item) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      handleCollectionSelect(item);
    }
  }, [handleCollectionSelect]);

  const handlePrintReceipt = useCallback((e, item) => {
    e.stopPropagation();
    showToast(`Generating printable rent receipt for ${item.receiptNo}...`, 'info');
  }, [showToast]);

  return (
    <div className="panel-card" style={{ padding: '1.25rem' }}>
      <PanelHeader
        title="Recent Rent Collections Register"
        accentColor="#2563eb"
        actionLabel="ALL RENT COLLECTIONS"
        onAction={() => navigateTo('rental-mgmt', 'Rent Collection')}
      >
        <button
          className="btn btn-primary btn-sm"
          onClick={onOpenAddModal}
          aria-label="Record Rent Collection"
        >
          <Plus size={14} aria-hidden="true" /> RECORD COLLECTION
        </button>
      </PanelHeader>

      <div style={{ overflowX: 'auto', border: '1px solid var(--border-color)', borderRadius: '4px' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.8rem' }} aria-label="Recent rent collections table">
          <thead>
            <tr style={{ background: 'var(--bg-input)', borderBottom: '1px solid var(--border-color)', fontSize: '0.7rem', color: 'var(--text-muted)' }}>
              <th style={{ padding: '0.65rem 0.75rem' }}>RECEIPT NO.</th>
              <th style={{ padding: '0.65rem 0.75rem' }}>TENANT NAME</th>
              <th style={{ padding: '0.65rem 0.75rem' }}>UNIT & PROJECT</th>
              <th style={{ padding: '0.65rem 0.75rem' }}>RENT MONTH</th>
              <th style={{ padding: '0.65rem 0.75rem' }}>COLLECTED AMOUNT</th>
              <th style={{ padding: '0.65rem 0.75rem' }}>PAID DATE</th>
              <th style={{ padding: '0.65rem 0.75rem' }}>PAYMENT STATUS</th>
              <th style={{ padding: '0.65rem 0.75rem', textAlign: 'right' }}>ACTIONS</th>
            </tr>
          </thead>
          <tbody>
            {rentCollections.map((item) => {
              const isSelected = selectedRentCollection?.id === item.id;

              return (
                <tr
                  key={item.id}
                  tabIndex={0}
                  role="button"
                  onClick={() => handleCollectionSelect(item)}
                  onKeyDown={(e) => handleCollectionKeyDown(e, item)}
                  aria-selected={isSelected}
                  style={{
                    borderBottom: '1px solid var(--border-color)',
                    background: isSelected ? 'rgba(37, 99, 235, 0.08)' : 'transparent',
                    cursor: 'pointer',
                    transition: 'background 0.2s ease'
                  }}
                >
                  <td className="mono-data" style={{ padding: '0.75rem', fontWeight: '700', color: 'var(--precision-blue)' }}>
                    {item.receiptNo}
                  </td>
                  <td style={{ padding: '0.75rem', fontWeight: '700' }}>
                    {item.tenantName}
                  </td>
                  <td style={{ padding: '0.75rem' }}>
                    <div style={{ fontWeight: '700' }}>{item.unit}</div>
                    <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>{item.project}</div>
                  </td>
                  <td className="mono-data" style={{ padding: '0.75rem', fontSize: '0.725rem' }}>
                    {item.rentMonth}
                  </td>
                  <td className="mono-data" style={{ padding: '0.75rem', fontWeight: '800', color: '#16a34a' }}>
                    {activePermissions.maskedFinance ? '₹ *** MASKED' : item.amount}
                  </td>
                  <td className="mono-data" style={{ padding: '0.75rem', fontSize: '0.725rem' }}>
                    {item.paidDate}
                  </td>
                  <td style={{ padding: '0.75rem' }}>
                    <RentStatusBadge status={item.status} />
                  </td>
                  <td style={{ padding: '0.75rem', textAlign: 'right' }}>
                    <div style={{ display: 'inline-flex', gap: '4px' }}>
                      <button
                        className="btn btn-secondary btn-sm"
                        style={{ padding: '3px 7px' }}
                        onClick={(e) => {
                          e.stopPropagation();
                          handleCollectionSelect(item);
                        }}
                        title="View Details"
                        aria-label={`View details for ${item.receiptNo}`}
                      >
                        <Eye size={12} aria-hidden="true" />
                      </button>
                      <button
                        className="btn btn-secondary btn-sm"
                        style={{ padding: '3px 7px' }}
                        onClick={(e) => handlePrintReceipt(e, item)}
                        title="Print Receipt"
                        aria-label={`Print receipt ${item.receiptNo}`}
                      >
                        PRINT
                      </button>
                    </div>
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

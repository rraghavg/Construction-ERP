import { memo, useCallback } from 'react';
import { useApp } from '../../context/AppContext';
import { AlertCircle, Send } from 'lucide-react';
import { PanelHeader } from '../shared/PanelHeader';
import { MaskedOverlay } from '../shared/MaskedOverlay';

export const OverdueInstallmentsPanel = memo(function OverdueInstallmentsPanel({ onOpenDemandModal }) {
  const { overdueInstallments, activePermissions, navigateTo } = useApp();

  const handleAction = useCallback(() => {
    navigateTo('sales', 'Installments');
  }, [navigateTo]);

  return (
    <div className="panel-card" style={{ padding: '1.25rem' }}>
      <PanelHeader
        title="Overdue Installments"
        icon={<AlertCircle size={15} color="#dc2626" />}
        accentColor="#dc2626"
        actionLabel="VIEW OVERDUES"
        onAction={handleAction}
      />

      {activePermissions.maskedFinance ? (
        <MaskedOverlay label="OVERDUES_MASKED" height="180px" />
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem' }}>
          {overdueInstallments.map((item) => (
            <div
              key={item.id}
              className="structural-card"
              style={{
                padding: '0.65rem',
                marginBottom: 0,
                borderLeft: item.severe ? '3px solid #dc2626' : '1px solid var(--border-color)'
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span className="mono-data" style={{ fontWeight: '800', fontSize: '0.75rem', color: '#dc2626' }}>
                  {item.installmentNo}
                </span>
                <span className={`badge ${item.severe ? 'badge-danger' : 'badge-warning'}`}>
                  {item.daysOverdue}D OVERDUE
                </span>
              </div>

              <div style={{ fontWeight: '700', fontSize: '0.775rem', marginTop: '2px' }}>
                {item.customerName}
              </div>
              <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>
                {item.unit}
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '6px', paddingTop: '4px', borderTop: '1px solid var(--border-color)' }}>
                <span className="mono-data" style={{ fontWeight: '800', fontSize: '0.775rem', color: '#dc2626' }}>
                  {item.amount}
                </span>

                <button
                  className="btn btn-secondary btn-sm"
                  style={{ padding: '2px 6px', fontSize: '0.65rem' }}
                  onClick={() => onOpenDemandModal(item)}
                  title="Send Demand Letter"
                  aria-label={`Send demand letter to ${item.customerName}`}
                >
                  <Send size={11} aria-hidden="true" /> DEMAND NOTICE
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
});

import { memo, useCallback } from 'react';
import { useApp } from '../../../core/providers/AppContext';
import { Clock, Calendar } from 'lucide-react';
import { PanelHeader } from '../../../shared/components/PanelHeader';
import { MaskedOverlay } from '../../../shared/components/MaskedOverlay';

export const UpcomingInstallmentsPanel = memo(function UpcomingInstallmentsPanel() {
  const { upcomingInstallments, activePermissions, navigateTo } = useApp();

  const handleAction = useCallback(() => {
    navigateTo('sales', 'Installments');
  }, [navigateTo]);

  return (
    <div className="panel-card" style={{ padding: '1.25rem' }}>
      <PanelHeader
        title="Upcoming Installments"
        icon={<Clock size={15} color="var(--precision-blue)" />}
        accentColor="#2563eb"
        actionLabel="VIEW ALL"
        onAction={handleAction}
      />

      {activePermissions.maskedFinance ? (
        <MaskedOverlay label="INSTALLMENTS_MASKED" height="180px" />
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem' }}>
          {upcomingInstallments.map((item) => (
            <div
              key={item.id}
              className="structural-card"
              style={{
                padding: '0.65rem',
                marginBottom: 0,
                borderLeft: item.urgent ? '3px solid var(--color-warning)' : '1px solid var(--border-color)'
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span className="mono-data" style={{ fontWeight: '800', fontSize: '0.75rem', color: 'var(--precision-blue)' }}>
                  {item.installmentNo}
                </span>
                <span className={`badge ${item.urgent ? 'badge-warning' : 'badge-info'}`}>
                  {item.urgent ? `DUE IN ${item.daysRemaining}D` : 'UPCOMING'}
                </span>
              </div>

              <div style={{ fontWeight: '700', fontSize: '0.775rem', marginTop: '2px' }}>
                {item.customerName}
              </div>
              <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>
                {item.unit}
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '6px', paddingTop: '4px', borderTop: '1px solid var(--border-color)' }}>
                <span className="mono-data" style={{ fontSize: '0.675rem', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '3px' }}>
                  <Calendar size={11} aria-hidden="true" /> {item.dueDate}
                </span>
                <span className="mono-data" style={{ fontWeight: '800', fontSize: '0.775rem' }}>
                  {item.amount}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
});

import { memo, useCallback } from 'react';
import { useApp } from '../../context/AppContext';
import { Clock, RefreshCw } from 'lucide-react';
import { PanelHeader } from '../shared/PanelHeader';

export const UpcomingRenewalsPanel = memo(function UpcomingRenewalsPanel({ onOpenRenewalModal }) {
  const { upcomingRenewals, renewLeaseAgreement, navigateTo } = useApp();

  const handleAction = useCallback(() => {
    navigateTo('rental-mgmt', 'Lease Renewals');
  }, [navigateTo]);

  return (
    <div className="panel-card" style={{ padding: '1.25rem' }}>
      <PanelHeader
        title="Upcoming Lease Renewals"
        icon={<Clock size={15} color="var(--precision-blue)" />}
        accentColor="#2563eb"
        actionLabel="ALL RENEWALS"
        onAction={handleAction}
      />

      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem' }}>
        {upcomingRenewals.map((item) => (
          <div
            key={item.id}
            className="structural-card"
            style={{
              padding: '0.65rem',
              marginBottom: 0,
              borderLeft: item.urgent ? '3px solid #dc2626' : '1px solid var(--border-color)'
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span className="mono-data" style={{ fontWeight: '800', fontSize: '0.75rem', color: 'var(--precision-blue)' }}>
                {item.id}
              </span>
              <span className={`badge ${item.urgent ? 'badge-danger' : 'badge-warning'}`}>
                {item.daysLeft}D REMAINING
              </span>
            </div>

            <div style={{ fontWeight: '700', fontSize: '0.775rem', marginTop: '2px' }}>
              {item.tenantName}
            </div>
            <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>
              {item.unit} ({item.project})
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '6px', paddingTop: '4px', borderTop: '1px solid var(--border-color)' }}>
              <span className="mono-data" style={{ fontSize: '0.675rem', color: 'var(--text-muted)' }}>
                Expires: {item.endDate}
              </span>

              <button
                className="btn btn-secondary btn-sm"
                style={{ padding: '2px 6px', fontSize: '0.65rem' }}
                onClick={() => renewLeaseAgreement(item.id)}
                title="Process Renewal"
                aria-label={`Renew lease for ${item.tenantName}`}
              >
                <RefreshCw size={11} aria-hidden="true" /> RENEW LEASE
              </button>
            </div>
          </div>
        ))}

        {upcomingRenewals.length === 0 && (
          <div style={{ padding: '1.5rem', textAlign: 'center', color: 'var(--text-muted)' }} className="mono-data">
            NO_PENDING_LEASE_RENEWALS
          </div>
        )}
      </div>
    </div>
  );
});

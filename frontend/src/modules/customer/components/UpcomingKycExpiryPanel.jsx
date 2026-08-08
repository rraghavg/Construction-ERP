import { memo, useCallback } from 'react';
import { useApp } from '../../../core/providers/AppContext';
import { ShieldAlert, CheckCircle2 } from 'lucide-react';
import { PanelHeader } from '../../../shared/components/PanelHeader';

export const UpcomingKycExpiryPanel = memo(function UpcomingKycExpiryPanel({ onSelectCustomerById }) {
  const { upcomingKycExpiry, updateCustomerKyc, navigateTo } = useApp();

  const handleAction = useCallback(() => {
    navigateTo('customer-mgmt', 'KYC Documents');
  }, [navigateTo]);

  return (
    <div className="panel-card" style={{ padding: '1.25rem' }}>
      <PanelHeader
        title="Upcoming KYC Expiry Alerts"
        icon={<ShieldAlert size={15} color="#dc2626" />}
        accentColor="#dc2626"
        actionLabel="ALL EXPIRING KYC"
        onAction={handleAction}
      />

      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem' }}>
        {upcomingKycExpiry.map((item) => (
          <div
            key={item.id}
            className="structural-card"
            style={{
              padding: '0.65rem',
              marginBottom: 0,
              borderLeft: item.urgent ? '3px solid #dc2626' : '1px solid var(--border-color)',
              cursor: 'pointer'
            }}
            onClick={() => onSelectCustomerById(item.customerId)}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span className="mono-data" style={{ fontWeight: '800', fontSize: '0.75rem', color: 'var(--precision-blue)' }}>
                {item.customerId}
              </span>
              <span className={`badge ${item.urgent ? 'badge-danger' : 'badge-warning'}`}>
                EXPIRING IN {item.daysRemaining}D
              </span>
            </div>

            <div style={{ fontWeight: '700', fontSize: '0.775rem', marginTop: '2px' }}>
              {item.customerName}
            </div>
            <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>
              {item.documentType}
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '6px', paddingTop: '4px', borderTop: '1px solid var(--border-color)' }}>
              <span className="mono-data" style={{ fontSize: '0.675rem', color: 'var(--text-muted)' }}>
                Exp: {item.expiryDate}
              </span>

              <button
                className="btn btn-secondary btn-sm"
                style={{ padding: '2px 6px', fontSize: '0.65rem' }}
                onClick={(e) => {
                  e.stopPropagation();
                  updateCustomerKyc(item.customerId, 'Verified');
                }}
                title="Verify Document Now"
                aria-label={`Verify KYC for ${item.customerName}`}
              >
                <CheckCircle2 size={11} aria-hidden="true" color="#16a34a" /> VERIFY NOW
              </button>
            </div>
          </div>
        ))}

        {upcomingKycExpiry.length === 0 && (
          <div style={{ padding: '1.5rem', textAlign: 'center', color: 'var(--text-muted)' }} className="mono-data">
            ALL_KYC_DOCUMENTS_UP_TO_DATE
          </div>
        )}
      </div>
    </div>
  );
});

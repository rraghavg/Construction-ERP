import { memo, useCallback } from 'react';
import { useApp } from '../../context/AppContext';
import { Receipt } from 'lucide-react';
import { PanelHeader } from '../shared/PanelHeader';
import { MaskedOverlay } from '../shared/MaskedOverlay';

export const RecentReceiptsPanel = memo(function RecentReceiptsPanel() {
  const { recentReceipts, activePermissions, navigateTo } = useApp();

  const handleAction = useCallback(() => {
    navigateTo('sales', 'Receipts');
  }, [navigateTo]);

  return (
    <div className="panel-card" style={{ padding: '1.25rem' }}>
      <PanelHeader
        title="Recent Receipts"
        icon={<Receipt size={15} color="#16a34a" />}
        accentColor="#16a34a"
        actionLabel="VIEW ALL"
        onAction={handleAction}
      />

      {activePermissions.maskedFinance ? (
        <MaskedOverlay label="RECEIPTS_MASKED" height="180px" />
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem' }}>
          {recentReceipts.map((item) => (
            <div key={item.id} className="structural-card" style={{ padding: '0.65rem', marginBottom: 0 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span className="mono-data" style={{ fontWeight: '800', fontSize: '0.75rem', color: '#16a34a' }}>
                  {item.receiptNo}
                </span>
                <span className="badge badge-success">CREDITED</span>
              </div>

              <div style={{ fontWeight: '700', fontSize: '0.775rem', marginTop: '2px' }}>
                {item.customerName}
              </div>
              <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>
                {item.unit} | {item.mode}
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '6px', paddingTop: '4px', borderTop: '1px solid var(--border-color)' }}>
                <span className="mono-data" style={{ fontSize: '0.675rem', color: 'var(--text-muted)' }}>
                  {item.date}
                </span>
                <span className="mono-data" style={{ fontWeight: '800', fontSize: '0.775rem', color: '#16a34a' }}>
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

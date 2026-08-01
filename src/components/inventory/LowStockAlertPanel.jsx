import { memo, useCallback } from 'react';
import { useApp } from '../../context/AppContext';
import { AlertCircle, PlusCircle } from 'lucide-react';
import { PanelHeader } from '../shared/PanelHeader';

export const LowStockAlertPanel = memo(function LowStockAlertPanel() {
  const { lowStockAlerts, navigateTo, showToast } = useApp();

  const handleAction = useCallback(() => {
    navigateTo('inventory', 'Materials Catalog');
  }, [navigateTo]);

  const handleCreatePo = useCallback((item) => {
    showToast(`Drafting Purchase Order for ${item.item} (${item.deficit})...`, 'info');
    navigateTo('inventory', 'Purchase Orders');
  }, [navigateTo, showToast]);

  return (
    <div className="panel-card" style={{ padding: '1.25rem' }}>
      <PanelHeader
        title="Low Stock Reorder Alerts"
        icon={<AlertCircle size={15} color="#f97316" />}
        accentColor="#f97316"
        actionLabel="VIEW ALL LOW STOCK →"
        onAction={handleAction}
      />

      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem' }}>
        {lowStockAlerts.map((item) => (
          <div
            key={item.id}
            className="structural-card"
            style={{
              padding: '0.65rem',
              marginBottom: 0,
              borderLeft: item.urgent ? '3px solid #dc2626' : '3px solid #f97316'
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span className="mono-data" style={{ fontWeight: '800', fontSize: '0.75rem', color: '#f97316' }}>
                {item.id}
              </span>
              <span className={`badge ${item.urgent ? 'badge-danger' : 'badge-warning'}`}>
                {item.deficit}
              </span>
            </div>

            <div style={{ fontWeight: '700', fontSize: '0.775rem', marginTop: '2px' }}>
              {item.item}
            </div>
            <div className="mono-data" style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>
              Available: <span style={{ color: '#dc2626', fontWeight: 800 }}>{item.available} {item.unit}</span> | Reorder Level: {item.reorderLevel} {item.unit}
            </div>
            <div style={{ fontSize: '0.675rem', color: 'var(--text-muted)' }}>
              Store: {item.warehouseSite}
            </div>

            <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '6px', paddingTop: '4px', borderTop: '1px solid var(--border-color)' }}>
              <button
                className="btn btn-primary btn-sm"
                style={{ padding: '2px 6px', fontSize: '0.65rem' }}
                onClick={() => handleCreatePo(item)}
                title="Create Purchase Order"
                aria-label={`Create purchase order for ${item.item}`}
              >
                <PlusCircle size={11} aria-hidden="true" /> CREATE PO
              </button>
            </div>
          </div>
        ))}

        {lowStockAlerts.length === 0 && (
          <div style={{ padding: '1.5rem', textAlign: 'center', color: 'var(--text-muted)' }} className="mono-data">
            ALL_MATERIALS_ABOVE_REORDER_LEVEL
          </div>
        )}
      </div>
    </div>
  );
});

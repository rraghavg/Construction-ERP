import { memo, useCallback } from 'react';
import { useApp } from '../../../core/providers/AppContext';
import { VENDOR_PERFORMANCE_LIST } from '../../../data/mockData';
import { Star, Truck } from 'lucide-react';
import { PanelHeader } from '../../../shared/components/PanelHeader';

export const VendorPerformanceTable = memo(function VendorPerformanceTable() {
  const { navigateTo } = useApp();

  const handleAction = useCallback(() => {
    navigateTo('maintenance', 'Vendor Assignments');
  }, [navigateTo]);

  return (
    <div className="panel-card" style={{ padding: '1.25rem' }}>
      <PanelHeader
        title="Vendor Performance (This Month)"
        icon={<Truck size={15} color="var(--precision-blue)" />}
        accentColor="#2563eb"
        actionLabel="ALL VENDORS"
        onAction={handleAction}
      />

      <div style={{ overflowX: 'auto', border: '1px solid var(--border-color)', borderRadius: '4px' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.775rem' }} aria-label="Vendor performance table">
          <thead>
            <tr style={{ background: 'var(--bg-input)', borderBottom: '1px solid var(--border-color)', fontSize: '0.675rem', color: 'var(--text-muted)' }}>
              <th style={{ padding: '0.5rem 0.65rem' }}>VENDOR NAME</th>
              <th style={{ padding: '0.5rem 0.65rem' }}>ASSIGNED</th>
              <th style={{ padding: '0.5rem 0.65rem' }}>COMPLETED</th>
              <th style={{ padding: '0.5rem 0.65rem', textAlign: 'right' }}>RATING</th>
            </tr>
          </thead>
          <tbody>
            {VENDOR_PERFORMANCE_LIST.map((v) => (
              <tr key={v.id} style={{ borderBottom: '1px solid var(--border-color)' }}>
                <td style={{ padding: '0.6rem 0.65rem', fontWeight: '700' }}>
                  {v.name}
                </td>
                <td className="mono-data" style={{ padding: '0.6rem 0.65rem', fontWeight: '700' }}>
                  {v.jobsAssigned}
                </td>
                <td className="mono-data" style={{ padding: '0.6rem 0.65rem', color: '#16a34a', fontWeight: '700' }}>
                  {v.jobsCompleted}
                </td>
                <td className="mono-data" style={{ padding: '0.6rem 0.65rem', textAlign: 'right', color: '#f59e0b', fontWeight: '800' }}>
                  {v.stars} ({v.rating}.0)
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
});

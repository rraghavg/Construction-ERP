import { memo, useCallback } from 'react';
import { useApp } from '../../context/AppContext';
import { TOP_CATEGORIES_DATA } from '../../data/mockData';
import { Layers } from 'lucide-react';
import { PanelHeader } from '../shared/PanelHeader';

export const TopCategoriesTable = memo(function TopCategoriesTable() {
  const { navigateTo } = useApp();

  const handleAction = useCallback(() => {
    navigateTo('maintenance', 'SLA / TAT Report');
  }, [navigateTo]);

  return (
    <div className="panel-card" style={{ padding: '1.25rem' }}>
      <PanelHeader
        title="Top Complaint Categories"
        icon={<Layers size={15} color="var(--precision-blue)" />}
        accentColor="#2563eb"
        actionLabel="FULL REPORT"
        onAction={handleAction}
      />

      <div style={{ overflowX: 'auto', border: '1px solid var(--border-color)', borderRadius: '4px' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.775rem' }} aria-label="Top complaint categories table">
          <thead>
            <tr style={{ background: 'var(--bg-input)', borderBottom: '1px solid var(--border-color)', fontSize: '0.675rem', color: 'var(--text-muted)' }}>
              <th style={{ padding: '0.5rem 0.65rem' }}>CATEGORY</th>
              <th style={{ padding: '0.5rem 0.65rem' }}>TOTAL</th>
              <th style={{ padding: '0.5rem 0.65rem' }}>RESOLVED</th>
              <th style={{ padding: '0.5rem 0.65rem' }}>PENDING</th>
              <th style={{ padding: '0.5rem 0.65rem', textAlign: 'right' }}>SLA MET</th>
            </tr>
          </thead>
          <tbody>
            {TOP_CATEGORIES_DATA.map((cat) => (
              <tr key={cat.category} style={{ borderBottom: '1px solid var(--border-color)' }}>
                <td style={{ padding: '0.6rem 0.65rem', fontWeight: '700' }}>
                  {cat.category}
                </td>
                <td className="mono-data" style={{ padding: '0.6rem 0.65rem', fontWeight: '700' }}>
                  {cat.total}
                </td>
                <td className="mono-data" style={{ padding: '0.6rem 0.65rem', color: '#16a34a', fontWeight: '700' }}>
                  {cat.resolved}
                </td>
                <td className="mono-data" style={{ padding: '0.6rem 0.65rem', color: '#f97316', fontWeight: '700' }}>
                  {cat.pending}
                </td>
                <td className="mono-data" style={{ padding: '0.6rem 0.65rem', textAlign: 'right', fontWeight: '800', color: 'var(--precision-blue)' }}>
                  {cat.slaMetPct}%
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
});

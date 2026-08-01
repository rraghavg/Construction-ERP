import { memo, useCallback } from 'react';
import { useApp } from '../../context/AppContext';
import { TOP_STOCK_VALUE_LIST } from '../../data/mockData';
import { TrendingUp, Award } from 'lucide-react';
import { PanelHeader } from '../shared/PanelHeader';

export const TopStockValuePanel = memo(function TopStockValuePanel() {
  const { navigateTo } = useApp();

  const handleAction = useCallback(() => {
    navigateTo('inventory', 'Reports & Valuation');
  }, [navigateTo]);

  return (
    <div className="panel-card" style={{ padding: '1.25rem' }}>
      <PanelHeader
        title="Top Stock Items by Valuation"
        icon={<Award size={15} color="var(--precision-blue)" />}
        accentColor="#2563eb"
        actionLabel="VALUATION REPORT →"
        onAction={handleAction}
      />

      <div style={{ overflowX: 'auto', border: '1px solid var(--border-color)', borderRadius: '4px' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.775rem' }} aria-label="Top stock items by valuation table">
          <thead>
            <tr style={{ background: 'var(--bg-input)', borderBottom: '1px solid var(--border-color)', fontSize: '0.675rem', color: 'var(--text-muted)' }}>
              <th style={{ padding: '0.5rem 0.65rem' }}>RANK / MATERIAL ITEM</th>
              <th style={{ padding: '0.5rem 0.65rem' }}>AVAILABLE QTY</th>
              <th style={{ padding: '0.5rem 0.65rem', textAlign: 'right' }}>STOCK VALUE (₹)</th>
            </tr>
          </thead>
          <tbody>
            {TOP_STOCK_VALUE_LIST.map((item) => (
              <tr key={item.rank} style={{ borderBottom: '1px solid var(--border-color)' }}>
                <td style={{ padding: '0.6rem 0.65rem' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <span
                      className="mono-data"
                      style={{
                        width: '20px',
                        height: '20px',
                        borderRadius: '50%',
                        background: item.rank === 1 ? 'rgba(234, 179, 8, 0.2)' : 'var(--bg-input)',
                        color: item.rank === 1 ? '#d97706' : 'var(--text-main)',
                        display: 'grid',
                        placeItems: 'center',
                        fontSize: '0.675rem',
                        fontWeight: 800
                      }}
                    >
                      #{item.rank}
                    </span>
                    <span style={{ fontWeight: '700' }}>{item.item}</span>
                  </div>
                </td>
                <td className="mono-data" style={{ padding: '0.6rem 0.65rem', fontWeight: '700' }}>
                  {item.availableQty}
                </td>
                <td className="mono-data" style={{ padding: '0.6rem 0.65rem', textAlign: 'right', fontWeight: '800', color: '#16a34a' }}>
                  {item.stockValue}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
});

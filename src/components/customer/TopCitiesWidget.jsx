import { memo, useCallback } from 'react';
import { useApp } from '../../context/AppContext';
import { TOP_CITIES_DATA } from '../../data/mockData';
import { MapPin } from 'lucide-react';
import { PanelHeader } from '../shared/PanelHeader';

export const TopCitiesWidget = memo(function TopCitiesWidget() {
  const { navigateTo } = useApp();

  const handleAction = useCallback(() => {
    navigateTo('customer-mgmt', 'Customers Directory');
  }, [navigateTo]);

  return (
    <div className="panel-card" style={{ padding: '1.25rem' }}>
      <PanelHeader
        title="Top Cities by Concentration"
        icon={<MapPin size={15} color="var(--precision-blue)" />}
        accentColor="#2563eb"
        actionLabel="FULL REPORT"
        onAction={handleAction}
      />

      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
        {TOP_CITIES_DATA.map((item) => (
          <div key={item.city}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '0.775rem', marginBottom: '4px' }}>
              <span style={{ fontWeight: '700' }}>
                <span className="mono-data" style={{ color: 'var(--text-muted)', marginRight: '6px' }}>#{item.rank}</span>
                {item.city}
              </span>
              <span className="mono-data" style={{ fontWeight: '800' }}>
                {item.count} Customers <span style={{ color: 'var(--text-muted)', fontSize: '0.675rem' }}>({item.pct}%)</span>
              </span>
            </div>

            <div className="load-bar" style={{ height: '6px' }}>
              <div className="load-fill" style={{ width: `${item.pct * 3.5}%`, background: 'var(--precision-blue)' }} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
});

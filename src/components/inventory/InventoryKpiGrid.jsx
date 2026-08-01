import { memo, useCallback } from 'react';
import { useApp } from '../../context/AppContext';
import {
  Boxes,
  TrendingUp,
  AlertCircle,
  AlertTriangle,
  Truck,
  Send,
  ArrowUpRight,
  ArrowDownRight
} from 'lucide-react';

const ICON_MAP = {
  Boxes,
  TrendingUp,
  AlertCircle,
  AlertTriangle,
  Truck,
  Send
};

export const InventoryKpiGrid = memo(function InventoryKpiGrid() {
  const { inventoryKpis, isRefreshing, navigateTo } = useApp();

  const handleCardClick = useCallback((targetSubmodule) => {
    navigateTo('inventory', targetSubmodule);
  }, [navigateTo]);

  const handleCardKeyDown = useCallback((e, targetSubmodule) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      handleCardClick(targetSubmodule);
    }
  }, [handleCardClick]);

  if (isRefreshing) {
    return (
      <section className="kpi-grid">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="anodized-panel p-4" style={{ padding: '1rem' }} role="status" aria-label="Loading Inventory KPI">
            <div className="skeleton" style={{ width: '80px', height: '14px', marginBottom: '8px' }} />
            <div className="skeleton" style={{ width: '100px', height: '28px', marginBottom: '8px' }} />
            <div className="skeleton" style={{ width: '100%', height: '12px' }} />
          </div>
        ))}
      </section>
    );
  }

  const cards = Object.values(inventoryKpis);

  return (
    <section className="kpi-grid" aria-label="Inventory Management Key Performance Indicators">
      {cards.map((card) => {
        const IconComp = ICON_MAP[card.icon] || Boxes;
        const isLowStock = card.id === 'lowStockItems';

        return (
          <div
            key={card.id}
            tabIndex={0}
            role="button"
            className="anodized-panel kpi-card"
            onClick={() => handleCardClick(card.targetSubmodule)}
            onKeyDown={(e) => handleCardKeyDown(e, card.targetSubmodule)}
            aria-label={`${card.title}: ${card.formattedValue}, Trend: ${card.trend}`}
          >
            <div className="kpi-top">
              <span className="kpi-label">{card.title}</span>
              <div className="kpi-icon-box" style={{ color: card.color }} aria-hidden="true">
                <IconComp size={18} />
              </div>
            </div>

            <div className="kpi-value mono-data">
              {card.formattedValue}
            </div>

            <div className="kpi-footer">
              <span className="mono-data" style={{ fontSize: '0.675rem', color: 'var(--text-muted)' }}>
                {card.subtext}
              </span>
              <span className="kpi-trend" style={{ color: isLowStock ? '#15803d' : card.trendType === 'danger' ? '#dc2626' : '#15803d' }}>
                {isLowStock ? <ArrowDownRight size={13} aria-hidden="true" /> : <ArrowUpRight size={13} aria-hidden="true" />}
                {' '}{card.trend}
              </span>
            </div>
          </div>
        );
      })}
    </section>
  );
});

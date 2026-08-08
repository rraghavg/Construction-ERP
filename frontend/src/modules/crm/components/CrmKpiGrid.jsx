import { memo, useCallback } from 'react';
import { useApp } from '../../../core/providers/AppContext';
import {
  Users,
  UserPlus,
  Compass,
  Zap,
  TrendingUp,
  ArrowUpRight,
  ArrowDownRight
} from 'lucide-react';

const ICON_MAP = {
  Users,
  UserPlus,
  Compass,
  Zap,
  TrendingUp
};

export const CrmKpiGrid = memo(function CrmKpiGrid() {
  const { crmKpis, isRefreshing, setLeadStatusFilter } = useApp();

  const handleCardClick = useCallback((filterKey) => {
    setLeadStatusFilter(filterKey);
  }, [setLeadStatusFilter]);

  const handleCardKeyDown = useCallback((e, filterKey) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      handleCardClick(filterKey);
    }
  }, [handleCardClick]);

  if (isRefreshing) {
    return (
      <section className="kpi-grid-5">
        {Array.from({ length: 5 }).map((_, i) => (
          <div key={i} className="anodized-panel p-4" style={{ padding: '1rem' }} role="status" aria-label="Loading CRM KPI">
            <div className="skeleton" style={{ width: '80px', height: '14px', marginBottom: '8px' }} />
            <div className="skeleton" style={{ width: '100px', height: '28px', marginBottom: '8px' }} />
            <div className="skeleton" style={{ width: '100%', height: '12px' }} />
          </div>
        ))}
      </section>
    );
  }

  const cards = Object.values(crmKpis);

  return (
    <section className="kpi-grid-5" aria-label="CRM Key Performance Indicators">
      {cards.map((card) => {
        const IconComp = ICON_MAP[card.icon] || Users;

        return (
          <div
            key={card.id}
            tabIndex={0}
            role="button"
            className="anodized-panel kpi-card"
            onClick={() => handleCardClick(card.filterKey)}
            onKeyDown={(e) => handleCardKeyDown(e, card.filterKey)}
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
              <span className="kpi-trend" style={{ color: card.trendType === 'positive' ? '#15803d' : '#b91c1c' }}>
                {card.trendType === 'positive' ? (
                  <ArrowUpRight size={13} aria-hidden="true" />
                ) : (
                  <ArrowDownRight size={13} aria-hidden="true" />
                )}
                {card.trend}
              </span>
            </div>
          </div>
        );
      })}
    </section>
  );
});

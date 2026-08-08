import { memo, useCallback } from 'react';
import { useApp } from '../../../core/providers/AppContext';
import {
  Building2,
  TrendingUp,
  Receipt,
  AlertCircle,
  CalendarCheck,
  ArrowUpRight,
  Lock
} from 'lucide-react';

const ICON_MAP = {
  Building2,
  TrendingUp,
  Receipt,
  AlertCircle,
  CalendarCheck
};

export const SalesKpiGrid = memo(function SalesKpiGrid() {
  const { salesKpis, isRefreshing, activePermissions, navigateTo } = useApp();

  const handleCardClick = useCallback((targetSubmodule) => {
    navigateTo('sales', targetSubmodule);
  }, [navigateTo]);

  const handleCardKeyDown = useCallback((e, targetSubmodule) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      handleCardClick(targetSubmodule);
    }
  }, [handleCardClick]);

  if (isRefreshing) {
    return (
      <section className="kpi-grid-5">
        {Array.from({ length: 5 }).map((_, i) => (
          <div key={i} className="anodized-panel p-4" style={{ padding: '1rem' }} role="status" aria-label="Loading Sales KPI">
            <div className="skeleton" style={{ width: '80px', height: '14px', marginBottom: '8px' }} />
            <div className="skeleton" style={{ width: '100px', height: '28px', marginBottom: '8px' }} />
            <div className="skeleton" style={{ width: '100%', height: '12px' }} />
          </div>
        ))}
      </section>
    );
  }

  const cards = Object.values(salesKpis);

  return (
    <section className="kpi-grid-5" aria-label="Sales Module Key Performance Indicators">
      {cards.map((card) => {
        const IconComp = ICON_MAP[card.icon] || Building2;
        const isFinancial = card.id === 'totalSales' || card.id === 'totalReceipts' || card.id === 'outstandingDues';
        const displayValue = activePermissions.maskedFinance && isFinancial ? '₹ *** MASKED' : card.formattedValue;

        return (
          <div
            key={card.id}
            tabIndex={0}
            role="button"
            className="anodized-panel kpi-card"
            onClick={() => handleCardClick(card.targetSubmodule)}
            onKeyDown={(e) => handleCardKeyDown(e, card.targetSubmodule)}
            aria-label={`${card.title}: ${displayValue}, Trend: ${card.trend}`}
          >
            <div className="kpi-top">
              <span className="kpi-label">{card.title}</span>
              <div className="kpi-icon-box" style={{ color: card.color }} aria-hidden="true">
                <IconComp size={18} />
              </div>
            </div>

            <div className="kpi-value mono-data" style={{ color: isFinancial && activePermissions.maskedFinance ? 'var(--color-warning)' : 'inherit' }}>
              {isFinancial && activePermissions.maskedFinance ? (
                <span style={{ display: 'inline-flex', alignItems: 'center', gap: '4px', fontSize: '1rem' }}>
                  <Lock size={14} aria-hidden="true" /> MASKED
                </span>
              ) : (
                displayValue
              )}
            </div>

            <div className="kpi-footer">
              <span className="mono-data" style={{ fontSize: '0.675rem', color: 'var(--text-muted)' }}>
                {card.subtext}
              </span>
              <span className="kpi-trend" style={{ color: card.trendType === 'positive' ? '#15803d' : '#c2410c' }}>
                <ArrowUpRight size={13} aria-hidden="true" /> {card.trend}
              </span>
            </div>
          </div>
        );
      })}
    </section>
  );
});

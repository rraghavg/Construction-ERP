import { memo, useCallback } from 'react';
import { useApp } from '../../../core/providers/AppContext';
import {
  IndianRupee,
  Building2,
  TrendingUp,
  Receipt,
  Headphones,
  CalendarCheck,
  FileCheck,
  AlertCircle,
  CheckSquare,
  ArrowUpRight,
  Lock
} from 'lucide-react';

const ICON_MAP = {
  IndianRupee,
  Building2,
  TrendingUp,
  Receipt,
  Headphones,
  CalendarCheck,
  FileCheck,
  AlertCircle,
  CheckSquare
};

export const KpiSummaryGrid = memo(function KpiSummaryGrid() {
  const { kpis, isRefreshing, activePermissions, navigateTo } = useApp();

  const handleCardClick = useCallback((targetModule, targetSubmodule) => {
    navigateTo(targetModule, targetSubmodule);
  }, [navigateTo]);

  const handleCardKeyDown = useCallback((e, targetModule, targetSubmodule) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      navigateTo(targetModule, targetSubmodule);
    }
  }, [navigateTo]);

  if (isRefreshing) {
    return (
      <section className="kpi-grid">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="anodized-panel p-4" style={{ padding: '1rem' }} role="status" aria-label="Loading KPI">
            <div className="skeleton" style={{ width: '80px', height: '14px', marginBottom: '8px' }} />
            <div className="skeleton" style={{ width: '120px', height: '28px', marginBottom: '8px' }} />
            <div className="skeleton" style={{ width: '100%', height: '12px' }} />
          </div>
        ))}
      </section>
    );
  }

  // Ensure kpis is iterable whether array or object
  const cardList = Array.isArray(kpis)
    ? kpis
    : Object.entries(kpis || {}).map(([key, val]) => ({ id: key, ...val }));

  return (
    <section className="kpi-grid" aria-label="Key Performance Indicators">
      {cardList.map((card) => {
        const IconComponent = ICON_MAP[card.icon] || Building2;
        const cardId = card.id || card.label;
        const isFinancial = cardId === 'totalSales' || cardId === 'receipts' || cardId === 'total-sales' || cardId === 'total-collections';
        const displayValue = activePermissions.maskedFinance && isFinancial
          ? '₹ *** MASKED'
          : (card.formattedValue || card.value);
        const cardTitle = card.label || card.title || 'KPI';

        return (
          <div
            key={cardId}
            tabIndex={0}
            role="button"
            className="anodized-panel kpi-card"
            onClick={() => handleCardClick(card.targetModule, card.targetSubmodule)}
            onKeyDown={(e) => handleCardKeyDown(e, card.targetModule, card.targetSubmodule)}
            aria-label={`${cardTitle}: ${displayValue}, Trend: ${card.trend}`}
          >
            <div className="kpi-top">
              <span className="kpi-label">{cardTitle}</span>
              <div className="kpi-icon-box" style={{ color: 'var(--precision-blue)' }} aria-hidden="true">
                <IconComponent size={18} />
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
                {card.tooltip || card.subtext || ''}
              </span>
              <span className="kpi-trend" style={{ color: card.trendType === 'positive' ? '#15803d' : '#2563eb' }}>
                <ArrowUpRight size={13} aria-hidden="true" /> {card.trend}
              </span>
            </div>
          </div>
        );
      })}
    </section>
  );
});

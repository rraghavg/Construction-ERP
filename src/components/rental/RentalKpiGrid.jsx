import { memo, useCallback } from 'react';
import { useApp } from '../../context/AppContext';
import {
  Building2,
  CheckCircle2,
  Key,
  Receipt,
  AlertCircle,
  ArrowUpRight,
  Lock
} from 'lucide-react';

const ICON_MAP = {
  Building2,
  CheckCircle2,
  Key,
  Receipt,
  AlertCircle
};

export const RentalKpiGrid = memo(function RentalKpiGrid() {
  const { rentalKpis, isRefreshing, activePermissions, navigateTo } = useApp();

  const handleCardClick = useCallback((targetSubmodule) => {
    navigateTo('rental-mgmt', targetSubmodule);
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
          <div key={i} className="anodized-panel p-4" style={{ padding: '1rem' }} role="status" aria-label="Loading Rental KPI">
            <div className="skeleton" style={{ width: '80px', height: '14px', marginBottom: '8px' }} />
            <div className="skeleton" style={{ width: '100px', height: '28px', marginBottom: '8px' }} />
            <div className="skeleton" style={{ width: '100%', height: '12px' }} />
          </div>
        ))}
      </section>
    );
  }

  const cards = Object.values(rentalKpis);

  return (
    <section className="kpi-grid" aria-label="Rental Management Key Performance Indicators">
      {cards.map((card) => {
        const IconComp = ICON_MAP[card.icon] || Building2;
        const isFinancial = card.id === 'monthlyRentExpected' || card.id === 'monthlyRentCollected' || card.id === 'overdueAmount';
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
                <span style={{ display: 'inline-flex', alignItems: 'center', gap: '4px', fontSize: '0.9rem' }}>
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
              <span className="kpi-trend" style={{ color: card.trendType === 'danger' ? '#dc2626' : card.trendType === 'warning' ? '#f97316' : '#15803d' }}>
                <ArrowUpRight size={13} aria-hidden="true" /> {card.trend}
              </span>
            </div>
          </div>
        );
      })}
    </section>
  );
});

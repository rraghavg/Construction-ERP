import { memo, useCallback } from 'react';
import { useApp } from '../../context/AppContext';
import {
  Users,
  UserCheck,
  Clock,
  Lock,
  ShieldCheck,
  ArrowUpRight,
  ArrowDownRight
} from 'lucide-react';

const ICON_MAP = {
  Users,
  UserCheck,
  Clock,
  Lock,
  ShieldCheck
};

export const UserMgmtKpiGrid = memo(function UserMgmtKpiGrid() {
  const { userMgmtKpis, isRefreshing, navigateTo } = useApp();

  const handleCardClick = useCallback((targetSubmodule) => {
    navigateTo('user-mgmt', targetSubmodule);
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
          <div key={i} className="anodized-panel p-4" style={{ padding: '1rem' }} role="status" aria-label="Loading User Management KPI">
            <div className="skeleton" style={{ width: '80px', height: '14px', marginBottom: '8px' }} />
            <div className="skeleton" style={{ width: '100px', height: '28px', marginBottom: '8px' }} />
            <div className="skeleton" style={{ width: '100%', height: '12px' }} />
          </div>
        ))}
      </section>
    );
  }

  const cards = Object.values(userMgmtKpis);

  return (
    <section className="kpi-grid-5" aria-label="User Management Key Performance Indicators">
      {cards.map((card) => {
        const IconComp = ICON_MAP[card.icon] || Users;
        const isLocked = card.id === 'lockedUsers';

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
              <span className="kpi-trend" style={{ color: isLocked ? '#15803d' : card.trendType === 'danger' ? '#dc2626' : '#15803d' }}>
                {isLocked ? <ArrowDownRight size={13} aria-hidden="true" /> : <ArrowUpRight size={13} aria-hidden="true" />}
                {' '}{card.trend}
              </span>
            </div>
          </div>
        );
      })}
    </section>
  );
});

import { memo, useCallback } from 'react';
import { useApp } from '../../../core/providers/AppContext';
import { UPCOMING_BIRTHDAYS_LIST, UPCOMING_ANNIVERSARIES_LIST } from '../../../data/mockData';
import { Gift, Award } from 'lucide-react';
import { PanelHeader } from '../../../shared/components/PanelHeader';

export const UpcomingEventsWidget = memo(function UpcomingEventsWidget() {
  const { navigateTo } = useApp();

  const handleAction = useCallback(() => {
    navigateTo('hr', 'Employees Directory');
  }, [navigateTo]);

  return (
    <div className="panel-card" style={{ padding: '1.25rem' }}>
      <PanelHeader
        title="Birthdays & Work Anniversaries"
        icon={<Gift size={15} color="#f59e0b" />}
        accentColor="#f59e0b"
        actionLabel="ALL EMPLOYEES →"
        onAction={handleAction}
      />

      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem' }}>
        {/* Birthdays Section */}
        <div style={{ fontSize: '0.675rem', fontWeight: 800, color: 'var(--text-muted)', textTransform: 'uppercase' }}>
          UPCOMING BIRTHDAYS (NEXT 7 DAYS)
        </div>
        {UPCOMING_BIRTHDAYS_LIST.map((b) => (
          <div key={b.name} className="structural-card" style={{ padding: '0.55rem 0.65rem', marginBottom: 0 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Gift size={14} color="#f59e0b" aria-hidden="true" />
                <span style={{ fontWeight: '700', fontSize: '0.775rem' }}>{b.name}</span>
              </div>
              <span className="badge badge-warning mono-data" style={{ fontSize: '0.65rem' }}>
                {b.date}
              </span>
            </div>
            <div style={{ fontSize: '0.675rem', color: 'var(--text-muted)', marginLeft: '22px' }}>
              {b.department}
            </div>
          </div>
        ))}

        {/* Anniversaries Section */}
        <div style={{ fontSize: '0.675rem', fontWeight: 800, color: 'var(--text-muted)', textTransform: 'uppercase', marginTop: '0.4rem' }}>
          UPCOMING WORK ANNIVERSARIES
        </div>
        {UPCOMING_ANNIVERSARIES_LIST.map((a) => (
          <div key={a.name} className="structural-card" style={{ padding: '0.55rem 0.65rem', marginBottom: 0 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Award size={14} color="var(--precision-blue)" aria-hidden="true" />
                <span style={{ fontWeight: '700', fontSize: '0.775rem' }}>{a.name}</span>
              </div>
              <span className="badge badge-info mono-data" style={{ fontSize: '0.65rem' }}>
                {a.tenure} ({a.date})
              </span>
            </div>
            <div style={{ fontSize: '0.675rem', color: 'var(--text-muted)', marginLeft: '22px' }}>
              {a.department}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
});

import { memo, useCallback } from 'react';
import { useApp } from '../../../core/providers/AppContext';
import { LEAVE_SUMMARY_DATA } from '../../../data/mockData';
import { Calendar } from 'lucide-react';
import { PanelHeader } from '../../../shared/components/PanelHeader';

export const LeaveSummaryWidget = memo(function LeaveSummaryWidget() {
  const { navigateTo } = useApp();

  const handleAction = useCallback(() => {
    navigateTo('hr', 'Leave Management');
  }, [navigateTo]);

  return (
    <div className="panel-card" style={{ padding: '1.25rem' }}>
      <PanelHeader
        title="Organization Leave Consumption"
        icon={<Calendar size={15} color="var(--precision-blue)" />}
        accentColor="#2563eb"
        actionLabel="LEAVE MANAGEMENT →"
        onAction={handleAction}
      />

      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
        {LEAVE_SUMMARY_DATA.map((item) => {
          const isHighPct = item.pct >= 80;
          const barColor = isHighPct ? '#dc2626' : item.pct >= 50 ? '#f59e0b' : item.color;

          return (
            <div key={item.type} style={{ fontSize: '0.75rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
                <span style={{ fontWeight: '700' }}>{item.type}</span>
                <span className="mono-data" style={{ fontWeight: '800' }}>
                  {item.used} / {item.allocated} Days <span style={{ color: 'var(--text-muted)', fontSize: '0.675rem' }}>({item.pct}%)</span>
                </span>
              </div>

              {/* Progress Bar Container */}
              <div
                style={{
                  width: '100%',
                  height: '8px',
                  background: 'var(--bg-input)',
                  borderRadius: '4px',
                  overflow: 'hidden',
                  border: '1px solid var(--border-color)'
                }}
              >
                <div
                  style={{
                    width: `${item.pct}%`,
                    height: '100%',
                    background: barColor,
                    borderRadius: '4px',
                    transition: 'width 0.4s ease'
                  }}
                  role="progressbar"
                  aria-valuenow={item.pct}
                  aria-valuemin={0}
                  aria-valuemax={100}
                  aria-label={`${item.type}: ${item.used} of ${item.allocated} days used`}
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
});

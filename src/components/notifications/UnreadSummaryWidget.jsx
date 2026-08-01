import { useMemo, memo, useCallback } from 'react';
import { useApp } from '../../context/AppContext';
import { UNREAD_BREAKDOWN_DATA } from '../../data/mockData';
import { Doughnut } from 'react-chartjs-2';
import { PanelHeader } from '../shared/PanelHeader';
import { WidgetSkeleton } from '../shared/WidgetSkeleton';
import '../../utils/chartSetup';

export const UnreadSummaryWidget = memo(function UnreadSummaryWidget() {
  const { isRefreshing, navigateTo } = useApp();

  const { labels, values, colors, totalUnread } = useMemo(() => {
    const raw = UNREAD_BREAKDOWN_DATA;
    return {
      labels: raw.breakdown.map((b) => b.label),
      values: raw.breakdown.map((b) => b.count),
      colors: raw.breakdown.map((b) => b.color),
      totalUnread: raw.totalUnread
    };
  }, []);

  const chartData = useMemo(() => ({
    labels,
    datasets: [
      {
        data: values,
        backgroundColor: colors,
        borderWidth: 0,
        hoverOffset: 4
      }
    ]
  }), [labels, values, colors]);

  const options = useMemo(() => ({
    responsive: true,
    maintainAspectRatio: false,
    cutout: '72%',
    plugins: {
      legend: { display: false },
      tooltip: {
        callbacks: {
          label: (context) => ` ${context.label}: ${context.parsed} Unread Items`
        }
      }
    }
  }), []);

  const handleAction = useCallback(() => {
    navigateTo('notifications', 'Unread Alerts');
  }, [navigateTo]);

  if (isRefreshing) {
    return <WidgetSkeleton height="200px" />;
  }

  return (
    <div className="panel-card" style={{ padding: '1.25rem' }}>
      <PanelHeader
        title="Unread Priority Breakdown"
        accentColor="#dc2626"
        actionLabel="UNREAD ALERTS →"
        onAction={handleAction}
      />

      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', height: '180px' }}>
        {/* Donut Chart */}
        <div style={{ position: 'relative', width: '130px', height: '130px', flexShrink: 0 }}>
          <Doughnut data={chartData} options={options} />
          <div
            style={{
              position: 'absolute',
              inset: 0,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              pointerEvents: 'none'
            }}
          >
            <span className="mono-data" style={{ fontSize: '1.2rem', fontWeight: 800, color: '#dc2626' }}>
              {totalUnread}
            </span>
            <span style={{ fontSize: '0.625rem', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: 700 }}>
              Unread
            </span>
          </div>
        </div>

        {/* Right Legend List */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', flex: 1 }}>
          {UNREAD_BREAKDOWN_DATA.breakdown.map((item) => (
            <div
              key={item.label}
              tabIndex={0}
              role="button"
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                fontSize: '0.725rem',
                padding: '4px 6px',
                background: 'var(--bg-input)',
                borderRadius: '3px',
                cursor: 'pointer'
              }}
              onClick={handleAction}
              aria-label={`${item.label}: ${item.count} Unread`}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <span
                  style={{ width: '8px', height: '8px', borderRadius: '50%', background: item.color }}
                  aria-hidden="true"
                />
                <span style={{ fontWeight: 600 }}>{item.label}</span>
              </div>
              <span className="mono-data" style={{ fontWeight: 800 }}>
                {item.count}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
});

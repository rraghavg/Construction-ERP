import { useMemo, memo, useCallback } from 'react';
import { useApp } from '../../../core/providers/AppContext';
import { COMPLAINTS_BY_PRIORITY_DATA } from '../../../data/mockData';
import { Doughnut } from 'react-chartjs-2';
import { PanelHeader } from '../../../shared/components/PanelHeader';
import { WidgetSkeleton } from '../../../shared/components/WidgetSkeleton';
import '../../../shared/utils/chartSetup';

export const ComplaintsByPriorityDonut = memo(function ComplaintsByPriorityDonut() {
  const { isRefreshing, navigateTo } = useApp();

  const { labels, values, colors } = useMemo(() => {
    const raw = COMPLAINTS_BY_PRIORITY_DATA;
    return {
      labels: raw.segments.map((s) => s.label),
      values: raw.segments.map((s) => s.count),
      colors: raw.segments.map((s) => s.color)
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
          label: (context) => ` ${context.label}: ${context.parsed} Tickets`
        }
      }
    }
  }), []);

  const handleAction = useCallback(() => {
    navigateTo('maintenance', 'Complaints Register');
  }, [navigateTo]);

  if (isRefreshing) {
    return <WidgetSkeleton height="220px" />;
  }

  return (
    <div className="data-grid-item" style={{ padding: '1.25rem' }}>
      <PanelHeader
        title="Complaints by Priority"
        accentColor="#dc2626"
        actionLabel="PRIORITY FILTER"
        onAction={handleAction}
      />

      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', height: '220px' }}>
        {/* Donut Chart */}
        <div style={{ position: 'relative', width: '140px', height: '140px', flexShrink: 0 }}>
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
              32 High
            </span>
            <span style={{ fontSize: '0.625rem', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: 700 }}>
              Urgent
            </span>
          </div>
        </div>

        {/* Right Legend List */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', flex: 1 }}>
          {COMPLAINTS_BY_PRIORITY_DATA.segments.map((seg) => (
            <div
              key={seg.label}
              tabIndex={0}
              role="button"
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                fontSize: '0.75rem',
                padding: '6px 8px',
                background: 'var(--bg-input)',
                borderRadius: '4px',
                border: '1px solid var(--border-color)',
                cursor: 'pointer'
              }}
              onClick={handleAction}
              aria-label={`${seg.label}: ${seg.count} (${seg.pct}%)`}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <span
                  style={{ width: '10px', height: '10px', borderRadius: '50%', background: seg.color }}
                  aria-hidden="true"
                />
                <span style={{ fontWeight: 700 }}>{seg.label}</span>
              </div>
              <span className="mono-data" style={{ fontWeight: 800 }}>
                {seg.count} <span style={{ color: 'var(--text-muted)', fontSize: '0.675rem' }}>({seg.pct}%)</span>
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
});

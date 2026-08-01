import { useMemo, memo, useCallback } from 'react';
import { useApp } from '../../context/AppContext';
import { ATTENDANCE_OVERVIEW_DATA } from '../../data/mockData';
import { Doughnut } from 'react-chartjs-2';
import { PanelHeader } from '../shared/PanelHeader';
import { WidgetSkeleton } from '../shared/WidgetSkeleton';
import '../../utils/chartSetup';

export const AttendanceOverviewDonut = memo(function AttendanceOverviewDonut() {
  const { isRefreshing, navigateTo } = useApp();

  const { labels, values, colors, totalCount } = useMemo(() => {
    const raw = ATTENDANCE_OVERVIEW_DATA;
    return {
      labels: raw.segments.map((s) => s.label),
      values: raw.segments.map((s) => s.count),
      colors: raw.segments.map((s) => s.color),
      totalCount: raw.totalCount
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
          label: (context) => ` ${context.label}: ${context.parsed} Employees`
        }
      }
    }
  }), []);

  const handleAction = useCallback(() => {
    navigateTo('hr', 'Attendance & Shifts');
  }, [navigateTo]);

  if (isRefreshing) {
    return <WidgetSkeleton height="220px" />;
  }

  return (
    <div className="data-grid-item" style={{ padding: '1.25rem' }}>
      <PanelHeader
        title="Today's Attendance Overview"
        accentColor="#16a34a"
        actionLabel="ATTENDANCE LOG"
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
            <span className="mono-data" style={{ fontSize: '1.2rem', fontWeight: 800, color: '#16a34a' }}>
              142
            </span>
            <span style={{ fontSize: '0.625rem', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: 700 }}>
              Present Today
            </span>
          </div>
        </div>

        {/* Right Legend List */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '5px', flex: 1 }}>
          {ATTENDANCE_OVERVIEW_DATA.segments.map((seg) => (
            <div
              key={seg.label}
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
              aria-label={`${seg.label}: ${seg.count} (${seg.pct}%)`}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <span
                  style={{ width: '8px', height: '8px', borderRadius: '50%', background: seg.color }}
                  aria-hidden="true"
                />
                <span style={{ fontWeight: 600 }}>{seg.label}</span>
              </div>
              <span className="mono-data" style={{ fontWeight: 700 }}>
                {seg.count} <span style={{ color: 'var(--text-muted)', fontSize: '0.65rem' }}>({seg.pct}%)</span>
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
});

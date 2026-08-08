import { useMemo, memo, useCallback } from 'react';
import { useApp } from '../../../core/providers/AppContext';
import { BOOKINGS_BY_PROJECT_DATA } from '../../../data/mockData';
import { Doughnut } from 'react-chartjs-2';
import { PanelHeader } from '../../../shared/components/PanelHeader';
import { WidgetSkeleton } from '../../../shared/components/WidgetSkeleton';
import '../../../shared/utils/chartSetup';

export const BookingsByProjectChart = memo(function BookingsByProjectChart() {
  const { isRefreshing, navigateTo } = useApp();

  const { labels, values, colors, totalBookings } = useMemo(() => {
    const raw = BOOKINGS_BY_PROJECT_DATA;
    return {
      labels: raw.projects.map((p) => p.name),
      values: raw.projects.map((p) => p.count),
      colors: raw.projects.map((p) => p.color),
      totalBookings: raw.totalBookings
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
          label: (context) => ` ${context.label}: ${context.parsed} Bookings`
        }
      }
    }
  }), []);

  const handleAction = useCallback(() => {
    navigateTo('sales', 'Bookings');
  }, [navigateTo]);

  if (isRefreshing) {
    return <WidgetSkeleton height="220px" />;
  }

  return (
    <div className="data-grid-item" style={{ padding: '1.25rem' }}>
      <PanelHeader
        title="Bookings by Project"
        accentColor="#16a34a"
        actionLabel="PROJECT MATRIX"
        onAction={handleAction}
      />

      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', height: '220px' }}>
        {/* Donut Chart */}
        <div style={{ position: 'relative', width: '145px', height: '145px', flexShrink: 0 }}>
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
            <span className="mono-data" style={{ fontSize: '1.25rem', fontWeight: 800 }}>
              {totalBookings}
            </span>
            <span style={{ fontSize: '0.625rem', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: 700 }}>
              Total Units
            </span>
          </div>
        </div>

        {/* Right Legend List */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '5px', flex: 1 }}>
          {BOOKINGS_BY_PROJECT_DATA.projects.map((proj) => (
            <div
              key={proj.name}
              tabIndex={0}
              role="button"
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                fontSize: '0.725rem',
                padding: '3px 6px',
                borderRadius: '2px',
                cursor: 'pointer'
              }}
              onClick={handleAction}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  handleAction();
                }
              }}
              aria-label={`Project ${proj.name}: ${proj.count} bookings (${proj.pct}%)`}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <span
                  style={{ width: '8px', height: '8px', borderRadius: '50%', background: proj.color }}
                  aria-hidden="true"
                />
                <span style={{ fontWeight: 600 }}>{proj.name}</span>
              </div>
              <span className="mono-data" style={{ fontWeight: 700 }}>
                {proj.count} <span style={{ color: 'var(--text-muted)', fontSize: '0.65rem' }}>({proj.pct}%)</span>
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
});

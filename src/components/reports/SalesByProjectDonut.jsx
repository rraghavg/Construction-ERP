import { useMemo, memo, useCallback } from 'react';
import { useApp } from '../../context/AppContext';
import { SALES_BY_PROJECT_DATA } from '../../data/mockData';
import { Doughnut } from 'react-chartjs-2';
import { PanelHeader } from '../shared/PanelHeader';
import { WidgetSkeleton } from '../shared/WidgetSkeleton';
import '../../utils/chartSetup';

export const SalesByProjectDonut = memo(function SalesByProjectDonut() {
  const { isRefreshing, navigateTo } = useApp();

  const { labels, values, colors, formattedTotal } = useMemo(() => {
    const raw = SALES_BY_PROJECT_DATA;
    return {
      labels: raw.segments.map((s) => s.project),
      values: raw.segments.map((s) => s.pct),
      colors: raw.segments.map((s) => s.color),
      formattedTotal: raw.formattedTotal
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
          label: (context) => ` ${context.label}: ${context.parsed}% of Total Sales`
        }
      }
    }
  }), []);

  const handleAction = useCallback(() => {
    navigateTo('reports', 'Sales Reports');
  }, [navigateTo]);

  if (isRefreshing) {
    return <WidgetSkeleton height="220px" />;
  }

  return (
    <div className="data-grid-item" style={{ padding: '1.25rem' }}>
      <PanelHeader
        title="Sales Realization by Project"
        accentColor="#2563eb"
        actionLabel="SALES SUMMARY"
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
            <span className="mono-data" style={{ fontSize: '1.1rem', fontWeight: 800, color: '#2563eb' }}>
              {formattedTotal}
            </span>
            <span style={{ fontSize: '0.625rem', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: 700 }}>
              Total Sales
            </span>
          </div>
        </div>

        {/* Right Legend List */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '4px', flex: 1 }}>
          {SALES_BY_PROJECT_DATA.segments.map((seg) => (
            <div
              key={seg.project}
              tabIndex={0}
              role="button"
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                fontSize: '0.675rem',
                padding: '3px 6px',
                background: 'var(--bg-input)',
                borderRadius: '3px',
                cursor: 'pointer'
              }}
              onClick={handleAction}
              aria-label={`${seg.project}: ${seg.pct}% (${seg.amount})`}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <span
                  style={{ width: '8px', height: '8px', borderRadius: '50%', background: seg.color }}
                  aria-hidden="true"
                />
                <span style={{ fontWeight: 600 }}>{seg.project}</span>
              </div>
              <span className="mono-data" style={{ fontWeight: 700 }}>
                {seg.pct}% <span style={{ color: 'var(--text-muted)', fontSize: '0.625rem' }}>({seg.amount})</span>
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
});

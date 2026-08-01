import { useMemo, memo, useCallback } from 'react';
import { useApp } from '../../context/AppContext';
import { STOCK_BY_CATEGORY_DATA } from '../../data/mockData';
import { Doughnut } from 'react-chartjs-2';
import { PanelHeader } from '../shared/PanelHeader';
import { WidgetSkeleton } from '../shared/WidgetSkeleton';
import '../../utils/chartSetup';

export const StockByCategoryChart = memo(function StockByCategoryChart() {
  const { isRefreshing, navigateTo } = useApp();

  const { labels, values, colors, totalCount } = useMemo(() => {
    const raw = STOCK_BY_CATEGORY_DATA;
    return {
      labels: raw.categories.map((c) => c.label),
      values: raw.categories.map((c) => c.pct),
      colors: raw.categories.map((c) => c.color),
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
          label: (context) => ` ${context.label}: ${context.parsed}% of Stock`
        }
      }
    }
  }), []);

  const handleAction = useCallback(() => {
    navigateTo('inventory', 'Materials Catalog');
  }, [navigateTo]);

  if (isRefreshing) {
    return <WidgetSkeleton height="220px" />;
  }

  return (
    <div className="data-grid-item" style={{ padding: '1.25rem' }}>
      <PanelHeader
        title="Stock by Category"
        accentColor="#16a34a"
        actionLabel="MATERIALS"
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
            <span className="mono-data" style={{ fontSize: '1.2rem', fontWeight: 800 }}>
              {totalCount}
            </span>
            <span style={{ fontSize: '0.625rem', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: 700 }}>
              Items
            </span>
          </div>
        </div>

        {/* Right Legend List */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '4px', flex: 1 }}>
          {STOCK_BY_CATEGORY_DATA.categories.map((cat) => (
            <div
              key={cat.label}
              tabIndex={0}
              role="button"
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                fontSize: '0.7rem',
                padding: '3px 6px',
                background: 'var(--bg-input)',
                borderRadius: '3px',
                cursor: 'pointer'
              }}
              onClick={handleAction}
              aria-label={`Category ${cat.label}: ${cat.pct}%`}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <span
                  style={{ width: '8px', height: '8px', borderRadius: '50%', background: cat.color }}
                  aria-hidden="true"
                />
                <span style={{ fontWeight: 600 }}>{cat.label}</span>
              </div>
              <span className="mono-data" style={{ fontWeight: 700 }}>
                {cat.pct}%
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
});

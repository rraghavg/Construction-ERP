import { useMemo, memo, useCallback } from 'react';
import { useApp } from '../../../core/providers/AppContext';
import { CUSTOMERS_BY_TYPE_DATA } from '../../../data/mockData';
import { Doughnut } from 'react-chartjs-2';
import { PanelHeader } from '../../../shared/components/PanelHeader';
import { WidgetSkeleton } from '../../../shared/components/WidgetSkeleton';
import '../../../shared/utils/chartSetup';

export const CustomersByTypeChart = memo(function CustomersByTypeChart({ onSelectType }) {
  const { isRefreshing, navigateTo } = useApp();

  const { labels, values, colors, totalCount } = useMemo(() => {
    const raw = CUSTOMERS_BY_TYPE_DATA;
    return {
      labels: raw.types.map((t) => t.label),
      values: raw.types.map((t) => t.count),
      colors: raw.types.map((t) => t.color),
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
          label: (context) => ` ${context.label}: ${context.parsed} Customers`
        }
      }
    }
  }), []);

  const handleAction = useCallback(() => {
    navigateTo('customer-mgmt', 'Customers Directory');
  }, [navigateTo]);

  if (isRefreshing) {
    return <WidgetSkeleton height="220px" />;
  }

  return (
    <div className="data-grid-item" style={{ padding: '1.25rem' }}>
      <PanelHeader
        title="Customers by Type"
        accentColor="#16a34a"
        actionLabel="SEGMENTATION"
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
              {totalCount}
            </span>
            <span style={{ fontSize: '0.625rem', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: 700 }}>
              Total
            </span>
          </div>
        </div>

        {/* Right Legend List */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '5px', flex: 1 }}>
          {CUSTOMERS_BY_TYPE_DATA.types.map((type) => (
            <div
              key={type.label}
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
              onClick={() => onSelectType && onSelectType(type.label)}
              aria-label={`Customer type ${type.label}: ${type.count} (${type.pct}%)`}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <span
                  style={{ width: '8px', height: '8px', borderRadius: '50%', background: type.color }}
                  aria-hidden="true"
                />
                <span style={{ fontWeight: 600 }}>{type.label}</span>
              </div>
              <span className="mono-data" style={{ fontWeight: 700 }}>
                {type.count} <span style={{ color: 'var(--text-muted)', fontSize: '0.65rem' }}>({type.pct}%)</span>
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
});

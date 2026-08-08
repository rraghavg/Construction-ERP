import { useMemo, memo, useCallback } from 'react';
import { useApp } from '../../../core/providers/AppContext';
import { DEPARTMENT_DISTRIBUTION_DATA } from '../../../data/mockData';
import { Doughnut } from 'react-chartjs-2';
import { PanelHeader } from '../../../shared/components/PanelHeader';
import { WidgetSkeleton } from '../../../shared/components/WidgetSkeleton';
import '../../../shared/utils/chartSetup';

export const DepartmentDistributionChart = memo(function DepartmentDistributionChart() {
  const { isRefreshing, navigateTo } = useApp();

  const { labels, values, colors, totalCount } = useMemo(() => {
    const raw = DEPARTMENT_DISTRIBUTION_DATA;
    return {
      labels: raw.departments.map((d) => d.label),
      values: raw.departments.map((d) => d.count),
      colors: raw.departments.map((d) => d.color),
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
    navigateTo('hr', 'Employees Directory');
  }, [navigateTo]);

  if (isRefreshing) {
    return <WidgetSkeleton height="220px" />;
  }

  return (
    <div className="data-grid-item" style={{ padding: '1.25rem' }}>
      <PanelHeader
        title="Employees by Department"
        accentColor="#16a34a"
        actionLabel="DEPARTMENTS"
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
              Employees
            </span>
          </div>
        </div>

        {/* Right Legend List */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '4px', flex: 1 }}>
          {DEPARTMENT_DISTRIBUTION_DATA.departments.map((dept) => (
            <div
              key={dept.label}
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
              aria-label={`Department ${dept.label}: ${dept.count} (${dept.pct}%)`}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <span
                  style={{ width: '8px', height: '8px', borderRadius: '50%', background: dept.color }}
                  aria-hidden="true"
                />
                <span style={{ fontWeight: 600 }}>{dept.label}</span>
              </div>
              <span className="mono-data" style={{ fontWeight: 700 }}>
                {dept.count} <span style={{ color: 'var(--text-muted)', fontSize: '0.625rem' }}>({dept.pct}%)</span>
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
});

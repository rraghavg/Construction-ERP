import { useMemo, memo, useCallback } from 'react';
import { useApp } from '../../context/AppContext';
import { CRM_LEADS_BY_SOURCE } from '../../data/mockData';
import { Doughnut } from 'react-chartjs-2';
import { PanelHeader } from '../shared/PanelHeader';
import { WidgetSkeleton } from '../shared/WidgetSkeleton';
import '../../utils/chartSetup';

export const CrmLeadsBySourceChart = memo(function CrmLeadsBySourceChart() {
  const { isRefreshing, navigateTo } = useApp();

  const { labels, values, colors, totalLeads } = useMemo(() => {
    const raw = CRM_LEADS_BY_SOURCE;
    const l = raw.sources.map((s) => s.label);
    const v = raw.sources.map((s) => s.count);
    const c = raw.sources.map((s) => s.color);
    return {
      labels: l,
      values: v,
      colors: c,
      totalLeads: raw.totalCount
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
          label: (context) => ` ${context.label}: ${context.parsed} Leads`
        }
      }
    }
  }), []);

  const handleAction = useCallback(() => {
    navigateTo('crm', 'Leads');
  }, [navigateTo]);

  if (isRefreshing) {
    return <WidgetSkeleton height="220px" />;
  }

  return (
    <div className="data-grid-item" style={{ padding: '1.25rem' }}>
      <PanelHeader
        title="Leads By Source"
        accentColor="#06b6d4"
        actionLabel="SOURCE MATRIX"
        onAction={handleAction}
      />

      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', height: '220px' }}>
        {/* Doughnut Chart */}
        <div style={{ position: 'relative', width: '150px', height: '150px', flexShrink: 0 }}>
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
              {totalLeads}
            </span>
            <span style={{ fontSize: '0.625rem', color: 'var(--text-muted)', textTransform: 'uppercase' }}>
              Total Leads
            </span>
          </div>
        </div>

        {/* Legend List */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', flex: 1 }}>
          {labels.map((source, index) => {
            const count = values[index];
            const pct = Math.round((count / totalLeads) * 100);

            return (
              <div
                key={source}
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
                aria-label={`Source ${source}: ${count} leads (${pct}%)`}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <span
                    style={{ width: '8px', height: '8px', borderRadius: '50%', background: colors[index] }}
                    aria-hidden="true"
                  />
                  <span>{source}</span>
                </div>
                <span className="mono-data" style={{ fontWeight: 700 }}>
                  {count} <span style={{ color: 'var(--text-muted)', fontSize: '0.65rem' }}>({pct}%)</span>
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
});

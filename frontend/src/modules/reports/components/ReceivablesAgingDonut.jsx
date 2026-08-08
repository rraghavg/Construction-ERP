import { useMemo, memo, useCallback } from 'react';
import { useApp } from '../../../core/providers/AppContext';
import { RECEIVABLES_AGING_DATA } from '../../../data/mockData';
import { Doughnut } from 'react-chartjs-2';
import { PanelHeader } from '../../../shared/components/PanelHeader';
import { WidgetSkeleton } from '../../../shared/components/WidgetSkeleton';
import '../../../shared/utils/chartSetup';

export const ReceivablesAgingDonut = memo(function ReceivablesAgingDonut() {
  const { isRefreshing, navigateTo } = useApp();

  const { labels, values, colors, formattedTotal } = useMemo(() => {
    const raw = RECEIVABLES_AGING_DATA;
    return {
      labels: raw.buckets.map((b) => b.range),
      values: raw.buckets.map((b) => b.pct),
      colors: raw.buckets.map((b) => b.color),
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
          label: (context) => ` ${context.label}: ${context.parsed}% of Receivables`
        }
      }
    }
  }), []);

  const handleAction = useCallback(() => {
    navigateTo('reports', 'Finance Reports');
  }, [navigateTo]);

  if (isRefreshing) {
    return <WidgetSkeleton height="220px" />;
  }

  return (
    <div className="data-grid-item" style={{ padding: '1.25rem' }}>
      <PanelHeader
        title="Receivables Aging Breakdown"
        accentColor="#f97316"
        actionLabel="AGING REPORT"
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
            <span className="mono-data" style={{ fontSize: '1.1rem', fontWeight: 800, color: '#f97316' }}>
              {formattedTotal}
            </span>
            <span style={{ fontSize: '0.625rem', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: 700 }}>
              Receivables
            </span>
          </div>
        </div>

        {/* Right Legend List */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '5px', flex: 1 }}>
          {RECEIVABLES_AGING_DATA.buckets.map((bkt) => (
            <div
              key={bkt.range}
              tabIndex={0}
              role="button"
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                fontSize: '0.675rem',
                padding: '4px 6px',
                background: bkt.urgent ? 'rgba(220, 38, 38, 0.08)' : 'var(--bg-input)',
                border: bkt.urgent ? '1px solid rgba(220, 38, 38, 0.2)' : 'none',
                borderRadius: '3px',
                cursor: 'pointer'
              }}
              onClick={handleAction}
              aria-label={`${bkt.range}: ${bkt.pct}% (${bkt.amount})`}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <span
                  style={{ width: '8px', height: '8px', borderRadius: '50%', background: bkt.color }}
                  aria-hidden="true"
                />
                <span style={{ fontWeight: 600, color: bkt.urgent ? '#dc2626' : 'var(--text-main)' }}>{bkt.range}</span>
              </div>
              <span className="mono-data" style={{ fontWeight: 700, color: bkt.urgent ? '#dc2626' : 'var(--text-main)' }}>
                {bkt.pct}% <span style={{ color: 'var(--text-muted)', fontSize: '0.625rem' }}>({bkt.amount})</span>
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
});

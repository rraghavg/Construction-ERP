import { useMemo, memo, useCallback } from 'react';
import { useApp } from '../../context/AppContext';
import { SLA_PERFORMANCE_DATA } from '../../data/mockData';
import { Doughnut } from 'react-chartjs-2';
import { PanelHeader } from '../shared/PanelHeader';
import { WidgetSkeleton } from '../shared/WidgetSkeleton';
import { Timer } from 'lucide-react';
import '../../utils/chartSetup';

export const SlaPerformanceGauge = memo(function SlaPerformanceGauge() {
  const { isRefreshing, navigateTo } = useApp();

  const chartData = useMemo(() => ({
    labels: ['SLA Met', 'SLA Breached'],
    datasets: [
      {
        data: [SLA_PERFORMANCE_DATA.slaMetPct, 100 - SLA_PERFORMANCE_DATA.slaMetPct],
        backgroundColor: ['#16a34a', '#dc2626'],
        borderWidth: 0,
        circumference: 180,
        rotation: 270
      }
    ]
  }), []);

  const options = useMemo(() => ({
    responsive: true,
    maintainAspectRatio: false,
    cutout: '75%',
    plugins: {
      legend: { display: false },
      tooltip: {
        callbacks: {
          label: (context) => ` ${context.label}: ${context.parsed}%`
        }
      }
    }
  }), []);

  const handleAction = useCallback(() => {
    navigateTo('maintenance', 'SLA / TAT Report');
  }, [navigateTo]);

  if (isRefreshing) {
    return <WidgetSkeleton height="220px" />;
  }

  return (
    <div className="data-grid-item" style={{ padding: '1.25rem' }}>
      <PanelHeader
        title="SLA Compliance Performance"
        icon={<Timer size={15} color="#8b5cf6" />}
        accentColor="#8b5cf6"
        actionLabel="SLA REPORT"
        onAction={handleAction}
      />

      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '220px' }}>
        {/* Semi Donut Gauge */}
        <div style={{ position: 'relative', width: '180px', height: '100px' }}>
          <Doughnut data={chartData} options={options} />
          <div
            style={{
              position: 'absolute',
              bottom: '10px',
              left: 0,
              right: 0,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              pointerEvents: 'none'
            }}
          >
            <span className="mono-data" style={{ fontSize: '1.5rem', fontWeight: 800, color: '#16a34a' }}>
              {SLA_PERFORMANCE_DATA.slaMetPct}%
            </span>
            <span style={{ fontSize: '0.65rem', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: 700 }}>
              Target: {SLA_PERFORMANCE_DATA.targetPct}%
            </span>
          </div>
        </div>

        {/* Footer Metrics Breakdown */}
        <div style={{ display: 'flex', gap: '1.5rem', marginTop: '1rem', textAlign: 'center', fontSize: '0.725rem' }}>
          <div>
            <div className="mono-data" style={{ fontWeight: '800', color: '#16a34a', fontSize: '0.9rem' }}>
              {SLA_PERFORMANCE_DATA.withinSla}
            </div>
            <div style={{ fontSize: '0.65rem', color: 'var(--text-muted)' }}>Within SLA</div>
          </div>
          <div style={{ borderLeft: '1px solid var(--border-color)', paddingLeft: '1.5rem' }}>
            <div className="mono-data" style={{ fontWeight: '800', color: '#dc2626', fontSize: '0.9rem' }}>
              {SLA_PERFORMANCE_DATA.breachedSla}
            </div>
            <div style={{ fontSize: '0.65rem', color: 'var(--text-muted)' }}>Breached SLA</div>
          </div>
        </div>
      </div>
    </div>
  );
});

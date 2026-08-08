import { useMemo, memo, useCallback } from 'react';
import { useApp } from '../../../core/providers/AppContext';
import { Line } from 'react-chartjs-2';
import { PanelHeader } from '../../../shared/components/PanelHeader';
import { WidgetSkeleton } from '../../../shared/components/WidgetSkeleton';
import '../../../shared/utils/chartSetup';

export const ActivityTrendChart = memo(function ActivityTrendChart() {
  const { isRefreshing, navigateTo } = useApp();

  const chartData = useMemo(() => ({
    labels: ['01 Jul', '05 Jul', '10 Jul', '15 Jul', '20 Jul', '25 Jul', '01 Aug'],
    datasets: [
      {
        label: 'System Activity Events',
        data: [1420, 1650, 1580, 1890, 1750, 1980, 2150],
        borderColor: '#2563eb',
        backgroundColor: 'rgba(37, 99, 235, 0.08)',
        fill: true,
        tension: 0.3,
        borderWidth: 2,
        pointRadius: 3
      }
    ]
  }), []);

  const options = useMemo(() => ({
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
      tooltip: {
        callbacks: {
          label: (context) => ` ${context.parsed.y.toLocaleString()} Audit Events`
        }
      }
    },
    scales: {
      x: {
        grid: { color: 'rgba(0, 0, 0, 0.05)' },
        ticks: { color: '#64748b', font: { family: 'JetBrains Mono', size: 10 } }
      },
      y: {
        grid: { color: 'rgba(0, 0, 0, 0.05)' },
        ticks: { color: '#64748b', font: { family: 'JetBrains Mono', size: 10 } }
      }
    }
  }), []);

  const handleAction = useCallback(() => {
    navigateTo('audit-logs', 'All Audit Logs');
  }, [navigateTo]);

  if (isRefreshing) {
    return <WidgetSkeleton height="220px" />;
  }

  return (
    <div className="data-grid-item" style={{ padding: '1.25rem' }}>
      <PanelHeader
        title="30-Day System Activity Volume Trend"
        accentColor="#2563eb"
        actionLabel="ALL LOGS"
        onAction={handleAction}
      />

      <div className="chart-container" style={{ height: '220px' }}>
        <Line data={chartData} options={options} />
      </div>
    </div>
  );
});

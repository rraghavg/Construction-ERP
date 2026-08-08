import { useMemo, memo, useCallback } from 'react';
import { useApp } from '../../../core/providers/AppContext';
import { TOP_USERS_BY_ACTIVITY_DATA } from '../../../data/mockData';
import { Bar } from 'react-chartjs-2';
import { PanelHeader } from '../../../shared/components/PanelHeader';
import { WidgetSkeleton } from '../../../shared/components/WidgetSkeleton';
import '../../../shared/utils/chartSetup';

export const TopUsersByActivityChart = memo(function TopUsersByActivityChart() {
  const { isRefreshing, navigateTo } = useApp();

  const chartData = useMemo(() => ({
    labels: TOP_USERS_BY_ACTIVITY_DATA.map((u) => u.user.split(' ')[0] + ' ' + u.user.split(' ')[1]),
    datasets: [
      {
        label: 'Audit Events',
        data: TOP_USERS_BY_ACTIVITY_DATA.map((u) => u.count),
        backgroundColor: TOP_USERS_BY_ACTIVITY_DATA.map((u) => u.color),
        borderRadius: 4
      }
    ]
  }), []);

  const options = useMemo(() => ({
    indexAxis: 'y',
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
      tooltip: {
        callbacks: {
          label: (context) => ` ${context.label}: ${context.parsed.x} Audit Events`
        }
      }
    },
    scales: {
      x: {
        grid: { color: 'rgba(0, 0, 0, 0.05)' },
        ticks: { color: '#64748b', font: { family: 'JetBrains Mono', size: 10 } }
      },
      y: {
        grid: { display: false },
        ticks: { color: '#64748b', font: { family: 'Inter', size: 10 } }
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
        title="Top Users by Activity Volume"
        accentColor="#8b5cf6"
        actionLabel="TOP USERS"
        onAction={handleAction}
      />

      <div className="chart-container" style={{ height: '220px' }}>
        <Bar data={chartData} options={options} />
      </div>
    </div>
  );
});

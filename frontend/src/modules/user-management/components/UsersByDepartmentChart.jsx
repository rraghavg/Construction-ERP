import { useMemo, memo, useCallback } from 'react';
import { useApp } from '../../../core/providers/AppContext';
import { USERS_BY_DEPARTMENT_DATA } from '../../../data/mockData';
import { Bar } from 'react-chartjs-2';
import { PanelHeader } from '../../../shared/components/PanelHeader';
import { WidgetSkeleton } from '../../../shared/components/WidgetSkeleton';
import '../../../shared/utils/chartSetup';

export const UsersByDepartmentChart = memo(function UsersByDepartmentChart() {
  const { isRefreshing, navigateTo } = useApp();

  const chartData = useMemo(() => ({
    labels: USERS_BY_DEPARTMENT_DATA.map((d) => d.department),
    datasets: [
      {
        label: 'System Users',
        data: USERS_BY_DEPARTMENT_DATA.map((d) => d.count),
        backgroundColor: USERS_BY_DEPARTMENT_DATA.map((d) => d.color),
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
          label: (context) => ` ${context.label}: ${context.parsed.x} Users`
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
    navigateTo('user-mgmt', 'Users Directory');
  }, [navigateTo]);

  if (isRefreshing) {
    return <WidgetSkeleton height="220px" />;
  }

  return (
    <div className="data-grid-item" style={{ padding: '1.25rem' }}>
      <PanelHeader
        title="Users by Department"
        accentColor="#16a34a"
        actionLabel="DEPARTMENTS"
        onAction={handleAction}
      />

      <div className="chart-container" style={{ height: '220px' }}>
        <Bar data={chartData} options={options} />
      </div>
    </div>
  );
});

import { useMemo, memo, useCallback } from 'react';
import { useApp } from '../../context/AppContext';
import { COMPLAINTS_BY_CATEGORY_DATA } from '../../data/mockData';
import { Bar } from 'react-chartjs-2';
import { PanelHeader } from '../shared/PanelHeader';
import { WidgetSkeleton } from '../shared/WidgetSkeleton';
import '../../utils/chartSetup';

export const ComplaintsByCategoryChart = memo(function ComplaintsByCategoryChart() {
  const { isRefreshing, navigateTo } = useApp();

  const chartData = useMemo(() => ({
    labels: COMPLAINTS_BY_CATEGORY_DATA.map((c) => c.category),
    datasets: [
      {
        label: 'Complaints Count',
        data: COMPLAINTS_BY_CATEGORY_DATA.map((c) => c.count),
        backgroundColor: COMPLAINTS_BY_CATEGORY_DATA.map((c) => c.color),
        borderRadius: 4,
        barThickness: 14
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
          label: (context) => ` ${context.label}: ${context.parsed.x} Complaints`
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
        ticks: { color: '#64748b', font: { family: 'Inter', size: 11, weight: '600' } }
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
        title="Complaints by Category"
        accentColor="#06b6d4"
        actionLabel="CATEGORY REPORT"
        onAction={handleAction}
      />

      <div className="chart-container" style={{ height: '220px' }}>
        <Bar data={chartData} options={options} />
      </div>
    </div>
  );
});

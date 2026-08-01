import { useState, useMemo, memo, useCallback } from 'react';
import { useApp } from '../../context/AppContext';
import { HEADCOUNT_TREND_SERIES } from '../../data/mockData';
import { Line } from 'react-chartjs-2';
import { PanelHeader } from '../shared/PanelHeader';
import { WidgetSkeleton } from '../shared/WidgetSkeleton';
import '../../utils/chartSetup';

export const EmployeeHeadcountChart = memo(function EmployeeHeadcountChart() {
  const { isRefreshing, navigateTo } = useApp();
  const [range, setRange] = useState('6M');

  const rawData = useMemo(() => {
    return HEADCOUNT_TREND_SERIES[range] || HEADCOUNT_TREND_SERIES['6M'];
  }, [range]);

  const chartData = useMemo(() => ({
    labels: rawData.months,
    datasets: [
      {
        label: 'Active Headcount',
        data: rawData.counts,
        borderColor: '#2563eb',
        backgroundColor: 'rgba(37, 99, 235, 0.1)',
        fill: true,
        tension: 0.35,
        pointBackgroundColor: '#1e293b',
        pointBorderColor: '#2563eb'
      }
    ]
  }), [rawData]);

  const options = useMemo(() => ({
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top',
        labels: { color: '#64748b', font: { family: 'JetBrains Mono', size: 10 } }
      },
      tooltip: {
        callbacks: {
          label: (context) => ` Active Headcount: ${context.parsed.y} Employees`
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
        ticks: {
          color: '#64748b',
          font: { family: 'JetBrains Mono', size: 10 }
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
        title="Employee Headcount Growth"
        accentColor="#2563eb"
        actionLabel="EMPLOYEES LIST"
        onAction={handleAction}
      >
        <select
          className="select-input mono-data"
          value={range}
          onChange={(e) => setRange(e.target.value)}
          aria-label="Select range for headcount trend"
          style={{ fontSize: '0.7rem', padding: '0.2rem 0.4rem' }}
        >
          <option value="6M">Last 6 Months</option>
          <option value="3M">Last 3 Months</option>
          <option value="12M">Last 12 Months</option>
        </select>
      </PanelHeader>

      <div className="chart-container" style={{ height: '220px' }}>
        <Line data={chartData} options={options} />
      </div>
    </div>
  );
});

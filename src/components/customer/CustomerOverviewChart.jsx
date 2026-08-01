import { useState, useMemo, memo, useCallback } from 'react';
import { useApp } from '../../context/AppContext';
import { CUSTOMER_OVERVIEW_SERIES } from '../../data/mockData';
import { Line } from 'react-chartjs-2';
import { PanelHeader } from '../shared/PanelHeader';
import { WidgetSkeleton } from '../shared/WidgetSkeleton';
import '../../utils/chartSetup';

export const CustomerOverviewChart = memo(function CustomerOverviewChart() {
  const { isRefreshing, navigateTo } = useApp();
  const [range, setRange] = useState('6M');

  const rawData = useMemo(() => {
    return CUSTOMER_OVERVIEW_SERIES[range] || CUSTOMER_OVERVIEW_SERIES['6M'];
  }, [range]);

  const chartData = useMemo(() => ({
    labels: rawData.months,
    datasets: [
      {
        label: 'Active Customers',
        data: rawData.activeCustomers,
        borderColor: '#2563eb',
        backgroundColor: 'rgba(37, 99, 235, 0.1)',
        fill: true,
        tension: 0.35,
        pointBackgroundColor: '#1e293b',
        pointBorderColor: '#2563eb'
      },
      {
        label: 'New Customers',
        data: rawData.newCustomers,
        borderColor: '#06b6d4',
        backgroundColor: 'rgba(6, 182, 212, 0.1)',
        fill: true,
        tension: 0.35,
        pointBackgroundColor: '#1e293b',
        pointBorderColor: '#06b6d4'
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
          label: (context) => ` ${context.dataset.label}: ${context.parsed.y}`
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
    navigateTo('customer-mgmt', 'Customers Directory');
  }, [navigateTo]);

  if (isRefreshing) {
    return <WidgetSkeleton height="220px" />;
  }

  return (
    <div className="data-grid-item" style={{ padding: '1.25rem' }}>
      <PanelHeader
        title="Customer Growth & Activity Trend"
        accentColor="#2563eb"
        actionLabel="CUSTOMERS DIRECTORY"
        onAction={handleAction}
      >
        <select
          className="select-input mono-data"
          value={range}
          onChange={(e) => setRange(e.target.value)}
          aria-label="Select date range for customer overview"
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

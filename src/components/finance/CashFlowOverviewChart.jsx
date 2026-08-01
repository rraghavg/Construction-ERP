import { useState, useMemo, memo, useCallback } from 'react';
import { useApp } from '../../context/AppContext';
import { CASH_FLOW_SERIES } from '../../data/mockData';
import { Line } from 'react-chartjs-2';
import { PanelHeader } from '../shared/PanelHeader';
import { WidgetSkeleton } from '../shared/WidgetSkeleton';
import '../../utils/chartSetup';

export const CashFlowOverviewChart = memo(function CashFlowOverviewChart() {
  const { isRefreshing, navigateTo } = useApp();
  const [range, setRange] = useState('6M');

  const rawData = useMemo(() => {
    return CASH_FLOW_SERIES[range] || CASH_FLOW_SERIES['6M'];
  }, [range]);

  const chartData = useMemo(() => ({
    labels: rawData.months,
    datasets: [
      {
        label: 'Inflow (₹ L)',
        data: rawData.inflowL,
        borderColor: '#16a34a',
        backgroundColor: 'rgba(22, 163, 74, 0.08)',
        fill: false,
        tension: 0.3
      },
      {
        label: 'Outflow (₹ L)',
        data: rawData.outflowL,
        borderColor: '#dc2626',
        backgroundColor: 'rgba(220, 38, 38, 0.08)',
        fill: false,
        tension: 0.3
      },
      {
        label: 'Net Flow (₹ L)',
        data: rawData.netFlowL,
        borderColor: '#2563eb',
        backgroundColor: 'rgba(37, 99, 235, 0.08)',
        borderDash: [4, 4],
        fill: false,
        tension: 0.3
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
          label: (context) => ` ${context.dataset.label}: ₹ ${context.parsed.y} Lakhs`
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
          font: { family: 'JetBrains Mono', size: 10 },
          callback: (value) => `₹ ${value} L`
        }
      }
    }
  }), []);

  const handleAction = useCallback(() => {
    navigateTo('finance', 'Financial Reports');
  }, [navigateTo]);

  if (isRefreshing) {
    return <WidgetSkeleton height="220px" />;
  }

  return (
    <div className="data-grid-item" style={{ padding: '1.25rem' }}>
      <PanelHeader
        title="Cash Flow Overview (Inflow vs Outflow)"
        accentColor="#16a34a"
        actionLabel="CASH FLOW REPORT"
        onAction={handleAction}
      >
        <select
          className="select-input mono-data"
          value={range}
          onChange={(e) => setRange(e.target.value)}
          aria-label="Select range for cash flow"
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

import { useState, useMemo, memo, useCallback } from 'react';
import { useApp } from '../../../core/providers/AppContext';
import { STOCK_VALUE_TREND_SERIES } from '../../../data/mockData';
import { Line } from 'react-chartjs-2';
import { PanelHeader } from '../../../shared/components/PanelHeader';
import { WidgetSkeleton } from '../../../shared/components/WidgetSkeleton';
import '../../../shared/utils/chartSetup';

export const StockValueTrendChart = memo(function StockValueTrendChart() {
  const { isRefreshing, navigateTo } = useApp();
  const [range, setRange] = useState('6M');

  const rawData = useMemo(() => {
    return STOCK_VALUE_TREND_SERIES[range] || STOCK_VALUE_TREND_SERIES['6M'];
  }, [range]);

  const chartData = useMemo(() => ({
    labels: rawData.months,
    datasets: [
      {
        label: 'Total Stock Valuation (₹ Cr)',
        data: rawData.valuesCr,
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
          label: (context) => ` Stock Valuation: ₹ ${context.parsed.y} Cr`
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
          callback: (value) => `₹ ${value} Cr`
        }
      }
    }
  }), []);

  const handleAction = useCallback(() => {
    navigateTo('inventory', 'Reports & Valuation');
  }, [navigateTo]);

  if (isRefreshing) {
    return <WidgetSkeleton height="220px" />;
  }

  return (
    <div className="data-grid-item" style={{ padding: '1.25rem' }}>
      <PanelHeader
        title="Stock Value Trend (₹ Cr)"
        accentColor="#2563eb"
        actionLabel="VALUATION REPORT"
        onAction={handleAction}
      >
        <select
          className="select-input mono-data"
          value={range}
          onChange={(e) => setRange(e.target.value)}
          aria-label="Select date range for stock value trend"
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

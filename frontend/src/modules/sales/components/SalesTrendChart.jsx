import { useState, useMemo, memo, useCallback } from 'react';
import { useApp } from '../../../core/providers/AppContext';
import { SALES_TREND_SERIES } from '../../../data/mockData';
import { Line } from 'react-chartjs-2';
import { PanelHeader } from '../../../shared/components/PanelHeader';
import { WidgetSkeleton } from '../../../shared/components/WidgetSkeleton';
import { MaskedOverlay } from '../../../shared/components/MaskedOverlay';
import '../../../shared/utils/chartSetup';

export const SalesTrendChart = memo(function SalesTrendChart() {
  const { isRefreshing, activePermissions, navigateTo } = useApp();
  const [range, setRange] = useState('This Year');

  const rawData = useMemo(() => {
    return SALES_TREND_SERIES[range] || SALES_TREND_SERIES['This Year'];
  }, [range]);

  const chartData = useMemo(() => ({
    labels: rawData.months,
    datasets: [
      {
        label: 'Sales Revenue (₹ Cr)',
        data: rawData.values,
        borderColor: '#2563eb',
        backgroundColor: 'rgba(37, 99, 235, 0.12)',
        fill: true,
        tension: 0.35,
        pointBackgroundColor: '#1e293b',
        pointBorderColor: '#2563eb',
        pointHoverRadius: 6
      }
    ]
  }), [rawData]);

  const options = useMemo(() => ({
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
      tooltip: {
        callbacks: {
          label: (context) => ` Sales Value: ₹ ${context.parsed.y} Cr`
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
    navigateTo('sales', 'Bookings');
  }, [navigateTo]);

  if (isRefreshing) {
    return <WidgetSkeleton height="220px" />;
  }

  return (
    <div className="data-grid-item" style={{ padding: '1.25rem' }}>
      <PanelHeader
        title="Sales Trend (₹ Cr)"
        accentColor="#2563eb"
        actionLabel="BOOKINGS REGISTER"
        onAction={handleAction}
      >
        <select
          className="select-input mono-data"
          value={range}
          onChange={(e) => setRange(e.target.value)}
          aria-label="Select date range for sales trend"
          style={{ fontSize: '0.7rem', padding: '0.2rem 0.4rem' }}
        >
          <option value="This Year">This Year</option>
          <option value="6M">Last 6 Months</option>
          <option value="Quarter">Current Quarter</option>
          <option value="12M">Last 12 Months</option>
        </select>
      </PanelHeader>

      <div className="chart-container" style={{ height: '220px' }}>
        {activePermissions.maskedFinance ? (
          <MaskedOverlay label="SALES_TREND_MASKED" />
        ) : (
          <Line data={chartData} options={options} />
        )}
      </div>
    </div>
  );
});

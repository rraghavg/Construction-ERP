import { useState, useMemo, memo, useCallback } from 'react';
import { useApp } from '../../context/AppContext';
import { RENT_COLLECTION_TREND_SERIES } from '../../data/mockData';
import { Line } from 'react-chartjs-2';
import { PanelHeader } from '../shared/PanelHeader';
import { WidgetSkeleton } from '../shared/WidgetSkeleton';
import { MaskedOverlay } from '../shared/MaskedOverlay';
import '../../utils/chartSetup';

export const RentCollectionTrendChart = memo(function RentCollectionTrendChart() {
  const { isRefreshing, activePermissions, navigateTo } = useApp();
  const [range, setRange] = useState('6M');

  const rawData = useMemo(() => {
    return RENT_COLLECTION_TREND_SERIES[range] || RENT_COLLECTION_TREND_SERIES['6M'];
  }, [range]);

  const chartData = useMemo(() => ({
    labels: rawData.months,
    datasets: [
      {
        label: 'Expected Rent (₹ L)',
        data: rawData.expectedRentL,
        borderColor: '#2563eb',
        backgroundColor: 'rgba(37, 99, 235, 0.1)',
        fill: true,
        tension: 0.35,
        pointBackgroundColor: '#1e293b',
        pointBorderColor: '#2563eb'
      },
      {
        label: 'Collected Rent (₹ L)',
        data: rawData.collectedRentL,
        borderColor: '#16a34a',
        backgroundColor: 'rgba(22, 163, 74, 0.1)',
        fill: true,
        tension: 0.35,
        pointBackgroundColor: '#1e293b',
        pointBorderColor: '#16a34a'
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
          label: (context) => ` ${context.dataset.label}: ₹ ${context.parsed.y} L`
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
    navigateTo('rental-mgmt', 'Rent Collection');
  }, [navigateTo]);

  if (isRefreshing) {
    return <WidgetSkeleton height="220px" />;
  }

  return (
    <div className="data-grid-item" style={{ padding: '1.25rem' }}>
      <PanelHeader
        title="Rent Collection Trend (₹ Lakhs)"
        accentColor="#2563eb"
        actionLabel="COLLECTION REGISTER"
        onAction={handleAction}
      >
        <select
          className="select-input mono-data"
          value={range}
          onChange={(e) => setRange(e.target.value)}
          aria-label="Select date range for rent collection trend"
          style={{ fontSize: '0.7rem', padding: '0.2rem 0.4rem' }}
        >
          <option value="6M">Last 6 Months</option>
          <option value="3M">Last 3 Months</option>
          <option value="12M">Last 12 Months</option>
        </select>
      </PanelHeader>

      <div className="chart-container" style={{ height: '220px' }}>
        {activePermissions.maskedFinance ? (
          <MaskedOverlay label="RENT_TREND_MASKED" />
        ) : (
          <Line data={chartData} options={options} />
        )}
      </div>
    </div>
  );
});

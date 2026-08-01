import { useMemo, memo, useCallback } from 'react';
import { useApp } from '../context/AppContext';
import { COLLECTION_OVERVIEW_DATA } from '../data/mockData';
import { Bar } from 'react-chartjs-2';
import { PanelHeader } from './shared/PanelHeader';
import { WidgetSkeleton } from './shared/WidgetSkeleton';
import { MaskedOverlay } from './shared/MaskedOverlay';

export const CollectionOverviewChart = memo(function CollectionOverviewChart() {
  const { isRefreshing, activePermissions, navigateTo } = useApp();

  const chartData = useMemo(() => ({
    labels: COLLECTION_OVERVIEW_DATA.months,
    datasets: [
      {
        label: 'Collected (₹ Cr)',
        data: COLLECTION_OVERVIEW_DATA.collected,
        backgroundColor: '#16a34a',
        borderRadius: 2
      },
      {
        label: 'Pending (₹ Cr)',
        data: COLLECTION_OVERVIEW_DATA.pending,
        backgroundColor: '#f97316',
        borderRadius: 2
      }
    ]
  }), []);

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
          label: (context) => ` ${context.dataset.label}: ₹ ${context.parsed.y} Cr`
        }
      }
    },
    scales: {
      x: {
        grid: { display: false },
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
    navigateTo('finance', 'Receipts & Payments');
  }, [navigateTo]);

  if (isRefreshing) {
    return <WidgetSkeleton height="230px" />;
  }

  return (
    <div className="data-grid-item" style={{ padding: '1.25rem' }}>
      <PanelHeader
        title="Collection Overview"
        accentColor="#16a34a"
        actionLabel="FINANCE"
        onAction={handleAction}
      />

      <div className="chart-container" style={{ height: '230px' }}>
        {activePermissions.maskedFinance ? (
          <MaskedOverlay label="RECEIVABLES_MASKED" />
        ) : (
          <Bar data={chartData} options={options} />
        )}
      </div>
    </div>
  );
});

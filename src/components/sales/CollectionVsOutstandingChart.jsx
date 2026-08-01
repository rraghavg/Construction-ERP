import { useMemo, memo, useCallback } from 'react';
import { useApp } from '../../context/AppContext';
import { COLLECTION_VS_OUTSTANDING_DATA } from '../../data/mockData';
import { Bar } from 'react-chartjs-2';
import { PanelHeader } from '../shared/PanelHeader';
import { WidgetSkeleton } from '../shared/WidgetSkeleton';
import { MaskedOverlay } from '../shared/MaskedOverlay';
import '../../utils/chartSetup';

export const CollectionVsOutstandingChart = memo(function CollectionVsOutstandingChart() {
  const { isRefreshing, activePermissions, navigateTo } = useApp();

  const chartData = useMemo(() => ({
    labels: COLLECTION_VS_OUTSTANDING_DATA.months,
    datasets: [
      {
        label: 'Collection (₹ Cr)',
        data: COLLECTION_VS_OUTSTANDING_DATA.collection,
        backgroundColor: '#16a34a',
        borderRadius: 2
      },
      {
        label: 'Outstanding (₹ Cr)',
        data: COLLECTION_VS_OUTSTANDING_DATA.outstanding,
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
    navigateTo('sales', 'Receipts');
  }, [navigateTo]);

  if (isRefreshing) {
    return <WidgetSkeleton height="220px" />;
  }

  return (
    <div className="data-grid-item" style={{ padding: '1.25rem' }}>
      <PanelHeader
        title="Collection vs Outstanding (₹ Cr)"
        accentColor="#f97316"
        actionLabel="RECEIPTS & DUES"
        onAction={handleAction}
      />

      <div className="chart-container" style={{ height: '220px' }}>
        {activePermissions.maskedFinance ? (
          <MaskedOverlay label="RECEIVABLES_MASKED" />
        ) : (
          <Bar data={chartData} options={options} />
        )}
      </div>
    </div>
  );
});

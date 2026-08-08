import { useMemo, memo, useCallback } from 'react';
import { useApp } from '../../../core/providers/AppContext';
import { INCOME_VS_EXPENSE_SERIES } from '../../../data/mockData';
import { Bar } from 'react-chartjs-2';
import { PanelHeader } from '../../../shared/components/PanelHeader';
import { WidgetSkeleton } from '../../../shared/components/WidgetSkeleton';
import '../../../shared/utils/chartSetup';

export const IncomeVsExpenseChart = memo(function IncomeVsExpenseChart() {
  const { isRefreshing, navigateTo } = useApp();

  const chartData = useMemo(() => ({
    labels: INCOME_VS_EXPENSE_SERIES.months,
    datasets: [
      {
        label: 'Total Income (₹ L)',
        data: INCOME_VS_EXPENSE_SERIES.incomeL,
        backgroundColor: '#2563eb',
        borderRadius: 3
      },
      {
        label: 'Total Expenses (₹ L)',
        data: INCOME_VS_EXPENSE_SERIES.expenseL,
        backgroundColor: '#f97316',
        borderRadius: 3
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
        title="Income vs Expenses (Monthly)"
        accentColor="#2563eb"
        actionLabel="P&L SUMMARY"
        onAction={handleAction}
      />

      <div className="chart-container" style={{ height: '220px' }}>
        <Bar data={chartData} options={options} />
      </div>
    </div>
  );
});

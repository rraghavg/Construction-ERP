import { useState, useMemo, memo, useCallback } from 'react';
import { useApp } from '../context/AppContext';
import { SALES_OVERVIEW_DATA } from '../data/mockData';
import { Line } from 'react-chartjs-2';
import { PanelHeader } from './shared/PanelHeader';
import { WidgetSkeleton } from './shared/WidgetSkeleton';
import { MaskedOverlay } from './shared/MaskedOverlay';

export const SalesOverviewChart = memo(function SalesOverviewChart() {
  const { isRefreshing, activePermissions, navigateTo } = useApp();
  const [selectedProject, setSelectedProject] = useState('All Projects');

  const rawData = useMemo(() => {
    return SALES_OVERVIEW_DATA.projects[selectedProject] || SALES_OVERVIEW_DATA.projects['All Projects'];
  }, [selectedProject]);

  const chartData = useMemo(() => ({
    labels: SALES_OVERVIEW_DATA.months,
    datasets: [
      {
        label: `Sales (₹ Cr) - ${selectedProject}`,
        data: rawData,
        borderColor: '#2563eb',
        backgroundColor: 'rgba(37, 99, 235, 0.1)',
        fill: true,
        tension: 0.2,
        pointBackgroundColor: '#1e293b',
        pointBorderColor: '#2563eb'
      }
    ]
  }), [rawData, selectedProject]);

  const options = useMemo(() => ({
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
      tooltip: {
        callbacks: {
          label: (context) => ` Sales: ₹ ${context.parsed.y} Cr`
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
    navigateTo('sales', 'Sales Analytics');
  }, [navigateTo]);

  if (isRefreshing) {
    return <WidgetSkeleton height="230px" />;
  }

  return (
    <div className="data-grid-item" style={{ padding: '1.25rem' }}>
      <PanelHeader
        title="Sales Overview"
        accentColor="#1e293b"
        actionLabel="VIEW"
        onAction={handleAction}
      >
        <select
          className="select-input mono-data"
          value={selectedProject}
          onChange={(e) => setSelectedProject(e.target.value)}
          aria-label="Select project for sales overview"
          style={{ fontSize: '0.725rem', padding: '0.2rem 0.5rem' }}
        >
          {Object.keys(SALES_OVERVIEW_DATA.projects).map((proj) => (
            <option key={proj} value={proj}>
              {proj}
            </option>
          ))}
        </select>
      </PanelHeader>

      <div className="chart-container" style={{ height: '230px' }}>
        {activePermissions.maskedFinance ? (
          <MaskedOverlay label="MASKED_TELEMETRY" />
        ) : (
          <Line data={chartData} options={options} />
        )}
      </div>
    </div>
  );
});

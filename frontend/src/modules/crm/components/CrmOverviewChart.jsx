import { useState, useMemo, memo, useCallback } from 'react';
import { useApp } from '../../../core/providers/AppContext';
import { CRM_LEADS_OVERVIEW_SERIES } from '../../../data/mockData';
import { Line } from 'react-chartjs-2';
import { PanelHeader } from '../../../shared/components/PanelHeader';
import { WidgetSkeleton } from '../../../shared/components/WidgetSkeleton';
import '../../../shared/utils/chartSetup';

export const CrmOverviewChart = memo(function CrmOverviewChart() {
  const { isRefreshing, navigateTo } = useApp();
  const [range, setRange] = useState('30D');

  const rawData = useMemo(() => {
    return CRM_LEADS_OVERVIEW_SERIES[range] || CRM_LEADS_OVERVIEW_SERIES['30D'];
  }, [range]);

  const chartData = useMemo(() => ({
    labels: rawData.dates,
    datasets: [
      {
        label: 'New Leads',
        data: rawData.newLeads,
        borderColor: '#2563eb',
        backgroundColor: 'rgba(37, 99, 235, 0.1)',
        fill: true,
        tension: 0.3,
        pointBackgroundColor: '#1e293b',
        pointBorderColor: '#2563eb'
      },
      {
        label: 'Converted Leads',
        data: rawData.convertedLeads,
        borderColor: '#16a34a',
        backgroundColor: 'rgba(22, 163, 74, 0.05)',
        fill: true,
        tension: 0.3,
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
    navigateTo('crm', 'Leads');
  }, [navigateTo]);

  if (isRefreshing) {
    return <WidgetSkeleton height="220px" />;
  }

  return (
    <div className="data-grid-item" style={{ padding: '1.25rem' }}>
      <PanelHeader
        title="Leads Volume & Quality"
        accentColor="#2563eb"
        actionLabel="VIEW LEADS"
        onAction={handleAction}
      >
        <select
          className="select-input mono-data"
          value={range}
          onChange={(e) => setRange(e.target.value)}
          aria-label="Select date range for lead analytics"
          style={{ fontSize: '0.7rem', padding: '0.2rem 0.4rem' }}
        >
          <option value="7D">Last 7 Days</option>
          <option value="30D">Last 30 Days</option>
          <option value="90D">Last 90 Days</option>
        </select>
      </PanelHeader>

      <div className="chart-container" style={{ height: '220px' }}>
        <Line data={chartData} options={options} />
      </div>
    </div>
  );
});

import { useMemo, memo, useCallback } from 'react';
import { useApp } from '../../context/AppContext';
import { RENT_COLLECTION_STATUS_DATA } from '../../data/mockData';
import { Doughnut } from 'react-chartjs-2';
import { PanelHeader } from '../shared/PanelHeader';
import { WidgetSkeleton } from '../shared/WidgetSkeleton';
import { MaskedOverlay } from '../shared/MaskedOverlay';
import '../../utils/chartSetup';

export const RentCollectionStatusDonut = memo(function RentCollectionStatusDonut() {
  const { isRefreshing, activePermissions, navigateTo } = useApp();

  const { labels, values, colors, collectionPct } = useMemo(() => {
    const raw = RENT_COLLECTION_STATUS_DATA;
    return {
      labels: raw.segments.map((s) => s.label),
      values: raw.segments.map((s) => s.amountL),
      colors: raw.segments.map((s) => s.color),
      collectionPct: raw.collectionPct
    };
  }, []);

  const chartData = useMemo(() => ({
    labels,
    datasets: [
      {
        data: values,
        backgroundColor: colors,
        borderWidth: 0,
        hoverOffset: 4
      }
    ]
  }), [labels, values, colors]);

  const options = useMemo(() => ({
    responsive: true,
    maintainAspectRatio: false,
    cutout: '72%',
    plugins: {
      legend: { display: false },
      tooltip: {
        callbacks: {
          label: (context) => ` ${context.label}: ₹ ${context.parsed} L`
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
        title="Rent Realization Status"
        accentColor="#06b6d4"
        actionLabel="OVERDUE LIST"
        onAction={handleAction}
      />

      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', height: '220px' }}>
        {/* Donut Chart */}
        <div style={{ position: 'relative', width: '145px', height: '145px', flexShrink: 0 }}>
          {activePermissions.maskedFinance ? (
            <MaskedOverlay label="STATUS_MASKED" />
          ) : (
            <>
              <Doughnut data={chartData} options={options} />
              <div
                style={{
                  position: 'absolute',
                  inset: 0,
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  pointerEvents: 'none'
                }}
              >
                <span className="mono-data" style={{ fontSize: '1.25rem', fontWeight: 800, color: '#16a34a' }}>
                  {collectionPct}%
                </span>
                <span style={{ fontSize: '0.625rem', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: 700 }}>
                  Realized
                </span>
              </div>
            </>
          )}
        </div>

        {/* Right Legend List */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', flex: 1 }}>
          {RENT_COLLECTION_STATUS_DATA.segments.map((seg) => (
            <div
              key={seg.label}
              tabIndex={0}
              role="button"
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                fontSize: '0.75rem',
                padding: '6px 8px',
                background: 'var(--bg-input)',
                borderRadius: '4px',
                border: '1px solid var(--border-color)',
                cursor: 'pointer'
              }}
              onClick={handleAction}
              aria-label={`${seg.label}: ₹ ${seg.amountL} L`}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <span
                  style={{ width: '10px', height: '10px', borderRadius: '50%', background: seg.color }}
                  aria-hidden="true"
                />
                <span style={{ fontWeight: 700 }}>{seg.label}</span>
              </div>
              <span className="mono-data" style={{ fontWeight: 800, color: activePermissions.maskedFinance ? 'var(--color-warning)' : 'inherit' }}>
                {activePermissions.maskedFinance ? '₹ ***' : `₹ ${seg.amountL} L`}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
});

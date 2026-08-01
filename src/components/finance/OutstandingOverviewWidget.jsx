import { memo, useCallback } from 'react';
import { useApp } from '../../context/AppContext';
import { OUTSTANDING_FINANCE_METRICS } from '../../data/mockData';
import { AlertCircle, ArrowUpRight, FileText } from 'lucide-react';
import { PanelHeader } from '../shared/PanelHeader';

export const OutstandingOverviewWidget = memo(function OutstandingOverviewWidget() {
  const { navigateTo } = useApp();

  const handleNav = useCallback((submodule) => {
    navigateTo('finance', submodule);
  }, [navigateTo]);

  const metrics = OUTSTANDING_FINANCE_METRICS;

  return (
    <div className="panel-card" style={{ padding: '1.25rem' }}>
      <PanelHeader
        title="Outstanding & Dues Overview"
        icon={<AlertCircle size={15} color="#f97316" />}
        accentColor="#f97316"
        actionLabel="OVERDUE PAYABLES"
        onAction={() => handleNav('Expenses Management')}
      />

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '0.75rem' }}>
        {/* Customer Receivables Card */}
        <div
          tabIndex={0}
          role="button"
          className="anodized-panel"
          style={{ padding: '0.85rem', cursor: 'pointer', borderLeft: '3px solid #2563eb' }}
          onClick={() => handleNav('Income Management')}
          aria-label={`Customer Receivables: ${metrics.customerReceivables.amount}`}
        >
          <div style={{ fontSize: '0.675rem', fontWeight: 800, color: 'var(--text-muted)', textTransform: 'uppercase', marginBottom: '4px' }}>
            Customer Receivables
          </div>
          <div className="mono-data" style={{ fontSize: '1.15rem', fontWeight: 800, color: '#2563eb' }}>
            {metrics.customerReceivables.amount}
          </div>
          <div style={{ fontSize: '0.65rem', color: 'var(--text-muted)', marginTop: '4px' }}>
            {metrics.customerReceivables.countText}
          </div>
        </div>

        {/* Vendor Payables Card */}
        <div
          tabIndex={0}
          role="button"
          className="anodized-panel"
          style={{ padding: '0.85rem', cursor: 'pointer', borderLeft: '3px solid #8b5cf6' }}
          onClick={() => handleNav('Expenses Management')}
          aria-label={`Vendor Payables: ${metrics.vendorPayables.amount}`}
        >
          <div style={{ fontSize: '0.675rem', fontWeight: 800, color: 'var(--text-muted)', textTransform: 'uppercase', marginBottom: '4px' }}>
            Vendor Payables
          </div>
          <div className="mono-data" style={{ fontSize: '1.15rem', fontWeight: 800, color: '#8b5cf6' }}>
            {metrics.vendorPayables.amount}
          </div>
          <div style={{ fontSize: '0.65rem', color: 'var(--text-muted)', marginTop: '4px' }}>
            {metrics.vendorPayables.countText}
          </div>
        </div>

        {/* Overdue Receivables Card */}
        <div
          tabIndex={0}
          role="button"
          className="anodized-panel"
          style={{ padding: '0.85rem', cursor: 'pointer', borderLeft: '3px solid #dc2626' }}
          onClick={() => handleNav('Income Management')}
          aria-label={`Overdue Receivables: ${metrics.overdueReceivables.amount}`}
        >
          <div style={{ fontSize: '0.675rem', fontWeight: 800, color: 'var(--text-muted)', textTransform: 'uppercase', marginBottom: '4px' }}>
            Overdue Receivables
          </div>
          <div className="mono-data" style={{ fontSize: '1.15rem', fontWeight: 800, color: '#dc2626' }}>
            {metrics.overdueReceivables.amount}
          </div>
          <div style={{ fontSize: '0.65rem', color: 'var(--text-muted)', marginTop: '4px' }}>
            {metrics.overdueReceivables.countText}
          </div>
        </div>
      </div>

      <div style={{ marginTop: '0.85rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'rgba(220, 38, 38, 0.08)', padding: '0.5rem 0.75rem', borderRadius: '4px', border: '1px solid rgba(220, 38, 38, 0.2)' }}>
        <div style={{ fontSize: '0.725rem' }}>
          <span style={{ fontWeight: 800, color: '#dc2626' }}>Overdue Vendor Bills: </span>
          <span className="mono-data" style={{ fontWeight: 800 }}>{metrics.overduePayables.amount}</span> ({metrics.overduePayables.countText})
        </div>
        <button
          className="btn btn-secondary btn-sm"
          style={{ padding: '2px 8px', fontSize: '0.65rem', color: '#dc2626' }}
          onClick={() => handleNav('Expenses Management')}
        >
          REVIEW PAYABLES <ArrowUpRight size={11} aria-hidden="true" />
        </button>
      </div>
    </div>
  );
});

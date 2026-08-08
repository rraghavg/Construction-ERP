import { memo } from 'react';
import { Sliders, Sparkles, ArrowRight } from 'lucide-react';

export const CustomReportBuilderBanner = memo(function CustomReportBuilderBanner({ onOpenWizard }) {
  return (
    <div
      className="anodized-panel"
      style={{
        marginTop: '1.25rem',
        padding: '1.25rem 1.5rem',
        background: 'linear-gradient(135deg, rgba(37, 99, 235, 0.12) 0%, rgba(22, 163, 74, 0.08) 100%)',
        border: '1px solid rgba(37, 99, 235, 0.3)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        borderRadius: '6px'
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
        <div
          style={{
            width: '44px',
            height: '44px',
            borderRadius: '6px',
            background: 'linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%)',
            display: 'grid',
            placeItems: 'center',
            color: '#ffffff',
            boxShadow: '0 4px 12px rgba(37, 99, 235, 0.3)'
          }}
          aria-hidden="true"
        >
          <Sliders size={22} />
        </div>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.7rem', fontWeight: 800, color: '#60a5fa', textTransform: 'uppercase' }}>
            <Sparkles size={12} aria-hidden="true" /> CUSTOM REPORT BUILDER WIZARD
          </div>
          <h3 style={{ fontSize: '1.05rem', fontWeight: 800, color: 'var(--text-main)', marginTop: '2px' }}>
            Need Cross-Module Intelligence? Build Custom Analytics Reports
          </h3>
          <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '2px' }}>
            Join data across Sales, Finance, Inventory, HR & Maintenance. Select fields, set filters, choose visualization, and schedule automated delivery.
          </p>
        </div>
      </div>

      <button
        className="btn btn-primary"
        onClick={onOpenWizard}
        style={{ padding: '0.65rem 1.25rem', whiteSpace: 'nowrap', display: 'flex', alignItems: 'center', gap: '6px' }}
      >
        <Sliders size={16} aria-hidden="true" /> CREATE CUSTOM REPORT <ArrowRight size={14} aria-hidden="true" />
      </button>
    </div>
  );
});

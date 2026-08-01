import { memo } from 'react';
import { useApp } from '../../context/AppContext';
import { Database, ShieldAlert, CheckCircle2 } from 'lucide-react';

export const MasterDataKpiHeader = memo(function MasterDataKpiHeader() {
  const { masterCategories, navigateTo } = useApp();

  const configuredCount = masterCategories.filter((c) => c.count > 0).length;
  const totalCount = masterCategories.length;
  const pctComplete = Math.round((configuredCount / totalCount) * 100);
  const unconfiguredList = masterCategories.filter((c) => c.count === 0);

  return (
    <div className="anodized-panel" style={{ padding: '1.25rem 1.5rem', marginBottom: '1.25rem' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <div className="breadcrumb" style={{ fontSize: '0.725rem', marginBottom: '2px' }}>
            <span>Master Data</span> &gt; <span>Governance Overview</span>
          </div>
          <h2 style={{ fontSize: '1.3rem', fontWeight: 800, display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Database size={22} color="var(--precision-blue)" aria-hidden="true" />
            Master Data Command Center
          </h2>
          <p className="mono-data" style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '2px' }}>
            Central reference data governing Sales, CRM, Rental, Finance & Operations
          </p>
        </div>

        {/* Progress & Governance Meter */}
        <div
          style={{
            background: 'var(--bg-input)',
            border: '1px solid var(--border-color)',
            padding: '0.75rem 1rem',
            borderRadius: '4px',
            minWidth: '280px'
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '0.75rem', fontWeight: 800, marginBottom: '4px' }}>
            <span>SETUP COMPLETION</span>
            <span className="mono-data" style={{ color: 'var(--precision-blue)' }}>
              {configuredCount} / {totalCount} CATEGORIES ({pctComplete}%)
            </span>
          </div>
          <div className="load-bar" style={{ height: '6px' }}>
            <div className="load-fill" style={{ transform: `scaleX(${pctComplete / 100})` }} />
          </div>

          {unconfiguredList.length > 0 ? (
            <div style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '0.675rem', color: 'var(--color-warning)', marginTop: '6px', fontWeight: 700 }}>
              <ShieldAlert size={12} aria-hidden="true" />
              <span>{unconfiguredList.length} category requires initial setup</span>
            </div>
          ) : (
            <div style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '0.675rem', color: 'var(--color-success)', marginTop: '6px', fontWeight: 700 }}>
              <CheckCircle2 size={12} aria-hidden="true" />
              <span>All 13 master categories configured & active</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
});

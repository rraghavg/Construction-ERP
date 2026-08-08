import { memo } from 'react';
import { useApp } from '../../../core/providers/AppContext';
import { ShieldAlert, ArrowRight } from 'lucide-react';

export const ActionDock = memo(function ActionDock() {
  const { showToast, activePermissions, navigateTo } = useApp();

  const handleActionClick = (actionName, moduleKey, submoduleKey) => {
    if (activePermissions.isReadonly) {
      showToast('Auditor role is read-only. Action not permitted.', 'warning');
      return;
    }
    navigateTo(moduleKey, submoduleKey);
  };

  return (
    <aside className="action-dock" aria-label="Action dock & telemetry">
      {/* Structural Quick Actions */}
      <div>
        <h2 style={{ fontSize: '0.675rem', fontWeight: '800', textTransform: 'uppercase', color: 'var(--text-muted)', marginBottom: '0.75rem', letterSpacing: '0.1em' }}>
          Scaffold Controls
        </h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
          <button
            className="dock-action-btn btn-accent"
            onClick={() => handleActionClick('Submit RFI', 'procurement', 'RFQs & Tenders')}
            aria-label="Submit Request for Information"
          >
            <span>Submit RFI</span>
            <ArrowRight size={14} aria-hidden="true" />
          </button>
          <button
            className="dock-action-btn"
            onClick={() => handleActionClick('Purchase Order', 'procurement', 'Purchase Orders')}
            aria-label="Issue Purchase Order"
          >
            <span>Purchase Order</span>
            <ArrowRight size={14} aria-hidden="true" />
          </button>
          <button
            className="dock-action-btn"
            onClick={() => handleActionClick('Update Progress', 'master-data', 'Projects')}
            aria-label="Update Site Progress"
          >
            <span>Update Progress</span>
            <ArrowRight size={14} aria-hidden="true" />
          </button>
        </div>
      </div>

      {/* Safety & Environment Alert */}
      <div className="weather-warning-box">
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#2563eb', fontWeight: '800', fontSize: '0.75rem' }}>
          <ShieldAlert size={16} aria-hidden="true" />
          <span>SITE SAFETY WARNING</span>
        </div>
        <p style={{ fontSize: '0.7rem', marginTop: '4px', color: 'var(--text-main)', lineHeight: '1.4' }}>
          High altitude wind alert on Tower B crane ops. Limit hoist capacity to 60%.
        </p>
        <div className="mono-data" style={{ fontSize: '0.625rem', marginTop: '6px', color: 'var(--text-muted)' }}>
          LATENCY: 14ms | WINDS: 32 KTS
        </div>
      </div>

      {/* Structural Telemetry Grid */}
      <div>
        <h2 style={{ fontSize: '0.675rem', fontWeight: '800', textTransform: 'uppercase', color: 'var(--text-muted)', marginBottom: '0.75rem', letterSpacing: '0.1em' }}>
          Node Connectivity
        </h2>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(4, 1fr)',
            gap: '6px',
            background: 'var(--bg-input)',
            padding: '0.75rem',
            border: '1px solid var(--border-color)',
            borderRadius: '4px'
          }}
          role="region"
          aria-label="Node connectivity status matrix"
        >
          {Array.from({ length: 16 }).map((_, i) => (
            <div
              key={i}
              className="mono-data"
              style={{
                height: '24px',
                background: i === 3 || i === 11 ? 'rgba(220, 38, 38, 0.15)' : 'rgba(22, 163, 74, 0.15)',
                border: i === 3 || i === 11 ? '1px solid #dc2626' : '1px solid #16a34a',
                color: i === 3 || i === 11 ? '#dc2626' : '#16a34a',
                fontSize: '0.6rem',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontWeight: '700',
                borderRadius: '2px'
              }}
              title={`Node N-0${i + 1}: ${i === 3 || i === 11 ? 'ERR' : 'OK'}`}
              aria-label={`Node N-0${i + 1}: ${i === 3 || i === 11 ? 'Error' : 'Operational'}`}
            >
              N{i + 1 < 10 ? `0${i + 1}` : i + 1}
            </div>
          ))}
        </div>
      </div>
    </aside>
  );
});

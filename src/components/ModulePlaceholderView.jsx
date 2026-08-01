import { memo } from 'react';
import { useApp } from '../context/AppContext';
import { MODULES_LIST } from '../data/mockData';
import { ArrowLeft, Construction } from 'lucide-react';

export const ModulePlaceholderView = memo(function ModulePlaceholderView() {
  const { activeModule, activeSubmodule, navigateTo, activePermissions } = useApp();

  const currentMod = MODULES_LIST.find((m) => m.id === activeModule) || {
    name: 'Module Section',
    description: 'Structural operations and analytics module.'
  };

  return (
    <div className="blueprint-viewer">
      {/* Header Banner */}
      <div className="anodized-panel" style={{ padding: '1.5rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.75rem' }}>
          <button
            className="btn btn-secondary btn-sm mono-data"
            onClick={() => navigateTo('dashboard')}
            aria-label="Return to Dashboard"
          >
            <ArrowLeft size={13} aria-hidden="true" /> RETURN TO COMMAND
          </button>
          <span className="badge badge-info mono-data">SCOPED_MODULE</span>
        </div>

        <h2 style={{ fontSize: '1.4rem', fontWeight: 800 }}>{currentMod.name}</h2>
        <p className="mono-data" style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginTop: '4px' }}>
          SUBMODULE: {activeSubmodule} | SYSTEM_LOAD: STABLE
        </p>
      </div>

      {/* Feature Blueprint Card */}
      <div className="data-grid-item" style={{ padding: '2rem', textAlign: 'center' }}>
        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '1rem' }}>
          <div
            style={{
              width: '60px',
              height: '60px',
              borderRadius: '50%',
              background: 'rgba(37, 99, 235, 0.1)',
              display: 'grid',
              placeItems: 'center',
              border: '1px solid var(--precision-blue)'
            }}
            aria-hidden="true"
          >
            <Construction size={28} color="var(--precision-blue)" />
          </div>
        </div>

        <h3 style={{ fontSize: '1.1rem', fontWeight: 800 }}>{activeSubmodule} Control Center</h3>
        <p style={{ fontSize: '0.825rem', color: 'var(--text-muted)', maxWidth: '500px', margin: '0.5rem auto 1.5rem auto' }}>
          Live operational view for {currentMod.name}. Scoped data stream connected to site telemetry.
        </p>

        {/* Demo Telemetry Table */}
        <div style={{ overflowX: 'auto', border: '1px solid var(--border-color)', borderRadius: '4px' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.8rem' }} aria-label={`${currentMod.name} data table`}>
            <thead>
              <tr style={{ background: 'var(--bg-input)', borderBottom: '1px solid var(--border-color)' }}>
                <th style={{ padding: '0.65rem 1rem' }}>REF CODE</th>
                <th style={{ padding: '0.65rem 1rem' }}>COMPONENT</th>
                <th style={{ padding: '0.65rem 1rem' }}>STATUS</th>
                <th style={{ padding: '0.65rem 1rem' }}>VALUE</th>
              </tr>
            </thead>
            <tbody>
              <tr style={{ borderBottom: '1px solid var(--border-color)' }}>
                <td className="mono-data" style={{ padding: '0.65rem 1rem' }}>REF-9021</td>
                <td style={{ padding: '0.65rem 1rem' }}>Structural Beam Frame A4</td>
                <td style={{ padding: '0.65rem 1rem' }}><span className="badge badge-success">VERIFIED</span></td>
                <td className="mono-data" style={{ padding: '0.65rem 1rem' }}>₹ {activePermissions.maskedFinance ? '*** MASKED' : '45.20 L'}</td>
              </tr>
              <tr style={{ borderBottom: '1px solid var(--border-color)' }}>
                <td className="mono-data" style={{ padding: '0.65rem 1rem' }}>REF-9022</td>
                <td style={{ padding: '0.65rem 1rem' }}>Concrete Core Pour Tower 2</td>
                <td style={{ padding: '0.65rem 1rem' }}><span className="badge badge-warning">IN PROGRESS</span></td>
                <td className="mono-data" style={{ padding: '0.65rem 1rem' }}>₹ {activePermissions.maskedFinance ? '*** MASKED' : '1.20 Cr'}</td>
              </tr>
              <tr>
                <td className="mono-data" style={{ padding: '0.65rem 1rem' }}>REF-9023</td>
                <td style={{ padding: '0.65rem 1rem' }}>High-Altitude Wind Telemetry Node</td>
                <td style={{ padding: '0.65rem 1rem' }}><span className="badge badge-info">ONLINE</span></td>
                <td className="mono-data" style={{ padding: '0.65rem 1rem' }}>--</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
});

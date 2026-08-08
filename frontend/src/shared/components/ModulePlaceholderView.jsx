import { memo } from 'react';
import { useApp } from '../../core/providers/AppContext';
import { MODULES_LIST } from '../../data/mockData';
import { ArrowLeft, Construction } from 'lucide-react';

export const ModulePlaceholderView = memo(function ModulePlaceholderView() {
  const { activeModule, activeSubmodule, navigateTo, activePermissions } = useApp();

  const currentMod = MODULES_LIST.find((m) => m.id === activeModule) || {
    name: 'Module Section',
    description: 'Operations and analytics module.'
  };

  return (
    <div className="blueprint-viewer">
      {/* Header Card */}
      <div
        className="g-card"
        style={{ padding: '24px' }}
      >
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px' }}>
          <button
            className="btn btn-secondary btn-sm"
            onClick={() => navigateTo('dashboard')}
            aria-label="Return to Dashboard"
          >
            <ArrowLeft size={16} aria-hidden="true" /> Return to Dashboard
          </button>
          <span className="badge badge-info">Module</span>
        </div>

        <h2 style={{ fontSize: '24px', fontWeight: 500, lineHeight: '32px' }}>{currentMod.name}</h2>
        <p style={{ fontSize: '14px', color: 'var(--m3-on-surface-variant)', marginTop: '4px', letterSpacing: '0.25px' }}>
          Submodule: {activeSubmodule}
        </p>
      </div>

      {/* Feature Card */}
      <div className="g-card" style={{ padding: '2rem', textAlign: 'center' }}>
        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '1rem' }}>
          <div
            style={{
              width: '56px',
              height: '56px',
              borderRadius: '16px',
              background: 'var(--color-info-bg)',
              display: 'grid',
              placeItems: 'center'
            }}
            aria-hidden="true"
          >
            <Construction size={28} color="var(--m3-primary)" />
          </div>
        </div>

        <h3 style={{ fontSize: '22px', fontWeight: 500, lineHeight: '28px' }}>{activeSubmodule} Control Center</h3>
        <p style={{ fontSize: '14px', color: 'var(--m3-on-surface-variant)', maxWidth: '500px', margin: '8px auto 24px auto', letterSpacing: '0.25px' }}>
          Live operational view for {currentMod.name}. Data connected to project systems.
        </p>

        {/* Data Table */}
        <div style={{ overflowX: 'auto', border: '1px solid var(--border-color)', borderRadius: '8px' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '14px' }} aria-label={`${currentMod.name} data table`}>
            <thead>
              <tr style={{ background: 'var(--m3-surface-container-low)', borderBottom: '1px solid var(--border-color)' }}>
                <th style={{ padding: '12px 16px', fontWeight: 500, fontSize: '12px', letterSpacing: '0.5px', color: 'var(--m3-on-surface-variant)' }}>REF CODE</th>
                <th style={{ padding: '12px 16px', fontWeight: 500, fontSize: '12px', letterSpacing: '0.5px', color: 'var(--m3-on-surface-variant)' }}>COMPONENT</th>
                <th style={{ padding: '12px 16px', fontWeight: 500, fontSize: '12px', letterSpacing: '0.5px', color: 'var(--m3-on-surface-variant)' }}>STATUS</th>
                <th style={{ padding: '12px 16px', fontWeight: 500, fontSize: '12px', letterSpacing: '0.5px', color: 'var(--m3-on-surface-variant)' }}>VALUE</th>
              </tr>
            </thead>
            <tbody>
              <tr style={{ borderBottom: '1px solid var(--border-color)' }}>
                <td style={{ padding: '12px 16px' }}>REF-9021</td>
                <td style={{ padding: '12px 16px' }}>Structural Beam Frame A4</td>
                <td style={{ padding: '12px 16px' }}><span className="badge badge-success">Verified</span></td>
                <td style={{ padding: '12px 16px' }}>₹ {activePermissions.maskedFinance ? '*** Masked' : '45.20 L'}</td>
              </tr>
              <tr style={{ borderBottom: '1px solid var(--border-color)' }}>
                <td style={{ padding: '12px 16px' }}>REF-9022</td>
                <td style={{ padding: '12px 16px' }}>Concrete Core Pour Tower 2</td>
                <td style={{ padding: '12px 16px' }}><span className="badge badge-warning">In Progress</span></td>
                <td style={{ padding: '12px 16px' }}>₹ {activePermissions.maskedFinance ? '*** Masked' : '1.20 Cr'}</td>
              </tr>
              <tr>
                <td style={{ padding: '12px 16px' }}>REF-9023</td>
                <td style={{ padding: '12px 16px' }}>High-Altitude Wind Telemetry Node</td>
                <td style={{ padding: '12px 16px' }}><span className="badge badge-info">Online</span></td>
                <td style={{ padding: '12px 16px' }}>--</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
});

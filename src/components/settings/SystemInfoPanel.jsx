import { memo } from 'react';
import { useApp } from '../../context/AppContext';
import { Server, Database, Clock, Globe, HardDrive } from 'lucide-react';
import { PanelHeader } from '../shared/PanelHeader';

export const SystemInfoPanel = memo(function SystemInfoPanel() {
  const { systemInfo } = useApp();

  return (
    <div className="panel-card" style={{ padding: '1.25rem' }}>
      <PanelHeader
        title="Server Environment & Infrastructure Information"
        icon={<Server size={16} color="var(--precision-blue)" />}
        accentColor="#2563eb"
      />

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '0.85rem', fontSize: '0.775rem' }}>
        <div style={{ padding: '0.75rem', background: 'var(--bg-input)', borderRadius: '4px', border: '1px solid var(--border-color)' }}>
          <div style={{ color: 'var(--text-muted)', fontSize: '0.675rem', display: 'flex', alignItems: 'center', gap: '4px', marginBottom: '2px' }}>
            <Database size={12} aria-hidden="true" /> DATABASE ENGINE
          </div>
          <div className="mono-data" style={{ fontWeight: 800 }}>
            {systemInfo.dbVersion}
          </div>
        </div>

        <div style={{ padding: '0.75rem', background: 'var(--bg-input)', borderRadius: '4px', border: '1px solid var(--border-color)' }}>
          <div style={{ color: 'var(--text-muted)', fontSize: '0.675rem', display: 'flex', alignItems: 'center', gap: '4px', marginBottom: '2px' }}>
            <Clock size={12} aria-hidden="true" /> SERVER TIME & TZ
          </div>
          <div className="mono-data" style={{ fontWeight: 700 }}>
            {systemInfo.serverTime}
          </div>
        </div>

        <div style={{ padding: '0.75rem', background: 'var(--bg-input)', borderRadius: '4px', border: '1px solid var(--border-color)' }}>
          <div style={{ color: 'var(--text-muted)', fontSize: '0.675rem', display: 'flex', alignItems: 'center', gap: '4px', marginBottom: '2px' }}>
            <HardDrive size={12} aria-hidden="true" /> S3 STORAGE QUOTA
          </div>
          <div className="mono-data" style={{ fontWeight: 800, color: '#16a34a' }}>
            {systemInfo.storageUsed}
          </div>
        </div>

        <div style={{ padding: '0.75rem', background: 'var(--bg-input)', borderRadius: '4px', border: '1px solid var(--border-color)' }}>
          <div style={{ color: 'var(--text-muted)', fontSize: '0.675rem', display: 'flex', alignItems: 'center', gap: '4px', marginBottom: '2px' }}>
            <Globe size={12} aria-hidden="true" /> DEPLOYED BUILD
          </div>
          <div className="mono-data" style={{ fontWeight: 700, color: 'var(--precision-blue)' }}>
            {systemInfo.deployedBuild}
          </div>
        </div>
      </div>
    </div>
  );
});

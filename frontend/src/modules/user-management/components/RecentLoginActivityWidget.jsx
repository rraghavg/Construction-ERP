import { memo, useCallback } from 'react';
import { useApp } from '../../../core/providers/AppContext';
import { RECENT_LOGIN_ACTIVITY_LIST } from '../../../data/mockData';
import { Shield, Smartphone, Monitor } from 'lucide-react';
import { PanelHeader } from '../../../shared/components/PanelHeader';

export const RecentLoginActivityWidget = memo(function RecentLoginActivityWidget() {
  const { navigateTo } = useApp();

  const handleAction = useCallback(() => {
    navigateTo('user-mgmt', 'Login Activity & Audit');
  }, [navigateTo]);

  return (
    <div className="data-grid-item" style={{ padding: '1.25rem' }}>
      <PanelHeader
        title="Recent Login Activity Stream"
        icon={<Shield size={15} color="var(--precision-blue)" />}
        accentColor="#2563eb"
        actionLabel="ALL LOGS →"
        onAction={handleAction}
      />

      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem' }}>
        {RECENT_LOGIN_ACTIVITY_LIST.map((log) => (
          <div key={log.id} className="structural-card" style={{ padding: '0.65rem', marginBottom: 0 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2px' }}>
              <span style={{ fontWeight: '700', fontSize: '0.775rem' }}>{log.user} ({log.role})</span>
              <span className={`badge ${log.status === 'Success' ? 'badge-success' : 'badge-danger'} mono-data`} style={{ fontSize: '0.625rem' }}>
                {log.status}
              </span>
            </div>

            <div className="mono-data" style={{ fontSize: '0.675rem', color: 'var(--text-muted)', display: 'flex', justifyContent: 'space-between' }}>
              <span>IP: {log.ip} ({log.location})</span>
              <span>{log.time}</span>
            </div>

            <div style={{ fontSize: '0.65rem', color: 'var(--text-muted)', marginTop: '2px' }}>
              {log.device}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
});

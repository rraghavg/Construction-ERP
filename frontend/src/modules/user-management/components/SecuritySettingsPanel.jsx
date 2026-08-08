import { memo, useCallback } from 'react';
import { useApp } from '../../../core/providers/AppContext';
import { ShieldCheck, Lock, LogOut, CheckCircle2, AlertCircle } from 'lucide-react';
import { PanelHeader } from '../../../shared/components/PanelHeader';

export const SecuritySettingsPanel = memo(function SecuritySettingsPanel() {
  const { activeSessions, forceLogoutSession, navigateTo } = useApp();

  const handleAction = useCallback(() => {
    navigateTo('user-mgmt', 'Security Settings');
  }, [navigateTo]);

  return (
    <div className="panel-card" style={{ padding: '1.25rem' }}>
      <PanelHeader
        title="Security Policy & Active Live Sessions"
        icon={<ShieldCheck size={16} color="var(--precision-blue)" />}
        accentColor="#2563eb"
        actionLabel="SECURITY SETTINGS ⚙️"
        onAction={handleAction}
      />

      <div style={{ display: 'grid', gridTemplateColumns: '320px 1fr', gap: '1.25rem' }}>
        {/* Password Policy & MFA Rules */}
        <div style={{ padding: '0.85rem', background: 'var(--bg-input)', borderRadius: '4px', border: '1px solid var(--border-color)' }}>
          <div style={{ fontWeight: 800, fontSize: '0.825rem', marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '6px' }}>
            <Lock size={14} color="#8b5cf6" aria-hidden="true" /> Security & Auth Policy Rules
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', fontSize: '0.725rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <CheckCircle2 size={13} color="#16a34a" aria-hidden="true" /> Minimum 8 Characters Length
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <CheckCircle2 size={13} color="#16a34a" aria-hidden="true" /> Require Uppercase & Special Characters
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <CheckCircle2 size={13} color="#16a34a" aria-hidden="true" /> 90-Day Forced Password Rotation
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <CheckCircle2 size={13} color="#16a34a" aria-hidden="true" /> Lockout after 3 Failed Attempts
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <AlertCircle size={13} color="#f59e0b" aria-hidden="true" /> MFA Enforced for Admin & Finance Roles
            </div>
          </div>
        </div>

        {/* Active Live Sessions List */}
        <div>
          <div style={{ fontSize: '0.75rem', fontWeight: 800, textTransform: 'uppercase', color: 'var(--text-muted)', marginBottom: '0.5rem' }}>
            Active Live Sessions ({activeSessions.length})
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            {activeSessions.map((session) => (
              <div
                key={session.sessionId}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '0.65rem 0.85rem',
                  background: 'var(--bg-input)',
                  border: '1px solid var(--border-color)',
                  borderRadius: '4px'
                }}
              >
                <div>
                  <div style={{ fontSize: '0.775rem', fontWeight: 800 }}>{session.user}</div>
                  <div className="mono-data" style={{ fontSize: '0.675rem', color: 'var(--text-muted)' }}>
                    IP: {session.ip} ({session.location}) • {session.device}
                  </div>
                  <div className="mono-data" style={{ fontSize: '0.625rem', color: '#16a34a', marginTop: '2px' }}>
                    Started: {session.started} • Active: {session.lastActive}
                  </div>
                </div>

                <button
                  className="btn btn-secondary btn-sm"
                  style={{ color: '#dc2626', display: 'flex', alignItems: 'center', gap: '4px' }}
                  onClick={() => forceLogoutSession(session.sessionId)}
                  title="Revoke session token"
                  aria-label={`Force Logout for ${session.user}`}
                >
                  <LogOut size={12} aria-hidden="true" /> FORCE LOGOUT
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
});

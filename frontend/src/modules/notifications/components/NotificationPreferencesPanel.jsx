import { memo, useCallback } from 'react';
import { useApp } from '../../../core/providers/AppContext';
import { Mail, MessageSquare, Bell, Clock, Compass, Settings } from 'lucide-react';
import { PanelHeader } from '../../../shared/components/PanelHeader';

export const NotificationPreferencesPanel = memo(function NotificationPreferencesPanel({ onOpenSettingsModal }) {
  const { notificationPreferences, toggleChannelPreference } = useApp();
  const channels = notificationPreferences.channels;

  const tiles = [
    { key: 'email', title: 'Email Notifications', desc: 'Real-time & digest email delivery', icon: Mail, enabled: channels.email },
    { key: 'sms', title: 'SMS Alerts', desc: 'High-priority SMS alerts for urgent events', icon: MessageSquare, enabled: channels.sms },
    { key: 'in_app', title: 'In-App Notifications', desc: 'Real-time header bell & dashboard updates', icon: Bell, enabled: channels.in_app },
    { key: 'reminder_alerts', title: 'Reminder Alerts', desc: 'Task due date & milestone alerts', icon: Clock, enabled: channels.reminder_alerts },
    { key: 'system_alerts', title: 'System Alerts', desc: 'Automated backup & system logs', icon: Compass, enabled: channels.system_alerts }
  ];

  return (
    <div className="panel-card" style={{ padding: '1.25rem' }}>
      <PanelHeader
        title="Delivery Channel Preferences"
        accentColor="#2563eb"
        actionLabel="MANAGE SETTINGS ⚙️"
        onAction={onOpenSettingsModal}
      />

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: '0.75rem' }}>
        {tiles.map((tile) => {
          const IconComp = tile.icon;

          return (
            <div
              key={tile.key}
              tabIndex={0}
              role="button"
              className="anodized-panel"
              style={{
                padding: '0.85rem',
                cursor: 'pointer',
                borderLeft: tile.enabled ? '3px solid #16a34a' : '3px solid #64748b',
                background: tile.enabled ? 'rgba(22, 163, 74, 0.05)' : 'var(--bg-input)'
              }}
              onClick={() => toggleChannelPreference(tile.key)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  toggleChannelPreference(tile.key);
                }
              }}
              aria-label={`${tile.title}: ${tile.enabled ? 'Enabled' : 'Disabled'}`}
            >
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.4rem' }}>
                <IconComp size={16} color={tile.enabled ? '#16a34a' : 'var(--text-muted)'} aria-hidden="true" />
                <span className={`badge ${tile.enabled ? 'badge-success' : 'badge-info'} mono-data`} style={{ fontSize: '0.6rem' }}>
                  {tile.enabled ? 'ENABLED' : 'OFF'}
                </span>
              </div>

              <div style={{ fontWeight: 800, fontSize: '0.8rem', marginBottom: '2px' }}>
                {tile.title}
              </div>

              <div style={{ fontSize: '0.65rem', color: 'var(--text-muted)', lineHeight: 1.2 }}>
                {tile.desc}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
});

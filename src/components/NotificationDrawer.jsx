import { memo, useCallback, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { Bell, X, AlertTriangle, Check, ArrowRight } from 'lucide-react';

export const NotificationDrawer = memo(function NotificationDrawer({ isOpen, onClose }) {
  const { notifications, unreadCount, markNotificationRead, navigateTo } = useApp();

  const handleKeyDown = useCallback((e) => {
    if (e.key === 'Escape') {
      onClose();
    }
  }, [onClose]);

  useEffect(() => {
    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
      return () => window.removeEventListener('keydown', handleKeyDown);
    }
  }, [isOpen, handleKeyDown]);

  const handleViewAll = useCallback(() => {
    navigateTo('notifications');
    onClose();
  }, [navigateTo, onClose]);

  if (!isOpen) return null;

  return (
    <div
      className="modal-overlay"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="notification-drawer-title"
    >
      <div
        className="modal-container"
        style={{ width: '420px', marginLeft: 'auto', height: '100vh', borderRadius: 0, maxHeight: '100vh', display: 'flex', flexDirection: 'column' }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="modal-header">
          <div className="modal-title-group">
            <div className="modal-icon-box" aria-hidden="true">
              <Bell size={18} color="var(--precision-blue)" />
            </div>
            <div>
              <h3 id="notification-drawer-title" style={{ fontSize: '0.95rem', fontWeight: 800 }}>Notifications Alert Stream</h3>
              <p className="mono-data" style={{ fontSize: '0.675rem', color: 'var(--text-muted)' }}>
                {unreadCount} Unread Alerts Pending
              </p>
            </div>
          </div>
          <button className="modal-close-btn" onClick={onClose} aria-label="Close Notifications">
            <X size={18} />
          </button>
        </div>

        {/* List of Recent 5 Notifications */}
        <div style={{ flex: 1, overflowY: 'auto', padding: '1rem', display: 'flex', flexDirection: 'column', gap: '0.65rem' }}>
          {notifications.slice(0, 5).map((item) => (
            <div
              key={item.id}
              onClick={() => {
                markNotificationRead(item.id);
                navigateTo('notifications');
                onClose();
              }}
              style={{
                padding: '0.75rem',
                border: '1px solid var(--border-color)',
                borderRadius: '4px',
                background: item.is_read ? 'var(--bg-card)' : 'var(--bg-input)',
                borderLeft: item.priority === 'high' ? '4px solid #dc2626' : '1px solid var(--border-color)',
                cursor: 'pointer'
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2px' }}>
                <span style={{ fontWeight: item.is_read ? 600 : 800, fontSize: '0.775rem' }}>{item.title}</span>
                <span className="mono-data" style={{ fontSize: '0.625rem', color: 'var(--text-muted)' }}>{item.time}</span>
              </div>
              <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)', lineHeight: 1.3 }}>
                {item.body}
              </div>
              <div style={{ fontSize: '0.625rem', color: 'var(--precision-blue)', fontWeight: 700, marginTop: '4px' }}>
                {item.module} • {item.amount || 'Alert'}
              </div>
            </div>
          ))}
        </div>

        {/* Footer CTA */}
        <div style={{ padding: '0.85rem 1rem', borderTop: '1px solid var(--border-color)', background: 'var(--bg-card)' }}>
          <button
            className="btn btn-primary"
            style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px' }}
            onClick={handleViewAll}
          >
            VIEW ALL NOTIFICATIONS CENTRE <ArrowRight size={14} aria-hidden="true" />
          </button>
        </div>
      </div>
    </div>
  );
});

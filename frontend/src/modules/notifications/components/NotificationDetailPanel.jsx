import { memo, useCallback } from 'react';
import { useApp } from '../../../core/providers/AppContext';
import { X, ExternalLink, Bell, CheckCircle2, Star, Clock, Trash2 } from 'lucide-react';

export const PriorityBadge = memo(function PriorityBadge({ priority }) {
  let badgeStyle = { bg: 'rgba(22, 163, 74, 0.12)', color: '#15803d', border: 'rgba(22, 163, 74, 0.3)', label: 'LOW' };

  if (priority === 'high') {
    badgeStyle = { bg: 'rgba(220, 38, 38, 0.12)', color: '#b91c1c', border: 'rgba(220, 38, 38, 0.3)', label: 'HIGH PRIORITY' };
  } else if (priority === 'medium') {
    badgeStyle = { bg: 'rgba(245, 158, 11, 0.12)', color: '#b45309', border: 'rgba(245, 158, 11, 0.3)', label: 'MEDIUM' };
  } else if (priority === 'system') {
    badgeStyle = { bg: 'rgba(37, 99, 235, 0.12)', color: '#1d4ed8', border: 'rgba(37, 99, 235, 0.3)', label: 'SYSTEM ALERT' };
  }

  return (
    <span
      className="badge mono-data"
      style={{
        background: badgeStyle.bg,
        color: badgeStyle.color,
        border: `1px solid ${badgeStyle.border}`,
        fontSize: '0.625rem'
      }}
    >
      {badgeStyle.label}
    </span>
  );
});

export const NotificationDetailPanel = memo(function NotificationDetailPanel({ notification, onClose, onSnooze }) {
  const { navigateTo, markNotificationRead, toggleNotificationImportant, dismissNotification, showToast } = useApp();

  if (!notification) return null;

  const handleNavigateToRecord = useCallback(() => {
    markNotificationRead(notification.id);
    if (notification.related_record?.url) {
      navigateTo(notification.related_record.url);
      showToast(`Navigated to related record ${notification.related_record.id}`, 'info');
    }
    onClose();
  }, [notification, markNotificationRead, navigateTo, showToast, onClose]);

  const handleMarkRead = useCallback(() => {
    markNotificationRead(notification.id);
    showToast('Notification marked as read', 'success');
  }, [notification.id, markNotificationRead, showToast]);

  const handleToggleImportant = useCallback(() => {
    toggleNotificationImportant(notification.id);
    showToast(notification.is_important ? 'Removed from Important' : 'Marked as Important', 'info');
  }, [notification, toggleNotificationImportant, showToast]);

  const handleDismiss = useCallback(() => {
    dismissNotification(notification.id);
    onClose();
  }, [notification.id, dismissNotification, onClose]);

  return (
    <div
      className="anodized-panel"
      style={{
        position: 'sticky',
        top: '1rem',
        padding: '1.25rem',
        borderLeft: notification.priority === 'high' ? '4px solid #dc2626' : '1px solid var(--border-color)',
        display: 'flex',
        flexDirection: 'column',
        gap: '0.85rem'
      }}
      aria-label={`Notification Details for ${notification.title}`}
    >
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between' }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '4px' }}>
            <PriorityBadge priority={notification.priority} />
            <span className="badge badge-info mono-data" style={{ fontSize: '0.625rem' }}>
              {notification.module}
            </span>
          </div>
          <h3 style={{ fontSize: '1.05rem', fontWeight: 800, margin: 0 }}>
            {notification.title}
          </h3>
        </div>

        <button
          className="btn btn-secondary btn-sm"
          style={{ padding: '0.3rem' }}
          onClick={onClose}
          aria-label="Close notification detail panel"
        >
          <X size={14} aria-hidden="true" />
        </button>
      </div>

      {/* Main Body */}
      <div
        style={{
          padding: '0.85rem',
          background: 'var(--bg-input)',
          borderRadius: '4px',
          border: '1px solid var(--border-color)',
          fontSize: '0.8rem',
          lineHeight: 1.5
        }}
      >
        {notification.body}
      </div>

      {/* Details Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '0.65rem', fontSize: '0.75rem' }}>
        <div>
          <span style={{ color: 'var(--text-muted)', fontSize: '0.675rem', display: 'block' }}>RELATED RECORD</span>
          <span className="mono-data" style={{ fontWeight: 800, color: 'var(--precision-blue)' }}>
            {notification.related_record?.id || 'N/A'}
          </span>
        </div>
        <div>
          <span style={{ color: 'var(--text-muted)', fontSize: '0.675rem', display: 'block' }}>VALUE / QTY</span>
          <span className="mono-data" style={{ fontWeight: 700 }}>
            {notification.amount || 'N/A'}
          </span>
        </div>
        <div>
          <span style={{ color: 'var(--text-muted)', fontSize: '0.675rem', display: 'block' }}>DUE DATE / TARGET</span>
          <span className="mono-data">{notification.dueDate || 'N/A'}</span>
        </div>
        <div>
          <span style={{ color: 'var(--text-muted)', fontSize: '0.675rem', display: 'block' }}>RECEIVED TIME</span>
          <span className="mono-data">{notification.time} ({notification.dateGroup})</span>
        </div>
      </div>

      {/* Action Toolbar */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '6px', paddingTop: '0.5rem', borderTop: '1px solid var(--border-color)' }}>
        <button
          className="btn btn-primary btn-sm"
          style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '4px' }}
          onClick={handleNavigateToRecord}
        >
          VIEW RECORD <ExternalLink size={13} aria-hidden="true" />
        </button>

        <button
          className="btn btn-secondary btn-sm"
          style={{ padding: '0.4rem 0.6rem' }}
          onClick={handleMarkRead}
          title="Mark as Read"
          aria-label="Mark as Read"
        >
          <CheckCircle2 size={13} aria-hidden="true" color={notification.is_read ? '#16a34a' : 'var(--text-muted)'} />
        </button>

        <button
          className="btn btn-secondary btn-sm"
          style={{ padding: '0.4rem 0.6rem' }}
          onClick={handleToggleImportant}
          title="Toggle Star / Important"
          aria-label="Toggle Star / Important"
        >
          <Star size={13} aria-hidden="true" color={notification.is_important ? '#f59e0b' : 'var(--text-muted)'} fill={notification.is_important ? '#f59e0b' : 'none'} />
        </button>

        <button
          className="btn btn-secondary btn-sm"
          style={{ padding: '0.4rem 0.6rem' }}
          onClick={() => onSnooze(notification)}
          title="Snooze / Remind Later"
          aria-label="Snooze / Remind Later"
        >
          <Clock size={13} aria-hidden="true" color="var(--text-muted)" />
        </button>

        <button
          className="btn btn-secondary btn-sm"
          style={{ padding: '0.4rem 0.6rem', color: '#dc2626' }}
          onClick={handleDismiss}
          title="Dismiss Notification"
          aria-label="Dismiss Notification"
        >
          <Trash2 size={13} aria-hidden="true" />
        </button>
      </div>
    </div>
  );
});

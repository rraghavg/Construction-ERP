import { useState, memo, useCallback } from 'react';
import { useApp } from '../../../core/providers/AppContext';
import { SubmoduleNavHeader } from '../../../shared/components/SubmoduleNavHeader';
import { NotificationsKpiGrid } from '../components/NotificationsKpiGrid';
import { NotificationsListPanel } from '../components/NotificationsListPanel';
import { NotificationDetailPanel } from '../components/NotificationDetailPanel';
import { UnreadSummaryWidget } from '../components/UnreadSummaryWidget';
import { NotificationPreferencesPanel } from '../components/NotificationPreferencesPanel';
import { NotificationSettingsModal } from '../components/NotificationSettingsModal';
import { SnoozeNotificationModal } from '../components/SnoozeNotificationModal';
import { Bell, Calendar, CheckCheck, Settings } from 'lucide-react';

export const NotificationsCenterView = memo(function NotificationsCenterView() {
  const { activeSubmodule, markAllNotificationsRead } = useApp();

  const [activeNotification, setActiveNotification] = useState(null);
  const [snoozeTargetNotification, setSnoozeTargetNotification] = useState(null);
  const [isSettingsModalOpen, setIsSettingsModalOpen] = useState(false);
  const [isSnoozeModalOpen, setIsSnoozeModalOpen] = useState(false);

  const handleSelectNotification = useCallback((item) => {
    setActiveNotification(item);
  }, []);

  const handleCloseDetailPanel = useCallback(() => {
    setActiveNotification(null);
  }, []);

  const handleOpenSnoozeModal = useCallback((item) => {
    setSnoozeTargetNotification(item);
    setIsSnoozeModalOpen(true);
  }, []);

  const handleCloseSnoozeModal = useCallback(() => {
    setIsSnoozeModalOpen(false);
    setSnoozeTargetNotification(null);
  }, []);

  const handleOpenSettingsModal = useCallback(() => {
    setIsSettingsModalOpen(true);
  }, []);

  const handleCloseSettingsModal = useCallback(() => {
    setIsSettingsModalOpen(false);
  }, []);

  return (
    <div className="blueprint-viewer">
      {/* Header Banner */}
      <div className="anodized-panel" style={{ padding: '1.25rem 1.5rem', marginBottom: '1rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div>
            <div className="breadcrumb" style={{ fontSize: '0.725rem', marginBottom: '2px' }}>
              <span>Notifications & Alerts</span> &gt; <span>{activeSubmodule || 'Notifications Centre'}</span>
            </div>
            <h2 style={{ fontSize: '1.3rem', fontWeight: 800 }}>System-Wide Notifications Hub</h2>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <div className="badge badge-info mono-data" style={{ padding: '6px 10px', fontSize: '0.725rem', display: 'flex', alignItems: 'center', gap: '4px' }}>
              <Calendar size={13} aria-hidden="true" /> 01 Aug 2026 – 31 Aug 2026
            </div>
            <button
              className="btn btn-secondary btn-sm"
              onClick={markAllNotificationsRead}
            >
              <CheckCheck size={14} aria-hidden="true" color="#16a34a" /> MARK ALL READ
            </button>
            <button
              className="btn btn-primary btn-sm"
              onClick={handleOpenSettingsModal}
            >
              <Settings size={14} aria-hidden="true" /> PREFERENCES ⚙️
            </button>
          </div>
        </div>
      </div>

      {/* Submodule Tab Bar */}
      <SubmoduleNavHeader moduleId="notifications" title="Notifications Submodules" />

      {/* Row 1: Top-line 5 Notifications KPI Cards */}
      <NotificationsKpiGrid />

      {/* Main Notification Feed + Detail Panel Grid */}
      {(!activeSubmodule || activeSubmodule === 'All Notifications' || activeSubmodule === 'Unread Alerts' || activeSubmodule === 'Important' || activeSubmodule === 'Reminders' || activeSubmodule === 'System Alerts' || activeSubmodule === 'Notifications Centre') && (
        <div style={{ display: 'grid', gridTemplateColumns: activeNotification ? '1fr 380px' : '1fr', gap: '1.25rem', transition: 'all 0.2s ease' }}>
          <NotificationsListPanel
            onSelectNotification={handleSelectNotification}
            onSnoozeNotification={handleOpenSnoozeModal}
          />

          {activeNotification && (
            <NotificationDetailPanel
              notification={activeNotification}
              onClose={handleCloseDetailPanel}
              onSnooze={handleOpenSnoozeModal}
            />
          )}
        </div>
      )}

      {/* Notification Settings Submodule View */}
      {activeSubmodule === 'Notification Settings' && (
        <section style={{ marginTop: '1.25rem' }}>
          <NotificationPreferencesPanel onOpenSettingsModal={handleOpenSettingsModal} />
        </section>
      )}

      {/* Row 4: Unread Priority Breakdown Widget */}
      {(!activeSubmodule || activeSubmodule === 'All Notifications') && (
        <section style={{ marginTop: '1.25rem' }}>
          <UnreadSummaryWidget />
        </section>
      )}

      {/* Modals */}
      <NotificationSettingsModal
        isOpen={isSettingsModalOpen}
        onClose={handleCloseSettingsModal}
      />

      <SnoozeNotificationModal
        isOpen={isSnoozeModalOpen}
        onClose={handleCloseSnoozeModal}
        notification={snoozeTargetNotification}
      />
    </div>
  );
});

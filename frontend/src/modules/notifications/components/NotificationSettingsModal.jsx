import { useState, memo, useCallback } from 'react';
import { useApp } from '../../../core/providers/AppContext';
import { Settings, Moon, Mail, Clock } from 'lucide-react';
import { Modal } from '../../../shared/components/Modal';

export const NotificationSettingsModal = memo(function NotificationSettingsModal({ isOpen, onClose }) {
  const { notificationPreferences, showToast } = useApp();

  const [quietHours, setQuietHours] = useState(notificationPreferences.quiet_hours);
  const [digestMode, setDigestMode] = useState(notificationPreferences.digest_mode);

  const handleSave = useCallback((e) => {
    e.preventDefault();
    showToast('Saved Notification Preferences & Quiet Hours config', 'success');
    onClose();
  }, [showToast, onClose]);

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Notification Rules & Delivery Settings"
      icon={<Settings size={18} color="var(--precision-blue)" />}
      width="540px"
    >
      <form onSubmit={handleSave}>
        <div className="form-grid">
          {/* Quiet Hours Section */}
          <div className="form-grid-full" style={{ padding: '0.75rem', background: 'var(--bg-input)', borderRadius: '4px', border: '1px solid var(--border-color)' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontWeight: 800, fontSize: '0.825rem' }}>
                <Moon size={15} color="#8b5cf6" aria-hidden="true" /> Quiet Hours (Mute Email/SMS Pushes)
              </div>
              <input
                type="checkbox"
                checked={quietHours.enabled}
                onChange={(e) => setQuietHours((prev) => ({ ...prev, enabled: e.target.checked }))}
                aria-label="Enable quiet hours"
              />
            </div>

            {quietHours.enabled && (
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '0.5rem', marginTop: '0.5rem', fontSize: '0.75rem' }}>
                <div>
                  <label htmlFor="qh-start" className="form-label">START TIME</label>
                  <input
                    id="qh-start"
                    type="time"
                    value={quietHours.start}
                    onChange={(e) => setQuietHours((prev) => ({ ...prev, start: e.target.value }))}
                    className="form-input mono-data"
                  />
                </div>

                <div>
                  <label htmlFor="qh-end" className="form-label">END TIME</label>
                  <input
                    id="qh-end"
                    type="time"
                    value={quietHours.end}
                    onChange={(e) => setQuietHours((prev) => ({ ...prev, end: e.target.value }))}
                    className="form-input mono-data"
                  />
                </div>

                <div>
                  <label htmlFor="qh-tz" className="form-label">TIMEZONE</label>
                  <input
                    id="qh-tz"
                    type="text"
                    readOnly
                    value={quietHours.timezone}
                    className="form-input mono-data"
                  />
                </div>
              </div>
            )}
          </div>

          {/* Digest Mode Section */}
          <div className="form-grid-full" style={{ padding: '0.75rem', background: 'var(--bg-input)', borderRadius: '4px', border: '1px solid var(--border-color)' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontWeight: 800, fontSize: '0.825rem' }}>
                <Mail size={15} color="#2563eb" aria-hidden="true" /> Daily Digest Mode (Batch Email Delivery)
              </div>
              <input
                type="checkbox"
                checked={digestMode.enabled}
                onChange={(e) => setDigestMode((prev) => ({ ...prev, enabled: e.target.checked }))}
                aria-label="Enable daily digest mode"
              />
            </div>

            {digestMode.enabled && (
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '0.5rem', marginTop: '0.5rem', fontSize: '0.75rem' }}>
                <div>
                  <label htmlFor="dig-freq" className="form-label">DIGEST FREQUENCY</label>
                  <select
                    id="dig-freq"
                    value={digestMode.frequency}
                    onChange={(e) => setDigestMode((prev) => ({ ...prev, frequency: e.target.value }))}
                    className="form-input select-input"
                  >
                    <option value="daily">Daily Morning Summary</option>
                    <option value="weekly">Weekly Summary (Mondays)</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="dig-time" className="form-label">DELIVERY TIME</label>
                  <input
                    id="dig-time"
                    type="time"
                    value={digestMode.time}
                    onChange={(e) => setDigestMode((prev) => ({ ...prev, time: e.target.value }))}
                    className="form-input mono-data"
                  />
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="modal-actions" style={{ marginTop: '1.25rem' }}>
          <button type="button" className="btn btn-secondary btn-sm" onClick={onClose}>
            CANCEL
          </button>
          <button type="submit" className="btn btn-primary btn-sm">
            SAVE PREFERENCES
          </button>
        </div>
      </form>
    </Modal>
  );
});

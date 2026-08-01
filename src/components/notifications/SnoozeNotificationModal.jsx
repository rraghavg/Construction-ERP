import { useState, memo, useCallback } from 'react';
import { useApp } from '../../context/AppContext';
import { Clock } from 'lucide-react';
import { Modal } from '../shared/Modal';

export const SnoozeNotificationModal = memo(function SnoozeNotificationModal({ isOpen, onClose, notification }) {
  const { snoozeNotification } = useApp();
  const [snoozeDuration, setSnoozeDuration] = useState('24');

  const handleSnoozeConfirm = useCallback((e) => {
    e.preventDefault();
    if (!notification) return;

    snoozeNotification(notification.id, Number(snoozeDuration));
    onClose();
  }, [notification, snoozeDuration, snoozeNotification, onClose]);

  if (!notification) return null;

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={`Snooze Alert — ${notification.title}`}
      icon={<Clock size={18} color="var(--precision-blue)" />}
      width="420px"
    >
      <form onSubmit={handleSnoozeConfirm}>
        <div className="form-grid">
          <div className="form-grid-full">
            <label htmlFor="snz-dur" className="form-label">SNOOZE DURATION / REMIND LATER *</label>
            <select
              id="snz-dur"
              value={snoozeDuration}
              onChange={(e) => setSnoozeDuration(e.target.value)}
              className="form-input select-input"
            >
              <option value="1">1 Hour</option>
              <option value="4">4 Hours</option>
              <option value="24">Tomorrow 09:00 AM (24 Hours)</option>
              <option value="72">3 Days Later</option>
              <option value="168">Next Week (7 Days)</option>
            </select>
          </div>
        </div>

        <div className="modal-actions" style={{ marginTop: '1.25rem' }}>
          <button type="button" className="btn btn-secondary btn-sm" onClick={onClose}>
            CANCEL
          </button>
          <button type="submit" className="btn btn-primary btn-sm">
            CONFIRM SNOOZE
          </button>
        </div>
      </form>
    </Modal>
  );
});

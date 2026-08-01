import { useState, memo, useCallback } from 'react';
import { useApp } from '../../context/AppContext';
import { Calendar } from 'lucide-react';
import { Modal } from '../shared/Modal';

export const ScheduleFollowUpModal = memo(function ScheduleFollowUpModal({ isOpen, onClose, lead }) {
  const { scheduleFollowUp } = useApp();
  const [note, setNote] = useState('');
  const [followUpDate, setFollowUpDate] = useState('Tomorrow, 2:00 PM');

  const handleSubmit = useCallback((e) => {
    e.preventDefault();
    if (!lead) return;

    scheduleFollowUp(lead.id, note || 'Scheduled Call / Site Visit', followUpDate);
    setNote('');
    onClose();
  }, [lead, note, followUpDate, scheduleFollowUp, onClose]);

  if (!lead) return null;

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={`Follow-up for ${lead.name}`}
      icon={<Calendar size={18} color="var(--precision-blue)" />}
      width="420px"
    >
      <form onSubmit={handleSubmit}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <div>
            <label htmlFor="followup-time" className="form-label">SCHEDULE TIME / DATE</label>
            <select
              id="followup-time"
              value={followUpDate}
              onChange={(e) => setFollowUpDate(e.target.value)}
              className="form-input select-input mono-data"
            >
              <option value="Today, 5:00 PM">Today, 5:00 PM</option>
              <option value="Tomorrow, 10:00 AM">Tomorrow, 10:00 AM</option>
              <option value="Tomorrow, 2:00 PM">Tomorrow, 2:00 PM</option>
              <option value="In 3 Days, 11:00 AM">In 3 Days, 11:00 AM</option>
              <option value="Next Week, 10:00 AM">Next Week, 10:00 AM</option>
            </select>
          </div>

          <div>
            <label htmlFor="followup-notes" className="form-label">ACTION ITEM / AGENDA</label>
            <textarea
              id="followup-notes"
              rows={3}
              required
              placeholder="e.g., Call customer to confirm site visit on Saturday morning..."
              value={note}
              onChange={(e) => setNote(e.target.value)}
              className="form-input"
            />
          </div>
        </div>

        <div className="modal-actions">
          <button type="button" className="btn btn-secondary btn-sm" onClick={onClose}>
            CANCEL
          </button>
          <button type="submit" className="btn btn-primary btn-sm">
            CONFIRM SCHEDULE
          </button>
        </div>
      </form>
    </Modal>
  );
});

import { useState, memo, useCallback } from 'react';
import { useApp } from '../../../core/providers/AppContext';
import { Calendar } from 'lucide-react';
import { Modal } from '../../../shared/components/Modal';

export const ScheduleAuditReportModal = memo(function ScheduleAuditReportModal({ isOpen, onClose }) {
  const { showToast } = useApp();
  const [freq, setFreq] = useState('weekly');
  const [format, setFormat] = useState('pdf');

  const handleScheduleConfirm = useCallback((e) => {
    e.preventDefault();
    showToast(`Scheduled ${freq.toUpperCase()} compliance audit report export in .${format.toUpperCase()}`, 'success');
    onClose();
  }, [freq, format, showToast, onClose]);

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Schedule Automated Compliance Audit Export"
      icon={<Calendar size={18} color="var(--precision-blue)" />}
      width="460px"
    >
      <form onSubmit={handleScheduleConfirm}>
        <div className="form-grid">
          <div>
            <label htmlFor="sch-freq" className="form-label">SCHEDULE FREQUENCY *</label>
            <select
              id="sch-freq"
              value={freq}
              onChange={(e) => setFreq(e.target.value)}
              className="form-input select-input"
            >
              <option value="daily">Daily Morning Run (08:00 AM)</option>
              <option value="weekly">Weekly Summary (Mondays)</option>
              <option value="monthly">Monthly Full Compliance Audit</option>
            </select>
          </div>

          <div>
            <label htmlFor="sch-fmt" className="form-label">EXPORT FORMAT *</label>
            <select
              id="sch-fmt"
              value={format}
              onChange={(e) => setFormat(e.target.value)}
              className="form-input select-input"
            >
              <option value="pdf">PDF Document (.pdf)</option>
              <option value="xlsx">Excel Spreadsheet (.xlsx)</option>
              <option value="csv">Comma-Separated Values (.csv)</option>
            </select>
          </div>
        </div>

        <div className="modal-actions" style={{ marginTop: '1.25rem' }}>
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

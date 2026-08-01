import { useState, memo, useCallback } from 'react';
import { useApp } from '../../context/AppContext';
import { Send } from 'lucide-react';
import { Modal } from '../shared/Modal';

export const SendDemandLetterModal = memo(function SendDemandLetterModal({ isOpen, onClose, overdueItem }) {
  const { issueDemandLetter } = useApp();
  const [noticeType, setNoticeType] = useState('1st Notice');
  const [remarks, setRemarks] = useState('');

  const handleSubmit = useCallback((e) => {
    e.preventDefault();
    if (!overdueItem) return;

    issueDemandLetter(overdueItem, noticeType);
    setRemarks('');
    onClose();
  }, [overdueItem, noticeType, issueDemandLetter, onClose]);

  if (!overdueItem) return null;

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={`Issue Demand Notice`}
      icon={<Send size={18} color="#dc2626" />}
      width="420px"
    >
      <form onSubmit={handleSubmit}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginBottom: '1.25rem' }}>
          <div style={{ padding: '0.65rem', background: 'rgba(220, 38, 38, 0.08)', border: '1px solid rgba(220, 38, 38, 0.25)', borderRadius: '4px', fontSize: '0.8rem' }}>
            <div style={{ fontWeight: 800, color: '#dc2626' }}>{overdueItem.customerName}</div>
            <div style={{ fontSize: '0.725rem', marginTop: '2px' }}>
              Unit: {overdueItem.unit} | Overdue Amount: <span className="mono-data" style={{ fontWeight: 800 }}>{overdueItem.amount}</span>
            </div>
            <div className="mono-data" style={{ fontSize: '0.675rem', color: '#b91c1c', marginTop: '2px' }}>
              OVERDUE BY {overdueItem.daysOverdue} DAYS
            </div>
          </div>

          <div>
            <label htmlFor="demand-notice-level" className="form-label">DEMAND NOTICE LEVEL</label>
            <select
              id="demand-notice-level"
              value={noticeType}
              onChange={(e) => setNoticeType(e.target.value)}
              className="form-input select-input mono-data"
            >
              <option value="1st Notice (Friendly Reminder)">1st Notice (Friendly Reminder)</option>

              <option value="2nd Notice (Formal Warning)">2nd Notice (Formal Warning)</option>
              <option value="Final Notice (Pre-Legal)">Final Notice (Pre-Legal)</option>
              <option value="Legal Interest Penalty Notice">Legal Interest Penalty Notice</option>
            </select>
          </div>

          <div>
            <label htmlFor="demand-remarks" className="form-label">ADDITIONAL CLAUSE / NOTES</label>
            <textarea
              id="demand-remarks"
              rows={2}
              placeholder="e.g. Please clear overdue amount within 7 days to avoid interest penalty..."
              value={remarks}
              onChange={(e) => setRemarks(e.target.value)}
              className="form-input"
            />
          </div>
        </div>

        <div className="modal-actions">
          <button type="button" className="btn btn-secondary btn-sm" onClick={onClose}>
            CANCEL
          </button>
          <button type="submit" className="btn btn-primary btn-sm" style={{ background: '#dc2626', borderColor: '#dc2626' }}>
            ISSUE & SEND DEMAND LETTER
          </button>
        </div>
      </form>
    </Modal>
  );
});

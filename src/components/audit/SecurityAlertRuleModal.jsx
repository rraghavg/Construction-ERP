import { useState, memo, useCallback } from 'react';
import { useApp } from '../../context/AppContext';
import { Bell } from 'lucide-react';
import { Modal } from '../shared/Modal';

export const SecurityAlertRuleModal = memo(function SecurityAlertRuleModal({ isOpen, onClose }) {
  const { createSecurityAlertRule } = useApp();
  const [severity, setSeverity] = useState('critical');
  const [notifyRole, setNotifyRole] = useState('Admin');

  const handleSaveAlert = useCallback((e) => {
    e.preventDefault();
    createSecurityAlertRule({ severity, notifyRole });
    onClose();
  }, [severity, notifyRole, createSecurityAlertRule, onClose]);

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Configure Real-Time Security Alert Threshold"
      icon={<Bell size={18} color="#dc2626" />}
      width="460px"
    >
      <form onSubmit={handleSaveAlert}>
        <div className="form-grid">
          <div>
            <label htmlFor="alt-sev" className="form-label">TRIGGER SEVERITY THRESHOLD *</label>
            <select
              id="alt-sev"
              value={severity}
              onChange={(e) => setSeverity(e.target.value)}
              className="form-input select-input"
            >
              <option value="critical">Critical Severity Only (Immediate)</option>
              <option value="high">High & Critical Severity</option>
              <option value="all">All Audit Events (Debug Mode)</option>
            </select>
          </div>

          <div>
            <label htmlFor="alt-role" className="form-label">NOTIFY ROLE *</label>
            <select
              id="alt-role"
              value={notifyRole}
              onChange={(e) => setNotifyRole(e.target.value)}
              className="form-input select-input"
            >
              <option value="Admin">Admin & Super Admin</option>
              <option value="Security Officer">Security Officer</option>
              <option value="Manager">Department Managers</option>
            </select>
          </div>
        </div>

        <div className="modal-actions" style={{ marginTop: '1.25rem' }}>
          <button type="button" className="btn btn-secondary btn-sm" onClick={onClose}>
            CANCEL
          </button>
          <button type="submit" className="btn btn-primary btn-sm">
            ENABLE ALERT RULE 🔔
          </button>
        </div>
      </form>
    </Modal>
  );
});

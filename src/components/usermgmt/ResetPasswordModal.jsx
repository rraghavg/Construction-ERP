import { useState, memo, useCallback } from 'react';
import { useApp } from '../../context/AppContext';
import { Lock } from 'lucide-react';
import { Modal } from '../shared/Modal';

export const ResetPasswordModal = memo(function ResetPasswordModal({ isOpen, onClose, user }) {
  const { resetUserPassword, userMgmtUsers } = useApp();
  const [selectedUserId, setSelectedUserId] = useState(user?.id || userMgmtUsers[0]?.id || '');

  const handleConfirmReset = useCallback((e) => {
    e.preventDefault();
    if (!selectedUserId) return;

    resetUserPassword(selectedUserId);
    onClose();
  }, [selectedUserId, resetUserPassword, onClose]);

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Reset User Password & Clear Account Lockout"
      icon={<Lock size={18} color="var(--precision-blue)" />}
      width="440px"
    >
      <form onSubmit={handleConfirmReset}>
        <div className="form-grid">
          <div className="form-grid-full">
            <label htmlFor="rst-usr" className="form-label">SELECT USER ACCOUNT *</label>
            <select
              id="rst-usr"
              value={selectedUserId}
              onChange={(e) => setSelectedUserId(e.target.value)}
              className="form-input select-input"
            >
              {userMgmtUsers.map((u) => (
                <option key={u.id} value={u.id}>
                  {u.name} ({u.id} - {u.role})
                </option>
              ))}
            </select>
          </div>
        </div>

        <div style={{ padding: '0.75rem', background: 'var(--bg-input)', borderRadius: '4px', marginTop: '0.85rem', fontSize: '0.725rem', color: 'var(--text-muted)', lineHeight: 1.4 }}>
          <strong>Note:</strong> Resetting password will automatically send an email link to the user, invalidate all current active sessions, and clear any failed login attempt lockouts.
        </div>

        <div className="modal-actions" style={{ marginTop: '1.25rem' }}>
          <button type="button" className="btn btn-secondary btn-sm" onClick={onClose}>
            CANCEL
          </button>
          <button type="submit" className="btn btn-primary btn-sm">
            SEND RESET LINK & UNLOCK
          </button>
        </div>
      </form>
    </Modal>
  );
});

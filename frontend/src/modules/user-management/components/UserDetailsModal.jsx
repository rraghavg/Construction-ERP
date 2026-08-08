import { useState, memo, useCallback } from 'react';
import { useApp } from '../../../core/providers/AppContext';
import { UserCheck, Shield, Key, Lock, CheckCircle2, X } from 'lucide-react';
import { Modal } from '../../../shared/components/Modal';
import { UserStatusBadge } from './UsersDirectoryTable';

export const UserDetailsModal = memo(function UserDetailsModal({ isOpen, onClose, user, onOpenResetModal }) {
  const { updateUserStatus } = useApp();
  const [activeTab, setActiveTab] = useState('profile');

  if (!user) return null;

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={`User Account 360° Profile — ${user.name}`}
      icon={<UserCheck size={18} color="var(--precision-blue)" />}
      width="580px"
    >
      <div>
        {/* Profile Summary Card */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '0.85rem',
            background: 'var(--bg-input)',
            borderRadius: '4px',
            border: '1px solid var(--border-color)',
            marginBottom: '0.85rem'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div
              className="mono-data"
              style={{
                width: '36px',
                height: '36px',
                borderRadius: '50%',
                background: 'rgba(37, 99, 235, 0.12)',
                color: '#2563eb',
                display: 'grid',
                placeItems: 'center',
                fontSize: '0.85rem',
                fontWeight: 800
              }}
            >
              {user.initials}
            </div>
            <div>
              <div style={{ fontWeight: 800, fontSize: '0.9rem' }}>{user.name}</div>
              <div className="mono-data" style={{ fontSize: '0.725rem', color: 'var(--text-muted)' }}>
                {user.email} • {user.mobile || 'N/A'}
              </div>
            </div>
          </div>

          <UserStatusBadge status={user.status} />
        </div>

        {/* Modal Tabs */}
        <div style={{ display: 'flex', gap: '6px', borderBottom: '1px solid var(--border-color)', marginBottom: '0.85rem', paddingBottom: '0.5rem' }}>
          {['profile', 'permissions', 'sessions'].map((t) => (
            <button
              key={t}
              className={`btn btn-sm ${activeTab === t ? 'btn-primary' : 'btn-secondary'}`}
              onClick={() => setActiveTab(t)}
              style={{ fontSize: '0.725rem', padding: '0.3rem 0.65rem', textTransform: 'capitalize' }}
            >
              {t === 'profile' ? 'Profile Details' : t === 'permissions' ? 'RBAC Permissions' : 'Active Sessions'}
            </button>
          ))}
        </div>

        {/* Tab 1: Profile Details */}
        {activeTab === 'profile' && (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '0.75rem', fontSize: '0.775rem' }}>
            <div>
              <span style={{ color: 'var(--text-muted)', fontSize: '0.675rem', display: 'block' }}>USER ID</span>
              <span className="mono-data" style={{ fontWeight: 700, color: 'var(--precision-blue)' }}>{user.id}</span>
            </div>
            <div>
              <span style={{ color: 'var(--text-muted)', fontSize: '0.675rem', display: 'block' }}>ASSIGNED ROLE</span>
              <span style={{ fontWeight: 700 }}>{user.role}</span>
            </div>
            <div>
              <span style={{ color: 'var(--text-muted)', fontSize: '0.675rem', display: 'block' }}>DEPARTMENT</span>
              <span>{user.department}</span>
            </div>
            <div>
              <span style={{ color: 'var(--text-muted)', fontSize: '0.675rem', display: 'block' }}>JOB TITLE</span>
              <span>{user.jobTitle || 'System Employee'}</span>
            </div>
            <div>
              <span style={{ color: 'var(--text-muted)', fontSize: '0.675rem', display: 'block' }}>LAST LOGIN</span>
              <span className="mono-data">{user.lastLogin}</span>
            </div>
            <div>
              <span style={{ color: 'var(--text-muted)', fontSize: '0.675rem', display: 'block' }}>MFA ENFORCEMENT</span>
              <span className="mono-data" style={{ color: '#16a34a', fontWeight: 700 }}>ENABLED (TOTP)</span>
            </div>
          </div>
        )}

        {/* Tab 2: Permissions Matrix */}
        {activeTab === 'permissions' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', fontSize: '0.75rem' }}>
            {['Sales & Bookings', 'Finance & Collections', 'Inventory & Requisitions', 'Customer KYC Management', 'HR & Attendance'].map((mod) => (
              <div key={mod} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0.4rem 0.6rem', background: 'var(--bg-input)', borderRadius: '4px' }}>
                <span>{mod}</span>
                <span className="mono-data" style={{ color: '#16a34a', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '4px', fontSize: '0.65rem' }}>
                  <CheckCircle2 size={12} aria-hidden="true" /> FULL ACCESS
                </span>
              </div>
            ))}
          </div>
        )}

        {/* Tab 3: Active Sessions */}
        {activeTab === 'sessions' && (
          <div style={{ padding: '0.75rem', background: 'var(--bg-input)', borderRadius: '4px', fontSize: '0.75rem' }}>
            <div style={{ fontWeight: 700, marginBottom: '4px' }}>Active Session Token</div>
            <div className="mono-data" style={{ fontSize: '0.675rem', color: 'var(--text-muted)' }}>
              IP: 103.21.124.89 (Hyderabad, IN) • Chrome 122 on macOS
            </div>
          </div>
        )}

        {/* Footer Actions */}
        <div className="modal-actions" style={{ marginTop: '1.25rem' }}>
          <button
            type="button"
            className="btn btn-secondary btn-sm"
            onClick={() => {
              onClose();
              onOpenResetModal(user);
            }}
          >
            <Lock size={12} aria-hidden="true" /> RESET PASSWORD
          </button>
          <button type="button" className="btn btn-primary btn-sm" onClick={onClose}>
            CLOSE
          </button>
        </div>
      </div>
    </Modal>
  );
});

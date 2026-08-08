import { memo, useState, useMemo } from 'react';
import { useApp } from '../../../../core/providers/AppContext';
import { ShieldCheck, Search, Plus, Key, Lock, Unlock } from 'lucide-react';

export const UserMgmtUsersDirectoryView = memo(function UserMgmtUsersDirectoryView({ onOpenAddModal, onOpenResetModal, onOpenUserDetails }) {
  const { users, setSelectedUser, showToast } = useApp();
  const [searchTerm, setSearchTerm] = useState('');

  const filteredUsers = useMemo(() => {
    return users.filter((u) => {
      const term = (searchTerm || '').toLowerCase();
      return (
        (u.name || '').toLowerCase().includes(term) ||
        (u.email || '').toLowerCase().includes(term) ||
        (u.role || '').toLowerCase().includes(term)
      );
    });
  }, [users, searchTerm]);

  return (
    <div className="anodized-panel" style={{ padding: '1.25rem' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <h3 style={{ fontSize: '1rem', fontWeight: 800, display: 'flex', alignItems: 'center', gap: '8px' }}>
            <ShieldCheck size={18} style={{ color: 'var(--precision-blue)' }} />
            User Accounts & Security Access Directory
          </h3>
          <p style={{ fontSize: '0.725rem', color: 'var(--text-muted)', marginTop: '2px' }}>
            System user credentials, active roles, 2FA status, and password reset actions
          </p>
        </div>

        <button className="btn btn-primary btn-sm" onClick={onOpenAddModal}>
          <Plus size={14} /> ADD NEW USER
        </button>
      </div>

      <div style={{ display: 'flex', gap: '0.75rem', marginBottom: '1rem' }}>
        <div style={{ position: 'relative', flex: 1 }}>
          <Search size={14} style={{ position: 'absolute', left: '10px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
          <input
            type="text"
            className="form-control"
            placeholder="Search users by name, email, role..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{ paddingLeft: '32px', fontSize: '0.75rem' }}
          />
        </div>
      </div>

      <div style={{ overflowX: 'auto' }}>
        <table className="table" style={{ width: '100%', fontSize: '0.75rem' }}>
          <thead>
            <tr>
              <th>USER ID</th>
              <th>NAME & EMAIL</th>
              <th>ASSIGNED ROLE</th>
              <th>PROJECT SCOPE</th>
              <th>LAST LOGIN</th>
              <th>STATUS</th>
              <th>ACTIONS</th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers.map((u) => (
              <tr
                key={u.id}
                onClick={() => {
                  setSelectedUser(u);
                  onOpenUserDetails(u);
                }}
                style={{ cursor: 'pointer' }}
              >
                <td className="mono-data" style={{ fontWeight: 700, color: 'var(--precision-blue)' }}>{u.id}</td>
                <td>
                  <div style={{ fontWeight: 700 }}>{u.name}</div>
                  <div style={{ fontSize: '0.675rem', color: 'var(--text-muted)' }}>{u.email}</div>
                </td>
                <td><span className="badge badge-info">{u.role}</span></td>
                <td>{u.projectScope || 'All Projects'}</td>
                <td className="mono-data">{u.lastLogin || 'Today, 10:15 AM'}</td>
                <td><span className={`badge ${u.status === 'INACTIVE' ? 'badge-danger' : 'badge-success'}`}>{u.status || 'ACTIVE'}</span></td>
                <td>
                  <div style={{ display: 'flex', gap: '4px' }}>
                    <button
                      className="btn btn-secondary btn-xs"
                      onClick={(e) => {
                        e.stopPropagation();
                        onOpenResetModal(u);
                      }}
                      title="Reset Password"
                    >
                      <Key size={11} /> Reset
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
});

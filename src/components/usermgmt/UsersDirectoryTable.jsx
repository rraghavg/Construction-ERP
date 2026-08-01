import { useState, useMemo, memo, useCallback } from 'react';
import { useApp } from '../../context/AppContext';
import { Eye, UserPlus, Lock, Key, Trash2, Search } from 'lucide-react';
import { PanelHeader } from '../shared/PanelHeader';

export const UserStatusBadge = memo(function UserStatusBadge({ status }) {
  let badgeStyle = { bg: 'rgba(22, 163, 74, 0.12)', color: '#15803d', border: 'rgba(22, 163, 74, 0.3)' };

  if (status === 'Inactive') {
    badgeStyle = { bg: 'rgba(245, 158, 11, 0.12)', color: '#b45309', border: 'rgba(245, 158, 11, 0.3)' };
  } else if (status === 'Locked') {
    badgeStyle = { bg: 'rgba(220, 38, 38, 0.12)', color: '#b91c1c', border: 'rgba(220, 38, 38, 0.3)' };
  } else if (status === 'Pending') {
    badgeStyle = { bg: 'rgba(37, 99, 235, 0.12)', color: '#1d4ed8', border: 'rgba(37, 99, 235, 0.3)' };
  } else if (status === 'Deactivated') {
    badgeStyle = { bg: 'rgba(100, 116, 139, 0.12)', color: '#475569', border: 'rgba(100, 116, 139, 0.3)' };
  }

  return (
    <span
      className="badge mono-data"
      style={{
        background: badgeStyle.bg,
        color: badgeStyle.color,
        border: `1px solid ${badgeStyle.border}`,
        fontSize: '0.65rem'
      }}
    >
      {status}
    </span>
  );
});

export const UsersDirectoryTable = memo(function UsersDirectoryTable({ onOpenAddModal, onSelectUser, onOpenResetModal }) {
  const { userMgmtUsers, selectedUserMgmtUser, setSelectedUserMgmtUser, navigateTo, updateUserStatus } = useApp();

  const [activeTab, setActiveTab] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredUsers = useMemo(() => {
    return userMgmtUsers.filter((u) => {
      if (activeTab === 'active' && u.status !== 'Active') return false;
      if (activeTab === 'inactive' && u.status !== 'Inactive') return false;
      if (activeTab === 'locked' && u.status !== 'Locked') return false;

      if (searchQuery.trim()) {
        const term = searchQuery.toLowerCase();
        const matchName = u.name.toLowerCase().includes(term);
        const matchEmail = u.email.toLowerCase().includes(term);
        const matchRole = u.role.toLowerCase().includes(term);
        const matchDept = u.department.toLowerCase().includes(term);
        if (!matchName && !matchEmail && !matchRole && !matchDept) return false;
      }

      return true;
    });
  }, [userMgmtUsers, activeTab, searchQuery]);

  const handleUserSelect = useCallback((item) => {
    setSelectedUserMgmtUser(item);
    onSelectUser(item);
  }, [setSelectedUserMgmtUser, onSelectUser]);

  const handleUserKeyDown = useCallback((e, item) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      handleUserSelect(item);
    }
  }, [handleUserSelect]);

  const handleToggleStatus = useCallback((e, userId, currentStatus) => {
    e.stopPropagation();
    const nextStatus = currentStatus === 'Active' ? 'Inactive' : 'Active';
    updateUserStatus(userId, nextStatus);
  }, [updateUserStatus]);

  return (
    <div className="panel-card" style={{ padding: '1.25rem' }}>
      <PanelHeader
        title="System Users Directory & Access Management"
        accentColor="#2563eb"
        actionLabel="ALL ROLES →"
        onAction={() => navigateTo('user-mgmt', 'Roles & Hierarchy')}
      >
        <button
          className="btn btn-primary btn-sm"
          onClick={onOpenAddModal}
          aria-label="Add New User"
        >
          <UserPlus size={14} aria-hidden="true" /> ADD NEW USER
        </button>
      </PanelHeader>

      {/* Tabs & Search */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.85rem', flexWrap: 'wrap', gap: '8px' }}>
        <div style={{ display: 'flex', gap: '6px' }}>
          {[
            { id: 'all', label: 'All Users', count: userMgmtUsers.length },
            { id: 'active', label: 'Active', count: userMgmtUsers.filter((u) => u.status === 'Active').length },
            { id: 'inactive', label: 'Inactive', count: userMgmtUsers.filter((u) => u.status === 'Inactive').length },
            { id: 'locked', label: 'Locked', count: userMgmtUsers.filter((u) => u.status === 'Locked').length }
          ].map((tab) => (
            <button
              key={tab.id}
              className={`btn btn-sm ${activeTab === tab.id ? 'btn-primary' : 'btn-secondary'}`}
              onClick={() => setActiveTab(tab.id)}
              style={{ fontSize: '0.725rem', padding: '0.3rem 0.65rem' }}
            >
              {tab.label} <span className="mono-data" style={{ fontSize: '0.65rem', opacity: 0.8 }}>({tab.count})</span>
            </button>
          ))}
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '6px', background: 'var(--bg-input)', border: '1px solid var(--border-color)', borderRadius: '4px', padding: '0.3rem 0.6rem', minWidth: '220px' }}>
          <Search size={13} color="var(--text-muted)" aria-hidden="true" />
          <input
            type="text"
            placeholder="Search name, email, role..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            style={{ background: 'transparent', border: 'none', color: 'var(--text-main)', outline: 'none', width: '100%', fontSize: '0.75rem', fontFamily: 'var(--font-main)' }}
          />
        </div>
      </div>

      <div style={{ overflowX: 'auto', border: '1px solid var(--border-color)', borderRadius: '4px' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.8rem' }} aria-label="Users directory table">
          <thead>
            <tr style={{ background: 'var(--bg-input)', borderBottom: '1px solid var(--border-color)', fontSize: '0.7rem', color: 'var(--text-muted)' }}>
              <th style={{ padding: '0.65rem 0.75rem' }}>USER ID</th>
              <th style={{ padding: '0.65rem 0.75rem' }}>FULL NAME</th>
              <th style={{ padding: '0.65rem 0.75rem' }}>EMAIL ADDRESS</th>
              <th style={{ padding: '0.65rem 0.75rem' }}>ASSIGNED ROLE</th>
              <th style={{ padding: '0.65rem 0.75rem' }}>DEPARTMENT</th>
              <th style={{ padding: '0.65rem 0.75rem' }}>STATUS</th>
              <th style={{ padding: '0.65rem 0.75rem' }}>LAST LOGIN</th>
              <th style={{ padding: '0.65rem 0.75rem', textAlign: 'right' }}>ACTIONS</th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers.map((item) => {
              const isSelected = selectedUserMgmtUser?.id === item.id;

              return (
                <tr
                  key={item.id}
                  tabIndex={0}
                  role="button"
                  onClick={() => handleUserSelect(item)}
                  onKeyDown={(e) => handleUserKeyDown(e, item)}
                  aria-selected={isSelected}
                  style={{
                    borderBottom: '1px solid var(--border-color)',
                    background: isSelected ? 'rgba(37, 99, 235, 0.08)' : 'transparent',
                    cursor: 'pointer',
                    transition: 'background 0.2s ease'
                  }}
                >
                  <td className="mono-data" style={{ padding: '0.75rem', fontWeight: '700', color: 'var(--precision-blue)' }}>
                    {item.id}
                  </td>
                  <td style={{ padding: '0.75rem', fontWeight: '700' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <div
                        className="mono-data"
                        style={{
                          width: '26px',
                          height: '26px',
                          borderRadius: '50%',
                          background: 'rgba(37, 99, 235, 0.12)',
                          color: '#2563eb',
                          display: 'grid',
                          placeItems: 'center',
                          fontSize: '0.65rem',
                          fontWeight: 800
                        }}
                      >
                        {item.initials}
                      </div>
                      {item.name}
                    </div>
                  </td>
                  <td className="mono-data" style={{ padding: '0.75rem', fontSize: '0.725rem', color: 'var(--text-muted)' }}>
                    {item.email}
                  </td>
                  <td style={{ padding: '0.75rem', fontSize: '0.725rem', fontWeight: '700' }}>
                    {item.role}
                  </td>
                  <td style={{ padding: '0.75rem', fontSize: '0.725rem' }}>
                    {item.department}
                  </td>
                  <td style={{ padding: '0.75rem' }}>
                    <UserStatusBadge status={item.status} />
                  </td>
                  <td className="mono-data" style={{ padding: '0.75rem', fontSize: '0.725rem' }}>
                    {item.lastLogin}
                  </td>
                  <td style={{ padding: '0.75rem', textAlign: 'right' }}>
                    <div style={{ display: 'flex', gap: '4px', justifyContent: 'flex-end' }}>
                      <button
                        className="btn btn-secondary btn-sm"
                        style={{ padding: '3px 7px' }}
                        onClick={(e) => {
                          e.stopPropagation();
                          handleUserSelect(item);
                        }}
                        title="View Profile & Permissions"
                        aria-label={`View details for ${item.name}`}
                      >
                        <Eye size={12} aria-hidden="true" />
                      </button>
                      <button
                        className="btn btn-secondary btn-sm"
                        style={{ padding: '3px 7px' }}
                        onClick={(e) => {
                          e.stopPropagation();
                          onOpenResetModal(item);
                        }}
                        title="Reset Password / Unlock"
                        aria-label={`Reset password for ${item.name}`}
                      >
                        <Lock size={12} aria-hidden="true" />
                      </button>
                      <button
                        className="btn btn-secondary btn-sm"
                        style={{ padding: '3px 7px', color: item.status === 'Active' ? '#f59e0b' : '#16a34a' }}
                        onClick={(e) => handleToggleStatus(e, item.id, item.status)}
                        title={item.status === 'Active' ? 'Deactivate User' : 'Activate User'}
                        aria-label={`Toggle status for ${item.name}`}
                      >
                        <Key size={12} aria-hidden="true" />
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
});

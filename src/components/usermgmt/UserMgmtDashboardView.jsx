import { useState, memo, useCallback } from 'react';
import { useApp } from '../../context/AppContext';
import { UserMgmtKpiGrid } from './UserMgmtKpiGrid';
import { RoleDistributionChart } from './RoleDistributionChart';
import { UsersByDepartmentChart } from './UsersByDepartmentChart';
import { RecentLoginActivityWidget } from './RecentLoginActivityWidget';
import { UsersDirectoryTable } from './UsersDirectoryTable';
import { SecuritySettingsPanel } from './SecuritySettingsPanel';
import { UserMgmtQuickActionsPanel } from './UserMgmtQuickActionsPanel';
import { AddUserModal } from './AddUserModal';
import { UserDetailsModal } from './UserDetailsModal';
import { ResetPasswordModal } from './ResetPasswordModal';
import { ShieldCheck, Calendar, UserPlus, Settings } from 'lucide-react';

export const UserMgmtDashboardView = memo(function UserMgmtDashboardView() {
  const { navigateTo } = useApp();

  const [activeUser, setActiveUser] = useState(null);
  const [resetTargetUser, setResetTargetUser] = useState(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);
  const [isResetModalOpen, setIsResetModalOpen] = useState(false);

  const handleOpenAddModal = useCallback(() => {
    setIsAddModalOpen(true);
  }, []);

  const handleCloseAddModal = useCallback(() => {
    setIsAddModalOpen(false);
  }, []);

  const handleSelectUser = useCallback((item) => {
    setActiveUser(item);
    setIsDetailsModalOpen(true);
  }, []);

  const handleCloseDetailsModal = useCallback(() => {
    setIsDetailsModalOpen(false);
    setActiveUser(null);
  }, []);

  const handleOpenResetModal = useCallback((item = null) => {
    setResetTargetUser(item);
    setIsResetModalOpen(true);
  }, []);

  const handleCloseResetModal = useCallback(() => {
    setIsResetModalOpen(false);
    setResetTargetUser(null);
  }, []);

  return (
    <div className="blueprint-viewer">
      {/* Header Banner */}
      <div className="anodized-panel" style={{ padding: '1.25rem 1.5rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div>
            <div className="breadcrumb" style={{ fontSize: '0.725rem', marginBottom: '2px' }}>
              <span>Security & Access Control</span> &gt; <span>User Management & RBAC</span>
            </div>
            <h2 style={{ fontSize: '1.3rem', fontWeight: 800 }}>User Management & RBAC Control Hub</h2>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <div className="badge badge-info mono-data" style={{ padding: '6px 10px', fontSize: '0.725rem', display: 'flex', alignItems: 'center', gap: '4px' }}>
              <Calendar size={13} aria-hidden="true" /> 01 Aug 2026 – 31 Aug 2026
            </div>
            <button
              className="btn btn-secondary btn-sm"
              onClick={() => navigateTo('user-mgmt', 'Security Settings')}
            >
              <Settings size={14} aria-hidden="true" /> SECURITY SETTINGS ⚙️
            </button>
            <button
              className="btn btn-primary btn-sm"
              onClick={handleOpenAddModal}
            >
              <UserPlus size={14} aria-hidden="true" /> + ADD NEW USER
            </button>
          </div>
        </div>
      </div>

      {/* Row 1: 5 Top-line KPI Cards */}
      <UserMgmtKpiGrid />

      {/* Row 2: Analytics Grid (Role Donut, Dept Bar, Login Stream) */}
      <section className="analytics-grid" style={{ gridTemplateColumns: 'repeat(3, 1fr)' }}>
        <RoleDistributionChart />
        <UsersByDepartmentChart />
        <RecentLoginActivityWidget />
      </section>

      {/* Row 3: Users Directory Table */}
      <section style={{ marginTop: '1.25rem' }}>
        <UsersDirectoryTable
          onOpenAddModal={handleOpenAddModal}
          onSelectUser={handleSelectUser}
          onOpenResetModal={handleOpenResetModal}
        />
      </section>

      {/* Row 4: Security Policy & Active Live Sessions Panel */}
      <section style={{ marginTop: '1.25rem' }}>
        <SecuritySettingsPanel />
      </section>

      {/* Row 5: 7 Quick Action Launcher Tiles */}
      <section style={{ marginTop: '1.25rem' }}>
        <UserMgmtQuickActionsPanel
          onOpenAddModal={handleOpenAddModal}
          onOpenResetModal={handleOpenResetModal}
        />
      </section>

      {/* Modals */}
      <AddUserModal
        isOpen={isAddModalOpen}
        onClose={handleCloseAddModal}
      />

      <UserDetailsModal
        isOpen={isDetailsModalOpen}
        onClose={handleCloseDetailsModal}
        user={activeUser}
        onOpenResetModal={handleOpenResetModal}
      />

      <ResetPasswordModal
        isOpen={isResetModalOpen}
        onClose={handleCloseResetModal}
        user={resetTargetUser}
      />
    </div>
  );
});

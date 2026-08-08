import { useState, memo, useCallback } from 'react';
import { useApp } from '../../../core/providers/AppContext';
import { SubmoduleNavHeader } from '../../../shared/components/SubmoduleNavHeader';

import { UserMgmtKpiGrid } from '../components/UserMgmtKpiGrid';
import { RoleDistributionChart } from '../components/RoleDistributionChart';
import { UsersByDepartmentChart } from '../components/UsersByDepartmentChart';
import { RecentLoginActivityWidget } from '../components/RecentLoginActivityWidget';
import { UsersDirectoryTable } from '../components/UsersDirectoryTable';
import { SecuritySettingsPanel } from '../components/SecuritySettingsPanel';
import { UserMgmtQuickActionsPanel } from '../components/UserMgmtQuickActionsPanel';
import { AddUserModal } from '../components/AddUserModal';
import { UserDetailsModal } from '../components/UserDetailsModal';
import { ResetPasswordModal } from '../components/ResetPasswordModal';

import { UserMgmtUsersDirectoryView } from '../components/submodules/UserMgmtUsersDirectoryView';
import { UserMgmtRolesHierarchyView } from '../components/submodules/UserMgmtRolesHierarchyView';
import { UserMgmtPermissionMatrixView } from '../components/submodules/UserMgmtPermissionMatrixView';
import { UserMgmtLoginActivityView } from '../components/submodules/UserMgmtLoginActivityView';
import { ShieldCheck, Calendar, UserPlus, Settings } from 'lucide-react';

export const UserMgmtDashboardView = memo(function UserMgmtDashboardView() {
  const { activeSubmodule, navigateTo } = useApp();

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
      {/* M3 Consolidated Header Banner & Submodule Tabs */}
      <SubmoduleNavHeader
        moduleId="user-mgmt"
        title="User Management & RBAC Control Hub"
        actionButton={
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span className="badge badge-info" style={{ padding: '6px 12px', fontSize: '12px' }}>
              <Calendar size={14} aria-hidden="true" style={{ verticalAlign: 'middle', marginRight: '4px' }} /> 01 Aug 2026 – 31 Aug 2026
            </span>
            <button className="btn btn-secondary btn-sm" onClick={() => navigateTo('user-mgmt', 'Security Settings')}>
              <Settings size={16} aria-hidden="true" /> Security Settings
            </button>
            <button className="btn btn-primary btn-sm" onClick={handleOpenAddModal}>
              <UserPlus size={16} aria-hidden="true" /> Add New User
            </button>
          </div>
        }
      />

      {/* Dynamic Submodule View Routing */}
      {(activeSubmodule === 'Users Directory' || activeSubmodule === 'User Groups') && (
        <UserMgmtUsersDirectoryView onOpenAddModal={handleOpenAddModal} onOpenResetModal={handleOpenResetModal} onOpenUserDetails={handleSelectUser} />
      )}
      {(activeSubmodule === 'Roles & Hierarchy' || activeSubmodule === 'Department Groups') && (
        <UserMgmtRolesHierarchyView />
      )}
      {(activeSubmodule === 'Permission Matrix' || activeSubmodule === 'Role Matrix' || activeSubmodule === 'Approval Workflows' || activeSubmodule === 'Access Requests') && (
        <UserMgmtPermissionMatrixView />
      )}
      {(activeSubmodule === 'Login Activity & Audit' || activeSubmodule === 'Session Logs' || activeSubmodule === 'Security Lockouts') && (
        <UserMgmtLoginActivityView />
      )}
      {activeSubmodule === 'Security Settings' && (
        <SecuritySettingsPanel />
      )}

      {/* Default Dashboard Overview */}
      {(!activeSubmodule || activeSubmodule === 'User Management Dashboard' || activeSubmodule === 'Main Overview') && (
        <>
          {/* Row 1: 5 Top-line KPI Cards */}
          <UserMgmtKpiGrid />

          {/* Row 2: Analytics Grid */}
          <section className="analytics-grid" style={{ gridTemplateColumns: 'repeat(3, 1fr)' }}>
            <RoleDistributionChart />
            <UsersByDepartmentChart />
            <RecentLoginActivityWidget />
          </section>

          {/* Row 3: Users Directory Table */}
          <section style={{ marginTop: '1.25rem' }}>
            <UsersDirectoryTable onOpenAddModal={handleOpenAddModal} onSelectUser={handleSelectUser} onOpenResetModal={handleOpenResetModal} />
          </section>

          {/* Row 4: Security Policy */}
          <section style={{ marginTop: '1.25rem' }}>
            <SecuritySettingsPanel />
          </section>

          {/* Row 5: 7 Quick Action Launchers */}
          <section style={{ marginTop: '1.25rem' }}>
            <UserMgmtQuickActionsPanel onOpenAddModal={handleOpenAddModal} onOpenResetModal={handleOpenResetModal} />
          </section>
        </>
      )}

      {/* Modals */}
      <AddUserModal isOpen={isAddModalOpen} onClose={handleCloseAddModal} />
      <UserDetailsModal isOpen={isDetailsModalOpen} onClose={handleCloseDetailsModal} user={activeUser} onOpenResetModal={handleOpenResetModal} />
      <ResetPasswordModal isOpen={isResetModalOpen} onClose={handleCloseResetModal} user={resetTargetUser} />
    </div>
  );
});

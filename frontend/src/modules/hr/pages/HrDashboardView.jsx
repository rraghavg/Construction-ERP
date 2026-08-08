import { useState, memo, useCallback } from 'react';
import { useApp } from '../../../core/providers/AppContext';
import { SubmoduleNavHeader } from '../../../shared/components/SubmoduleNavHeader';

import { HrKpiGrid } from '../components/HrKpiGrid';
import { EmployeeHeadcountChart } from '../components/EmployeeHeadcountChart';
import { DepartmentDistributionChart } from '../components/DepartmentDistributionChart';
import { AttendanceOverviewDonut } from '../components/AttendanceOverviewDonut';
import { RecentEmployeesTable } from '../components/RecentEmployeesTable';
import { LeaveSummaryWidget } from '../components/LeaveSummaryWidget';
import { UpcomingEventsWidget } from '../components/UpcomingEventsWidget';
import { HrQuickAccessPanel } from '../components/HrQuickAccessPanel';
import { AddEmployeeModal } from '../components/AddEmployeeModal';
import { EmployeeDetailsModal } from '../components/EmployeeDetailsModal';

import { HrEmployeesDirectoryView } from '../components/submodules/HrEmployeesDirectoryView';
import { HrAttendanceShiftsView } from '../components/submodules/HrAttendanceShiftsView';
import { HrLeaveManagementView } from '../components/submodules/HrLeaveManagementView';
import { HrPayrollProcessingView } from '../components/submodules/HrPayrollProcessingView';
import { HrPerformanceReviewsView } from '../components/submodules/HrPerformanceReviewsView';
import { HrDocumentsVaultView } from '../components/submodules/HrDocumentsVaultView';
import { UserPlus, Calendar } from 'lucide-react';

export const HrDashboardView = memo(function HrDashboardView() {
  const { activeSubmodule, setSelectedEmployee } = useApp();

  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const [activeEmpItem, setActiveEmpItem] = useState(null);

  const handleOpenAddModal = useCallback(() => {
    setIsAddModalOpen(true);
  }, []);

  const handleCloseAddModal = useCallback(() => {
    setIsAddModalOpen(false);
  }, []);

  const handleOpenDetailModal = useCallback((item) => {
    setActiveEmpItem(item);
    setSelectedEmployee(item);
    setIsDetailModalOpen(true);
  }, [setSelectedEmployee]);

  const handleCloseDetailModal = useCallback(() => {
    setIsDetailModalOpen(false);
    setActiveEmpItem(null);
  }, []);

  return (
    <div className="blueprint-viewer">
      {/* M3 Consolidated Header Banner & Submodule Tabs */}
      <SubmoduleNavHeader
        moduleId="hr"
        title="Workforce & HR Command Center"
        actionButton={
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span className="badge badge-info" style={{ padding: '6px 12px', fontSize: '12px' }}>
              <Calendar size={14} aria-hidden="true" style={{ verticalAlign: 'middle', marginRight: '4px' }} /> 01 Aug 2026 – 31 Aug 2026
            </span>
            <button className="btn btn-primary btn-sm" onClick={handleOpenAddModal}>
              <UserPlus size={16} aria-hidden="true" /> Add Employee
            </button>
          </div>
        }
      />

      {/* Dynamic Submodule View Routing */}
      {(activeSubmodule === 'Employees Directory' || activeSubmodule === 'Recruitment & Jobs' || activeSubmodule === 'HR Policies') && (
        <HrEmployeesDirectoryView onOpenAddModal={handleOpenAddModal} onOpenEmployeeDetails={handleOpenDetailModal} />
      )}
      {(activeSubmodule === 'Attendance & Shifts' || activeSubmodule === 'Attendance Log') && (
        <HrAttendanceShiftsView />
      )}
      {activeSubmodule === 'Leave Management' && (
        <HrLeaveManagementView />
      )}
      {(activeSubmodule === 'Payroll Processing' || activeSubmodule === 'Run Payroll') && (
        <HrPayrollProcessingView />
      )}
      {(activeSubmodule === 'Performance Reviews' || activeSubmodule === 'Training & Skill Development') && (
        <HrPerformanceReviewsView />
      )}
      {activeSubmodule === 'Documents Vault' && (
        <HrDocumentsVaultView />
      )}

      {/* Default Dashboard Overview */}
      {(!activeSubmodule || activeSubmodule === 'HR Dashboard' || activeSubmodule === 'HR Reports' || activeSubmodule === 'Main Overview') && (
        <>
          {/* Row 1: Top-line 5 HR KPI Cards */}
          <HrKpiGrid />

          {/* Row 2: Analytics & Visualizations Grid (3 Widgets) */}
          <section className="analytics-grid">
            <EmployeeHeadcountChart />
            <DepartmentDistributionChart />
            <AttendanceOverviewDonut />
          </section>

          {/* Row 3: Recent Employees Table Feed */}
          <RecentEmployeesTable onOpenAddModal={handleOpenAddModal} onSelectEmployee={handleOpenDetailModal} />

          {/* Row 4: Leave Summary & Birthdays/Anniversaries Panels (2 Widgets) */}
          <section className="analytics-grid-2">
            <LeaveSummaryWidget />
            <UpcomingEventsWidget />
          </section>

          {/* Row 5: 6 Quick Access Shortcut Tiles */}
          <HrQuickAccessPanel onOpenAddModal={handleOpenAddModal} />
        </>
      )}

      {/* Modals */}
      <AddEmployeeModal isOpen={isAddModalOpen} onClose={handleCloseAddModal} />
      <EmployeeDetailsModal isOpen={isDetailModalOpen} onClose={handleCloseDetailModal} employee={activeEmpItem} />
    </div>
  );
});

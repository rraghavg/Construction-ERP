import { useState, memo, useCallback } from 'react';
import { useApp } from '../../context/AppContext';
import { HrKpiGrid } from './HrKpiGrid';
import { EmployeeHeadcountChart } from './EmployeeHeadcountChart';
import { DepartmentDistributionChart } from './DepartmentDistributionChart';
import { AttendanceOverviewDonut } from './AttendanceOverviewDonut';
import { RecentEmployeesTable } from './RecentEmployeesTable';
import { LeaveSummaryWidget } from './LeaveSummaryWidget';
import { UpcomingEventsWidget } from './UpcomingEventsWidget';
import { HrQuickAccessPanel } from './HrQuickAccessPanel';
import { AddEmployeeModal } from './AddEmployeeModal';
import { EmployeeDetailsModal } from './EmployeeDetailsModal';
import { UserPlus, Calendar } from 'lucide-react';

export const HrDashboardView = memo(function HrDashboardView() {
  const { setSelectedEmployee } = useApp();

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
      {/* Header Banner */}
      <div className="anodized-panel" style={{ padding: '1.25rem 1.5rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div>
            <div className="breadcrumb" style={{ fontSize: '0.725rem', marginBottom: '2px' }}>
              <span>HR & Payroll</span> &gt; <span>HR Dashboard</span>
            </div>
            <h2 style={{ fontSize: '1.3rem', fontWeight: 800 }}>Workforce & HR Command Center</h2>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <div className="badge badge-info mono-data" style={{ padding: '6px 10px', fontSize: '0.725rem', display: 'flex', alignItems: 'center', gap: '4px' }}>
              <Calendar size={13} aria-hidden="true" /> 01 Aug 2026 – 31 Aug 2026
            </div>
            <button
              className="btn btn-primary btn-sm"
              onClick={handleOpenAddModal}
            >
              <UserPlus size={14} aria-hidden="true" /> ADD EMPLOYEE
            </button>
          </div>
        </div>
      </div>

      {/* Row 1: Top-line 5 HR KPI Cards */}
      <HrKpiGrid />

      {/* Row 2: Analytics & Visualizations Grid (3 Widgets) */}
      <section className="analytics-grid">
        <EmployeeHeadcountChart />
        <DepartmentDistributionChart />
        <AttendanceOverviewDonut />
      </section>

      {/* Row 3: Recent Employees Table Feed */}
      <RecentEmployeesTable
        onOpenAddModal={handleOpenAddModal}
        onSelectEmployee={handleOpenDetailModal}
      />

      {/* Row 4: Leave Summary & Birthdays/Anniversaries Panels (2 Widgets) */}
      <section className="analytics-grid-2">
        <LeaveSummaryWidget />
        <UpcomingEventsWidget />
      </section>

      {/* Row 5: 6 Quick Access Shortcut Tiles */}
      <HrQuickAccessPanel onOpenAddModal={handleOpenAddModal} />

      {/* Modals */}
      <AddEmployeeModal
        isOpen={isAddModalOpen}
        onClose={handleCloseAddModal}
      />

      <EmployeeDetailsModal
        isOpen={isDetailModalOpen}
        onClose={handleCloseDetailModal}
        employee={activeEmpItem}
      />
    </div>
  );
});

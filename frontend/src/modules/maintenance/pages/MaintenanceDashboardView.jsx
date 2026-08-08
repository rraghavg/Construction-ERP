import { useState, memo, useCallback } from 'react';
import { useApp } from '../../../core/providers/AppContext';
import { SubmoduleNavHeader } from '../../../shared/components/SubmoduleNavHeader';

import { MaintenanceKpiGrid } from '../components/MaintenanceKpiGrid';
import { MaintenanceStatusDonut } from '../components/MaintenanceStatusDonut';
import { ComplaintsByCategoryChart } from '../components/ComplaintsByCategoryChart';
import { ComplaintsByPriorityDonut } from '../components/ComplaintsByPriorityDonut';
import { RecentMaintenanceComplaintsTable } from '../components/RecentMaintenanceComplaintsTable';
import { MaintenanceQuickActionsPanel } from '../components/MaintenanceQuickActionsPanel';
import { TopCategoriesTable } from '../components/TopCategoriesTable';
import { SlaPerformanceGauge } from '../components/SlaPerformanceGauge';
import { VendorPerformanceTable } from '../components/VendorPerformanceTable';
import { RaiseComplaintModal } from '../components/RaiseComplaintModal';
import { ComplaintDetailsModal } from '../components/ComplaintDetailsModal';

import { MaintenanceComplaintsRegisterView } from '../components/submodules/MaintenanceComplaintsRegisterView';
import { MaintenanceVendorAssignmentsView } from '../components/submodules/MaintenanceVendorAssignmentsView';
import { MaintenanceBillsView } from '../components/submodules/MaintenanceBillsView';
import { MaintenanceSlaReportView } from '../components/submodules/MaintenanceSlaReportView';
import { Wrench, Calendar } from 'lucide-react';

export const MaintenanceDashboardView = memo(function MaintenanceDashboardView() {
  const { activeSubmodule, setSelectedMaintenanceComplaint } = useApp();

  const [isRaiseModalOpen, setIsRaiseModalOpen] = useState(false);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const [activeComplaintItem, setActiveComplaintItem] = useState(null);

  const handleOpenRaiseModal = useCallback(() => {
    setIsRaiseModalOpen(true);
  }, []);

  const handleCloseRaiseModal = useCallback(() => {
    setIsRaiseModalOpen(false);
  }, []);

  const handleOpenDetailModal = useCallback((item) => {
    setActiveComplaintItem(item);
    setSelectedMaintenanceComplaint(item);
    setIsDetailModalOpen(true);
  }, [setSelectedMaintenanceComplaint]);

  const handleCloseDetailModal = useCallback(() => {
    setIsDetailModalOpen(false);
    setActiveComplaintItem(null);
  }, []);

  return (
    <div className="blueprint-viewer">
      {/* M3 Consolidated Header Banner & Submodule Tabs */}
      <SubmoduleNavHeader
        moduleId="maintenance"
        title="Maintenance Command Center"
        actionButton={
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span className="badge badge-info" style={{ padding: '6px 12px', fontSize: '12px' }}>
              <Calendar size={14} aria-hidden="true" style={{ verticalAlign: 'middle', marginRight: '4px' }} /> 01 Aug 2026 – 31 Aug 2026
            </span>
            <button className="btn btn-primary btn-sm" onClick={handleOpenRaiseModal}>
              <Wrench size={16} aria-hidden="true" /> Raise New Complaint
            </button>
          </div>
        }
      />

      {/* Dynamic Submodule View Routing */}
      {(activeSubmodule === 'Complaints Register' || activeSubmodule === 'Open Complaints' || activeSubmodule === 'Work Completion') && (
        <MaintenanceComplaintsRegisterView onOpenAddModal={handleOpenRaiseModal} onOpenDetails={handleOpenDetailModal} />
      )}
      {(activeSubmodule === 'Vendor Assignments' || activeSubmodule === 'Assign Vendor' || activeSubmodule === 'Service Requests') && (
        <MaintenanceVendorAssignmentsView />
      )}
      {(activeSubmodule === 'Maintenance Bills' || activeSubmodule === 'Billing & Dues') && (
        <MaintenanceBillsView />
      )}
      {(activeSubmodule === 'SLA / TAT Report' || activeSubmodule === 'Maintenance Reports' || activeSubmodule === 'Customer Feedback') && (
        <MaintenanceSlaReportView />
      )}

      {/* Default Dashboard Overview */}
      {(!activeSubmodule || activeSubmodule === 'Maintenance Dashboard' || activeSubmodule === 'Main Overview') && (
        <>
          {/* Row 1: Top-line 5 Maintenance KPI Cards */}
          <MaintenanceKpiGrid />

          {/* Row 2: Analytics & Visualizations Grid (3 Widgets) */}
          <section className="analytics-grid">
            <MaintenanceStatusDonut />
            <ComplaintsByCategoryChart />
            <ComplaintsByPriorityDonut />
          </section>

          {/* Row 3: Recent Complaints Table */}
          <RecentMaintenanceComplaintsTable onOpenAddModal={handleOpenRaiseModal} onSelectComplaint={handleOpenDetailModal} />

          {/* Row 4: 6 Quick Action Launchers */}
          <MaintenanceQuickActionsPanel onOpenAddModal={handleOpenRaiseModal} />

          {/* Row 5: Actionable Operational Panels (3 Widgets) */}
          <section className="analytics-grid">
            <TopCategoriesTable />
            <SlaPerformanceGauge />
            <VendorPerformanceTable />
          </section>
        </>
      )}

      {/* Modals */}
      <RaiseComplaintModal isOpen={isRaiseModalOpen} onClose={handleCloseRaiseModal} />
      <ComplaintDetailsModal isOpen={isDetailModalOpen} onClose={handleCloseDetailModal} complaint={activeComplaintItem} />
    </div>
  );
});

import { useState, memo, useCallback } from 'react';
import { useApp } from '../../context/AppContext';
import { MaintenanceKpiGrid } from './MaintenanceKpiGrid';
import { MaintenanceStatusDonut } from './MaintenanceStatusDonut';
import { ComplaintsByCategoryChart } from './ComplaintsByCategoryChart';
import { ComplaintsByPriorityDonut } from './ComplaintsByPriorityDonut';
import { RecentMaintenanceComplaintsTable } from './RecentMaintenanceComplaintsTable';
import { MaintenanceQuickActionsPanel } from './MaintenanceQuickActionsPanel';
import { TopCategoriesTable } from './TopCategoriesTable';
import { SlaPerformanceGauge } from './SlaPerformanceGauge';
import { VendorPerformanceTable } from './VendorPerformanceTable';
import { RaiseComplaintModal } from './RaiseComplaintModal';
import { ComplaintDetailsModal } from './ComplaintDetailsModal';
import { Wrench, Calendar } from 'lucide-react';

export const MaintenanceDashboardView = memo(function MaintenanceDashboardView() {
  const { setSelectedMaintenanceComplaint } = useApp();

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
      {/* Header Banner */}
      <div className="anodized-panel" style={{ padding: '1.25rem 1.5rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div>
            <div className="breadcrumb" style={{ fontSize: '0.725rem', marginBottom: '2px' }}>
              <span>Maintenance & Facilities</span> &gt; <span>Maintenance Dashboard</span>
            </div>
            <h2 style={{ fontSize: '1.3rem', fontWeight: 800 }}>Maintenance Command Center</h2>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <div className="badge badge-info mono-data" style={{ padding: '6px 10px', fontSize: '0.725rem', display: 'flex', alignItems: 'center', gap: '4px' }}>
              <Calendar size={13} aria-hidden="true" /> 01 Aug 2026 – 31 Aug 2026
            </div>
            <button
              className="btn btn-primary btn-sm"
              onClick={handleOpenRaiseModal}
            >
              <Wrench size={14} aria-hidden="true" /> RAISE NEW COMPLAINT
            </button>
          </div>
        </div>
      </div>

      {/* Row 1: Top-line 5 Maintenance KPI Cards */}
      <MaintenanceKpiGrid />

      {/* Row 2: Analytics & Visualizations Grid (3 Widgets) */}
      <section className="analytics-grid">
        <MaintenanceStatusDonut />
        <ComplaintsByCategoryChart />
        <ComplaintsByPriorityDonut />
      </section>

      {/* Row 3: Recent Complaints Table */}
      <RecentMaintenanceComplaintsTable
        onOpenAddModal={handleOpenRaiseModal}
        onSelectComplaint={handleOpenDetailModal}
      />

      {/* Row 4: 6 Quick Action Launchers */}
      <MaintenanceQuickActionsPanel onOpenAddModal={handleOpenRaiseModal} />

      {/* Row 5: Actionable Operational Panels (3 Widgets) */}
      <section className="analytics-grid">
        <TopCategoriesTable />
        <SlaPerformanceGauge />
        <VendorPerformanceTable />
      </section>

      {/* Modals */}
      <RaiseComplaintModal
        isOpen={isRaiseModalOpen}
        onClose={handleCloseRaiseModal}
      />

      <ComplaintDetailsModal
        isOpen={isDetailModalOpen}
        onClose={handleCloseDetailModal}
        complaint={activeComplaintItem}
      />
    </div>
  );
});

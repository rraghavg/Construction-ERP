import { useState, memo, useCallback } from 'react';
import { useApp } from '../../context/AppContext';
import { RentalKpiGrid } from './RentalKpiGrid';
import { OccupancyDonutChart } from './OccupancyDonutChart';
import { RentCollectionTrendChart } from './RentCollectionTrendChart';
import { RentCollectionStatusDonut } from './RentCollectionStatusDonut';
import { RecentRentCollectionsTable } from './RecentRentCollectionsTable';
import { RentalSectionTiles } from './RentalSectionTiles';
import { UpcomingRenewalsPanel } from './UpcomingRenewalsPanel';
import { VacantUnitsPanel } from './VacantUnitsPanel';
import { RecordRentCollectionModal } from './RecordRentCollectionModal';
import { RentalAgreementDetailsModal } from './RentalAgreementDetailsModal';
import { Receipt, Calendar } from 'lucide-react';

export const RentalDashboardView = memo(function RentalDashboardView() {
  const { allocateTenantToUnit, setSelectedRentCollection } = useApp();

  const [isAddCollectionModalOpen, setIsAddCollectionModalOpen] = useState(false);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const [activeCollectionItem, setActiveCollectionItem] = useState(null);

  const handleOpenAddModal = useCallback(() => {
    setIsAddCollectionModalOpen(true);
  }, []);

  const handleCloseAddModal = useCallback(() => {
    setIsAddCollectionModalOpen(false);
  }, []);

  const handleOpenDetailModal = useCallback((item) => {
    setActiveCollectionItem(item);
    setSelectedRentCollection(item);
    setIsDetailModalOpen(true);
  }, [setSelectedRentCollection]);

  const handleCloseDetailModal = useCallback(() => {
    setIsDetailModalOpen(false);
    setActiveCollectionItem(null);
  }, []);

  const handleAllocateUnit = useCallback((unit) => {
    allocateTenantToUnit(unit.id, 'New Tenant Allocation');
  }, [allocateTenantToUnit]);

  return (
    <div className="blueprint-viewer">
      {/* Header Banner */}
      <div className="anodized-panel" style={{ padding: '1.25rem 1.5rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div>
            <div className="breadcrumb" style={{ fontSize: '0.725rem', marginBottom: '2px' }}>
              <span>Rental Management</span> &gt; <span>Rental Dashboard</span>
            </div>
            <h2 style={{ fontSize: '1.3rem', fontWeight: 800 }}>Rental Command & Occupancy Center</h2>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <div className="badge badge-info mono-data" style={{ padding: '6px 10px', fontSize: '0.725rem', display: 'flex', alignItems: 'center', gap: '4px' }}>
              <Calendar size={13} aria-hidden="true" /> 01 Aug 2026 – 31 Aug 2026
            </div>
            <button
              className="btn btn-primary btn-sm"
              onClick={handleOpenAddModal}
            >
              <Receipt size={14} aria-hidden="true" /> RECORD RENT COLLECTION
            </button>
          </div>
        </div>
      </div>

      {/* Row 1: Top-line 6 Rental KPI Cards */}
      <RentalKpiGrid />

      {/* Row 2: Analytics & Visualizations Grid (3 Widgets) */}
      <section className="analytics-grid">
        <OccupancyDonutChart />
        <RentCollectionTrendChart />
        <RentCollectionStatusDonut />
      </section>

      {/* Row 3: Recent Rent Collections Table */}
      <RecentRentCollectionsTable
        onOpenAddModal={handleOpenAddModal}
        onSelectCollection={handleOpenDetailModal}
      />

      {/* Row 4: 9 Quick-Access Launcher Tiles */}
      <RentalSectionTiles />

      {/* Row 5: Actionable Operational Panels */}
      <section className="analytics-grid-2">
        <UpcomingRenewalsPanel />
        <VacantUnitsPanel onAllocateUnit={handleAllocateUnit} />
      </section>

      {/* Modals */}
      <RecordRentCollectionModal
        isOpen={isAddCollectionModalOpen}
        onClose={handleCloseAddModal}
      />

      <RentalAgreementDetailsModal
        isOpen={isDetailModalOpen}
        onClose={handleCloseDetailModal}
        collection={activeCollectionItem}
      />
    </div>
  );
});

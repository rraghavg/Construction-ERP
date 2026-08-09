import { useState, memo, useCallback } from 'react';
import { useApp } from '../../../core/providers/AppContext';
import { SubmoduleNavHeader } from '../../../shared/components/SubmoduleNavHeader';

import { RentalKpiGrid } from '../components/RentalKpiGrid';
import { OccupancyDonutChart } from '../components/OccupancyDonutChart';
import { RentCollectionTrendChart } from '../components/RentCollectionTrendChart';
import { RentCollectionStatusDonut } from '../components/RentCollectionStatusDonut';
import { RecentRentCollectionsTable } from '../components/RecentRentCollectionsTable';
import { RentalSectionTiles } from '../components/RentalSectionTiles';
import { UpcomingRenewalsPanel } from '../components/UpcomingRenewalsPanel';
import { VacantUnitsPanel } from '../components/VacantUnitsPanel';
import { RecordRentCollectionModal } from '../components/RecordRentCollectionModal';
import { RentalAgreementDetailsModal } from '../components/RentalAgreementDetailsModal';

import { RentalOwnersDirectoryView } from '../components/submodules/RentalOwnersDirectoryView';
import { RentalProgramEnrollmentsView } from '../components/submodules/RentalProgramEnrollmentsView';
import { RentalTenantAllocationView } from '../components/submodules/RentalTenantAllocationView';
import { RentalAgreementsView } from '../components/submodules/RentalAgreementsView';
import { RentalRentCollectionLedgerView } from '../components/submodules/RentalRentCollectionLedgerView';
import { RentalSecurityDepositsView } from '../components/submodules/RentalSecurityDepositsView';
import { RentalOwnerSettlementView } from '../components/submodules/RentalOwnerSettlementView';
import { RentalLeaseRenewalsView } from '../components/submodules/RentalLeaseRenewalsView';
import { RentalVacanciesCatalogView } from '../components/submodules/RentalVacanciesCatalogView';
import { Receipt, Calendar } from 'lucide-react';

export const RentalDashboardView = memo(function RentalDashboardView() {
  const { activeSubmodule, allocateTenantToUnit, setSelectedRentCollection } = useApp();

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
      {/* M3 Consolidated Header Banner & Submodule Tabs */}
      <SubmoduleNavHeader
        moduleId="rental-mgmt"
        title="Rental Command & Occupancy Center"
        actionButton={
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span className="badge badge-info" style={{ padding: '6px 12px', fontSize: '12px' }}>
              <Calendar size={14} aria-hidden="true" style={{ verticalAlign: 'middle', marginRight: '4px' }} /> 01 Aug 2026 – 31 Aug 2026
            </span>
            <button className="btn btn-primary btn-sm" onClick={handleOpenAddModal}>
              <Receipt size={16} aria-hidden="true" /> Record Rent Collection
            </button>
          </div>
        }
      />

      {/* Dynamic Submodule View Routing */}
      {(activeSubmodule === 'Owners Directory' || activeSubmodule === 'Owners') && (
        <RentalOwnersDirectoryView />
      )}
      {(activeSubmodule === 'Program Enrollments' || activeSubmodule === 'Enrollments') && (
        <RentalProgramEnrollmentsView />
      )}
      {(activeSubmodule === 'Tenant Allocation' || activeSubmodule === 'Tenants') && (
        <RentalTenantAllocationView />
      )}
      {(activeSubmodule === 'Rental Agreements' || activeSubmodule === 'Agreements') && (
        <RentalAgreementsView />
      )}
      {(activeSubmodule === 'Rent Collection' || activeSubmodule === 'Rent Collections' || activeSubmodule === 'Rental Reports') && (
        <RentalRentCollectionLedgerView />
      )}
      {activeSubmodule === 'Security Deposits' && (
        <RentalSecurityDepositsView />
      )}
      {(activeSubmodule === 'Owner Settlement' || activeSubmodule === 'Owner Payouts') && (
        <RentalOwnerSettlementView />
      )}
      {(activeSubmodule === 'Lease Renewals' || activeSubmodule === 'Renewals') && (
        <RentalLeaseRenewalsView />
      )}
      {(activeSubmodule === 'Vacancies Catalog' || activeSubmodule === 'Vacant Units') && (
        <RentalVacanciesCatalogView />
      )}

      {/* Default Dashboard Overview */}
      {(!activeSubmodule || activeSubmodule === 'Rental Dashboard' || activeSubmodule === 'Main Overview') && (
        <>
          {/* Row 1: Top-line 6 Rental KPI Cards */}
          <RentalKpiGrid />

          {/* Row 2: Analytics & Visualizations Grid (3 Widgets) */}
          <section className="analytics-grid">
            <OccupancyDonutChart />
            <RentCollectionTrendChart />
            <RentCollectionStatusDonut />
          </section>

          {/* Row 3: Recent Rent Collections Table */}
          <RecentRentCollectionsTable onOpenAddModal={handleOpenAddModal} onSelectCollection={handleOpenDetailModal} />

          {/* Row 4: 9 Quick-Access Launcher Tiles */}
          <RentalSectionTiles />

          {/* Row 5: Actionable Operational Panels */}
          <section className="analytics-grid-2">
            <UpcomingRenewalsPanel />
            <VacantUnitsPanel onAllocateUnit={handleAllocateUnit} />
          </section>
        </>
      )}

      {/* Modals */}
      <RecordRentCollectionModal isOpen={isAddCollectionModalOpen} onClose={handleCloseAddModal} />
      <RentalAgreementDetailsModal isOpen={isDetailModalOpen} onClose={handleCloseDetailModal} collection={activeCollectionItem} />
    </div>
  );
});

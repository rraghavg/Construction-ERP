import { useState, memo, useCallback } from 'react';
import { useApp } from '../../../core/providers/AppContext';
import { SubmoduleNavHeader } from '../../../shared/components/SubmoduleNavHeader';

import { SalesKpiGrid } from '../components/SalesKpiGrid';
import { SalesTrendChart } from '../components/SalesTrendChart';
import { BookingsByProjectChart } from '../components/BookingsByProjectChart';
import { CollectionVsOutstandingChart } from '../components/CollectionVsOutstandingChart';
import { RecentBookingsTable } from '../components/RecentBookingsTable';
import { SalesSectionTiles } from '../components/SalesSectionTiles';
import { UpcomingInstallmentsPanel } from '../components/UpcomingInstallmentsPanel';
import { RecentReceiptsPanel } from '../components/RecentReceiptsPanel';
import { OverdueInstallmentsPanel } from '../components/OverdueInstallmentsPanel';
import { AddBookingModal } from '../components/AddBookingModal';
import { BookingDetailsModal } from '../components/BookingDetailsModal';
import { SendDemandLetterModal } from '../components/SendDemandLetterModal';

import { SalesBookingsListView } from '../components/submodules/SalesBookingsListView';
import { SalesAgreementsView } from '../components/submodules/SalesAgreementsView';
import { SalesPaymentPlansView } from '../components/submodules/SalesPaymentPlansView';
import { SalesInstallmentsView } from '../components/submodules/SalesInstallmentsView';
import { SalesReceiptsView } from '../components/submodules/SalesReceiptsView';
import { SalesDemandLettersView } from '../components/submodules/SalesDemandLettersView';
import { SalesPossessionView } from '../components/submodules/SalesPossessionView';
import { SalesCancellationRefundView } from '../components/submodules/SalesCancellationRefundView';
import { CrmSalesPipelineKanbanView } from '../../crm/components/submodules/CrmSalesPipelineKanbanView';
import { CrmSalesTargetsView } from '../../crm/components/submodules/CrmSalesTargetsView';
import { Plus } from 'lucide-react';

export const SalesDashboardView = memo(function SalesDashboardView() {
  const { activeSubmodule } = useApp();
  const [isAddBookingModalOpen, setIsAddBookingModalOpen] = useState(false);
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);
  const [isDemandModalOpen, setIsDemandModalOpen] = useState(false);

  const [selectedBookingItem, setSelectedBookingItem] = useState(null);
  const [selectedOverdueItem, setSelectedOverdueItem] = useState(null);

  const handleOpenAddModal = useCallback(() => {
    setIsAddBookingModalOpen(true);
  }, []);

  const handleCloseAddModal = useCallback(() => {
    setIsAddBookingModalOpen(false);
  }, []);

  const handleOpenBookingDetails = useCallback((booking) => {
    setSelectedBookingItem(booking);
    setIsDetailsModalOpen(true);
  }, []);

  const handleCloseBookingDetails = useCallback(() => {
    setIsDetailsModalOpen(false);
    setSelectedBookingItem(null);
  }, []);

  const handleOpenDemandModal = useCallback((overdueItem) => {
    setSelectedOverdueItem(overdueItem);
    setIsDemandModalOpen(true);
  }, []);

  const handleCloseDemandModal = useCallback(() => {
    setIsDemandModalOpen(false);
    setSelectedOverdueItem(null);
  }, []);

  return (
    <div className="blueprint-viewer">
      {/* M3 Consolidated Header Banner & Submodule Tabs */}
      <SubmoduleNavHeader
        moduleId="sales"
        title="Sales Command Center"
        actionButton={
          <button className="btn btn-primary btn-sm" onClick={handleOpenAddModal}>
            <Plus size={16} aria-hidden="true" /> New Booking Entry
          </button>
        }
      />

      {/* Dynamic Submodule View Routing */}
      {activeSubmodule === 'Bookings' && (
        <SalesBookingsListView onOpenAddModal={handleOpenAddModal} onOpenBookingDetails={handleOpenBookingDetails} />
      )}
      {activeSubmodule === 'Agreements' && (
        <SalesAgreementsView />
      )}
      {activeSubmodule === 'Payment Plans' && (
        <SalesPaymentPlansView />
      )}
      {activeSubmodule === 'Installments' && (
        <SalesInstallmentsView />
      )}
      {activeSubmodule === 'Receipts' && (
        <SalesReceiptsView />
      )}
      {activeSubmodule === 'Demand Letters' && (
        <SalesDemandLettersView onOpenDemandModal={() => handleOpenDemandModal(null)} />
      )}
      {activeSubmodule === 'Possession' && (
        <SalesPossessionView />
      )}
      {(activeSubmodule === 'Cancellation-Refund' || activeSubmodule === 'Cancellation & Refund') && (
        <SalesCancellationRefundView />
      )}
      {activeSubmodule === 'Sales Pipeline' && (
        <CrmSalesPipelineKanbanView />
      )}
      {activeSubmodule === 'Sales Targets' && (
        <CrmSalesTargetsView />
      )}

      {/* Default Dashboard Overview */}
      {(!activeSubmodule || activeSubmodule === 'Sales Dashboard' || activeSubmodule === 'Main Overview') && (
        <>
          {/* Row 1: Top-line 5 Sales KPI Cards */}
          <SalesKpiGrid />

          {/* Row 2: Analytics & Visualizations Grid */}
          <section className="analytics-grid">
            <SalesTrendChart />
            <BookingsByProjectChart />
            <CollectionVsOutstandingChart />
          </section>

          {/* Row 3: Recent Bookings Table */}
          <RecentBookingsTable onOpenAddModal={handleOpenAddModal} onSelectBooking={handleOpenBookingDetails} />

          {/* Row 4: 8 Sales Quick-Access Launcher Tiles */}
          <SalesSectionTiles />

          {/* Row 5: 3 Financial Action Panels */}
          <section className="panels-grid" style={{ gridTemplateColumns: 'repeat(3, 1fr)' }}>
            <UpcomingInstallmentsPanel />
            <RecentReceiptsPanel />
            <OverdueInstallmentsPanel onOpenDemandModal={handleOpenDemandModal} />
          </section>
        </>
      )}

      {/* Modals */}
      <AddBookingModal isOpen={isAddBookingModalOpen} onClose={handleCloseAddModal} />
      <BookingDetailsModal isOpen={isDetailsModalOpen} onClose={handleCloseBookingDetails} booking={selectedBookingItem} />
      <SendDemandLetterModal isOpen={isDemandModalOpen} onClose={handleCloseDemandModal} overdueItem={selectedOverdueItem} />
    </div>
  );
});

import { useState, memo, useCallback } from 'react';
import { SalesKpiGrid } from './SalesKpiGrid';
import { SalesTrendChart } from './SalesTrendChart';
import { BookingsByProjectChart } from './BookingsByProjectChart';
import { CollectionVsOutstandingChart } from './CollectionVsOutstandingChart';
import { RecentBookingsTable } from './RecentBookingsTable';
import { SalesSectionTiles } from './SalesSectionTiles';
import { UpcomingInstallmentsPanel } from './UpcomingInstallmentsPanel';
import { RecentReceiptsPanel } from './RecentReceiptsPanel';
import { OverdueInstallmentsPanel } from './OverdueInstallmentsPanel';
import { AddBookingModal } from './AddBookingModal';
import { BookingDetailsModal } from './BookingDetailsModal';
import { SendDemandLetterModal } from './SendDemandLetterModal';
import { Plus } from 'lucide-react';

export const SalesDashboardView = memo(function SalesDashboardView() {
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
      {/* Header Banner */}
      <div className="anodized-panel" style={{ padding: '1.25rem 1.5rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div>
            <div className="breadcrumb" style={{ fontSize: '0.725rem', marginBottom: '2px' }}>
              <span>Sales Module</span> &gt; <span>Sales Dashboard</span>
            </div>
            <h2 style={{ fontSize: '1.3rem', fontWeight: 800 }}>Sales Command Center</h2>
          </div>

          <button
            className="btn btn-primary btn-sm"
            onClick={handleOpenAddModal}
          >
            <Plus size={14} aria-hidden="true" /> NEW BOOKING ENTRY
          </button>
        </div>
      </div>

      {/* Row 1: Top-line 5 Sales KPI Cards */}
      <SalesKpiGrid />

      {/* Row 2: Analytics & Visualizations Grid */}
      <section className="analytics-grid">
        <SalesTrendChart />
        <BookingsByProjectChart />
        <CollectionVsOutstandingChart />
      </section>

      {/* Row 3: Recent Bookings Table */}
      <RecentBookingsTable
        onOpenAddModal={handleOpenAddModal}
        onSelectBooking={handleOpenBookingDetails}
      />

      {/* Row 4: 8 Sales Quick-Access Launcher Tiles */}
      <SalesSectionTiles />

      {/* Row 5: 3 Financial Action Panels */}
      <section className="panels-grid" style={{ gridTemplateColumns: 'repeat(3, 1fr)' }}>
        <UpcomingInstallmentsPanel />
        <RecentReceiptsPanel />
        <OverdueInstallmentsPanel onOpenDemandModal={handleOpenDemandModal} />
      </section>

      {/* Modals */}
      <AddBookingModal
        isOpen={isAddBookingModalOpen}
        onClose={handleCloseAddModal}
      />
      <BookingDetailsModal
        isOpen={isDetailsModalOpen}
        onClose={handleCloseBookingDetails}
        booking={selectedBookingItem}
      />
      <SendDemandLetterModal
        isOpen={isDemandModalOpen}
        onClose={handleCloseDemandModal}
        overdueItem={selectedOverdueItem}
      />
    </div>
  );
});

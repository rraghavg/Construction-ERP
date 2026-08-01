import { useState, memo, useCallback } from 'react';
import { useApp } from '../../context/AppContext';
import { CustomerKpiGrid } from './CustomerKpiGrid';
import { CustomerOverviewChart } from './CustomerOverviewChart';
import { CustomersByTypeChart } from './CustomersByTypeChart';
import { RecentCustomersTable } from './RecentCustomersTable';
import { CustomerSectionTiles } from './CustomerSectionTiles';
import { TopCitiesWidget } from './TopCitiesWidget';
import { UpcomingKycExpiryPanel } from './UpcomingKycExpiryPanel';
import { AddCustomerModal } from './AddCustomerModal';
import { CustomerDetails360Modal } from './CustomerDetails360Modal';
import { UserPlus } from 'lucide-react';

export const CustomerDashboardView = memo(function CustomerDashboardView() {
  const { customers, setSelectedCustomer } = useApp();

  const [isAddCustomerModalOpen, setIsAddCustomerModalOpen] = useState(false);
  const [is360ModalOpen, setIs360ModalOpen] = useState(false);
  const [activeCustomerItem, setActiveCustomerItem] = useState(null);

  const handleOpenAddModal = useCallback(() => {
    setIsAddCustomerModalOpen(true);
  }, []);

  const handleCloseAddModal = useCallback(() => {
    setIsAddCustomerModalOpen(false);
  }, []);

  const handleOpen360Modal = useCallback((customer) => {
    setActiveCustomerItem(customer);
    setSelectedCustomer(customer);
    setIs360ModalOpen(true);
  }, [setSelectedCustomer]);

  const handleClose360Modal = useCallback(() => {
    setIs360ModalOpen(false);
    setActiveCustomerItem(null);
  }, []);

  const handleSelectCustomerById = useCallback((customerId) => {
    const found = customers.find((c) => c.id === customerId);
    if (found) {
      handleOpen360Modal(found);
    }
  }, [customers, handleOpen360Modal]);

  return (
    <div className="blueprint-viewer">
      {/* Header Banner */}
      <div className="anodized-panel" style={{ padding: '1.25rem 1.5rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div>
            <div className="breadcrumb" style={{ fontSize: '0.725rem', marginBottom: '2px' }}>
              <span>Customer Management</span> &gt; <span>Customer Dashboard</span>
            </div>
            <h2 style={{ fontSize: '1.3rem', fontWeight: 800 }}>Customer 360° Command Center</h2>
          </div>

          <button
            className="btn btn-primary btn-sm"
            onClick={handleOpenAddModal}
          >
            <UserPlus size={14} aria-hidden="true" /> ADD NEW CUSTOMER
          </button>
        </div>
      </div>

      {/* Row 1: Top-line 5 Customer KPI Cards */}
      <CustomerKpiGrid />

      {/* Row 2: Analytics & Visualizations Grid */}
      <section className="analytics-grid-2">
        <CustomerOverviewChart />
        <CustomersByTypeChart />
      </section>

      {/* Row 3: Recent Customers Table */}
      <RecentCustomersTable
        onOpenAddModal={handleOpenAddModal}
        onSelectCustomer={handleOpen360Modal}
      />

      {/* Row 4: 6 Quick-Access Launcher Tiles */}
      <CustomerSectionTiles onOpenAddModal={handleOpenAddModal} />

      {/* Row 5: Actionable Analytics & Expiry Alerts */}
      <section className="analytics-grid-2">
        <TopCitiesWidget />
        <UpcomingKycExpiryPanel onSelectCustomerById={handleSelectCustomerById} />
      </section>

      {/* Modals */}
      <AddCustomerModal
        isOpen={isAddCustomerModalOpen}
        onClose={handleCloseAddModal}
      />

      <CustomerDetails360Modal
        isOpen={is360ModalOpen}
        onClose={handleClose360Modal}
        customer={activeCustomerItem}
      />
    </div>
  );
});

import { useState, memo, useCallback } from 'react';
import { useApp } from '../../../core/providers/AppContext';
import { SubmoduleNavHeader } from '../../../shared/components/SubmoduleNavHeader';

import { CustomerKpiGrid } from '../components/CustomerKpiGrid';
import { CustomerOverviewChart } from '../components/CustomerOverviewChart';
import { CustomersByTypeChart } from '../components/CustomersByTypeChart';
import { RecentCustomersTable } from '../components/RecentCustomersTable';
import { CustomerSectionTiles } from '../components/CustomerSectionTiles';
import { TopCitiesWidget } from '../components/TopCitiesWidget';
import { UpcomingKycExpiryPanel } from '../components/UpcomingKycExpiryPanel';
import { AddCustomerModal } from '../components/AddCustomerModal';
import { CustomerDetails360Modal } from '../components/CustomerDetails360Modal';

import { CustomerDirectoryView } from '../components/submodules/CustomerDirectoryView';
import { CustomerKycDocsView } from '../components/submodules/CustomerKycDocsView';
import { CustomerNomineesView } from '../components/submodules/CustomerNomineesView';
import { CustomerCommHistoryView } from '../components/submodules/CustomerCommHistoryView';
import { CustomerHelpdeskView } from '../components/submodules/CustomerHelpdeskView';
import { CustomerPossessionHandoverView } from '../components/submodules/CustomerPossessionHandoverView';
import { CustomerNocCertificatesView } from '../components/submodules/CustomerNocCertificatesView';
import { UserPlus } from 'lucide-react';

export const CustomerDashboardView = memo(function CustomerDashboardView() {
  const { activeSubmodule, customers, setSelectedCustomer } = useApp();

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
      {/* M3 Consolidated Header Banner & Submodule Tabs */}
      <SubmoduleNavHeader
        moduleId="customer-mgmt"
        title="Customer 360° Command Center"
        actionButton={
          <button className="btn btn-primary btn-sm" onClick={handleOpenAddModal}>
            <UserPlus size={16} aria-hidden="true" /> Add New Customer
          </button>
        }
      />

      {/* Dynamic Submodule View Routing */}
      {activeSubmodule === 'Customers Directory' && (
        <CustomerDirectoryView onOpenAddModal={handleOpenAddModal} onOpenCustomer360={handleOpen360Modal} />
      )}
      {activeSubmodule === 'KYC Documents' && (
        <CustomerKycDocsView />
      )}
      {activeSubmodule === 'Nominees Registry' && (
        <CustomerNomineesView />
      )}
      {(activeSubmodule === 'Communication History' || activeSubmodule === 'Demand Notices') && (
        <CustomerCommHistoryView />
      )}
      {activeSubmodule === 'Customer Helpdesk / Complaints' && (
        <CustomerHelpdeskView />
      )}
      {activeSubmodule === 'Possession & Handover' && (
        <CustomerPossessionHandoverView />
      )}
      {activeSubmodule === 'NOC Certificates' && (
        <CustomerNocCertificatesView />
      )}

      {/* Default Dashboard Overview */}
      {(!activeSubmodule || activeSubmodule === 'Customer Dashboard' || activeSubmodule === 'Main Overview') && (
        <>
          {/* Row 1: Top-line 5 Customer KPI Cards */}
          <CustomerKpiGrid />

          {/* Row 2: Analytics & Visualizations Grid */}
          <section className="analytics-grid-2">
            <CustomerOverviewChart />
            <CustomersByTypeChart />
          </section>

          {/* Row 3: Recent Customers Table */}
          <RecentCustomersTable onOpenAddModal={handleOpenAddModal} onSelectCustomer={handleOpen360Modal} />

          {/* Row 4: 6 Quick-Access Launcher Tiles */}
          <CustomerSectionTiles onOpenAddModal={handleOpenAddModal} />

          {/* Row 5: Actionable Analytics & Expiry Alerts */}
          <section className="analytics-grid-2">
            <TopCitiesWidget />
            <UpcomingKycExpiryPanel onSelectCustomerById={handleSelectCustomerById} />
          </section>
        </>
      )}

      {/* Modals */}
      <AddCustomerModal isOpen={isAddCustomerModalOpen} onClose={handleCloseAddModal} />
      <CustomerDetails360Modal isOpen={is360ModalOpen} onClose={handleClose360Modal} customer={activeCustomerItem} />
    </div>
  );
});

import { useState, memo, useCallback } from 'react';
import { useApp } from '../../../core/providers/AppContext';
import { SubmoduleNavHeader } from '../../../shared/components/SubmoduleNavHeader';

import { InventoryKpiGrid } from '../components/InventoryKpiGrid';
import { StockValueTrendChart } from '../components/StockValueTrendChart';
import { StockByCategoryChart } from '../components/StockByCategoryChart';
import { StockStatusDonut } from '../components/StockStatusDonut';
import { RecentInventoryTransactionsTable } from '../components/RecentInventoryTransactionsTable';
import { LowStockAlertPanel } from '../components/LowStockAlertPanel';
import { TopStockValuePanel } from '../components/TopStockValuePanel';
import { InventoryQuickActionsPanel } from '../components/InventoryQuickActionsPanel';
import { RecordMaterialIssueModal } from '../components/RecordMaterialIssueModal';
import { InventoryItemDetailsModal } from '../components/InventoryItemDetailsModal';

import { InventoryMaterialsCatalogView } from '../components/submodules/InventoryMaterialsCatalogView';
import { InventorySuppliersDirectoryView } from '../components/submodules/InventorySuppliersDirectoryView';
import { InventoryPurchaseOrdersView } from '../components/submodules/InventoryPurchaseOrdersView';
import { InventoryGoodsReceiptView } from '../components/submodules/InventoryGoodsReceiptView';
import { InventoryStockIssueView } from '../components/submodules/InventoryStockIssueView';
import { InventoryStockTransferView } from '../components/submodules/InventoryStockTransferView';
import { InventoryReportsValuationView } from '../components/submodules/InventoryReportsValuationView';
import { Boxes, Calendar } from 'lucide-react';

export const InventoryDashboardView = memo(function InventoryDashboardView() {
  const { activeSubmodule, setSelectedInventoryTxn } = useApp();

  const [isIssueModalOpen, setIsIssueModalOpen] = useState(false);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const [activeTxnItem, setActiveTxnItem] = useState(null);

  const handleOpenIssueModal = useCallback(() => {
    setIsIssueModalOpen(true);
  }, []);

  const handleCloseIssueModal = useCallback(() => {
    setIsIssueModalOpen(false);
  }, []);

  const handleOpenDetailModal = useCallback((item) => {
    setActiveTxnItem(item);
    setSelectedInventoryTxn(item);
    setIsDetailModalOpen(true);
  }, [setSelectedInventoryTxn]);

  const handleCloseDetailModal = useCallback(() => {
    setIsDetailModalOpen(false);
    setActiveTxnItem(null);
  }, []);

  return (
    <div className="blueprint-viewer">
      {/* M3 Consolidated Header Banner & Submodule Tabs */}
      <SubmoduleNavHeader
        moduleId="inventory"
        title="Inventory Command Center"
        actionButton={
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span className="badge badge-info" style={{ padding: '6px 12px', fontSize: '12px' }}>
              <Calendar size={14} aria-hidden="true" style={{ verticalAlign: 'middle', marginRight: '4px' }} /> 01 Aug 2026 – 31 Aug 2026
            </span>
            <button className="btn btn-primary btn-sm" onClick={handleOpenIssueModal}>
              <Boxes size={16} aria-hidden="true" /> Record Material Issue
            </button>
          </div>
        }
      />

      {/* Dynamic Submodule View Routing */}
      {(activeSubmodule === 'Materials Catalog' || activeSubmodule === 'Add Material SKU' || activeSubmodule === 'Material Consumption') && (
        <InventoryMaterialsCatalogView onOpenIssueModal={handleOpenIssueModal} />
      )}
      {(activeSubmodule === 'Suppliers Directory' || activeSubmodule === 'Vendor Directory' || activeSubmodule === 'Add Supplier') && (
        <InventorySuppliersDirectoryView />
      )}
      {(activeSubmodule === 'Purchase Orders' || activeSubmodule === 'Create PO') && (
        <InventoryPurchaseOrdersView />
      )}
      {(activeSubmodule === 'GRN (Goods Receipt)' || activeSubmodule === 'Goods Receipt Notes') && (
        <InventoryGoodsReceiptView />
      )}
      {(activeSubmodule === 'Stock Issue' || activeSubmodule === 'Issue Material' || activeSubmodule === 'Material Requisitions') && (
        <InventoryStockIssueView onOpenIssueModal={handleOpenIssueModal} />
      )}
      {(activeSubmodule === 'Stock Transfer' || activeSubmodule === 'Stock Transfers' || activeSubmodule === 'Stock Adjustment') && (
        <InventoryStockTransferView />
      )}
      {(activeSubmodule === 'Reports & Valuation' || activeSubmodule === 'Inventory Reports' || activeSubmodule === 'Stock Reorder Setup') && (
        <InventoryReportsValuationView />
      )}

      {/* Default Dashboard Overview */}
      {(!activeSubmodule || activeSubmodule === 'Inventory Dashboard' || activeSubmodule === 'Main Overview') && (
        <>
          {/* Row 1: Top-line 6 Inventory KPI Cards */}
          <InventoryKpiGrid />

          {/* Row 2: Analytics & Visualizations Grid (3 Widgets) */}
          <section className="analytics-grid">
            <StockValueTrendChart />
            <StockByCategoryChart />
            <StockStatusDonut />
          </section>

          {/* Row 3: Recent Transactions Feed Table */}
          <RecentInventoryTransactionsTable onOpenAddModal={handleOpenIssueModal} onSelectTxn={handleOpenDetailModal} />

          {/* Row 4: Actionable Low Stock Alert & Top Stock Value Panels (2 Widgets) */}
          <section className="analytics-grid-2">
            <LowStockAlertPanel />
            <TopStockValuePanel />
          </section>

          {/* Row 5: 8 Quick Action Launchers */}
          <InventoryQuickActionsPanel onOpenIssueModal={handleOpenIssueModal} />
        </>
      )}

      {/* Modals */}
      <RecordMaterialIssueModal isOpen={isIssueModalOpen} onClose={handleCloseIssueModal} />
      <InventoryItemDetailsModal isOpen={isDetailModalOpen} onClose={handleCloseDetailModal} transaction={activeTxnItem} />
    </div>
  );
});

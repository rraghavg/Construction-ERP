import { useState, memo, useCallback } from 'react';
import { useApp } from '../../context/AppContext';
import { InventoryKpiGrid } from './InventoryKpiGrid';
import { StockValueTrendChart } from './StockValueTrendChart';
import { StockByCategoryChart } from './StockByCategoryChart';
import { StockStatusDonut } from './StockStatusDonut';
import { RecentInventoryTransactionsTable } from './RecentInventoryTransactionsTable';
import { LowStockAlertPanel } from './LowStockAlertPanel';
import { TopStockValuePanel } from './TopStockValuePanel';
import { InventoryQuickActionsPanel } from './InventoryQuickActionsPanel';
import { RecordMaterialIssueModal } from './RecordMaterialIssueModal';
import { InventoryItemDetailsModal } from './InventoryItemDetailsModal';
import { Boxes, Calendar } from 'lucide-react';

export const InventoryDashboardView = memo(function InventoryDashboardView() {
  const { setSelectedInventoryTxn } = useApp();

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
      {/* Header Banner */}
      <div className="anodized-panel" style={{ padding: '1.25rem 1.5rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div>
            <div className="breadcrumb" style={{ fontSize: '0.725rem', marginBottom: '2px' }}>
              <span>Inventory & Materials</span> &gt; <span>Inventory Dashboard</span>
            </div>
            <h2 style={{ fontSize: '1.3rem', fontWeight: 800 }}>Inventory Command Center</h2>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <div className="badge badge-info mono-data" style={{ padding: '6px 10px', fontSize: '0.725rem', display: 'flex', alignItems: 'center', gap: '4px' }}>
              <Calendar size={13} aria-hidden="true" /> 01 Aug 2026 – 31 Aug 2026
            </div>
            <button
              className="btn btn-primary btn-sm"
              onClick={handleOpenIssueModal}
            >
              <Boxes size={14} aria-hidden="true" /> RECORD MATERIAL ISSUE
            </button>
          </div>
        </div>
      </div>

      {/* Row 1: Top-line 6 Inventory KPI Cards */}
      <InventoryKpiGrid />

      {/* Row 2: Analytics & Visualizations Grid (3 Widgets) */}
      <section className="analytics-grid">
        <StockValueTrendChart />
        <StockByCategoryChart />
        <StockStatusDonut />
      </section>

      {/* Row 3: Recent Transactions Feed Table */}
      <RecentInventoryTransactionsTable
        onOpenAddModal={handleOpenIssueModal}
        onSelectTxn={handleOpenDetailModal}
      />

      {/* Row 4: Actionable Low Stock Alert & Top Stock Value Panels (2 Widgets) */}
      <section className="analytics-grid-2">
        <LowStockAlertPanel />
        <TopStockValuePanel />
      </section>

      {/* Row 5: 8 Quick Action Launchers */}
      <InventoryQuickActionsPanel onOpenIssueModal={handleOpenIssueModal} />

      {/* Modals */}
      <RecordMaterialIssueModal
        isOpen={isIssueModalOpen}
        onClose={handleCloseIssueModal}
      />

      <InventoryItemDetailsModal
        isOpen={isDetailModalOpen}
        onClose={handleCloseDetailModal}
        transaction={activeTxnItem}
      />
    </div>
  );
});

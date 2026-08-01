import { useState, memo, useCallback } from 'react';
import { useApp } from '../../context/AppContext';
import { FinanceKpiGrid } from './FinanceKpiGrid';
import { CashFlowOverviewChart } from './CashFlowOverviewChart';
import { IncomeVsExpenseChart } from './IncomeVsExpenseChart';
import { ExpenseByCategoryChart } from './ExpenseByCategoryChart';
import { RecentFinanceTransactionsTable } from './RecentFinanceTransactionsTable';
import { BankAccountsOverviewPanel } from './BankAccountsOverviewPanel';
import { OutstandingOverviewWidget } from './OutstandingOverviewWidget';
import { FinanceQuickActionsPanel } from './FinanceQuickActionsPanel';
import { RecordIncomeModal } from './RecordIncomeModal';
import { FinanceTransactionDetailsModal } from './FinanceTransactionDetailsModal';
import { TrendingUp, Calendar } from 'lucide-react';

export const FinanceDashboardView = memo(function FinanceDashboardView() {
  const { setSelectedFinanceTxn } = useApp();

  const [isIncomeModalOpen, setIsIncomeModalOpen] = useState(false);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const [activeTxnItem, setActiveTxnItem] = useState(null);

  const handleOpenIncomeModal = useCallback(() => {
    setIsIncomeModalOpen(true);
  }, []);

  const handleCloseIncomeModal = useCallback(() => {
    setIsIncomeModalOpen(false);
  }, []);

  const handleOpenDetailModal = useCallback((item) => {
    setActiveTxnItem(item);
    setSelectedFinanceTxn(item);
    setIsDetailModalOpen(true);
  }, [setSelectedFinanceTxn]);

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
              <span>Finance & Accounts</span> &gt; <span>Finance Dashboard</span>
            </div>
            <h2 style={{ fontSize: '1.3rem', fontWeight: 800 }}>Finance Command Center</h2>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <div className="badge badge-info mono-data" style={{ padding: '6px 10px', fontSize: '0.725rem', display: 'flex', alignItems: 'center', gap: '4px' }}>
              <Calendar size={13} aria-hidden="true" /> 01 Aug 2026 – 31 Aug 2026
            </div>
            <button
              className="btn btn-primary btn-sm"
              onClick={handleOpenIncomeModal}
            >
              <TrendingUp size={14} aria-hidden="true" /> RECORD INCOME
            </button>
          </div>
        </div>
      </div>

      {/* Row 1: Top-line 5 Finance KPI Cards */}
      <FinanceKpiGrid />

      {/* Row 2: Analytics & Visualizations Grid (3 Widgets) */}
      <section className="analytics-grid">
        <CashFlowOverviewChart />
        <IncomeVsExpenseChart />
        <ExpenseByCategoryChart />
      </section>

      {/* Row 3: Recent Financial Transactions Feed Table */}
      <RecentFinanceTransactionsTable
        onOpenAddModal={handleOpenIncomeModal}
        onSelectTxn={handleOpenDetailModal}
      />

      {/* Row 4: Bank Accounts Overview & Outstanding Overview Panels (2 Widgets) */}
      <section className="analytics-grid-2">
        <BankAccountsOverviewPanel />
        <OutstandingOverviewWidget />
      </section>

      {/* Row 5: 8 Quick Action Launchers */}
      <FinanceQuickActionsPanel onOpenIncomeModal={handleOpenIncomeModal} />

      {/* Modals */}
      <RecordIncomeModal
        isOpen={isIncomeModalOpen}
        onClose={handleCloseIncomeModal}
      />

      <FinanceTransactionDetailsModal
        isOpen={isDetailModalOpen}
        onClose={handleCloseDetailModal}
        transaction={activeTxnItem}
      />
    </div>
  );
});

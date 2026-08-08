import { useState, memo, useCallback } from 'react';
import { useApp } from '../../../core/providers/AppContext';
import { SubmoduleNavHeader } from '../../../shared/components/SubmoduleNavHeader';

import { FinanceKpiGrid } from '../components/FinanceKpiGrid';
import { CashFlowOverviewChart } from '../components/CashFlowOverviewChart';
import { IncomeVsExpenseChart } from '../components/IncomeVsExpenseChart';
import { ExpenseByCategoryChart } from '../components/ExpenseByCategoryChart';
import { RecentFinanceTransactionsTable } from '../components/RecentFinanceTransactionsTable';
import { BankAccountsOverviewPanel } from '../components/BankAccountsOverviewPanel';
import { OutstandingOverviewWidget } from '../components/OutstandingOverviewWidget';
import { FinanceQuickActionsPanel } from '../components/FinanceQuickActionsPanel';
import { RecordIncomeModal } from '../components/RecordIncomeModal';
import { FinanceTransactionDetailsModal } from '../components/FinanceTransactionDetailsModal';

import { FinanceChartOfAccountsView } from '../components/submodules/FinanceChartOfAccountsView';
import { FinanceIncomeManagementView } from '../components/submodules/FinanceIncomeManagementView';
import { FinanceExpensesManagementView } from '../components/submodules/FinanceExpensesManagementView';
import { FinanceBankingReconciliationView } from '../components/submodules/FinanceBankingReconciliationView';
import { FinanceBudgetingForecastingView } from '../components/submodules/FinanceBudgetingForecastingView';
import { FinanceTaxesGstTdsView } from '../components/submodules/FinanceTaxesGstTdsView';
import { FinanceFixedAssetsView } from '../components/submodules/FinanceFixedAssetsView';
import { TrendingUp, Calendar } from 'lucide-react';

export const FinanceDashboardView = memo(function FinanceDashboardView() {
  const { activeSubmodule, setSelectedFinanceTxn } = useApp();

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
      {/* M3 Consolidated Header Banner & Submodule Tabs */}
      <SubmoduleNavHeader
        moduleId="finance"
        title="Finance Command Center"
        actionButton={
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span className="badge badge-info" style={{ padding: '6px 12px', fontSize: '12px' }}>
              <Calendar size={14} aria-hidden="true" style={{ verticalAlign: 'middle', marginRight: '4px' }} /> 01 Aug 2026 – 31 Aug 2026
            </span>
            <button className="btn btn-primary btn-sm" onClick={handleOpenIncomeModal}>
              <TrendingUp size={16} aria-hidden="true" /> Record Income
            </button>
          </div>
        }
      />

      {/* Dynamic Submodule View Routing */}
      {activeSubmodule === 'Chart of Accounts' && (
        <FinanceChartOfAccountsView />
      )}
      {(activeSubmodule === 'Income Management' || activeSubmodule === 'Create Invoice') && (
        <FinanceIncomeManagementView onOpenIncomeModal={handleOpenIncomeModal} />
      )}
      {(activeSubmodule === 'Expenses Management' || activeSubmodule === 'Record Expense' || activeSubmodule === 'Make Payment') && (
        <FinanceExpensesManagementView />
      )}
      {(activeSubmodule === 'Banking & Reconciliation' || activeSubmodule === 'Bank Transaction' || activeSubmodule === 'Bank / Cash Transfer') && (
        <FinanceBankingReconciliationView />
      )}
      {(activeSubmodule === 'Budgeting & Forecasting' || activeSubmodule === 'Project Budgeting') && (
        <FinanceBudgetingForecastingView />
      )}
      {activeSubmodule === 'Taxes (GST / TDS)' && (
        <FinanceTaxesGstTdsView />
      )}
      {activeSubmodule === 'Fixed Assets' && (
        <FinanceFixedAssetsView />
      )}

      {/* Default Dashboard Overview */}
      {(!activeSubmodule || activeSubmodule === 'Finance Dashboard' || activeSubmodule === 'Financial Reports' || activeSubmodule === 'Main Overview') && (
        <>
          {/* Row 1: Top-line 5 Finance KPI Cards */}
          <FinanceKpiGrid />

          {/* Row 2: Analytics & Visualizations Grid (3 Widgets) */}
          <section className="analytics-grid">
            <CashFlowOverviewChart />
            <IncomeVsExpenseChart />
            <ExpenseByCategoryChart />
          </section>

          {/* Row 3: Recent Financial Transactions Feed Table */}
          <RecentFinanceTransactionsTable onOpenAddModal={handleOpenIncomeModal} onSelectTxn={handleOpenDetailModal} />

          {/* Row 4: Bank Accounts Overview & Outstanding Overview Panels (2 Widgets) */}
          <section className="analytics-grid-2">
            <BankAccountsOverviewPanel />
            <OutstandingOverviewWidget />
          </section>

          {/* Row 5: 8 Quick Action Launchers */}
          <FinanceQuickActionsPanel onOpenIncomeModal={handleOpenIncomeModal} />
        </>
      )}

      {/* Modals */}
      <RecordIncomeModal isOpen={isIncomeModalOpen} onClose={handleCloseIncomeModal} />
      <FinanceTransactionDetailsModal isOpen={isDetailModalOpen} onClose={handleCloseDetailModal} transaction={activeTxnItem} />
    </div>
  );
});

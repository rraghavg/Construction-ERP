import { lazy, Suspense, memo, useCallback } from 'react';
import { useApp } from '../../../core/providers/AppContext';
import { KpiSummaryGrid } from '../components/KpiSummaryGrid';
import { SalesOverviewChart } from '../components/SalesOverviewChart';
import { CollectionOverviewChart } from '../components/CollectionOverviewChart';
import { TopProjectsWidget } from '../components/TopProjectsWidget';
import { RecentBookingsPanel } from '../components/RecentBookingsPanel';
import { OverduePaymentsPanel } from '../components/OverduePaymentsPanel';
import { PendingTasksPanel } from '../components/PendingTasksPanel';
import { RecentComplaintsPanel } from '../components/RecentComplaintsPanel';
import { WidgetSkeleton } from '../../../shared/components/WidgetSkeleton';
import { ErrorBoundary } from '../../../shared/components/ErrorBoundary';
import '../../../shared/utils/chartSetup';

const CrmDashboardView = lazy(() =>
  import('../../crm/pages/CrmDashboardView').then((m) => ({ default: m.CrmDashboardView }))
);
const SalesDashboardView = lazy(() =>
  import('../../sales/pages/SalesDashboardView').then((m) => ({ default: m.SalesDashboardView }))
);
const MasterDataDashboardView = lazy(() =>
  import('../../master-data/pages/MasterDataDashboardView').then((m) => ({ default: m.MasterDataDashboardView }))
);
const FinanceDashboardView = lazy(() =>
  import('../../finance/pages/FinanceDashboardView').then((m) => ({ default: m.FinanceDashboardView }))
);
const CustomerDashboardView = lazy(() =>
  import('../../customer/pages/CustomerDashboardView').then((m) => ({ default: m.CustomerDashboardView }))
);
const RentalDashboardView = lazy(() =>
  import('../../rental/pages/RentalDashboardView').then((m) => ({ default: m.RentalDashboardView }))
);
const MaintenanceDashboardView = lazy(() =>
  import('../../maintenance/pages/MaintenanceDashboardView').then((m) => ({ default: m.MaintenanceDashboardView }))
);
const InventoryDashboardView = lazy(() =>
  import('../../inventory/pages/InventoryDashboardView').then((m) => ({ default: m.InventoryDashboardView }))
);
const HrDashboardView = lazy(() =>
  import('../../hr/pages/HrDashboardView').then((m) => ({ default: m.HrDashboardView }))
);
const ReportsDashboardView = lazy(() =>
  import('../../reports/pages/ReportsDashboardView').then((m) => ({ default: m.ReportsDashboardView }))
);
const NotificationsCenterView = lazy(() =>
  import('../../notifications/pages/NotificationsCenterView').then((m) => ({ default: m.NotificationsCenterView }))
);
const UserMgmtDashboardView = lazy(() =>
  import('../../user-management/pages/UserMgmtDashboardView').then((m) => ({ default: m.UserMgmtDashboardView }))
);
const SettingsDashboardView = lazy(() =>
  import('../../settings/pages/SettingsDashboardView').then((m) => ({ default: m.SettingsDashboardView }))
);
const AuditDashboardView = lazy(() =>
  import('../../audit/pages/AuditDashboardView').then((m) => ({ default: m.AuditDashboardView }))
);
const ProcurementDashboardView = lazy(() =>
  import('../../procurement/pages/ProcurementDashboardView').then((m) => ({ default: m.ProcurementDashboardView }))
);
const DocMgmtDashboardView = lazy(() =>
  import('../../doc-mgmt/pages/DocMgmtDashboardView').then((m) => ({ default: m.DocMgmtDashboardView }))
);
const ModulePlaceholderView = lazy(() =>
  import('../../../shared/components/ModulePlaceholderView').then((m) => ({ default: m.ModulePlaceholderView }))
);

export const DashboardView = memo(function DashboardView() {
  const { activeModule, activePermissions } = useApp();

  const isWidgetVisible = useCallback((widgetKey) => {
    return activePermissions.visibleWidgets.includes(widgetKey);
  }, [activePermissions.visibleWidgets]);

  const renderModuleView = () => {
    if (activeModule === 'crm') return <CrmDashboardView />;
    if (activeModule === 'sales') return <SalesDashboardView />;
    if (activeModule === 'master-data') return <MasterDataDashboardView />;
    if (activeModule === 'finance') return <FinanceDashboardView />;
    if (activeModule === 'customer-mgmt') return <CustomerDashboardView />;
    if (activeModule === 'rental-mgmt') return <RentalDashboardView />;
    if (activeModule === 'maintenance') return <MaintenanceDashboardView />;
    if (activeModule === 'inventory') return <InventoryDashboardView />;
    if (activeModule === 'hr') return <HrDashboardView />;
    if (activeModule === 'reports') return <ReportsDashboardView />;
    if (activeModule === 'notifications') return <NotificationsCenterView />;
    if (activeModule === 'user-mgmt') return <UserMgmtDashboardView />;
    if (activeModule === 'settings' || activeModule === 'settings-audit') return <SettingsDashboardView />;
    if (activeModule === 'audit-logs') return <AuditDashboardView />;
    if (activeModule === 'procurement') return <ProcurementDashboardView />;
    if (activeModule === 'doc-mgmt') return <DocMgmtDashboardView />;
    if (activeModule !== 'dashboard') return <ModulePlaceholderView />;
    return null;
  };

  if (activeModule !== 'dashboard') {
    return (
      <ErrorBoundary>
        <Suspense fallback={<WidgetSkeleton lines={4} height="300px" />}>
          {renderModuleView()}
        </Suspense>
      </ErrorBoundary>
    );
  }

  return (
    <div className="blueprint-viewer">
      {/* Overview Structural KPI Grid */}
      {isWidgetVisible('kpis') && <KpiSummaryGrid />}

      {/* Row 2: Analytics & Real-Time Visualization Grid */}
      <section className="analytics-grid">
        {isWidgetVisible('salesChart') && <SalesOverviewChart />}
        {isWidgetVisible('collectionChart') && <CollectionOverviewChart />}
        {isWidgetVisible('topProjects') && <TopProjectsWidget />}
      </section>

      {/* Row 3: Actionable Data & Operations Grid */}
      <section className="analytics-grid-2">
        {isWidgetVisible('recentBookings') && <RecentBookingsPanel />}
        {isWidgetVisible('overduePayments') && <OverduePaymentsPanel />}
      </section>

      {/* Row 4: Tasks & Maintenance Operational Feeds */}
      <section className="analytics-grid-2">
        {isWidgetVisible('pendingTasks') && <PendingTasksPanel />}
        {isWidgetVisible('recentComplaints') && <RecentComplaintsPanel />}
      </section>
    </div>
  );
});

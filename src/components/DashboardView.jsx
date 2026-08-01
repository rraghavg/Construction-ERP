import { lazy, Suspense, memo, useCallback } from 'react';
import { useApp } from '../context/AppContext';
import { KpiSummaryGrid } from './KpiSummaryGrid';
import { SalesOverviewChart } from './SalesOverviewChart';
import { CollectionOverviewChart } from './CollectionOverviewChart';
import { TopProjectsWidget } from './TopProjectsWidget';
import { RecentBookingsPanel } from './RecentBookingsPanel';
import { OverduePaymentsPanel } from './OverduePaymentsPanel';
import { PendingTasksPanel } from './PendingTasksPanel';
import { RecentComplaintsPanel } from './RecentComplaintsPanel';
import { WidgetSkeleton } from './shared/WidgetSkeleton';
import '../utils/chartSetup';

const CrmDashboardView = lazy(() =>
  import('./crm/CrmDashboardView').then((m) => ({ default: m.CrmDashboardView }))
);
const SalesDashboardView = lazy(() =>
  import('./sales/SalesDashboardView').then((m) => ({ default: m.SalesDashboardView }))
);
const MasterDataDashboardView = lazy(() =>
  import('./masterdata/MasterDataDashboardView').then((m) => ({ default: m.MasterDataDashboardView }))
);
const FinanceDashboardView = lazy(() =>
  import('./finance/FinanceDashboardView').then((m) => ({ default: m.FinanceDashboardView }))
);
const CustomerDashboardView = lazy(() =>
  import('./customer/CustomerDashboardView').then((m) => ({ default: m.CustomerDashboardView }))
);
const RentalDashboardView = lazy(() =>
  import('./rental/RentalDashboardView').then((m) => ({ default: m.RentalDashboardView }))
);
const MaintenanceDashboardView = lazy(() =>
  import('./maintenance/MaintenanceDashboardView').then((m) => ({ default: m.MaintenanceDashboardView }))
);
const InventoryDashboardView = lazy(() =>
  import('./inventory/InventoryDashboardView').then((m) => ({ default: m.InventoryDashboardView }))
);
const HrDashboardView = lazy(() =>
  import('./hr/HrDashboardView').then((m) => ({ default: m.HrDashboardView }))
);
const ReportsDashboardView = lazy(() =>
  import('./reports/ReportsDashboardView').then((m) => ({ default: m.ReportsDashboardView }))
);
const NotificationsCenterView = lazy(() =>
  import('./notifications/NotificationsCenterView').then((m) => ({ default: m.NotificationsCenterView }))
);
const UserMgmtDashboardView = lazy(() =>
  import('./usermgmt/UserMgmtDashboardView').then((m) => ({ default: m.UserMgmtDashboardView }))
);
const SettingsDashboardView = lazy(() =>
  import('./settings/SettingsDashboardView').then((m) => ({ default: m.SettingsDashboardView }))
);
const AuditDashboardView = lazy(() =>
  import('./audit/AuditDashboardView').then((m) => ({ default: m.AuditDashboardView }))
);
const ModulePlaceholderView = lazy(() =>
  import('./ModulePlaceholderView').then((m) => ({ default: m.ModulePlaceholderView }))
);

export const DashboardView = memo(function DashboardView() {
  const { activeModule, activePermissions } = useApp();

  const isWidgetVisible = useCallback((widgetKey) => {
    return activePermissions.visibleWidgets.includes(widgetKey);
  }, [activePermissions.visibleWidgets]);

  if (activeModule === 'crm') {
    return (
      <Suspense fallback={<WidgetSkeleton lines={4} height="300px" />}>
        <CrmDashboardView />
      </Suspense>
    );
  }

  if (activeModule === 'sales') {
    return (
      <Suspense fallback={<WidgetSkeleton lines={4} height="300px" />}>
        <SalesDashboardView />
      </Suspense>
    );
  }

  if (activeModule === 'master-data') {
    return (
      <Suspense fallback={<WidgetSkeleton lines={4} height="300px" />}>
        <MasterDataDashboardView />
      </Suspense>
    );
  }

  if (activeModule === 'finance') {
    return (
      <Suspense fallback={<WidgetSkeleton lines={4} height="300px" />}>
        <FinanceDashboardView />
      </Suspense>
    );
  }

  if (activeModule === 'customer-mgmt') {
    return (
      <Suspense fallback={<WidgetSkeleton lines={4} height="300px" />}>
        <CustomerDashboardView />
      </Suspense>
    );
  }

  if (activeModule === 'rental-mgmt') {
    return (
      <Suspense fallback={<WidgetSkeleton lines={4} height="300px" />}>
        <RentalDashboardView />
      </Suspense>
    );
  }

  if (activeModule === 'maintenance') {
    return (
      <Suspense fallback={<WidgetSkeleton lines={4} height="300px" />}>
        <MaintenanceDashboardView />
      </Suspense>
    );
  }

  if (activeModule === 'inventory') {
    return (
      <Suspense fallback={<WidgetSkeleton lines={4} height="300px" />}>
        <InventoryDashboardView />
      </Suspense>
    );
  }

  if (activeModule === 'hr') {
    return (
      <Suspense fallback={<WidgetSkeleton lines={4} height="300px" />}>
        <HrDashboardView />
      </Suspense>
    );
  }

  if (activeModule === 'reports') {
    return (
      <Suspense fallback={<WidgetSkeleton lines={4} height="300px" />}>
        <ReportsDashboardView />
      </Suspense>
    );
  }

  if (activeModule === 'notifications') {
    return (
      <Suspense fallback={<WidgetSkeleton lines={4} height="300px" />}>
        <NotificationsCenterView />
      </Suspense>
    );
  }

  if (activeModule === 'user-mgmt') {
    return (
      <Suspense fallback={<WidgetSkeleton lines={4} height="300px" />}>
        <UserMgmtDashboardView />
      </Suspense>
    );
  }

  if (activeModule === 'settings' || activeModule === 'settings-audit') {
    return (
      <Suspense fallback={<WidgetSkeleton lines={4} height="300px" />}>
        <SettingsDashboardView />
      </Suspense>
    );
  }

  if (activeModule === 'audit-logs') {
    return (
      <Suspense fallback={<WidgetSkeleton lines={4} height="300px" />}>
        <AuditDashboardView />
      </Suspense>
    );
  }

  if (activeModule !== 'dashboard') {
    return (
      <Suspense fallback={<WidgetSkeleton lines={2} height="200px" />}>
        <ModulePlaceholderView />
      </Suspense>
    );
  }

  return (
    <div className="blueprint-viewer">
      {/* Row 1: KPI Summary Cards (6 Cards) */}
      {isWidgetVisible('kpi') && <KpiSummaryGrid />}

      {/* Row 2: Analytics & Ranking Widgets */}
      <section className="analytics-grid">
        {isWidgetVisible('salesChart') && <SalesOverviewChart />}
        {isWidgetVisible('collectionChart') && <CollectionOverviewChart />}
        {isWidgetVisible('topProjects') && <TopProjectsWidget />}
      </section>

      {/* Row 3: Action Panels Grid (4 Panels) */}
      <section className="panels-grid">
        {isWidgetVisible('bookings') && <RecentBookingsPanel />}
        {isWidgetVisible('overdue') && <OverduePaymentsPanel />}
        {isWidgetVisible('tasks') && <PendingTasksPanel />}
        {isWidgetVisible('complaints') && <RecentComplaintsPanel />}
      </section>
    </div>
  );
});

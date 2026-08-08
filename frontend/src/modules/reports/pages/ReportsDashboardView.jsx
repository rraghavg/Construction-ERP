import { useState, memo, useCallback } from 'react';
import { useApp } from '../../../core/providers/AppContext';
import { SubmoduleNavHeader } from '../../../shared/components/SubmoduleNavHeader';

import { ReportsKpiGrid } from '../components/ReportsKpiGrid';
import { RevenueTrendChart } from '../components/RevenueTrendChart';
import { SalesByProjectDonut } from '../components/SalesByProjectDonut';
import { ReceivablesAgingDonut } from '../components/ReceivablesAgingDonut';
import { PopularReportsPanel } from '../components/PopularReportsPanel';
import { RecentGeneratedReportsTable } from '../components/RecentGeneratedReportsTable';
import { CustomReportBuilderBanner } from '../components/CustomReportBuilderBanner';
import { CustomReportBuilderModal } from '../components/CustomReportBuilderModal';
import { ReportPreviewModal } from '../components/ReportPreviewModal';

import { ReportsCategorizedHubView } from '../components/submodules/ReportsCategorizedHubView';
import { ReportsScheduledQueueView } from '../components/submodules/ReportsScheduledQueueView';
import { BarChart3, Calendar, Filter } from 'lucide-react';

export const ReportsDashboardView = memo(function ReportsDashboardView() {
  const { activeSubmodule, setSelectedReport } = useApp();

  const [isCustomModalOpen, setIsCustomModalOpen] = useState(false);
  const [isPreviewModalOpen, setIsPreviewModalOpen] = useState(false);
  const [activeReportItem, setActiveReportItem] = useState(null);

  const handleOpenCustomModal = useCallback(() => {
    setIsCustomModalOpen(true);
  }, []);

  const handleCloseCustomModal = useCallback(() => {
    setIsCustomModalOpen(false);
  }, []);

  const handleOpenPreviewModal = useCallback((item) => {
    setActiveReportItem(item);
    setSelectedReport(item);
    setIsPreviewModalOpen(true);
  }, [setSelectedReport]);

  const handleClosePreviewModal = useCallback(() => {
    setIsPreviewModalOpen(false);
    setActiveReportItem(null);
  }, []);

  return (
    <div className="blueprint-viewer">
      {/* Header Banner */}
      <div className="anodized-panel" style={{ padding: '1.25rem 1.5rem', marginBottom: '1rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div>
            <div className="breadcrumb" style={{ fontSize: '0.725rem', marginBottom: '2px' }}>
              <span>Reports & Analytics</span> &gt; <span>{activeSubmodule || 'Reports Dashboard'}</span>
            </div>
            <h2 style={{ fontSize: '1.3rem', fontWeight: 800 }}>Business Intelligence & Reports Center</h2>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <div className="badge badge-info mono-data" style={{ padding: '6px 10px', fontSize: '0.725rem', display: 'flex', alignItems: 'center', gap: '4px' }}>
              <Calendar size={13} aria-hidden="true" /> 01 Aug 2026 – 31 Aug 2026
            </div>
            <button className="btn btn-primary btn-sm" onClick={handleOpenCustomModal}>
              <BarChart3 size={14} aria-hidden="true" /> BUILD CUSTOM REPORT
            </button>
          </div>
        </div>
      </div>

      {/* Submodule Tab Bar */}
      <SubmoduleNavHeader moduleId="reports" title="Reports Submodules" />

      {/* Dynamic Submodule View Routing */}
      {activeSubmodule === 'Sales Reports' && (
        <ReportsCategorizedHubView categoryTitle="Sales & Revenue" />
      )}
      {activeSubmodule === 'Finance Reports' && (
        <ReportsCategorizedHubView categoryTitle="Finance & Ledger" />
      )}
      {activeSubmodule === 'Inventory Reports' && (
        <ReportsCategorizedHubView categoryTitle="Inventory & Stock Valuation" />
      )}
      {activeSubmodule === 'Customer Reports' && (
        <ReportsCategorizedHubView categoryTitle="Customer Demographics & KYC" />
      )}
      {activeSubmodule === 'Rental Reports' && (
        <ReportsCategorizedHubView categoryTitle="Rental & Occupancy" />
      )}
      {activeSubmodule === 'Maintenance Reports' && (
        <ReportsCategorizedHubView categoryTitle="Maintenance & SLA Performance" />
      )}
      {activeSubmodule === 'HR Reports' && (
        <ReportsCategorizedHubView categoryTitle="HR & Payroll Summary" />
      )}
      {activeSubmodule === 'Scheduled Reports' && (
        <ReportsScheduledQueueView />
      )}

      {/* Default Dashboard Overview */}
      {(!activeSubmodule || activeSubmodule === 'Reports Dashboard' || activeSubmodule === 'Custom Report Builder' || activeSubmodule === 'Main Overview') && (
        <>
          {/* Row 1: Top-line 5 Reports KPI Cards */}
          <ReportsKpiGrid />

          {/* Row 2: Analytics & Visualizations Grid (2 Widgets) */}
          <section className="analytics-grid-2">
            <RevenueTrendChart />
            <SalesByProjectDonut />
          </section>

          {/* Row 3: Receivables Aging & Popular Reports Library (2 Widgets) */}
          <section className="analytics-grid-2">
            <ReceivablesAgingDonut />
            <PopularReportsPanel onSelectReport={handleOpenPreviewModal} />
          </section>

          {/* Row 4: Recent Generated Reports Audit Log Table */}
          <RecentGeneratedReportsTable onOpenCustomModal={handleOpenCustomModal} onPreviewReport={handleOpenPreviewModal} />

          {/* Row 5: Custom Report Builder CTA Banner */}
          <CustomReportBuilderBanner onOpenWizard={handleOpenCustomModal} />
        </>
      )}

      {/* Modals */}
      <CustomReportBuilderModal isOpen={isCustomModalOpen} onClose={handleCloseCustomModal} />
      <ReportPreviewModal isOpen={isPreviewModalOpen} onClose={handleClosePreviewModal} report={activeReportItem} />
    </div>
  );
});

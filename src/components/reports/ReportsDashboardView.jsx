import { useState, memo, useCallback } from 'react';
import { useApp } from '../../context/AppContext';
import { ReportsKpiGrid } from './ReportsKpiGrid';
import { RevenueTrendChart } from './RevenueTrendChart';
import { SalesByProjectDonut } from './SalesByProjectDonut';
import { ReceivablesAgingDonut } from './ReceivablesAgingDonut';
import { PopularReportsPanel } from './PopularReportsPanel';
import { RecentGeneratedReportsTable } from './RecentGeneratedReportsTable';
import { CustomReportBuilderBanner } from './CustomReportBuilderBanner';
import { CustomReportBuilderModal } from './CustomReportBuilderModal';
import { ReportPreviewModal } from './ReportPreviewModal';
import { BarChart3, Calendar, Filter } from 'lucide-react';

export const ReportsDashboardView = memo(function ReportsDashboardView() {
  const { setSelectedReport } = useApp();

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
      <div className="anodized-panel" style={{ padding: '1.25rem 1.5rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div>
            <div className="breadcrumb" style={{ fontSize: '0.725rem', marginBottom: '2px' }}>
              <span>Reports & Analytics</span> &gt; <span>Reports Dashboard</span>
            </div>
            <h2 style={{ fontSize: '1.3rem', fontWeight: 800 }}>Business Intelligence & Reports Center</h2>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <div className="badge badge-info mono-data" style={{ padding: '6px 10px', fontSize: '0.725rem', display: 'flex', alignItems: 'center', gap: '4px' }}>
              <Calendar size={13} aria-hidden="true" /> 01 Aug 2026 – 31 Aug 2026
            </div>
            <button
              className="btn btn-secondary btn-sm"
              onClick={handleOpenCustomModal}
              style={{ display: 'flex', alignItems: 'center', gap: '4px' }}
            >
              <Filter size={13} aria-hidden="true" /> FILTERS
            </button>
            <button
              className="btn btn-primary btn-sm"
              onClick={handleOpenCustomModal}
            >
              <BarChart3 size={14} aria-hidden="true" /> BUILD CUSTOM REPORT
            </button>
          </div>
        </div>
      </div>

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
      <RecentGeneratedReportsTable
        onOpenCustomModal={handleOpenCustomModal}
        onPreviewReport={handleOpenPreviewModal}
      />

      {/* Row 5: Custom Report Builder CTA Banner */}
      <CustomReportBuilderBanner onOpenWizard={handleOpenCustomModal} />

      {/* Modals */}
      <CustomReportBuilderModal
        isOpen={isCustomModalOpen}
        onClose={handleCloseCustomModal}
      />

      <ReportPreviewModal
        isOpen={isPreviewModalOpen}
        onClose={handleClosePreviewModal}
        report={activeReportItem}
      />
    </div>
  );
});

import { useState, memo, useCallback } from 'react';
import { useApp } from '../../context/AppContext';
import { AuditKpiGrid } from './AuditKpiGrid';
import { ActivityTrendChart } from './ActivityTrendChart';
import { ActivitiesByModuleDonut } from './ActivitiesByModuleDonut';
import { TopUsersByActivityChart } from './TopUsersByActivityChart';
import { AuditLogsTable } from './AuditLogsTable';
import { AuditReportsPanel } from './AuditReportsPanel';
import { AuditLogDetailsDrawerModal } from './AuditLogDetailsDrawerModal';
import { ScheduleAuditReportModal } from './ScheduleAuditReportModal';
import { SecurityAlertRuleModal } from './SecurityAlertRuleModal';
import { ShieldAlert, Calendar, Download, Bell } from 'lucide-react';

export const AuditDashboardView = memo(function AuditDashboardView() {
  const { exportAuditLogs } = useApp();

  const [activeLogItem, setActiveLogItem] = useState(null);
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);
  const [isScheduleModalOpen, setIsScheduleModalOpen] = useState(false);
  const [isAlertModalOpen, setIsAlertModalOpen] = useState(false);

  const handleSelectLog = useCallback((item) => {
    setActiveLogItem(item);
    setIsDetailsModalOpen(true);
  }, []);

  const handleCloseDetailsModal = useCallback(() => {
    setIsDetailsModalOpen(false);
    setActiveLogItem(null);
  }, []);

  const handleOpenScheduleModal = useCallback(() => {
    setIsScheduleModalOpen(true);
  }, []);

  const handleCloseScheduleModal = useCallback(() => {
    setIsScheduleModalOpen(false);
  }, []);

  const handleOpenAlertModal = useCallback(() => {
    setIsAlertModalOpen(true);
  }, []);

  const handleCloseAlertModal = useCallback(() => {
    setIsAlertModalOpen(false);
  }, []);

  return (
    <div className="blueprint-viewer">
      {/* Header Banner */}
      <div className="anodized-panel" style={{ padding: '1.25rem 1.5rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div>
            <div className="breadcrumb" style={{ fontSize: '0.725rem', marginBottom: '2px' }}>
              <span>Security & Accountability</span> &gt; <span>Audit & Compliance Logs</span>
            </div>
            <h2 style={{ fontSize: '1.3rem', fontWeight: 800 }}>Audit & Compliance Command Center</h2>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <div className="badge badge-info mono-data" style={{ padding: '6px 10px', fontSize: '0.725rem', display: 'flex', alignItems: 'center', gap: '4px' }}>
              <Calendar size={13} aria-hidden="true" /> 01 Aug 2026 – 31 Aug 2026
            </div>
            <button
              className="btn btn-secondary btn-sm"
              onClick={handleOpenAlertModal}
            >
              <Bell size={14} aria-hidden="true" /> SET ALERTS 🔔
            </button>
            <button
              className="btn btn-primary btn-sm"
              onClick={() => exportAuditLogs('xlsx')}
            >
              <Download size={14} aria-hidden="true" /> EXPORT AUDIT LOGS ⬇️
            </button>
          </div>
        </div>
      </div>

      {/* Row 1: 5 Top-line KPI Cards */}
      <AuditKpiGrid />

      {/* Row 2: Analytics Grid (30-day Trend Line, Module Donut, Top Users Bar) */}
      <section className="analytics-grid" style={{ gridTemplateColumns: 'repeat(3, 1fr)' }}>
        <ActivityTrendChart />
        <ActivitiesByModuleDonut />
        <TopUsersByActivityChart />
      </section>

      {/* Row 3: Tabbed Activity Log Table */}
      <section style={{ marginTop: '1.25rem' }}>
        <AuditLogsTable
          onSelectLog={handleSelectLog}
          onOpenExportModal={() => exportAuditLogs('xlsx')}
        />
      </section>

      {/* Row 4/5: Quick Export & Compliance Audit Reports Panel */}
      <section style={{ marginTop: '1.25rem' }}>
        <AuditReportsPanel
          onOpenAlertModal={handleOpenAlertModal}
          onOpenScheduleModal={handleOpenScheduleModal}
        />
      </section>

      {/* Modals */}
      <AuditLogDetailsDrawerModal
        isOpen={isDetailsModalOpen}
        onClose={handleCloseDetailsModal}
        logItem={activeLogItem}
      />

      <ScheduleAuditReportModal
        isOpen={isScheduleModalOpen}
        onClose={handleCloseScheduleModal}
      />

      <SecurityAlertRuleModal
        isOpen={isAlertModalOpen}
        onClose={handleCloseAlertModal}
      />
    </div>
  );
});

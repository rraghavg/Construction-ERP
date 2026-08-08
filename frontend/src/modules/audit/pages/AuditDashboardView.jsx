import { useState, memo, useCallback } from 'react';
import { useApp } from '../../../core/providers/AppContext';
import { SubmoduleNavHeader } from '../../../shared/components/SubmoduleNavHeader';

import { AuditKpiGrid } from '../components/AuditKpiGrid';
import { ActivityTrendChart } from '../components/ActivityTrendChart';
import { ActivitiesByModuleDonut } from '../components/ActivitiesByModuleDonut';
import { TopUsersByActivityChart } from '../components/TopUsersByActivityChart';
import { AuditLogsTable } from '../components/AuditLogsTable';
import { AuditReportsPanel } from '../components/AuditReportsPanel';
import { AuditLogDetailsDrawerModal } from '../components/AuditLogDetailsDrawerModal';
import { ScheduleAuditReportModal } from '../components/ScheduleAuditReportModal';
import { SecurityAlertRuleModal } from '../components/SecurityAlertRuleModal';
import { ShieldAlert, Calendar, Download, Bell } from 'lucide-react';

export const AuditDashboardView = memo(function AuditDashboardView() {
  const { activeSubmodule, exportAuditLogs } = useApp();

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
      {/* M3 Consolidated Header Banner & Submodule Tabs */}
      <SubmoduleNavHeader
        moduleId="audit-logs"
        title="Audit & Compliance Command Center"
        actionButton={
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span className="badge badge-info" style={{ padding: '6px 12px', fontSize: '12px' }}>
              <Calendar size={14} aria-hidden="true" style={{ verticalAlign: 'middle', marginRight: '4px' }} /> 01 Aug 2026 – 31 Aug 2026
            </span>
            <button className="btn btn-secondary btn-sm" onClick={handleOpenAlertModal}>
              <Bell size={16} aria-hidden="true" /> Set Alerts
            </button>
            <button className="btn btn-primary btn-sm" onClick={() => exportAuditLogs('xlsx')}>
              <Download size={16} aria-hidden="true" /> Export Audit Logs
            </button>
          </div>
        }
      />

      {/* Row 1: 5 Top-line KPI Cards */}
      <AuditKpiGrid />

      {/* Row 2: Analytics Grid */}
      <section className="analytics-grid" style={{ gridTemplateColumns: 'repeat(3, 1fr)' }}>
        <ActivityTrendChart />
        <ActivitiesByModuleDonut />
        <TopUsersByActivityChart />
      </section>

      {/* Row 3: Tabbed Activity Log Table */}
      <section style={{ marginTop: '1.25rem' }}>
        <AuditLogsTable onSelectLog={handleSelectLog} onOpenExportModal={() => exportAuditLogs('xlsx')} />
      </section>

      {/* Row 4/5: Quick Export & Compliance Audit Reports Panel */}
      <section style={{ marginTop: '1.25rem' }}>
        <AuditReportsPanel onOpenAlertModal={handleOpenAlertModal} onOpenScheduleModal={handleOpenScheduleModal} />
      </section>

      {/* Modals */}
      <AuditLogDetailsDrawerModal isOpen={isDetailsModalOpen} onClose={handleCloseDetailsModal} logItem={activeLogItem} />
      <ScheduleAuditReportModal isOpen={isScheduleModalOpen} onClose={handleCloseScheduleModal} />
      <SecurityAlertRuleModal isOpen={isAlertModalOpen} onClose={handleCloseAlertModal} />
    </div>
  );
});

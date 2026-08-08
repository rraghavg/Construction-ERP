import { useState, memo, useCallback } from 'react';
import { useApp } from '../../../core/providers/AppContext';
import { SubmoduleNavHeader } from '../../../shared/components/SubmoduleNavHeader';
import { CrmKpiGrid } from '../components/CrmKpiGrid';
import { CrmOverviewChart } from '../components/CrmOverviewChart';
import { CrmLeadsBySourceChart } from '../components/CrmLeadsBySourceChart';
import { RecentLeadsTable } from '../components/RecentLeadsTable';
import { LeadDetailsPanel } from '../components/LeadDetailsPanel';
import { SiteVisitDetailsPanel } from '../components/SiteVisitDetailsPanel';
import { CrmSectionTiles } from '../components/CrmSectionTiles';
import { AddLeadModal } from '../components/AddLeadModal';
import { ScheduleFollowUpModal } from '../components/ScheduleFollowUpModal';

import { CrmLeadsDirectoryView } from '../components/submodules/CrmLeadsDirectoryView';
import { CrmFollowUpsHubView } from '../components/submodules/CrmFollowUpsHubView';
import { CrmSiteVisitsView } from '../components/submodules/CrmSiteVisitsView';
import { CrmCallRecordingView } from '../components/submodules/CrmCallRecordingView';
import { CrmSalesPipelineKanbanView } from '../components/submodules/CrmSalesPipelineKanbanView';
import { CrmSalesTargetsView } from '../components/submodules/CrmSalesTargetsView';
import { CrmCustomerConversionView } from '../components/submodules/CrmCustomerConversionView';
import { Plus } from 'lucide-react';

export const CrmDashboardView = memo(function CrmDashboardView() {
  const { activeSubmodule } = useApp();
  const [isAddLeadModalOpen, setIsAddLeadModalOpen] = useState(false);
  const [isFollowUpModalOpen, setIsFollowUpModalOpen] = useState(false);
  const [followUpTargetLead, setFollowUpTargetLead] = useState(null);

  const handleOpenFollowUp = useCallback((lead) => {
    setFollowUpTargetLead(lead);
    setIsFollowUpModalOpen(true);
  }, []);

  const handleOpenAddModal = useCallback(() => {
    setIsAddLeadModalOpen(true);
  }, []);

  const handleCloseAddModal = useCallback(() => {
    setIsAddLeadModalOpen(false);
  }, []);

  const handleCloseFollowUpModal = useCallback(() => {
    setIsFollowUpModalOpen(false);
    setFollowUpTargetLead(null);
  }, []);

  return (
    <div className="blueprint-viewer">
      {/* M3 Consolidated Header Banner & Submodule Tabs */}
      <SubmoduleNavHeader
        moduleId="crm"
        title="CRM Command Center"
        actionButton={
          <button className="btn btn-primary btn-sm" onClick={handleOpenAddModal}>
            <Plus size={16} aria-hidden="true" /> New Lead Entry
          </button>
        }
      />

      {/* Dynamic Submodule View Routing */}
      {activeSubmodule === 'Leads' && (
        <CrmLeadsDirectoryView onOpenAddModal={handleOpenAddModal} onOpenFollowUp={handleOpenFollowUp} />
      )}
      {activeSubmodule === 'Follow Ups' && (
        <CrmFollowUpsHubView onOpenFollowUp={handleOpenFollowUp} />
      )}
      {activeSubmodule === 'Site Visits' && (
        <CrmSiteVisitsView />
      )}
      {activeSubmodule === 'Call Recording' && (
        <CrmCallRecordingView />
      )}
      {activeSubmodule === 'Sales Pipeline' && (
        <CrmSalesPipelineKanbanView />
      )}
      {activeSubmodule === 'Sales Targets' && (
        <CrmSalesTargetsView />
      )}
      {activeSubmodule === 'Customer Conversion' && (
        <CrmCustomerConversionView />
      )}

      {/* Default Dashboard Overview (when activeSubmodule is 'CRM Dashboard' or 'Main Overview' or null) */}
      {(!activeSubmodule || activeSubmodule === 'CRM Dashboard' || activeSubmodule === 'Main Overview') && (
        <>
          {/* Row 1: Top-line 5 CRM KPI Cards */}
          <CrmKpiGrid />

          {/* Row 2: Analytics & Source Distribution Charts */}
          <section className="analytics-grid-2">
            <CrmOverviewChart />
            <CrmLeadsBySourceChart />
          </section>

          {/* Row 3: Recent Activity Table + Snapshot Panel */}
          <section className="analytics-grid-2">
            <RecentLeadsTable onOpenAddModal={handleOpenAddModal} onOpenFollowUp={handleOpenFollowUp} />
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
              <LeadDetailsPanel onOpenFollowUp={handleOpenFollowUp} onOpenAddModal={handleOpenAddModal} />
              <SiteVisitDetailsPanel onOpenFollowUp={handleOpenFollowUp} />
            </div>
          </section>

          {/* Row 4: 7 CRM Sub-Module Launcher Tiles */}
          <CrmSectionTiles />
        </>
      )}

      {/* Modals */}
      <AddLeadModal isOpen={isAddLeadModalOpen} onClose={handleCloseAddModal} />
      <ScheduleFollowUpModal isOpen={isFollowUpModalOpen} onClose={handleCloseFollowUpModal} lead={followUpTargetLead} />
    </div>
  );
});

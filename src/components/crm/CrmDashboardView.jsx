import { useState, memo, useCallback } from 'react';
import { CrmKpiGrid } from './CrmKpiGrid';
import { CrmOverviewChart } from './CrmOverviewChart';
import { CrmLeadsBySourceChart } from './CrmLeadsBySourceChart';
import { RecentLeadsTable } from './RecentLeadsTable';
import { LeadDetailsPanel } from './LeadDetailsPanel';
import { SiteVisitDetailsPanel } from './SiteVisitDetailsPanel';
import { CrmSectionTiles } from './CrmSectionTiles';
import { AddLeadModal } from './AddLeadModal';
import { ScheduleFollowUpModal } from './ScheduleFollowUpModal';
import { Plus } from 'lucide-react';

export const CrmDashboardView = memo(function CrmDashboardView() {
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
      {/* Header Banner */}
      <div className="anodized-panel" style={{ padding: '1.25rem 1.5rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div>
            <div className="breadcrumb" style={{ fontSize: '0.725rem', marginBottom: '2px' }}>
              <span>CRM Hub</span> &gt; <span>Dashboard Overview</span>
            </div>
            <h2 style={{ fontSize: '1.3rem', fontWeight: 800 }}>CRM Command Center</h2>
          </div>

          <button
            className="btn btn-primary btn-sm"
            onClick={handleOpenAddModal}
          >
            <Plus size={14} aria-hidden="true" /> NEW LEAD ENTRY
          </button>
        </div>
      </div>

      {/* Row 1: Top-line 5 CRM KPI Cards */}
      <CrmKpiGrid />

      {/* Row 2: Analytics & Source Distribution Charts */}
      <section className="analytics-grid-2">
        <CrmOverviewChart />
        <CrmLeadsBySourceChart />
      </section>

      {/* Row 3: Recent Activity Table + Snapshot Panel */}
      <section className="analytics-grid-2">
        <RecentLeadsTable
          onOpenAddModal={handleOpenAddModal}
          onOpenFollowUp={handleOpenFollowUp}
        />
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          <LeadDetailsPanel
            onOpenFollowUp={handleOpenFollowUp}
            onOpenAddModal={handleOpenAddModal}
          />
          <SiteVisitDetailsPanel onOpenFollowUp={handleOpenFollowUp} />
        </div>
      </section>

      {/* Row 4: 7 CRM Sub-Module Launcher Tiles */}
      <CrmSectionTiles />

      {/* Modals */}
      <AddLeadModal
        isOpen={isAddLeadModalOpen}
        onClose={handleCloseAddModal}
      />
      <ScheduleFollowUpModal
        isOpen={isFollowUpModalOpen}
        onClose={handleCloseFollowUpModal}
        lead={followUpTargetLead}
      />
    </div>
  );
});

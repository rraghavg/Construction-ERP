import { useState, memo, useCallback } from 'react';
import { useApp } from '../../context/AppContext';
import { SettingsKpiGrid } from './SettingsKpiGrid';
import { SettingsCategoriesGrid } from './SettingsCategoriesGrid';
import { RecentChangesTable } from './RecentChangesTable';
import { SettingsQuickActionsPanel } from './SettingsQuickActionsPanel';
import { SystemInfoPanel } from './SystemInfoPanel';
import { CategoryEditModal } from './CategoryEditModal';
import { SystemHealthModal } from './SystemHealthModal';
import { ChangeDiffModal } from './ChangeDiffModal';
import { Settings, Calendar, RefreshCw, Activity } from 'lucide-react';

export const SettingsDashboardView = memo(function SettingsDashboardView() {
  const { clearSystemCache, runHealthCheck } = useApp();

  const [activeCategory, setActiveCategory] = useState(null);
  const [activeDiffItem, setActiveDiffItem] = useState(null);
  const [isCategoryModalOpen, setIsCategoryModalOpen] = useState(false);
  const [isHealthModalOpen, setIsHealthModalOpen] = useState(false);
  const [isDiffModalOpen, setIsDiffModalOpen] = useState(false);

  const handleOpenCategoryModal = useCallback((category) => {
    setActiveCategory(category);
    setIsCategoryModalOpen(true);
  }, []);

  const handleCloseCategoryModal = useCallback(() => {
    setIsCategoryModalOpen(false);
    setActiveCategory(null);
  }, []);

  const handleOpenHealthModal = useCallback(() => {
    runHealthCheck();
    setIsHealthModalOpen(true);
  }, [runHealthCheck]);

  const handleCloseHealthModal = useCallback(() => {
    setIsHealthModalOpen(false);
  }, []);

  const handleOpenDiffModal = useCallback((item) => {
    setActiveDiffItem(item);
    setIsDiffModalOpen(true);
  }, []);

  const handleCloseDiffModal = useCallback(() => {
    setIsDiffModalOpen(false);
    setActiveDiffItem(null);
  }, []);

  return (
    <div className="blueprint-viewer">
      {/* Header Banner */}
      <div className="anodized-panel" style={{ padding: '1.25rem 1.5rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div>
            <div className="breadcrumb" style={{ fontSize: '0.725rem', marginBottom: '2px' }}>
              <span>System Configuration</span> &gt; <span>Settings & Audit Logs</span>
            </div>
            <h2 style={{ fontSize: '1.3rem', fontWeight: 800 }}>Global Configuration Control Center</h2>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <div className="badge badge-info mono-data" style={{ padding: '6px 10px', fontSize: '0.725rem', display: 'flex', alignItems: 'center', gap: '4px' }}>
              <Calendar size={13} aria-hidden="true" /> 01 Aug 2026 – 31 Aug 2026
            </div>
            <button
              className="btn btn-secondary btn-sm"
              onClick={clearSystemCache}
            >
              <RefreshCw size={14} aria-hidden="true" /> CLEAR CACHE 🧹
            </button>
            <button
              className="btn btn-primary btn-sm"
              onClick={handleOpenHealthModal}
            >
              <Activity size={14} aria-hidden="true" /> HEALTH CHECK 🩺
            </button>
          </div>
        </div>
      </div>

      {/* Row 1: 5 Top-line KPI Cards */}
      <SettingsKpiGrid />

      {/* Row 2: 9 Category Cards Grid */}
      <section style={{ marginTop: '1.25rem' }}>
        <SettingsCategoriesGrid onOpenCategoryModal={handleOpenCategoryModal} />
      </section>

      {/* Row 3: Recent Change History Table */}
      <section style={{ marginTop: '1.25rem' }}>
        <RecentChangesTable onOpenDiffModal={handleOpenDiffModal} />
      </section>

      {/* Row 4: 5 Quick Action Launchers */}
      <section style={{ marginTop: '1.25rem' }}>
        <SettingsQuickActionsPanel onOpenHealthModal={handleOpenHealthModal} />
      </section>

      {/* Row 5: Read-Only System Info Panel */}
      <section style={{ marginTop: '1.25rem' }}>
        <SystemInfoPanel />
      </section>

      {/* Modals */}
      <CategoryEditModal
        isOpen={isCategoryModalOpen}
        onClose={handleCloseCategoryModal}
        category={activeCategory}
      />

      <SystemHealthModal
        isOpen={isHealthModalOpen}
        onClose={handleCloseHealthModal}
      />

      <ChangeDiffModal
        isOpen={isDiffModalOpen}
        onClose={handleCloseDiffModal}
        changeItem={activeDiffItem}
      />
    </div>
  );
});

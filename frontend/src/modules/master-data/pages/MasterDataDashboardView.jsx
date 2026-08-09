import { useState, useMemo, memo, useCallback } from 'react';
import { useApp } from '../../../core/providers/AppContext';
import { MasterDataKpiHeader } from '../components/MasterDataKpiHeader';
import { MasterDataTileGrid } from '../components/MasterDataTileGrid';
import { MasterCategoryListView } from '../components/MasterCategoryListView';
import { MasterRecordModal } from '../components/MasterRecordModal';
import { MasterRecordDetailModal } from '../components/MasterRecordDetailModal';

export const MasterDataDashboardView = memo(function MasterDataDashboardView() {
  const { activeSubmodule, masterCategories, navigateTo } = useApp();
  const [localCategory, setLocalCategory] = useState(null);
  const [isRecordModalOpen, setIsRecordModalOpen] = useState(false);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const [activeEditRecord, setActiveEditRecord] = useState(null);
  const [activeDetailRecord, setActiveDetailRecord] = useState(null);

  // Sync selected category with sidebar activeSubmodule
  const selectedCategory = useMemo(() => {
    if (!activeSubmodule || activeSubmodule === 'Master Data Dashboard' || activeSubmodule === 'Main Overview') {
      return localCategory;
    }
    const found = masterCategories.find(
      (c) =>
        c.name.toLowerCase() === activeSubmodule.toLowerCase() ||
        c.id.toLowerCase() === activeSubmodule.toLowerCase() ||
        (activeSubmodule === 'Flats / Shops / Offices' && c.id === 'units')
    );
    return found || localCategory;
  }, [activeSubmodule, masterCategories, localCategory]);

  const handleSelectCategory = useCallback((category) => {
    setLocalCategory(category);
    if (category) {
      navigateTo('master-data', category.name);
    }
  }, [navigateTo]);

  const handleBackToTiles = useCallback(() => {
    setLocalCategory(null);
    navigateTo('master-data', 'Master Data Dashboard');
  }, [navigateTo]);

  const handleOpenAddModal = useCallback(() => {
    setActiveEditRecord(null);
    setIsRecordModalOpen(true);
  }, []);

  const handleOpenEditModal = useCallback((record) => {
    setActiveEditRecord(record);
    setIsRecordModalOpen(true);
  }, []);

  const handleCloseRecordModal = useCallback(() => {
    setIsRecordModalOpen(false);
    setActiveEditRecord(null);
  }, []);

  const handleOpenDetailModal = useCallback((record) => {
    setActiveDetailRecord(record);
    setIsDetailModalOpen(true);
  }, []);

  const handleCloseDetailModal = useCallback(() => {
    setIsDetailModalOpen(false);
    setActiveDetailRecord(null);
  }, []);

  return (
    <div className="blueprint-viewer">
      {selectedCategory ? (
        <MasterCategoryListView
          category={selectedCategory}
          onBack={handleBackToTiles}
          onOpenAdd={handleOpenAddModal}
          onOpenEdit={handleOpenEditModal}
          onOpenDetail={handleOpenDetailModal}
        />
      ) : (
        <>
          <MasterDataKpiHeader />
          <MasterDataTileGrid onSelectCategory={handleSelectCategory} />
        </>
      )}

      {/* Modals */}
      <MasterRecordModal
        isOpen={isRecordModalOpen}
        onClose={handleCloseRecordModal}
        category={selectedCategory}
        editRecord={activeEditRecord}
      />

      <MasterRecordDetailModal
        isOpen={isDetailModalOpen}
        onClose={handleCloseDetailModal}
        category={selectedCategory}
        record={activeDetailRecord}
      />
    </div>
  );
});

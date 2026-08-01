import { useState, memo, useCallback } from 'react';
import { MasterDataKpiHeader } from './MasterDataKpiHeader';
import { MasterDataTileGrid } from './MasterDataTileGrid';
import { MasterCategoryListView } from './MasterCategoryListView';
import { MasterRecordModal } from './MasterRecordModal';
import { MasterRecordDetailModal } from './MasterRecordDetailModal';

export const MasterDataDashboardView = memo(function MasterDataDashboardView() {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [isRecordModalOpen, setIsRecordModalOpen] = useState(false);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const [activeEditRecord, setActiveEditRecord] = useState(null);
  const [activeDetailRecord, setActiveDetailRecord] = useState(null);

  const handleSelectCategory = useCallback((category) => {
    setSelectedCategory(category);
  }, []);

  const handleBackToTiles = useCallback(() => {
    setSelectedCategory(null);
  }, []);

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

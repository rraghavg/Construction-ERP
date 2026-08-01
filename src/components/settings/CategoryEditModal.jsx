import { useState, memo, useCallback } from 'react';
import { useApp } from '../../context/AppContext';
import { Sliders } from 'lucide-react';
import { Modal } from '../shared/Modal';

export const CategoryEditModal = memo(function CategoryEditModal({ isOpen, onClose, category }) {
  const { updateSetting, showToast } = useApp();

  const [value1, setValue1] = useState('Enabled');
  const [value2, setValue2] = useState('Asia/Kolkata');

  const handleSave = useCallback((e) => {
    e.preventDefault();
    if (!category) return;

    updateSetting(category.name, 'Primary Rule Baseline', 'Previous Configuration', `${value1} (${value2})`);
    showToast(`Updated ${category.name} configuration`, 'success');
    onClose();
  }, [category, value1, value2, updateSetting, showToast, onClose]);

  if (!category) return null;

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={`Configure Category — ${category.name}`}
      icon={<Sliders size={18} color="var(--precision-blue)" />}
      width="520px"
    >
      <form onSubmit={handleSave}>
        <div className="form-grid">
          <div>
            <label htmlFor="cat-val1" className="form-label">BASELINE RULE STATUS *</label>
            <select
              id="cat-val1"
              value={value1}
              onChange={(e) => setValue1(e.target.value)}
              className="form-input select-input"
            >
              <option value="Enabled">Enabled (Active Baseline)</option>
              <option value="Disabled">Disabled (Strict Override)</option>
              <option value="Inherited">Inherit Org Defaults</option>
            </select>
          </div>

          <div>
            <label htmlFor="cat-val2" className="form-label">TIMEZONE / REGION SCOPE *</label>
            <select
              id="cat-val2"
              value={value2}
              onChange={(e) => setValue2(e.target.value)}
              className="form-input select-input"
            >
              <option value="Asia/Kolkata">Asia/Kolkata (IST)</option>
              <option value="UTC">UTC (Coordinated Universal Time)</option>
              <option value="America/New_York">America/New_York (EST)</option>
            </select>
          </div>

          <div className="form-grid-full" style={{ padding: '0.75rem', background: 'var(--bg-input)', borderRadius: '4px', border: '1px solid var(--border-color)', fontSize: '0.725rem', color: 'var(--text-muted)', lineHeight: 1.4 }}>
            <strong>Note:</strong> Changes to {category.name} are logged to the shared audit change history table and immediately propagated system-wide.
          </div>
        </div>

        <div className="modal-actions" style={{ marginTop: '1.25rem' }}>
          <button type="button" className="btn btn-secondary btn-sm" onClick={onClose}>
            CANCEL
          </button>
          <button type="submit" className="btn btn-primary btn-sm">
            SAVE CATEGORY SETTINGS
          </button>
        </div>
      </form>
    </Modal>
  );
});

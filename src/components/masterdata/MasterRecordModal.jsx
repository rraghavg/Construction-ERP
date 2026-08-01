import { useState, useEffect, memo, useCallback } from 'react';
import { useApp } from '../../context/AppContext';
import { Database } from 'lucide-react';
import { Modal } from '../shared/Modal';

export const MasterRecordModal = memo(function MasterRecordModal({ isOpen, onClose, category, editRecord }) {
  const { addMasterRecord, updateMasterRecord, showToast } = useApp();
  const [formData, setFormData] = useState({});

  useEffect(() => {
    if (editRecord) {
      setFormData({ ...editRecord });
    } else if (category) {
      const initial = {};
      category.fields.forEach((f) => {
        initial[f.key] = f.type === 'select' ? f.options?.[0] || 'Active' : '';
      });
      setFormData(initial);
    }
  }, [category, editRecord, isOpen]);

  const handleChange = useCallback((e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  }, []);

  const handleSubmit = useCallback((e) => {
    e.preventDefault();
    if (!category) return;

    // Validate mandatory fields
    for (const f of category.fields) {
      if (f.required && (!formData[f.key] || !String(formData[f.key]).trim())) {
        showToast(`Please fill out required field: ${f.label}`, 'warning');
        return;
      }
    }

    if (editRecord) {
      updateMasterRecord(category.id, editRecord.id, formData);
    } else {
      addMasterRecord(category.id, formData);
    }
    onClose();
  }, [category, editRecord, formData, addMasterRecord, updateMasterRecord, showToast, onClose]);

  if (!category) return null;

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={editRecord ? `Edit ${category.name} Record` : `Add New ${category.name}`}
      icon={<Database size={18} color="var(--precision-blue)" />}
      width="480px"
    >
      <form onSubmit={handleSubmit}>
        <div className="form-grid">
          {category.fields.map((f) => (
            <div key={f.key} className={f.key === 'name' || f.key === 'description' ? 'form-grid-full' : ''}>
              <label htmlFor={`field-${f.key}`} className="form-label">
                {f.label.toUpperCase()} {f.required && '*'}
              </label>

              {f.type === 'select' ? (
                <select
                  id={`field-${f.key}`}
                  name={f.key}
                  value={formData[f.key] || f.options?.[0] || ''}
                  onChange={handleChange}
                  className="form-input select-input"
                >
                  {f.options?.map((opt) => (
                    <option key={opt} value={opt}>
                      {opt}
                    </option>
                  ))}
                </select>
              ) : (
                <input
                  id={`field-${f.key}`}
                  type={f.type || 'text'}
                  name={f.key}
                  required={f.required}
                  placeholder={`Enter ${f.label.toLowerCase()}...`}
                  value={formData[f.key] || ''}
                  onChange={handleChange}
                  className={`form-input ${f.key === 'code' ? 'mono-data' : ''}`}
                />
              )}
            </div>
          ))}
        </div>

        <div className="modal-actions">
          <button type="button" className="btn btn-secondary btn-sm" onClick={onClose}>
            CANCEL
          </button>
          <button type="submit" className="btn btn-primary btn-sm">
            {editRecord ? 'UPDATE RECORD' : 'SAVE MASTER RECORD'}
          </button>
        </div>
      </form>
    </Modal>
  );
});

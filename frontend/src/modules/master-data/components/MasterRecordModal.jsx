import { useState, useEffect, memo, useCallback } from 'react';
import { useApp } from '../../../core/providers/AppContext';
import { Database, Sparkles } from 'lucide-react';
import { Modal } from '../../../shared/components/Modal';

const PREFIX_MAP = {
  company: 'CMP',
  projects: 'PRJ',
  buildings: 'BLD',
  towers: 'TWR',
  floors: 'FLR',
  units: 'UNT',
  flatTypes: 'FTP',
  vendors: 'VND',
  dealers: 'DLR',
  employees: 'EMP',
  banks: 'BNK',
  tax: 'TAX',
  paymentModes: 'PAY',
  complaintCategories: 'CAT'
};

const generateNextCode = (categoryId, records = []) => {
  const prefix = PREFIX_MAP[categoryId] || categoryId.substring(0, 3).toUpperCase();
  let maxNum = 0;

  records.forEach((rec) => {
    if (rec.code) {
      const matches = rec.code.match(/\d+/g);
      if (matches) {
        matches.forEach((numStr) => {
          const val = parseInt(numStr, 10);
          if (!isNaN(val) && val > maxNum) {
            maxNum = val;
          }
        });
      }
    }
  });

  const nextNum = Math.max(maxNum, records.length) + 1;
  const padded = nextNum.toString().padStart(3, '0');
  return `${prefix}-${padded}`;
};

export const MasterRecordModal = memo(function MasterRecordModal({ isOpen, onClose, category, editRecord }) {
  const { masterRecords, addMasterRecord, updateMasterRecord, showToast } = useApp();
  const [formData, setFormData] = useState({});

  useEffect(() => {
    if (editRecord) {
      setFormData({ ...editRecord });
    } else if (category) {
      const initial = {};
      const categoryRecords = masterRecords[category.id] || [];
      const autoCode = generateNextCode(category.id, categoryRecords);

      category.fields.forEach((f) => {
        if (f.key === 'code') {
          initial['code'] = autoCode;
        } else {
          initial[f.key] = f.type === 'select' ? f.options?.[0] || 'Active' : '';
        }
      });
      setFormData(initial);
    }
  }, [category, editRecord, isOpen, masterRecords]);

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
          {category.fields.map((f) => {
            if (category.id === 'floors') {
              if (f.key === 'buildingId' && formData.parentType !== 'BUILDING') return null;
              if (f.key === 'towerId' && formData.parentType !== 'TOWER') return null;
            }
            return (
              <div key={f.key} className={f.key === 'name' || f.key === 'description' ? 'form-grid-full' : ''}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '4px' }}>
                  <label htmlFor={`field-${f.key}`} className="form-label" style={{ marginBottom: 0 }}>
                    {f.label.toUpperCase()} {f.required && '*'}
                  </label>
                  {f.key === 'code' && !editRecord && (
                    <span className="badge badge-info mono-data" style={{ fontSize: '0.6rem', padding: '1px 6px', display: 'flex', alignItems: 'center', gap: '3px' }}>
                      <Sparkles size={10} aria-hidden="true" /> AUTO-GENERATED
                    </span>
                  )}
                </div>

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
            );
          })}
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

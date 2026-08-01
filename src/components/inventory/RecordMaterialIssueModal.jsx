import { useState, memo, useCallback } from 'react';
import { useApp } from '../../context/AppContext';
import { Send } from 'lucide-react';
import { Modal } from '../shared/Modal';

const INITIAL_ISSUE_FORM = {
  item: 'TMT Steel Bar 12mm (Fe-550)',
  qty: '2',
  unit: 'MT',
  site: 'Green Heights Tower A',
  remarks: 'Requisition for Slab Pouring'
};

export const RecordMaterialIssueModal = memo(function RecordMaterialIssueModal({ isOpen, onClose }) {
  const { recordMaterialIssue } = useApp();
  const [formData, setFormData] = useState(INITIAL_ISSUE_FORM);

  const handleChange = useCallback((e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  }, []);

  const handleSubmit = useCallback((e) => {
    e.preventDefault();
    if (!formData.qty || Number(formData.qty) <= 0) return;

    recordMaterialIssue(formData);
    setFormData(INITIAL_ISSUE_FORM);
    onClose();
  }, [formData, recordMaterialIssue, onClose]);

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Record New Stock Issue Transaction"
      icon={<Send size={18} color="var(--precision-blue)" />}
      width="480px"
    >
      <form onSubmit={handleSubmit}>
        <div className="form-grid">
          {/* Material Item */}
          <div className="form-grid-full">
            <label htmlFor="iss-item" className="form-label">SELECT MATERIAL ITEM *</label>
            <select
              id="iss-item"
              name="item"
              value={formData.item}
              onChange={handleChange}
              className="form-input select-input"
            >
              <option value="TMT Steel Bar 12mm (Fe-550)">TMT Steel Bar 12mm (Fe-550)</option>
              <option value="UltraTech Cement 53 Grade">UltraTech Cement 53 Grade</option>
              <option value="Red Bricks Class-1">Red Bricks Class-1</option>
              <option value="CPVC Water Pipe 1 Inch">CPVC Water Pipe 1 Inch</option>
              <option value="Plywood Waterproof 18mm">Plywood Waterproof 18mm</option>
            </select>
          </div>

          {/* Quantity */}
          <div>
            <label htmlFor="iss-qty" className="form-label">QUANTITY TO ISSUE *</label>
            <input
              id="iss-qty"
              type="number"
              name="qty"
              required
              min="1"
              placeholder="e.g. 5"
              value={formData.qty}
              onChange={handleChange}
              className="form-input mono-data"
            />
          </div>

          {/* Unit */}
          <div>
            <label htmlFor="iss-unit" className="form-label">UNIT OF MEASURE</label>
            <input
              id="iss-unit"
              type="text"
              name="unit"
              value={formData.unit}
              onChange={handleChange}
              className="form-input mono-data"
            />
          </div>

          {/* Target Site / Project */}
          <div className="form-grid-full">
            <label htmlFor="iss-site" className="form-label">TARGET SITE / WAREHOUSE *</label>
            <select
              id="iss-site"
              name="site"
              value={formData.site}
              onChange={handleChange}
              className="form-input select-input"
            >
              <option value="Green Heights Tower A">Green Heights Tower A</option>
              <option value="Prime Residency Site">Prime Residency Site</option>
              <option value="Sunshine Towers Block 2">Sunshine Towers Block 2</option>
              <option value="River View Residency">River View Residency</option>
              <option value="Azure Sky Villa Site">Azure Sky Villa Site</option>
            </select>
          </div>

          {/* Remarks */}
          <div className="form-grid-full">
            <label htmlFor="iss-remarks" className="form-label">REMARKS / WORK ORDER REQUISITION</label>
            <textarea
              id="iss-remarks"
              name="remarks"
              rows={2}
              placeholder="e.g. Work order #402 site requisition..."
              value={formData.remarks}
              onChange={handleChange}
              className="form-input"
              style={{ resize: 'vertical' }}
            />
          </div>
        </div>

        <div className="modal-actions">
          <button type="button" className="btn btn-secondary btn-sm" onClick={onClose}>
            CANCEL
          </button>
          <button type="submit" className="btn btn-primary btn-sm">
            SAVE & DEDUCT FROM STOCK
          </button>
        </div>
      </form>
    </Modal>
  );
});

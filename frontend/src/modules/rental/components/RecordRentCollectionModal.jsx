import { useState, memo, useCallback } from 'react';
import { useApp } from '../../../core/providers/AppContext';
import { Receipt } from 'lucide-react';
import { Modal } from '../../../shared/components/Modal';

const INITIAL_COLLECTION_FORM = {
  tenantName: 'Rajesh Kumar',
  unit: 'Flat 101, Tower A',
  project: 'Green Heights',
  rentMonth: 'August 2026',
  amount: '35000',
  mode: 'NEFT / Direct Escrow',
  remarks: ''
};

export const RecordRentCollectionModal = memo(function RecordRentCollectionModal({ isOpen, onClose }) {
  const { recordRentCollection } = useApp();
  const [formData, setFormData] = useState(INITIAL_COLLECTION_FORM);

  const handleChange = useCallback((e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  }, []);

  const handleSubmit = useCallback((e) => {
    e.preventDefault();
    if (!formData.tenantName.trim()) return;

    recordRentCollection(formData);
    setFormData(INITIAL_COLLECTION_FORM);
    onClose();
  }, [formData, recordRentCollection, onClose]);

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Record Rent Payment Collection"
      icon={<Receipt size={18} color="var(--precision-blue)" />}
      width="480px"
    >
      <form onSubmit={handleSubmit}>
        <div className="form-grid">
          {/* Tenant Name */}
          <div className="form-grid-full">
            <label htmlFor="rnt-tenant" className="form-label">SELECT TENANT / UNIT *</label>
            <input
              id="rnt-tenant"
              type="text"
              name="tenantName"
              required
              placeholder="e.g. Rajesh Kumar"
              value={formData.tenantName}
              onChange={handleChange}
              className="form-input"
            />
          </div>

          {/* Project & Unit */}
          <div>
            <label htmlFor="rnt-project" className="form-label">PROJECT SITE</label>
            <select
              id="rnt-project"
              name="project"
              value={formData.project}
              onChange={handleChange}
              className="form-input select-input"
            >
              <option value="Green Heights">Green Heights</option>
              <option value="Prime Residency">Prime Residency</option>
              <option value="Sunshine Towers">Sunshine Towers</option>
              <option value="Azure Sky">Azure Sky</option>
            </select>
          </div>

          <div>
            <label htmlFor="rnt-unit" className="form-label">UNIT REF *</label>
            <input
              id="rnt-unit"
              type="text"
              name="unit"
              required
              placeholder="e.g. Flat 101, Tower A"
              value={formData.unit}
              onChange={handleChange}
              className="form-input"
            />
          </div>

          {/* Rent Month */}
          <div>
            <label htmlFor="rnt-month" className="form-label">RENT MONTH PERIOD *</label>
            <input
              id="rnt-month"
              type="text"
              name="rentMonth"
              required
              placeholder="August 2026"
              value={formData.rentMonth}
              onChange={handleChange}
              className="form-input mono-data"
            />
          </div>

          {/* Amount */}
          <div>
            <label htmlFor="rnt-amount" className="form-label">COLLECTED AMOUNT (₹) *</label>
            <input
              id="rnt-amount"
              type="number"
              name="amount"
              required
              placeholder="35000"
              value={formData.amount}
              onChange={handleChange}
              className="form-input mono-data"
            />
          </div>

          {/* Payment Mode */}
          <div className="form-grid-full">
            <label htmlFor="rnt-mode" className="form-label">PAYMENT MODE</label>
            <select
              id="rnt-mode"
              name="mode"
              value={formData.mode}
              onChange={handleChange}
              className="form-input select-input mono-data"
            >
              <option value="NEFT / Direct Escrow">NEFT / Direct Escrow</option>
              <option value="Cheque / Bank Draft">Cheque / Bank Draft</option>
              <option value="UPI Online Gateway">UPI Online Gateway</option>
              <option value="Cash Counter">Cash Counter</option>
            </select>
          </div>
        </div>

        <div className="modal-actions">
          <button type="button" className="btn btn-secondary btn-sm" onClick={onClose}>
            CANCEL
          </button>
          <button type="submit" className="btn btn-primary btn-sm">
            SAVE & GENERATE RENTAL RECEIPT
          </button>
        </div>
      </form>
    </Modal>
  );
});

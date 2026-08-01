import { useState, memo, useCallback } from 'react';
import { useApp } from '../../context/AppContext';
import { TrendingUp } from 'lucide-react';
import { Modal } from '../shared/Modal';

const INITIAL_INCOME_FORM = {
  type: 'Customer Installment Realization',
  party: 'Rajesh Kumar',
  project: 'Green Heights',
  amount: '1500000',
  description: 'Flat 101 Booking Milestone Receipt'
};

export const RecordIncomeModal = memo(function RecordIncomeModal({ isOpen, onClose }) {
  const { recordIncome } = useApp();
  const [formData, setFormData] = useState(INITIAL_INCOME_FORM);

  const handleChange = useCallback((e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  }, []);

  const handleSubmit = useCallback((e) => {
    e.preventDefault();
    if (!formData.amount || Number(formData.amount) <= 0) return;

    recordIncome(formData);
    setFormData(INITIAL_INCOME_FORM);
    onClose();
  }, [formData, recordIncome, onClose]);

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Record New Income / Receipt Voucher"
      icon={<TrendingUp size={18} color="var(--precision-blue)" />}
      width="480px"
    >
      <form onSubmit={handleSubmit}>
        <div className="form-grid">
          {/* Income Type */}
          <div className="form-grid-full">
            <label htmlFor="inc-type" className="form-label">INCOME CATEGORY / TYPE *</label>
            <select
              id="inc-type"
              name="type"
              value={formData.type}
              onChange={handleChange}
              className="form-input select-input"
            >
              <option value="Customer Installment Realization">Customer Installment Realization</option>
              <option value="Rental Income">Rental Lease Collection</option>
              <option value="Interest & Escrow Yield">Interest & Escrow Yield</option>
              <option value="Scrap & Equipment Sale">Scrap & Equipment Disposal</option>
              <option value="Other Non-Operating Income">Other Non-Operating Income</option>
            </select>
          </div>

          {/* Customer / Party */}
          <div>
            <label htmlFor="inc-party" className="form-label">PARTY / CUSTOMER NAME *</label>
            <input
              id="inc-party"
              type="text"
              name="party"
              required
              placeholder="e.g. Rajesh Kumar"
              value={formData.party}
              onChange={handleChange}
              className="form-input"
            />
          </div>

          {/* Project */}
          <div>
            <label htmlFor="inc-project" className="form-label">PROJECT SITE</label>
            <select
              id="inc-project"
              name="project"
              value={formData.project}
              onChange={handleChange}
              className="form-input select-input"
            >
              <option value="Green Heights">Green Heights</option>
              <option value="Prime Residency">Prime Residency</option>
              <option value="Sunshine Towers">Sunshine Towers</option>
              <option value="River View Residency">River View Residency</option>
              <option value="Azure Sky Luxury Villas">Azure Sky Luxury Villas</option>
            </select>
          </div>

          {/* Amount */}
          <div className="form-grid-full">
            <label htmlFor="inc-amount" className="form-label">RECEIPT AMOUNT (₹) *</label>
            <input
              id="inc-amount"
              type="number"
              name="amount"
              required
              min="1"
              placeholder="e.g. 1500000"
              value={formData.amount}
              onChange={handleChange}
              className="form-input mono-data"
            />
          </div>

          {/* Description */}
          <div className="form-grid-full">
            <label htmlFor="inc-desc" className="form-label">DESCRIPTION / REMARKS</label>
            <textarea
              id="inc-desc"
              name="description"
              rows={2}
              placeholder="Voucher details or bank reference..."
              value={formData.description}
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
            SAVE & GENERATE INVOICE
          </button>
        </div>
      </form>
    </Modal>
  );
});

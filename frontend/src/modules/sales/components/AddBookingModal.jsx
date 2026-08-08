import { useState, memo, useCallback } from 'react';
import { useApp } from '../../../core/providers/AppContext';
import { Building2 } from 'lucide-react';
import { Modal } from '../../../shared/components/Modal';

const INITIAL_BOOKING_FORM = {
  customerName: '',
  mobile: '',
  email: '',
  project: 'Green Heights',
  unit: 'Flat 101, Tower A',
  salesValueCr: '1.25',
  tokenAmountL: '10.00',
  paymentPlan: 'Construction-Linked Plan (CLP)',
  remarks: ''
};

export const AddBookingModal = memo(function AddBookingModal({ isOpen, onClose }) {
  const { addBooking } = useApp();
  const [formData, setFormData] = useState(INITIAL_BOOKING_FORM);

  const handleChange = useCallback((e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  }, []);

  const handleSubmit = useCallback((e) => {
    e.preventDefault();
    if (!formData.customerName.trim()) return;

    addBooking(formData);
    setFormData(INITIAL_BOOKING_FORM);
    onClose();
  }, [formData, addBooking, onClose]);

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Create New Property Booking"
      icon={<Building2 size={18} color="var(--precision-blue)" />}
      width="480px"
    >
      <form onSubmit={handleSubmit}>
        <div className="form-grid">
          {/* Customer Name */}
          <div className="form-grid-full">
            <label htmlFor="bkg-customer" className="form-label">CUSTOMER NAME *</label>
            <input
              id="bkg-customer"
              type="text"
              name="customerName"
              required
              placeholder="e.g. Suresh Menon"
              value={formData.customerName}
              onChange={handleChange}
              className="form-input"
            />
          </div>

          {/* Mobile Phone */}
          <div>
            <label htmlFor="bkg-mobile" className="form-label">MOBILE PHONE *</label>
            <input
              id="bkg-mobile"
              type="tel"
              name="mobile"
              required
              placeholder="+91 98765 43210"
              value={formData.mobile}
              onChange={handleChange}
              className="form-input mono-data"
            />
          </div>

          {/* Email */}
          <div>
            <label htmlFor="bkg-email" className="form-label">EMAIL ADDRESS</label>
            <input
              id="bkg-email"
              type="email"
              name="email"
              placeholder="customer@example.com"
              value={formData.email}
              onChange={handleChange}
              className="form-input mono-data"
            />
          </div>

          {/* Project */}
          <div>
            <label htmlFor="bkg-project" className="form-label">SELECT PROJECT</label>
            <select
              id="bkg-project"
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

          {/* Unit / Flat */}
          <div>
            <label htmlFor="bkg-unit" className="form-label">SELECT UNIT / FLAT *</label>
            <input
              id="bkg-unit"
              type="text"
              name="unit"
              required
              placeholder="e.g. Flat 302, Tower B"
              value={formData.unit}
              onChange={handleChange}
              className="form-input"
            />
          </div>

          {/* Sales Value (Cr) */}
          <div>
            <label htmlFor="bkg-salesval" className="form-label">TOTAL SALES VALUE (₹ Cr) *</label>
            <input
              id="bkg-salesval"
              type="text"
              name="salesValueCr"
              required
              placeholder="1.25"
              value={formData.salesValueCr}
              onChange={handleChange}
              className="form-input mono-data"
            />
          </div>

          {/* Token Amount (L) */}
          <div>
            <label htmlFor="bkg-token" className="form-label">TOKEN AMOUNT (₹ Lakhs) *</label>
            <input
              id="bkg-token"
              type="text"
              name="tokenAmountL"
              required
              placeholder="10.00"
              value={formData.tokenAmountL}
              onChange={handleChange}
              className="form-input mono-data"
            />
          </div>

          {/* Payment Plan */}
          <div className="form-grid-full">
            <label htmlFor="bkg-plan" className="form-label">PAYMENT PLAN SCHEME</label>
            <select
              id="bkg-plan"
              name="paymentPlan"
              value={formData.paymentPlan}
              onChange={handleChange}
              className="form-input select-input"
            >
              <option value="Construction-Linked Plan (CLP)">Construction-Linked Plan (CLP)</option>
              <option value="Down Payment Plan (10:90)">Down Payment Plan (10:90)</option>
              <option value="Flexi Payment Plan (30:70)">Flexi Payment Plan (30:70)</option>
              <option value="Time-Linked Schedule">Time-Linked Schedule</option>
            </select>
          </div>
        </div>

        <div className="modal-actions">
          <button type="button" className="btn btn-secondary btn-sm" onClick={onClose}>
            CANCEL
          </button>
          <button type="submit" className="btn btn-primary btn-sm">
            CONFIRM BOOKING RECORD
          </button>
        </div>
      </form>
    </Modal>
  );
});

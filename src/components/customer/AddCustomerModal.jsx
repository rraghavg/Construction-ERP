import { useState, memo, useCallback } from 'react';
import { useApp } from '../../context/AppContext';
import { UserPlus } from 'lucide-react';
import { Modal } from '../shared/Modal';

const INITIAL_CUSTOMER_FORM = {
  name: '',
  type: 'Owner',
  mobile: '',
  email: '',
  city: 'Noida',
  linkedBooking: '',
  nomineeName: '',
  nomineeRelation: 'Spouse',
  nomineeMobile: ''
};

export const AddCustomerModal = memo(function AddCustomerModal({ isOpen, onClose }) {
  const { addCustomer } = useApp();
  const [formData, setFormData] = useState(INITIAL_CUSTOMER_FORM);

  const handleChange = useCallback((e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  }, []);

  const handleSubmit = useCallback((e) => {
    e.preventDefault();
    if (!formData.name.trim()) return;

    addCustomer(formData);
    setFormData(INITIAL_CUSTOMER_FORM);
    onClose();
  }, [formData, addCustomer, onClose]);

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Create New Customer Profile"
      icon={<UserPlus size={18} color="var(--precision-blue)" />}
      width="480px"
    >
      <form onSubmit={handleSubmit}>
        <div className="form-grid">
          {/* Customer Name */}
          <div className="form-grid-full">
            <label htmlFor="cust-name" className="form-label">CUSTOMER NAME *</label>
            <input
              id="cust-name"
              type="text"
              name="name"
              required
              placeholder="e.g. Ramesh Chandra"
              value={formData.name}
              onChange={handleChange}
              className="form-input"
            />
          </div>

          {/* Customer Type */}
          <div>
            <label htmlFor="cust-type" className="form-label">CUSTOMER TYPE</label>
            <select
              id="cust-type"
              name="type"
              value={formData.type}
              onChange={handleChange}
              className="form-input select-input"
            >
              <option value="Owner">Owner</option>
              <option value="Tenant">Tenant</option>
              <option value="Investor">Investor</option>
              <option value="Channel Partner">Channel Partner</option>
              <option value="Other">Other</option>
            </select>
          </div>

          {/* City */}
          <div>
            <label htmlFor="cust-city" className="form-label">CITY / LOCATION *</label>
            <input
              id="cust-city"
              type="text"
              name="city"
              required
              placeholder="e.g. Noida"
              value={formData.city}
              onChange={handleChange}
              className="form-input"
            />
          </div>

          {/* Mobile Phone */}
          <div>
            <label htmlFor="cust-mobile" className="form-label">MOBILE PHONE *</label>
            <input
              id="cust-mobile"
              type="tel"
              name="mobile"
              required
              placeholder="+91 98765 43210"
              value={formData.mobile}
              onChange={handleChange}
              className="form-input mono-data"
            />
          </div>

          {/* Email Address */}
          <div>
            <label htmlFor="cust-email" className="form-label">EMAIL ADDRESS</label>
            <input
              id="cust-email"
              type="email"
              name="email"
              placeholder="customer@example.com"
              value={formData.email}
              onChange={handleChange}
              className="form-input mono-data"
            />
          </div>

          {/* Linked Booking */}
          <div className="form-grid-full">
            <label htmlFor="cust-booking" className="form-label">LINKED PROPERTY BOOKING REF (OPTIONAL)</label>
            <input
              id="cust-booking"
              type="text"
              name="linkedBooking"
              placeholder="e.g. BKG-2026-081"
              value={formData.linkedBooking}
              onChange={handleChange}
              className="form-input mono-data"
            />
          </div>

          {/* Nominee Details */}
          <div>
            <label htmlFor="cust-nominee-name" className="form-label">NOMINEE NAME</label>
            <input
              id="cust-nominee-name"
              type="text"
              name="nomineeName"
              placeholder="e.g. Sunita Chandra"
              value={formData.nomineeName}
              onChange={handleChange}
              className="form-input"
            />
          </div>

          <div>
            <label htmlFor="cust-nominee-rel" className="form-label">NOMINEE RELATION</label>
            <select
              id="cust-nominee-rel"
              name="nomineeRelation"
              value={formData.nomineeRelation}
              onChange={handleChange}
              className="form-input select-input"
            >
              <option value="Spouse">Spouse</option>
              <option value="Father">Father</option>
              <option value="Mother">Mother</option>
              <option value="Son">Son</option>
              <option value="Daughter">Daughter</option>
              <option value="Other">Other</option>
            </select>
          </div>
        </div>

        <div className="modal-actions">
          <button type="button" className="btn btn-secondary btn-sm" onClick={onClose}>
            CANCEL
          </button>
          <button type="submit" className="btn btn-primary btn-sm">
            CREATE CUSTOMER PROFILE
          </button>
        </div>
      </form>
    </Modal>
  );
});

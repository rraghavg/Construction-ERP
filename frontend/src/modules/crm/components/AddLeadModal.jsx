import { useState, memo, useCallback } from 'react';
import { useApp } from '../../../core/providers/AppContext';
import { UserPlus } from 'lucide-react';
import { Modal } from '../../../shared/components/Modal';

const INITIAL_FORM_STATE = {
  name: '',
  mobile: '',
  email: '',
  location: 'Hyderabad, Telangana',
  source: 'Website',
  projectInterested: 'Green Heights',
  budget: '₹60L – ₹80L',
  requirement: '2 BHK Flat',
  preferredDate: '',
  assignedTo: 'Anjali Sharma (Executive)',
  remarks: ''
};

export const AddLeadModal = memo(function AddLeadModal({ isOpen, onClose }) {
  const { addLead } = useApp();
  const [formData, setFormData] = useState(INITIAL_FORM_STATE);

  const handleChange = useCallback((e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  }, []);

  const handleSubmit = useCallback((e) => {
    e.preventDefault();
    if (!formData.name.trim()) return;

    addLead(formData);
    setFormData(INITIAL_FORM_STATE);
    onClose();
  }, [formData, addLead, onClose]);

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Create New Lead"
      icon={<UserPlus size={18} color="var(--precision-blue)" />}
      width="480px"
    >
      <form onSubmit={handleSubmit}>
        <div className="form-grid">
          {/* Full Name */}
          <div className="form-grid-full">
            <label htmlFor="lead-name" className="form-label">FULL NAME *</label>
            <input
              id="lead-name"
              type="text"
              name="name"
              required
              placeholder="e.g. Rajesh Kumar"
              value={formData.name}
              onChange={handleChange}
              className="form-input"
            />
          </div>

          {/* Mobile Phone */}
          <div>
            <label htmlFor="lead-mobile" className="form-label">MOBILE PHONE *</label>
            <input
              id="lead-mobile"
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
            <label htmlFor="lead-email" className="form-label">EMAIL ADDRESS</label>
            <input
              id="lead-email"
              type="email"
              name="email"
              placeholder="lead@example.com"
              value={formData.email}
              onChange={handleChange}
              className="form-input mono-data"
            />
          </div>

          {/* Interested Project */}
          <div>
            <label htmlFor="lead-project" className="form-label">PROJECT INTERESTED</label>
            <select
              id="lead-project"
              name="projectInterested"
              value={formData.projectInterested}
              onChange={handleChange}
              className="form-input select-input"
            >
              <option value="Green Heights">Green Heights</option>
              <option value="Prime Residency">Prime Residency</option>
              <option value="Sunshine Towers">Sunshine Towers</option>
              <option value="Azure Sky">Azure Sky</option>
            </select>
          </div>

          {/* Budget Range */}
          <div>
            <label htmlFor="lead-budget" className="form-label">BUDGET RANGE</label>
            <select
              id="lead-budget"
              name="budget"
              value={formData.budget}
              onChange={handleChange}
              className="form-input select-input mono-data"
            >
              <option value="₹40L – ₹60L">₹40L – ₹60L</option>
              <option value="₹60L – ₹80L">₹60L – ₹80L</option>
              <option value="₹80L – ₹1.2Cr">₹80L – ₹1.2Cr</option>
              <option value="₹1.2Cr+">₹1.2Cr+</option>
            </select>
          </div>

          {/* Lead Source */}
          <div>
            <label htmlFor="lead-source" className="form-label">LEAD SOURCE</label>
            <select
              id="lead-source"
              name="source"
              value={formData.source}
              onChange={handleChange}
              className="form-input select-input"
            >
              <option value="Website">Website</option>
              <option value="MagicBricks">MagicBricks</option>
              <option value="99acres">99acres</option>
              <option value="Walk-in">Walk-in</option>
              <option value="Referral">Referral</option>
              <option value="Google Ads">Google Ads</option>
            </select>
          </div>

          {/* Assigned Executive */}
          <div>
            <label htmlFor="lead-assigned" className="form-label">ASSIGNED EXECUTIVE</label>
            <select
              id="lead-assigned"
              name="assignedTo"
              value={formData.assignedTo}
              onChange={handleChange}
              className="form-input select-input"
            >
              <option value="Anjali Sharma (Executive)">Anjali Sharma (Executive)</option>
              <option value="Vikram Malhotra (Senior)">Vikram Malhotra (Senior)</option>
              <option value="Priya Verma (Executive)">Priya Verma (Executive)</option>
            </select>
          </div>

          {/* Remarks */}
          <div className="form-grid-full">
            <label htmlFor="lead-remarks" className="form-label">REMARKS / NOTES</label>
            <textarea
              id="lead-remarks"
              name="remarks"
              rows={2}
              placeholder="Initial customer preferences or notes..."
              value={formData.remarks}
              onChange={handleChange}
              className="form-input"
            />
          </div>
        </div>

        <div className="modal-actions">
          <button type="button" className="btn btn-secondary btn-sm" onClick={onClose}>
            CANCEL
          </button>
          <button type="submit" className="btn btn-primary btn-sm">
            CREATE LEAD RECORD
          </button>
        </div>
      </form>
    </Modal>
  );
});

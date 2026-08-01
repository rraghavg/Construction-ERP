import { useState, memo, useCallback } from 'react';
import { useApp } from '../../context/AppContext';
import { Wrench } from 'lucide-react';
import { Modal } from '../shared/Modal';

const INITIAL_RAISE_FORM = {
  unitLocation: '',
  category: 'Plumbing',
  priority: 'Medium',
  reportedBy: 'John Doe (Admin)',
  description: ''
};

export const RaiseComplaintModal = memo(function RaiseComplaintModal({ isOpen, onClose }) {
  const { raiseComplaint } = useApp();
  const [formData, setFormData] = useState(INITIAL_RAISE_FORM);

  const handleChange = useCallback((e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  }, []);

  const handleSubmit = useCallback((e) => {
    e.preventDefault();
    if (!formData.unitLocation.trim() || !formData.description.trim()) return;

    raiseComplaint(formData);
    setFormData(INITIAL_RAISE_FORM);
    onClose();
  }, [formData, raiseComplaint, onClose]);

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Raise New Maintenance Complaint Ticket"
      icon={<Wrench size={18} color="var(--precision-blue)" />}
      width="480px"
    >
      <form onSubmit={handleSubmit}>
        <div className="form-grid">
          {/* Unit / Location */}
          <div className="form-grid-full">
            <label htmlFor="cmp-location" className="form-label">UNIT / FACILITY LOCATION *</label>
            <input
              id="cmp-location"
              type="text"
              name="unitLocation"
              required
              placeholder="e.g. Flat 304, Green Heights or Tower A Elevator"
              value={formData.unitLocation}
              onChange={handleChange}
              className="form-input"
            />
          </div>

          {/* Category */}
          <div>
            <label htmlFor="cmp-category" className="form-label">ISSUE CATEGORY</label>
            <select
              id="cmp-category"
              name="category"
              value={formData.category}
              onChange={handleChange}
              className="form-input select-input"
            >
              <option value="Plumbing">Plumbing</option>
              <option value="Electrical">Electrical</option>
              <option value="Civil Work">Civil Work</option>
              <option value="Lift / Elevator">Lift / Elevator</option>
              <option value="Cleaning">Cleaning</option>
              <option value="Others">Others</option>
            </select>
          </div>

          {/* Priority */}
          <div>
            <label htmlFor="cmp-priority" className="form-label">PRIORITY LEVEL</label>
            <select
              id="cmp-priority"
              name="priority"
              value={formData.priority}
              onChange={handleChange}
              className="form-input select-input mono-data"
            >
              <option value="High">High (Urgent SLA 12h)</option>
              <option value="Medium">Medium (SLA 24h)</option>
              <option value="Low">Low (SLA 48h)</option>
            </select>
          </div>

          {/* Reported By */}
          <div className="form-grid-full">
            <label htmlFor="cmp-reporter" className="form-label">REPORTED BY / CONTACT NAME</label>
            <input
              id="cmp-reporter"
              type="text"
              name="reportedBy"
              placeholder="e.g. Mahesh Nair"
              value={formData.reportedBy}
              onChange={handleChange}
              className="form-input"
            />
          </div>

          {/* Problem Description */}
          <div className="form-grid-full">
            <label htmlFor="cmp-desc" className="form-label">PROBLEM DESCRIPTION *</label>
            <textarea
              id="cmp-desc"
              name="description"
              required
              rows={3}
              placeholder="Describe the maintenance issue details..."
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
            RAISE TICKET & NOTIFY VENDOR
          </button>
        </div>
      </form>
    </Modal>
  );
});

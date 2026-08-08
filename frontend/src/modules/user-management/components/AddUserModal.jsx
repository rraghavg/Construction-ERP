import { useState, memo, useCallback } from 'react';
import { useApp } from '../../../core/providers/AppContext';
import { UserPlus } from 'lucide-react';
import { Modal } from '../../../shared/components/Modal';

const INITIAL_FORM = {
  name: '',
  email: '',
  mobile: '',
  role: 'Site Engineer',
  department: 'Projects & Site',
  jobTitle: 'Structural Engineer',
  userGroup: 'Engineering Group',
  sendInvite: true
};

export const AddUserModal = memo(function AddUserModal({ isOpen, onClose }) {
  const { addUser } = useApp();
  const [formData, setFormData] = useState(INITIAL_FORM);

  const handleSubmit = useCallback((e) => {
    e.preventDefault();
    addUser(formData);
    setFormData(INITIAL_FORM);
    onClose();
  }, [formData, addUser, onClose]);

  const handleChange = useCallback((e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  }, []);

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Onboard & Create New System User Account"
      icon={<UserPlus size={18} color="var(--precision-blue)" />}
      width="540px"
    >
      <form onSubmit={handleSubmit}>
        <div className="form-grid">
          <div>
            <label htmlFor="usr-name" className="form-label">FULL NAME *</label>
            <input
              id="usr-name"
              type="text"
              name="name"
              required
              placeholder="e.g. Ramesh Chandra"
              value={formData.name}
              onChange={handleChange}
              className="form-input"
            />
          </div>

          <div>
            <label htmlFor="usr-email" className="form-label">EMAIL ADDRESS *</label>
            <input
              id="usr-email"
              type="email"
              name="email"
              required
              placeholder="e.g. ramesh.c@apexerp.com"
              value={formData.email}
              onChange={handleChange}
              className="form-input mono-data"
            />
          </div>

          <div>
            <label htmlFor="usr-mobile" className="form-label">MOBILE PHONE</label>
            <input
              id="usr-mobile"
              type="tel"
              name="mobile"
              placeholder="+91 98765 43210"
              value={formData.mobile}
              onChange={handleChange}
              className="form-input mono-data"
            />
          </div>

          <div>
            <label htmlFor="usr-role" className="form-label">ASSIGNED ROLE *</label>
            <select
              id="usr-role"
              name="role"
              value={formData.role}
              onChange={handleChange}
              className="form-input select-input"
            >
              <option value="Admin / Super Admin">Admin / Super Admin</option>
              <option value="Manager / Dept Head">Manager / Dept Head</option>
              <option value="Site Engineer">Site Engineer</option>
              <option value="Accountant">Accountant</option>
              <option value="HR Executive">HR Executive</option>
              <option value="Store Incharge">Store Incharge</option>
              <option value="Auditor (Read-Only)">Auditor (Read-Only)</option>
            </select>
          </div>

          <div>
            <label htmlFor="usr-dept" className="form-label">DEPARTMENT *</label>
            <select
              id="usr-dept"
              name="department"
              value={formData.department}
              onChange={handleChange}
              className="form-input select-input"
            >
              <option value="Projects & Site">Projects & Site</option>
              <option value="Engineering & Arch">Engineering & Arch</option>
              <option value="Sales & Marketing">Sales & Marketing</option>
              <option value="IT & Admin">IT & Admin</option>
              <option value="Finance & Accounts">Finance & Accounts</option>
              <option value="Inventory & Store">Inventory & Store</option>
            </select>
          </div>

          <div>
            <label htmlFor="usr-title" className="form-label">JOB TITLE</label>
            <input
              id="usr-title"
              type="text"
              name="jobTitle"
              placeholder="e.g. Senior Project Coordinator"
              value={formData.jobTitle}
              onChange={handleChange}
              className="form-input"
            />
          </div>

          <div className="form-grid-full" style={{ display: 'flex', alignItems: 'center', gap: '8px', paddingTop: '0.4rem' }}>
            <input
              id="usr-invite"
              type="checkbox"
              name="sendInvite"
              checked={formData.sendInvite}
              onChange={handleChange}
            />
            <label htmlFor="usr-invite" style={{ fontSize: '0.75rem', fontWeight: 600 }}>
              Send email activation & password setup link immediately
            </label>
          </div>
        </div>

        <div className="modal-actions" style={{ marginTop: '1.25rem' }}>
          <button type="button" className="btn btn-secondary btn-sm" onClick={onClose}>
            CANCEL
          </button>
          <button type="submit" className="btn btn-primary btn-sm">
            CREATE & ONBOARD USER
          </button>
        </div>
      </form>
    </Modal>
  );
});

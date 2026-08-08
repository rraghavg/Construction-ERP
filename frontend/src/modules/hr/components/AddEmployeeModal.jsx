import { useState, memo, useCallback } from 'react';
import { useApp } from '../../../core/providers/AppContext';
import { UserPlus } from 'lucide-react';
import { Modal } from '../../../shared/components/Modal';

const INITIAL_EMP_FORM = {
  name: 'Rohan Deshmukh',
  department: 'Site / Project Ops',
  designation: 'Assistant Site Engineer',
  mobile: '+91 98333 44556',
  email: 'rohan.d@apexerp.com',
  baseSalary: '85000',
  employmentType: 'Full-Time Permanent'
};

export const AddEmployeeModal = memo(function AddEmployeeModal({ isOpen, onClose }) {
  const { addEmployee } = useApp();
  const [formData, setFormData] = useState(INITIAL_EMP_FORM);

  const handleChange = useCallback((e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  }, []);

  const handleSubmit = useCallback((e) => {
    e.preventDefault();
    if (!formData.name.trim()) return;

    addEmployee(formData);
    setFormData(INITIAL_EMP_FORM);
    onClose();
  }, [formData, addEmployee, onClose]);

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Onboard New Employee"
      icon={<UserPlus size={18} color="var(--precision-blue)" />}
      width="480px"
    >
      <form onSubmit={handleSubmit}>
        <div className="form-grid">
          {/* Full Name */}
          <div className="form-grid-full">
            <label htmlFor="emp-name" className="form-label">FULL NAME *</label>
            <input
              id="emp-name"
              type="text"
              name="name"
              required
              placeholder="e.g. Rohan Deshmukh"
              value={formData.name}
              onChange={handleChange}
              className="form-input"
            />
          </div>

          {/* Department */}
          <div>
            <label htmlFor="emp-dept" className="form-label">DEPARTMENT *</label>
            <select
              id="emp-dept"
              name="department"
              value={formData.department}
              onChange={handleChange}
              className="form-input select-input"
            >
              <option value="Site / Project Ops">Site / Project Ops</option>
              <option value="Engineering & Arch">Engineering & Arch</option>
              <option value="Finance & Accounts">Finance & Accounts</option>
              <option value="HR & Admin">HR & Admin</option>
              <option value="Procurement & Store">Procurement & Store</option>
              <option value="Others & Support">Others & Support</option>
            </select>
          </div>

          {/* Designation */}
          <div>
            <label htmlFor="emp-desig" className="form-label">DESIGNATION *</label>
            <input
              id="emp-desig"
              type="text"
              name="designation"
              required
              placeholder="e.g. Structural Engineer"
              value={formData.designation}
              onChange={handleChange}
              className="form-input"
            />
          </div>

          {/* Mobile */}
          <div>
            <label htmlFor="emp-mobile" className="form-label">MOBILE PHONE *</label>
            <input
              id="emp-mobile"
              type="tel"
              name="mobile"
              required
              placeholder="+91 98000 00000"
              value={formData.mobile}
              onChange={handleChange}
              className="form-input mono-data"
            />
          </div>

          {/* Email */}
          <div>
            <label htmlFor="emp-email" className="form-label">WORK EMAIL *</label>
            <input
              id="emp-email"
              type="email"
              name="email"
              required
              placeholder="name@apexerp.com"
              value={formData.email}
              onChange={handleChange}
              className="form-input mono-data"
            />
          </div>

          {/* Base Salary */}
          <div>
            <label htmlFor="emp-salary" className="form-label">MONTHLY BASE SALARY (₹) *</label>
            <input
              id="emp-salary"
              type="number"
              name="baseSalary"
              required
              min="1000"
              placeholder="e.g. 85000"
              value={formData.baseSalary}
              onChange={handleChange}
              className="form-input mono-data"
            />
          </div>

          {/* Employment Type */}
          <div>
            <label htmlFor="emp-type" className="form-label">EMPLOYMENT TYPE</label>
            <select
              id="emp-type"
              name="employmentType"
              value={formData.employmentType}
              onChange={handleChange}
              className="form-input select-input"
            >
              <option value="Full-Time Permanent">Full-Time Permanent</option>
              <option value="Probationary">Probationary</option>
              <option value="Contractual / Consultant">Contractual / Consultant</option>
              <option value="Trainee / Intern">Trainee / Intern</option>
            </select>
          </div>
        </div>

        <div className="modal-actions">
          <button type="button" className="btn btn-secondary btn-sm" onClick={onClose}>
            CANCEL
          </button>
          <button type="submit" className="btn btn-primary btn-sm">
            ONBOARD EMPLOYEE
          </button>
        </div>
      </form>
    </Modal>
  );
});

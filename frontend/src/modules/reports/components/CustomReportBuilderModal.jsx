import { useState, memo, useCallback } from 'react';
import { useApp } from '../../../core/providers/AppContext';
import { Sliders } from 'lucide-react';
import { Modal } from '../../../shared/components/Modal';

const INITIAL_CUSTOM_FORM = {
  name: 'Custom Cross-Module Revenue vs Cost Report',
  sourceModule: 'Sales & Finance',
  fields: 'Project, Customer, Revenue, Direct Expenses, Net Margin',
  format: 'Excel',
  frequency: 'Weekly'
};

export const CustomReportBuilderModal = memo(function CustomReportBuilderModal({ isOpen, onClose }) {
  const { createCustomReport } = useApp();
  const [formData, setFormData] = useState(INITIAL_CUSTOM_FORM);

  const handleChange = useCallback((e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  }, []);

  const handleSubmit = useCallback((e) => {
    e.preventDefault();
    if (!formData.name.trim()) return;

    createCustomReport(formData);
    setFormData(INITIAL_CUSTOM_FORM);
    onClose();
  }, [formData, createCustomReport, onClose]);

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Custom Report Builder Wizard"
      icon={<Sliders size={18} color="var(--precision-blue)" />}
      width="520px"
    >
      <form onSubmit={handleSubmit}>
        <div className="form-grid">
          {/* Report Name */}
          <div className="form-grid-full">
            <label htmlFor="rep-name" className="form-label">REPORT NAME *</label>
            <input
              id="rep-name"
              type="text"
              name="name"
              required
              placeholder="e.g. Q3 Sales & Cash Flow Realization"
              value={formData.name}
              onChange={handleChange}
              className="form-input"
            />
          </div>

          {/* Data Source Modules */}
          <div>
            <label htmlFor="rep-source" className="form-label">DATA SOURCE MODULE(S) *</label>
            <select
              id="rep-source"
              name="sourceModule"
              value={formData.sourceModule}
              onChange={handleChange}
              className="form-input select-input"
            >
              <option value="Sales & Finance">Sales & Finance (Combined)</option>
              <option value="Finance & Inventory">Finance & Inventory</option>
              <option value="HR & Payroll">HR & Payroll</option>
              <option value="Customer & Rental">Customer & Rental</option>
              <option value="Maintenance & Assets">Maintenance & Assets</option>
              <option value="All Modules (Executive Summary)">All Modules (Executive Summary)</option>
            </select>
          </div>

          {/* Export Format */}
          <div>
            <label htmlFor="rep-format" className="form-label">OUTPUT FORMAT *</label>
            <select
              id="rep-format"
              name="format"
              value={formData.format}
              onChange={handleChange}
              className="form-input select-input"
            >
              <option value="Excel">Excel (.xlsx)</option>
              <option value="PDF">PDF Document (.pdf)</option>
              <option value="CSV">CSV Data File (.csv)</option>
            </select>
          </div>

          {/* Columns / Fields */}
          <div className="form-grid-full">
            <label htmlFor="rep-fields" className="form-label">COLUMNS & FIELDS TO INCLUDE</label>
            <input
              id="rep-fields"
              type="text"
              name="fields"
              placeholder="Project, Customer, Booking Amount, Realized Collection..."
              value={formData.fields}
              onChange={handleChange}
              className="form-input"
            />
          </div>

          {/* Automated Schedule */}
          <div className="form-grid-full">
            <label htmlFor="rep-freq" className="form-label">AUTOMATED DELIVERY SCHEDULE</label>
            <select
              id="rep-freq"
              name="frequency"
              value={formData.frequency}
              onChange={handleChange}
              className="form-input select-input"
            >
              <option value="None">On-Demand Only (No Schedule)</option>
              <option value="Daily">Daily Morning Digest (08:00 AM)</option>
              <option value="Weekly">Weekly Monday Report (09:00 AM)</option>
              <option value="Monthly">Monthly 1st Day Summary</option>
            </select>
          </div>
        </div>

        <div className="modal-actions">
          <button type="button" className="btn btn-secondary btn-sm" onClick={onClose}>
            CANCEL
          </button>
          <button type="submit" className="btn btn-primary btn-sm">
            GENERATE & SAVE REPORT
          </button>
        </div>
      </form>
    </Modal>
  );
});

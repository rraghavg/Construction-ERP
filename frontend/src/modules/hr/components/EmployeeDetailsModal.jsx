import { memo } from 'react';
import { UserCheck } from 'lucide-react';
import { Modal } from '../../../shared/components/Modal';
import { EmployeeStatusBadge } from './RecentEmployeesTable';

export const EmployeeDetailsModal = memo(function EmployeeDetailsModal({ isOpen, onClose, employee }) {
  if (!employee) return null;

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={`Employee Profile — ${employee.name} (${employee.empCode})`}
      icon={<UserCheck size={18} color="var(--precision-blue)" />}
      width="520px"
    >
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', fontSize: '0.8rem' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <span style={{ color: 'var(--text-muted)' }}>Employment Status:</span>
          <EmployeeStatusBadge status={employee.status} />
        </div>

        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <span style={{ color: 'var(--text-muted)' }}>Emp Code:</span>
          <span className="mono-data" style={{ fontWeight: '800', color: 'var(--precision-blue)' }}>
            {employee.empCode}
          </span>
        </div>

        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <span style={{ color: 'var(--text-muted)' }}>Department:</span>
          <span style={{ fontWeight: '700' }}>{employee.department}</span>
        </div>

        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <span style={{ color: 'var(--text-muted)' }}>Designation:</span>
          <span>{employee.designation}</span>
        </div>

        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <span style={{ color: 'var(--text-muted)' }}>Mobile Phone:</span>
          <span className="mono-data">{employee.mobile}</span>
        </div>

        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <span style={{ color: 'var(--text-muted)' }}>Work Email:</span>
          <span className="mono-data">{employee.email}</span>
        </div>

        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <span style={{ color: 'var(--text-muted)' }}>Joining Date:</span>
          <span className="mono-data">{employee.joiningDate}</span>
        </div>

        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <span style={{ color: 'var(--text-muted)' }}>Base Salary:</span>
          <span className="mono-data" style={{ fontWeight: '800', color: '#16a34a' }}>
            {employee.baseSalary}
          </span>
        </div>

        <div style={{ padding: '0.65rem', background: 'var(--bg-input)', borderRadius: '4px', borderLeft: '3px solid var(--precision-blue)' }}>
          <div style={{ fontSize: '0.675rem', fontWeight: 800, color: 'var(--text-muted)', textTransform: 'uppercase', marginBottom: '2px' }}>
            EMPLOYMENT TYPE
          </div>
          <div>{employee.employmentType}</div>
        </div>
      </div>

      <div className="modal-actions" style={{ marginTop: '1.25rem' }}>
        <button className="btn btn-secondary btn-sm" onClick={onClose}>
          CLOSE
        </button>
      </div>
    </Modal>
  );
});

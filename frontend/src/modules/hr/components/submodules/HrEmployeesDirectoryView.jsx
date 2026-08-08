import { memo, useState, useMemo } from 'react';
import { useApp } from '../../../../core/providers/AppContext';
import { UserCheck, Search, Plus, Mail, Phone, FileText } from 'lucide-react';

export const HrEmployeesDirectoryView = memo(function HrEmployeesDirectoryView({ onOpenAddModal, onOpenEmployeeDetails }) {
  const { employees, setSelectedEmployee } = useApp();
  const [searchTerm, setSearchTerm] = useState('');
  const [deptFilter, setDeptFilter] = useState('ALL');

  const filteredEmployees = useMemo(() => {
    return employees.filter((e) => {
      const matchesSearch =
        e.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        e.phone.includes(searchTerm) ||
        e.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        e.designation.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesDept = deptFilter === 'ALL' || e.department === deptFilter;
      return matchesSearch && matchesDept;
    });
  }, [employees, searchTerm, deptFilter]);

  return (
    <div className="anodized-panel" style={{ padding: '1.25rem' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <h3 style={{ fontSize: '1rem', fontWeight: 800, display: 'flex', alignItems: 'center', gap: '8px' }}>
            <UserCheck size={18} style={{ color: 'var(--precision-blue)' }} />
            Employee Master Directory & Staff Rosters
          </h3>
          <p style={{ fontSize: '0.725rem', color: 'var(--text-muted)', marginTop: '2px' }}>
            Complete workforce profiles, department allocations, designations, and contact details
          </p>
        </div>

        <button className="btn btn-primary btn-sm" onClick={onOpenAddModal}>
          <Plus size={14} /> ONBOARD NEW EMPLOYEE
        </button>
      </div>

      <div style={{ display: 'flex', gap: '0.75rem', marginBottom: '1rem' }}>
        <div style={{ position: 'relative', flex: 1 }}>
          <Search size={14} style={{ position: 'absolute', left: '10px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
          <input
            type="text"
            className="form-control"
            placeholder="Search employees by name, designation, department..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{ paddingLeft: '32px', fontSize: '0.75rem' }}
          />
        </div>

        <select className="form-control" value={deptFilter} onChange={(e) => setDeptFilter(e.target.value)} style={{ fontSize: '0.75rem', width: '180px' }}>
          <option value="ALL">All Departments</option>
          <option value="Sales & Marketing">Sales & Marketing</option>
          <option value="Civil Construction">Civil Construction</option>
          <option value="Accounts & Finance">Accounts & Finance</option>
          <option value="Human Resources">Human Resources</option>
        </select>
      </div>

      <div style={{ overflowX: 'auto' }}>
        <table className="table" style={{ width: '100%', fontSize: '0.75rem' }}>
          <thead>
            <tr>
              <th>EMP ID</th>
              <th>EMPLOYEE NAME</th>
              <th>DESIGNATION</th>
              <th>DEPARTMENT</th>
              <th>CONTACT DETAILS</th>
              <th>STATUS</th>
              <th>ACTION</th>
            </tr>
          </thead>
          <tbody>
            {filteredEmployees.map((e) => (
              <tr
                key={e.id}
                onClick={() => {
                  setSelectedEmployee(e);
                  onOpenEmployeeDetails(e);
                }}
                style={{ cursor: 'pointer' }}
              >
                <td className="mono-data" style={{ fontWeight: 700, color: 'var(--precision-blue)' }}>{e.id}</td>
                <td style={{ fontWeight: 700 }}>{e.name}</td>
                <td>{e.designation}</td>
                <td><span className="badge badge-info">{e.department}</span></td>
                <td>{e.phone} • {e.email}</td>
                <td><span className="badge badge-success">{e.status || 'ACTIVE'}</span></td>
                <td>
                  <button className="btn btn-secondary btn-xs">
                    <FileText size={11} /> Profile
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
});

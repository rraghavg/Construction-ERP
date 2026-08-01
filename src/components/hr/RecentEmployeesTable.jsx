import { useMemo, memo, useCallback } from 'react';
import { useApp } from '../../context/AppContext';
import { Eye, UserPlus, Trash2, Edit3 } from 'lucide-react';
import { PanelHeader } from '../shared/PanelHeader';

export const EmployeeStatusBadge = memo(function EmployeeStatusBadge({ status }) {
  let badgeStyle = { bg: 'rgba(22, 163, 74, 0.12)', color: '#15803d', border: 'rgba(22, 163, 74, 0.3)' };

  if (status === 'On Leave') {
    badgeStyle = { bg: 'rgba(37, 99, 235, 0.12)', color: '#1d4ed8', border: 'rgba(37, 99, 235, 0.3)' };
  } else if (status === 'Absent') {
    badgeStyle = { bg: 'rgba(220, 38, 38, 0.12)', color: '#b91c1c', border: 'rgba(220, 38, 38, 0.3)' };
  } else if (status === 'Probation') {
    badgeStyle = { bg: 'rgba(245, 158, 11, 0.12)', color: '#b45309', border: 'rgba(245, 158, 11, 0.3)' };
  } else if (status === 'Resigned') {
    badgeStyle = { bg: 'rgba(100, 116, 139, 0.12)', color: '#475569', border: 'rgba(100, 116, 139, 0.3)' };
  }

  return (
    <span
      className="badge mono-data"
      style={{
        background: badgeStyle.bg,
        color: badgeStyle.color,
        border: `1px solid ${badgeStyle.border}`,
        fontSize: '0.65rem'
      }}
    >
      {status}
    </span>
  );
});

export const RecentEmployeesTable = memo(function RecentEmployeesTable({ onOpenAddModal, onSelectEmployee }) {
  const { employees, selectedEmployee, setSelectedEmployee, navigateTo, updateEmployeeStatus } = useApp();

  const handleEmpSelect = useCallback((item) => {
    setSelectedEmployee(item);
    onSelectEmployee(item);
  }, [setSelectedEmployee, onSelectEmployee]);

  const handleEmpKeyDown = useCallback((e, item) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      handleEmpSelect(item);
    }
  }, [handleEmpSelect]);

  const handleDeactivate = useCallback((e, empId) => {
    e.stopPropagation();
    updateEmployeeStatus(empId, 'Resigned');
  }, [updateEmployeeStatus]);

  return (
    <div className="panel-card" style={{ padding: '1.25rem' }}>
      <PanelHeader
        title="Employees Directory — Recent Joinees"
        accentColor="#2563eb"
        actionLabel="VIEW ALL EMPLOYEES →"
        onAction={() => navigateTo('hr', 'Employees Directory')}
      >
        <button
          className="btn btn-primary btn-sm"
          onClick={onOpenAddModal}
          aria-label="Add New Employee"
        >
          <UserPlus size={14} aria-hidden="true" /> ADD EMPLOYEE
        </button>
      </PanelHeader>

      <div style={{ overflowX: 'auto', border: '1px solid var(--border-color)', borderRadius: '4px' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.8rem' }} aria-label="Recent employees directory table">
          <thead>
            <tr style={{ background: 'var(--bg-input)', borderBottom: '1px solid var(--border-color)', fontSize: '0.7rem', color: 'var(--text-muted)' }}>
              <th style={{ padding: '0.65rem 0.75rem' }}>EMP ID</th>
              <th style={{ padding: '0.65rem 0.75rem' }}>EMPLOYEE NAME</th>
              <th style={{ padding: '0.65rem 0.75rem' }}>DEPARTMENT</th>
              <th style={{ padding: '0.65rem 0.75rem' }}>DESIGNATION</th>
              <th style={{ padding: '0.65rem 0.75rem' }}>MOBILE / EMAIL</th>
              <th style={{ padding: '0.65rem 0.75rem' }}>JOINING DATE</th>
              <th style={{ padding: '0.65rem 0.75rem' }}>STATUS</th>
              <th style={{ padding: '0.65rem 0.75rem', textAlign: 'right' }}>ACTIONS</th>
            </tr>
          </thead>
          <tbody>
            {employees.slice(0, 5).map((item) => {
              const isSelected = selectedEmployee?.id === item.id;

              return (
                <tr
                  key={item.id}
                  tabIndex={0}
                  role="button"
                  onClick={() => handleEmpSelect(item)}
                  onKeyDown={(e) => handleEmpKeyDown(e, item)}
                  aria-selected={isSelected}
                  style={{
                    borderBottom: '1px solid var(--border-color)',
                    background: isSelected ? 'rgba(37, 99, 235, 0.08)' : 'transparent',
                    cursor: 'pointer',
                    transition: 'background 0.2s ease'
                  }}
                >
                  <td className="mono-data" style={{ padding: '0.75rem', fontWeight: '700', color: 'var(--precision-blue)' }}>
                    {item.empCode}
                  </td>
                  <td style={{ padding: '0.75rem', fontWeight: '700' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <div
                        className="mono-data"
                        style={{
                          width: '26px',
                          height: '26px',
                          borderRadius: '50%',
                          background: 'rgba(37, 99, 235, 0.12)',
                          color: '#2563eb',
                          display: 'grid',
                          placeItems: 'center',
                          fontSize: '0.65rem',
                          fontWeight: 800
                        }}
                      >
                        {item.initials}
                      </div>
                      {item.name}
                    </div>
                  </td>
                  <td style={{ padding: '0.75rem', fontSize: '0.725rem' }}>
                    {item.department}
                  </td>
                  <td style={{ padding: '0.75rem', fontSize: '0.725rem' }}>
                    {item.designation}
                  </td>
                  <td className="mono-data" style={{ padding: '0.75rem', fontSize: '0.725rem', color: 'var(--text-muted)' }}>
                    {item.mobile}
                  </td>
                  <td className="mono-data" style={{ padding: '0.75rem', fontSize: '0.725rem' }}>
                    {item.joiningDate}
                  </td>
                  <td style={{ padding: '0.75rem' }}>
                    <EmployeeStatusBadge status={item.status} />
                  </td>
                  <td style={{ padding: '0.75rem', textAlign: 'right' }}>
                    <div style={{ display: 'flex', gap: '4px', justifyContent: 'flex-end' }}>
                      <button
                        className="btn btn-secondary btn-sm"
                        style={{ padding: '3px 7px' }}
                        onClick={(e) => {
                          e.stopPropagation();
                          handleEmpSelect(item);
                        }}
                        title="View Profile"
                        aria-label={`View profile for ${item.name}`}
                      >
                        <Eye size={12} aria-hidden="true" />
                      </button>
                      <button
                        className="btn btn-secondary btn-sm"
                        style={{ padding: '3px 7px', color: '#dc2626' }}
                        onClick={(e) => handleDeactivate(e, item.id)}
                        title="Deactivate / Soft Delete"
                        aria-label={`Deactivate ${item.name}`}
                      >
                        <Trash2 size={12} aria-hidden="true" />
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
});

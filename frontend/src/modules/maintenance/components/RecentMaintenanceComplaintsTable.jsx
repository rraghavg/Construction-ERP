import { useMemo, memo, useCallback } from 'react';
import { useApp } from '../../../core/providers/AppContext';
import { Eye, Plus, Wrench } from 'lucide-react';
import { PanelHeader } from '../../../shared/components/PanelHeader';

export const MaintenanceStatusBadge = memo(function MaintenanceStatusBadge({ status }) {
  let badgeStyle = { bg: 'rgba(6, 182, 212, 0.12)', color: '#0284c7', border: 'rgba(6, 182, 212, 0.3)' };

  if (status === 'In Progress') {
    badgeStyle = { bg: 'rgba(249, 115, 22, 0.12)', color: '#c2410c', border: 'rgba(249, 115, 22, 0.3)' };
  } else if (status === 'Assigned') {
    badgeStyle = { bg: 'rgba(139, 92, 246, 0.12)', color: '#6d28d9', border: 'rgba(139, 92, 246, 0.3)' };
  } else if (status === 'On Hold') {
    badgeStyle = { bg: 'rgba(220, 38, 38, 0.12)', color: '#b91c1c', border: 'rgba(220, 38, 38, 0.3)' };
  } else if (status === 'Resolved' || status === 'Closed') {
    badgeStyle = { bg: 'rgba(22, 163, 74, 0.12)', color: '#15803d', border: 'rgba(22, 163, 74, 0.3)' };
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

export const MaintenancePriorityBadge = memo(function MaintenancePriorityBadge({ priority }) {
  let color = '#16a34a';
  if (priority === 'High') color = '#dc2626';
  else if (priority === 'Medium') color = '#f59e0b';

  return (
    <span className="mono-data" style={{ fontSize: '0.675rem', fontWeight: 800, color }}>
      ● {priority}
    </span>
  );
});

export const RecentMaintenanceComplaintsTable = memo(function RecentMaintenanceComplaintsTable({ onOpenAddModal, onSelectComplaint }) {
  const { maintenanceComplaints, selectedMaintenanceComplaint, setSelectedMaintenanceComplaint, navigateTo } = useApp();

  const handleComplaintSelect = useCallback((item) => {
    setSelectedMaintenanceComplaint(item);
    onSelectComplaint(item);
  }, [setSelectedMaintenanceComplaint, onSelectComplaint]);

  const handleComplaintKeyDown = useCallback((e, item) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      handleComplaintSelect(item);
    }
  }, [handleComplaintSelect]);

  return (
    <div className="panel-card" style={{ padding: '1.25rem' }}>
      <PanelHeader
        title="Recent Maintenance Complaints Register"
        accentColor="#2563eb"
        actionLabel="ALL COMPLAINTS"
        onAction={() => navigateTo('maintenance', 'Complaints Register')}
      >
        <button
          className="btn btn-primary btn-sm"
          onClick={onOpenAddModal}
          aria-label="Raise New Maintenance Complaint"
        >
          <Plus size={14} aria-hidden="true" /> ADD COMPLAINT
        </button>
      </PanelHeader>

      <div style={{ overflowX: 'auto', border: '1px solid var(--border-color)', borderRadius: '4px' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.8rem' }} aria-label="Recent maintenance complaints table">
          <thead>
            <tr style={{ background: 'var(--bg-input)', borderBottom: '1px solid var(--border-color)', fontSize: '0.7rem', color: 'var(--text-muted)' }}>
              <th style={{ padding: '0.65rem 0.75rem' }}>COMPLAINT NO.</th>
              <th style={{ padding: '0.65rem 0.75rem' }}>UNIT / LOCATION</th>
              <th style={{ padding: '0.65rem 0.75rem' }}>CATEGORY</th>
              <th style={{ padding: '0.65rem 0.75rem' }}>REPORTED BY</th>
              <th style={{ padding: '0.65rem 0.75rem' }}>PRIORITY</th>
              <th style={{ padding: '0.65rem 0.75rem' }}>STATUS</th>
              <th style={{ padding: '0.65rem 0.75rem' }}>ASSIGNED TO</th>
              <th style={{ padding: '0.65rem 0.75rem' }}>REPORTED ON</th>
              <th style={{ padding: '0.65rem 0.75rem', textAlign: 'right' }}>ACTIONS</th>
            </tr>
          </thead>
          <tbody>
            {maintenanceComplaints.map((item) => {
              const isSelected = selectedMaintenanceComplaint?.id === item.id;

              return (
                <tr
                  key={item.id}
                  tabIndex={0}
                  role="button"
                  onClick={() => handleComplaintSelect(item)}
                  onKeyDown={(e) => handleComplaintKeyDown(e, item)}
                  aria-selected={isSelected}
                  style={{
                    borderBottom: '1px solid var(--border-color)',
                    background: isSelected ? 'rgba(37, 99, 235, 0.08)' : 'transparent',
                    cursor: 'pointer',
                    transition: 'background 0.2s ease'
                  }}
                >
                  <td className="mono-data" style={{ padding: '0.75rem', fontWeight: '700', color: 'var(--precision-blue)' }}>
                    {item.id}
                  </td>
                  <td style={{ padding: '0.75rem', fontWeight: '700' }}>
                    {item.unitLocation}
                  </td>
                  <td style={{ padding: '0.75rem' }}>
                    <span className="badge badge-info mono-data" style={{ fontSize: '0.65rem' }}>
                      {item.category}
                    </span>
                  </td>
                  <td style={{ padding: '0.75rem' }}>
                    {item.reportedBy}
                  </td>
                  <td style={{ padding: '0.75rem' }}>
                    <MaintenancePriorityBadge priority={item.priority} />
                  </td>
                  <td style={{ padding: '0.75rem' }}>
                    <MaintenanceStatusBadge status={item.status} />
                  </td>
                  <td style={{ padding: '0.75rem', fontSize: '0.725rem' }}>
                    {item.assignedTo}
                  </td>
                  <td className="mono-data" style={{ padding: '0.75rem', fontSize: '0.725rem' }}>
                    {item.reportedOn}
                  </td>
                  <td style={{ padding: '0.75rem', textAlign: 'right' }}>
                    <button
                      className="btn btn-secondary btn-sm"
                      style={{ padding: '3px 7px' }}
                      onClick={(e) => {
                        e.stopPropagation();
                        handleComplaintSelect(item);
                      }}
                      title="View Details"
                      aria-label={`View details for ${item.id}`}
                    >
                      <Eye size={12} aria-hidden="true" />
                    </button>
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

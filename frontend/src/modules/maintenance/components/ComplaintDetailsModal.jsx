import { memo, useCallback } from 'react';
import { useApp } from '../../../core/providers/AppContext';
import { Wrench, CheckCircle2, UserPlus } from 'lucide-react';
import { Modal } from '../../../shared/components/Modal';
import { MaintenanceStatusBadge, MaintenancePriorityBadge } from './RecentMaintenanceComplaintsTable';

export const ComplaintDetailsModal = memo(function ComplaintDetailsModal({ isOpen, onClose, complaint }) {
  const { updateComplaintStatus, assignVendorToComplaint, navigateTo } = useApp();

  const handleResolve = useCallback(() => {
    if (!complaint) return;
    updateComplaintStatus(complaint.id, 'Resolved');
  }, [complaint, updateComplaintStatus]);

  const handleAssign = useCallback(() => {
    if (!complaint) return;
    assignVendorToComplaint(complaint.id, 'ABC Facility Services');
  }, [complaint, assignVendorToComplaint]);

  if (!complaint) return null;

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={`Maintenance Ticket — ${complaint.id}`}
      icon={<Wrench size={18} color="var(--precision-blue)" />}
      width="520px"
    >
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', fontSize: '0.8rem' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <span style={{ color: 'var(--text-muted)' }}>Ticket Status:</span>
          <MaintenanceStatusBadge status={complaint.status} />
        </div>

        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <span style={{ color: 'var(--text-muted)' }}>Priority Level:</span>
          <MaintenancePriorityBadge priority={complaint.priority} />
        </div>

        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <span style={{ color: 'var(--text-muted)' }}>Location / Unit:</span>
          <span style={{ fontWeight: '700' }}>{complaint.unitLocation}</span>
        </div>

        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <span style={{ color: 'var(--text-muted)' }}>Category:</span>
          <span className="badge badge-info mono-data">{complaint.category}</span>
        </div>

        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <span style={{ color: 'var(--text-muted)' }}>Reported By:</span>
          <span>{complaint.reportedBy}</span>
        </div>

        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <span style={{ color: 'var(--text-muted)' }}>Assigned Vendor:</span>
          <span className="mono-data" style={{ fontWeight: '700', color: 'var(--precision-blue)' }}>
            {complaint.assignedTo}
          </span>
        </div>

        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <span style={{ color: 'var(--text-muted)' }}>Reported Date:</span>
          <span className="mono-data">{complaint.reportedOn}</span>
        </div>

        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <span style={{ color: 'var(--text-muted)' }}>SLA Target:</span>
          <span className="mono-data" style={{ color: '#16a34a', fontWeight: '700' }}>{complaint.slaDeadline}</span>
        </div>

        <div style={{ padding: '0.65rem', background: 'var(--bg-input)', borderRadius: '4px', borderLeft: '3px solid var(--precision-blue)' }}>
          <div style={{ fontSize: '0.675rem', fontWeight: 800, color: 'var(--text-muted)', textTransform: 'uppercase', marginBottom: '2px' }}>
            PROBLEM DESCRIPTION
          </div>
          <div>{complaint.description}</div>
        </div>
      </div>

      <div className="modal-actions" style={{ marginTop: '1.25rem', justifyContent: 'space-between' }}>
        <div style={{ display: 'flex', gap: '6px' }}>
          {complaint.status !== 'Resolved' && (
            <button className="btn btn-primary btn-sm" onClick={handleResolve}>
              <CheckCircle2 size={12} aria-hidden="true" /> MARK RESOLVED
            </button>
          )}
          {complaint.assignedTo === 'Unassigned' && (
            <button className="btn btn-secondary btn-sm" onClick={handleAssign}>
              <UserPlus size={12} aria-hidden="true" /> ASSIGN VENDOR
            </button>
          )}
        </div>

        <button className="btn btn-secondary btn-sm" onClick={onClose}>
          CLOSE
        </button>
      </div>
    </Modal>
  );
});

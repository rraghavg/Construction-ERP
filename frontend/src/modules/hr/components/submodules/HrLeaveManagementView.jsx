import { memo } from 'react';
import { Calendar, CheckCircle, XCircle } from 'lucide-react';
import { useApp } from '../../../../core/providers/AppContext';

export const HrLeaveManagementView = memo(function HrLeaveManagementView() {
  const { showToast } = useApp();

  const leaveRequests = [
    { id: 'LEV-101', employee: 'Rahul Sharma', type: 'Privilege Leave (PL)', duration: '2 Days (10 Aug - 11 Aug)', reason: 'Personal family event', status: 'PENDING_APPROVAL' },
    { id: 'LEV-102', employee: 'Sneha Patel', type: 'Casual Leave (CL)', duration: '1 Day (04 Aug)', reason: 'Medical appointment', status: 'APPROVED' }
  ];

  return (
    <div className="anodized-panel" style={{ padding: '1.25rem' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem' }}>
        <div>
          <h3 style={{ fontSize: '1rem', fontWeight: 800, display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Calendar size={18} style={{ color: 'var(--precision-blue)' }} />
            Leave Management & Absence Approvals Portal
          </h3>
          <p style={{ fontSize: '0.725rem', color: 'var(--text-muted)', marginTop: '2px' }}>
            Paid leave balances, leave applications, manager approval workflow, and holiday calendar
          </p>
        </div>

        <button className="btn btn-primary btn-sm" onClick={() => showToast('Opened leave application form', 'info')}>
          APPLY FOR LEAVE
        </button>
      </div>

      <div style={{ overflowX: 'auto' }}>
        <table className="table" style={{ width: '100%', fontSize: '0.75rem' }}>
          <thead>
            <tr>
              <th>APPLICATION ID</th>
              <th>EMPLOYEE</th>
              <th>LEAVE CATEGORY</th>
              <th>LEAVE DATES</th>
              <th>REASON</th>
              <th>STATUS</th>
              <th>ACTION</th>
            </tr>
          </thead>
          <tbody>
            {leaveRequests.map((l) => (
              <tr key={l.id}>
                <td className="mono-data" style={{ fontWeight: 700, color: 'var(--precision-blue)' }}>{l.id}</td>
                <td style={{ fontWeight: 700 }}>{l.employee}</td>
                <td><span className="badge badge-info">{l.type}</span></td>
                <td className="mono-data">{l.duration}</td>
                <td style={{ color: 'var(--text-muted)' }}>{l.reason}</td>
                <td><span className={`badge ${l.status === 'APPROVED' ? 'badge-success' : 'badge-warning'}`}>{l.status}</span></td>
                <td>
                  <div style={{ display: 'flex', gap: '4px' }}>
                    <button className="btn btn-success btn-xs" onClick={() => showToast(`Approved leave request ${l.id}`, 'success')}>
                      Approve
                    </button>
                    <button className="btn btn-danger btn-xs" onClick={() => showToast(`Rejected leave request ${l.id}`, 'info')}>
                      Reject
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
});

import { memo } from 'react';
import { Wrench, UserCheck } from 'lucide-react';
import { useApp } from '../../../../core/providers/AppContext';

export const MaintenanceVendorAssignmentsView = memo(function MaintenanceVendorAssignmentsView() {
  const { showToast } = useApp();

  const assignments = [
    { id: 'WO-801', contractor: 'Apex Plumbing Services', task: 'Main Riser Leakage Repair', unit: 'Tower A Riser', SLA: '4 Hours', status: 'IN_PROGRESS', assignedTo: 'Ramesh Plumber' },
    { id: 'WO-802', contractor: 'Otis Elevator Care', task: 'Lift #2 Sensor Calibration', unit: 'Tower B Lift', SLA: '2 Hours', status: 'COMPLETED', assignedTo: 'Otis Service Team' }
  ];

  return (
    <div className="anodized-panel" style={{ padding: '1.25rem' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem' }}>
        <div>
          <h3 style={{ fontSize: '1rem', fontWeight: 800, display: 'flex', alignItems: 'center', gap: '8px' }}>
            <UserCheck size={18} style={{ color: 'var(--precision-blue)' }} />
            Contractor & Vendor Work Order Assignments
          </h3>
          <p style={{ fontSize: '0.725rem', color: 'var(--text-muted)', marginTop: '2px' }}>
            Assign facility technicians, external vendor work orders, and track live repair progress
          </p>
        </div>
      </div>

      <div style={{ overflowX: 'auto' }}>
        <table className="table" style={{ width: '100%', fontSize: '0.75rem' }}>
          <thead>
            <tr>
              <th>WORK ORDER</th>
              <th>CONTRACTOR FIRM</th>
              <th>TASK DESCRIPTION</th>
              <th>LOCATION / UNIT</th>
              <th>SLA TARGET</th>
              <th>ASSIGNED TECHNICIAN</th>
              <th>STATUS</th>
              <th>ACTION</th>
            </tr>
          </thead>
          <tbody>
            {assignments.map((a) => (
              <tr key={a.id}>
                <td className="mono-data" style={{ fontWeight: 700, color: 'var(--precision-blue)' }}>{a.id}</td>
                <td style={{ fontWeight: 700 }}>{a.contractor}</td>
                <td>{a.task}</td>
                <td className="mono-data">{a.unit}</td>
                <td className="mono-data">{a.SLA}</td>
                <td>{a.assignedTo}</td>
                <td><span className={`badge ${a.status === 'COMPLETED' ? 'badge-success' : 'badge-warning'}`}>{a.status}</span></td>
                <td>
                  <button className="btn btn-secondary btn-xs" onClick={() => showToast(`Updated work order ${a.id}`, 'success')}>
                    Update Order
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

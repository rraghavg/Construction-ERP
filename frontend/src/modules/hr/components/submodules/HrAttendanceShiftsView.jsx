import { memo } from 'react';
import { Clock, CheckCircle, AlertTriangle } from 'lucide-react';
import { useApp } from '../../../../core/providers/AppContext';

export const HrAttendanceShiftsView = memo(function HrAttendanceShiftsView() {
  const { employees, showToast } = useApp();

  const attendance = employees.map((e, idx) => ({
    empId: e.id,
    name: e.name,
    shift: 'General (09:30 AM - 06:30 PM)',
    checkIn: '09:24 AM',
    checkOut: '06:35 PM',
    status: idx % 4 === 0 ? 'LATE_ARRIVING' : 'PRESENT',
    otHours: idx % 3 === 0 ? '1.5 hrs' : '0.0 hrs'
  }));

  return (
    <div className="anodized-panel" style={{ padding: '1.25rem' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem' }}>
        <div>
          <h3 style={{ fontSize: '1rem', fontWeight: 800, display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Clock size={18} style={{ color: 'var(--precision-blue)' }} />
            Biometric Attendance & Shift Roster Tracker
          </h3>
          <p style={{ fontSize: '0.725rem', color: 'var(--text-muted)', marginTop: '2px' }}>
            Daily biometric check-in/out logs, shift rosters, late mark rules, and overtime calculations
          </p>
        </div>

        <button className="btn btn-secondary btn-sm" onClick={() => showToast('Synced biometric attendance feed', 'info')}>
          SYNC BIOMETRIC FEED
        </button>
      </div>

      <div style={{ overflowX: 'auto' }}>
        <table className="table" style={{ width: '100%', fontSize: '0.75rem' }}>
          <thead>
            <tr>
              <th>EMP ID</th>
              <th>EMPLOYEE NAME</th>
              <th>ASSIGNED SHIFT</th>
              <th>CHECK IN TIME</th>
              <th>CHECK OUT TIME</th>
              <th>OVERTIME</th>
              <th>ATTENDANCE STATUS</th>
            </tr>
          </thead>
          <tbody>
            {attendance.map((a) => (
              <tr key={a.empId}>
                <td className="mono-data" style={{ fontWeight: 700, color: 'var(--precision-blue)' }}>{a.empId}</td>
                <td style={{ fontWeight: 700 }}>{a.name}</td>
                <td>{a.shift}</td>
                <td className="mono-data">{a.checkIn}</td>
                <td className="mono-data">{a.checkOut}</td>
                <td className="mono-data">{a.otHours}</td>
                <td>
                  <span className={`badge ${a.status === 'PRESENT' ? 'badge-success' : 'badge-warning'}`}>
                    {a.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
});

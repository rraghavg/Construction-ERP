import { memo } from 'react';
import { ShieldAlert, CheckCircle, XCircle } from 'lucide-react';
import { useApp } from '../../../../core/providers/AppContext';

export const UserMgmtLoginActivityView = memo(function UserMgmtLoginActivityView() {
  const { showToast } = useApp();

  const logs = [
    { id: 'LOG-9912', user: 'Rahul Sharma', email: 'rahul@abcdevelopers.com', ip: '103.22.18.44', location: 'Mumbai, IN', time: '05 Aug 2026, 09:14 AM', status: 'SUCCESS' },
    { id: 'LOG-9913', user: 'Sneha Patel', email: 'sneha@abcdevelopers.com', ip: '115.112.4.90', location: 'Pune, IN', time: '05 Aug 2026, 08:30 AM', status: 'SUCCESS' },
    { id: 'LOG-9914', user: 'Unknown', email: 'hacker@test.com', ip: '185.220.101.5', location: 'Unknown Proxy', time: '04 Aug 2026, 11:45 PM', status: 'FAILED_BAD_PASSWORD' }
  ];

  return (
    <div className="anodized-panel" style={{ padding: '1.25rem' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem' }}>
        <div>
          <h3 style={{ fontSize: '1rem', fontWeight: 800, display: 'flex', alignItems: 'center', gap: '8px' }}>
            <ShieldAlert size={18} style={{ color: 'var(--precision-blue)' }} />
            User Login Activity & Security Audit Log
          </h3>
          <p style={{ fontSize: '0.725rem', color: 'var(--text-muted)', marginTop: '2px' }}>
            IP address tracking, failed login attempts alerts, and session device audit logs
          </p>
        </div>
      </div>

      <div style={{ overflowX: 'auto' }}>
        <table className="table" style={{ width: '100%', fontSize: '0.75rem' }}>
          <thead>
            <tr>
              <th>LOG REF NO.</th>
              <th>USER ACCOUNT</th>
              <th>IP ADDRESS</th>
              <th>LOCATION</th>
              <th>TIMESTAMP</th>
              <th>LOGIN RESULT</th>
            </tr>
          </thead>
          <tbody>
            {logs.map((l) => (
              <tr key={l.id}>
                <td className="mono-data" style={{ fontWeight: 700, color: 'var(--precision-blue)' }}>{l.id}</td>
                <td>
                  <div style={{ fontWeight: 700 }}>{l.user}</div>
                  <div style={{ fontSize: '0.675rem', color: 'var(--text-muted)' }}>{l.email}</div>
                </td>
                <td className="mono-data">{l.ip}</td>
                <td>{l.location}</td>
                <td className="mono-data">{l.time}</td>
                <td>
                  <span className={`badge ${l.status === 'SUCCESS' ? 'badge-success' : 'badge-danger'}`}>
                    {l.status}
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

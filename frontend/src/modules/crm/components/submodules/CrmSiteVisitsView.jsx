import { memo } from 'react';
import { useApp } from '../../../../core/providers/AppContext';
import { Compass, Car, Calendar, CheckCircle, Clock, UserCheck } from 'lucide-react';

export const CrmSiteVisitsView = memo(function CrmSiteVisitsView() {
  const { leads, showToast } = useApp();

  const siteVisits = [
    { id: 'SV-901', leadName: 'Rajesh Kumar', project: 'Green Heights', wing: 'Wing A - 402', date: 'Today, 2:00 PM', driver: 'Suresh Driver', status: 'COMPLETED', feedback: 'Extremely positive. Liked East balcony.' },
    { id: 'SV-902', leadName: 'Priya Sharma', project: 'Sunshine Towers', wing: 'Tower 2 - 1204', date: 'Today, 4:30 PM', driver: 'Ramesh Cab', status: 'CONFIRMED', feedback: 'Cab dispatched for pickup.' },
    { id: 'SV-903', leadName: 'Amit Shah', project: 'Prime Residency', wing: 'Block B - 104', date: 'Tomorrow, 11:00 AM', driver: 'Self Drive', status: 'SCHEDULED', feedback: 'Requested parking slot preview.' }
  ];

  return (
    <div className="anodized-panel" style={{ padding: '1.25rem' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem' }}>
        <div>
          <h3 style={{ fontSize: '1rem', fontWeight: 800, display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Compass size={18} style={{ color: 'var(--precision-blue)' }} />
            Site Visits & Transport Dispatch Register
          </h3>
          <p style={{ fontSize: '0.725rem', color: 'var(--text-muted)', marginTop: '2px' }}>
            Manage site inspection appointments, pickup cabs, and customer visit feedback
          </p>
        </div>

        <button className="btn btn-primary btn-sm" onClick={() => showToast('Scheduled new site visit pickup', 'info')}>
          <Car size={14} /> SCHEDULE SITE VISIT
        </button>
      </div>

      <div style={{ overflowX: 'auto' }}>
        <table className="table" style={{ width: '100%', fontSize: '0.75rem' }}>
          <thead>
            <tr>
              <th>VISIT ID</th>
              <th>PROSPECT</th>
              <th>TARGET UNIT / PROJECT</th>
              <th>DATE & TIME</th>
              <th>TRANSPORT / DRIVER</th>
              <th>STATUS</th>
              <th>FEEDBACK / NOTES</th>
              <th>ACTION</th>
            </tr>
          </thead>
          <tbody>
            {siteVisits.map((v) => (
              <tr key={v.id}>
                <td className="mono-data" style={{ fontWeight: 700, color: 'var(--precision-blue)' }}>{v.id}</td>
                <td style={{ fontWeight: 700 }}>{v.leadName}</td>
                <td>{v.project} ({v.wing})</td>
                <td className="mono-data">{v.date}</td>
                <td><Car size={11} style={{ display: 'inline', marginRight: '4px' }} />{v.driver}</td>
                <td>
                  <span className={`badge ${v.status === 'COMPLETED' ? 'badge-success' : v.status === 'CONFIRMED' ? 'badge-info' : 'badge-warning'}`}>
                    {v.status}
                  </span>
                </td>
                <td style={{ color: 'var(--text-muted)' }}>{v.feedback}</td>
                <td>
                  <button className="btn btn-secondary btn-xs" onClick={() => showToast(`Updated visit feedback for ${v.id}`, 'success')}>
                    Update Log
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

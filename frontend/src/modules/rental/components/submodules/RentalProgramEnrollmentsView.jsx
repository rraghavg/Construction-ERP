import { memo, useState } from 'react';
import { ShieldCheck, Search, Filter } from 'lucide-react';
import { useApp } from '../../../../core/providers/AppContext';

export const RentalProgramEnrollmentsView = memo(function RentalProgramEnrollmentsView() {
  const { showToast } = useApp();

  const [enrollments] = useState([
    { id: 'ENR-1001', owner: 'Dr. Ramesh Iyer', unit: 'Flat 101, Tower A', program: 'RENTAL_PROGRAM', status: 'Active', enrolledDate: '15 Jul 2026' },
    { id: 'ENR-1002', owner: 'Sunita Menon', unit: 'Villa 08, Block C', program: 'MAINTENANCE_ONLY', status: 'Active', enrolledDate: '20 Jul 2026' },
    { id: 'ENR-1003', owner: 'Anand Verma', unit: 'Flat 405, Tower B', program: 'RENTAL_PROGRAM', status: 'Pending Verification', enrolledDate: '01 Aug 2026' }
  ]);

  return (
    <div className="anodized-panel" style={{ padding: '1.25rem' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem' }}>
        <div>
          <h3 style={{ fontSize: '1rem', fontWeight: 800, display: 'flex', alignItems: 'center', gap: '8px' }}>
            <ShieldCheck size={18} style={{ color: 'var(--precision-blue)' }} />
            Program Enrollments
          </h3>
          <p style={{ fontSize: '0.725rem', color: 'var(--text-muted)', marginTop: '2px' }}>
            Manage Assured Rental & Direct Maintenance opt-ins for sold properties
          </p>
        </div>
        <div style={{ display: 'flex', gap: '0.5rem' }}>
          <div className="search-bar" style={{ display: 'flex', alignItems: 'center', background: 'var(--m3-surface-container-low)', padding: '0.35rem 0.75rem', borderRadius: 'var(--radius-full)' }}>
            <Search size={14} style={{ color: 'var(--text-muted)', marginRight: '0.5rem' }} />
            <input type="text" placeholder="Search enrollments..." style={{ border: 'none', background: 'transparent', outline: 'none', fontSize: '0.75rem', color: 'var(--m3-on-surface)' }} />
          </div>
          <button className="btn btn-secondary btn-sm">
            <Filter size={14} /> FILTER
          </button>
        </div>
      </div>

      <div className="table-responsive">
        <table className="table">
          <thead>
            <tr>
              <th>ENROLLMENT ID</th>
              <th>OWNER NAME</th>
              <th>UNIT</th>
              <th>PROGRAM TYPE</th>
              <th>STATUS</th>
              <th>ENROLLED DATE</th>
              <th>ACTIONS</th>
            </tr>
          </thead>
          <tbody>
            {enrollments.map((enr) => (
              <tr key={enr.id}>
                <td className="mono-data" style={{ fontWeight: 700, color: 'var(--precision-blue)' }}>{enr.id}</td>
                <td style={{ fontWeight: 700 }}>{enr.owner}</td>
                <td className="mono-data">{enr.unit}</td>
                <td>
                  {enr.program === 'RENTAL_PROGRAM' && <span className="badge badge-success">Assured Rental</span>}
                  {enr.program === 'MAINTENANCE_ONLY' && <span className="badge badge-warning">Maintenance Only</span>}
                </td>
                <td>
                  {enr.status === 'Active' ? (
                    <span style={{ color: 'var(--emerald)', fontWeight: 600, fontSize: '0.75rem' }}>• {enr.status}</span>
                  ) : (
                    <span style={{ color: 'var(--amber)', fontWeight: 600, fontSize: '0.75rem' }}>• {enr.status}</span>
                  )}
                </td>
                <td className="mono-data">{enr.enrolledDate}</td>
                <td>
                  <button className="btn btn-text btn-xs" onClick={() => showToast(`Viewing enrollment ${enr.id}`, 'info')}>View</button>
                  <button className="btn btn-text btn-xs" onClick={() => showToast(`Modifying enrollment ${enr.id}`, 'info')}>Modify</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
});

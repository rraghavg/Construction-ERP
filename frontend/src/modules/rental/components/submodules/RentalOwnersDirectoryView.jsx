import { memo } from 'react';
import { KeyRound, Users, Plus, Download } from 'lucide-react';
import { useApp } from '../../../../core/providers/AppContext';

export const RentalOwnersDirectoryView = memo(function RentalOwnersDirectoryView() {
  const { showToast } = useApp();

  const owners = [
    { id: 'OWN-101', name: 'Dr. Ramesh Iyer', units: '3 Units (A-102, B-404, T1-901)', phone: '+91 98200 11223', email: 'r.iyer@gmail.com', bank: 'HDFC Bank ****4091', totalRent: '₹ 1,15,000/mo' },
    { id: 'OWN-102', name: 'Sunita Menon', units: '1 Unit (C-201)', phone: '+91 98211 44556', email: 'sunita.m@yahoo.com', bank: 'ICICI Bank ****8821', totalRent: '₹ 38,000/mo' }
  ];

  return (
    <div className="anodized-panel" style={{ padding: '1.25rem' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem' }}>
        <div>
          <h3 style={{ fontSize: '1rem', fontWeight: 800, display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Users size={18} style={{ color: 'var(--precision-blue)' }} />
            Property Owners & Landlords Directory
          </h3>
          <p style={{ fontSize: '0.725rem', color: 'var(--text-muted)', marginTop: '2px' }}>
            Landlord contact database, unit portfolio mapping, and bank payout details
          </p>
        </div>

        <button className="btn btn-primary btn-sm" onClick={() => showToast('Opened owner onboarding modal', 'info')}>
          <Plus size={14} /> ADD OWNER
        </button>
      </div>

      <div style={{ overflowX: 'auto' }}>
        <table className="table" style={{ width: '100%', fontSize: '0.75rem' }}>
          <thead>
            <tr>
              <th>OWNER ID</th>
              <th>OWNER NAME</th>
              <th>RENTAL PORTFOLIO UNITS</th>
              <th>CONTACT DETAILS</th>
              <th>PAYOUT BANK ACCOUNT</th>
              <th>TOTAL MONTHLY RENT</th>
              <th>ACTION</th>
            </tr>
          </thead>
          <tbody>
            {owners.map((o) => (
              <tr key={o.id}>
                <td className="mono-data" style={{ fontWeight: 700, color: 'var(--precision-blue)' }}>{o.id}</td>
                <td style={{ fontWeight: 700 }}>{o.name}</td>
                <td className="mono-data">{o.units}</td>
                <td>{o.phone} • {o.email}</td>
                <td className="mono-data">{o.bank}</td>
                <td className="mono-data" style={{ color: 'var(--emerald)', fontWeight: 700 }}>{o.totalRent}</td>
                <td>
                  <button className="btn btn-secondary btn-xs" onClick={() => showToast(`Downloaded statement for ${o.name}`, 'success')}>
                    Statement
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

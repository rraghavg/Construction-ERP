import { memo } from 'react';
import { Users, UserPlus } from 'lucide-react';
import { useApp } from '../../../../core/providers/AppContext';

export const CustomerNomineesView = memo(function CustomerNomineesView() {
  const { customers, showToast } = useApp();

  const nominees = customers.map((c, idx) => ({
    id: `NOM-${200 + idx}`,
    customerName: c.name,
    unit: c.unit,
    nomineeName: idx % 2 === 0 ? 'Sunita Kumar' : 'Rohan Sharma',
    relation: idx % 2 === 0 ? 'Spouse (Wife)' : 'Son',
    contact: '+91 98765 11223',
    share: '100%'
  }));

  return (
    <div className="anodized-panel" style={{ padding: '1.25rem' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem' }}>
        <div>
          <h3 style={{ fontSize: '1rem', fontWeight: 800, display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Users size={18} style={{ color: 'var(--precision-blue)' }} />
            Customer Co-Owners & Nominees Registry
          </h3>
          <p style={{ fontSize: '0.725rem', color: 'var(--text-muted)', marginTop: '2px' }}>
            Legal co-buyers, primary nominee declarations, and inheritance ownership share percentages
          </p>
        </div>
      </div>

      <div style={{ overflowX: 'auto' }}>
        <table className="table" style={{ width: '100%', fontSize: '0.75rem' }}>
          <thead>
            <tr>
              <th>REGISTRATION ID</th>
              <th>PRIMARY BUYER</th>
              <th>ASSIGNED UNIT</th>
              <th>NOMINEE / CO-OWNER NAME</th>
              <th>RELATIONSHIP</th>
              <th>CONTACT PHONE</th>
              <th>OWNERSHIP SHARE</th>
            </tr>
          </thead>
          <tbody>
            {nominees.map((n) => (
              <tr key={n.id}>
                <td className="mono-data" style={{ fontWeight: 700, color: 'var(--precision-blue)' }}>{n.id}</td>
                <td style={{ fontWeight: 700 }}>{n.customerName}</td>
                <td className="mono-data">{n.unit}</td>
                <td style={{ fontWeight: 700 }}>{n.nomineeName}</td>
                <td>{n.relation}</td>
                <td className="mono-data">{n.contact}</td>
                <td><span className="badge badge-info mono-data">{n.share}</span></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
});

import { memo } from 'react';
import { Users, Star } from 'lucide-react';
import { useApp } from '../../../../core/providers/AppContext';

export const InventorySuppliersDirectoryView = memo(function InventorySuppliersDirectoryView() {
  const { showToast } = useApp();

  const suppliers = [
    { id: 'SUP-101', name: 'UltraTech Cement Ltd.', category: 'Cement & Concrete', phone: '+91 98200 44551', rating: '4.9 ★', status: 'EMPANELLED' },
    { id: 'SUP-102', name: 'Tata Tiscon Steel', category: 'TMT Steel Bars', phone: '+91 98211 99882', rating: '4.8 ★', status: 'EMPANELLED' }
  ];

  return (
    <div className="anodized-panel" style={{ padding: '1.25rem' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem' }}>
        <div>
          <h3 style={{ fontSize: '1rem', fontWeight: 800, display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Users size={18} style={{ color: 'var(--precision-blue)' }} />
            Suppliers & Material Vendors Directory
          </h3>
          <p style={{ fontSize: '0.725rem', color: 'var(--text-muted)', marginTop: '2px' }}>
            Empanelled material suppliers, performance ratings, and vendor catalog pricing
          </p>
        </div>
      </div>

      <div style={{ overflowX: 'auto' }}>
        <table className="table" style={{ width: '100%', fontSize: '0.75rem' }}>
          <thead>
            <tr>
              <th>SUPPLIER ID</th>
              <th>VENDOR / SUPPLIER NAME</th>
              <th>SUPPLY CATEGORY</th>
              <th>CONTACT PHONE</th>
              <th>QUALITY RATING</th>
              <th>STATUS</th>
              <th>ACTION</th>
            </tr>
          </thead>
          <tbody>
            {suppliers.map((s) => (
              <tr key={s.id}>
                <td className="mono-data" style={{ fontWeight: 700, color: 'var(--precision-blue)' }}>{s.id}</td>
                <td style={{ fontWeight: 700 }}>{s.name}</td>
                <td>{s.category}</td>
                <td className="mono-data">{s.phone}</td>
                <td><span className="badge badge-warning mono-data">{s.rating}</span></td>
                <td><span className="badge badge-success">{s.status}</span></td>
                <td>
                  <button className="btn btn-secondary btn-xs" onClick={() => showToast(`Created PO for ${s.name}`, 'info')}>
                    Issue PO
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

import { memo } from 'react';
import { Key, ShieldCheck, CheckCircle } from 'lucide-react';
import { useApp } from '../../../../core/providers/AppContext';

export const SalesPossessionView = memo(function SalesPossessionView() {
  const { showToast } = useApp();

  const possessionList = [
    { id: 'POS-101', customer: 'Amit Shah', unit: 'B-104', project: 'Prime Residency', OCStatus: 'OC RECEIVED', duesCleared: true, keysHandedOver: true, handoverDate: '20 Jul 2026' },
    { id: 'POS-102', customer: 'Suresh Patil', unit: 'A-201', project: 'Green Heights', OCStatus: 'APPLIED FOR OC', duesCleared: false, keysHandedOver: false, handoverDate: 'Expected Oct 2026' }
  ];

  return (
    <div className="anodized-panel" style={{ padding: '1.25rem' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem' }}>
        <div>
          <h3 style={{ fontSize: '1rem', fontWeight: 800, display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Key size={18} style={{ color: 'var(--precision-blue)' }} />
            Possession Handover & Key Allocation Hub
          </h3>
          <p style={{ fontSize: '0.725rem', color: 'var(--text-muted)', marginTop: '2px' }}>
            Occupancy Certificate (OC) tracking, 100% dues clearance verification, and physical key handover
          </p>
        </div>
      </div>

      <div style={{ overflowX: 'auto' }}>
        <table className="table" style={{ width: '100%', fontSize: '0.75rem' }}>
          <thead>
            <tr>
              <th>POSSESSION ID</th>
              <th>CUSTOMER</th>
              <th>UNIT & PROJECT</th>
              <th>OC STATUS</th>
              <th>DUES CLEARANCE</th>
              <th>KEYS HANDED OVER</th>
              <th>HANDOVER DATE</th>
              <th>ACTION</th>
            </tr>
          </thead>
          <tbody>
            {possessionList.map((p) => (
              <tr key={p.id}>
                <td className="mono-data" style={{ fontWeight: 700, color: 'var(--precision-blue)' }}>{p.id}</td>
                <td style={{ fontWeight: 700 }}>{p.customer}</td>
                <td>{p.unit} ({p.project})</td>
                <td><span className="badge badge-info">{p.OCStatus}</span></td>
                <td><span className={`badge ${p.duesCleared ? 'badge-success' : 'badge-danger'}`}>{p.duesCleared ? 'CLEARED' : 'DUES PENDING'}</span></td>
                <td><span className={`badge ${p.keysHandedOver ? 'badge-success' : 'badge-warning'}`}>{p.keysHandedOver ? 'YES' : 'PENDING'}</span></td>
                <td className="mono-data">{p.handoverDate}</td>
                <td>
                  <button className="btn btn-secondary btn-xs" onClick={() => showToast(`Generated Possession Intimation for ${p.id}`, 'info')}>
                    Handover Notice
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

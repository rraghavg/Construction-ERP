import { memo } from 'react';
import { KeyRound, CheckSquare } from 'lucide-react';
import { useApp } from '../../../../core/providers/AppContext';

export const CustomerPossessionHandoverView = memo(function CustomerPossessionHandoverView() {
  const { showToast } = useApp();

  const handovers = [
    { id: 'HO-101', customer: 'Amit Shah', unit: 'B-104', OC: 'RECEIVED', keyGiven: true, ElectricalCheck: true, PlumbingCheck: true, date: '20 Jul 2026' }
  ];

  return (
    <div className="anodized-panel" style={{ padding: '1.25rem' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem' }}>
        <div>
          <h3 style={{ fontSize: '1rem', fontWeight: 800, display: 'flex', alignItems: 'center', gap: '8px' }}>
            <KeyRound size={18} style={{ color: 'var(--precision-blue)' }} />
            Possession Checklist & Handover Verification
          </h3>
          <p style={{ fontSize: '0.725rem', color: 'var(--text-muted)', marginTop: '2px' }}>
            Final unit walkthrough checklist, electrical/plumbing inspection sign-offs, and key handover
          </p>
        </div>
      </div>

      <div style={{ overflowX: 'auto' }}>
        <table className="table" style={{ width: '100%', fontSize: '0.75rem' }}>
          <thead>
            <tr>
              <th>HANDOVER ID</th>
              <th>CUSTOMER</th>
              <th>UNIT</th>
              <th>OC CERTIFICATE</th>
              <th>INSPECTION CHECKLIST</th>
              <th>KEYS DISPATCHED</th>
              <th>DATE</th>
              <th>ACTION</th>
            </tr>
          </thead>
          <tbody>
            {handovers.map((h) => (
              <tr key={h.id}>
                <td className="mono-data" style={{ fontWeight: 700, color: 'var(--precision-blue)' }}>{h.id}</td>
                <td style={{ fontWeight: 700 }}>{h.customer}</td>
                <td className="mono-data">{h.unit}</td>
                <td><span className="badge badge-success">{h.OC}</span></td>
                <td><span className="badge badge-success">100% PASSED</span></td>
                <td><span className="badge badge-success">YES</span></td>
                <td className="mono-data">{h.date}</td>
                <td>
                  <button className="btn btn-secondary btn-xs" onClick={() => showToast(`Printed handover certificate ${h.id}`, 'success')}>
                    Print Certificate
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

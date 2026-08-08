import { memo } from 'react';
import { FileText, Download } from 'lucide-react';
import { useApp } from '../../../../core/providers/AppContext';

export const CustomerNocCertificatesView = memo(function CustomerNocCertificatesView() {
  const { showToast } = useApp();

  const nocList = [
    { id: 'NOC-2026-701', customer: 'Rajesh Kumar', unit: 'A-402', type: 'Bank Home Loan NOC (HDFC Bank)', status: 'ISSUED', date: '12 Jul 2026' },
    { id: 'NOC-2026-702', customer: 'Priya Sharma', unit: 'T2-1204', type: 'Mortgage Clearance NOC', status: 'PENDING_APPROVAL', date: '01 Aug 2026' }
  ];

  return (
    <div className="anodized-panel" style={{ padding: '1.25rem' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem' }}>
        <div>
          <h3 style={{ fontSize: '1rem', fontWeight: 800, display: 'flex', alignItems: 'center', gap: '8px' }}>
            <FileText size={18} style={{ color: 'var(--precision-blue)' }} />
            No Objection Certificates (NOC) Issuer
          </h3>
          <p style={{ fontSize: '0.725rem', color: 'var(--text-muted)', marginTop: '2px' }}>
            Issue bank home loan NOCs, tri-party agreements, mortgage clearance, and resale transfer NOCs
          </p>
        </div>

        <button className="btn btn-primary btn-sm" onClick={() => showToast('Generated NOC certificate draft', 'info')}>
          ISSUE NEW NOC
        </button>
      </div>

      <div style={{ overflowX: 'auto' }}>
        <table className="table" style={{ width: '100%', fontSize: '0.75rem' }}>
          <thead>
            <tr>
              <th>NOC REF NO.</th>
              <th>CUSTOMER</th>
              <th>UNIT</th>
              <th>NOC TYPE</th>
              <th>STATUS</th>
              <th>ISSUE DATE</th>
              <th>ACTION</th>
            </tr>
          </thead>
          <tbody>
            {nocList.map((n) => (
              <tr key={n.id}>
                <td className="mono-data" style={{ fontWeight: 700, color: 'var(--precision-blue)' }}>{n.id}</td>
                <td style={{ fontWeight: 700 }}>{n.customer}</td>
                <td className="mono-data">{n.unit}</td>
                <td>{n.type}</td>
                <td><span className={`badge ${n.status === 'ISSUED' ? 'badge-success' : 'badge-warning'}`}>{n.status}</span></td>
                <td className="mono-data">{n.date}</td>
                <td>
                  <button className="btn btn-secondary btn-xs" onClick={() => showToast(`Downloaded NOC PDF ${n.id}`, 'success')}>
                    <Download size={11} /> PDF NOC
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

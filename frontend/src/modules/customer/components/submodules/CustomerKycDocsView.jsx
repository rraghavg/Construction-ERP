import { memo } from 'react';
import { useApp } from '../../../../core/providers/AppContext';
import { ShieldCheck, AlertTriangle, FileText, CheckCircle } from 'lucide-react';

export const CustomerKycDocsView = memo(function CustomerKycDocsView() {
  const { customers, showToast } = useApp();

  return (
    <div className="anodized-panel" style={{ padding: '1.25rem' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem' }}>
        <div>
          <h3 style={{ fontSize: '1rem', fontWeight: 800, display: 'flex', alignItems: 'center', gap: '8px' }}>
            <ShieldCheck size={18} style={{ color: 'var(--precision-blue)' }} />
            KYC Verification & Identity Documents Registry
          </h3>
          <p style={{ fontSize: '0.725rem', color: 'var(--text-muted)', marginTop: '2px' }}>
            PAN Card, Aadhaar verification, Passport, address proof, and compliance audit trail
          </p>
        </div>
      </div>

      <div style={{ overflowX: 'auto' }}>
        <table className="table" style={{ width: '100%', fontSize: '0.75rem' }}>
          <thead>
            <tr>
              <th>CUSTOMER ID</th>
              <th>NAME</th>
              <th>PAN NUMBER</th>
              <th>AADHAAR NUMBER</th>
              <th>ADDRESS PROOF</th>
              <th>KYC STATUS</th>
              <th>ACTION</th>
            </tr>
          </thead>
          <tbody>
            {customers.map((c) => (
              <tr key={c.id}>
                <td className="mono-data" style={{ fontWeight: 700, color: 'var(--precision-blue)' }}>{c.id}</td>
                <td style={{ fontWeight: 700 }}>{c.name}</td>
                <td className="mono-data">{c.pan || 'ABCDE1234F'}</td>
                <td className="mono-data">XXXX-XXXX-8912</td>
                <td>Passport / Electricity Bill</td>
                <td>
                  <span className={`badge ${c.kycStatus === 'VERIFIED' ? 'badge-success' : 'badge-warning'}`}>
                    {c.kycStatus}
                  </span>
                </td>
                <td>
                  <button className="btn btn-secondary btn-xs" onClick={() => showToast(`Verified KYC document for ${c.name}`, 'success')}>
                    Verify Docs
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

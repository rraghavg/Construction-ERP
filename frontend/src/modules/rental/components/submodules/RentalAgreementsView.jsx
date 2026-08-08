import { memo } from 'react';
import { FileText, Download } from 'lucide-react';
import { useApp } from '../../../../core/providers/AppContext';

export const RentalAgreementsView = memo(function RentalAgreementsView() {
  const { showToast } = useApp();

  const agreements = [
    { id: 'RAG-2026-01', tenant: 'Anish Deshmukh', owner: 'Dr. Ramesh Iyer', unit: 'A-102', tenure: '11 Months', escalation: '10% Per Annum', status: 'ACTIVE', date: '01 Sep 2025' },
    { id: 'RAG-2026-02', tenant: 'Megha Gupta', owner: 'Dr. Ramesh Iyer', unit: 'B-404', tenure: '11 Months', escalation: '10% Per Annum', status: 'ACTIVE', date: '01 Jan 2026' }
  ];

  return (
    <div className="anodized-panel" style={{ padding: '1.25rem' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem' }}>
        <div>
          <h3 style={{ fontSize: '1rem', fontWeight: 800, display: 'flex', alignItems: 'center', gap: '8px' }}>
            <FileText size={18} style={{ color: 'var(--precision-blue)' }} />
            Leave & License Rental Agreements Vault
          </h3>
          <p style={{ fontSize: '0.725rem', color: 'var(--text-muted)', marginTop: '2px' }}>
            Notarized & registered leave/license agreements, escalation clauses, and lock-in terms
          </p>
        </div>
      </div>

      <div style={{ overflowX: 'auto' }}>
        <table className="table" style={{ width: '100%', fontSize: '0.75rem' }}>
          <thead>
            <tr>
              <th>AGREEMENT NO.</th>
              <th>TENANT</th>
              <th>LANDLORD</th>
              <th>UNIT</th>
              <th>TENURE</th>
              <th>RENT ESCALATION</th>
              <th>STATUS</th>
              <th>ACTION</th>
            </tr>
          </thead>
          <tbody>
            {agreements.map((a) => (
              <tr key={a.id}>
                <td className="mono-data" style={{ fontWeight: 700, color: 'var(--precision-blue)' }}>{a.id}</td>
                <td style={{ fontWeight: 700 }}>{a.tenant}</td>
                <td>{a.owner}</td>
                <td className="mono-data">{a.unit}</td>
                <td>{a.tenure}</td>
                <td className="mono-data">{a.escalation}</td>
                <td><span className="badge badge-success">{a.status}</span></td>
                <td>
                  <button className="btn btn-secondary btn-xs" onClick={() => showToast(`Downloaded agreement PDF ${a.id}`, 'success')}>
                    <Download size={11} /> PDF Agreement
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

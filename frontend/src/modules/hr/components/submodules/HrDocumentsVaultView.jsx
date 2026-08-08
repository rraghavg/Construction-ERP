import { memo } from 'react';
import { FileText, ShieldCheck, Download } from 'lucide-react';
import { useApp } from '../../../../core/providers/AppContext';

export const HrDocumentsVaultView = memo(function HrDocumentsVaultView() {
  const { showToast } = useApp();

  const documents = [
    { id: 'DOC-101', name: 'Rahul Sharma', docType: 'Employment Offer Letter & NDA', verified: true, date: '10 Jan 2024' },
    { id: 'DOC-102', name: 'Rahul Sharma', docType: 'Degree Certificate & Identity Proof', verified: true, date: '10 Jan 2024' },
    { id: 'DOC-103', name: 'Sneha Patel', docType: 'Relieving Certificate & Form 16', verified: true, date: '01 Mar 2025' }
  ];

  return (
    <div className="anodized-panel" style={{ padding: '1.25rem' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem' }}>
        <div>
          <h3 style={{ fontSize: '1rem', fontWeight: 800, display: 'flex', alignItems: 'center', gap: '8px' }}>
            <FileText size={18} style={{ color: 'var(--precision-blue)' }} />
            Staff Employee Documents Vault & Credentials
          </h3>
          <p style={{ fontSize: '0.725rem', color: 'var(--text-muted)', marginTop: '2px' }}>
            Secure repository for employee appointment letters, NDAs, educational credentials, and Form 16
          </p>
        </div>

        <button className="btn btn-primary btn-sm" onClick={() => showToast('Uploaded document to HR vault', 'success')}>
          UPLOAD DOCUMENT
        </button>
      </div>

      <div style={{ overflowX: 'auto' }}>
        <table className="table" style={{ width: '100%', fontSize: '0.75rem' }}>
          <thead>
            <tr>
              <th>DOC ID</th>
              <th>EMPLOYEE NAME</th>
              <th>DOCUMENT DESCRIPTION</th>
              <th>VERIFICATION STATUS</th>
              <th>UPLOAD DATE</th>
              <th>ACTION</th>
            </tr>
          </thead>
          <tbody>
            {documents.map((d) => (
              <tr key={d.id}>
                <td className="mono-data" style={{ fontWeight: 700, color: 'var(--precision-blue)' }}>{d.id}</td>
                <td style={{ fontWeight: 700 }}>{d.name}</td>
                <td>{d.docType}</td>
                <td><span className="badge badge-success">VERIFIED</span></td>
                <td className="mono-data">{d.date}</td>
                <td>
                  <button className="btn btn-secondary btn-xs" onClick={() => showToast(`Downloaded document ${d.id}`, 'success')}>
                    <Download size={11} /> Download PDF
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

import { memo } from 'react';
import { useApp } from '../../../../core/providers/AppContext';
import { FileText, CheckCircle, Clock, ShieldCheck, Download } from 'lucide-react';

export const SalesAgreementsView = memo(function SalesAgreementsView() {
  const { bookings, showToast } = useApp();

  const agreementList = bookings.map((b, idx) => ({
    id: `AGR-2026-${101 + idx}`,
    bookingId: b.id,
    customerName: b.customerName,
    unitNumber: b.unitNumber,
    project: b.project,
    agreementValue: b.agreementValue,
    stampDuty: '₹ 3,45,000',
    registrationStatus: idx % 2 === 0 ? 'REGISTERED' : 'PENDING STAMPING',
    date: '18 Jul 2026'
  }));

  return (
    <div className="anodized-panel" style={{ padding: '1.25rem' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem' }}>
        <div>
          <h3 style={{ fontSize: '1rem', fontWeight: 800, display: 'flex', alignItems: 'center', gap: '8px' }}>
            <FileText size={18} style={{ color: 'var(--precision-blue)' }} />
            Sale Agreements & Legal Registration Hub
          </h3>
          <p style={{ fontSize: '0.725rem', color: 'var(--text-muted)', marginTop: '2px' }}>
            Agreement for sale drafting status, stamp duty verification, sub-registrar registration records
          </p>
        </div>

        <button className="btn btn-primary btn-sm" onClick={() => showToast('Drafting new agreement template...', 'info')}>
          DRAFT NEW AGREEMENT
        </button>
      </div>

      <div style={{ overflowX: 'auto' }}>
        <table className="table" style={{ width: '100%', fontSize: '0.75rem' }}>
          <thead>
            <tr>
              <th>AGREEMENT NO.</th>
              <th>CUSTOMER</th>
              <th>UNIT & PROJECT</th>
              <th>AGREEMENT VALUE</th>
              <th>STAMP DUTY</th>
              <th>REGISTRATION STATUS</th>
              <th>DATE</th>
              <th>ACTION</th>
            </tr>
          </thead>
          <tbody>
            {agreementList.map((a) => (
              <tr key={a.id}>
                <td className="mono-data" style={{ fontWeight: 700, color: 'var(--precision-blue)' }}>{a.id}</td>
                <td style={{ fontWeight: 700 }}>{a.customerName}</td>
                <td>{a.unitNumber} ({a.project})</td>
                <td className="mono-data">₹{a.agreementValue}</td>
                <td className="mono-data">{a.stampDuty}</td>
                <td>
                  <span className={`badge ${a.registrationStatus === 'REGISTERED' ? 'badge-success' : 'badge-warning'}`}>
                    {a.registrationStatus}
                  </span>
                </td>
                <td className="mono-data">{a.date}</td>
                <td>
                  <button className="btn btn-secondary btn-xs" onClick={() => showToast(`Downloaded agreement draft ${a.id}`, 'success')}>
                    <Download size={11} /> PDF Draft
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

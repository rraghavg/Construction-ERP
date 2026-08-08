import { memo } from 'react';
import { FileText, Download } from 'lucide-react';
import { useApp } from '../../../../core/providers/AppContext';

export const FinanceTaxesGstTdsView = memo(function FinanceTaxesGstTdsView() {
  const { showToast } = useApp();

  const taxLedgers = [
    { period: 'July 2026', type: 'GSTR-3B (Output GST 5% Real Estate)', collected: '₹ 18,40,000', inputCredit: '₹ 12,10,000', netPayable: '₹ 6,30,000', status: 'FILED' },
    { period: 'Q1 FY26', type: 'TDS Section 194C (Contractor TDS)', collected: '₹ 4,50,000', inputCredit: 'N/A', netPayable: '₹ 4,50,000', status: 'PAID' }
  ];

  return (
    <div className="anodized-panel" style={{ padding: '1.25rem' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem' }}>
        <div>
          <h3 style={{ fontSize: '1rem', fontWeight: 800, display: 'flex', alignItems: 'center', gap: '8px' }}>
            <FileText size={18} style={{ color: 'var(--precision-blue)' }} />
            GST & TDS Statutory Tax Compliance Ledger
          </h3>
          <p style={{ fontSize: '0.725rem', color: 'var(--text-muted)', marginTop: '2px' }}>
            Output/Input GST ITC reconciliation, Section 194C TDS deductions, and Form 26Q filing
          </p>
        </div>
      </div>

      <div style={{ overflowX: 'auto' }}>
        <table className="table" style={{ width: '100%', fontSize: '0.75rem' }}>
          <thead>
            <tr>
              <th>RETURN PERIOD</th>
              <th>TAX HEAD / TYPE</th>
              <th>OUTPUT TAX COLLECTED</th>
              <th>INPUT TAX CREDIT (ITC)</th>
              <th>NET TAX PAYABLE</th>
              <th>FILING STATUS</th>
              <th>ACTION</th>
            </tr>
          </thead>
          <tbody>
            {taxLedgers.map((t) => (
              <tr key={t.type}>
                <td className="mono-data">{t.period}</td>
                <td style={{ fontWeight: 700 }}>{t.type}</td>
                <td className="mono-data">{t.collected}</td>
                <td className="mono-data" style={{ color: 'var(--emerald)' }}>{t.inputCredit}</td>
                <td className="mono-data" style={{ fontWeight: 700 }}>{t.netPayable}</td>
                <td><span className="badge badge-success">{t.status}</span></td>
                <td>
                  <button className="btn btn-secondary btn-xs" onClick={() => showToast(`Downloaded Form 26Q statement`, 'success')}>
                    <Download size={11} /> Return Summary
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

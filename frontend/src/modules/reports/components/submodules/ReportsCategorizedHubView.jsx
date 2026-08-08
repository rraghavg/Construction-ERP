import { memo } from 'react';
import { BarChart3, Download, FileText } from 'lucide-react';
import { useApp } from '../../../../core/providers/AppContext';

export const ReportsCategorizedHubView = memo(function ReportsCategorizedHubView({ categoryTitle }) {
  const { showToast } = useApp();

  const reportsList = [
    { id: 'RPT-101', name: `${categoryTitle || 'Business'} Monthly Performance Audit`, format: 'PDF / Excel', generated: '05 Aug 2026', size: '2.4 MB' },
    { id: 'RPT-102', name: `${categoryTitle || 'Executive'} Quarterly Financial Variance`, format: 'Excel Sheet', generated: '01 Aug 2026', size: '4.1 MB' },
    { id: 'RPT-103', name: `${categoryTitle || 'Operational'} Comparative Analysis (YoY)`, format: 'PDF Document', generated: '28 Jul 2026', size: '1.8 MB' }
  ];

  return (
    <div className="anodized-panel" style={{ padding: '1.25rem' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem' }}>
        <div>
          <h3 style={{ fontSize: '1rem', fontWeight: 800, display: 'flex', alignItems: 'center', gap: '8px' }}>
            <BarChart3 size={18} style={{ color: 'var(--precision-blue)' }} />
            {categoryTitle || 'Module Reports'} Center
          </h3>
          <p style={{ fontSize: '0.725rem', color: 'var(--text-muted)', marginTop: '2px' }}>
            Automated intelligence reports, exportable PDF/Excel balance sheets, and audit statements
          </p>
        </div>

        <button className="btn btn-primary btn-sm" onClick={() => showToast(`Generated new ${categoryTitle} snapshot`, 'success')}>
          GENERATE LIVE REPORT
        </button>
      </div>

      <div style={{ overflowX: 'auto' }}>
        <table className="table" style={{ width: '100%', fontSize: '0.75rem' }}>
          <thead>
            <tr>
              <th>REPORT CODE</th>
              <th>REPORT TITLE</th>
              <th>EXPORT FORMAT</th>
              <th>LAST GENERATED</th>
              <th>FILE SIZE</th>
              <th>ACTION</th>
            </tr>
          </thead>
          <tbody>
            {reportsList.map((r) => (
              <tr key={r.id}>
                <td className="mono-data" style={{ fontWeight: 700, color: 'var(--precision-blue)' }}>{r.id}</td>
                <td style={{ fontWeight: 700 }}>{r.name}</td>
                <td><span className="badge badge-info mono-data">{r.format}</span></td>
                <td className="mono-data">{r.generated}</td>
                <td className="mono-data">{r.size}</td>
                <td>
                  <button className="btn btn-secondary btn-xs" onClick={() => showToast(`Exported ${r.name}`, 'success')}>
                    <Download size={11} /> Download
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

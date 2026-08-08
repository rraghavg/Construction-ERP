import { useState, memo } from 'react';
import { useApp } from '../../../core/providers/AppContext';
import { SubmoduleNavHeader } from '../../../shared/components/SubmoduleNavHeader';
import { FileText, Download, Upload, Plus, Folder, Search } from 'lucide-react';

export const DocMgmtDashboardView = memo(function DocMgmtDashboardView() {
  const { activeSubmodule, showToast } = useApp();
  const [searchTerm, setSearchTerm] = useState('');

  const documents = [
    { id: 'DOC-ARCH-01', title: 'Tower B Structural Architectural Blueprint (Rev 4)', category: 'Architectural Plans', project: 'Green Heights', uploadedBy: 'Chief Architect Verma', date: '02 Aug 2026', size: '14.2 MB' },
    { id: 'DOC-CONT-88', title: 'L&T Civil Construction Master Contractor Agreement', category: 'Approved Contracts', project: 'Sunshine Towers', uploadedBy: 'Legal Dept', date: '28 Jul 2026', size: '6.5 MB' },
    { id: 'DOC-LEGL-12', title: 'Environmental RERA Compliance Certificate 2026', category: 'Legal Documents', project: 'All Projects', uploadedBy: 'Compliance Officer', date: '15 Jul 2026', size: '2.1 MB' },
    { id: 'DOC-CLNT-901', title: 'Customer Agreement Copy & Identity KYC Bundle', category: 'Client Files', project: 'Green Heights Unit 402', uploadedBy: 'Sales Operations', date: '04 Aug 2026', size: '8.4 MB' }
  ];

  const filteredDocs = documents.filter((d) => {
    const matchesCategory = !activeSubmodule || activeSubmodule === 'Document Management' || d.category === activeSubmodule || activeSubmodule === 'Main Overview';
    const matchesSearch = d.title.toLowerCase().includes(searchTerm.toLowerCase()) || d.project.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="blueprint-viewer">
      {/* M3 Consolidated Header Banner & Submodule Tabs */}
      <SubmoduleNavHeader
        moduleId="doc-mgmt"
        title="Central Enterprise Document Repository"
        actionButton={
          <button className="btn btn-primary btn-sm" onClick={() => showToast('Opened Document Upload Wizard', 'info')}>
            <Upload size={16} aria-hidden="true" /> Upload New Document
          </button>
        }
      />

      {/* KPI Stats */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '0.75rem', marginBottom: '1.25rem' }}>
        <div className="anodized-panel" style={{ padding: '1rem' }}>
          <div style={{ fontSize: '0.675rem', color: 'var(--text-muted)' }}>ARCHITECTURAL PLANS</div>
          <div className="mono-data" style={{ fontSize: '1.4rem', fontWeight: 800, color: 'var(--precision-blue)' }}>128</div>
        </div>
        <div className="anodized-panel" style={{ padding: '1rem' }}>
          <div style={{ fontSize: '0.675rem', color: 'var(--text-muted)' }}>APPROVED CONTRACTS</div>
          <div className="mono-data" style={{ fontSize: '1.4rem', fontWeight: 800, color: 'var(--emerald)' }}>45</div>
        </div>
        <div className="anodized-panel" style={{ padding: '1rem' }}>
          <div style={{ fontSize: '0.675rem', color: 'var(--text-muted)' }}>LEGAL & RERA COMPLIANCE</div>
          <div className="mono-data" style={{ fontSize: '1.4rem', fontWeight: 800, color: 'var(--amber)' }}>32</div>
        </div>
        <div className="anodized-panel" style={{ padding: '1rem' }}>
          <div style={{ fontSize: '0.675rem', color: 'var(--text-muted)' }}>CLIENT DOSSIERS</div>
          <div className="mono-data" style={{ fontSize: '1.4rem', fontWeight: 800, color: '#a855f7' }}>184</div>
        </div>
      </div>

      {/* Main Document Register */}
      <div className="anodized-panel" style={{ padding: '1.25rem' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
          <div style={{ position: 'relative', flex: 1, maxWidth: '400px' }}>
            <Search size={14} style={{ position: 'absolute', left: '10px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
            <input
              type="text"
              className="form-control"
              placeholder="Search documents by title or project..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              style={{ paddingLeft: '32px', fontSize: '0.75rem' }}
            />
          </div>
        </div>

        <div style={{ overflowX: 'auto' }}>
          <table className="table" style={{ width: '100%', fontSize: '0.75rem' }}>
            <thead>
              <tr>
                <th>REF ID</th>
                <th>DOCUMENT TITLE</th>
                <th>CATEGORY</th>
                <th>PROJECT SCOPE</th>
                <th>UPLOADED BY</th>
                <th>DATE</th>
                <th>FILE SIZE</th>
                <th>ACTION</th>
              </tr>
            </thead>
            <tbody>
              {filteredDocs.map((doc) => (
                <tr key={doc.id}>
                  <td className="mono-data" style={{ fontWeight: 700, color: 'var(--precision-blue)' }}>{doc.id}</td>
                  <td style={{ fontWeight: 700 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                      <FileText size={14} color="var(--precision-blue)" />
                      {doc.title}
                    </div>
                  </td>
                  <td><span className="badge badge-info">{doc.category}</span></td>
                  <td>{doc.project}</td>
                  <td>{doc.uploadedBy}</td>
                  <td className="mono-data">{doc.date}</td>
                  <td className="mono-data">{doc.size}</td>
                  <td>
                    <button className="btn btn-secondary btn-xs" onClick={() => showToast(`Downloaded ${doc.title}`, 'success')}>
                      <Download size={11} /> Download PDF
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
});

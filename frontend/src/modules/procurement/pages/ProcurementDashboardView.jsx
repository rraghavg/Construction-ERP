import { useState, memo } from 'react';
import { useApp } from '../../../core/providers/AppContext';
import { SubmoduleNavHeader } from '../../../shared/components/SubmoduleNavHeader';
import { ShoppingCart, FileText, CheckCircle, Plus, Filter, Download } from 'lucide-react';

export const ProcurementDashboardView = memo(function ProcurementDashboardView() {
  const { activeSubmodule, showToast } = useApp();

  const requisitions = [
    { id: 'REQ-101', item: 'TMT Steel Fe-550D 16mm', qty: '15 Tons', site: 'Green Heights Tower B', requestedBy: 'Site Eng. Rajesh', status: 'PENDING_APPROVAL', date: '04 Aug 2026' },
    { id: 'REQ-102', item: 'Ready-Mix Concrete M35', qty: '120 Cu.M', site: 'Sunshine Towers Floor 8', requestedBy: 'Site Eng. Amit', status: 'APPROVED', date: '02 Aug 2026' }
  ];

  const rfqs = [
    { rfqNo: 'RFQ-2026-88', title: 'Cement OPC 53 Grade (1,000 Bags)', bidsCount: 4, lowestBid: '₹ 365/Bag (UltraTech)', status: 'BIDDING_OPEN', deadline: '10 Aug 2026' },
    { rfqNo: 'RFQ-2026-89', title: 'Vitrified Floor Tiles 600x600', bidsCount: 3, lowestBid: '₹ 42/sq.ft (Kajaria)', status: 'EVALUATION', deadline: '08 Aug 2026' }
  ];

  const pos = [
    { poNo: 'PO-2026-441', vendor: 'UltraTech Cement Ltd', value: '₹ 3,65,000', deliverySite: 'Green Heights', status: 'DISPATCHED', date: '01 Aug 2026' },
    { poNo: 'PO-2026-442', vendor: 'Tata Tiscon Steel', value: '₹ 8,40,000', deliverySite: 'Sunshine Towers', status: 'DELIVERED', date: '29 Jul 2026' }
  ];

  return (
    <div className="blueprint-viewer">
      {/* M3 Consolidated Header Banner & Submodule Tabs */}
      <SubmoduleNavHeader
        moduleId="procurement"
        title="Procurement & RFQ Tendering Control Center"
        actionButton={
          <button className="btn btn-primary btn-sm" onClick={() => showToast('Opened Requisition Creator', 'info')}>
            <Plus size={16} aria-hidden="true" /> Create Purchase Requisition
          </button>
        }
      />

      {/* KPI Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '0.75rem', marginBottom: '1.25rem' }}>
        <div className="anodized-panel" style={{ padding: '1rem' }}>
          <div style={{ fontSize: '0.675rem', color: 'var(--text-muted)' }}>OPEN REQUISITIONS</div>
          <div className="mono-data" style={{ fontSize: '1.4rem', fontWeight: 800, color: 'var(--precision-blue)' }}>18</div>
        </div>
        <div className="anodized-panel" style={{ padding: '1rem' }}>
          <div style={{ fontSize: '0.675rem', color: 'var(--text-muted)' }}>ACTIVE RFQs / TENDERS</div>
          <div className="mono-data" style={{ fontSize: '1.4rem', fontWeight: 800, color: 'var(--amber)' }}>6</div>
        </div>
        <div className="anodized-panel" style={{ padding: '1rem' }}>
          <div style={{ fontSize: '0.675rem', color: 'var(--text-muted)' }}>VENDOR QUOTATIONS</div>
          <div className="mono-data" style={{ fontSize: '1.4rem', fontWeight: 800, color: 'var(--emerald)' }}>24</div>
        </div>
        <div className="anodized-panel" style={{ padding: '1rem' }}>
          <div style={{ fontSize: '0.675rem', color: 'var(--text-muted)' }}>TOTAL VALUE SAVED (L1)</div>
          <div className="mono-data" style={{ fontSize: '1.4rem', fontWeight: 800, color: '#a855f7' }}>₹ 14.2 L</div>
        </div>
      </div>

      {/* Requisitions Section */}
      {(!activeSubmodule || activeSubmodule === 'Procurement Dashboard' || activeSubmodule === 'Purchase Requisitions' || activeSubmodule === 'Main Overview') && (
        <div className="anodized-panel" style={{ padding: '1.25rem', marginBottom: '1.25rem' }}>
          <h3 style={{ fontSize: '0.9rem', fontWeight: 800, marginBottom: '0.75rem' }}>Site Material Purchase Requisitions</h3>
          <div style={{ overflowX: 'auto' }}>
            <table className="table" style={{ width: '100%', fontSize: '0.75rem' }}>
              <thead>
                <tr>
                  <th>REQ ID</th>
                  <th>MATERIAL SKU</th>
                  <th>QTY DEMANDED</th>
                  <th>TARGET SITE</th>
                  <th>REQUESTED BY</th>
                  <th>DATE</th>
                  <th>STATUS</th>
                  <th>ACTION</th>
                </tr>
              </thead>
              <tbody>
                {requisitions.map((r) => (
                  <tr key={r.id}>
                    <td className="mono-data" style={{ fontWeight: 700, color: 'var(--precision-blue)' }}>{r.id}</td>
                    <td style={{ fontWeight: 700 }}>{r.item}</td>
                    <td className="mono-data">{r.qty}</td>
                    <td>{r.site}</td>
                    <td>{r.requestedBy}</td>
                    <td className="mono-data">{r.date}</td>
                    <td><span className={`badge ${r.status === 'APPROVED' ? 'badge-success' : 'badge-warning'}`}>{r.status}</span></td>
                    <td>
                      <button className="btn btn-secondary btn-xs" onClick={() => showToast(`Approved Requisition ${r.id}`, 'success')}>
                        Approve & Issue RFQ
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* RFQs & Tenders Section */}
      {(!activeSubmodule || activeSubmodule === 'Procurement Dashboard' || activeSubmodule === 'RFQs & Tenders' || activeSubmodule === 'Vendor Quotations' || activeSubmodule === 'Main Overview') && (
        <div className="anodized-panel" style={{ padding: '1.25rem', marginBottom: '1.25rem' }}>
          <h3 style={{ fontSize: '0.9rem', fontWeight: 800, marginBottom: '0.75rem' }}>RFQs & Vendor Bidding Matrix</h3>
          <div style={{ overflowX: 'auto' }}>
            <table className="table" style={{ width: '100%', fontSize: '0.75rem' }}>
              <thead>
                <tr>
                  <th>RFQ NO.</th>
                  <th>TENDER TITLE</th>
                  <th>BIDS RECEIVED</th>
                  <th>LOWEST BID (L1)</th>
                  <th>BIDDING DEADLINE</th>
                  <th>STATUS</th>
                  <th>ACTION</th>
                </tr>
              </thead>
              <tbody>
                {rfqs.map((q) => (
                  <tr key={q.rfqNo}>
                    <td className="mono-data" style={{ fontWeight: 700, color: 'var(--precision-blue)' }}>{q.rfqNo}</td>
                    <td style={{ fontWeight: 700 }}>{q.title}</td>
                    <td className="mono-data">{q.bidsCount} Bids</td>
                    <td className="mono-data" style={{ color: 'var(--emerald)', fontWeight: 700 }}>{q.lowestBid}</td>
                    <td className="mono-data">{q.deadline}</td>
                    <td><span className="badge badge-info">{q.status}</span></td>
                    <td>
                      <button className="btn btn-primary btn-xs" onClick={() => showToast(`Awarded L1 PO for ${q.rfqNo}`, 'success')}>
                        Award L1 PO
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Purchase Orders & Invoices Section */}
      {(activeSubmodule === 'Purchase Orders' || activeSubmodule === 'Goods Receipt (GRN)' || activeSubmodule === 'Vendor Invoices') && (
        <div className="anodized-panel" style={{ padding: '1.25rem' }}>
          <h3 style={{ fontSize: '0.9rem', fontWeight: 800, marginBottom: '0.75rem' }}>Purchase Orders & Vendor Delivery Tracking</h3>
          <div style={{ overflowX: 'auto' }}>
            <table className="table" style={{ width: '100%', fontSize: '0.75rem' }}>
              <thead>
                <tr>
                  <th>PO NO.</th>
                  <th>VENDOR NAME</th>
                  <th>TOTAL VALUE</th>
                  <th>DELIVERY SITE</th>
                  <th>PO DATE</th>
                  <th>STATUS</th>
                  <th>ACTION</th>
                </tr>
              </thead>
              <tbody>
                {pos.map((p) => (
                  <tr key={p.poNo}>
                    <td className="mono-data" style={{ fontWeight: 700, color: 'var(--precision-blue)' }}>{p.poNo}</td>
                    <td style={{ fontWeight: 700 }}>{p.vendor}</td>
                    <td className="mono-data" style={{ color: 'var(--emerald)', fontWeight: 700 }}>{p.value}</td>
                    <td>{p.deliverySite}</td>
                    <td className="mono-data">{p.date}</td>
                    <td><span className="badge badge-success">{p.status}</span></td>
                    <td>
                      <button className="btn btn-secondary btn-xs" onClick={() => showToast(`Downloaded ${p.poNo} PDF`, 'success')}>
                        <Download size={11} /> Download PO
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
});

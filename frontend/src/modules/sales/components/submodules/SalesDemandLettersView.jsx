import { memo } from 'react';
import { Send, Mail, MessageSquare } from 'lucide-react';
import { useApp } from '../../../../core/providers/AppContext';

export const SalesDemandLettersView = memo(function SalesDemandLettersView({ onOpenDemandModal }) {
  const { showToast } = useApp();

  const demandNotices = [
    { id: 'DMD-2026-401', customer: 'Priya Sharma', unit: 'T2-1204', milestone: 'Foundation Completion', amountDue: '₹ 4,80,000', sentVia: 'Email & Registered AD', date: '29 Jul 2026', status: 'DISPATCHED' },
    { id: 'DMD-2026-402', customer: 'Rajesh Kumar', unit: 'A-402', milestone: 'Plinth Completion', amountDue: '₹ 6,50,000', sentVia: 'WhatsApp & Email', date: '01 Aug 2026', status: 'DELIVERED' }
  ];

  return (
    <div className="anodized-panel" style={{ padding: '1.25rem' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem' }}>
        <div>
          <h3 style={{ fontSize: '1rem', fontWeight: 800, display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Send size={18} style={{ color: 'var(--precision-blue)' }} />
            Demand Letters & Milestone Payment Notices
          </h3>
          <p style={{ fontSize: '0.725rem', color: 'var(--text-muted)', marginTop: '2px' }}>
            Issue demand letters, automated email/WhatsApp dispatches, and delivery acknowledgments
          </p>
        </div>

        <button className="btn btn-primary btn-sm" onClick={onOpenDemandModal}>
          <Send size={14} /> DISPATCH DEMAND LETTER
        </button>
      </div>

      <div style={{ overflowX: 'auto' }}>
        <table className="table" style={{ width: '100%', fontSize: '0.75rem' }}>
          <thead>
            <tr>
              <th>DEMAND NO.</th>
              <th>CUSTOMER</th>
              <th>UNIT</th>
              <th>MILESTONE</th>
              <th>AMOUNT DEMANDED</th>
              <th>DISPATCH CHANNEL</th>
              <th>DATE</th>
              <th>STATUS</th>
            </tr>
          </thead>
          <tbody>
            {demandNotices.map((d) => (
              <tr key={d.id}>
                <td className="mono-data" style={{ fontWeight: 700, color: 'var(--precision-blue)' }}>{d.id}</td>
                <td style={{ fontWeight: 700 }}>{d.customer}</td>
                <td className="mono-data">{d.unit}</td>
                <td>{d.milestone}</td>
                <td className="mono-data" style={{ fontWeight: 700 }}>{d.amountDue}</td>
                <td>{d.sentVia}</td>
                <td className="mono-data">{d.date}</td>
                <td><span className="badge badge-info">{d.status}</span></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
});

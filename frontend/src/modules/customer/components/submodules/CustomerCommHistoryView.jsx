import { memo } from 'react';
import { MessageSquare, Mail, Phone, Calendar } from 'lucide-react';
import { useApp } from '../../../../core/providers/AppContext';

export const CustomerCommHistoryView = memo(function CustomerCommHistoryView() {
  const commLogs = [
    { id: 'COMM-901', customer: 'Rajesh Kumar', channel: 'EMAIL', subject: 'Demand Notice Dispatch - 15th Floor Slab', date: '04 Aug 2026', sentBy: 'Accounts System' },
    { id: 'COMM-902', customer: 'Priya Sharma', channel: 'WHATSAPP', subject: 'Site Construction Progress Photos Sent', date: '02 Aug 2026', sentBy: 'CRM Bot' },
    { id: 'COMM-903', customer: 'Amit Shah', channel: 'SMS', subject: 'Receipt Confirmation for ₹ 8.5L', date: '15 Jul 2026', sentBy: 'Finance Desk' }
  ];

  return (
    <div className="anodized-panel" style={{ padding: '1.25rem' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem' }}>
        <div>
          <h3 style={{ fontSize: '1rem', fontWeight: 800, display: 'flex', alignItems: 'center', gap: '8px' }}>
            <MessageSquare size={18} style={{ color: 'var(--precision-blue)' }} />
            Customer Communication & Audit Log Feed
          </h3>
          <p style={{ fontSize: '0.725rem', color: 'var(--text-muted)', marginTop: '2px' }}>
            Omnichannel interaction logs across Email, SMS, WhatsApp, and phone dispatches
          </p>
        </div>
      </div>

      <div style={{ overflowX: 'auto' }}>
        <table className="table" style={{ width: '100%', fontSize: '0.75rem' }}>
          <thead>
            <tr>
              <th>LOG ID</th>
              <th>CUSTOMER</th>
              <th>CHANNEL</th>
              <th>SUBJECT / SUMMARY</th>
              <th>DISPATCH DATE</th>
              <th>SENT BY</th>
            </tr>
          </thead>
          <tbody>
            {commLogs.map((c) => (
              <tr key={c.id}>
                <td className="mono-data" style={{ fontWeight: 700, color: 'var(--precision-blue)' }}>{c.id}</td>
                <td style={{ fontWeight: 700 }}>{c.customer}</td>
                <td><span className="badge badge-info">{c.channel}</span></td>
                <td>{c.subject}</td>
                <td className="mono-data">{c.date}</td>
                <td>{c.sentBy}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
});

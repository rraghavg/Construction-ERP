import { memo } from 'react';
import { useApp } from '../../../../core/providers/AppContext';
import { Headphones, Play, Pause, Download, Tag, PhoneIncoming, PhoneOutgoing } from 'lucide-react';

export const CrmCallRecordingView = memo(function CrmCallRecordingView() {
  const { showToast } = useApp();

  const callLogs = [
    { id: 'CALL-8801', prospect: 'Rajesh Kumar', agent: 'Rahul Sharma', direction: 'INBOUND', duration: '4m 12s', date: '05 Aug 2026, 03:15 PM', tag: 'High Interest', snippet: 'Asked about subvention plan and possession date for Tower A.' },
    { id: 'CALL-8802', prospect: 'Priya Sharma', agent: 'Sneha Patel', direction: 'OUTBOUND', duration: '2m 45s', date: '05 Aug 2026, 02:40 PM', tag: 'Follow-up Scheduled', snippet: 'Confirmed site visit appointment for Sunday.' },
    { id: 'CALL-8803', prospect: 'Amit Shah', agent: 'Rahul Sharma', direction: 'OUTBOUND', duration: '6m 08s', date: '04 Aug 2026, 05:20 PM', tag: 'Price Negotiation', snippet: 'Discussed floor rise charges and discount options.' }
  ];

  return (
    <div className="anodized-panel" style={{ padding: '1.25rem' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem' }}>
        <div>
          <h3 style={{ fontSize: '1rem', fontWeight: 800, display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Headphones size={18} style={{ color: 'var(--precision-blue)' }} />
            Telephony & Tele-Call Recording Telemetry
          </h3>
          <p style={{ fontSize: '0.725rem', color: 'var(--text-muted)', marginTop: '2px' }}>
            Call recordings, sentiment tagging, AI transcription, and agent quality score
          </p>
        </div>

        <span className="badge badge-info mono-data">VOIP GATEWAY ONLINE</span>
      </div>

      <div style={{ overflowX: 'auto' }}>
        <table className="table" style={{ width: '100%', fontSize: '0.75rem' }}>
          <thead>
            <tr>
              <th>CALL ID</th>
              <th>PROSPECT</th>
              <th>EXECUTIVE</th>
              <th>TYPE</th>
              <th>DURATION</th>
              <th>DATE & TIME</th>
              <th>TAG / SENTIMENT</th>
              <th>AUDIO PLAYER</th>
            </tr>
          </thead>
          <tbody>
            {callLogs.map((c) => (
              <tr key={c.id}>
                <td className="mono-data" style={{ fontWeight: 700, color: 'var(--precision-blue)' }}>{c.id}</td>
                <td style={{ fontWeight: 700 }}>{c.prospect}</td>
                <td>{c.agent}</td>
                <td>
                  {c.direction === 'INBOUND' ? (
                    <span style={{ color: 'var(--emerald)' }}><PhoneIncoming size={12} style={{ display: 'inline', marginRight: '4px' }} />INBOUND</span>
                  ) : (
                    <span style={{ color: 'var(--precision-blue)' }}><PhoneOutgoing size={12} style={{ display: 'inline', marginRight: '4px' }} />OUTBOUND</span>
                  )}
                </td>
                <td className="mono-data">{c.duration}</td>
                <td className="mono-data">{c.date}</td>
                <td><span className="badge badge-warning">{c.tag}</span></td>
                <td>
                  <button className="btn btn-primary btn-xs" onClick={() => showToast(`Playing audio recording for ${c.id}`, 'info')}>
                    <Play size={10} aria-hidden="true" /> PLAY AUDIO
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

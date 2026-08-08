import { memo, useMemo } from 'react';
import { useApp } from '../../../../core/providers/AppContext';
import { Calendar, Clock, CheckCircle2, PhoneCall, Plus, User } from 'lucide-react';

export const CrmFollowUpsHubView = memo(function CrmFollowUpsHubView({ onOpenFollowUp }) {
  const { leads, showToast } = useApp();

  const followUpItems = useMemo(() => {
    return leads.map((lead, idx) => ({
      id: `FLP-${1000 + idx}`,
      leadName: lead.name,
      phone: lead.phone,
      project: lead.project || 'Green Heights',
      scheduledDate: idx % 2 === 0 ? 'Today, 4:30 PM' : 'Tomorrow, 11:00 AM',
      type: idx % 3 === 0 ? 'Site Visit Confirmation' : idx % 2 === 0 ? 'Price Negotiation' : 'Initial Inquiry Call',
      status: idx % 4 === 0 ? 'COMPLETED' : 'PENDING',
      notes: 'Customer interested in 3 BHK corner unit with East facing balcony.'
    }));
  }, [leads]);

  return (
    <div className="anodized-panel" style={{ padding: '1.25rem' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.25rem' }}>
        <div>
          <h3 style={{ fontSize: '1rem', fontWeight: 800, display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Calendar size={18} style={{ color: 'var(--precision-blue)' }} />
            Follow-Ups & Call Reminders Hub
          </h3>
          <p style={{ fontSize: '0.725rem', color: 'var(--text-muted)', marginTop: '2px' }}>
            Schedule, track, and complete daily prospect interactions
          </p>
        </div>

        <button className="btn btn-primary btn-sm" onClick={() => onOpenFollowUp(leads[0])}>
          <Plus size={14} /> NEW FOLLOW-UP
        </button>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '1rem' }}>
        {followUpItems.map((item) => (
          <div
            key={item.id}
            className="anodized-panel"
            style={{
              padding: '1rem',
              background: item.status === 'COMPLETED' ? 'rgba(16, 185, 129, 0.05)' : 'rgba(30, 41, 59, 0.5)',
              borderColor: item.status === 'COMPLETED' ? 'rgba(16, 185, 129, 0.3)' : 'var(--border-color)'
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
              <span className="mono-data" style={{ fontSize: '0.65rem', color: 'var(--precision-blue)', fontWeight: 700 }}>
                {item.id}
              </span>
              <span className={`badge ${item.status === 'COMPLETED' ? 'badge-success' : 'badge-warning'}`}>
                {item.status}
              </span>
            </div>

            <div style={{ fontWeight: 700, fontSize: '0.875rem', marginBottom: '4px' }}>{item.leadName}</div>
            <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)', marginBottom: '0.5rem' }}>
              <PhoneCall size={11} style={{ display: 'inline', marginRight: '4px' }} />
              {item.phone} • {item.project}
            </div>

            <div style={{ fontSize: '0.725rem', background: 'rgba(0,0,0,0.2)', padding: '6px 8px', borderRadius: '4px', marginBottom: '0.75rem' }}>
              <Clock size={11} style={{ display: 'inline', marginRight: '4px', color: 'var(--amber)' }} />
              <strong>{item.scheduledDate}</strong> — {item.type}
            </div>

            <p style={{ fontSize: '0.675rem', color: 'var(--text-muted)', marginBottom: '0.75rem' }}>{item.notes}</p>

            <button
              className="btn btn-secondary btn-xs"
              style={{ width: '100%' }}
              onClick={() => showToast(`Marked follow-up ${item.id} as completed`, 'success')}
            >
              <CheckCircle2 size={12} /> MARK AS COMPLETED
            </button>
          </div>
        ))}
      </div>
    </div>
  );
});

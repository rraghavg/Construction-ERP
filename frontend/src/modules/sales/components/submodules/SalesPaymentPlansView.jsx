import { memo } from 'react';
import { Layers, Check, Plus } from 'lucide-react';
import { useApp } from '../../../../core/providers/AppContext';

export const SalesPaymentPlansView = memo(function SalesPaymentPlansView() {
  const { showToast } = useApp();

  const plans = [
    { title: 'Construction Linked Plan (CLP)', code: 'PLAN-CLP-10', desc: '10% Booking + 80% Construction Milestones + 10% Possession', activeCount: 112 },
    { title: 'Time Linked Payment Plan (TLP)', code: 'PLAN-TLP-20', desc: '20% Down Payment + Quarterly equal installments over 24 months', activeCount: 48 },
    { title: 'Subvention Scheme (10-80-10)', code: 'PLAN-SUB-1080', desc: 'Bank funded subvention till possession notification', activeCount: 24 }
  ];

  return (
    <div className="anodized-panel" style={{ padding: '1.25rem' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem' }}>
        <div>
          <h3 style={{ fontSize: '1rem', fontWeight: 800, display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Layers size={18} style={{ color: 'var(--precision-blue)' }} />
            Payment Plan Master Templates
          </h3>
          <p style={{ fontSize: '0.725rem', color: 'var(--text-muted)', marginTop: '2px' }}>
            Configure CLP construction milestones, subvention schemes, and installment percentages
          </p>
        </div>

        <button className="btn btn-primary btn-sm" onClick={() => showToast('Opened payment plan builder', 'info')}>
          <Plus size={14} /> NEW PAYMENT PLAN
        </button>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '1rem' }}>
        {plans.map((p) => (
          <div key={p.code} className="anodized-panel" style={{ padding: '1.25rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
              <span className="mono-data" style={{ fontSize: '0.65rem', color: 'var(--precision-blue)', fontWeight: 700 }}>{p.code}</span>
              <span className="badge badge-info mono-data">{p.activeCount} BOOKINGS</span>
            </div>
            <h4 style={{ fontWeight: 800, fontSize: '0.95rem', marginBottom: '6px' }}>{p.title}</h4>
            <p style={{ fontSize: '0.725rem', color: 'var(--text-muted)', marginBottom: '1rem' }}>{p.desc}</p>
            <button className="btn btn-secondary btn-xs" style={{ width: '100%' }} onClick={() => showToast(`Configuring ${p.code}`, 'info')}>
              View Milestones Setup
            </button>
          </div>
        ))}
      </div>
    </div>
  );
});

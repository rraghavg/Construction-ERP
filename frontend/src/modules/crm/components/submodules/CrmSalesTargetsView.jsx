import { memo } from 'react';
import { Target, Award, TrendingUp, Users } from 'lucide-react';

export const CrmSalesTargetsView = memo(function CrmSalesTargetsView() {
  const teamTargets = [
    { executive: 'Rahul Sharma', role: 'Senior Manager', target: '₹ 4.5 Cr', achieved: '₹ 3.8 Cr', percentage: 84, bookings: 5 },
    { executive: 'Sneha Patel', role: 'Sales Executive', target: '₹ 3.0 Cr', achieved: '₹ 2.9 Cr', percentage: 96, bookings: 4 },
    { executive: 'Vikram Singh', role: 'Assistant Manager', target: '₹ 3.5 Cr', achieved: '₹ 2.1 Cr', percentage: 60, bookings: 3 },
    { executive: 'Ananya Roy', role: 'Sales Executive', target: '₹ 2.5 Cr', achieved: '₹ 1.8 Cr', percentage: 72, bookings: 2 }
  ];

  return (
    <div className="anodized-panel" style={{ padding: '1.25rem' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem' }}>
        <div>
          <h3 style={{ fontSize: '1rem', fontWeight: 800, display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Target size={18} style={{ color: 'var(--precision-blue)' }} />
            Sales Targets & Executive Leaderboard
          </h3>
          <p style={{ fontSize: '0.725rem', color: 'var(--text-muted)', marginTop: '2px' }}>
            Monthly revenue quotas, individual achievements, and target vs actual metrics
          </p>
        </div>

        <span className="badge badge-success mono-data">FY 2026 Q2 ACTIVE</span>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: '1rem' }}>
        {teamTargets.map((t) => (
          <div key={t.executive} className="anodized-panel" style={{ padding: '1rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
              <div style={{ fontWeight: 800, fontSize: '0.875rem' }}>{t.executive}</div>
              <Award size={16} style={{ color: t.percentage >= 90 ? 'var(--emerald)' : 'var(--amber)' }} />
            </div>
            <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)', marginBottom: '0.75rem' }}>{t.role} • {t.bookings} Bookings</div>

            <div style={{ marginBottom: '0.5rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.7rem', marginBottom: '4px' }}>
                <span>Target: <strong className="mono-data">{t.target}</strong></span>
                <span>Achieved: <strong className="mono-data" style={{ color: 'var(--precision-blue)' }}>{t.achieved}</strong></span>
              </div>
              <div style={{ width: '100%', height: '8px', background: 'rgba(255,255,255,0.08)', borderRadius: '4px', overflow: 'hidden' }}>
                <div style={{ width: `${t.percentage}%`, height: '100%', background: t.percentage >= 90 ? '#10b981' : t.percentage >= 70 ? '#2563eb' : '#f59e0b', borderRadius: '4px' }} />
              </div>
            </div>

            <div style={{ textAlign: 'right', fontSize: '0.675rem', fontWeight: 800, color: 'var(--text-muted)' }}>
              {t.percentage}% OF QUOTA MET
            </div>
          </div>
        ))}
      </div>
    </div>
  );
});

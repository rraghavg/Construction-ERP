import { memo } from 'react';
import { Award, Star } from 'lucide-react';
import { useApp } from '../../../../core/providers/AppContext';

export const HrPerformanceReviewsView = memo(function HrPerformanceReviewsView() {
  const { showToast } = useApp();

  const reviews = [
    { id: 'REV-2026-01', employee: 'Rahul Sharma', period: 'FY26 Q1 Review', rating: '4.8 / 5.0 (Exceeds Expectations)', salesTargetAchieved: '92%', status: 'COMPLETED' },
    { id: 'REV-2026-02', employee: 'Sneha Patel', period: 'FY26 Q1 Review', rating: '4.9 / 5.0 (Outstanding)', salesTargetAchieved: '110%', status: 'COMPLETED' }
  ];

  return (
    <div className="anodized-panel" style={{ padding: '1.25rem' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem' }}>
        <div>
          <h3 style={{ fontSize: '1rem', fontWeight: 800, display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Award size={18} style={{ color: 'var(--precision-blue)' }} />
            Performance Appraisals & Quarterly Ratings
          </h3>
          <p style={{ fontSize: '0.725rem', color: 'var(--text-muted)', marginTop: '2px' }}>
            KPI achievement scoring, manager appraisal reviews, and annual increment recommendations
          </p>
        </div>
      </div>

      <div style={{ overflowX: 'auto' }}>
        <table className="table" style={{ width: '100%', fontSize: '0.75rem' }}>
          <thead>
            <tr>
              <th>REVIEW ID</th>
              <th>EMPLOYEE NAME</th>
              <th>REVIEW PERIOD</th>
              <th>PERFORMANCE RATING</th>
              <th>TARGET ACHIEVED %</th>
              <th>STATUS</th>
            </tr>
          </thead>
          <tbody>
            {reviews.map((r) => (
              <tr key={r.id}>
                <td className="mono-data" style={{ fontWeight: 700, color: 'var(--precision-blue)' }}>{r.id}</td>
                <td style={{ fontWeight: 700 }}>{r.employee}</td>
                <td className="mono-data">{r.period}</td>
                <td><span className="badge badge-warning mono-data">{r.rating}</span></td>
                <td className="mono-data" style={{ color: 'var(--emerald)', fontWeight: 700 }}>{r.salesTargetAchieved}</td>
                <td><span className="badge badge-success">{r.status}</span></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
});

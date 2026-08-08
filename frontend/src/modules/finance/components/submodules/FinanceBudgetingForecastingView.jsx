import { memo } from 'react';
import { TrendingUp, BarChart3 } from 'lucide-react';
import { useApp } from '../../../../core/providers/AppContext';

export const FinanceBudgetingForecastingView = memo(function FinanceBudgetingForecastingView() {
  const budgets = [
    { project: 'Green Heights', estimatedBudget: '₹ 45.0 Cr', actualSpent: '₹ 28.5 Cr', variance: '+ ₹ 16.5 Cr (36% Remaining)', status: 'ON_TRACK' },
    { project: 'Sunshine Towers', estimatedBudget: '₹ 60.0 Cr', actualSpent: '₹ 48.2 Cr', variance: '+ ₹ 11.8 Cr (19% Remaining)', status: 'ON_TRACK' }
  ];

  return (
    <div className="anodized-panel" style={{ padding: '1.25rem' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem' }}>
        <div>
          <h3 style={{ fontSize: '1rem', fontWeight: 800, display: 'flex', alignItems: 'center', gap: '8px' }}>
            <TrendingUp size={18} style={{ color: 'var(--precision-blue)' }} />
            Project Budgeting & Financial Forecasting
          </h3>
          <p style={{ fontSize: '0.725rem', color: 'var(--text-muted)', marginTop: '2px' }}>
            Construction project budget vs actual expenditure, overrun alerts, and cash flow forecasts
          </p>
        </div>
      </div>

      <div style={{ overflowX: 'auto' }}>
        <table className="table" style={{ width: '100%', fontSize: '0.75rem' }}>
          <thead>
            <tr>
              <th>PROJECT NAME</th>
              <th>APPROVED SANCTIONED BUDGET</th>
              <th>ACTUAL SPENT TO DATE</th>
              <th>VARIANCE REMAINING</th>
              <th>BUDGET HEALTH</th>
            </tr>
          </thead>
          <tbody>
            {budgets.map((b) => (
              <tr key={b.project}>
                <td style={{ fontWeight: 700 }}>{b.project}</td>
                <td className="mono-data">{b.estimatedBudget}</td>
                <td className="mono-data" style={{ color: 'var(--precision-blue)', fontWeight: 700 }}>{b.actualSpent}</td>
                <td className="mono-data" style={{ color: 'var(--emerald)', fontWeight: 700 }}>{b.variance}</td>
                <td><span className="badge badge-success">{b.status}</span></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
});

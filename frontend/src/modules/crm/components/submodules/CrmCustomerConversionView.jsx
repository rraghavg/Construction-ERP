import { memo } from 'react';
import { UserCheck, PieChart, TrendingUp, Filter } from 'lucide-react';

export const CrmCustomerConversionView = memo(function CrmCustomerConversionView() {
  const conversionStages = [
    { stage: '1. Total Inquiries', count: 420, rate: '100%' },
    { stage: '2. Qualified Leads', count: 280, rate: '66.6%' },
    { stage: '3. Site Visits Conducted', count: 145, rate: '34.5%' },
    { stage: '4. Offer / Price Negotiation', count: 68, rate: '16.1%' },
    { stage: '5. Bookings Closed', count: 42, rate: '10.0%' }
  ];

  return (
    <div className="anodized-panel" style={{ padding: '1.25rem' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem' }}>
        <div>
          <h3 style={{ fontSize: '1rem', fontWeight: 800, display: 'flex', alignItems: 'center', gap: '8px' }}>
            <UserCheck size={18} style={{ color: 'var(--precision-blue)' }} />
            Lead-to-Customer Conversion Funnel Analytics
          </h3>
          <p style={{ fontSize: '0.725rem', color: 'var(--text-muted)', marginTop: '2px' }}>
            Funnel drop-off analysis, conversion speed, and loss reasons breakdown
          </p>
        </div>

        <span className="badge badge-info mono-data">10.0% CONVERSION RATE</span>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
        {conversionStages.map((s, idx) => (
          <div key={s.stage} className="anodized-panel" style={{ padding: '0.85rem 1.25rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div>
              <div style={{ fontWeight: 800, fontSize: '0.85rem' }}>{s.stage}</div>
              <div style={{ fontSize: '0.675rem', color: 'var(--text-muted)' }}>Funnel stage {idx + 1} efficiency</div>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
              <div style={{ textAlign: 'right' }}>
                <div className="mono-data" style={{ fontWeight: 800, fontSize: '1rem', color: 'var(--precision-blue)' }}>{s.count}</div>
                <div style={{ fontSize: '0.65rem', color: 'var(--text-muted)' }}>PROSPECTS</div>
              </div>

              <div style={{ width: '80px', textAlign: 'right' }}>
                <span className="badge badge-success mono-data">{s.rate}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
});

import { useState, memo, useCallback } from 'react';
import { useApp } from '../../../core/providers/AppContext';
import { OVERDUE_PAYMENTS_DATA } from '../../../data/mockData';
import { AlertCircle } from 'lucide-react';
import { PanelHeader } from '../../../shared/components/PanelHeader';
import { WidgetSkeleton } from '../../../shared/components/WidgetSkeleton';
import { Modal } from '../../../shared/components/Modal';
import { MaskedOverlay } from '../../../shared/components/MaskedOverlay';

export const OverduePaymentsPanel = memo(function OverduePaymentsPanel() {
  const { isRefreshing, activePermissions, navigateTo } = useApp();
  const [selectedInvoice, setSelectedInvoice] = useState(null);

  const handleInvoiceClick = useCallback((item) => {
    setSelectedInvoice(item);
  }, []);

  const handleInvoiceKeyDown = useCallback((e, item) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      setSelectedInvoice(item);
    }
  }, []);

  const handleNavigateToFinance = useCallback(() => {
    setSelectedInvoice(null);
    navigateTo('finance', 'Expenses Management');
  }, [navigateTo]);

  if (isRefreshing) {
    return <WidgetSkeleton height="200px" className="panel-card" />;
  }

  return (
    <div className="panel-card">
      <PanelHeader
        title="Overdue Payments"
        icon={<AlertCircle size={15} color="var(--color-danger)" />}
        accentColor="#dc2626"
        actionLabel="VIEW ALL"
        onAction={handleNavigateToFinance}
      />

      {activePermissions.maskedFinance ? (
        <MaskedOverlay label="OVERDUE_PAYMENTS_MASKED" height="150px" />
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem' }}>
          {OVERDUE_PAYMENTS_DATA.map((item) => {
            const isSevere = item.daysOverdue > 15;

            return (
              <div
                key={item.id}
                tabIndex={0}
                role="button"
                className="structural-card"
                style={{
                  padding: '0.65rem',
                  marginBottom: 0,
                  borderLeft: isSevere ? '3px solid var(--color-danger)' : '1px solid var(--border-color)'
                }}
                onClick={() => handleInvoiceClick(item)}
                onKeyDown={(e) => handleInvoiceKeyDown(e, item)}
                aria-label={`Overdue invoice ${item.id}: Customer ${item.customer}, Unit ${item.unit}, Overdue by ${item.daysOverdue} days`}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ fontWeight: '800', fontSize: '0.775rem' }}>{item.unit}</span>
                  <span className={`badge ${isSevere ? 'badge-danger' : 'badge-warning'}`}>
                    {item.daysOverdue}D OVERDUE
                  </span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '4px' }}>
                  <span style={{ fontSize: '0.725rem', color: 'var(--text-muted)' }}>{item.customer}</span>
                  <span className="mono-data" style={{ fontWeight: '700', fontSize: '0.75rem', color: 'var(--color-danger)' }}>
                    ₹ {item.amount}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Invoice Quick Details Modal */}
      <Modal
        isOpen={!!selectedInvoice}
        onClose={() => setSelectedInvoice(null)}
        title={`Invoice ${selectedInvoice?.id}`}
        icon={<AlertCircle size={18} color="var(--color-danger)" />}
      >
        {selectedInvoice && (
          <div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem', fontSize: '0.8rem', marginBottom: '1.25rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: 'var(--text-muted)' }}>Customer Name:</span>
                <span style={{ fontWeight: '700' }}>{selectedInvoice.customer}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: 'var(--text-muted)' }}>Unit / Project:</span>
                <span style={{ fontWeight: '700' }}>{selectedInvoice.unit} ({selectedInvoice.project})</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: 'var(--text-muted)' }}>Amount Overdue:</span>
                <span className="mono-data" style={{ fontWeight: '800', color: 'var(--color-danger)' }}>
                  ₹ {selectedInvoice.amount}
                </span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: 'var(--text-muted)' }}>Overdue Duration:</span>
                <span className="mono-data" style={{ fontWeight: '700', color: 'var(--color-warning)' }}>
                  {selectedInvoice.daysOverdue} Days
                </span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: 'var(--text-muted)' }}>Milestone / Stage:</span>
                <span>{selectedInvoice.stage}</span>
              </div>
            </div>

            <div className="modal-actions">
              <button className="btn btn-secondary btn-sm" onClick={() => setSelectedInvoice(null)}>
                CLOSE
              </button>
              <button className="btn btn-primary btn-sm" onClick={handleNavigateToFinance}>
                RECORD PAYMENT IN FINANCE
              </button>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
});

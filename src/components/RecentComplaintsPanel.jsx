import { useState, memo, useCallback } from 'react';
import { useApp } from '../context/AppContext';
import { Headphones } from 'lucide-react';
import { PanelHeader } from './shared/PanelHeader';
import { WidgetSkeleton } from './shared/WidgetSkeleton';
import { Modal } from './shared/Modal';

export const RecentComplaintsPanel = memo(function RecentComplaintsPanel() {
  const { complaints, isRefreshing, navigateTo } = useApp();
  const [selectedComplaint, setSelectedComplaint] = useState(null);

  const handleComplaintClick = useCallback((item) => {
    setSelectedComplaint(item);
  }, []);

  const handleComplaintKeyDown = useCallback((e, item) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      setSelectedComplaint(item);
    }
  }, []);

  const handleNavigateToCRM = useCallback(() => {
    setSelectedComplaint(null);
    navigateTo('crm', 'Customer Complaints');
  }, [navigateTo]);

  if (isRefreshing) {
    return <WidgetSkeleton height="200px" className="panel-card" />;
  }

  return (
    <div className="panel-card">
      <PanelHeader
        title="Complaints"
        icon={<Headphones size={15} color="var(--color-warning)" />}
        accentColor="#f97316"
        actionLabel="VIEW ALL"
        onAction={handleNavigateToCRM}
      />

      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem' }}>
        {complaints.slice(0, 3).map((item) => {
          const isHighPriority = item.priority === 'High';

          return (
            <div
              key={item.id}
              tabIndex={0}
              role="button"
              className="structural-card"
              style={{ padding: '0.65rem', marginBottom: 0 }}
              onClick={() => handleComplaintClick(item)}
              onKeyDown={(e) => handleComplaintKeyDown(e, item)}
              aria-label={`Complaint ${item.id}: Unit ${item.unit}, Category ${item.category}, Priority ${item.priority}`}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontWeight: '800', fontSize: '0.775rem' }}>{item.unit}</span>
                <span className={`badge ${isHighPriority ? 'badge-danger' : 'badge-warning'}`}>
                  {item.priority}
                </span>
              </div>

              <div style={{ fontSize: '0.725rem', color: 'var(--text-main)', marginTop: '4px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                {item.category}: {item.issue}
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '4px' }}>
                <span style={{ fontSize: '0.675rem', color: 'var(--text-muted)' }}>{item.customer}</span>
                <span className="mono-data" style={{ fontSize: '0.65rem', color: 'var(--text-muted)' }}>
                  {item.status}
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Complaint Ticket Quick Details Modal */}
      <Modal
        isOpen={!!selectedComplaint}
        onClose={() => setSelectedComplaint(null)}
        title={`Ticket ${selectedComplaint?.id}`}
        icon={<Headphones size={18} color="var(--color-warning)" />}
      >
        {selectedComplaint && (
          <div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem', fontSize: '0.8rem', marginBottom: '1.25rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: 'var(--text-muted)' }}>Customer Name:</span>
                <span style={{ fontWeight: '700' }}>{selectedComplaint.customer}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: 'var(--text-muted)' }}>Unit / Tower:</span>
                <span style={{ fontWeight: '700' }}>{selectedComplaint.unit} ({selectedComplaint.project})</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: 'var(--text-muted)' }}>Category / Area:</span>
                <span>{selectedComplaint.category}</span>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                <span style={{ color: 'var(--text-muted)' }}>Issue Description:</span>
                <p style={{ background: 'var(--bg-input)', padding: '0.5rem', borderRadius: '4px', fontSize: '0.775rem' }}>
                  {selectedComplaint.issue}
                </p>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: 'var(--text-muted)' }}>Assigned Technician:</span>
                <span>{selectedComplaint.technician}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: 'var(--text-muted)' }}>Current Status:</span>
                <span className="mono-data" style={{ fontWeight: '700', color: 'var(--precision-blue)' }}>
                  {selectedComplaint.status}
                </span>
              </div>
            </div>

            <div className="modal-actions">
              <button className="btn btn-secondary btn-sm" onClick={() => setSelectedComplaint(null)}>
                CLOSE
              </button>
              <button className="btn btn-primary btn-sm" onClick={handleNavigateToCRM}>
                MANAGE IN CRM TICKETS
              </button>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
});

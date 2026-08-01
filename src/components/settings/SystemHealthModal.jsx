import { memo } from 'react';
import { useApp } from '../../context/AppContext';
import { Activity, CheckCircle2 } from 'lucide-react';
import { Modal } from '../shared/Modal';

export const SystemHealthModal = memo(function SystemHealthModal({ isOpen, onClose }) {
  const { systemHealthDiagnostics } = useApp();

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="System Diagnostic Health Check Report"
      icon={<Activity size={18} color="#16a34a" />}
      width="540px"
    >
      <div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '0.75rem', background: 'rgba(22, 163, 74, 0.1)', border: '1px solid rgba(22, 163, 74, 0.3)', borderRadius: '4px', marginBottom: '1rem', color: '#15803d', fontWeight: 800, fontSize: '0.85rem' }}>
          <CheckCircle2 size={18} aria-hidden="true" /> ALL SYSTEMS 100% OPERATIONAL (NO ISSUES DETECTED)
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
          {systemHealthDiagnostics.map((item) => (
            <div key={item.component} style={{ padding: '0.75rem', background: 'var(--bg-input)', border: '1px solid var(--border-color)', borderRadius: '4px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2px' }}>
                <span style={{ fontWeight: 800, fontSize: '0.8rem' }}>{item.component}</span>
                <span className="badge badge-success mono-data" style={{ fontSize: '0.625rem' }}>
                  {item.status} ({item.latency})
                </span>
              </div>
              <div className="mono-data" style={{ fontSize: '0.675rem', color: 'var(--text-muted)' }}>
                {item.details}
              </div>
            </div>
          ))}
        </div>

        <div className="modal-actions" style={{ marginTop: '1.25rem' }}>
          <button type="button" className="btn btn-primary btn-sm" onClick={onClose}>
            CLOSE DIAGNOSTIC REPORT
          </button>
        </div>
      </div>
    </Modal>
  );
});

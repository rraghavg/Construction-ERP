import { memo } from 'react';
import { Eye, ArrowRight } from 'lucide-react';
import { Modal } from '../../../shared/components/Modal';

export const ChangeDiffModal = memo(function ChangeDiffModal({ isOpen, onClose, changeItem }) {
  if (!changeItem) return null;

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={`Configuration Diff Inspector — ${changeItem.id}`}
      icon={<Eye size={18} color="var(--precision-blue)" />}
      width="540px"
    >
      <div>
        <div style={{ marginBottom: '0.85rem' }}>
          <div style={{ fontWeight: 800, fontSize: '0.95rem' }}>{changeItem.settingName}</div>
          <div className="mono-data" style={{ fontSize: '0.725rem', color: 'var(--text-muted)' }}>
            Category: {changeItem.category} • Changed by: {changeItem.changedBy} ({changeItem.dateTime})
          </div>
        </div>

        {/* Diff Comparison Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 30px 1fr', gap: '0.5rem', alignItems: 'center' }}>
          {/* Old Value */}
          <div style={{ padding: '0.85rem', background: 'rgba(220, 38, 38, 0.08)', border: '1px solid rgba(220, 38, 38, 0.3)', borderRadius: '4px' }}>
            <span style={{ fontSize: '0.625rem', fontWeight: 800, color: '#dc2626', display: 'block', marginBottom: '4px' }}>PREVIOUS VALUE</span>
            <div className="mono-data" style={{ fontSize: '0.75rem', fontWeight: 700 }}>
              {changeItem.oldValue}
            </div>
          </div>

          <div style={{ textAlign: 'center', color: 'var(--text-muted)' }}>
            <ArrowRight size={16} aria-hidden="true" />
          </div>

          {/* New Value */}
          <div style={{ padding: '0.85rem', background: 'rgba(22, 163, 74, 0.08)', border: '1px solid rgba(22, 163, 74, 0.3)', borderRadius: '4px' }}>
            <span style={{ fontSize: '0.625rem', fontWeight: 800, color: '#16a34a', display: 'block', marginBottom: '4px' }}>NEW VALUE</span>
            <div className="mono-data" style={{ fontSize: '0.75rem', fontWeight: 700 }}>
              {changeItem.newValue}
            </div>
          </div>
        </div>

        <div className="modal-actions" style={{ marginTop: '1.25rem' }}>
          <button type="button" className="btn btn-primary btn-sm" onClick={onClose}>
            CLOSE DIFF INSPECTOR
          </button>
        </div>
      </div>
    </Modal>
  );
});

import { memo } from 'react';
import { Database, Clock, UserCheck } from 'lucide-react';
import { Modal } from '../shared/Modal';

export const MasterRecordDetailModal = memo(function MasterRecordDetailModal({ isOpen, onClose, category, record }) {
  if (!category || !record) return null;

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={`${category.name} Details — ${record.code || record.id}`}
      icon={<Database size={18} color="var(--precision-blue)" />}
      width="450px"
    >
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', fontSize: '0.8rem', marginBottom: '1.25rem' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <span style={{ color: 'var(--text-muted)' }}>Record Status:</span>
          <span className={`badge ${record.status === 'Active' ? 'badge-success' : 'badge-warning'}`}>
            {record.status}
          </span>
        </div>

        {category.fields.map((f) => (
          <div key={f.key} style={{ display: 'flex', justifyContent: 'space-between' }}>
            <span style={{ color: 'var(--text-muted)' }}>{f.label}:</span>
            <span
              className={f.key === 'code' || f.key === 'id' ? 'mono-data' : ''}
              style={{ fontWeight: f.key === 'name' || f.key === 'code' ? '700' : 'normal' }}
            >
              {record[f.key] || '--'}
            </span>
          </div>
        ))}

        {/* Audit Metadata Section per PRD Section 6 */}
        <div style={{ marginTop: '0.75rem', background: 'var(--bg-input)', padding: '0.75rem', borderRadius: '4px', border: '1px solid var(--border-color)' }}>
          <div style={{ fontSize: '0.675rem', fontWeight: 800, textTransform: 'uppercase', color: 'var(--text-muted)', marginBottom: '6px', letterSpacing: '0.05em' }}>
            AUDIT & GOVERNANCE TRAIL
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px', fontSize: '0.725rem' }}>
            <div>
              <span style={{ fontSize: '0.625rem', color: 'var(--text-muted)', display: 'block' }}>CREATED BY</span>
              <span style={{ fontWeight: 600, display: 'flex', alignItems: 'center', gap: '4px' }}>
                <UserCheck size={11} aria-hidden="true" /> {record.createdBy || 'Super Admin'}
              </span>
              <span className="mono-data" style={{ fontSize: '0.625rem', color: 'var(--text-muted)' }}>
                {record.createdOn || '2025-01-10'}
              </span>
            </div>

            <div>
              <span style={{ fontSize: '0.625rem', color: 'var(--text-muted)', display: 'block' }}>LAST UPDATED BY</span>
              <span style={{ fontWeight: 600, display: 'flex', alignItems: 'center', gap: '4px' }}>
                <Clock size={11} aria-hidden="true" /> {record.updatedBy || 'Admin'}
              </span>
              <span className="mono-data" style={{ fontSize: '0.625rem', color: 'var(--text-muted)' }}>
                {record.updatedOn || '2026-07-28'}
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="modal-actions">
        <button className="btn btn-secondary btn-sm" onClick={onClose}>
          CLOSE
        </button>
      </div>
    </Modal>
  );
});

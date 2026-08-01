import { useState, memo, useCallback } from 'react';
import { useApp } from '../../context/AppContext';
import { Eye, CheckCircle2, ArrowRight } from 'lucide-react';
import { Modal } from '../shared/Modal';
import { AuditSeverityBadge } from './AuditLogsTable';

export const AuditLogDetailsDrawerModal = memo(function AuditLogDetailsDrawerModal({ isOpen, onClose, logItem }) {
  const { markAuditLogReviewed, addAuditNote } = useApp();
  const [noteText, setNoteText] = useState('');

  const handleAddNote = useCallback((e) => {
    e.preventDefault();
    if (!logItem || !noteText.trim()) return;

    addAuditNote(logItem.id, noteText);
    setNoteText('');
  }, [logItem, noteText, addAuditNote]);

  const handleMarkReviewed = useCallback(() => {
    if (!logItem) return;
    markAuditLogReviewed(logItem.id);
    onClose();
  }, [logItem, markAuditLogReviewed, onClose]);

  if (!logItem) return null;

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={`Audit Event Inspector — ${logItem.id}`}
      icon={<Eye size={18} color="var(--precision-blue)" />}
      width="580px"
    >
      <div>
        {/* Header Summary */}
        <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', padding: '0.85rem', background: 'var(--bg-input)', borderRadius: '4px', border: '1px solid var(--border-color)', marginBottom: '0.85rem' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '4px' }}>
              <AuditSeverityBadge severity={logItem.severity} />
              <span className="badge badge-info mono-data" style={{ fontSize: '0.625rem' }}>
                {logItem.module}
              </span>
            </div>
            <h3 style={{ fontSize: '1rem', fontWeight: 800, margin: 0 }}>
              {logItem.action}
            </h3>
            <p className="mono-data" style={{ fontSize: '0.725rem', color: 'var(--text-muted)', margin: '2px 0 0' }}>
              By: {logItem.user} ({logItem.timestamp})
            </p>
          </div>

          <span className={`badge ${logItem.status === 'Success' ? 'badge-success' : 'badge-danger'} mono-data`} style={{ fontSize: '0.625rem' }}>
            {logItem.status}
          </span>
        </div>

        {/* Details Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '0.75rem', fontSize: '0.75rem', marginBottom: '0.85rem' }}>
          <div>
            <span style={{ color: 'var(--text-muted)', fontSize: '0.675rem', display: 'block' }}>RECORD ID</span>
            <span className="mono-data" style={{ fontWeight: 700, color: 'var(--precision-blue)' }}>{logItem.recordId || 'N/A'}</span>
          </div>
          <div>
            <span style={{ color: 'var(--text-muted)', fontSize: '0.675rem', display: 'block' }}>RECORD TYPE</span>
            <span className="mono-data">{logItem.recordType || 'N/A'}</span>
          </div>
          <div>
            <span style={{ color: 'var(--text-muted)', fontSize: '0.675rem', display: 'block' }}>IP ADDRESS & GEO</span>
            <span className="mono-data">{logItem.ipAddress} ({logItem.location})</span>
          </div>
          <div>
            <span style={{ color: 'var(--text-muted)', fontSize: '0.675rem', display: 'block' }}>DEVICE / AGENT</span>
            <span className="mono-data">{logItem.device}</span>
          </div>
        </div>

        {/* JSON Before/After Diff */}
        <div style={{ marginBottom: '0.85rem' }}>
          <div style={{ fontWeight: 800, fontSize: '0.75rem', color: 'var(--text-muted)', textTransform: 'uppercase', marginBottom: '4px' }}>
            State Payload Diff (Before vs After)
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.5rem', fontFamily: 'var(--font-mono)', fontSize: '0.7rem' }}>
            <div style={{ padding: '0.6rem', background: 'rgba(220, 38, 38, 0.08)', border: '1px solid rgba(220, 38, 38, 0.3)', borderRadius: '4px' }}>
              <div style={{ fontWeight: 800, color: '#dc2626', marginBottom: '2px' }}>BEFORE STATE</div>
              <pre style={{ margin: 0, whiteSpace: 'pre-wrap' }}>
                {logItem.beforeState ? JSON.stringify(logItem.beforeState, null, 2) : 'null (Created)'}
              </pre>
            </div>

            <div style={{ padding: '0.6rem', background: 'rgba(22, 163, 74, 0.08)', border: '1px solid rgba(22, 163, 74, 0.3)', borderRadius: '4px' }}>
              <div style={{ fontWeight: 800, color: '#16a34a', marginBottom: '2px' }}>AFTER STATE</div>
              <pre style={{ margin: 0, whiteSpace: 'pre-wrap' }}>
                {logItem.afterState ? JSON.stringify(logItem.afterState, null, 2) : 'null (Deleted)'}
              </pre>
            </div>
          </div>
        </div>

        {/* Add Note Form */}
        <form onSubmit={handleAddNote} style={{ marginBottom: '0.85rem' }}>
          <label htmlFor="aud-note" className="form-label">INVESTIGATION AUDIT NOTE</label>
          <div style={{ display: 'flex', gap: '6px' }}>
            <input
              id="aud-note"
              type="text"
              placeholder="Add investigator note or compliance reference..."
              value={noteText}
              onChange={(e) => setNoteText(e.target.value)}
              className="form-input"
            />
            <button type="submit" className="btn btn-secondary btn-sm">
              ADD NOTE
            </button>
          </div>
        </form>

        {/* Modal Actions */}
        <div className="modal-actions">
          <button type="button" className="btn btn-secondary btn-sm" onClick={onClose}>
            CLOSE
          </button>
          <button type="button" className="btn btn-primary btn-sm" onClick={handleMarkReviewed}>
            <CheckCircle2 size={13} aria-hidden="true" /> MARK AS REVIEWED
          </button>
        </div>
      </div>
    </Modal>
  );
});

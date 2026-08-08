import { memo } from 'react';
import { Boxes } from 'lucide-react';
import { Modal } from '../../../shared/components/Modal';
import { InventoryTxnTypeBadge } from './RecentInventoryTransactionsTable';

export const InventoryItemDetailsModal = memo(function InventoryItemDetailsModal({ isOpen, onClose, transaction }) {
  if (!transaction) return null;

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={`Inventory Transaction — ${transaction.refNo}`}
      icon={<Boxes size={18} color="var(--precision-blue)" />}
      width="520px"
    >
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', fontSize: '0.8rem' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <span style={{ color: 'var(--text-muted)' }}>Transaction Type:</span>
          <InventoryTxnTypeBadge type={transaction.type} />
        </div>

        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <span style={{ color: 'var(--text-muted)' }}>Reference No:</span>
          <span className="mono-data" style={{ fontWeight: '800', color: 'var(--precision-blue)' }}>
            {transaction.refNo}
          </span>
        </div>

        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <span style={{ color: 'var(--text-muted)' }}>Material Item:</span>
          <span style={{ fontWeight: '700' }}>{transaction.item}</span>
        </div>

        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <span style={{ color: 'var(--text-muted)' }}>Quantity & Unit:</span>
          <span className="mono-data" style={{ fontWeight: '800' }}>{transaction.qty}</span>
        </div>

        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <span style={{ color: 'var(--text-muted)' }}>Warehouse / Site:</span>
          <span>{transaction.warehouseSite}</span>
        </div>

        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <span style={{ color: 'var(--text-muted)' }}>Operator / User:</span>
          <span>{transaction.user}</span>
        </div>

        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <span style={{ color: 'var(--text-muted)' }}>Date Recorded:</span>
          <span className="mono-data">{transaction.date}</span>
        </div>

        <div style={{ padding: '0.65rem', background: 'var(--bg-input)', borderRadius: '4px', borderLeft: '3px solid var(--precision-blue)' }}>
          <div style={{ fontSize: '0.675rem', fontWeight: 800, color: 'var(--text-muted)', textTransform: 'uppercase', marginBottom: '2px' }}>
            TRANSACTION REMARKS
          </div>
          <div>{transaction.remarks}</div>
        </div>
      </div>

      <div className="modal-actions" style={{ marginTop: '1.25rem' }}>
        <button className="btn btn-secondary btn-sm" onClick={onClose}>
          CLOSE
        </button>
      </div>
    </Modal>
  );
});

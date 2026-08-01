import { memo } from 'react';
import { IndianRupee } from 'lucide-react';
import { Modal } from '../shared/Modal';
import { FinanceTxnTypeBadge, FinanceStatusBadge } from './RecentFinanceTransactionsTable';

export const FinanceTransactionDetailsModal = memo(function FinanceTransactionDetailsModal({ isOpen, onClose, transaction }) {
  if (!transaction) return null;

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={`Voucher Details — ${transaction.voucherNo}`}
      icon={<IndianRupee size={18} color="var(--precision-blue)" />}
      width="520px"
    >
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', fontSize: '0.8rem' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <span style={{ color: 'var(--text-muted)' }}>Voucher Type:</span>
          <FinanceTxnTypeBadge type={transaction.type} />
        </div>

        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <span style={{ color: 'var(--text-muted)' }}>Status:</span>
          <FinanceStatusBadge status={transaction.status} />
        </div>

        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <span style={{ color: 'var(--text-muted)' }}>Voucher No:</span>
          <span className="mono-data" style={{ fontWeight: '800', color: 'var(--precision-blue)' }}>
            {transaction.voucherNo}
          </span>
        </div>

        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <span style={{ color: 'var(--text-muted)' }}>Party / Ledger:</span>
          <span style={{ fontWeight: '700' }}>{transaction.ledgerParty}</span>
        </div>

        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <span style={{ color: 'var(--text-muted)' }}>Project:</span>
          <span>{transaction.project}</span>
        </div>

        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <span style={{ color: 'var(--text-muted)' }}>Amount (₹):</span>
          <span className="mono-data" style={{ fontWeight: '800', color: transaction.type === 'Receipt' ? '#16a34a' : 'var(--text-main)', fontSize: '0.95rem' }}>
            {transaction.amount}
          </span>
        </div>

        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <span style={{ color: 'var(--text-muted)' }}>Date Recorded:</span>
          <span className="mono-data">{transaction.date}</span>
        </div>

        <div style={{ padding: '0.65rem', background: 'var(--bg-input)', borderRadius: '4px', borderLeft: '3px solid var(--precision-blue)' }}>
          <div style={{ fontSize: '0.675rem', fontWeight: 800, color: 'var(--text-muted)', textTransform: 'uppercase', marginBottom: '2px' }}>
            VOUCHER DESCRIPTION / REMARKS
          </div>
          <div>{transaction.description}</div>
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

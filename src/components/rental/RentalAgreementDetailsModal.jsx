import { memo } from 'react';
import { useApp } from '../../context/AppContext';
import { Key } from 'lucide-react';
import { Modal } from '../shared/Modal';
import { RentStatusBadge } from './RecentRentCollectionsTable';

export const RentalAgreementDetailsModal = memo(function RentalAgreementDetailsModal({ isOpen, onClose, collection }) {
  const { activePermissions, navigateTo } = useApp();

  if (!collection) return null;

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={`Rent Collection Receipt — ${collection.receiptNo}`}
      icon={<Key size={18} color="var(--precision-blue)" />}
      width="500px"
    >
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', fontSize: '0.8rem' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <span style={{ color: 'var(--text-muted)' }}>Payment Status:</span>
          <RentStatusBadge status={collection.status} />
        </div>

        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <span style={{ color: 'var(--text-muted)' }}>Receipt Number:</span>
          <span className="mono-data" style={{ fontWeight: '800', color: 'var(--precision-blue)' }}>
            {collection.receiptNo}
          </span>
        </div>

        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <span style={{ color: 'var(--text-muted)' }}>Tenant Name:</span>
          <span style={{ fontWeight: '700' }}>{collection.tenantName}</span>
        </div>

        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <span style={{ color: 'var(--text-muted)' }}>Unit & Project:</span>
          <span>{collection.unit} ({collection.project})</span>
        </div>

        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <span style={{ color: 'var(--text-muted)' }}>Rent Period:</span>
          <span className="mono-data">{collection.rentMonth}</span>
        </div>

        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <span style={{ color: 'var(--text-muted)' }}>Collected Amount:</span>
          <span className="mono-data" style={{ fontWeight: '800', color: '#16a34a', fontSize: '0.9rem' }}>
            {activePermissions.maskedFinance ? '₹ *** MASKED' : collection.amount}
          </span>
        </div>

        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <span style={{ color: 'var(--text-muted)' }}>Payment Mode:</span>
          <span className="mono-data">{collection.mode}</span>
        </div>

        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <span style={{ color: 'var(--text-muted)' }}>Realized Date:</span>
          <span className="mono-data">{collection.paidDate}</span>
        </div>
      </div>

      <div className="modal-actions" style={{ marginTop: '1.25rem' }}>
        <button
          className="btn btn-secondary btn-sm"
          onClick={() => {
            onClose();
            navigateTo('rental-mgmt', 'Rent Collection');
          }}
        >
          OPEN FULL RENT COLLECTION REGISTER →
        </button>
        <button className="btn btn-primary btn-sm" onClick={onClose}>
          CLOSE
        </button>
      </div>
    </Modal>
  );
});

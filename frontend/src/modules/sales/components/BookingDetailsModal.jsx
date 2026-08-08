import { memo } from 'react';
import { useApp } from '../../../core/providers/AppContext';
import { Building2, CheckCircle2, FileText, ArrowRight } from 'lucide-react';
import { Modal } from '../../../shared/components/Modal';
import { SalesStatusBadge } from './RecentBookingsTable';

export const BookingDetailsModal = memo(function BookingDetailsModal({ isOpen, onClose, booking }) {
  const { activePermissions, navigateTo } = useApp();

  if (!booking) return null;

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={`Booking ${booking.id}`}
      icon={<Building2 size={18} color="var(--precision-blue)" />}
      width="450px"
    >
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', fontSize: '0.8rem', marginBottom: '1.25rem' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <span style={{ color: 'var(--text-muted)' }}>Booking Status:</span>
          <SalesStatusBadge status={booking.status} />
        </div>

        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <span style={{ color: 'var(--text-muted)' }}>Customer Name:</span>
          <span style={{ fontWeight: '700' }}>{booking.customerName}</span>
        </div>

        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <span style={{ color: 'var(--text-muted)' }}>Mobile / Phone:</span>
          <span className="mono-data">{booking.mobile}</span>
        </div>

        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <span style={{ color: 'var(--text-muted)' }}>Project & Unit:</span>
          <span style={{ fontWeight: '700' }}>{booking.unit} ({booking.project})</span>
        </div>

        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <span style={{ color: 'var(--text-muted)' }}>Agreement Value:</span>
          <span className="mono-data" style={{ fontWeight: '800', color: 'var(--precision-blue)' }}>
            {activePermissions.maskedFinance ? '₹ *** MASKED' : booking.salesAmount}
          </span>
        </div>

        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <span style={{ color: 'var(--text-muted)' }}>Token Paid:</span>
          <span className="mono-data" style={{ fontWeight: '700', color: 'var(--color-success)' }}>
            {activePermissions.maskedFinance ? '₹ ***' : booking.bookingAmount}
          </span>
        </div>

        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <span style={{ color: 'var(--text-muted)' }}>Payment Plan:</span>
          <span>{booking.paymentPlan}</span>
        </div>

        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <span style={{ color: 'var(--text-muted)' }}>Assigned Executive:</span>
          <span>{booking.executive}</span>
        </div>

        {/* Workflow Milestones Preview */}
        <div style={{ marginTop: '0.5rem', background: 'var(--bg-input)', padding: '0.65rem', borderRadius: '4px' }}>
          <div style={{ fontSize: '0.675rem', fontWeight: 800, textTransform: 'uppercase', color: 'var(--text-muted)', marginBottom: '4px' }}>
            WORKFLOW MILESTONE STATUS
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '4px', fontSize: '0.725rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <CheckCircle2 size={13} color="#16a34a" aria-hidden="true" />
              <span>Booking Token Confirmed</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <FileText size={13} color="var(--precision-blue)" aria-hidden="true" />
              <span>Sale Agreement Draft Generated</span>
            </div>
          </div>
        </div>
      </div>

      <div className="modal-actions">
        <button className="btn btn-secondary btn-sm" onClick={onClose}>
          CLOSE
        </button>
        <button
          className="btn btn-primary btn-sm"
          onClick={() => {
            onClose();
            navigateTo('sales', 'Agreements');
          }}
        >
          GENERATE AGREEMENT <ArrowRight size={13} aria-hidden="true" />
        </button>
      </div>
    </Modal>
  );
});

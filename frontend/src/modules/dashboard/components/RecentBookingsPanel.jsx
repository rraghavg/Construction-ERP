import { useState, memo, useCallback } from 'react';
import { useApp } from '../../../core/providers/AppContext';
import { RECENT_BOOKINGS_DATA } from '../../../data/mockData';
import { ShoppingCart } from 'lucide-react';
import { PanelHeader } from '../../../shared/components/PanelHeader';
import { WidgetSkeleton } from '../../../shared/components/WidgetSkeleton';
import { Modal } from '../../../shared/components/Modal';
import { MaskedOverlay } from '../../../shared/components/MaskedOverlay';

export const RecentBookingsPanel = memo(function RecentBookingsPanel() {
  const { isRefreshing, activePermissions, navigateTo } = useApp();
  const [selectedBooking, setSelectedBooking] = useState(null);

  const handleBookingClick = useCallback((booking) => {
    setSelectedBooking(booking);
  }, []);

  const handleBookingKeyDown = useCallback((e, booking) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      setSelectedBooking(booking);
    }
  }, []);

  const handleNavigateToBookings = useCallback(() => {
    setSelectedBooking(null);
    navigateTo('sales', 'Bookings');
  }, [navigateTo]);

  if (isRefreshing) {
    return <WidgetSkeleton height="200px" className="panel-card" />;
  }

  return (
    <div className="panel-card">
      <PanelHeader
        title="Recent Bookings"
        icon={<ShoppingCart size={15} color="var(--precision-blue)" />}
        accentColor="#2563eb"
        actionLabel="VIEW ALL"
        onAction={handleNavigateToBookings}
      />

      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem' }}>
        {RECENT_BOOKINGS_DATA.map((item) => (
          <div
            key={item.id}
            tabIndex={0}
            role="button"
            className="structural-card"
            style={{ padding: '0.65rem', marginBottom: 0 }}
            onClick={() => handleBookingClick(item)}
            onKeyDown={(e) => handleBookingKeyDown(e, item)}
            aria-label={`Booking ${item.unit}: Customer ${item.customer}, Project ${item.project}`}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontWeight: '800', fontSize: '0.775rem' }}>{item.unit}</span>
              <span className="badge badge-info">{item.project}</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '4px' }}>
              <span style={{ fontSize: '0.725rem', color: 'var(--text-muted)' }}>{item.customer}</span>
              <span className="mono-data" style={{ fontWeight: '700', fontSize: '0.75rem' }}>
                {activePermissions.maskedFinance ? '₹ ***' : `₹ ${item.amount}`}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Booking Quick Details Modal */}
      <Modal
        isOpen={!!selectedBooking}
        onClose={() => setSelectedBooking(null)}
        title={`Booking ${selectedBooking?.id}`}
        icon={<ShoppingCart size={18} color="var(--precision-blue)" />}
      >
        {selectedBooking && (
          <div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem', fontSize: '0.8rem', marginBottom: '1.25rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: 'var(--text-muted)' }}>Customer Name:</span>
                <span style={{ fontWeight: '700' }}>{selectedBooking.customer}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: 'var(--text-muted)' }}>Unit / Flat:</span>
                <span style={{ fontWeight: '700' }}>{selectedBooking.unit} ({selectedBooking.project})</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: 'var(--text-muted)' }}>Total Amount:</span>
                <span className="mono-data" style={{ fontWeight: '800', color: 'var(--precision-blue)' }}>
                  {activePermissions.maskedFinance ? '₹ *** MASKED' : `₹ ${selectedBooking.amount}`}
                </span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: 'var(--text-muted)' }}>Booking Date:</span>
                <span className="mono-data">{selectedBooking.date}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: 'var(--text-muted)' }}>Sales Executive:</span>
                <span>{selectedBooking.executive}</span>
              </div>
            </div>

            <div className="modal-actions">
              <button className="btn btn-secondary btn-sm" onClick={() => setSelectedBooking(null)}>
                CLOSE
              </button>
              <button className="btn btn-primary btn-sm" onClick={handleNavigateToBookings}>
                VIEW IN SALES MODULE
              </button>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
});

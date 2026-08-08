import { useMemo, memo, useCallback } from 'react';
import { useApp } from '../../../core/providers/AppContext';
import { Eye, Edit3, Phone, Plus } from 'lucide-react';
import { PanelHeader } from '../../../shared/components/PanelHeader';

const SALES_STATUS_CONFIG = {
  'Confirmed':   { bg: 'rgba(22, 163, 74, 0.12)',  color: '#15803d', border: 'rgba(22, 163, 74, 0.3)' },
  'Agreement':   { bg: 'rgba(37, 99, 235, 0.12)',  color: '#1d4ed8', border: 'rgba(37, 99, 235, 0.3)' },
  'In Progress': { bg: 'rgba(249, 115, 22, 0.12)', color: '#c2410c', border: 'rgba(249, 115, 22, 0.3)' },
  'Hold':        { bg: 'rgba(100, 116, 139, 0.12)',color: '#475569', border: 'rgba(100, 116, 139, 0.3)' },
  'Overdue':     { bg: 'rgba(220, 38, 38, 0.12)',  color: '#b91c1c', border: 'rgba(220, 38, 38, 0.3)' },
  'Cancelled':   { bg: 'rgba(136, 19, 55, 0.12)',  color: '#881337', border: 'rgba(136, 19, 55, 0.3)' },
  'Completed':   { bg: 'rgba(15, 118, 110, 0.12)', color: '#0f766e', border: 'rgba(15, 118, 110, 0.3)' },
  'Upcoming':    { bg: 'rgba(2, 132, 199, 0.12)',  color: '#0284c7', border: 'rgba(2, 132, 199, 0.3)' }
};

export const SalesStatusBadge = memo(function SalesStatusBadge({ status }) {
  const cfg = SALES_STATUS_CONFIG[status] || { bg: 'rgba(100,116,139,0.12)', color: '#475569', border: 'rgba(100,116,139,0.3)' };

  return (
    <span
      className="badge mono-data"
      style={{
        background: cfg.bg,
        color: cfg.color,
        border: `1px solid ${cfg.border}`,
        fontSize: '0.675rem'
      }}
    >
      {status}
    </span>
  );
});

export const RecentBookingsTable = memo(function RecentBookingsTable({ onOpenAddModal, onSelectBooking }) {
  const { salesBookings, selectedBooking, setSelectedBooking, activePermissions, navigateTo, showToast } = useApp();

  const handleBookingSelect = useCallback((booking) => {
    setSelectedBooking(booking);
    onSelectBooking(booking);
  }, [setSelectedBooking, onSelectBooking]);

  const handleBookingKeyDown = useCallback((e, booking) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      handleBookingSelect(booking);
    }
  }, [handleBookingSelect]);

  const handleCall = useCallback((e, booking) => {
    e.stopPropagation();
    showToast(`Initiating customer call with ${booking.customerName} (${booking.mobile})...`, 'info');
  }, [showToast]);

  const handleEdit = useCallback((e, booking) => {
    e.stopPropagation();
    setSelectedBooking(booking);
    showToast(`Opening booking record ${booking.id} for modification`, 'info');
  }, [setSelectedBooking, showToast]);

  const handleNavigateToBookings = useCallback(() => {
    navigateTo('sales', 'Bookings');
  }, [navigateTo]);

  return (
    <div className="panel-card" style={{ padding: '1.25rem' }}>
      <PanelHeader
        title="Recent Bookings Register"
        accentColor="#2563eb"
        actionLabel="ALL BOOKINGS"
        onAction={handleNavigateToBookings}
      >
        <button
          className="btn btn-primary btn-sm"
          onClick={onOpenAddModal}
          aria-label="Create New Booking"
        >
          <Plus size={14} aria-hidden="true" /> NEW BOOKING
        </button>
      </PanelHeader>

      <div style={{ overflowX: 'auto', border: '1px solid var(--border-color)', borderRadius: '4px' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.8rem' }} aria-label="Recent bookings table">
          <thead>
            <tr style={{ background: 'var(--bg-input)', borderBottom: '1px solid var(--border-color)', fontSize: '0.7rem', color: 'var(--text-muted)' }}>
              <th style={{ padding: '0.65rem 0.75rem' }}>BOOKING NO.</th>
              <th style={{ padding: '0.65rem 0.75rem' }}>CUSTOMER</th>
              <th style={{ padding: '0.65rem 0.75rem' }}>PROJECT & UNIT</th>
              <th style={{ padding: '0.65rem 0.75rem' }}>DATE</th>
              <th style={{ padding: '0.65rem 0.75rem' }}>SALES VALUE (₹)</th>
              <th style={{ padding: '0.65rem 0.75rem' }}>TOKEN PAID (₹)</th>
              <th style={{ padding: '0.65rem 0.75rem' }}>STATUS</th>
              <th style={{ padding: '0.65rem 0.75rem', textAlign: 'right' }}>ACTIONS</th>
            </tr>
          </thead>
          <tbody>
            {salesBookings.map((booking) => {
              const isSelected = selectedBooking?.id === booking.id;

              return (
                <tr
                  key={booking.id}
                  tabIndex={0}
                  role="button"
                  onClick={() => handleBookingSelect(booking)}
                  onKeyDown={(e) => handleBookingKeyDown(e, booking)}
                  aria-selected={isSelected}
                  style={{
                    borderBottom: '1px solid var(--border-color)',
                    background: isSelected ? 'rgba(37, 99, 235, 0.08)' : 'transparent',
                    cursor: 'pointer',
                    transition: 'background 0.2s ease'
                  }}
                >
                  <td className="mono-data" style={{ padding: '0.75rem', fontWeight: '700', color: 'var(--precision-blue)' }}>
                    {booking.id}
                  </td>
                  <td style={{ padding: '0.75rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <div
                        style={{
                          width: '28px',
                          height: '28px',
                          borderRadius: '50%',
                          background: 'var(--structural-slate)',
                          color: '#ffffff',
                          display: 'grid',
                          placeItems: 'center',
                          fontWeight: '800',
                          fontSize: '0.625rem',
                          fontFamily: 'var(--font-mono)'
                        }}
                        aria-hidden="true"
                      >
                        {booking.initials}
                      </div>
                      <div>
                        <div style={{ fontWeight: '700' }}>{booking.customerName}</div>
                        <div className="mono-data" style={{ fontSize: '0.65rem', color: 'var(--text-muted)' }}>
                          {booking.mobile}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td style={{ padding: '0.75rem' }}>
                    <div style={{ fontWeight: '700' }}>{booking.unit}</div>
                    <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>{booking.project}</div>
                  </td>
                  <td className="mono-data" style={{ padding: '0.75rem', fontSize: '0.725rem' }}>
                    {booking.bookingDate}
                  </td>
                  <td className="mono-data" style={{ padding: '0.75rem', fontWeight: '800' }}>
                    {activePermissions.maskedFinance ? '₹ *** MASKED' : booking.salesAmount}
                  </td>
                  <td className="mono-data" style={{ padding: '0.75rem', color: 'var(--color-success)', fontWeight: '700' }}>
                    {activePermissions.maskedFinance ? '₹ ***' : booking.bookingAmount}
                  </td>
                  <td style={{ padding: '0.75rem' }}>
                    <SalesStatusBadge status={booking.status} />
                  </td>
                  <td style={{ padding: '0.75rem', textAlign: 'right' }}>
                    <div style={{ display: 'inline-flex', gap: '4px' }}>
                      <button
                        className="btn btn-secondary btn-sm"
                        style={{ padding: '3px 7px' }}
                        onClick={(e) => {
                          e.stopPropagation();
                          handleBookingSelect(booking);
                        }}
                        title="View Details"
                        aria-label={`View booking ${booking.id}`}
                      >
                        <Eye size={12} aria-hidden="true" />
                      </button>
                      <button
                        className="btn btn-secondary btn-sm"
                        style={{ padding: '3px 7px' }}
                        onClick={(e) => handleEdit(e, booking)}
                        title="Edit Booking"
                        aria-label={`Edit booking ${booking.id}`}
                      >
                        <Edit3 size={12} aria-hidden="true" />
                      </button>
                      <button
                        className="btn btn-secondary btn-sm"
                        style={{ padding: '3px 7px' }}
                        onClick={(e) => handleCall(e, booking)}
                        title="Call Customer"
                        aria-label={`Call ${booking.customerName}`}
                      >
                        <Phone size={12} aria-hidden="true" />
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
});

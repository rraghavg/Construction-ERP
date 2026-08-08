import { useMemo, memo, useCallback } from 'react';
import { useApp } from '../../../core/providers/AppContext';
import { Eye, Edit3, Phone, Plus, ExternalLink } from 'lucide-react';
import { PanelHeader } from '../../../shared/components/PanelHeader';

export const CustomerKycBadge = memo(function CustomerKycBadge({ kycStatus }) {
  let badgeStyle = { bg: 'rgba(22, 163, 74, 0.12)', color: '#15803d', border: 'rgba(22, 163, 74, 0.3)' };

  if (kycStatus === 'Pending') {
    badgeStyle = { bg: 'rgba(249, 115, 22, 0.12)', color: '#c2410c', border: 'rgba(249, 115, 22, 0.3)' };
  } else if (kycStatus === 'Expired') {
    badgeStyle = { bg: 'rgba(220, 38, 38, 0.12)', color: '#b91c1c', border: 'rgba(220, 38, 38, 0.3)' };
  }

  return (
    <span
      className="badge mono-data"
      style={{
        background: badgeStyle.bg,
        color: badgeStyle.color,
        border: `1px solid ${badgeStyle.border}`,
        fontSize: '0.65rem'
      }}
    >
      {kycStatus}
    </span>
  );
});

export const RecentCustomersTable = memo(function RecentCustomersTable({ onOpenAddModal, onSelectCustomer }) {
  const { customers, selectedCustomer, setSelectedCustomer, navigateTo, showToast } = useApp();

  const handleCustomerSelect = useCallback((cust) => {
    setSelectedCustomer(cust);
    onSelectCustomer(cust);
  }, [setSelectedCustomer, onSelectCustomer]);

  const handleCustomerKeyDown = useCallback((e, cust) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      handleCustomerSelect(cust);
    }
  }, [handleCustomerSelect]);

  const handleCall = useCallback((e, cust) => {
    e.stopPropagation();
    showToast(`Initiating call with ${cust.name} (${cust.mobile})...`, 'info');
  }, [showToast]);

  const handleOpenBooking = useCallback((e, bookingRef) => {
    e.stopPropagation();
    showToast(`Opening linked booking record: ${bookingRef}`, 'info');
    navigateTo('sales', 'Bookings');
  }, [navigateTo, showToast]);

  return (
    <div className="panel-card" style={{ padding: '1.25rem' }}>
      <PanelHeader
        title="Recent Customers Register"
        accentColor="#2563eb"
        actionLabel="ALL CUSTOMERS"
        onAction={() => navigateTo('customer-mgmt', 'Customers Directory')}
      >
        <button
          className="btn btn-primary btn-sm"
          onClick={onOpenAddModal}
          aria-label="Add New Customer"
        >
          <Plus size={14} aria-hidden="true" /> ADD CUSTOMER
        </button>
      </PanelHeader>

      <div style={{ overflowX: 'auto', border: '1px solid var(--border-color)', borderRadius: '4px' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.8rem' }} aria-label="Recent customers table">
          <thead>
            <tr style={{ background: 'var(--bg-input)', borderBottom: '1px solid var(--border-color)', fontSize: '0.7rem', color: 'var(--text-muted)' }}>
              <th style={{ padding: '0.65rem 0.75rem' }}>CUSTOMER ID</th>
              <th style={{ padding: '0.65rem 0.75rem' }}>NAME & TYPE</th>
              <th style={{ padding: '0.65rem 0.75rem' }}>CONTACT PHONE</th>
              <th style={{ padding: '0.65rem 0.75rem' }}>EMAIL ADDRESS</th>
              <th style={{ padding: '0.65rem 0.75rem' }}>CITY</th>
              <th style={{ padding: '0.65rem 0.75rem' }}>LINKED BOOKING</th>
              <th style={{ padding: '0.65rem 0.75rem' }}>KYC STATUS</th>
              <th style={{ padding: '0.65rem 0.75rem', textAlign: 'right' }}>ACTIONS</th>
            </tr>
          </thead>
          <tbody>
            {customers.map((cust) => {
              const isSelected = selectedCustomer?.id === cust.id;

              return (
                <tr
                  key={cust.id}
                  tabIndex={0}
                  role="button"
                  onClick={() => handleCustomerSelect(cust)}
                  onKeyDown={(e) => handleCustomerKeyDown(e, cust)}
                  aria-selected={isSelected}
                  style={{
                    borderBottom: '1px solid var(--border-color)',
                    background: isSelected ? 'rgba(37, 99, 235, 0.08)' : 'transparent',
                    cursor: 'pointer',
                    transition: 'background 0.2s ease'
                  }}
                >
                  <td className="mono-data" style={{ padding: '0.75rem', fontWeight: '700', color: 'var(--precision-blue)' }}>
                    {cust.id}
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
                        {cust.initials}
                      </div>
                      <div>
                        <div style={{ fontWeight: '700' }}>{cust.name}</div>
                        <span className="badge badge-info mono-data" style={{ fontSize: '0.6rem' }}>
                          {cust.type}
                        </span>
                      </div>
                    </div>
                  </td>
                  <td className="mono-data" style={{ padding: '0.75rem', fontSize: '0.725rem' }}>
                    {cust.mobile}
                  </td>
                  <td className="mono-data" style={{ padding: '0.75rem', fontSize: '0.725rem' }}>
                    {cust.email}
                  </td>
                  <td style={{ padding: '0.75rem' }}>
                    {cust.city}
                  </td>
                  <td style={{ padding: '0.75rem' }}>
                    {cust.linkedBooking && cust.linkedBooking !== '--' ? (
                      <button
                        className="mono-data btn btn-secondary btn-sm"
                        style={{ padding: '2px 6px', fontSize: '0.65rem', color: 'var(--precision-blue)' }}
                        onClick={(e) => handleOpenBooking(e, cust.linkedBooking)}
                        aria-label={`Open linked booking ${cust.linkedBooking}`}
                      >
                        {cust.linkedBooking} <ExternalLink size={10} aria-hidden="true" />
                      </button>
                    ) : (
                      <span className="mono-data" style={{ color: 'var(--text-muted)' }}>--</span>
                    )}
                  </td>
                  <td style={{ padding: '0.75rem' }}>
                    <CustomerKycBadge kycStatus={cust.kycStatus} />
                  </td>
                  <td style={{ padding: '0.75rem', textAlign: 'right' }}>
                    <div style={{ display: 'inline-flex', gap: '4px' }}>
                      <button
                        className="btn btn-secondary btn-sm"
                        style={{ padding: '3px 7px' }}
                        onClick={(e) => {
                          e.stopPropagation();
                          handleCustomerSelect(cust);
                        }}
                        title="View 360° Profile"
                        aria-label={`View 360 profile for ${cust.name}`}
                      >
                        <Eye size={12} aria-hidden="true" />
                      </button>
                      <button
                        className="btn btn-secondary btn-sm"
                        style={{ padding: '3px 7px' }}
                        onClick={(e) => handleCall(e, cust)}
                        title="Call Customer"
                        aria-label={`Call customer ${cust.name}`}
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

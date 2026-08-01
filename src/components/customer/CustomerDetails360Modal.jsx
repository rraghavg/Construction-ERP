import { useState, memo, useCallback } from 'react';
import { useApp } from '../../context/AppContext';
import { User, ShieldCheck, Heart, Building2, MessageSquare, CheckCircle2 } from 'lucide-react';
import { Modal } from '../shared/Modal';
import { CustomerKycBadge } from './RecentCustomersTable';

export const CustomerDetails360Modal = memo(function CustomerDetails360Modal({ isOpen, onClose, customer }) {
  const { updateCustomerKyc, navigateTo } = useApp();
  const [activeTab, setActiveTab] = useState('profile');

  const handleVerifyKyc = useCallback(() => {
    if (!customer) return;
    updateCustomerKyc(customer.id, 'Verified');
  }, [customer, updateCustomerKyc]);

  if (!customer) return null;

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={`360° Customer Profile — ${customer.name} (${customer.id})`}
      icon={<User size={18} color="var(--precision-blue)" />}
      width="540px"
    >
      {/* 5 Tabs Header Navigation */}
      <div
        style={{
          display: 'flex',
          gap: '4px',
          borderBottom: '1px solid var(--border-color)',
          marginBottom: '1rem',
          fontSize: '0.725rem'
        }}
        role="tablist"
        aria-label="360 Customer view tabs"
      >
        <button
          className={`btn ${activeTab === 'profile' ? 'btn-primary' : 'btn-secondary'} btn-sm`}
          onClick={() => setActiveTab('profile')}
          role="tab"
          aria-selected={activeTab === 'profile'}
          style={{ padding: '0.35rem 0.65rem' }}
        >
          <User size={12} aria-hidden="true" /> Profile
        </button>
        <button
          className={`btn ${activeTab === 'kyc' ? 'btn-primary' : 'btn-secondary'} btn-sm`}
          onClick={() => setActiveTab('kyc')}
          role="tab"
          aria-selected={activeTab === 'kyc'}
          style={{ padding: '0.35rem 0.65rem' }}
        >
          <ShieldCheck size={12} aria-hidden="true" /> KYC Docs
        </button>
        <button
          className={`btn ${activeTab === 'nominee' ? 'btn-primary' : 'btn-secondary'} btn-sm`}
          onClick={() => setActiveTab('nominee')}
          role="tab"
          aria-selected={activeTab === 'nominee'}
          style={{ padding: '0.35rem 0.65rem' }}
        >
          <Heart size={12} aria-hidden="true" /> Nominee
        </button>
        <button
          className={`btn ${activeTab === 'bookings' ? 'btn-primary' : 'btn-secondary'} btn-sm`}
          onClick={() => setActiveTab('bookings')}
          role="tab"
          aria-selected={activeTab === 'bookings'}
          style={{ padding: '0.35rem 0.65rem' }}
        >
          <Building2 size={12} aria-hidden="true" /> Bookings
        </button>
        <button
          className={`btn ${activeTab === 'comm' ? 'btn-primary' : 'btn-secondary'} btn-sm`}
          onClick={() => setActiveTab('comm')}
          role="tab"
          aria-selected={activeTab === 'comm'}
          style={{ padding: '0.35rem 0.65rem' }}
        >
          <MessageSquare size={12} aria-hidden="true" /> History
        </button>
      </div>

      {/* Tab 1: Profile */}
      {activeTab === 'profile' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem', fontSize: '0.8rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ color: 'var(--text-muted)' }}>Account Status:</span>
            <span className="badge badge-success">{customer.status}</span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <span style={{ color: 'var(--text-muted)' }}>Customer Name:</span>
            <span style={{ fontWeight: '700' }}>{customer.name}</span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <span style={{ color: 'var(--text-muted)' }}>Customer Category:</span>
            <span className="mono-data">{customer.type}</span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <span style={{ color: 'var(--text-muted)' }}>Mobile Phone:</span>
            <span className="mono-data">{customer.mobile}</span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <span style={{ color: 'var(--text-muted)' }}>Email Address:</span>
            <span className="mono-data">{customer.email}</span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <span style={{ color: 'var(--text-muted)' }}>City / Location:</span>
            <span>{customer.city}</span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <span style={{ color: 'var(--text-muted)' }}>Onboarding Date:</span>
            <span className="mono-data">{customer.joinedDate}</span>
          </div>
        </div>
      )}

      {/* Tab 2: KYC Documents */}
      {activeTab === 'kyc' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', fontSize: '0.8rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ color: 'var(--text-muted)' }}>Overall KYC Status:</span>
            <CustomerKycBadge kycStatus={customer.kycStatus} />
          </div>

          <div style={{ border: '1px solid var(--border-color)', borderRadius: '4px', padding: '0.65rem', background: 'var(--bg-input)' }}>
            <div style={{ fontSize: '0.675rem', fontWeight: 800, textTransform: 'uppercase', color: 'var(--text-muted)', marginBottom: '6px' }}>
              VERIFIED IDENTIFICATION DOCUMENTS
            </div>
            {customer.kycDocuments?.map((doc, idx) => (
              <div key={idx} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '0.75rem', padding: '4px 0', borderBottom: idx < customer.kycDocuments.length - 1 ? '1px solid var(--border-color)' : 'none' }}>
                <div>
                  <div style={{ fontWeight: '700' }}>{doc.type}</div>
                  <div className="mono-data" style={{ fontSize: '0.675rem', color: 'var(--text-muted)' }}>{doc.number}</div>
                </div>
                <span className={`badge ${doc.status === 'Verified' ? 'badge-success' : 'badge-warning'}`}>
                  {doc.status}
                </span>
              </div>
            ))}
          </div>

          {customer.kycStatus !== 'Verified' && (
            <button className="btn btn-primary btn-sm" onClick={handleVerifyKyc} style={{ alignSelf: 'flex-start' }}>
              <CheckCircle2 size={13} aria-hidden="true" /> MARK KYC VERIFIED
            </button>
          )}
        </div>
      )}

      {/* Tab 3: Nominee */}
      {activeTab === 'nominee' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem', fontSize: '0.8rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <span style={{ color: 'var(--text-muted)' }}>Nominee Name:</span>
            <span style={{ fontWeight: '700' }}>{customer.nominee?.name || 'N/A'}</span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <span style={{ color: 'var(--text-muted)' }}>Relationship:</span>
            <span>{customer.nominee?.relation || '--'}</span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <span style={{ color: 'var(--text-muted)' }}>Contact Mobile:</span>
            <span className="mono-data">{customer.nominee?.mobile || '--'}</span>
          </div>
        </div>
      )}

      {/* Tab 4: Linked Bookings */}
      {activeTab === 'bookings' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem', fontSize: '0.8rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ color: 'var(--text-muted)' }}>Linked Sales Booking:</span>
            <span className="mono-data" style={{ fontWeight: '800', color: 'var(--precision-blue)' }}>
              {customer.linkedBooking || 'None'}
            </span>
          </div>

          {customer.linkedBooking && customer.linkedBooking !== '--' ? (
            <button
              className="btn btn-secondary btn-sm"
              onClick={() => {
                onClose();
                navigateTo('sales', 'Bookings');
              }}
              style={{ marginTop: '0.5rem' }}
            >
              VIEW BOOKING RECORD IN SALES MODULE →
            </button>
          ) : (
            <div style={{ fontSize: '0.725rem', color: 'var(--text-muted)', marginTop: '4px' }}>
              No active property booking linked to this customer profile yet.
            </div>
          )}
        </div>
      )}

      {/* Tab 5: Communication History */}
      {activeTab === 'comm' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', fontSize: '0.775rem' }}>
          {customer.communicationHistory?.map((item) => (
            <div key={item.id} style={{ padding: '0.5rem', background: 'var(--bg-input)', borderLeft: '3px solid var(--precision-blue)', borderRadius: '2px' }}>
              <div className="mono-data" style={{ fontSize: '0.65rem', color: 'var(--text-muted)' }}>
                {item.date}
              </div>
              <div style={{ marginTop: '2px' }}>{item.note}</div>
            </div>
          ))}
        </div>
      )}

      <div className="modal-actions" style={{ marginTop: '1.25rem' }}>
        <button className="btn btn-secondary btn-sm" onClick={onClose}>
          CLOSE
        </button>
      </div>
    </Modal>
  );
});

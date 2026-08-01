import { memo, useEffect, useRef, useCallback } from 'react';
import { X } from 'lucide-react';

/**
 * Shared Modal component with accessibility: focus trapping, Escape key, ARIA dialog semantics.
 * @param {boolean} isOpen - Whether the modal is visible
 * @param {function} onClose - Callback to close the modal
 * @param {string} title - Modal title text
 * @param {React.ReactNode} icon - Optional icon element for the header
 * @param {React.ReactNode} children - Modal body content
 * @param {string} width - Optional CSS width (default: '400px')
 */
export const Modal = memo(function Modal({ isOpen, onClose, title, icon, children, width = '400px' }) {
  const overlayRef = useRef(null);
  const containerRef = useRef(null);
  const previousFocus = useRef(null);

  // Trap focus and restore on close
  useEffect(() => {
    if (!isOpen) return;

    previousFocus.current = document.activeElement;

    // Focus the container after mount
    const timer = requestAnimationFrame(() => {
      containerRef.current?.focus();
    });

    return () => {
      cancelAnimationFrame(timer);
      previousFocus.current?.focus();
    };
  }, [isOpen]);

  // Escape key handler
  const handleKeyDown = useCallback((e) => {
    if (e.key === 'Escape') {
      e.stopPropagation();
      onClose();
    }

    // Basic focus trapping
    if (e.key === 'Tab' && containerRef.current) {
      const focusable = containerRef.current.querySelectorAll(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
      );
      const first = focusable[0];
      const last = focusable[focusable.length - 1];

      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last?.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first?.focus();
      }
    }
  }, [onClose]);

  // Click outside to close
  const handleOverlayClick = useCallback((e) => {
    if (e.target === overlayRef.current) {
      onClose();
    }
  }, [onClose]);

  if (!isOpen) return null;

  const modalId = `modal-title-${title?.replace(/\s+/g, '-').toLowerCase()}`;

  return (
    <div
      ref={overlayRef}
      className="modal-overlay"
      onClick={handleOverlayClick}
      onKeyDown={handleKeyDown}
      role="dialog"
      aria-modal="true"
      aria-labelledby={modalId}
    >
      <div
        ref={containerRef}
        className="modal-container"
        style={{ width }}
        tabIndex={-1}
      >
        <div className="modal-header">
          <div className="modal-title-group">
            {icon && <div className="modal-icon-box" aria-hidden="true">{icon}</div>}
            <h3 id={modalId} style={{ fontSize: '0.95rem', fontWeight: 800 }}>{title}</h3>
          </div>
          <button className="modal-close-btn" onClick={onClose} aria-label="Close dialog">
            <X size={18} />
          </button>
        </div>
        {children}
      </div>
    </div>
  );
});

import { memo } from 'react';
import { useApp } from '../../core/providers/AppContext';
import { MODULES_LIST } from '../../data/mockData';

export const SubmoduleNavHeader = memo(function SubmoduleNavHeader({
  moduleId,
  title,
  subtitle,
  actionButton
}) {
  const { activeModule, activeSubmodule, navigateTo } = useApp();

  const currentMod = MODULES_LIST.find((m) => m.id === (moduleId || activeModule));
  const submodules = currentMod?.submodules || [];

  const displayTitle = title || `${currentMod?.name || 'Module'} Command Center`;
  const displaySubtitle = subtitle || activeSubmodule || 'Overview';

  return (
    <div
      style={{
        background: 'var(--m3-surface-container-lowest)',
        border: '1px solid var(--m3-outline-variant)',
        borderRadius: '10px',
        padding: '12px 16px',
        marginBottom: '16px',
        boxShadow: 'var(--shadow-sm)',
        display: 'flex',
        flexDirection: 'column',
        gap: '10px'
      }}
    >
      {/* Top Row: Title, Breadcrumb, and Action Button */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '10px'
        }}
      >
        <div style={{ minWidth: 0, flex: '1 1 auto' }}>
          <div
            style={{
              fontSize: '11px',
              fontWeight: 500,
              color: 'var(--m3-on-surface-variant)',
              letterSpacing: '0.5px',
              marginBottom: '2px',
              display: 'flex',
              alignItems: 'center',
              gap: '4px'
            }}
          >
            <span>{currentMod?.name || 'Module'}</span>
            <span>&rsaquo;</span>
            <span style={{ color: 'var(--m3-primary)', fontWeight: 600 }}>{displaySubtitle}</span>
          </div>
          <h2
            style={{
              fontSize: '18px',
              fontWeight: 600,
              lineHeight: '24px',
              color: 'var(--m3-on-surface)',
              margin: 0,
              letterSpacing: '-0.01em'
            }}
          >
            {displayTitle}
          </h2>
        </div>

        {actionButton && (
          <div style={{ flexShrink: 0 }}>
            {actionButton}
          </div>
        )}
      </div>

      {/* Bottom Row: Submodule Tabs — Wrapped cleanly, compact padding, zero scrollbar */}
      {submodules && submodules.length > 0 && (
        <nav
          aria-label="Submodule navigation"
          style={{
            display: 'flex',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: '4px 6px',
            paddingTop: '6px',
            borderTop: '1px solid var(--m3-surface-container-high)'
          }}
        >
          {submodules.map((sub) => {
            const isActive = (activeSubmodule === sub) || (!activeSubmodule && sub === submodules[0]);

            return (
              <button
                key={sub}
                type="button"
                onClick={() => navigateTo(moduleId || activeModule, sub)}
                style={{
                  fontSize: '12px',
                  fontWeight: isActive ? 600 : 500,
                  padding: '4px 11px',
                  borderRadius: '9999px',
                  border: isActive ? '1px solid var(--m3-primary)' : '1px solid var(--m3-outline-variant)',
                  background: isActive ? 'var(--m3-secondary-container)' : 'var(--m3-surface-container-lowest)',
                  color: isActive ? 'var(--m3-on-secondary-container)' : 'var(--m3-on-surface-variant)',
                  cursor: 'pointer',
                  whiteSpace: 'nowrap',
                  transition: 'all 0.15s ease',
                  fontFamily: 'var(--font-main)',
                  letterSpacing: '0.1px'
                }}
                onMouseEnter={(e) => {
                  if (!isActive) e.currentTarget.style.background = 'var(--m3-surface-container-high)';
                }}
                onMouseLeave={(e) => {
                  if (!isActive) e.currentTarget.style.background = 'transparent';
                }}
              >
                {sub}
              </button>
            );
          })}
        </nav>
      )}
    </div>
  );
});

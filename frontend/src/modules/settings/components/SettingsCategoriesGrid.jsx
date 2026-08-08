import { memo, useCallback } from 'react';
import { useApp } from '../../../core/providers/AppContext';
import {
  Sliders,
  Building2,
  CreditCard,
  FolderKanban,
  Bell,
  CheckSquare,
  Shield,
  Database,
  Zap,
  ChevronRight
} from 'lucide-react';
import { PanelHeader } from '../../../shared/components/PanelHeader';

const ICON_MAP = {
  Sliders,
  Building2,
  CreditCard,
  FolderKanban,
  Bell,
  CheckSquare,
  Shield,
  Database,
  Zap
};

export const SettingsCategoriesGrid = memo(function SettingsCategoriesGrid({ onOpenCategoryModal }) {
  const { settingsCategories } = useApp();

  return (
    <div className="panel-card" style={{ padding: '1.25rem' }}>
      <PanelHeader
        title="Configuration Control Categories (9 Modules)"
        accentColor="#2563eb"
      />

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1rem' }}>
        {settingsCategories.map((cat) => {
          const IconComp = ICON_MAP[cat.icon] || Sliders;

          return (
            <div
              key={cat.key}
              tabIndex={0}
              role="button"
              className="anodized-panel section-tile"
              style={{ padding: '1rem', cursor: 'pointer', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}
              onClick={() => onOpenCategoryModal(cat)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  onOpenCategoryModal(cat);
                }
              }}
              aria-label={`${cat.name}: ${cat.settingCount} Configs`}
            >
              <div>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <div style={{ color: 'var(--precision-blue)' }} aria-hidden="true">
                      <IconComp size={18} />
                    </div>
                    <span style={{ fontWeight: 800, fontSize: '0.9rem' }}>{cat.name}</span>
                  </div>

                  <span className="badge badge-success mono-data" style={{ fontSize: '0.625rem' }}>
                    {cat.settingCount} RULES
                  </span>
                </div>

                <p style={{ fontSize: '0.725rem', color: 'var(--text-muted)', lineHeight: 1.3, marginBottom: '0.75rem' }}>
                  {cat.description}
                </p>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingTop: '0.5rem', borderTop: '1px solid var(--border-color)', fontSize: '0.725rem', color: 'var(--precision-blue)', fontWeight: 700 }}>
                <span>CONFIGURE CATEGORY</span>
                <ChevronRight size={14} aria-hidden="true" />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
});

import { memo, useCallback } from 'react';
import { useApp } from '../../../core/providers/AppContext';
import { USER_MGMT_QUICK_ACTIONS } from '../../../data/mockData';
import { UserPlus, ShieldCheck, Key, Users, CheckSquare, Activity, Lock } from 'lucide-react';
import { PanelHeader } from '../../../shared/components/PanelHeader';

const ICON_MAP = {
  UserPlus,
  ShieldCheck,
  Key,
  Users,
  CheckSquare,
  Activity,
  Lock
};

export const UserMgmtQuickActionsPanel = memo(function UserMgmtQuickActionsPanel({ onOpenAddModal, onOpenResetModal }) {
  const { navigateTo } = useApp();

  const handleTileClick = useCallback((tile) => {
    if (tile.id === 'Add New User') {
      onOpenAddModal();
    } else if (tile.id === 'Reset Password') {
      onOpenResetModal(null);
    } else {
      navigateTo('user-mgmt', tile.targetSubmodule);
    }
  }, [onOpenAddModal, onOpenResetModal, navigateTo]);

  return (
    <div className="panel-card" style={{ padding: '1.25rem' }}>
      <PanelHeader
        title="User & Access Quick Actions"
        accentColor="#2563eb"
      />

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: '0.75rem' }}>
        {USER_MGMT_QUICK_ACTIONS.map((tile) => {
          const IconComp = ICON_MAP[tile.icon] || UserPlus;

          return (
            <div
              key={tile.id}
              tabIndex={0}
              role="button"
              className="anodized-panel section-tile"
              style={{ padding: '0.85rem', cursor: 'pointer' }}
              onClick={() => handleTileClick(tile)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  handleTileClick(tile);
                }
              }}
              aria-label={`${tile.title}: ${tile.description}`}
            >
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.4rem' }}>
                <IconComp size={16} color="var(--precision-blue)" aria-hidden="true" />
                <span className="badge badge-info mono-data" style={{ fontSize: '0.6rem' }}>
                  {tile.actionText}
                </span>
              </div>

              <div style={{ fontWeight: 800, fontSize: '0.775rem', marginBottom: '2px' }}>
                {tile.title}
              </div>

              <div style={{ fontSize: '0.65rem', color: 'var(--text-muted)', lineHeight: 1.2 }}>
                {tile.description}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
});

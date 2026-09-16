import React from 'react';
import { AlertTriangle } from 'lucide-react';

interface ResetConfirmModalProps {
  isOpen: boolean;
  onCancel: () => void;
  onConfirm: () => void;
}

export const ResetConfirmModal: React.FC<ResetConfirmModalProps> = ({
  isOpen,
  onCancel,
  onConfirm,
}) => {
  if (!isOpen) return null;

  return (
    <div className="modal-backdrop" onClick={onCancel}>
      <div className="modal-content-card" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header-icon text-amber-500">
          <AlertTriangle className="w-8 h-8" />
        </div>
        <h3 className="modal-title">Reset Timer?</h3>
        <p className="modal-description">
          This will stop the timer and clear your current elapsed session. Your configured interval will be preserved.
        </p>

        <div className="modal-action-buttons">
          <button className="btn btn-secondary flex-1" onClick={onCancel}>
            CANCEL
          </button>
          <button className="btn btn-danger flex-1" onClick={onConfirm}>
            RESET TIMER
          </button>
        </div>
      </div>
    </div>
  );
};

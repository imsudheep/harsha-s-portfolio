import React, { useEffect } from 'react';
import { BellRing, X } from 'lucide-react';
import { formatIntervalLabel } from '../services/timerEngine';

interface AlertOverlayProps {
  intervalSeconds: number;
  intervalCount: number;
  onDismiss: () => void;
}

export const AlertOverlay: React.FC<AlertOverlayProps> = ({
  intervalSeconds,
  intervalCount,
  onDismiss,
}) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onDismiss();
    }, 4000);
    return () => clearTimeout(timer);
  }, [onDismiss]);

  return (
    <div className="alert-overlay-backdrop" onClick={onDismiss}>
      <div className="alert-card-modal animate-scale-up" onClick={(e) => e.stopPropagation()}>
        <button className="alert-close-btn" onClick={onDismiss} aria-label="Close alert">
          <X className="w-5 h-5" />
        </button>

        <div className="alert-icon-ring">
          <BellRing className="w-8 h-8 animate-wiggle" />
        </div>

        <div className="alert-modal-title">INTERVAL REACHED</div>
        <div className="alert-modal-interval">
          {formatIntervalLabel(intervalSeconds).toUpperCase()}
        </div>
        <div className="alert-modal-count">Completed Interval #{intervalCount}</div>

        <div className="alert-modal-footer-note">
          Stopwatch continues running in background
        </div>
      </div>
    </div>
  );
};

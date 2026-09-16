import React from 'react';
import { Play, Pause, RotateCcw, X } from 'lucide-react';
import { TimerState, CalculatedTimerInfo } from '../types/timer';
import { formatTimeDisplay, formatIntervalLabel } from '../services/timerEngine';

interface MainTimerProps {
  state: TimerState;
  info: CalculatedTimerInfo;
  onStart: () => void;
  onStop: () => void;
  onReset: () => void;
}

export const MainTimer: React.FC<MainTimerProps> = ({
  state,
  info,
  onStart,
  onStop,
  onReset,
}) => {
  const { status, intervalSeconds } = state;
  const isRunning = status === 'RUNNING';

  // RUNNING MODE: Pure minimal plain screen
  if (isRunning) {
    return (
      <div className="plain-running-screen">
        <div className="plain-running-topbar">
          <button
            className="icon-btn-ghost"
            onClick={onStop}
            title="Pause and view options"
            aria-label="Pause"
          >
            <X className="w-6 h-6" />
          </button>
          <div className="interval-running-label font-sans font-medium">
            Interval: {formatIntervalLabel(intervalSeconds)}
          </div>
        </div>

        <div className="plain-hero-container">
          <div className="plain-hero-label">ELAPSED TIME</div>

          <div className="plain-stopwatch-digits" aria-live="polite">
            {formatTimeDisplay(info.elapsedSeconds, true)}
          </div>

          <div className="plain-countdown-subtext">
            Next alert in {formatTimeDisplay(info.timeToNextIntervalSeconds, false)}
          </div>

          <div className="dots-indicator mt-4">
            <div className={`dot ${info.currentIntervalNumber >= 1 ? 'active' : ''}`}></div>
            <div className={`dot ${info.currentIntervalNumber >= 2 ? 'active' : ''}`}></div>
            <div className={`dot ${info.currentIntervalNumber >= 3 ? 'active' : ''}`}></div>
            <div className={`dot ${info.currentIntervalNumber >= 4 ? 'active' : ''}`}></div>
          </div>
        </div>

        <div className="plain-running-footer">
          <button
            className="btn-circle-outlined"
            onClick={onStop}
            title="Pause Timer"
            aria-label="Pause Timer"
          >
            <Pause className="w-8 h-8 fill-current" />
          </button>
        </div>
      </div>
    );
  }

  // SETUP / PAUSED MODE: Minimal floating hero without messy background cards
  return (
    <div className="main-timer-minimal-container">
      <div className="timer-status-row">
        <span className={`status-badge-minimal ${status === 'STOPPED' ? 'status-stopped' : 'status-idle'}`}>
          {status === 'STOPPED' ? 'PAUSED' : 'READY'}
        </span>
        <div className="configured-interval-minimal">
          Interval: <strong>{formatIntervalLabel(intervalSeconds)}</strong>
        </div>
      </div>

      {/* Floating Timer Digits (No messy container boxes) */}
      <div className="hero-display-minimal">
        <div className="timer-label">TOTAL ELAPSED TIME</div>
        <div className="stopwatch-digits" aria-live="polite">
          {formatTimeDisplay(info.elapsedSeconds, true)}
        </div>
        <div className="countdown-subtext mt-2">
          NEXT ALERT IN {formatTimeDisplay(info.timeToNextIntervalSeconds, false)}
        </div>

        <div className="dots-indicator mt-3">
          <div className={`dot ${info.currentIntervalNumber >= 1 ? 'active' : ''}`}></div>
          <div className={`dot ${info.currentIntervalNumber >= 2 ? 'active' : ''}`}></div>
          <div className={`dot ${info.currentIntervalNumber >= 3 ? 'active' : ''}`}></div>
          <div className={`dot ${info.currentIntervalNumber >= 4 ? 'active' : ''}`}></div>
        </div>
      </div>

      {/* Individual Floating Circular Action Buttons */}
      <div className="timer-actions">
        <button className="btn-circle-hero" onClick={onStart} id="btn-start" title="Start Timer">
          <Play className="w-8 h-8 fill-current ml-1" />
        </button>

        {status === 'STOPPED' && (
          <button className="btn-circle-secondary" onClick={onReset} id="btn-reset" title="Reset Session">
            <RotateCcw className="w-5 h-5" />
          </button>
        )}
      </div>
    </div>
  );
};

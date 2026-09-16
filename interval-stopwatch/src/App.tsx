import { useState, useEffect, useRef, useCallback } from 'react';
import { Settings as SettingsIcon } from 'lucide-react';
import { TimerState, AppSettings, CalculatedTimerInfo } from './types/timer';
import {
  INITIAL_TIMER_STATE,
  calculateTimerInfo,
  checkForNewIntervals,
  formatIntervalLabel,
  formatTimeDisplay,
} from './services/timerEngine';
import { audioService } from './services/audioService';
import { notificationService } from './services/notificationService';
import { wakeLockService } from './services/wakeLockService';

import { FireflyLogo } from './components/FireflyLogo';
import { MainTimer } from './components/MainTimer';
import { IntervalPicker } from './components/IntervalPicker';
import { SettingsModal } from './components/SettingsModal';
import { ResetConfirmModal } from './components/ResetConfirmModal';

const STATE_STORAGE_KEY = 'firefly_timer_state_v8';
const SETTINGS_STORAGE_KEY = 'firefly_timer_settings_v8';

const DEFAULT_SETTINGS: AppSettings = {
  defaultIntervalSeconds: 600,
  keepScreenAwake: false,
  alertSound: 'double_beep',
  soundEnabled: true,
  vibrationEnabled: true,
  notificationsEnabled: false,
  theme: 'custom',
  customBgColor: '#080a06',
  customGlowColor: '#E8E942',
  customTextColor: '#fef08a',
};

export function App() {
  const [settings, setSettings] = useState<AppSettings>(() => {
    try {
      const saved = localStorage.getItem(SETTINGS_STORAGE_KEY);
      return saved ? { ...DEFAULT_SETTINGS, ...JSON.parse(saved) } : DEFAULT_SETTINGS;
    } catch {
      return DEFAULT_SETTINGS;
    }
  });

  const [timerState, setTimerState] = useState<TimerState>(() => {
    try {
      const saved = localStorage.getItem(STATE_STORAGE_KEY);
      if (saved) {
        return JSON.parse(saved);
      }
    } catch (e) {
      console.warn('Failed to parse timer state:', e);
    }
    return INITIAL_TIMER_STATE;
  });

  const [timerInfo, setTimerInfo] = useState<CalculatedTimerInfo>(() =>
    calculateTimerInfo(timerState)
  );

  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [isResetConfirmOpen, setIsResetConfirmOpen] = useState(false);

  const stateRef = useRef(timerState);
  stateRef.current = timerState;

  const settingsRef = useRef(settings);
  settingsRef.current = settings;

  useEffect(() => {
    try {
      localStorage.setItem(STATE_STORAGE_KEY, JSON.stringify(timerState));
    } catch (e) {
      console.warn('Failed to persist timer state:', e);
    }
  }, [timerState]);

  useEffect(() => {
    try {
      localStorage.setItem(SETTINGS_STORAGE_KEY, JSON.stringify(settings));
    } catch (e) {
      console.warn('Failed to persist settings:', e);
    }
  }, [settings]);

  // Apply Theme & Dynamic Color Wheel Variables
  useEffect(() => {
    const root = document.documentElement;

    if (settings.customBgColor) {
      root.style.setProperty('--bg-primary', settings.customBgColor);
    }
    if (settings.customGlowColor) {
      root.style.setProperty('--accent-glow', settings.customGlowColor);
      root.style.setProperty('--accent-color', settings.customGlowColor);
    }
    if (settings.customTextColor) {
      root.style.setProperty('--text-primary', settings.customTextColor);
      root.style.setProperty('--border-color', `${settings.customTextColor}33`);
    }
  }, [settings.customBgColor, settings.customGlowColor, settings.customTextColor]);

  // Handle Interval Alert Trigger (Synchronized 2-Beep Sound + Vibration)
  const triggerIntervalAlert = useCallback((intervalSec: number, count: number, totalElapsedFormatted: string) => {
    const s = settingsRef.current;
    audioService.playSound(s.alertSound || 'double_beep', s.soundEnabled);
    audioService.triggerVibration(s.vibrationEnabled);

    if (s.notificationsEnabled) {
      notificationService.showIntervalNotification(
        formatIntervalLabel(intervalSec),
        totalElapsedFormatted,
        true
      );
    }
  }, []);

  useEffect(() => {
    const tick = () => {
      const currentState = stateRef.current;
      const now = Date.now();

      const info = calculateTimerInfo(currentState, now);
      setTimerInfo(info);

      if (currentState.status === 'RUNNING') {
        const { newState, newAlertsCount } = checkForNewIntervals(currentState, now);

        if (newAlertsCount > 0) {
          setTimerState(newState);
          triggerIntervalAlert(
            currentState.intervalSeconds,
            newState.lastAlertCount,
            formatTimeDisplay(info.elapsedSeconds, true)
          );
        }
      }
    };

    tick();
    const intervalId = setInterval(tick, 100);
    return () => clearInterval(intervalId);
  }, [triggerIntervalAlert]);

  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.visibilityState === 'visible') {
        const currentState = stateRef.current;
        const now = Date.now();
        const info = calculateTimerInfo(currentState, now);
        setTimerInfo(info);

        if (currentState.status === 'RUNNING') {
          const { newState, newAlertsCount } = checkForNewIntervals(currentState, now);
          if (newAlertsCount > 0) {
            setTimerState(newState);
            triggerIntervalAlert(
              currentState.intervalSeconds,
              newState.lastAlertCount,
              formatTimeDisplay(info.elapsedSeconds, true)
            );
          }
          wakeLockService.requestWakeLock(settingsRef.current.keepScreenAwake);
        }
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);
    return () => document.removeEventListener('visibilitychange', handleVisibilityChange);
  }, [triggerIntervalAlert]);

  const handleStartOrResume = () => {
    const now = Date.now();
    const current = timerState;

    if (current.status === 'IDLE') {
      const newState: TimerState = {
        ...current,
        status: 'RUNNING',
        startTimestamp: now,
        accumulatedPausedMs: 0,
        lastPauseTimestamp: null,
        lastAlertCount: 0,
      };
      setTimerState(newState);
      wakeLockService.requestWakeLock(settings.keepScreenAwake);
    } else if (current.status === 'STOPPED') {
      let additionalPaused = 0;
      if (current.lastPauseTimestamp) {
        additionalPaused = now - current.lastPauseTimestamp;
      }
      const newState: TimerState = {
        ...current,
        status: 'RUNNING',
        accumulatedPausedMs: current.accumulatedPausedMs + additionalPaused,
        lastPauseTimestamp: null,
      };
      setTimerState(newState);
      wakeLockService.requestWakeLock(settings.keepScreenAwake);
    }
  };

  const handleStop = () => {
    const now = Date.now();
    setTimerState((prev) => ({
      ...prev,
      status: 'STOPPED',
      lastPauseTimestamp: now,
    }));
    wakeLockService.releaseWakeLock();
  };

  const handleResetRequest = () => {
    if (timerState.status === 'RUNNING' || timerInfo.elapsedSeconds > 0) {
      setIsResetConfirmOpen(true);
    } else {
      executeReset();
    }
  };

  const executeReset = () => {
    setTimerState((prev) => ({
      ...INITIAL_TIMER_STATE,
      intervalSeconds: prev.intervalSeconds,
    }));
    setIsResetConfirmOpen(false);
    wakeLockService.releaseWakeLock();
  };

  const handleSelectInterval = (seconds: number) => {
    setTimerState((prev) => ({
      ...prev,
      intervalSeconds: seconds,
    }));
  };

  const isRunning = timerState.status === 'RUNNING';

  return (
    <div className="phone-screen-fit-container">
      {/* Top Header */}
      {!isRunning && (
        <header className="app-header">
          <div className="brand-title">
            <FireflyLogo size={36} />
            <span className="font-sans font-bold text-xl tracking-tight">Firefly</span>
          </div>

          <button
            className="icon-btn"
            onClick={() => setIsSettingsOpen(true)}
            aria-label="Settings"
            id="btn-settings"
          >
            <SettingsIcon className="w-5 h-5" />
          </button>
        </header>
      )}

      {/* Main Equal Space Viewport */}
      <main className="home-screen-viewport">
        <MainTimer
          state={timerState}
          info={timerInfo}
          onStart={handleStartOrResume}
          onStop={handleStop}
          onReset={handleResetRequest}
        />

        {!isRunning && (
          <IntervalPicker
            currentIntervalSeconds={timerState.intervalSeconds}
            disabled={false}
            onSelectInterval={handleSelectInterval}
          />
        )}
      </main>

      <SettingsModal
        isOpen={isSettingsOpen}
        settings={settings}
        onClose={() => setIsSettingsOpen(false)}
        onUpdateSettings={setSettings}
      />

      <ResetConfirmModal
        isOpen={isResetConfirmOpen}
        onCancel={() => setIsResetConfirmOpen(false)}
        onConfirm={executeReset}
      />
    </div>
  );
}

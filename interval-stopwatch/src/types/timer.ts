export type TimerStatus = 'IDLE' | 'RUNNING' | 'STOPPED';

export type SoundType = 'double_beep' | 'beep' | 'chime' | 'ping' | 'silent';

export type ThemeType = 'system' | 'light' | 'dark' | 'custom';

export interface AppSettings {
  defaultIntervalSeconds: number;
  keepScreenAwake: boolean;
  alertSound: SoundType;
  soundEnabled: boolean;
  vibrationEnabled: boolean;
  notificationsEnabled: boolean;
  theme: ThemeType;
  customBgColor: string;
  customGlowColor: string;
  customTextColor: string;
}

export interface TimerState {
  status: TimerStatus;
  startTimestamp: number | null;
  accumulatedPausedMs: number;
  lastPauseTimestamp: number | null;
  intervalSeconds: number;
  lastAlertCount: number;
}

export interface CalculatedTimerInfo {
  elapsedMs: number;
  elapsedSeconds: number;
  timeToNextIntervalMs: number;
  timeToNextIntervalSeconds: number;
  currentIntervalNumber: number;
  progressPercent: number;
}

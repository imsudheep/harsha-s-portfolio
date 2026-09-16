import { TimerState, CalculatedTimerInfo } from '../types/timer';

export const INITIAL_TIMER_STATE: TimerState = {
  status: 'IDLE',
  startTimestamp: null,
  accumulatedPausedMs: 0,
  lastPauseTimestamp: null,
  intervalSeconds: 600,
  lastAlertCount: 0,
};

export function calculateTimerInfo(state: TimerState, nowMs: number = Date.now()): CalculatedTimerInfo {
  const { status, startTimestamp, accumulatedPausedMs, lastPauseTimestamp, intervalSeconds } = state;

  if (status === 'IDLE' || !startTimestamp) {
    return {
      elapsedMs: 0,
      elapsedSeconds: 0,
      timeToNextIntervalMs: intervalSeconds * 1000,
      timeToNextIntervalSeconds: intervalSeconds,
      currentIntervalNumber: 1,
      progressPercent: 0,
    };
  }

  const currentMs = status === 'STOPPED' && lastPauseTimestamp ? lastPauseTimestamp : nowMs;
  const rawElapsedMs = Math.max(0, currentMs - startTimestamp - accumulatedPausedMs);
  const intervalMs = Math.max(1, intervalSeconds * 1000);

  const completedIntervals = Math.floor(rawElapsedMs / intervalMs);
  const nextIntervalNumber = completedIntervals + 1;
  const targetNextMs = nextIntervalNumber * intervalMs;
  const timeToNextIntervalMs = Math.max(0, targetNextMs - rawElapsedMs);

  const currentIntervalElapsedMs = rawElapsedMs % intervalMs;
  const progressPercent = Math.min(100, Math.max(0, (currentIntervalElapsedMs / intervalMs) * 100));

  return {
    elapsedMs: rawElapsedMs,
    elapsedSeconds: Math.floor(rawElapsedMs / 1000),
    timeToNextIntervalMs,
    timeToNextIntervalSeconds: Math.ceil(timeToNextIntervalMs / 1000),
    currentIntervalNumber: nextIntervalNumber,
    progressPercent,
  };
}

export function checkForNewIntervals(
  state: TimerState,
  nowMs: number = Date.now()
): { newState: TimerState; newAlertsCount: number } {
  if (state.status !== 'RUNNING' || !state.startTimestamp) {
    return { newState: state, newAlertsCount: 0 };
  }

  const info = calculateTimerInfo(state, nowMs);
  const completedIntervals = Math.floor(info.elapsedMs / (state.intervalSeconds * 1000));

  if (completedIntervals > state.lastAlertCount) {
    const newAlertsCount = completedIntervals - state.lastAlertCount;
    return {
      newState: {
        ...state,
        lastAlertCount: completedIntervals,
      },
      newAlertsCount,
    };
  }

  return { newState: state, newAlertsCount: 0 };
}

export function formatTimeDisplay(totalSeconds: number, alwaysShowHours: boolean = true): string {
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = Math.floor(totalSeconds % 60);

  const pad = (num: number) => num.toString().padStart(2, '0');

  if (alwaysShowHours || hours > 0) {
    return `${pad(hours)}:${pad(minutes)}:${pad(seconds)}`;
  }
  return `${pad(minutes)}:${pad(seconds)}`;
}

export function formatIntervalLabel(totalSeconds: number): string {
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  const parts: string[] = [];
  if (hours > 0) parts.push(`${hours} ${hours === 1 ? 'hour' : 'hours'}`);
  if (minutes > 0) parts.push(`${minutes} ${minutes === 1 ? 'min' : 'mins'}`);
  if (seconds > 0 || parts.length === 0) parts.push(`${seconds} ${seconds === 1 ? 'sec' : 'secs'}`);

  return parts.join(' ');
}

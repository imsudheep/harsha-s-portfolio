import { SoundType } from '../types/timer';

class AudioService {
  private ctx: AudioContext | null = null;

  private getContext(): AudioContext {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      this.ctx = new AudioCtx();
    }
    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
    return this.ctx;
  }

  public playSound(soundType: SoundType, enabled: boolean = true) {
    if (!enabled || soundType === 'silent') return;

    try {
      const ctx = this.getContext();
      const now = ctx.currentTime;

      switch (soundType) {
        case 'double_beep':
          // 2 crisp electronic beeps (beep-beep)
          this.createBeep(ctx, now, 880, 0.1, 'sine');
          this.createBeep(ctx, now + 0.15, 880, 0.1, 'sine');
          break;

        case 'beep':
          this.createBeep(ctx, now, 880, 0.2, 'sine');
          break;

        case 'chime':
          this.createChimeNote(ctx, now, 523.25, 0.4);
          this.createChimeNote(ctx, now + 0.15, 659.25, 0.5);
          break;

        case 'ping':
          this.createPing(ctx, now, 1174.66, 0.6);
          break;

        default:
          this.createBeep(ctx, now, 880, 0.1, 'sine');
          this.createBeep(ctx, now + 0.15, 880, 0.1, 'sine');
          break;
      }
    } catch (e) {
      console.warn('Audio playback error:', e);
    }
  }

  private createBeep(ctx: AudioContext, startTime: number, freq: number, duration: number, type: OscillatorType) {
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = type;
    osc.frequency.setValueAtTime(freq, startTime);

    gain.gain.setValueAtTime(0, startTime);
    gain.gain.linearRampToValueAtTime(0.35, startTime + 0.01);
    gain.gain.exponentialRampToValueAtTime(0.001, startTime + duration);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start(startTime);
    osc.stop(startTime + duration + 0.05);
  }

  private createChimeNote(ctx: AudioContext, startTime: number, freq: number, duration: number) {
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(freq, startTime);

    gain.gain.setValueAtTime(0, startTime);
    gain.gain.linearRampToValueAtTime(0.3, startTime + 0.02);
    gain.gain.exponentialRampToValueAtTime(0.0001, startTime + duration);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start(startTime);
    osc.stop(startTime + duration + 0.05);
  }

  private createPing(ctx: AudioContext, startTime: number, freq: number, duration: number) {
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = 'triangle';
    osc.frequency.setValueAtTime(freq, startTime);

    gain.gain.setValueAtTime(0.35, startTime);
    gain.gain.exponentialRampToValueAtTime(0.0001, startTime + duration);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start(startTime);
    osc.stop(startTime + duration + 0.05);
  }

  public triggerVibration(enabled: boolean = true) {
    if (!enabled) return;
    if (typeof navigator !== 'undefined' && 'vibrate' in navigator) {
      try {
        navigator.vibrate([150, 80, 150]);
      } catch (e) {
        console.warn('Vibration failed:', e);
      }
    }
  }
}

export const audioService = new AudioService();

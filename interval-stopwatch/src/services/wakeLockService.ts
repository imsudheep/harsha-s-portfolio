class WakeLockService {
  private wakeLock: WakeLockSentinel | null = null;
  private isRequested: boolean = false;

  public isSupported(): boolean {
    return typeof navigator !== 'undefined' && 'wakeLock' in navigator;
  }

  public async requestWakeLock(enabled: boolean = true) {
    this.isRequested = enabled;
    if (!enabled || !this.isSupported()) {
      this.releaseWakeLock();
      return;
    }

    try {
      if (!this.wakeLock) {
        this.wakeLock = await navigator.wakeLock.request('screen');
        
        this.wakeLock.addEventListener('release', () => {
          this.wakeLock = null;
        });
      }
    } catch (err) {
      console.warn('Wake Lock request failed:', err);
    }
  }

  public async releaseWakeLock() {
    if (this.wakeLock) {
      try {
        await this.wakeLock.release();
      } catch (err) {
        console.warn('Wake Lock release failed:', err);
      } finally {
        this.wakeLock = null;
      }
    }
  }

  public async reacquireIfRequested() {
    if (this.isRequested && !this.wakeLock) {
      await this.requestWakeLock(true);
    }
  }
}

export const wakeLockService = new WakeLockService();

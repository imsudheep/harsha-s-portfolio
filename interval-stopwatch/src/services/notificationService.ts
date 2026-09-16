class NotificationService {
  public isSupported(): boolean {
    return typeof window !== 'undefined' && 'Notification' in window;
  }

  public getPermission(): NotificationPermission {
    if (!this.isSupported()) return 'denied';
    return Notification.permission;
  }

  public async requestPermission(): Promise<NotificationPermission> {
    if (!this.isSupported()) return 'denied';
    try {
      const permission = await Notification.requestPermission();
      return permission;
    } catch (e) {
      console.warn('Error requesting notification permission:', e);
      return 'denied';
    }
  }

  public showIntervalNotification(intervalLabel: string, totalElapsedFormatted: string, enabled: boolean = true) {
    if (!enabled || !this.isSupported() || Notification.permission !== 'granted') {
      return;
    }

    try {
      const title = `⏱️ Interval Reached: ${intervalLabel}`;
      const options: NotificationOptions & { renotify?: boolean } = {
        body: `Total Stopwatch Elapsed: ${totalElapsedFormatted}\nContinuing timer automatically.`,
        icon: 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><text y=".9em" font-size="90">⏱️</text></svg>',
        tag: 'interval-timer-alert',
        renotify: true,
      };

      const notification = new Notification(title, options);
      
      setTimeout(() => {
        notification.close();
      }, 5000);
    } catch (e) {
      console.warn('Could not display system notification:', e);
    }
  }
}

export const notificationService = new NotificationService();

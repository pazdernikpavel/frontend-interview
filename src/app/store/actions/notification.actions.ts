import { createActionGroup, props } from '@ngrx/store';

type SupportedNotificationType = 'success' | 'info' | 'warning' | 'error';

export const notificationActions = createActionGroup({
  source: 'Notification',
  events: {
    notify: props<{
      notificationType: SupportedNotificationType;
      message: string;
      title: string;
    }>(),
  },
});

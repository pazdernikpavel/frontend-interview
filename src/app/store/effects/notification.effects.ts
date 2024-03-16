import { Injectable, inject } from '@angular/core';

import { NbToastrService } from '@nebular/theme';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { tap } from 'rxjs';

import { notificationActions } from '../actions/notification.actions';

@Injectable()
export class NotificationEffects {
  private readonly actions$ = inject(Actions);
  private readonly notificationService = inject(NbToastrService);

  public readonly notify$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(notificationActions.notify),
        tap(({ notificationType, title, message }) => {
          switch (notificationType) {
            case 'success':
              this.notificationService.success(message, title);
              break;
            case 'info':
              this.notificationService.info(message, title);
              break;
            case 'warning':
              this.notificationService.warning(message, title);
              break;
            case 'error':
              this.notificationService.danger(message, title);
              break;
          }
        }),
      ),
    { dispatch: false },
  );
}

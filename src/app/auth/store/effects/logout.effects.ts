import { Injectable, inject } from '@angular/core';

import { Actions, createEffect, ofType } from '@ngrx/effects';
import { concatMap } from 'rxjs/operators';

import { AuthRoute } from '@app/auth/routing/auth.route.enum';
import { AppRoute } from '@app/main/app.route.enum';
import { navigationActions } from '@app/store/actions/navigation.actions';
import { notificationActions } from '@app/store/actions/notification.actions';
import { logoutActions } from '../actions/logout.actions';
import { persistanceActions } from '../actions/persistance.actions';

@Injectable()
export class LogoutEffects {
  private readonly actions$ = inject(Actions);

  public readonly logout$ = createEffect(() =>
    this.actions$.pipe(
      ofType(logoutActions.logoutUser),
      concatMap(() => [
        persistanceActions.removeTokens(),
        navigationActions.navigateTo({ path: ['/', AppRoute.Auth, AuthRoute.Login] }),
        notificationActions.notify({
          notificationType: 'success',
          title: 'Success',
          message: 'Successfully logged-out.',
        }),
      ]),
    ),
  );

  public readonly handleUnauthorizedException$ = createEffect(() =>
    this.actions$.pipe(
      ofType(logoutActions.notAuthenticated),
      concatMap(() => [
        persistanceActions.removeTokens(),
        navigationActions.navigateTo({ path: ['/', AppRoute.Auth, AuthRoute.Login] }),
        notificationActions.notify({
          notificationType: 'warning',
          title: 'Session expired',
          message: 'Unfortunately, your session has expired. Please log in again.',
        }),
      ]),
    ),
  );
}

import { Injectable, inject } from '@angular/core';

import { Actions, createEffect, ofType } from '@ngrx/effects';
import { concatMap, exhaustMap, map } from 'rxjs/operators';

import { LoginGQL } from '@app/graphql/generated/schema';
import { executeMutation } from '@app/graphql/graphql.utils';
import { ROOT_PATH, navigationActions } from '@app/store/actions/navigation.actions';
import { notificationActions } from '@app/store/actions/notification.actions';
import { loginActions } from '../actions/login.actions';
import { persistanceActions } from '../actions/persistance.actions';

@Injectable()
export class LoginEffects {
  private readonly actions$ = inject(Actions);
  private readonly loginService = inject(LoginGQL);

  public readonly login$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loginActions.start),
      exhaustMap(({ request }) =>
        executeMutation(
          this.loginService,
          { input: request },
          ({ login }) => loginActions.success({ tokens: login }),
          error => loginActions.error({ message: error }),
        ),
      ),
    ),
  );

  public readonly handleLoginError$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loginActions.error),
      map(({ message }) =>
        notificationActions.notify({ notificationType: 'error', title: 'Error', message }),
      ),
    ),
  );

  public readonly handleLoginSuccess$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loginActions.success),
      concatMap(({ tokens }) => [
        persistanceActions.persistTokens({ tokens }),
        navigationActions.navigateTo(ROOT_PATH),
        notificationActions.notify({
          notificationType: 'success',
          title: 'Success',
          message: 'Successfully signed-in.',
        }),
      ]),
    ),
  );
}

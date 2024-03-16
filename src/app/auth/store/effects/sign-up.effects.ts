import { Injectable, inject } from '@angular/core';

import { Actions, createEffect, ofType } from '@ngrx/effects';
import { concatMap, exhaustMap, map } from 'rxjs/operators';

import { SignUpGQL } from '@app/graphql/generated/schema';
import { executeMutation } from '@app/graphql/graphql.utils';
import { ROOT_PATH, navigationActions } from '@app/store/actions/navigation.actions';
import { notificationActions } from '@app/store/actions/notification.actions';
import { persistanceActions } from '../actions/persistance.actions';
import { signUpActions } from '../actions/sign-up.actions';

@Injectable()
export class SignUpEffects {
  private readonly actions$ = inject(Actions);
  private readonly signUpService = inject(SignUpGQL);

  public readonly signUp$ = createEffect(() =>
    this.actions$.pipe(
      ofType(signUpActions.start),
      exhaustMap(({ request }) =>
        executeMutation(
          this.signUpService,
          { input: request },
          ({ signup }) => signUpActions.success({ tokens: signup }),
          error => signUpActions.error({ message: error }),
        ),
      ),
    ),
  );

  public readonly handleSignUpError$ = createEffect(() =>
    this.actions$.pipe(
      ofType(signUpActions.error),
      map(({ message }) =>
        notificationActions.notify({
          notificationType: 'error',
          title: 'Failed to sign-up…',
          message,
        }),
      ),
    ),
  );

  public readonly handleSignUpSuccess$ = createEffect(() =>
    this.actions$.pipe(
      ofType(signUpActions.success),
      concatMap(({ tokens }) => [
        persistanceActions.persistTokens({ tokens }),
        navigationActions.navigateTo(ROOT_PATH),
        notificationActions.notify({
          notificationType: 'success',
          title: 'Success',
          message: 'Successfully signed-up.',
        }),
      ]),
    ),
  );
}

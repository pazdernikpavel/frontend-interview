import { Injectable } from '@angular/core';

import { Actions, createEffect, ofType } from '@ngrx/effects';
import { exhaustMap } from 'rxjs/operators';

import { LoginGQL } from '@app/graphql/generated/schema';
import { executeMutation } from '@app/graphql/graphql.utils';
import { loginActions } from '../actions/login.actions';

@Injectable()
export class LoginEffects {
  public readonly login$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loginActions.start),
      exhaustMap(({ request }) =>
        executeMutation(
          this.loginService,
          { input: request },
          ({ login }) => loginActions.success({ response: login }),
          error => loginActions.error({ message: error }),
        ),
      ),
    ),
  );

  constructor(
    private actions$: Actions,
    private loginService: LoginGQL,
  ) {}
}

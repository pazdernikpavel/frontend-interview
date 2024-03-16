import { Injectable, inject } from '@angular/core';

import { Actions, createEffect, ofType } from '@ngrx/effects';
import { exhaustMap } from 'rxjs/operators';

import { SignUpGQL } from '@app/graphql/generated/schema';
import { executeMutation } from '@app/graphql/graphql.utils';
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
}

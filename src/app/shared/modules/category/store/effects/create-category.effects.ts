import { Injectable, inject } from '@angular/core';

import { Actions, createEffect, ofType } from '@ngrx/effects';
import { exhaustMap, map } from 'rxjs/operators';

import { CreateCategoryGQL } from '@app/graphql/generated/schema';
import { executeMutation } from '@app/graphql/graphql.utils';
import { notificationActions } from '@app/store/actions/notification.actions';
import { createCategoryActions } from '../actions/create-category.actions';

@Injectable()
export class CreateCategoryEffects {
  private readonly actions$ = inject(Actions);
  private readonly createCategoryService = inject(CreateCategoryGQL);

  public readonly createCategory$ = createEffect(() =>
    this.actions$.pipe(
      ofType(createCategoryActions.start),
      exhaustMap(({ request }) =>
        executeMutation(
          this.createCategoryService,
          { input: request },
          ({ createCategory }) => createCategoryActions.success({ response: createCategory }),
          error => createCategoryActions.error({ message: error }),
        ),
      ),
    ),
  );

  public readonly handleCreateCategoryError$ = createEffect(() =>
    this.actions$.pipe(
      ofType(createCategoryActions.error),
      map(({ message }) =>
        notificationActions.notify({
          notificationType: 'error',
          title: 'Failed to create category…',
          message,
        }),
      ),
    ),
  );
}

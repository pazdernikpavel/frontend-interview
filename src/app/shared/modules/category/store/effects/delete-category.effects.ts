import { Injectable, inject } from '@angular/core';

import { Actions, createEffect, ofType } from '@ngrx/effects';
import { exhaustMap, map } from 'rxjs/operators';

import { DeleteCategoryGQL } from '@app/graphql/generated/schema';
import { executeMutation } from '@app/graphql/graphql.utils';
import { notificationActions } from '@app/store/actions/notification.actions';
import { deleteCategoryActions } from '../actions/delete-category.actions';

@Injectable()
export class DeleteCategoryEffects {
  private readonly actions$ = inject(Actions);
  private readonly deleteCategoryService = inject(DeleteCategoryGQL);

  public readonly deleteCategory$ = createEffect(() =>
    this.actions$.pipe(
      ofType(deleteCategoryActions.start),
      exhaustMap(({ request }) =>
        executeMutation(
          this.deleteCategoryService,
          { id: request.id },
          ({ removeCategory }) => deleteCategoryActions.success({ response: removeCategory }),
          error => deleteCategoryActions.error({ message: error }),
        ),
      ),
    ),
  );

  public readonly handleDeleteCategoryError$ = createEffect(() =>
    this.actions$.pipe(
      ofType(deleteCategoryActions.error),
      map(({ message }) =>
        notificationActions.notify({
          notificationType: 'error',
          title: 'Failed to remove category…',
          message,
        }),
      ),
    ),
  );
}

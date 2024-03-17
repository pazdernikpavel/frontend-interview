import { Injectable, inject } from '@angular/core';

import { NbDialogService } from '@nebular/theme';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { exhaustMap, map, tap } from 'rxjs/operators';

import { CreateCategoryGQL } from '@app/graphql/generated/schema';
import { executeMutation } from '@app/graphql/graphql.utils';
import { notificationActions } from '@app/store/actions/notification.actions';
import { CreateCategoryComponent } from '../../components/create-category/create-category.component';
import { createCategoryActions } from '../actions/create-category.actions';

@Injectable()
export class CreateCategoryEffects {
  private readonly actions$ = inject(Actions);
  private readonly createCategoryService = inject(CreateCategoryGQL);
  private readonly dialogService = inject(NbDialogService);

  public readonly openModal$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(createCategoryActions.openModal),
        tap(() =>
          this.dialogService.open(CreateCategoryComponent, { closeOnBackdropClick: false }),
        ),
      ),
    { dispatch: false },
  );

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

  public readonly handleCreateCategorySuccess$ = createEffect(() =>
    this.actions$.pipe(
      ofType(createCategoryActions.success),
      map(() =>
        notificationActions.notify({
          notificationType: 'success',
          title: 'Success',
          message: 'Category created successfully',
        }),
      ),
    ),
  );
}

import { createActionGroup, props } from '@ngrx/store';

import { Category, DeleteCategoryMutationVariables, Maybe } from '@app/graphql/generated/schema';

export const deleteCategoryActions = createActionGroup({
  source: 'Delete Category',
  events: {
    start: props<{ request: DeleteCategoryMutationVariables }>(),
    success: props<{ response?: Maybe<Category> }>(),
    error: props<{ message: string }>(),
  },
});

import { createActionGroup, props } from '@ngrx/store';

import { Category, CreateCategoryInput } from '@app/graphql/generated/schema';

export const createCategoryActions = createActionGroup({
  source: 'Create Category',
  events: {
    start: props<{ request: CreateCategoryInput }>(),
    success: props<{ response: Category }>(),
    error: props<{ message: string }>(),
  },
});

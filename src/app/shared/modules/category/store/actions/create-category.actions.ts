import { createActionGroup, emptyProps, props } from '@ngrx/store';

import { Category, CreateCategoryInput } from '@app/graphql/generated/schema';

export const createCategoryActions = createActionGroup({
  source: 'Create Category',
  events: {
    openModal: emptyProps(),
    start: props<{ request: CreateCategoryInput }>(),
    success: props<{ response: Category }>(),
    error: props<{ message: string }>(),
  },
});

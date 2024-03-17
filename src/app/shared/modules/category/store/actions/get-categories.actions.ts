import { createActionGroup, emptyProps, props } from '@ngrx/store';

import { Category } from '@app/graphql/generated/schema';

export const getCategoriesActions = createActionGroup({
  source: 'Get Categories',
  events: {
    start: emptyProps(),
    success: props<{ response: Array<Category> }>(),
    error: props<{ message: string }>(),
  },
});

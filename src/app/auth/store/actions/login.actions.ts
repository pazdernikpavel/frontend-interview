import { createActionGroup, props } from '@ngrx/store';

import { TokensTypeFragment, UserInput } from '@app/graphql/generated/schema';

export const loginActions = createActionGroup({
  source: 'Login',
  events: {
    start: props<{ request: UserInput }>(),
    success: props<{ response: TokensTypeFragment }>(),
    error: props<{ message: string }>(),
  },
});

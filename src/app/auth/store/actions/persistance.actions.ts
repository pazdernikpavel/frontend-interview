import { createActionGroup, emptyProps, props } from '@ngrx/store';

import { TokensTypeFragment } from '@app/graphql/generated/schema';

export const persistanceActions = createActionGroup({
  source: 'Persistance',
  events: {
    persistTokens: props<{ tokens: TokensTypeFragment }>(),
    removeTokens: emptyProps(),
    loadTokens: emptyProps(),
    tokensLoaded: props<{ tokens: TokensTypeFragment }>(),
    failedToLoadTokens: emptyProps(),
  },
});
